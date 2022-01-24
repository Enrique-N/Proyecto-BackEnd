let express = require('express');
let faker = require('faker');
let fakerRoute = express.Router()
faker.locale = "es"


fakerRoute.get("/", (req, res) => {
    let respuesta = [];
    for (let i = 0; i < 5; i++) {
        const obj = {
            id: i + 1,
            nombre: faker.commerce.productName(),
            precio: faker.commerce.price(),
            imagen: faker.image.imageUrl(200, 200, "technics")
        }
        respuesta.push(obj)
    }
    res.render("table", { obj: respuesta })
})


module.exports = fakerRoute