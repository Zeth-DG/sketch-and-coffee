import {
    validarNombreRegistro,
    validarTelefonoRegistro,
    validarCorreoRegistro,
    validarContrasenaRegistro,
    validarConfirmarContrasena,
    validarPrivacidad
} from './validaciones.js';

const formulario =
    document.getElementById("formularioContacto");


function mostrarAlerta(mensaje, tipo) {

    const contenedor =
        document.getElementById("alerta-registro");

    contenedor.innerHTML = `
        <div class="alert alert-${tipo} alert-dismissible fade show" role="alert">
            ${mensaje}
            <button
                type="button"
                class="btn-close"
                data-bs-dismiss="alert">
            </button>
        </div>
    `;
}


if (formulario) {
    formulario.addEventListener("submit", function(event) {
        event.preventDefault();

        // Obtener valores
        const nombre =
            document.getElementById("campoNombreRegistro").value;

        const apellido =
            document.getElementById("campoApellidoRegistro").value;

        const telefono =
            document.getElementById("campoTelefonoRegistro").value;

        const correo =
            document.getElementById("campoCorreoRegistro").value;

        const contrasena =
            document.getElementById("campoContrasena").value;

        const confirmarContrasena =
            document.getElementById("campoConfirmarContrasena").value;

        const privacidad =
            document.getElementById("campoPrivacidad").checked;


        // Validaciones
        const validaciones = [
            validarNombreRegistro(nombre),
            validarTelefonoRegistro(telefono),
            validarCorreoRegistro(correo),
            validarContrasenaRegistro(contrasena),
            validarConfirmarContrasena(confirmarContrasena),
            validarPrivacidad(privacidad)
        ];


        // Revisar si alguna falla
        for (let resultado of validaciones) {
            if (!resultado.valido) {
                mostrarAlerta(
                    resultado.mensaje,
                    "danger"
                );
                return;
            }
        }

        // Crear objeto JSON con los datos del usuario
        const usuario = {
            nombre: nombre,
            apellido: apellido,
            telefono: telefono,
            correo: correo,
            contrasena: contrasena
        };


        // Mostrar JSON en consola
        console.log("JSON FINAL:");
        console.log(usuario);

        // Alerta de éxito
        mostrarAlerta(
            "Registro completado correctamente",
            "success"
        );

    });

}