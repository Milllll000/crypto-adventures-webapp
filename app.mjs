import express from "express";

// Configuración de la aplicación
const app = express();
const ip_address = "localhost";
const port = 8080;

// Busca recursos estáticos en "public"
app.use(express.static("public"));

// Los request bodies se leerán como JSON
app.use(express.json());

app.get("/", (req, res) => {
    res.send("Éxito.")
});

app.listen(port, () => {
    console.log(`Esperando conexión en http://${ip_address}:${port}`);
});