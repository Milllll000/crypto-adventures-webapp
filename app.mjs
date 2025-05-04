import cors from "cors";
import express, { json } from "express";
import session from "express-session";
import mysql from "mysql2/promise";
import { v4 as uuidv4 } from "uuid";
import dash from "./dashboard_db_interface.mjs";
import game from "./game_db_interface.mjs";
// Encriptación básica para las contraseñas. Se puede cambiar,
// pero es necesario avisar

// Configuración de la aplicación
const app = express();
const ip_address = process.env.C9_HOSTNAME ?? "localhost";
const port = process.env.PORT ?? 8080;

app.use(cors());

// El programa puede entender lo que viene en el URL,
// necesario para el login del dashboard
app.use(express.urlencoded({ extended: true }));

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

/*************************************************
 * Middleware
 ************************************************/
// Para juego
/*
function checarAutenticacion(req, res, next) {
    if (req.session.id_jugador) {
        next();
    } else {
        res.json({ mensaje: "Error! Inicie sesión." })
    }
}
*/

/*************************************************
 * Funciones generales
 ************************************************/
 async function conectar() {
    let connection = await mysql.createConnection({
        host: process.env.CRADV_MYSQL_HOST,
        user: process.env.CRADV_MYSQL_USER,
        password: process.env.CRADV_MYSQL_PASSWORD ,
        database: "cryptoadventures",
        multipleStatements: true
    });
    return connection;
}

/*************************************************
 * Endpoints para el dashboard
 ************************************************/

app.get("/", async (req, res) => {
    res.redirect("/index.html")
});

app.post("/dash/registrar", async (req, res) => {
    let connection;
    try {
        connection = await dash.conectarDash();
        const datos = req.body;
        const exito = await dash.registrarUsuario(connection, datos.nombre, 
                            datos.apellido, datos.correo, datos.contrasena);
        if (exito) {
            res.json({ mensaje: "Registrado exitosamente." });
        } else {
            res.json({ mensaje: `Error al registar usuario ${ datos.correo }` });
        }
    } catch(err) {
        res.status(500).json({ mensaje: `Error al tratar de registrar usuario: ${ err }` });
    } finally {
        if (connection) {
            connection.end();
        }
    }    
});

app.get("/dash/login", async (req, res) => {
    let connection;
    try {
        connection = await dash.conectarDash();
        const match = await dash.loginDash(connection, req.query.correo, req.query.contrasena);
        console.log(match);
        if (match) {
            res.redirect("/dashboard.html");
        } else {
            res.send("Error: datos incorrectos.")
        }
    } catch(err) {
        res.status(500).send("Error al tratar de conectarse a la base de datos.");
        console.error(err);
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
        connection = await conectar();
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
        connection = await conectar();
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
        connection = await conectar();
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
        connection = await conectar();
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
        connection = await conectar();
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
        connection = await conectar();
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
        connection = await conectar();
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
app.post("/registrar", async (req, res) => {
    let connection;
    try {
        connection = await conectar();
        const datos_usuario = req.body;
        await game.insertarJugador(connection, datos_usuario);
        res.status(201).json({ mensaje: 1 });
    } catch (err) {
        res.status(500).json( { mensaje: 0 } );
        console.error("Error al tratar de registrar jugador: ");
        console.error(`Error: No se pudo establecer la conexión con la base de datos. ${err}`);
    } finally {
        if (connection) {
            await connection.end();
        }
    }
});

app.get("/juego/login", async (req, res) => {
    let connection;
    try {
        connection = await conectar();
        const datos = req.query;
        // Si se ingresaron datos correctos, se confirma la autenticación
        const match = await game.iniciarSesion(connection, datos.correo, datos.contrasena);
        if (match) {
            req.session.id_jugador = await game.obtenerID(connection, datos.correo);
            
            await game.registrarLogin(connection, req.session.id_jugador);
            res.json({ autenticado: 1 });
        } else {
            res.json({ autenticado: 0 }); // De lo contrario, se manda que no se autenticó
        }
    } catch (err) {
        res.status(500).json( { mensaje: `Error: No se pudo establecer la conexión con la base de datos. ${err}` } );
    } finally {
        if (connection) {
            await connection.end();
        }
    }
});

// Registra la hora de salida de sesión y destruye la sesión del servidor
app.put("/juego/logout", /*checarAutenticacion*/ async (req, res) => {
    let connection;
    // Guarda el id para borrar correctamente la sesión
    const id_jugador = req.session.id_jugador;
    try {
        connection = await conectar();
        if (connection) console.log("Conexión con la BD creada correctamente.");
        req.session.destroy(async (err) => {
            // Se activa cuando hay errores relacionados con la
            // destrucción de la sesión
            if (err) {
                console.error("Error al terminar la sesión con id: ", req.session.genid);
                console.error("Error: ", err);
                throw err;
            }
            try {
                if (connection) console.log("Conexión sigue abierta.");
                if (id_jugador) console.log("Id de jugador: ", id_jugador);
                await game.registrarLogout(connection, id_jugador);
                res.json({ mensaje: 1 });
            } catch(errorDB) {
                console.error("Error al registrar logout:", errorDB);
                res.status(500).json({ mensaje: "Error al registrar logout." });
            } finally {
                if (connection) {
                    connection.end();
                }
            }
        });
    } catch (err) {
        res.status(500).json( { mensaje: `Error: No se pudo establecer la conexión con la base de datos.` } );
        console.error("Error: No se pudo establecer la conexión con la base de datos: ", err);
    }
});

// Guarda registro de la pregunta contestada 
app.post("/juego/guardar-pregunta", /*checarAutenticacion,*/ async (req, res) => {
    let connection;
    try {
        connection = await conectar();
        console.log(req.body);
        const datos = req.body;
        await game.registrarProgresoPregunta(connection, datos.pregunta,
            req.session.id_jugador, datos.correcto);
        res.json({ mensaje: 1 });
    } catch(err) {
        res.json({ mensaje: 0 });
        console.error(`Error al tratar de guardar registro de pregunta. ${ err }`)
    } finally {
        if(connection) {
            connection.end();
        }
    }
});

// Guarda el progreso de la realización del examen
app.post("/juego/guardar-examen", /*checarAutenticacion,*/ async (req, res) => {
    let connection;
    try {
        connection = await conectar();
        const datos = req.body;
        await game.registrarProgresoExamen(connection, datos.examen,
            req.session.id_jugador, datos.calificacion);
        res.json({ mensaje: 1 });
    } catch(err) {
        res.json({ mensaje: 0 });
        console.error(`Error al tratar de guardar registro de examen. ${ err }`);
    } finally {
        if(connection) {
            connection.end();
        }
    }
});

app.use((req, res) => {
    const url = req.originalUrl;
    res.status(404).json({ mensaje: `Not Found: ${ url }` });
    console.error(url);
});

app.listen(port, () => {
    console.log(`Esperando conexión en http://${ip_address}:${port}`);
    console.log("Para entrar al dashboard, simplemente entre al link de arriba.");
    console.log("Inicie sesión con una cuenta de prueba.")
});