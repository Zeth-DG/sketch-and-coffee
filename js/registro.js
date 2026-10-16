import { 
    validarNombreRegistro, 
    validarTelefonoRegistro, 
    validarCorreoRegistro, 
    validarContrasenaRegistro, 
    validarConfirmarContrasena, 
    validarPrivacidad 
} from './validaciones.js';

const formulario = document.querySelector('form');

if (formulario) {
  formulario.addEventListener('submit', function (event) {
    event.preventDefault(); 

    const validaciones = [
      validarNombreRegistro(document.getElementById('campoNombreRegistro').value),
      validarTelefonoRegistro(document.getElementById('campoTelefonoRegistro').value),
      validarCorreoRegistro(document.getElementById('campoCorreoRegistro').value),
      validarContrasenaRegistro(document.getElementById('campoContraseña').value),
      validarConfirmarContrasena(document.getElementById('campoConfirmarContraseña').value),
      validarPrivacidad(document.getElementById('campoPrivacidad').checked)
    ];

    for (let resultado of validaciones) {
      if (!resultado.valido) {
        alert(resultado.mensaje);
        return; // Detiene el envío si hay algún campo vacío
      }
    }

    console.log('¡Campos obligatorios listos!');
  });
}
if (formulario) {
  formulario.addEventListener('submit', function (event) {
    event.preventDefault();
    console.log("¡El formulario fue interceptado con éxito!"); // <-- Agrega esto
    
    // ... tus validaciones ...
  });
}