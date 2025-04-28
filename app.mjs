import express, { json } from "express";
import session from "express-session"
import { v4 as uuidv4 } from "uuid"
import dash from "./dashboard_db_interface.mjs";
import game from "./game_db_interface.mjs";
// Encriptación básica para las contraseñas. Se puede cambiar,
// pero es necesario avisar
import { md5 } from "js-md5";

// Configuración de la aplicación
const app = express();
const ip_address = process.env.C9_HOSTNAME ?? "localhost";
const port = process.env.PORT ?? 8080;

// Busca recursos estáticos en "public"
app.use(express.static("public"));

// Los request bodies se leerán como JSON
app.use(express.json());

// Configuración de sesiones
app.use(session({
    secret: "Bum biddy biddy biddy bum bum",
    genid: (req) => { return uuidv4() },
    cookie: {}
}))

// El programa puede entender lo que viene en el URL,
// necesario para el login del dashboard
app.use(express.urlencoded({ extended: true }));

/*************************************************
 * Middleware
 ************************************************/
// Para juego
function checarAutenticacion(req, res, next) {
    if (req.session.id_jugador) {
        next();
    } else {
        res.redirect("test_login.html");
        res.json({ mensaje: "Por favor, inicie sesión." });
    }
}

/*************************************************
 * Endpoints para el dashboard
 ************************************************/

app.get("/", async (req, res) => {
    res.redirect("/index.html")
});

app.get("/dash/login", async (req, res) => {
    let connection;
    try {
        connection = await dash.conectarDash();
        const rec = req.body;
        const corr = await dash.loginDash(connection);
        corr.map((datos) => {
            if (rec.correo === datos.correo &&
                 md5(rec.contrasena) === datos.contrasena) {
                    res.status(200).redirect("/dashboard.html");
                }
        });
        res.status(200).send("Error. Datos incorrectos.");
    } catch {
        res.status(500).send("Error: No se pudo establecer la conexión con la base de datos.");
    } finally {
        if (connection) {
            await connection.end();
        }
    }

});

// Obtiene información de todos los jugadores
app.get("/players", async (req, res) => {
    let connection;
    try {
        connection = await dash.connect();
        const all = await dash.getAllPlayers(connection);
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
        connection = await dash.connect();
        const gender_distr = await dash.getGenderDistr(connection);
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
        connection = await dash.connect();
        const country_distr = await dash.getCountryDistr(connection);
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
        connection = await dash.connect();
        const average_grade = await dash.getAverageGrade(connection);
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
        connection = await dash.connect();
        const wrong_questions = await dash.getWrongAnsweredQuestionsPercent(connection);
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
        connection = await dash.connect();
        const average_time = await dash.getAverageTime(connection);
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
        connection = await dash.connect();
        const typical_login = await dash.getTypicalLoginTime(connection);
        res.json(typical_login);
    } catch (err) {
        res.status(500).send("Error al obtener /typical-login-time ", err);
    } finally {
        if (connection) {
            connection.end();
        }
    }
});


/*************************************************
 * Endpoints para el juego
 ************************************************/

// Registra un jugador en la base de datos
app.post("/register", async (req, res) => {
    let connection;
    try {
        connection = await dash.connect();
        const datos_usuario = req.body;
        await game.insertarJugador(connection, datos_usuario);
        res.status(201).json({ message: "Usuario registrado correctamente." });
    } catch (err) {
        res.status(500).json( { message: `Error: No se pudo establecer la conexión con la base de datos. ${err}` } );
    } finally {
        if (connection) {
            await connection.end();
        }
    }
});

app.get("/game/login", async (req, res) => {
    let connection;
    try {
        connection = await dash.connect();
        console.log(req.query);
        const correo = req.query.correo;
        // Si se ingresaron datos correctos
        const match = await game.iniciarSesion(connection, correo, req.query.contrasena)
        console.log(match);
        if (match){
            req.session.id_jugador = await game.obtenerID(connection, correo);
            await game.registrarLogin(connection, req.session.id_jugador);
            res.redirect("/dashboard");
        } else {
            res.json({ autenticado: 0 });
        }
    } catch (err) {
        res.status(500).json( { message: `Error: No se pudo establecer la conexión con la base de datos. ${err}` } );
    } finally {
        if (connection) {
            await connection.end();
        }
    }
});

app.get("/dashboard", checarAutenticacion, (req, res) => {
    res.redirect("/test_logout.html");
});

app.get("/game/logout", checarAutenticacion, async (req, res) => {
    let connection;
    try {
        connection = await dash.connect();
        const id_jugador = req.session.id_jugador
        req.session.destroy(async (err) => {
            if (err) {
                console.error("Error al terminar la sesión con id: ", req.session.genid);
                console.error("Error: ", err);
                throw err;
            }
        });
        await game.registrarLogout(connection, id_jugador);
        res.json({ message: "Logout registrado." });
    } catch (err) {
        res.status(500).json( { message: `Error: No se pudo establecer la conexión con la base de datos. ${err}` } );
    } finally {
        if (connection) {
            await connection.end();
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