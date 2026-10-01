import { cargarHeader } from "./header.js"
import {validarCorreo, validarNombre, validarTelefono, validarMensaje} from "./validaciones.js"
import {mostrarError} from "./interfaz.js"
import {MensajeUsuario} from "./clase-crear-mensaje.js"

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

/**Formulario validaciones */

const iptNombre = document.getElementById("iptNombre"); 
const errorNombre = document.getElementById("errorNombre"); 
const iptTelefono = document.getElementById("iptTelefono"); 
const errorTelefono = document.getElementById("errorTelefono"); 
const iptEmail = document.getElementById("iptEmail"); 
const errorEmail = document.getElementById("errorEmail"); 
const slcAsunto = document.getElementById("slcAsunto"); 
const iptMensaje = document.getElementById("iptMensaje");
const errorMensaje = document.getElementById("errorMensaje"); 

const successMessage = document.getElementById("successMessage");

const contactForm = document.getElementById("contactForm");
const btnEnviar = document.getElementById("btnEnviar"); 

contactForm.addEventListener("submit", (evento) => {
  evento.preventDefault(); //evitar que la página se recargue
  
  let nombreUsr = iptNombre.value; 
  let telefonoUsr = iptTelefono.value; 
  let emailUsr = iptEmail.value; 
  let asuntoUsr = slcAsunto.value; 
  let mensajeUsr = iptMensaje.value; 

  let resultadoEmail = validarCorreo(emailUsr); 
  let resultadoTelefono = validarTelefono(telefonoUsr); 
  let resultadoNombre = validarNombre(nombreUsr); 
  let resultadoMensaje = validarMensaje(mensajeUsr); 

  mostrarError(errorNombre, resultadoNombre); 
  mostrarError(errorTelefono, resultadoTelefono); 
  mostrarError(errorEmail, resultadoEmail); 
  mostrarError(errorMensaje, resultadoMensaje); 

  const formularioValido = 
  resultadoEmail.valido &&
  resultadoTelefono.valido &&
  resultadoNombre.valido &&
  resultadoMensaje.valido; 

  if(!formularioValido){
    //console.log("hay errores");
    return; 
  }// if errores

  const nuevoMensaje = new MensajeUsuario(
    nombreUsr, asuntoUsr, emailUsr, telefonoUsr, mensajeUsr
  ); 

  const mensajeFinal = nuevoMensaje.crearNuevoMensaje(); 
  //console.log(mensajeFinal); 

  contactForm.style.display = "none";
  successMessage.style.display = "block";

})

