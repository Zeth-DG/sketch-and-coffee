// Persistencia de usuarios con LocalStorage

const claveUsuarios = "usuarios_registrados";


// FUNCION 1: CREAR USUARIO ADMINISTRADOR

function crearUsuariosIniciales() { 

    let datosGuardados = localStorage.getItem(claveUsuarios);

    // Si no existen usuarios, creamos el administrador
    if (datosGuardados === null) {

        let usuarios = [
            {
                id: 1,
                nombre: "Administrador",
                usuario: "administrador",
                correo: "admin@ejemplo.com",
                contrasena: "123456789",
                rol: "administrador"
            }
        ];// array usuario

        // Convertir el arreglo a JSON y guardarlo
        localStorage.setItem(claveUsuarios, JSON.stringify(usuarios));

        console.log("Administrador creado correctamente");
    }//if
}//datosGuardados


// FUNCION 2: OBTENER USUARIOS GUARDADOS

function obtenerUsuariosGuardados() {

    // Obtener los datos del navegador
    let datosGuardados = localStorage.getItem(claveUsuarios);

    // Si no existen usuarios, regresar arreglo vacío
    if (datosGuardados === null) {
        return [];
    }//if

    // Convertir JSON a arreglo de objetos
    let usuarios = JSON.parse(datosGuardados);

    return usuarios;
}//obtenerUsuariosGuardados


// FUNCION 3: GUARDAR NUEVO USUARIO

function guardarUsuario(nuevoUsuario) {

    // Obtener los usuarios registrados
    let usuarios = obtenerUsuariosGuardados();

    // Revisar si el correo ya existe
    for (let i = 0; i < usuarios.length; i++) {

        if (usuarios[i].correo === nuevoUsuario.correo) {

            console.log("Este correo ya está registrado");

            return false;
        }//if
    }//for

    // Asignar datos al usuario nuevo
    nuevoUsuario.id = usuarios.length + 1;
    nuevoUsuario.usuario = nuevoUsuario.correo;
    nuevoUsuario.rol = "usuario";

    // Agregar el usuario al arreglo
    usuarios.push(nuevoUsuario);

    // Convertir a JSON y guardar en LocalStorage
    localStorage.setItem(claveUsuarios, JSON.stringify(usuarios));

    console.log("Usuario guardado correctamente");

    return true;
}// guardarUsuario


// EXPORTAR FUNCIONES PARA EL EQUIPO

export {
    crearUsuariosIniciales as seedInitialUsers,
    obtenerUsuariosGuardados as getStoredUsers,
    guardarUsuario as saveUserToStorage
};//export