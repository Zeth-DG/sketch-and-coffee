export async function cargarHeader() {
  const contenedorHeader = document.querySelector("#header-global");

  if (!contenedorHeader) {
    return;
  }

  try {
    const respuesta = await fetch("./componentes/header.html");

    if (!respuesta.ok) {
      throw new Error("No se pudo cargar el header.");
    }

    const headerHTML = await respuesta.text();

    contenedorHeader.innerHTML = headerHTML;

    marcarEnlaceActivo();
  } catch (error) {
    console.error("Error al cargar el header:", error);
  }
}

export function marcarEnlaceActivo() {
  const paginaActual = window.location.pathname.split("/").pop() || "index.html";

  const enlaces = document.querySelectorAll("#header-global .nav-link");

  enlaces.forEach((enlace) => {
    const destino = enlace.getAttribute("href").split("/").pop();

    enlace.classList.remove("active");
    enlace.removeAttribute("aria-current");

    if (destino === paginaActual) {
      enlace.classList.add("active");
      enlace.setAttribute("aria-current", "page");
    }
  });
}

