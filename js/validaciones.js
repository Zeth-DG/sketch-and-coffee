export function validarCorreo (email){
    if(typeof email !=="string"){
        return {
            valido: false, 
            mensaje: "Introduce texto"
        };
    }//verifica que sea un string

    const emailLimpio = email.trim(); //quitar espacios al inicio y al final
    const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/; //estructura aceptada 

    if(emailLimpio === ""){
        return {
            valido: false,
            mensaje: "Escribe tu correo electrónico."
        }
    }//verifica que no este vacío

    if (!emailRegex.test(emailLimpio)){
        return {
            valido: false,
            mensaje: "Escribe un correo con el formato nombre@dominio.com, sin espacios."
        }
    }//verifica que tenga la expresión regular de un email

    return {
        valido: true, 
        mensaje: "Correo electrónico válido"
    }; 
}//funcion validar correo 

export function validarTelefono(telefono){
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
            mensaje: "Escribe tu número de teléfono."
        }; 
    }//no dejar el campo vacío

    //para quitar espacios, guiones y paréntesis entre números
    const telefonoSinSeparadores = telefonoLimpio.replace(/[\s()-]/g, "");
    //para validar que el numero "limpio" solo son números y de 10 dígitos
    const numeroRegex = /^\d{10}$/; 

    if (!numeroRegex.test(telefonoSinSeparadores)){
        return {
            valido: false, 
            mensaje: "Escribe 10 dígitos. Ej: 5512345678. Puedes separarlos con espacios o guiones."
        }; 
    }//if numero sin 10 dígitos

    const todosIguales = /^(\d)\1+$/.test(telefonoSinSeparadores); 

    if (todosIguales){
        return {
            valido: false, 
            mensaje: "El número no puede tener todos los dígitos iguales (ej. 5555555555)."
        };
    }//if todos los numeros son iguales

    const primerDigito = telefonoSinSeparadores[0];

    if (!/[2-9]/.test(primerDigito)) {
        return { 
            valido: false, 
            mensaje: "El número debe empezar con un dígito del 2 al 9" 
        };
    }//if el numero no empieza con 2-9

    return {
        valido: true,
        mensaje: "El número telefónico es válido."
    }; 
}//funcion validar telefono sin separadores y de 10 dígitos

export function validarMensaje(mensaje){
    if (typeof mensaje != "string"){
        return{
            valido: false, 
            mensaje: "El mensaje debe ser texto."
        }; 
    }//debe ser texto 

    const mensajeLimpio = mensaje.trim(); //quitar espacios al inicio y al final
    
    //el mensaje esta vacío?
    if(mensajeLimpio === ""){
        return{
            valido: false, 
            mensaje: "Escribe tu mensaje."
        };
    }//if
    
    //el mensaje es de menos de 10 caracteres?
    if(mensajeLimpio.length < 10){
        return{
            valido: false, 
            mensaje: `Tu mensaje debe tener al menos 10 caracteres (llevas ${mensajeLimpio.length})`
        };
    }//if

    //el mensaje es muy largo?
    if(mensajeLimpio.length>1000){
        return{
            valido: false, 
            mensaje: `Tu mensaje no puede pasar de 1000 caracteres (llevas ${mensajeLimpio.length})`
        };
    }//if

    //paso todas las validaciones: 
    return{
        valido: true,
        mensaje: "El mensaje es válido"
    }//return
}//funcion validar mensaje


export function validarNombre (nombre){
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
            mensaje: "Escribe tu nombre."
        }; 
    }
    // el nombre tiene una longitud mayor a 3 caracteres pero menor a 30?
    if (nombreLimpio.length < 3 || nombreLimpio.length > 100 ){
        return {
            valido: false,
            mensaje: "Tu nombre debe tener entre 3 y 100 caracteres."
        }; 
    }
    const nameRegex = /^[\p{L}\s\.-]+$/u; //unicode se agrega que acepte puntos

    //tiene caracteres invalidos?
    if (!nameRegex.test(nombreLimpio)) {
        return {
            valido: false, 
            mensaje: "Usa solo letras, espacios, puntos o guiones. No uses números ni símbolos."
        }; 
    }

    return {
        valido: true,
        mensaje: "Nombre válido."
    };
}//funcion validar nombre

