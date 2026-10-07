function validarCorreo (email){
    if(typeof email !=="string"){
        return {
            valido: false, 
            mensaje: "Introduce texto"
        };
    }//verifica que sea un string

    const emailLimpio = email.trim(); 
    
    const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;

    if(emailLimpio === ""){
        return {
            valido: false,
            mensaje: "El correo eléctronico es obligatorio."
        }
    }//verifica que no este vacío

    if (!emailRegex.test(emailLimpio)){
        return {
            valido: false,
            mensaje: "Ingresa un correo electrónico válido"
        }
    }//verifica que tenga la expresión regular de un email

    return {
        valido: true, 
        mensaje: "Correo electrónico válido"
    }; 
}//funcion validar correo 

module.exports.validarCorreo = validarCorreo; 

function validarTelefono(telefono){
    if(typeof telefono !== "string"){
        return {
            valido: false, 
            mensaje: "El teléfono debe recibirse como texto."
        };
    }//validar que sea tipo string, no necesitamos que sea número
    
    const telefonoLimpio = telefono.trim(); //quitar espacios al principio y al final

    if (telefonoLimpio === ""){
        return{
            valido: false, 
            mensaje: "El número teléfonico es obligatorio."
        }; 
    }//no dejar el campo vacío

    //para quitar espacios, guiones y paréntesis entre números
    const telefonoSinSeparadores = telefonoLimpio.replace(/[\s()-]/g, "");
    //para validar que el numero "limpio" solo son números y de 10 dígitos
    const numeroRegex = /^\d{10}$/; 

    if (!numeroRegex.test(telefonoSinSeparadores)){
        return {
            valido: false, 
            mensaje: "Ingresa un número de 10 dígitos ej. 5512345678."
        }; 
    }//if numero sin 10 dígitos

    if (telefonoSinSeparadores.startsWith('0')){
        return {
            valido: false,
            mensaje: "El número no puede empezar con 0."
        };
    }//if numeros que empiezan con 0

    const todosIguales = /^(\d)\1+$/.test(telefonoSinSeparadores); 

    if (todosIguales){
        return {
            valido: false, 
            mensaje: "No se aceptan números continuos iguales como 0000000000."
        };
    }//if todos los numeros son iguales

    const primerDigito = telefonoSinSeparadores[0];

    if (!/[2-9]/.test(primerDigito)) {
        return { 
            valido: false, 
            mensaje: "El número debe empezar con un dígito válido entre 2 y 9" 
        };
    }//if el numero no empieza con 2-9


    return {
        valido: true,
        mensaje: "El número teléfonico es válido."
    }; 
}//funcion validar telefono sin separadores y de 10 dígitos

module.exports.validarTelefono = validarTelefono; 

function validarMensaje(mensaje){
    if (typeof mensaje != "string"){
        return{
            valido: false, 
            mensaje: "El mensaje debe ser texto"
        }; 
    }//debe ser texto 

    const mensajeLimpio = mensaje.trim(); //quitar espacios al inicio y al final
    
    //el mensaje esta vacío?
    if(mensajeLimpio === ""){
        return{
            valido: false, 
            mensaje: "Ingrese un mensaje"
        };
    }//if
    
    //el mensaje es de menos de 10 caracteres?
    if(mensajeLimpio.length < 10){
        return{
            valido: false, 
            mensaje: "Tu mensaje es muy corto"
        };
    }//if

    //el mensaje es muy largo?
    if(mensajeLimpio.length>1000){
        return{
            valido: false, 
            mensaje: "Tu mensaje es muy largo"
        };
    }//if

    //paso todas las validaciones: 
    return{
        valido: true,
        mensaje: "El mensaje es válido"
    }//return
}//funcion validar mensaje

module.exports.validarMensaje = validarMensaje;

function validarNombre (nombre){
    if(typeof nombre !== "string"){
        return{
            valido: false, 
            mensaje: "Introduce texto"
        }
    }//validar que sea un string

    const nombreLimpio = nombre.trim();//quitar espacios al principio y al final

    //existe el dato nombre?
    if (nombreLimpio === "") {
        return {
            valido: false, 
            mensaje: "El nombre es obligatorio."
        }; 
    }
    // el nombre o el apellido tienen una longitud mayor a 2 caracteres pero menor a 30?
    if (nombreLimpio.length < 3 || nombreLimpio.length > 100 ){
        return {
            valido: false,
            mensaje: "Ingresa un nombre de entre 3 y 100 caracteres."
        }; 
    }
    const nameRegex = /^[\p{L}\s\.-]+$/u; //unicode se agrega que acepte puntos

    //tiene caracteres invalidos?
    if (!nameRegex.test(nombreLimpio)) {
        return {
            valido: false, 
            mensaje: "Ingresa un nombre que tenga solo letras."
        }; 
    }

    return {
        valido: true,
        mensaje: "Nombre válido."
    };
}//funcion validar nombre

module.exports.validarNombre = validarNombre;

function validarAsunto(asunto){
    if (asunto === ""){
        return{
            valido: false, 
            mensaje: "Selecciona un asunto"
        }; 
    }

    return{
        valido: true,
        mensaje: "Asunto seleccionado correctamente."
    }
}//funcion validarAsunto

module.exports.validarAsunto = validarAsunto; 

function validarPrivacidad(aceptada){
    if (aceptada === "null" || aceptada === "undefined" || aceptada === "false" || aceptada === ""){
        return{
            valido: false, 
            mensaje: "Debes aceptar el aviso de privacidad para continuar."
        };
    }//if

    //el checkbox está vacío?
    if (!aceptada){
        return{
            valido: false, 
            mensaje: "Debes aceptar el aviso de privacidad para continuar"
        };
    }//if

    return{
        valido: true, 
        mensaje: "Aviso de privacidad aceptado correctamente."
    };
}//funcion validarPrivacidad

module.exports.validarPrivacidad = validarPrivacidad; 