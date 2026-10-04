## 🧪 Validaciones – Formulario Sketch & coffee

Conjunto de pruebas unitarias con **Jest** para validar los campos de un formulario de contacto de nuestra cafetería.

### ✅ Funciones validadas

- `validarCorreo`
- `validarNombre`
- `validarTelefono`
- `validarMensaje`
- `validarAsunto`
- `validarPrivacidad`

### ▶️ Ejecutar pruebas

```bash
npm test
```

**Resultado esperado:**

```
Test Suites: 1 passed, 1 total
Tests:       42 passed, 42 total
```

***

## 📖 Cómo usar cada función

Todas las funciones devuelven un objeto con la estructura:

```js
{ valido: boolean, mensaje: string }
```

### 1. `validarCorreo(email)`

Valida formato de correo electrónico.

**Casos que valida:**
- No vacío ni solo espacios
- Contiene `@` y dominio con TLD (`.com`, `.es`, `.co`, etc.)
- Rechaza `@` al inicio/fin, dominios vacíos o espacios en el correo

***

### 2. `validarNombre(nombre)`

Valida nombre propio (cliente).

**Casos que valida:**
- Mínimo 3 caracteres
- Solo letras, acentos, espacios y guiones
- Rechaza números, símbolos o caracteres especiales

***

### 3. `validarTelefono(telefono)`

Valida número telefónico (México, 10 dígitos).

**Casos que valida:**
- Exactamente 10 dígitos (ignora guiones y espacios visuales)
- Rechaza letras, símbolos o longitudes incorrectas (menos de 10 o más de 10 dígitos numéricos)

***

### 4. `validarMensaje(mensaje)`

Valida mensaje del cliente.


**Casos que valida:**
- No vacío ni solo espacios
- Entre 10 y 1000 caracteres
- Permite saltos de línea (párrafos múltiples)

***

### 5. `validarAsunto(asunto)`

Valida selección de asunto (lista desplegable).

**Casos que valida:**
- No vacío (debe seleccionar una opción de la lista)
- Opciones típicas: `"Reserva"`, `"Pedido"`, `"Queja"`, `"Sugerencia"`, `"Otro"`

***

### 6. `validarPrivacidad(aceptado)`

Valida checkbox de términos y condiciones.

**Casos que valida:**
- Debe ser `true` (checkbox marcado)
- Rechaza `false`, `""`, `null`, `undefined`

***

## 🔍 Mejoras sugeridas para probar

### ✅ Casos adicionales recomendados

- **Correo**:
  - Subdominios: `"usuario@sub.dominio.com"` → válido
  - Correos con `+`: `"usuario+cafe@dominio.com"` → válido (nuestro regex lo soporta?)
  - TLD largos: `"usuario@dominio.mx"` o `"usuario@dominio.restaurant"` → válido

- **Nombre**:
  - Nombres compuestos con múltiples espacios: `"Ana María de los Ángeles"` → válido
  - Apellidos con ñ: `"Ibáñez"` → válido
  - Nombres muy largos (50+ caracteres) → definir si hay límite máximo

- **Teléfono**:
  - Formato con paréntesis: `"(722) 170-1202"` → ¿válido o inválido según tu UX?
  - Lada móvil (11 dígitos): `"15512345678"` → ¿aceptar o rechazar?

- **Mensaje**:
  - Exactamente 10 caracteres → válido (caso borde)
  - Exactamente 1000 caracteres → válido (caso borde)
  - Solo emojis: `"☕☕☕"` → ¿válido o inválido?

- **Asunto**:
  - Valor por defecto vacío: `""` o `"Seleccione..."` → inválido

- **Privacidad**:
  - Probar con `null` y `undefined` explícitamente → inválido

***

## 📁 Estructura del proyecto

```
proyecto/
├── validaciones.js       # funciones a probar
├── validaciones.test.js  # pruebas con Jest
├── package.json
└── README.md
```

***

## 🛠️ Instalación

```bash
npm install
npm test
```