export function validarAsunto(asunto){
    if (asunto === ""){
        return{
            valido: false, 
            mensaje: "Selecciona un asunto de la lista."
        }; 
    }

    return{
        valido: true,
        mensaje: "Asunto seleccionado correctamente."
    }
}//funcion validarAsunto

export function validarPrivacidad(aceptada){
    if (aceptada === "null" || aceptada === "undefined" || aceptada === "false" || aceptada === ""){
        return{
            valido: false, 
            mensaje: "Marca la casilla para aceptar el aviso de privacidad."
        };
    }//if

    //el checkbox está vacío?
    if (!aceptada){
        return{
            valido: false, 
            mensaje: "Marca la casilla para aceptar el aviso de privacidad."
        };
    }//if

    return{
        valido: true, 
        mensaje: "Aviso de privacidad aceptado correctamente."
    };
}//funcion validarPrivacidad


// Validar Nombre del producto Alexandra
export function validarNombreProducto(nombre) {
    if (typeof nombre !== "string") {
        return {
            valido: false,
            mensaje: "Introduce texto para el nombre."
        };
    }

    const nombreLimpio = nombre.trim();

    if (nombreLimpio === "") {
        return {
            valido: false,
            mensaje: "Escribe el nombre del producto."
        };
    }

    if (nombreLimpio.length < 3 || nombreLimpio.length > 100) {
        return {
            valido: false,
            mensaje: "El nombre del producto debe tener entre 3 y 100 caracteres."
        };
    }
    
    const regexNombre = /^[\p{L}0-9\s\.\-]+$/u;
    if (!regexNombre.test(nombreLimpio)) {
        return { valido: false, mensaje: "El nombre contiene caracteres no permitidos." };
    }

    return {
        valido: true,
        mensaje: "Nombre del producto válido."
    };
}//función validar nombre de producto

//Validar Descripcion del producto Alexandra 
export function validarDescripcionProducto(descripcion) {
    if (typeof descripcion !== "string") {
        return {
            valido: false,
            mensaje: "La descripción debe ser texto."
        };
    }

    const descripcionLimpia = descripcion.trim();

    if (descripcionLimpia === "") {
        return {
            valido: false,
            mensaje: "Escribe una descripción para el producto."
        };
    }

    if (descripcionLimpia.length < 5 || descripcionLimpia.length > 500) {
        return {
            valido: false,
            mensaje: "La descripción debe tener entre 5 y 500 caracteres."
        };
    }

    const regexDescripcion = /^[\p{L}0-9\s\.\-]+$/u;
    if (!regexDescripcion.test(descripcionLimpia)) {
        return {
            valido: false,
            mensaje: "La descripción contiene caracteres no permitidos."
        };
    }

    return {
        valido: true,
        mensaje: "Descripción válida."
    };
}//función validar descripción

//====================================================================
// Validar Precio del producto(Manuel)
export function validarPrecioProducto(precio) {
    const precioNum = Number(precio);
    
    if (precio === "" || isNaN(precioNum)) {
        return {
            valido: false,
            mensaje: "Introduce un precio válido para el producto."
        };//return

    }// if precio invalido

    if (precioNum <= 0) {
        return {
            valido: false,
            mensaje: "El precio debe ser mayor a cero."
        };//return

    }//if precio debe ser mayor a 0

    if (precioNum > 100000) {
        return {
            valido: false,
            mensaje: "El precio excede el límite máximo permitido."
        };//return

    }// if precio excede lo permitido

    return {
        valido: true,
        mensaje: "Precio del producto válido."
    };//return

}// validarPrecioProducto

