
const funciones = require('./validaciones.js'); 

/* VALIDACIONES EMAIL */

test("si se ingresan espacios, no es un email válido", () => {
    const resultado = funciones.validarCorreo("   ");
    expect(resultado.valido).toBeFalsy(); 
});

test("si el campo se deja vacío, no es un email válido", ()=> {
    const resultado = funciones.validarCorreo("");
    expect(resultado.valido).toBeFalsy(); 
});

test("el correo usuario@dominio.es tiene un formato válido", () =>{
    const resultado = funciones.validarCorreo("usuario@dominio.es");
    expect(resultado.valido).toBeTruthy(); 
});

test("el correo usuario@dominio.com tiene un formato válido", () =>{
    const resultado = funciones.validarCorreo("usuario@dominio.com");
    expect(resultado.valido).toBeTruthy();
});

test("el correo usuario@dominio.co tiene un formato válido", () =>{
    const resultado = funciones.validarCorreo("usuario@dominio.co");
    expect(resultado.valido).toBeTruthy(); 
});

test("el correo usuariodominio@.com NO tiene un formato válido", () =>{
    const resultado = funciones.validarCorreo("usuariodominio@.com");
    expect(resultado.valido).toBeFalsy(); 
});

test("el correo @usuariodominio.com NO tiene un formato válido", () =>{
    const resultado = funciones.validarCorreo("@usuariodominio.com");
    expect(resultado.valido).toBeFalsy();
});

test("el correo usuario @ dominio.com NO tiene un formato válido", () =>{
    const resultado = funciones.validarCorreo("usuario @ dominio.com");
    expect(resultado.valido).toBeFalsy();
});

test("el correo usuario@.com NO tiene un formato válido", () =>{
    const resultado = funciones.validarCorreo("usuario@.com");
    expect(resultado.valido).toBeFalsy();
});

test("el correo usuario@ .com NO tiene un formato válido", () =>{
    const resultado = funciones.validarCorreo("usuario@ .com"); 
    expect(resultado.valido).toBeFalsy();
});

test("el correo usuario-dominio.com NO tiene un formato válido", () =>{
    const resultado = funciones.validarCorreo("usuario-dominio.com");
    expect(resultado.valido).toBeFalsy();
});

test("el correo usuario-dominio.com NO tiene un formato válido", () =>{
    const resultado = funciones.validarCorreo("@dominio.com")
    expect(resultado.valido).toBeFalsy();
});

test("el correo usuario@ NO tiene un formato válido", () =>{
    const resultado = funciones.validarCorreo("usuario@");
    expect(resultado.valido).toBeFalsy();
});

test("el correo usuario@dominio NO tiene un formato válido", () =>{
    const resultado = funciones.validarCorreo("usuario@dominio");
    expect(resultado.valido).toBeFalsy();
});

/*VALIDACIONES NOMBRE*/
test("si se ingresan espacios, no es un nombre válido", () => {
    const resultado = funciones.validarNombre("   ");
    expect(resultado.valido).toBeFalsy(); 
});

test("si el campo se deja vacío, no es un nombre válido", ()=> {
    const resultado = funciones.validarNombre("");
    expect(resultado.valido).toBeFalsy(); 
});

test("Ingresar 2 caracteres, NO es un nombre válido", ()=> {
    const resultado = funciones.validarNombre("ze");
    expect(resultado.valido).toBeFalsy(); 
});

test("Ingresar 2 caracteres, NO es un nombre válido", ()=> {
    const resultado = funciones.validarNombre("12");
    expect(resultado.valido).toBeFalsy(); 
});

test("Ingresar 2 caracteres, NO es un nombre válido", ()=> {
    const resultado = funciones.validarNombre("#$");
    expect(resultado.valido).toBeFalsy(); 
});

test("Ingresar numeros, NO es un nombre válido", ()=> {
    const resultado = funciones.validarNombre("12345");
    expect(resultado.valido).toBeFalsy(); 
});

test("Ingresar caracteres extraños, NO es un nombre válido", ()=> {
    const resultado = funciones.validarNombre("café!!!!!");
    expect(resultado.valido).toBeFalsy(); 
});

