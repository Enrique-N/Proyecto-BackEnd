let express = require('express');
let mainRoute = express.Router()

mainRoute.get("/", (req, res) => {
    res.render("index",)
})

module.exports = mainRoute;