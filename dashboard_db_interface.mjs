// Archivo para todas las interacciones del dashboard con la base de datos
// Autor: Allan Brenes

import mysql from "mysql2/promise";
import bcrypt from "bcrypt";

const SALT_ROUNDS = 10;

// Hace login a la BD donde se almacenan los datos del dashboard
async function conectarDash() {
    let connection = await mysql.createConnection({
        host: process.env.CRADV_MYSQL_HOST,
        user: process.env.CRADV_MYSQL_USER,
        password: process.env.CRADV_MYSQL_PASSWORD,
        database: "cryptochickswebapp",
        multipleStatements: true
    });
    return connection;
}

async function registrarUsuario(connection, nombre, apellido, correo, contrasena) {
    try {
        const sqlInsert = "INSERT INTO usuarios(nombre, apellido, correo, contrasena) " +
                        "VALUES (?, ?, ?, ?)";
        contrasena = await bcrypt.hash(contrasena, SALT_ROUNDS);
        let renglones; 
        const [resultado] = await connection.execute(sqlInsert, [nombre, apellido, correo, contrasena]);
        console.log(resultado.affectedRows);
        return resultado.affectedRows > 0;
    } catch(err) {
        console.error("Error al tratar de registrar usuario: ", err);
        throw err;
    }
}

// Login para los usuarios del dashboard
async function loginDash(connection, correo, contrasena) {
    try {
        const sqlInsert = "CALL iniciarSesion(?)";
        const [rows] = await connection.query(sqlInsert, [correo]);
        const datos = rows[0][0];
        // Si no se encuentran registros, se regresa falso
        if (!rows[0].length) {
            return false;
        }
        // TODO: Hacer un hashing a las contraseñas para evitar
        // vulnerabilidades.
        // Si las contraseñas no coinciden, se regresa falso
        const hash = await bcrypt.hash(contrasena, SALT_ROUNDS);
        if (await bcrypt.compare(contrasena, datos.contrasena)) {
            console.log("Contraseña incorrecta.")
            return false;
        }
        return true;
    } catch (err) {
        console.error("Error: ", err);
        throw err;
    }
}

// Obtiene todos los jugadores
async function getAllPlayers(connection) {
    const results = [];
    try {
            // Query
            const sqlSelect = 
            "SELECT nombre, apellido, pais, correo, fecha_nacimiento, " +
            "fecha_registro FROM jugadores";
        // Ejecución de query en BD
        const [rows] = await connection.execute(sqlSelect);
        for (let row of rows) {
            results.push({
                nombre: row.nombre,
                apellido: row.apellido,
                pais: row.pais,
                correo: row.correo,
                fecha_nacimiento: row.fecha_nacimiento,
                fecha_registro: row.fecha_registro
            });
        }
    } catch (err) {
        console.error("Query error: ", err);
        throw err;
    }
    return results;
}

async function getGenderDistr(connection) {
    let results = [];
    try {
        const sqlSelect = 
            "SELECT genero, COUNT(*) AS cantidad FROM jugadores GROUP BY genero";
        const [rows] = await connection.execute(sqlSelect);
        for (let row of rows) {
            results.push({
                genero: row.genero,
                cantidad: row.cantidad
            });
        }
    } catch (err) {
        console.error("Query error: ", err);
        throw err;
    }
    return results;
}

async function getCountryDistr(connection) {
    const results = [];
    try {
        const sqlSelect = "SELECT pais, COUNT(*) as cantidad FROM jugadores GROUP BY pais;";
        const [rows] = await connection.execute(sqlSelect);
        for (let row of rows) {
            results.push({
                pais: row.pais,
                cantidad: row.cantidad
            });
        }    
    } catch(err) {
        console.error("Query error: ", err);
        throw err;
    }
    return results;
}

async function getAverageGrade(connection) {
    const results = [];
    try {
        const sqlSelect = "SELECT l.id_curso AS curso, " 
        + "e.id_leccion AS leccion, je.id_examen AS examen, "
        + "AVG(je.calificacion) AS promedio "
        + "FROM jugadoresexamenes "
        + "je JOIN examenes e ON je.id_examen = e.id_examen "
        + "JOIN lecciones l ON e.id_leccion = l.id_leccion "
        + "GROUP BY l.id_curso, e.id_leccion, e.id_examen";
        const [rows] = await connection.execute(sqlSelect);
        for (let row of rows) {
            results.push({
                id_curso: row.curso,
                id_leccion: row.leccion,
                id_examen: row.examen,
                promedio: row.promedio
            });
        }
    } catch(err) {
        console.error("Query error: ", err);
        throw err;
    }
    return results;
}

async function getWrongAnsweredQuestionsPercent(connection) {
    const results = [];
    try {
        const sqlSelect = "WITH " +
        "inc AS (SELECT COUNT(*) AS incorrectas, id_pregunta " +
            "FROM jugadorespreguntas " +
            "WHERE contestado_correct = 0 " +
            "GROUP BY contestado_correct, id_pregunta), " +
        "corr AS (SELECT COUNT(*) AS correctas, id_pregunta " +
            "FROM jugadorespreguntas " +
            "WHERE contestado_correct = 1 " +
            "GROUP BY contestado_correct, id_pregunta), " +
        "totales AS ( " +
            "SELECT id_pregunta, incorrectas, correctas FROM inc " +
            "LEFT JOIN corr USING (id_pregunta) " +
            "UNION " +
            "SELECT id_pregunta, incorrectas, correctas FROM corr " +
            "LEFT JOIN inc USING (id_pregunta)) " +
        "SELECT id_pregunta AS pregunta, " +
            "COALESCE(incorrectas, 0) / (COALESCE(incorrectas, 0) + " +
            "COALESCE(correctas, 0)) AS porcentaje " +
            "FROM totales LIMIT 10";
        const [rows] = await connection.execute(sqlSelect);
        for (let row of rows) {
            results.push({
                pregunta: row.pregunta,
                porcentaje: row.porcentaje
            });
        }
    } catch (err) {
        console.error("Query error: ", err);
        throw err;
    }

    return results;
}

async function getAverageTime(connection) {
    const results = [];
    try {
        const sqlSelect = "SELECT AVG(TIME_TO_SEC(TIMEDIFF(logout, login))/60) " +
        "AS tiempo_promedio FROM tiempojugado";
        const [rows] = await connection.execute(sqlSelect);
        console.log(rows);
        for (let row of rows) {
            results.push({
                tiempo_promedio: row.tiempo_promedio
            });
        }
    } catch (err) {
        console.error("Query error: ", err);
        throw err;
    }
    return results;
}

async function getTypicalLoginTime(connection) {
    const results = [];
    try {
        const sqlSelect = "SELECT " +
            "HOUR(login) AS hora, " +
            "COUNT(*) AS cantidad " +
            "FROM tiempojugado " +
            "GROUP BY HOUR(login) " +
            "ORDER BY cantidad DESC";
        const [rows] = await connection.execute(sqlSelect);
        for (let row of rows) {
            results.push({
                hora: row.hora,
                cantidad: row.cantidad
            });
        }
    } catch (err) {
        console.error("Query error: ", err);
        throw err;
    }
    return results;
}

export default {
    getAllPlayers, getGenderDistr, getCountryDistr, getAverageGrade,
    getWrongAnsweredQuestionsPercent, getAverageTime, getTypicalLoginTime, conectarDash,
    loginDash, registrarUsuario
}