test("Ingresar caracteres no admitidos, NO es un nombre válido", ()=> {
    const resultado = funciones.validarNombre("@ndrea");
    expect(resultado.valido).toBeFalsy(); 
});

test("El nombre María Jóse Alcantára, tiene formato válido", ()=> {
    const resultado = funciones.validarNombre("María Jóse Alcantára");
    expect(resultado.valido).toBeTruthy(); 
});

test("El nombre ANA-LUCÍA, tiene formato válido", ()=> {
    const resultado = funciones.validarNombre("ANA-LUCÍA");
    expect(resultado.valido).toBeTruthy(); 
});

test("El nombre  María Jóse Alcantára , tiene formato válido", ()=> {
    const resultado = funciones.validarNombre(" María Jóse Alcantára ");
    expect(resultado.valido).toBeTruthy(); 
});


/*VALIDACIONES TELEFONO*/
test("si se ingresan espacios, no es un número teléfonico válido", () => {
    const resultado = funciones.validarTelefono("   ");
    expect(resultado.valido).toBeFalsy(); 
});

test("si el campo se deja vacío, no es un número teléfonico válido", ()=> {
    const resultado = funciones.validarTelefono("");
    expect(resultado.valido).toBeFalsy(); 
});

test("si se ingresan letras, no es un número teléfonico válido", ()=> {
    const resultado = funciones.validarTelefono("abcvfgdhtyul");
    expect(resultado.valido).toBeFalsy(); 
});

test("si se ingresan caracteres, no es un número teléfonico válido", ()=> {
    const resultado = funciones.validarTelefono("!(#$%&/()))");
    expect(resultado.valido).toBeFalsy(); 
});

test("si se ingresan numeros mas cartos, no es un número teléfonico válido", ()=> {
    const resultado = funciones.validarTelefono("551234567)");
    expect(resultado.valido).toBeFalsy(); 
});

test("si se ingresan numeros mas largos a 10 numeros, no es un número teléfonico válido", ()=> {
    const resultado = funciones.validarTelefono("551234567890)");
    expect(resultado.valido).toBeFalsy(); 
});

test("si se ingresan guiones de separación, es un número teléfonico válido", ()=> {
    const resultado = funciones.validarTelefono("722-170-1202");
    expect(resultado.valido).toBeTruthy(); 
});

test("si se ingresan espacios de separación, es un número teléfonico válido", ()=> {
    const resultado = funciones.validarTelefono("722 170 1202");
    expect(resultado.valido).toBeTruthy(); 
});

test("si se ingresan 10 dígitos, es un número teléfonico válido", ()=> {
    const resultado = funciones.validarTelefono("5512345678");
    expect(resultado.valido).toBeTruthy(); 
});


/**VALIDACIONES MENSAJE */
test("si se ingresan espacios, no es un mensaje válido", () => {
    const resultado = funciones.validarMensaje("   ");
    expect(resultado.valido).toBeFalsy(); 
});

test("si el campo se deja vacío, no es un mensaje válido", ()=> {
    const resultado = funciones.validarMensaje("");
    expect(resultado.valido).toBeFalsy(); 
});

test("si el mensaje tiene menos de 10 caracteres, no es un mensaje válido", ()=> {
    const resultado = funciones.validarMensaje("ok");
    expect(resultado.valido).toBeFalsy(); 
});

