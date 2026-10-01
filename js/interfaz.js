export function mostrarError(elemento, resultado){
    if (resultado.valido){
        elemento.textContent = "";
    } else {
        elemento.textContent = resultado.mensaje; 
    }//else
}//funcion mostrar error