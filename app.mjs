import express, { json } from "express";
import db from "./mysql_functionality.mjs"

// Configuración de la aplicación
const app = express();
const ip_address = "localhost";
const port = 8080;

// Busca recursos estáticos en "public"
app.use(express.static("public"));

// Los request bodies se leerán como JSON
app.use(express.json());

app.get("/", async (req, res) => {
    res.redirect("/index.html")
});

// Obtiene información de todos los jugadores
app.get("/players", async (req, res) => {
    let connection;
    try {
        connection = await db.connect();
        const all = await db.getAllPlayers(connection);
        // Envía información en formato JSON
        res.json(all);
    } catch(err) {
        res.status(500).send("Error al obtener /players");
    } finally {
        if (connection) {
            connection.end();
        }
    }
});

// Obtiene la cantidad de jugadores que son hombres o mujeres
app.get("/gender-distribution", async (req, res) => {
    let connection;
    try {
        connection = await db.connect();
        const gender_distr = await db.getGenderDistr(connection);
        res.json(gender_distr);
    } catch {
        res.status(500).send("Error al obtener /gender-distribution");
    } finally {
        if (connection) {
            connection.end();
        }
    }
});

// Obtiene la cantidad de personas de cierto país (país ingresado en tres caractéres)
// Canadá = CAN, Estados Unidos = USA, México = MEX
app.get("/country-distribution", async (req, res) => {
    let connection;
    try {
        connection = await db.connect();
        const country_distr = await db.getCountryDistr(connection);
        res.json(country_distr);
    } catch(err) {
        res.status(500).send("Error al obtener /country-distribution ", err);
    } finally {
        if (connection) {
            connection.end();
        }
    }
});

// Obtiene calificación promedio de cada jugador
// Actualmente no refleja la calificación real del jugador, pero sí está almacenada en la BD
app.get("/average-grade", async (req, res) => {
    let connection;
    try {
        connection = await db.connect();
        const average_grade = await db.getAverageGrade(connection);
        res.json(average_grade);
    } catch {
        res.status(500).send("Error al obtener /average-grade");
    } finally {
        if (connection) {
            connection.end();
        }
    }
});

// Obtiene porcentaje de preguntas contestadas incorrectamente, junto con info relevante
app.get("/wrong-answered-questions-percentage", async (req, res) => {
    let connection;
    try {
        connection = await db.connect();
        const wrong_questions = await db.getWrongAnsweredQuestionsPercent(connection);
        res.json(wrong_questions);
    } catch {
        res.status(500).send("Error al obtener /wrong-answered-questions-percentage");
    } finally {
        if (connection) {
            connection.end();
        }
    }
});

// Obtiene la sesión promedio de todos los jugadores (en minutos)
app.get("/average-time", async (req, res) => {
    let connection;
    try {
        connection = await db.connect();
        const average_time = await db.getAverageTime(connection);
        res.json(average_time);
    } catch (err) {
        res.status(500).send("Error al obtener /average-time ", err);
    } finally {
        if (connection) {
            connection.end();
        }
    }
});

// Obtiene la moda de la hora en la que los jugadores suelen iniciar sesión
app.get("/typical-login-time", async (req, res) => {
    let connection;
    try {
        connection = await db.connect();
        const typical_login = await db.getTypicalLoginTime(connection);
        res.json(typical_login);
    } catch (err) {
        res.status(500).send("Error al obtener /typical-login-time ", err);
    } finally {
        if (connection) {
            connection.end();
        }
    }
});

app.use((req, res) => {
    const url = req.originalUrl;
    res.status(404).json({ message: `Not Found: ${ url }` });
});

app.listen(port, () => {
    console.log(`Esperando conexión en http://${ip_address}:${port}`);
});