import { 
    validarNombreProducto,
    validarDescripcionProducto, 
    validarPrecioProducto, 
    validarCategoriaProducto, 
    validarStockProducto 
} from './validaciones.js';

document.addEventListener('DOMContentLoaded', () => {
    const formulario = document.getElementById('formulario-producto');

    if (formulario) {
        formulario.addEventListener('submit', function(event) {
            // Prevenir el envío por defecto para validarlo con JS
            event.preventDefault();

            // 1. Capturar los valores de los inputs del HTML
            const nombreInput = document.getElementById('nombre').value;
            const descripcionInput = document.getElementById('descripcion').value;
            const precioInput = document.getElementById('precio').value;
            const categoriaInput = document.getElementById('categoria').value;
            const imagenInput = document.getElementById('imagen').value;

            // 2. Ejecutar las funciones de validación
            const resNombre = validarNombreProducto(nombreInput);
            const resDesc = validarDescripcionProducto(descripcionInput);
            const resPrecio = validarPrecioProducto(precioInput);
            const resCat = validarCategoriaProducto(categoriaInput);

            // 3. Mostrar los mensajes de error en los span correspondientes
            document.getElementById('error-nombre').textContent = resNombre.valido ? '' : resNombre.mensaje;
            document.getElementById('error-descripcion').textContent = resDesc.valido ? '' : resDesc.mensaje;
            document.getElementById('error-precio').textContent = resPrecio.valido ? '' : resPrecio.mensaje;
            document.getElementById('error-categoria').textContent = resCat.valido ? '' : resCat.mensaje;

            // 4. Si alguna validación falla, detenemos el proceso
            if (!resNombre.valido || !resDesc.valido || !resPrecio.valido || !resCat.valido) {
                return;
            }

            // 5. Si todo es válido, crear el objeto JSON con la información del formulario
            const productoJson = {
                formulario: "agregar-producto",
                campos: {
                    nombre: nombreInput.trim(),
                    descripcion: descripcionInput.trim(),
                    precio: Number(precioInput),
                    categoria: categoriaInput.trim(),
                    imagen: imagenInput ? imagenInput.split('\\').pop() : ""
                }
            };

            // Mostrar el resultado en consola y notificar al usuario
            console.log("Objeto JSON generado:", JSON.stringify(productoJson, null, 2));
            alert("¡Formulario validado con éxito! Revisa la consola para ver el JSON generado.");
            
            //limpiar el formulario después de guardar
            formulario.reset();
        });
    }
});
