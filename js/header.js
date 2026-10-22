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

    const campoBusqueda = contenedorHeader.querySelector("#buscar-producto");
    if (campoBusqueda) {
      campoBusqueda.value = new URLSearchParams(window.location.search).get("buscar") || "";
    }

    configurarSesion(contenedorHeader);
    marcarEnlaceActivo();
  } catch (error) {
    console.error("Error al cargar el header:", error);
  }
}

function configurarSesion(header) {
  const botonCuenta = header.querySelector("#btnCuenta");
  const enlacePanel = header.querySelector("#btnPanelAdmin");
  const botonCerrarSesion = header.querySelector("#btnCerrarSesion");
  let usuario = null;

  try {
    usuario = JSON.parse(localStorage.getItem("app_authenticated_user") || "null");
  } catch (error) {
    console.error("No se pudo leer la sesión:", error);
  }

  if (!usuario) return;

  if (botonCuenta) botonCuenta.classList.add("d-none");
  if (botonCerrarSesion) botonCerrarSesion.classList.remove("d-none");
  if (usuario.rol === "administrador" && enlacePanel) {
    enlacePanel.classList.remove("d-none");
  }

  botonCerrarSesion?.addEventListener("click", () => {
    localStorage.removeItem("app_authenticated_user");
    window.location.replace("index.html");
  });
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
