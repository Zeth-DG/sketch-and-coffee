// menu-productos.js
import { detallesPersonalizados } from './menu-detalles.js';

export async function cargarProductosCatalogo() {
  const productosCatalogo = [];

  // 1. NUEVO: Cargar el JSON de productos extra (Cafés y Postres)
  try {
    // Ajusta la ruta si guardaste el JSON en otra carpeta
    const respuestaExtra = await fetch("../menu/JSON%20documentos/productos-extra.json");
    if (respuestaExtra.ok) {
      const productosExtra = await respuestaExtra.json();
      productosCatalogo.push(...productosExtra);
    }
  } catch (error) {
    console.warn("No se pudo cargar productos-extra.json:", error);
  }

  // 2. Cargar el menú original (el de Bistrosoft)
  try {
    const response = await fetch("../menu/JSON%20documentos/menu.json");
    if (!response.ok) throw new Error('No se pudo cargar el menú referencia');
    
    const rawData = await response.json();

    const productosLimpios = Object.values(rawData.data).map(producto => ({
      nombre: producto.name || "Sin nombre",
      departamento: producto.department || "Sin departamento",
      precio: producto.origins && producto.origins.length > 0 ? producto.origins[0].price : "0.00",
      sku: producto.sku || "Sin sku", 
      disponible: producto.isProductAvailable ?? false
    }));

    const palabrasClave = [
      "croissant salado", "chai latte", "chocolate caliente", "tisana pink blossom",
      "enchiladas", "chilaquiles", "capuchino", "americano", "latte frio", "latte caliente", "crepa"
    ];

    const productosFiltrados = productosLimpios.filter(prod => {
      const nombreLower = prod.nombre.toLowerCase();
      const deptoLower = prod.departamento.toLowerCase();
      const esIngrediente = deptoLower.includes("ingrediente");
      const coincideClave = palabrasClave.some(termino => nombreLower.includes(termino));
      return coincideClave && !esIngrediente;
    });

    const productosDelMenu = productosFiltrados.map(prod => {
      const claveEncontrada = palabrasClave.find(termino => prod.nombre.toLowerCase().includes(termino));
      const infoExtra = claveEncontrada ? detallesPersonalizados[claveEncontrada] : null;

      return {
        ...prod,
        descripcion: infoExtra ? infoExtra.descripcion : "Próximamente descripción disponible.",
        imagen: infoExtra ? infoExtra.imagen : "./img/default.jpg"
      };
    });
    productosCatalogo.push(...productosDelMenu);
  } catch (error) {
    console.error("No se pudo cargar el menú de referencia:", error);
  }

  // 3. Cargar los productos que el usuario agregue manualmente (LocalStorage)
  try {
    const productosGuardados = JSON.parse(localStorage.getItem("productos_agregados") || "[]");
    const productosNuevos = productosGuardados.map(producto => ({
      nombre: producto.nombre,
      departamento: producto.categoria,
      categoria: producto.categoria,
      precio: producto.precio,
      sku: `local-${producto.id}`,
      disponible: true,
      descripcion: producto.descripcion,
      imagen: producto.imagen
    }));

    productosCatalogo.push(...productosNuevos);
  } catch (error) {
    console.error("No se pudieron cargar los productos guardados:", error);
  }

  console.info(`Catálogo cargado con ${productosCatalogo.length} productos.`);
  return productosCatalogo;
}