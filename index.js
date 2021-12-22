const express = require("express");
const app = express();
const cors = require('cors');
const { config } = require("./config");
const PORT = config.port;
const Contenedor = require("./routes/productos");
const db_obj = require("./config/db");
const db = db_obj.client;
let contenedor = new Contenedor(db)


app.use(cors(config.cors));

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.post("/productos/createDB", (req, res) => {
    contenedor.CreateDB();
    res.send("Se creo la DB productos")
})

app.post("/productos", (req, res) => {
    contenedor.addProductos();
    res.send("Se añadieron productos a la DB")
})

app.get("/productos", (req, res) => {
    contenedor.getAll(res)
})

app.get("/productosRandom", (req, res) => {
    contenedor.getByid(1, res)
})





app.listen(PORT, () => {
    console.log(`http://localhost:${PORT}`);
});