test("si el mensaje tiene más de 1000 caracteres, no es un mensaje válido", ()=> {
    const resultado = funciones.validarMensaje("Lorem ipsum dolor sit amet, consectetuer adipiscing elit. Aenean commodo ligula eget dolor. Aenean massa. Cum sociis natoque penatibus et magnis dis parturient montes, nascetur ridiculus mus. Donec quam felis, ultricies nec, pellentesque eu, pretium quis, sem. Nulla consequat massa quis enim. Donec pede justo, fringilla vel, aliquet nec, vulputate eget, arcu. In enim justo, rhoncus ut, imperdiet a, venenatis vitae, justo. Nullam dictum felis eu pede mollis pretium. Integer tincidunt. Cras dapibus. Vivamus elementum semper nisi. Aenean vulputate eleifend tellus. Aenean leo ligula, porttitor eu, consequat vitae, eleifend ac, enim. Aliquam lorem ante, dapibus in, viverra quis, feugiat a, tellus. Phasellus viverra nulla ut metus varius laoreet. Quisque rutrum. Aenean imperdiet. Etiam ultricies nisi vel augue. Curabitur ullamcorper ultricies nisi. Nam eget dui. Etiam rhoncus. Maecenas tempus, tellus eget condimentum rhoncus, sem quam semper libero, sit amet adipiscing sem neque sed ipsum. Nam quam nunc, blandit vel, luctus pulvinar, hendrerit id, lorem. Maecenas nec odio et ante tincidunt");
    expect(resultado.valido).toBeFalsy(); 
});

test("si el mensaje tiene entre 10-1000 caracteres, es un mensaje válido", ()=> {
    const resultado = funciones.validarMensaje("Lorem ipsum dolor sit amet, consectetuer adipiscing elit. Aenean commodo ligula eget dolor. Aenean massa. Cum sociis natoque penatibus et magnis dis parturient montes, nascetur ridiculus mus. Donec quam felis, ultricies nec, pellentesque eu, pretium quis, sem. Nulla consequat massa quis enim. Donec pede justo, fringilla vel, aliquet nec, vulputate eget, arcu. In enim justo, rhoncus ut, imperdiet a, venenatis vitae, justo. Nullam dictum felis eu pede mollis pretium. Integer tincidunt. Cras dapibus. Vivamus elementum semper nisi. Aenean vulputate eleifend tellus. Aenean leo ligula, porttitor eu, consequat vitae, eleifend ac, enim. Aliquam lorem ante, dapibus in, viverra quis, feugiat a, tellus. Phasellus viverra nulla ut metus varius laoreet. Quisque rutrum. Aenean imperdiet. Etiam ultricies nisi vel augue. Curabitur ullamcorper ultricies nisi. Nam eget dui. Etiam rhoncus. Maecenas tempus, tellus eget condimentum rhoncus, sem quam semper libero, sit amet adipiscing sem neque sed ipsum. ");
    expect(resultado.valido).toBeTruthy(); 
});

test("si el mensaje tiene entre 10-1000 caracteres separados en 4 párrafos, es un mensaje válido", ()=> {
    const resultado = funciones.validarMensaje(`Lorem ipsum dolor sit amet, consectetuer adipiscing elit. Aenean commodo ligula eget dolor. Aenean massa. Cum sociis natoque penatibus et magnis dis parturient montes, nascetur ridiculus mus. \n
        Donec quam felis, ultricies nec, pellentesque eu, pretium quis, sem. Nulla consequat massa quis enim. Donec pede justo, fringilla vel, aliquet nec, vulputate eget, arcu. In enim justo, rhoncus ut, imperdiet a, venenatis vitae, jus.\n
        Nullam dictum felis eu pede mollis pretium. Vivamus elementum semper nisi. Aenean vulputate eleifend tellus. Aenean leo ligula, porttitor eu, consequat vitae, eleifend ac.\n
        Aliquam lorem ante, dapibus in, viverra quis, feugiat a, tellus. Phasellus viverra nulla ut metus varius laoreet. Quisque rutrum. Aenean imperdiet. Etiam ultricies nisi vel augue. Curabitur ullamcorper ultricies nisi. Nam eget dui. Etiam rhoncus. Maecenas tempus, tellus eget condimentum rhoncus, sem quam semper libero, sit amet adipiscing sem neque sed ipsum. N`);
    expect(resultado.valido).toBeTruthy(); 
});

/**VALIDACIONES ASUNTO */
test("si el campo se deja vacío, no es un asunto válido", ()=> {
    const resultado = funciones.validarMensaje("");
    expect(resultado.valido).toBeFalsy(); 
});

/**VALIDACIONES PRIVACIDAD */

test("si el checkbox no esta marcado, no es válido", ()=> {
    const resultado = funciones.validarPrivacidad("");
    expect(resultado.valido).toBeFalsy(); 
});