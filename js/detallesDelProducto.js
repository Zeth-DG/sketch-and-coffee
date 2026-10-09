// ==========================================================================
// INTERACCIONES PARA DETALLES DEL PRODUCTO - SKETCH & COFFEE
// ARCHIVO: ./js/script.js
// ==========================================================================

/**
 * Cambia la imagen principal cuando el usuario hace clic en una miniatura
 * @param {HTMLElement} element - La miniatura (div) que recibió el clic
 * @param {string} newSrc - Ruta local de la imagen (ej. './assets/img/foto1.jpg')
 */
function changeImage(element, newSrc) {
  // 1. Localiza el cuadro de la imagen grande
  const mainImg = document.getElementById('main-product-img');
  
  if (mainImg) {
    // 2. Reemplaza la ruta de la imagen grande por la de la miniatura clickeada
    mainImg.src = newSrc;
  }

  // 3. Quita el borde activo de todas las miniaturas
  document.querySelectorAll('.thumb-item').forEach(item => {
    item.classList.remove('active');
  });

  // 4. Marca la miniatura clickeada con el borde activo (var(--color-magenta))
  element.classList.add('active');
}

/**
 * Selecciona una opción dentro de un grupo (Molienda o Gramaje)
 * @param {HTMLElement} button - Botón de la opción clickeada
 */
function selectOption(button) {
  const parent = button.parentElement;
  parent.querySelectorAll('.btn-option').forEach(btn => btn.classList.remove('active'));
  button.classList.add('active');
}

/**
 * Incrementa o decremeta el contador de cantidad (+ / -)
 * @param {number} val - Cantidad a sumar (+1) o restar (-1)
 */
function updateQty(val) {
  const input = document.getElementById('qty-input');
  if (!input) return;

  let current = parseInt(input.value) || 1;
  current = Math.max(1, Math.min(10, current + val));
  input.value = current;
}

/**
 * Suma la cantidad seleccionada al badge del carrito en el Header
 */
let cartCount = 0;
function addToCart() {
  const input = document.getElementById('qty-input');
  const cartBadge = document.getElementById('cart-count');

  const qty = input ? (parseInt(input.value) || 1) : 1;
  cartCount += qty;

  if (cartBadge) {
    cartBadge.innerText = cartCount;
  }
}

/**
 * Alterna el contenido visible entre las pestañas (Tabs)
 * @param {Event} evt - Evento de clic
 * @param {string} tabName - ID del contenedor de la pestaña (ej. 'tab-desc')
 */
function openTab(evt, tabName) {
  // Oculta todos los contenidos y quita estados activos
  document.querySelectorAll('.tab-content').forEach(tab => tab.classList.remove('active'));
  document.querySelectorAll('.tab-btn').forEach(btn => btn.classList.remove('active'));

  // Muestra el contenido seleccionado y activa el botón correspondete
  const targetTab = document.getElementById(tabName);
  if (targetTab) {
    targetTab.classList.add('active');
  }

  evt.currentTarget.classList.add('active');
}
