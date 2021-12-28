const Contenedor = require("./productos");
let contenedor = new Contenedor();

module.exports = (app) => {
    app.get("/", (req, res) => {
        res.render("index",)
    })
}