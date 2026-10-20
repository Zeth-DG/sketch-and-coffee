// Estado temporal corregido
let especialidadWizardState = {
    platillo: null,
    detallePersonalizacion: null,
    esPaquete: false,
    precioPaqueteExtra: 60, // Costo fijo por hacerlo paquete
    bebidaPaquete: 'Café Americano (Incluido)',
    frutaPaquete: 'Papaya'
};

// PASO 1: Platillos Principales 
function iniciarWizardEspecialidades() {
    especialidadWizardState = {
        platillo: null,
        detallePersonalizacion: null,
        esPaquete: false,
        precioPaqueteExtra: 60,
        bebidaPaquete: 'Café Americano (Incluido)',
        frutaPaquete: 'Papaya'
    };

    let catPlatillos = menuData.categorias.find(c => c.id === "platillos");
    if (!catPlatillos) return;

    const contenedor = document.getElementById("menu-contenedor");

    let htmlPlatillos = catPlatillos.items.map(item => `
        <div class="col-12 col-md-4">
            <div class="card h-100 p-3 text-center border-0 shadow-sm cursor-pointer card-wizard" onclick='seleccionarPlatilloEspecialidad(${JSON.stringify(item)})'>
                <h5 class="fw-bold mb-1">${item.nombre}</h5>
                ${item.descripcion ? `<p class="text-muted small mb-2">${item.descripcion}</p>` : ''}
                <span class="fw-bold text-dark">$${item.precio} MXN</span>
            </div>
        </div>
    `).join('');

    contenedor.innerHTML = `
        <div class="col-12 text-center mb-4">
            <h4 class="fw-bold">1. Elige tu platillo</h4>
            <p class="text-muted small">Selecciona un platillo para comenzar</p>
        </div>
        <div class="col-12">
            <div class="row g-3 justify-content-center">
                ${htmlPlatillos}
            </div>
        </div>
    `;
}

// PASO 2: Personalizaciones Específicas
function seleccionarPlatilloEspecialidad(platilloObj) {
    especialidadWizardState.platillo = platilloObj;

    // Si el platillo no requiere elegir variedad, avanzamos directo al paquete
    if (!platilloObj.opcionesPersonalizacion || platilloObj.opcionesPersonalizacion.length === 0) {
        especialidadWizardState.detallePersonalizacion = null;
        preguntarSiEsPaquete();
        return;
    }

    const contenedor = document.getElementById("menu-contenedor");

    let tituloPersonalizacion = "Personaliza tu platillo";
    if (platilloObj.tipoPersonalizacion === 'preparacion') tituloPersonalizacion = "¿Cómo prefieres tus huevos?";
    if (platilloObj.tipoPersonalizacion === 'sabor') tituloPersonalizacion = "Elige el sabor de tu chapata";
    if (platilloObj.tipoPersonalizacion === 'extras') tituloPersonalizacion = "Elige la presentación de tus molletes";

    // Mapeamos las opciones considerando que ahora son objetos con .nombre y .precioAdicional
    // Normalizamos las opciones: si son strings, las convertimos a objetos {nombre, precioAdicional}
    let htmlOpciones = platilloObj.opcionesPersonalizacion.map((op, idx) => {
        let opcionObj;
        if (typeof op === 'string') {
            // Chapata, Huevos: string plano
            opcionObj = { nombre: op, precioAdicional: 0 };
        } else {
            // Molletes: objeto con nombre y precioAdicional
            opcionObj = {
                nombre: op.nombre,
                precioAdicional: op.precioAdicional || 0
            };
        }

        const opString = JSON.stringify(opcionObj);
        let textoPrecio = opcionObj.precioAdicional > 0
            ? ` (+$${opcionObj.precioAdicional})`
            : " (Incluido)";

        return `
        <div class="col-6 col-md-4">
            <div class="selector-sabor-item">
                <input type="radio" name="opcionPersonalizada" value='${opString}' id="op_${idx}" ${idx === 0 ? 'checked' : ''}>
                <label class="btn-sabor-option text-center" for="op_${idx}">
                    ${opcionObj.nombre} <br><small class="text-muted">${textoPrecio}</small>
                </label>
            </div>
        </div>
    `;
    }).join('');

    contenedor.innerHTML = `
        <div class="col-12 mb-3">
            <button class="btn btn-sm btn-dark rounded-pill px-3 shadow-sm mb-2" onclick="iniciarWizardEspecialidades()">
                <i class="bi bi-arrow-left me-1"></i> Volver a especialidades
            </button>
        </div>
        <div class="col-12 text-center mb-4">
            <h4 class="fw-bold">2. ${tituloPersonalizacion}</h4>
            <p class="text-muted small">Para tu <strong>${platilloObj.nombre}</strong> (Base: $${platilloObj.precio})</p>
        </div>
        <div class="col-12 mb-4">
            <div class="row g-2 justify-content-center">
                ${htmlOpciones}
            </div>
        </div>
        <div class="col-12 text-center">
            <button class="btn btn-dark btn-lg rounded-pill px-5 shadow" onclick="guardarPersonalizacionYContinuar()">
                Continuar a Paquete ➡
            </button>
        </div>
    `;
}

