import { cargarHeader } from "./header.js"

cargarHeader();

document.addEventListener("DOMContentLoaded", () => {
  
  // ==========================================
  //      CÓDIGO DEL BOTÓN PARA SUBIR
  // ==========================================
  const btn = document.getElementById("btnSubir");

  if (btn) {
    window.onscroll = function() {
      if (document.documentElement.scrollTop > 100 || document.body.scrollTop > 100) {
        btn.style.display = "flex";
      } else {
        btn.style.display = "none";
      }
    };

    btn.onclick = function() {
      window.scrollTo({
        top: 0,
        behavior: "smooth"
      });
    };
  }
  // ==========================================

});
