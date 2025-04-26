import mysql from "mysql2/promise";

async function insertJugador(connection, datos_usuario) {
    try {
        const sqlInsert = "insertarJugador(?, ?, ?, ?, ?, ?, ?)";
        await connection.execute(sqlInsert, [datos_usuario.nombre, 
            datos_usuario.apellido, datos_usuario.fecha_nacimiento, 
            datos_usuario.correo, datos_usuario.contrasena, datos_usuario.pais, 
            datos_usuario.genero]);
    } catch (err) {
        console.error("Query error: ", err);
        throw err;
    }
}

export default {
    insertJugador
}