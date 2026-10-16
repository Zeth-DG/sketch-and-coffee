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

// ==========================================================================
// PRODUCTOS DEL CARRUSEL
// ==========================================================================

const products = {

  1: {
    name: "LATTE",
    price: "$ 85.00 MXN",
    rating: "★★★★★",
    image: "./imagenes/alimentos-menu/latte-caliente.jpg",
    desc: "Espresso de altura coronado con una densa capa de microespuma de leche de tu preferencia.",
    cata: "Perfil suave, cremoso y equilibrado.",
    prep: "Servir caliente.",
    envio: "Disponible en sucursal."
  },

  2: {
    name: "CAPUCCINO",
    price: "$ 90.00 MXN",
    rating: "★★★★★",
    image: "./imagenes/alimentos-menu/capuchino.jpg",
    desc: "Un balance armonioso entre la intensidad del espresso de especialidad y una nube de leche al vapor suave y cremosa.",
    cata: "Notas dulces y achocolatadas.",
    prep: "Servir caliente.",
    envio: "Disponible en sucursal."
  },

  3: {
    name: "CHAI LATTE",
    price: "$ 95.00 MXN",
    rating: "★★★★★",
    image: "./imagenes/alimentos-menu/chai-latte.jpg",
    desc: "Infusión aromática de tés negros con cardamomo, canela y jengibre.",
    cata: "Perfil especiado y dulce.",
    prep: "Servir caliente.",
    envio: "Disponible en sucursal."
  },

  4: {
    name: "CROISSANT",
    price: "$ 95.00 MXN",
    rating: "★★★★★",
    image: "./imagenes/alimentos-menu/croissant-salado.jpg",
    desc: "Láminas doradas y crujientes de fino hojaldre artesanal, horneadas a la perfección para lograr una textura ligera, suave y esponjosa por dentro.",
    cata: "Perfil crujiente y sabroso.",
    prep: "Servir caliente.",
    envio: "Disponible en sucursal."
  },

  5: {
    name: "ENCHILADAS",
    price: "$ 95.00 MXN",
    rating: "★★★★★",
    image: "./imagenes/alimentos-menu/enquiladas.jpg",
    desc: "Tortillas artesanales con pechuga de pollo bañadas en deliciosa crema y salsa de la casa, queso, cebolla fresca y cilantro recién cortado, listas para deleitar tu paladar.",
    cata: "Perfil picante y sabroso.",
    prep: "Servir caliente.",
    envio: "Disponible en sucursal."
  },

  6: {
    name: "CHILAQUILES",
    price: "$ 95.00 MXN",
    rating: "★★★★★",
    image: "./imagenes/alimentos-menu/chilaquiles.jpg",
    desc: "Totopos crujientes bañados con salsa especiada, enriquesidos con crema ácida, queso espolvoreado y el punto exacto de picor.",
    cata: "Perfil picante y sabroso.",
    prep: "Servir caliente.",
    envio: "Disponible en sucursal."
  },

  7: {
    name: "AMERICANO",
    price: "$ 95.00 MXN",
    rating: "★★★★★",
    image: "./imagenes/alimentos-menu/americano.jpg",
    desc: "Extracción limpia de grano recién molido con notas tostadas, aroma envolvente y un perfil suave pero con carácter.",
    cata: "Perfil fuerte y afrutado.",
    prep: "Servir caliente.",
    envio: "Disponible en sucursal."
  },

  8: {
    name: "CHOCOLATE CALIENTE",
    price: "$ 95.00 MXN",
    rating: "★★★★★",
    image: "./imagenes/alimentos-menu/chocolate-caliente.jpg",
    desc: "Cacao puro fundido en leche entera, logrando una bebida rica, espesa y con el dulzor perfecto para reconfortar el alma.",
    cata: "Perfil dulce y cremoso.",
    prep: "Servir caliente.",
    envio: "Disponible en sucursal."
  },

  9: {
    name: "TISANA PINK BLOSSOM",
    price: "$ 95.00 MXN",
    rating: "★★★★★",
    image: "./imagenes/alimentos-menu/tisana-pink-blossom.jpg",
    desc: "Infusión frutal de notas florales y matices rosados vibrantes; un elixir fresco, ligero y naturalmente dulce. ",
    cata: "Perfil especiado y dulce.",
    prep: "Servir caliente.",
    envio: "Disponible en sucursal."
  },

  10: {
    name: "CREPA CON NUTELLA Y PHILADELPHIA",
    price: "$ 95.00 MXN",
    rating: "★★★★★",
    image: "./imagenes/alimentos-menu/crepa-nutella-philadelphia.jpg",
    desc: "Fina crepa artesanal dorada a la plancha, rebozante de suave queso crema y abundante crema de avellana y cacao.",
    cata: "Perfil especiado y dulce.",
    prep: "Servir caliente.",
    envio: "Disponible en sucursal."
  },

};

function loadProduct(productId) {

  const product = products[productId];

  if (!product) return;

  // Imagen principal
  const mainImage =
    document.getElementById("main-product-img");

  if (mainImage) {
    mainImage.src = product.image;
    mainImage.alt = product.name;
  }

  // Nombre
  const title =
    document.getElementById("product-title");

  if (title) {
    title.textContent = product.name;
  }

  // Precio
  const price =
    document.getElementById("product-price");

  if (price) {
    price.innerHTML = product.price;
  }

  // Calificación
  const rating =
    document.getElementById("product-rating");

  if (rating) {
    rating.innerHTML =
      `CALIFICACION • ${product.rating}`;
  }

  // Tabs
  document.getElementById("tab-desc").textContent =
    product.desc;

  document.getElementById("tab-cata").textContent =
    product.cata;

  document.getElementById("tab-prep").textContent =
    product.prep;

  document.getElementById("tab-envio").textContent =
    product.envio;

  // Llevar al usuario al producto
  document
    .querySelector(".product-detail-grid")
    .scrollIntoView({
      behavior: "smooth",
      block: "start"
    });
}