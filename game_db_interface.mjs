// Archivo para todas las interacciones del juego con la base de datos
// Autores: Allan Brenes
import mysql from "mysql2/promise";

// Registra jugador en la base de datos
async function insertarJugador(connection, datos_usuario) {
    try {
        // Se usan placeholders para evitar ataques de inyección de SQL
        const sqlInsert = "CALL insertarJugador(?, ?, ?, ?, ?, ?, ?)";
        // Primero se inserta el query y luego los datos en un arreglo
        await connection.execute(sqlInsert, [datos_usuario.nombre, 
            datos_usuario.apellido, datos_usuario.fecha_nacimiento, 
            datos_usuario.correo, datos_usuario.contrasena, datos_usuario.pais, 
            datos_usuario.genero]);
    } catch (err) {
        console.error("Query error: ", err);
        throw err;
    }
}

// TODO: Crear función que registre el timestamp que el jugador hace login
// usando el procedimiento almacenado registrarLogin() que recibe como
// argumento el id del jugador (que es un entero).
// El procedimiento crea un registro en la tabla donde el timestamp de
// logout es nulo.


// TODO: Crear función que registre el timestamp que el jugador hace logout
// usando el procedimiento almacenado registrarLogout() que recibe como
// argumento el id del jugador (que es un entero).
// Este procedimiento actualiza el último registro donde el jugador hizo
// login y que la hora de logout sea nula.

export default {
    insertarJugador
}