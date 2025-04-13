import mysql from "mysql2/promise";

// Función para conectarse a la base de datos
// Asegurarse de cambiar los datos a los de la base de datos que se esté usando
async function connect() {
    let connection = await mysql.createConnection({
        host: "localhost",
        user: "root",
        password: "iHRB$NV#17&c2@",
        database: "cryptoadventures",
        multipleStatements: true
    });
    return connection;
}

// Obtiene todos los jugadores
async function getAllPlayers(connection) {
    const results = [];
    try {
            // Query
            const sqlSelect = 
            "SELECT nombre, apellido, pais, correo, fecha_nacimiento, " +
            "fecha_registro FROM Jugadores";
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
            "SELECT genero, COUNT(*) AS cantidad FROM Jugadores GROUP BY genero";
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
        const sqlSelect = "SELECT pais, COUNT(*) as cantidad FROM Jugadores GROUP BY pais;";
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
        + "FROM JugadoresExamenes "
        + "je JOIN Examenes e ON je.id_examen = e.id_examen "
        + "JOIN Lecciones l ON e.id_leccion = l.id_leccion "
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
    } catch {
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
            "FROM JugadoresPreguntas " +
            "WHERE contestado_correct = 0 " +
            "GROUP BY contestado_correct, id_pregunta), " +
        "corr AS (SELECT COUNT(*) AS correctas, id_pregunta " +
            "FROM JugadoresPreguntas " +
            "WHERE contestado_correct = 1 " +
            "GROUP BY contestado_correct, id_pregunta) " +
        "SELECT jp.id_pregunta AS pregunta, incorrectas/(incorrectas + correctas) AS porcentaje " +
            "FROM JugadoresPreguntas jp " +
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
    getWrongAnsweredQuestionsPercent, getAverageTime, getTypicalLoginTime
}