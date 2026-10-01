import { cargarHeader } from "./header.js"
import {validarCorreo, validarNombre, validarTelefono, validarMensaje, validarAsunto, validarPrivacidad} from "./validaciones.js"
import {mostrarError} from "./interfaz.js"
import {MensajeUsuario} from "./mensaje-usuario.js"

cargarHeader();

document.addEventListener("DOMContentLoaded", () => {
  
  // ==========================================
  //      CÓDIGO DEL BOTÓN PARA SUBIR
  // ==========================================
  const btn = document.getElementById("btnSubir");

  if (btn) {
    window.onscroll = function() {
      if (document.documentElement.scrollTop > 100 || document.body.scrollTop > 100) {
        btn.style.display = "flex";
      } else {
        btn.style.display = "none";
      }
    };

    btn.onclick = function() {
      window.scrollTo({
        top: 0,
        behavior: "smooth"
      });
    };
  }
  // ==========================================

});

/**Validaciones del formulario*/
//llamar todos los componentes necesarios del html (variables, botones, espacio para errores, etc)
const iptNombre = document.getElementById("iptNombre"); 
const errorNombre = document.getElementById("errorNombre"); 
const iptTelefono = document.getElementById("iptTelefono"); 
const errorTelefono = document.getElementById("errorTelefono"); 
const iptEmail = document.getElementById("iptEmail"); 
const errorEmail = document.getElementById("errorEmail"); 
const slcAsunto = document.getElementById("slcAsunto"); 
const errorAsunto = document.getElementById("errorAsunto"); 
const iptMensaje = document.getElementById("iptMensaje");
const errorMensaje = document.getElementById("errorMensaje"); 
const successMessage = document.getElementById("successMessage");
const errorPrivacidad = document.getElementById("errorPrivacidad"); 
const contactForm = document.getElementById("contactForm");
const btnEnviar = document.getElementById("btnEnviar"); 
const privacidad = document.getElementById("privacidad");

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