function guardarPersonalizacionYContinuar() {
    let seleccion = document.querySelector('input[name="opcionPersonalizada"]:checked');

    if (seleccion) {
        try {
            // Parseamos el JSON: ahora siempre será un objeto {nombre, precioAdicional}
            especialidadWizardState.detallePersonalizacion = JSON.parse(seleccion.value);
        } catch (e) {
            // Fallback por si algo sale mal: guardamos el value crudo como nombre
            especialidadWizardState.detallePersonalizacion = {
                nombre: seleccion.value,
                precioAdicional: 0
            };
        }
    } else {
        especialidadWizardState.detallePersonalizacion = null;
    }

    preguntarSiEsPaquete();
}

// PASO 3: ¿Hacerlo paquete? (+$45 MXN)
function preguntarSiEsPaquete() {
    const contenedor = document.getElementById("menu-contenedor");
    let tienePasoPrevio = especialidadWizardState.platillo.opcionesPersonalizacion && especialidadWizardState.platillo.opcionesPersonalizacion.length > 0;

    contenedor.innerHTML = `
        <div class="col-12 mb-3">
            <button class="btn btn-sm btn-dark rounded-pill px-3 shadow-sm mb-2" onclick="${tienePasoPrevio ? "seleccionarPlatilloEspecialidad(especialidadWizardState.platillo)" : "iniciarWizardEspecialidades()"}">
                <i class="bi bi-arrow-left me-1"></i> ${tienePasoPrevio ? 'Volver a opciones' : 'Volver a especialidades'}
            </button>
        </div>
        <div class="col-12 text-center mb-4">
            <h4 class="fw-bold">3. ¿Deseas hacerlo paquete?</h4>
            <p class="text-muted small">Incluye bebida, fruta de temporada y papas saladas (+$45 MXN)</p>
        </div>
        <div class="col-12">
            <div class="row g-3 justify-content-center">
                <div class="col-12 col-md-5">
                    <div class="card h-100 p-4 text-center border-0 shadow-sm cursor-pointer card-wizard" onclick="definirPaquete(true)">
                        <div class="fs-1 mb-2">🍽️ + ☕</div>
                        <h5 class="fw-bold m-0">Sí, hacerlo paquete</h5>
                        <p class="text-muted small m-0 mt-1">Añade bebida + fruta + papas por +$45 MXN</p>
                    </div>
                </div>
                <div class="col-12 col-md-5">
                    <div class="card h-100 p-4 text-center border-0 shadow-sm cursor-pointer card-wizard" onclick="definirPaquete(false)">
                        <div class="fs-1 mb-2">🍳</div>
                        <h5 class="fw-bold m-0">Solo el platillo</h5>
                        <p class="text-muted small m-0 mt-1">Ordenar únicamente $${especialidadWizardState.platillo.precio} MXN</p>
                    </div>
                </div>
            </div>
        </div>
    `;
}

function definirPaquete(esPaq) {
    especialidadWizardState.esPaquete = esPaq;
    if (esPaq) {
        mostrarPasoComplementosPaquete();
    } else {
        finalizarAgregarEspecialidadAlCarrito();
    }
}

