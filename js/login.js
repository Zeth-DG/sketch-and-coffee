import {
    authenticateStoredUser,
    seedInitialUsers
} from './storage_InicioSesion.js';

document.addEventListener("DOMContentLoaded", async () => {

    // Selección de elementos del DOM
    const formularioLogin = document.querySelector("#formularioLogin");
    const campoUsuario = document.querySelector("#campoUsuarioLogin");
    const campoContrasena = document.querySelector("#campoContrasenaLogin");

    const errorUsuario = document.querySelector("#errorUsuarioLogin");
    const errorContrasena = document.querySelector("#errorContrasenaLogin");
    const alertaGeneral = document.querySelector("#alertaGeneralLogin");
    const btnOlvidaste = document.querySelector("#btnOlvidastePassword");

    if (!formularioLogin) return;

    try {
        await seedInitialUsers();
    } catch (error) {
        console.error("No se pudo preparar el almacenamiento seguro de usuarios:", error);
        if (alertaGeneral) {
            alertaGeneral.className = "alert alert-danger";
            alertaGeneral.textContent = "No se pudo preparar el inicio de sesión en este navegador.";
            alertaGeneral.classList.remove("d-none");
        }
        return;
    }

    /*=========================================================
        RECUPERACIÓN RÁPIDA DE CONTRASEÑA (Opción 3)
    =========================================================*/
    if (btnOlvidaste) {
        btnOlvidaste.addEventListener("click", (e) => {
            e.preventDefault();

            // Limpiar estados previos de error
            limpiarEstadoValidacion(campoUsuario, errorUsuario);
            if (alertaGeneral) alertaGeneral.classList.add("d-none");

            const usuarioVal = campoUsuario.value.trim();

            // Si el campo de correo está vacío
            if (usuarioVal === "") {
                mostrarErrorCampo(
                    campoUsuario,
                    errorUsuario,
                    "Ingresa tu correo electrónico para enviarte las instrucciones de recuperación."
                );
                campoUsuario.focus();
                return;
            }//if

            // Validación rápida de formato de correo
            if (!usuarioVal.includes("@") || !usuarioVal.includes(".")) {
                mostrarErrorCampo(
                    campoUsuario,
                    errorUsuario,
                    "Ingresa un correo electrónico válido."

                );//mostrarErrorCampo
                campoUsuario.focus();
                return;

            }// if !

            // Si ingresó un correo válido, mostramos la confirmación verde de éxito
            if (alertaGeneral) {
                alertaGeneral.className = "alert alert-success";
                alertaGeneral.textContent = `Se han enviado las instrucciones de recuperación al correo: ${usuarioVal}`;
                alertaGeneral.classList.remove("d-none");
                alertaGeneral.setAttribute("tabindex", "-1");
                alertaGeneral.focus();

            }//if

            // Notificación accesible para lectores de pantalla
            const zonaPolite = document.getElementById("notificacion-polite");
            if (zonaPolite) {
                zonaPolite.textContent = `Enviando correo de recuperación a ${usuarioVal}`;

            }//if
        });//addEventListener

    }// btnolvidaste

    // Captura del evento submit evitando la recarga de página
    formularioLogin.addEventListener("submit", async (e) => {
        e.preventDefault(); // Evita recarga por defecto

        // Limpiar estados previos
        limpiarEstadoValidacion(campoUsuario, errorUsuario);
        limpiarEstadoValidacion(campoContrasena, errorContrasena);
        if (alertaGeneral) alertaGeneral.classList.add("d-none");

        const usuarioVal = campoUsuario.value.trim();
        const contrasenaVal = campoContrasena.value;

        let esValido = true;

        // Validación de campos vacíos en cliente y actualización de estados
        if (usuarioVal === "") {
            mostrarErrorCampo(campoUsuario, errorUsuario, "El correo o nombre de usuario es obligatorio.");
            esValido = false;
        } else if (usuarioVal.includes("@") && !usuarioVal.includes(".")) {
            // Validación opcional rápida si ingresan un correo incompleto
            mostrarErrorCampo(campoUsuario, errorUsuario, "Ingresa un correo electrónico válido.");
            esValido = false;
        } else {
            marcarCampoValido(campoUsuario, errorUsuario);
        }//else

        // Validación de contraseña
        if (contrasenaVal === "") {
            mostrarErrorCampo(campoContrasena, errorContrasena, "La contraseña es obligatoria.");
            esValido = false;
        } else if (contrasenaVal.length < 6) {
            mostrarErrorCampo(campoContrasena, errorContrasena, "La contraseña debe tener al menos 6 caracteres.");
            esValido = false;
        } else {
            marcarCampoValido(campoContrasena, errorContrasena);
        }//else

        /*=========================================================
            GESTIÓN PROGRAMÁTICA DEL FOCO (Si hay errores)
        =========================================================*/
        if (!esValido) {
            const primerCampoInvalido = formularioLogin.querySelector(".is-invalid");
            if (primerCampoInvalido) {
                primerCampoInvalido.focus();

            }//if primerCampo
            return; // Detiene la ejecución

        }//if !esValido

        // Si la estructura DOM y accesibilidad están listas y válidas:
        if (esValido) {

            /*=========================================================
                AUTENTICACIÓN CONTRA LOCALSTORAGE Y SESIÓN
            =========================================================*/
            let usuarioEncontrado;
            try {
                usuarioEncontrado = await authenticateStoredUser(usuarioVal, contrasenaVal);
            } catch (error) {
                console.error("No se pudo verificar la contraseña:", error);
                if (alertaGeneral) {
                    alertaGeneral.className = "alert alert-danger";
                    alertaGeneral.textContent = "No se pudo verificar la contraseña en este navegador.";
                    alertaGeneral.classList.remove("d-none");
                }
                return;
            }

            if (!usuarioEncontrado) {
                if (alertaGeneral) {
                    alertaGeneral.className = "alert alert-danger"; // Restablece estilo de error rojo
                    alertaGeneral.textContent = "Credenciales incorrectas. Verifica tus datos.";
                    alertaGeneral.classList.remove("d-none");
                    alertaGeneral.setAttribute("tabindex", "-1");
                    alertaGeneral.focus(); // Foco alerta general de error

                }// alertageneral
                return;
            }//if !

            // Crear sesión activa y redirigir a la página de inicio
            localStorage.setItem("app_authenticated_user", JSON.stringify(usuarioEncontrado));
            if (usuarioEncontrado.rol === "administrador") {
                window.location.href = "creacion_de_producto.html";
            } else {
                window.location.href = "index.html";
            }
        }//if
    }); //formularioLogin

    // Función para mostrar error y actualizar atributos ARIA
    function mostrarErrorCampo(input, contenedorError, mensaje) {
        input.setAttribute("aria-invalid", "true");
        input.classList.add("is-invalid");

        if (contenedorError) {
            contenedorError.textContent = mensaje;
            contenedorError.classList.remove("d-none");
        }//if
    }// mostrarErrorCampo

    function marcarCampoValido(input, contenedorError) {
        input.setAttribute("aria-invalid", "false");
        input.classList.remove("is-invalid");

        if (contenedorError) {
            contenedorError.textContent = "";
            contenedorError.classList.add("d-none");
        }//if
    }// marcarCampoValido

    function limpiarEstadoValidacion(input, contenedorError) {
        input.removeAttribute("aria-invalid");
        input.classList.remove("is-invalid");
        if (contenedorError) {
            contenedorError.textContent = "";
            contenedorError.classList.add("d-none");
        }// if
    }//limpiarEstadoValidacion

}); // DOM