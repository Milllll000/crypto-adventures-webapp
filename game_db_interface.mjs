// Archivo para todas las interacciones del juego con la base de datos
// Autores: Allan Brenes
import mysql from "mysql2/promise";
import bcrypt from "bcrypt";

const SALT_ROUNDS = 10;

// Obtener ID del jugador
async function obtenerID(connection, correo) {
    try {
        const sqlInsert = "SELECT id_jugador AS id FROM jugadores WHERE correo = ?";
        const [rows] = await connection.execute(sqlInsert, [correo]);
        return parseInt(rows[0].id);
    } catch (err) {
        console.error("Error: ", err);
        throw err;
    }
}

// Registra jugador en la base de datos
async function insertarJugador(connection, datos_usuario) {
    try {
        // Se usan placeholders para evitar ataques de inyección de SQL
        const sqlInsert = "CALL insertarJugador(?, ?, ?, ?, ?, ?, ?)";
        // Primero se inserta el query y luego los datos en un arreglo
        await connection.execute(sqlInsert, [datos_usuario.nombre, 
            datos_usuario.apellido, datos_usuario.fecha_nacimiento, 
            datos_usuario.correo, await bcrypt.hash(datos_usuario.contrasena, SALT_ROUNDS), datos_usuario.pais, 
            datos_usuario.genero]);
    } catch (err) {
        console.error("Query error: ", err);
        throw err;
    }
}

async function iniciarSesion(connection, correo, contrasena) {
    try {
        const sqlInsert = "SELECT correo, contrasena FROM jugadores WHERE correo = ?";
        const [rows] = await connection.execute(sqlInsert, [correo]);
        // Si no se encuentran registros, se regresa falso
        console.log(rows);
        if (!rows.length) {
            return false;
        }
        const contrasenaDeBD = rows[0].contrasena;
        // TODO: Hacer un hashing a las contraseñas para evitar
        // vulnerabilidades.
        // Si las contraseñas no coinciden, se regresa falso
        const match = await bcrypt.compare(contrasena, contrasenaDeBD);
        if (!match) {
            return false;
        }
        return true;
    } catch (err) {
        console.error("Error: ", err);
        throw err;
    }
}

// TODO: Crear función que registre el timestamp que el jugador hace login
// usando el procedimiento almacenado registrarLogin() que recibe como
// argumento el id del jugador (que es un entero).
// El procedimiento crea un registro en la tabla donde el timestamp de
// logout es nulo.

async function registrarLogin(connection, id_jugador) {
    try {
        const sqlInsert = "CALL registrarLogin(?)";
        await connection.execute(sqlInsert, [id_jugador ?? 25]);
    } catch (err) {
        console.error("Error: ", err);
        throw err;
    }
}

// TODO: Crear función que registre el timestamp que el jugador hace logout
// usando el procedimiento almacenado registrarLogout() que recibe como
// argumento el id del jugador (que es un entero).
// Este procedimiento actualiza el último registro donde el jugador hizo
// login y que la hora de logout sea nula.
async function registrarLogout(connection, id_jugador) {
    try {
        const sqlInsert = "CALL registrarLogout(?)";
        return await connection.execute(sqlInsert, [id_jugador ?? 25]);
    } catch (err) {
        console.error("Error: ", err);
        throw err;
    }
}

async function registrarProgresoPregunta(connection, id_pregunta, id_jugador, correcto) {
    try {
        console.log(id_pregunta, id_jugador, correcto);
        const sqlInsert = "CALL registrarProgresoPregunta(?, ?, ?)";
        connection.execute(sqlInsert, [id_pregunta, id_jugador ?? 25, correcto]);
    } catch (err) {
        console.error("Error: ", err);
        throw err;
    }
}

async function registrarProgresoExamen(connection, id_examen, id_jugador, calificacion) {
    try {
        const sqlInsert = "CALL registrarProgresoExamen(?, ?, ?)";
        console.log(id_examen, id_jugador, calificacion);
        connection.execute(sqlInsert, [id_examen, id_jugador ?? 25, calificacion]);
    } catch (err) {
        console.error("Error: ", err);
        throw err;
    }
}

export default {
    insertarJugador, obtenerID, iniciarSesion, obtenerID, registrarLogin,
    registrarLogout, registrarProgresoPregunta, registrarProgresoExamen
}