// PASO 4: Complementos del paquete con desglose claro de bebidas
function mostrarPasoComplementosPaquete() {
    const contenedor = document.getElementById("menu-contenedor");

    contenedor.innerHTML = `
        <div class="col-12 mb-3">
            <button class="btn btn-sm btn-dark rounded-pill px-3 shadow-sm mb-2" onclick="preguntarSiEsPaquete()">
                <i class="bi bi-arrow-left me-1"></i> Volver
            </button>
        </div>
        <div class="col-12 text-center mb-4">
            <h4 class="fw-bold">4. Personaliza los complementos de tu paquete</h4>
            <p class="text-muted small">Elige una bebida y fruta para acompañar.</p>
        </div>
        
        <div class="col-12 col-md-8 mx-auto p-4 rounded-3 border shadow-sm">
            <!-- Selección de Bebida -->
            <div class="mb-4">
                <label class="form-label fw-bold text-dark">Elige una bebida:</label>
                <select id="select-bebida-paq" class="form-select border-secondary" onchange="actualizarSubopcionesBebida()">
                    <option value="Café Americano">Café americano</option>
                    <option value="Refresco">Refresco (335 ml)</option>
                    <option value="Jugo del Valle">Jugo del Valle (355 ml)</option>
                    <option value="Capuchino (+$20)">Cambiar por Capuchino (+$20 MXN)</option>
                    <option value="Latte (+$20)">Cambiar por Latte (+$20 MXN)</option>
                </select>
            </div>

            <!-- Contenedor dinámico para los sabores de Refresco o Jugo -->
            <div id="contenedor-sabores-bebida" class="mb-4"></div>

            <!-- Selección de Fruta -->
            <div class="mb-4">
                <label class="form-label fw-bold text-dark">Fruta de temporada:</label>
                <div class="row g-2">
                    <div class="col-6">
                        <div class="selector-sabor-item">
                            <input type="radio" name="frutaPaq" id="frutaPapaya" value="Papaya" checked>
                            <label class="btn-sabor-option text-center" for="frutaPapaya">Papaya</label>
                        </div>
                    </div>
                    <div class="col-6">
                        <div class="selector-sabor-item">
                            <input type="radio" name="frutaPaq" id="frutaManzana" value="Manzana">
                            <label class="btn-sabor-option text-center" for="frutaManzana">Manzana</label>
                        </div>
                    </div>
                </div>
            </div>

            <!-- Acompañante Fijo: Papas -->
            <div class="mb-4 p-3 bg-white rounded border">
                <small class="text-muted d-block">Incluye además:</small>
                <span class="fw-bold text-dark">🍟 Papas saladas (estilo Sabritas)</span>
            </div>

            <div class="text-center pt-2">
                <button class="btn btn-dark btn-lg rounded-pill px-5 shadow" onclick="finalizarAgregarEspecialidadAlCarrito()">
                    <i class="bi bi-cart-plus me-2"></i> Agregar paquete al pedido
                </button>
            </div>
        </div>
    `;

    // Ejecutar una vez al cargar para verificar si el valor por defecto requiere subopciones
    actualizarSubopcionesBebida();
}

