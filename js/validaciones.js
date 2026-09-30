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

export function validarNombre (nombre, apellido){
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
    if(typeof telefono != Number){
        return {
            valido: false, 
            mensaje: "Ingresa solo numeros"
        };
    }//validar que sea tipo numero
    
    const telefonoLimpio = telefono.trim; 

    if (telefonoLimpio === ""){
        return{
            valido: false, 
            mensaje: "El número teléfonico es obligatorio."
        }; 
    }
    const numeroRegex = ^\+[1-9]\d{1,14}$; 

    if (!numeroRegex.test(telefono)){
        return false; 
    }//if

    if(telefono.length !== 10){
        alert("El numero ingresado es menor a 10 dígitos");
        return false; 
    }//if 
    return true; 
}//funcion validar telefono