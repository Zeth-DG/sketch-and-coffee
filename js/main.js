import { cargarHeader } from "./header.js"
import { cargarFooter } from "./footer.js";
import {validarCorreo, validarNombre, validarTelefono, validarMensaje, validarAsunto, validarPrivacidad} from "./validaciones.js"
import {mostrarError, actualizarErrorCampo, actualizarErrorPrivacidad, configurarValidacionCampo} from "./interfaz.js"
import {MensajeUsuario} from "./mensaje-usuario.js"

cargarHeader();

// IFooter
cargarFooter();

// ==========================================
//      VALIDACIONES DEL FORMULARIO
// ==========================================

document.addEventListener("DOMContentLoaded", () => {
  
/**Validaciones del formulario*/
//llamar todos los componentes necesarios del html (variables, botones, espacio para errores, etc)
const iptNombre = document.getElementById("campoNombre"); 
const errorNombre = document.getElementById("errorNombre"); 
const iptTelefono = document.getElementById("campoTelefono"); 
const errorTelefono = document.getElementById("errorTelefono"); 
const iptEmail = document.getElementById("campoCorreo"); 
const errorEmail = document.getElementById("errorEmail"); 
const slcAsunto = document.getElementById("campoAsunto"); 
const errorAsunto = document.getElementById("errorAsunto"); 
const iptMensaje = document.getElementById("campoMensaje");
const errorMensaje = document.getElementById("errorMensaje"); 
const successMessage = document.getElementById("successMessage");
const errorPrivacidad = document.getElementById("errorPrivacidad"); 
const contactForm = document.getElementById("formularioContacto");
const btnEnviar = document.getElementById("btnEnviar"); 
const privacidad = document.getElementById("campoPrivacidad");

//evento de envío del formulario 
contactForm.addEventListener("submit", (evento) => {
  evento.preventDefault(); //evitar que la página se recargue
  //crear variables locales con los valores ingresados por el usuario
  let nombreUsr = iptNombre.value; 
  let telefonoUsr = iptTelefono.value; 
  let emailUsr = iptEmail.value; 
  let asuntoUsr = slcAsunto.value; 
  let mensajeUsr = iptMensaje.value; 
  //realizar las validaciones usando las funciones definidas en validaciones.js
  let resultadoNombre = validarNombre(nombreUsr); 
  let resultadoTelefono = validarTelefono(telefonoUsr); 
  let resultadoEmail = validarCorreo(emailUsr); 
  let resultadoAsunto = validarAsunto(asuntoUsr); 
  let resultadoMensaje = validarMensaje(mensajeUsr); 
  let resultadoPrivacidad = validarPrivacidad(privacidad.checked); 
  //manejo de errores
  mostrarError(errorNombre, resultadoNombre); 
  mostrarError(errorTelefono, resultadoTelefono); 
  mostrarError(errorEmail, resultadoEmail); 
  mostrarError(errorAsunto, resultadoAsunto);
  mostrarError(errorMensaje, resultadoMensaje); 
  mostrarError(errorPrivacidad, resultadoPrivacidad); 
  //evaluacion de todas las validaciones
  const formularioValido = 
  resultadoNombre.valido &&
  resultadoTelefono.valido &&
  resultadoEmail.valido &&
  resultadoAsunto.valido &&
  resultadoMensaje.valido &&
  resultadoPrivacidad.valido; 

  //control de flujo en caso de que alguna validación sea falsa
  if(!formularioValido){
    return; 
  }// if errores

  //si todo sale bien, se crea un mensaje con toda la info ingresada por el usuario
  const nuevoMensaje = new MensajeUsuario(
    nombreUsr, asuntoUsr, emailUsr, telefonoUsr, mensajeUsr
  ); 
  //se muestra el mensaje de éxito al enviar las respuestas
  const mensajeFinal = nuevoMensaje.crearNuevoMensaje(); 
  contactForm.style.display = "none";
  successMessage.style.display = "block";
})

//mostrar errores en tiempo real
configurarValidacionCampo(iptEmail, errorEmail, validarCorreo);
configurarValidacionCampo(iptTelefono, errorTelefono, validarTelefono);
configurarValidacionCampo(iptNombre, errorNombre, validarNombre); 
configurarValidacionCampo(iptMensaje, errorMensaje, validarMensaje); 
configurarValidacionCampo(slcAsunto, errorAsunto, validarAsunto); 
privacidad.addEventListener("change", () => {
  actualizarErrorPrivacidad(privacidad, errorPrivacidad, validarPrivacidad);
});
});