function actualizarSubopcionesBebida() {
    const selectBebida = document.getElementById("select-bebida-paq");
    const contenedorSabores = document.getElementById("contenedor-sabores-bebida");
    const seleccion = selectBebida.value;

    if (seleccion === "Refresco") {
        contenedorSabores.innerHTML = `
            <label class="form-label fw-bold text-dark small">Elige el sabor de tu refresco (335 ml):</label>
            <div class="row g-2">
                <div class="col-6 col-md-4"><div class="selector-sabor-item"><input type="radio" name="saborRefresco" id="ref_orig" value="Coca-Cola original" checked><label class="btn-sabor-option text-center" for="ref_orig">Coca-Cola original</label></div></div>
                <div class="col-6 col-md-4"><div class="selector-sabor-item"><input type="radio" name="saborRefresco" id="ref_light" value="Coca-Cola light"><label class="btn-sabor-option text-center" for="ref_light">Coca-Cola light</label></div></div>
                <div class="col-6 col-md-4"><div class="selector-sabor-item"><input type="radio" name="saborRefresco" id="ref_zero" value="Coca-Cola zero"><label class="btn-sabor-option text-center" for="ref_zero">Coca-Cola zero</label></div></div>
                <div class="col-6 col-md-4"><div class="selector-sabor-item"><input type="radio" name="saborRefresco" id="ref_fanta" value="Fanta"><label class="btn-sabor-option text-center" for="ref_fanta">Fanta</label></div></div>
                <div class="col-6 col-md-4"><div class="selector-sabor-item"><input type="radio" name="saborRefresco" id="ref_mundet" value="Sidral mundet"><label class="btn-sabor-option text-center" for="ref_mundet">Sidral mundet</label></div></div>
                <div class="col-6 col-md-4"><div class="selector-sabor-item"><input type="radio" name="saborRefresco" id="ref_fresca" value="Fresca"><label class="btn-sabor-option text-center" for="ref_fresca">Fresca</label></div></div>
                <div class="col-6 col-md-4"><div class="selector-sabor-item"><input type="radio" name="saborRefresco" id="ref_jnar" value="Jarrito naranja"><label class="btn-sabor-option text-center" for="ref_jnar">Jarrito naranja</label></div></div>
                <div class="col-6 col-md-4"><div class="selector-sabor-item"><input type="radio" name="saborRefresco" id="ref_jpin" value="Jarrito piña"><label class="btn-sabor-option text-center" for="ref_jpin">Jarrito piña</label></div></div>
                <div class="col-6 col-md-4"><div class="selector-sabor-item"><input type="radio" name="saborRefresco" id="ref_jlim" value="Jarrito limón"><label class="btn-sabor-option text-center" for="ref_jlim">Jarrito limón</label></div></div>
            </div>
        `;
    } else if (seleccion === "Jugo del Valle") {
        contenedorSabores.innerHTML = `
            <label class="form-label fw-bold text-dark small">Elige el sabor de tu jugo (355 ml):</label>
            <div class="row g-2">
                <div class="col-4"><div class="selector-sabor-item"><input type="radio" name="saborJugo" id="jug_mango" value="Mango" checked><label class="btn-sabor-option text-center" for="jug_mango">Mango</label></div></div>
                <div class="col-4"><div class="selector-sabor-item"><input type="radio" name="saborJugo" id="jug_manzana" value="Manzana"><label class="btn-sabor-option text-center" for="jug_manzana">Manzana</label></div></div>
                <div class="col-4"><div class="selector-sabor-item"><input type="radio" name="saborJugo" id="jug_durazno" value="Durazno"><label class="btn-sabor-option text-center" for="jug_durazno">Durazno</label></div></div>
            </div>
        `;
    } else {
        // Si elige café o capuchino, limpia el contenedor de sabores
        contenedorSabores.innerHTML = "";
    }
}

// Finalizar y enviar al Carrito
function finalizarAgregarEspecialidadAlCarrito() {
    let p = especialidadWizardState;
    let precioTotal = p.platillo.precio;
    let descripcionDetallada = "";

    // ✅ Manejo correcto del detalle de personalización
    if (p.detallePersonalizacion) {
        let nombreOpcion = p.detallePersonalizacion.nombre || p.detallePersonalizacion;
        let precioExtra = p.detallePersonalizacion.precioAdicional || 0;
        
        precioTotal += precioExtra;
        descripcionDetallada += `Opción: ${nombreOpcion}`;
        if (precioExtra > 0) {
            descripcionDetallada += ` (+$${precioExtra})`;
        }
    }

    if (p.esPaquete) {
        precioTotal += p.precioPaqueteExtra;
        
        let bebidaSel = document.getElementById("select-bebida-paq")?.value || "Café Americano";
        if (bebidaSel.includes("+20")) {
            precioTotal += 20;
        }

        // ✅ Capturamos el sabor si es Refresco o Jugo
        let saborBebida = "";
        if (bebidaSel === "Refresco") {
            let saborRef = document.querySelector('input[name="saborRefresco"]:checked')?.value;
            if (saborRef) saborBebida = ` (${saborRef})`;
        } else if (bebidaSel === "Jugo del Valle") {
            let saborJug = document.querySelector('input[name="saborJugo"]:checked')?.value;
            if (saborJug) saborBebida = ` (${saborJug})`;
        }

        let frutaSel = document.querySelector('input[name="frutaPaq"]:checked')?.value || "Papaya";

        descripcionDetallada += (descripcionDetallada ? " | " : "") 
            + `Paquete: ${bebidaSel}${saborBebida}, Fruta: ${frutaSel}, Papas saladas`;
    }

    let productoFinal = {
        id: 'platillo_' + Date.now(),
        nombre: `${p.platillo.nombre} ${p.esPaquete ? '(Paquete)' : ''}`,
        precio: precioTotal,
        cantidad: 1,
        descripcion: descripcionDetallada
    };

    carrito.push(productoFinal);
    guardarYActualizarCarrito();

    mostrarToastNotificacion(`¡${productoFinal.nombre} agregado al pedido!`);
    renderizarCategoria('platillos');
}