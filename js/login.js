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
        } else {
            marcarCampoValido(campoUsuario, errorUsuario);
        }// else

        if (contrasenaVal === "") {
            mostrarErrorCampo(campoContrasena, errorContrasena, "La contraseña es obligatoria.");
            esValido = false;
        } else {
            marcarCampoValido(campoContrasena, errorContrasena);
        }// else

        // Si la estructura DOM y accesibilidad están listas y válidas:
        if (esValido) {
            // Disparar evento personalizado o pasar control al módulo de autenticación con LocalStorage
            console.log("Campos validados correctamente en DOM Listo para autenticar con LocalStorage.");

            // Emitir un evento para que el encargado de LocalStorage procese la validación de datos
            document.dispatchEvent(new CustomEvent("solicitudLogin", {
                detail: { usuario: usuarioVal, contrasena: contrasenaVal }
            }));//new solicitudLogin
        }//if
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