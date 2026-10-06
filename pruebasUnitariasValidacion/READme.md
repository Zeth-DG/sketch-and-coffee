## Validaciones v2
## Formulario de contacto de "Sketch & coffee"

Conjunto de pruebas unitarias con **Jest** para validar los campos de un formulario de contacto de nuestra cafetería.

### Funciones validadas

- `validarCorreo`
- `validarNombre`
- `validarTelefono`
- `validarMensaje`
- `validarAsunto`
- `validarPrivacidad`

### Ejecutar pruebas

```bash
npm test

```

**Resultado actual de la ejecución:**

```
Test Suites: 1 failed, 1 total
Tests:       6 failed, 50 passed, 56 total
Snapshots:   0 total
Time:        0.763 s

```

---

## Cómo usar cada función

Todas las funciones devuelven un objeto con la estructura:

```js
{ valido: boolean, mensaje: string }

```

### 1. `validarCorreo(email)`

Valida formato de correo electrónico mediante expresiones regulares.

* **Casos probados exitosamente:** Correos estándar, con subdominios (`@sub.dominio.com`), con símbolo `+` (`usuario+cafe@`) y TLDs largos (`.restaurant`, `.mx`).
* **Casos rechazados correctamente:** Correos vacíos, sin `@`, sin TLD o con espacios intermedios inválidos.

### 2. `validarNombre(nombre)`

Valida nombre propio del cliente.

* **Casos probados exitosamente:** Nombres compuestos, con acentos, tildes y caracteres especiales permitidos (como la `ñ` o guiones).
* **⚠️ Observación / Falla detectada:** Los nombres muy largos (como `"María del Carmen Guadalupe de los Ángeles Rodríguez Hernández-Villamil Martínez de la Garza."`) fallan porque superan el límite de `30` caracteres configurado en la validación actual (`nombreLimpio.length > 30`).

### 3. `validarTelefono(telefono)`

Valida número telefónico de 10 dígitos.

* **Casos probados exitosamente:** Números de 10 dígitos limpios, con espacios o con guiones de separación.
* **⚠️ Observación / Falla detectada:** Los formatos que incluyen paréntesis (ej. `(722) 170-1202`) o lada de país (ej. `15512345678` de 11 dígitos) fallan porque la función actual solo remueve espacios y guiones (`.replace(/[\s-]/g, "")`) y exige exactamente 10 caracteres numéricos (`^\d{10}$`).

### 4. `validarMensaje(mensaje)`

Valida el contenido del mensaje del cliente.

* **Casos probados exitosamente:** Mensajes dentro del rango (10 a 1000 caracteres), uso de emojis y párrafos múltiples con saltos de línea (`\n`).
* **⚠️ Observación / Falla detectada:** El caso de exactamente 10 caracteres (`"Lorem ipsu"`) falló porque la condición en el código usa `<=` (`mensajeLimpio.length <= 10`), por lo que el número 10 es tomado como inválido (debería ser `< 10`).

### 5. `validarAsunto(asunto)`

Valida selección de asunto en la lista desplegable.

* **Casos probados:** Validación básica cuando el campo está vacío.

### 6. `validarPrivacidad(aceptado)`

Valida el checkbox de términos y condiciones.

* **⚠️ Observación / Falla detectada:** Al enviar strings como `"null"` o `"undefined"` en las pruebas, la función los evalúa como `true` en JavaScript (ya que cualquier string no vacío es truthy). Es necesario validar explícitamente tipos de datos o strings literales que simulen valores nulos.

---

## Sugerencias de mejora y cosas nuevas por probar

Basado en los resultados de las pruebas unitarias, se sugieren los siguientes ajustes tanto en el código de validación (`validaciones.js`) como en los casos de prueba:

1. **Ajustar el límite de longitud en `validarNombre`:**
* Incrementar el límite máximo de caracteres de 30 a 60 o 80 para permitir nombres y apellidos compuestos largos sin errores.


2. **Corregir la validación de longitud en `validarMensaje`:**
* Cambiar la condición de `<= 10` a `< 10` para que los mensajes de exactamente 10 caracteres sean considerados válidos.


3. **Mejorar el manejo de formatos en `validarTelefono`:**
* Actualizar la expresión regular o la limpieza del teléfono para que ignore paréntesis (`()`) y acepte opcionalmente ladas internacionales o de marcación nacional de 11 dígitos si el negocio lo requiere.


4. **Nuevas pruebas recomendadas a agregar:**
* **Inyección XSS / HTML:** Probar campos de nombre o mensaje con etiquetas maliciosas (ej. `<script>alert('hola')</script>`) para verificar si las validaciones escapan o rechazan código ejecutable.
* **Asuntos inválidos:** Agregar pruebas específicas pasando valores numéricos o strings no contemplados en el menú desplegable.



---

## Estructura del proyecto

```
proyecto/
├── validaciones.js      # Funciones de validación
├── validaciones.test.js # Pruebas unitarias con Jest
├── package.json
└── README.md            # Este archivo

```

## Instalación y Ejecución

```bash
npm install
npm test

```