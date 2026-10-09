// menu-service.js
import { detallesPersonalizados } from './menu-detalles.js';

export let menuTopEnriquecido = [];

export async function cargarMenuTop() {
  try {
    const response = await fetch("../menu/JSON%20documentos/menu.json");
    if (!response.ok) throw new Error('No se pudo cargar el menú referencia');
    
    const rawData = await response.json();

    // 1. Limpiar el JSON 
    const productosLimpios = Object.values(rawData.data).map(producto => ({
      nombre: producto.name || "Sin nombre",
      departamento: producto.department || "Sin departamento",
      precio: producto.origins && producto.origins.length > 0 ? producto.origins[0].price : "0.00",
      disponible: producto.isProductAvailable ?? false
    }));

    // 2. Palabras clave del top 10
    const palabrasClave = [
      "croissant salado", "enchiladas", "chilaquiles", "latte",
      "capuchino", "americano", "chai latte", "chocolate caliente", 
      "tisana pink blossom", "crepa"
    ];

    // 3. Filtrar los productos asegurándonos de excluir el departamento de ingredientes
    const productosFiltrados = productosLimpios.filter(prod => {
      const nombreLower = prod.nombre.toLowerCase();
      const deptoLower = prod.departamento.toLowerCase();

      // Regla A: No debe pertenecer al departamento de ingredientes
      const esIngrediente = deptoLower.includes("ingrediente");

      // Regla B: Debe coincidir con alguna palabra clave del top
      const coincideClave = palabrasClave.some(termino => nombreLower.includes(termino));

      // Se queda solo si coincide con el top Y NO es un ingrediente
      return coincideClave && !esIngrediente;
    });

    // 4. CRUCE DE DATOS: Agregar descripción e imagen
    menuTopEnriquecido = productosFiltrados.map(prod => {
      const claveEncontrada = palabrasClave.find(termino => prod.nombre.toLowerCase().includes(termino));
      const infoExtra = claveEncontrada ? detallesPersonalizados[claveEncontrada] : null;

      return {
        ...prod,
        descripcion: infoExtra ? infoExtra.descripcion : "Próximamente descripción disponible.",
        imagen: infoExtra ? infoExtra.imagen : "./img/default.jpg"
      };
    });

    console.log("Menú filtrado (sin ingredientes) y enriquecido:", menuTopEnriquecido);
    return menuTopEnriquecido;

  } catch (error) {
    console.error("Error procesando el menú:", error);
    return [];
  }
}