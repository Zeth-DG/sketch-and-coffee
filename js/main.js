import { cargarHeader } from "./header.js"
import { cargarFooter } from "./footer.js";
import {validarCorreo, validarNombre, validarTelefono, validarMensaje, validarAsunto, validarPrivacidad} from "./validaciones.js"
import {mostrarError, actualizarErrorCampo, actualizarErrorPrivacidad, configurarValidacionCampo} from "./interfaz.js"
import {MensajeUsuario} from "./mensaje-usuario.js"

// ==========================================
//      CONFIGURACIÓN DE EMAILJS
// ==========================================
// Datos de la cuenta de EmailJS de la cafetería.
const EMAILJS_PUBLIC_KEY  = "zFMrBrDP8RI_sAiW5";
const EMAILJS_SERVICE_ID  = "service_q308q27";
const EMAILJS_TEMPLATE_ID = "template_24el2ub";

// Se comprueba que el SDK haya cargado antes de usarlo. Si el CDN no
// responde (sin internet, red bloqueada), el resto de la página sigue
// funcionando en lugar de romperse por completo.
const emailjsDisponible = typeof emailjs !== "undefined";

if (emailjsDisponible) {
  emailjs.init({ publicKey: EMAILJS_PUBLIC_KEY });
} else {
  console.warn("EmailJS no cargó: el formulario validará pero no enviará correo.");
}

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
  const mensajeFinal = nuevoMensaje.crearNuevoMensaje(); 

  // ==========================================
  //      ENVÍO DEL CORREO CON EMAILJS
  // ==========================================
  if (!emailjsDisponible) {
    alert("No se pudo conectar con el servicio de correo. Escríbenos por WhatsApp.");
    return;
  }

  const textoBoton = btnEnviar.textContent;
  btnEnviar.disabled = true;
  btnEnviar.textContent = "Enviando…";

  emailjs.send(EMAILJS_SERVICE_ID, EMAILJS_TEMPLATE_ID, {
    nombre:   nombreUsr,
    telefono: telefonoUsr,
    correo:   emailUsr,
    asunto:   asuntoUsr,
    mensaje:  mensajeUsr
  })
    .then(() => {
      //el mensaje de éxito solo aparece si el correo salió de verdad
      contactForm.style.display = "none";
      successMessage.style.display = "block";
    })
    .catch((error) => {
      console.error("Error de EmailJS:", error);
      alert("No se pudo enviar el mensaje. Revisa tu conexión e inténtalo de nuevo.");
    })
    .finally(() => {
      btnEnviar.disabled = false;
      btnEnviar.textContent = textoBoton;
    });
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