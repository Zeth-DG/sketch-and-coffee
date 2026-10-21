import { getStoredUsers } from './localStorage.js';

document.addEventListener("DOMContentLoaded", () => {

    // Selección de elementos del DOM
    const formularioLogin = document.querySelector("#formularioLogin");
    const campoUsuario = document.querySelector("#campoUsuarioLogin");
    const campoContrasena = document.querySelector("#campoContrasenaLogin");

    const errorUsuario = document.querySelector("#errorUsuarioLogin");
    const errorContrasena = document.querySelector("#errorContrasenaLogin");
    const alertaGeneral = document.querySelector("#alertaGeneralLogin");

    if (!formularioLogin) return;

    // Captura del evento submit evitando la recarga de página
    formularioLogin.addEventListener("submit", (e) => {
        e.preventDefault(); // Evita recarga por defecto

        // Limpiar estados previos
        limpiarEstadoValidacion(campoUsuario, errorUsuario);
        limpiarEstadoValidacion(campoContrasena, errorContrasena);
        if (alertaGeneral) alertaGeneral.classList.add("d-none");

        const usuarioVal = campoUsuario.value.trim();
        const contrasenaVal = campoContrasena.value.trim();

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
        }// else

            // Validación de contraseña
        if (contrasenaVal === "") {
            mostrarErrorCampo(campoContrasena, errorContrasena, "La contraseña es obligatoria.");
            esValido = false;
        } else if (contrasenaVal.length < 6) {
            mostrarErrorCampo(campoContrasena, errorContrasena, "La contraseña debe tener al menos 6 caracteres.");
            esValido = false;
        } else {
            marcarCampoValido(campoContrasena, errorContrasena);
        }// else

        /*=========================================================
               GESTIÓN PROGRAMÁTICA DEL FOCO (Si hay errores)
        =========================================================*/

        if (!esValido) {
            const primerCampoInvalido = formularioLogin.querySelector(".is-invalid");
            if (primerCampoInvalido) {
                primerCampoInvalido.focus(); 
            }
            return; // Detiene la ejecución
        }

        // Si la estructura DOM y accesibilidad están listas y válidas:
        if (esValido) {
           
            /*=========================================================
                   AUTENTICACIÓN CONTRA LOCALSTORAGE Y SESIÓN
            =========================================================*/
            const usuariosRegistrados = getStoredUsers();

            const usuarioEncontrado = usuariosRegistrados.find(
                (u) => (u.correo === usuarioVal || u.usuario === usuarioVal) && u.contrasena === contrasenaVal
            );

            if (!usuarioEncontrado) {
                if (alertaGeneral) {
                    alertaGeneral.textContent = "Credenciales incorrectas. Verifica tus datos.";
                    alertaGeneral.classList.remove("d-none");
                    alertaGeneral.setAttribute("tabindex", "-1");
                    alertaGeneral.focus(); // Foco alerta general de error
                }
                return;
            }

            // Crear sesión activa y redirigir
            localStorage.setItem("app_authenticated_user", JSON.stringify(usuarioEncontrado));
            window.location.href = "inicioSesion.html";
        }
    });//formularioLogin

    //Función para mostrar error y actualizar atributos ARIA
    /**Su objetivo principal es avisar visualmente y de manera accesible (para personas que usan lectores de pantalla)
     *  cuando un campo del formulario no pasa la validación (por ejemplo, si se dejó vacío).*/
    function mostrarErrorCampo(input, contenedorError, mensaje) {
        // Manipulación dinámica de atributos ARIA
        input.setAttribute("aria-invalid", "true");
        input.classList.add("is-invalid");

        if (contenedorError) {
            contenedorError.textContent = mensaje;
            // Ocultar/mostrar mensajes de error quitando .d-none
            contenedorError.classList.remove("d-none");
        }//contenedorError
    }//function

    /**
     Cuando el usuario escribe algo válido, esta función borra los rastros visuales de error, esconde el texto de advertencia y actualiza 
     el lector de pantalla para que todo quede limpio y en orden.
      Es una pieza fundamental para mantener el formulario dinámico y accesible.
     */
    function marcarCampoValido(input, contenedorError) {
        // Manipulación dinámica de atributos ARIA
        input.setAttribute("aria-invalid", "false");
        input.classList.remove("is-invalid");

        if (contenedorError) {
            contenedorError.textContent = "";
            // Ocultar mensaje agregando clase .d-none
            contenedorError.classList.add("d-none");
        }//if

    }// marcarCampoValido

    /**
     * Cada vez que el usuario hace clic en "Iniciar Sesión",
     *  el script primero limpia todo (con esta función) y luego vuelve a validar desde cero.
     *  Esto evita que los errores viejos se queden pegados si el usuario corrige su información, 
     * garantizando que el formulario se comporte de manera fluida y limpia.
     */
    function limpiarEstadoValidacion(input, contenedorError) {
        input.removeAttribute("aria-invalid");
        input.classList.remove("is-invalid");
        if (contenedorError) {
            contenedorError.textContent = "";
            contenedorError.classList.add("d-none");
        }//if

    }//input contenedorError

}); // DOM  