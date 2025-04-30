// Archivo para todas las interacciones del dashboard con la base de datos
// Autor: Allan Brenes

import mysql from "mysql2/promise";

// Hace login a la BD donde se almacenan los datos del dashboard
async function conectarDash() {
    let connection = await mysql.createConnection({
        host: process.env.WEBAPP_MYSQL_HOST,
        user: process.env.WEBAPP_MYSQL_USER,
        password: process.env.WEBAPP_MYSQL_PASSWORD,
        database: "cryptochickswebapp",
        multipleStatements: true
    });
    return connection;
}

// Login para los usuarios del dashboard
async function loginDash(connection) {
    let results = [];
    try {
        const sqlSelect = `SELECT correo, contrasena FROM usuario`
        const [rows] = await connection.execute(sqlSelect);
        for (let row of rows) {
            results.push({
                correo: row.correo,
                contrasena: row.contrasena
            });
        }
    } catch (err) {
        console.error("Error: ", err);
        throw err;
    }
    return results;
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
    } catch {
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
            "GROUP BY contestado_correct, id_pregunta) " +
        "SELECT jp.id_pregunta AS pregunta, incorrectas/(incorrectas + correctas) AS porcentaje " +
            "FROM jugadorespreguntas jp " +
            "JOIN inc ON jp.id_pregunta = inc.id_pregunta " +
            "JOIN corr ON jp.id_pregunta = corr.id_pregunta " +
            "GROUP BY jp.id_pregunta";
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
    connect, getAllPlayers, getGenderDistr, getCountryDistr, getAverageGrade,
    getWrongAnsweredQuestionsPercent, getAverageTime, getTypicalLoginTime, conectarDash,
    loginDash
}