//==============================================================================
// Validar Categoria del producto (Manuel)
export function validarCategoriaProducto(categoria) {
    const categoriasPermitidas = ["bebidas", "snack", "postres"];
    
    if (!categoria || !categoriasPermitidas.includes(categoria.trim())) {
        return {
            valido: false,
            mensaje: "Selecciona una categoría válida del menú."
        };// return
    }//if

    return {
        valido: true,
        mensaje: "Categoría válida."
    };//return
}// validarCategoriaProducto


// ===========================================================================================

// Validar Stock del producto (Máximo 10 productos) NOTA: Este valor puede cambiar en un futuro (Manuel)
export function validarStockProducto(stock) {
    const stockNum = Number(stock);

    if (stock === "" || isNaN(stockNum) || !Number.isInteger(stockNum)) {
        return {
            valido: false,
            mensaje: "Introduce un número entero válido para el stock."
        };//return

    }//if numero valido

    if (stockNum < 0) {
        return {
            valido: false,
            mensaje: "El stock no puede ser un valor negativo."
        };//return

    }//if no puede ser negativo

    if (stockNum > 10) {
        return {
            valido: false,
            mensaje: "El stock máximo permitido es de hasta 10 productos."
        };//return

    }//if maximo 10 productos

    return {
        valido: true,
        mensaje: "Stock válido."
    };//return

}//validarStockProducto

//=============FIN VALIDACIONES MANUEL =======================================


// Validación del campo Nombre y Apellido (Obligatoriedad) Alexandra
export function validarNombreRegistro(nombre) {
    const nombreLimpio = typeof nombre === "string" ? nombre.trim() : "";

    if (nombreLimpio === "") {
        return {
            valido: false,
            mensaje: "Escribe tu nombre y apellido."
        };
    }//no dejar el campo vacío
    return {
        valido: true,
        mensaje: "Nombre válido."
    };
}

// Validación del campo Teléfono (Obligatoriedad)
export function validarTelefonoRegistro(telefono) {
    const telefonoLimpio = typeof telefono === "string" ? telefono.trim() : "";

    if (telefonoLimpio === "") {
        return {
            valido: false,
            mensaje: "Escribe tu número de teléfono."
        };
    }//no dejar el campo vacío
    return {
        valido: true,
        mensaje: "Teléfono válido."
    };
}

// Validación del campo Correo Electrónico (Obligatoriedad) (Laura)
export function validarCorreoRegistro(correo) {
    const correoLimpio = typeof correo === "string" ? correo.trim() : ""; 
    
    if (correoLimpio === "") {
        return {
            valido: false, 
            mensaje: "Escribe tu correo electrónico." 
        };
    } 

    const regexCorreo = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;

    if (!regexCorreo.test(correoLimpio)) {
        return {
            valido: false,
            mensaje: "El formato del correo electrónico no es válido."
        };
    }

    return {
        valido: true, 
        mensaje: "Correo electrónico válido." 
    }; 
}

// Validación del campo Contraseña (Obligatoriedad)
export function validarContrasenaRegistro(password) {
    const passwordLimpio = typeof password === "string" ? password.trim() : "";

    if (passwordLimpio === "") {
        return {
            valido: false,
            mensaje: "Escribe tu contraseña."
        };
    }//no dejar el campo vacío
    return {
        valido: true,
        mensaje: "Contraseña válida."
    };
}

// Validación del campo Confirmar Contraseña (Obligatoriedad)
export function validarConfirmarContrasena(confirmPassword) {
    const confirmLimpio = typeof confirmPassword === "string" ? confirmPassword.trim() : "";

    if (confirmLimpio === "") {
        return {
            valido: false,
            mensaje: "Confirma tu contraseña."
        };
    }//no dejar el campo vacío
    return {
        valido: true,
        mensaje: "Confirmación válida."
    };
}

// Validación del Checkbox de Aviso de Privacidad (Obligatoriedad)
export function validarPrivacidad(privacidad) {
    if (!privacidad) {
        return {
            valido: false,
            mensaje: "Debes aceptar el Aviso de privacidad."
        };
    }//validar que esté marcado
    return {
        valido: true,
        mensaje: "Aviso de privacidad aceptado."
    };
}

//============validacion Alexandra===============================
