// menu-render.js
// Genera las tarjetas del catálogo a partir de los datos del JSON.
import { cargarMenuTop } from './menu-productos.js';

const grilla = document.getElementById('grilla-productos'); 
const subtitulo = document.getElementById('subtitulo-catalogo');

function crearTarjeta(prod, indice) {
  const id = `producto-${indice + 1}`;
  const precio = Number(prod.precio).toFixed(2);

  return `
    <div class="col" role="listitem">
      <article id="${id}" class="tarjeta-producto" aria-labelledby="nombre-${id}">
        <div class="contenedor-imagen-producto">
          <img src="${prod.imagen}" alt="${prod.nombre}" loading="lazy">
        </div>
        <h3 id="nombre-${id}" class="titulo-producto">${prod.nombre}</h3>
        <div class="precio-producto" aria-label="Precio: ${precio} pesos mexicanos">$${precio} MXN</div>
        <div class="pie-tarjeta-producto">
          <span class="indicador-gris" aria-hidden="true"></span>
          <button class="btn boton-anadir${prod.disponible ? ' activo' : ''}"
                  data-sku="${prod.sku}" ${prod.disponible ? '' : 'disabled'}
                  aria-label="Añadir ${prod.nombre} al carrito de compras">
            ${prod.disponible ? 'Añadir' : 'Agotado'}
          </button>
        </div>
      </article>
    </div>`;
}

document.addEventListener('DOMContentLoaded', async () => {
  const productos = await cargarMenuTop();

  if (!productos.length) {
    grilla.innerHTML = '<p class="col-12">No se pudieron cargar los productos.</p>';
    return;
  }

  grilla.innerHTML = productos.map(crearTarjeta).join('');

  if (subtitulo) {
    subtitulo.textContent = `${productos.length} productos disponibles`;
  }
});