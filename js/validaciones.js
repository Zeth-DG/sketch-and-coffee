export function validarCorreo (email){
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

export function validarNombreCompleto (nombre, apellido){
    if(typeof nombre !== "string" || apellido !== "string"){
        return{
            valido: false, 
            mensaje: "Introduce texto"
        }
    }//validar que sea un string

    const nombreLimpio = nombre.trim();
    const apellidoLimpio = nombre.trim(); 

    //existe el dato nombre o apellido?
    if (nombreLimpio === "" || apellidoLimpio === "") {
        return {
            valido: false, 
            mensaje: "El nombre/apellido son obligatorios."
        }; 
    }
    // el nombre o el apellido tienen una longitud mayor a 2 caracteres pero menor a 30?
    if (nombreLimpio.length < 3 || 
        nombreLimpio.length > 30 ||
        apellidoLimpio.length < 3 || 
        apellidoLimpio.length > 30){
        return {
            valido: false,
            mensaje: "Ingresa un nombre/apellido válido."
        }; 
    }
    const nameRegex = /^[\p{L}\s-]+$/u; //unicode 

    //tiene caracteres invalidos?
    if (!nameRegex.test(nombreLimpio) || !nameRegex.test(apellidoLimpio)) {
        return {
            valido: false, 
            mensaje: "Ingresa un nombre/apellido válido."
        }; 
    }

    return {
        valido: true,
        mensaje: "Nombre y apellido válido."
    };
}//funcion validar nombre

export function validarTelefono(telefono){
    if(typeof telefono !== "string"){
        return {
            valido: false, 
            mensaje: "El teléfono debe recibirse como texto."
        };
    }//validar que sea tipo numero
    
    const telefonoLimpio = telefono.trim(); 

    if (telefonoLimpio === ""){
        return{
            valido: false, 
            mensaje: "El número teléfonico es obligatorio."
        }; 
    }
    const telefonoSinSeparadores = telefonoLimpio.replace(/[\s-]/g, "");
    const numeroRegex = /^\d{10}$/; 

    if (!numeroRegex.test(telefonoSinSeparadores)){
        return {
            valido: false, 
            mensaje: "Ingresa un número teléfonico válido de 10 dígitos."
        }; 
    }//if

    return {
        valido: true,
        mensaje: "El número teléfonico es válido."
    }; 
}//funcion validar telefono

export function validarMensaje(mensaje){
    if (typeof mensaje != "string"){
        return{
            valido: false, 
            mensaje: "El mensaje debe ser texto"
        }; 
    }//if
    const mensajeLimpio = mensaje.trim(); 

    if(mensajeLimpio === ""){
        return{
            valido: false, 
            mensaje: "Ingrese un mensaje"
        }
    }

    return{
        valido: true,
        mensaje: "El mensaje es válido"
    }
}//funcion validar mensaje

export function validarNombre (nombre){
    if(typeof nombre !== "string"){
        return{
            valido: false, 
            mensaje: "Introduce texto"
        }
    }//validar que sea un string

    const nombreLimpio = nombre.trim();

    //existe el dato nombre?
    if (nombreLimpio === "") {
        return {
            valido: false, 
            mensaje: "El nombre es obligatorio."
        }; 
    }
    // el nombre o el apellido tienen una longitud mayor a 2 caracteres pero menor a 30?
    if (nombreLimpio.length < 3 || nombreLimpio.length > 30 ){
        return {
            valido: false,
            mensaje: "Ingresa un nombre válido."
        }; 
    }
    const nameRegex = /^[\p{L}\s-]+$/u; //unicode 

    //tiene caracteres invalidos?
    if (!nameRegex.test(nombreLimpio)) {
        return {
            valido: false, 
            mensaje: "Ingresa un nombre válido."
        }; 
    }

    return {
        valido: true,
        mensaje: "Nombre válido."
    };
}//funcion validar nombreCompleto

