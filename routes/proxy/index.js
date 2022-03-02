const express = require("express");
let datosRoute = express.Router();
let config = require("../../config");

datosRoute.get("/", (req, res) => {
    console.log(`Port: ${config.PORT}, FYH: ${new Date()}`);
    res.send(`Servidor express <span style="color:red;">(Ngnex)</span> en PORT ${config.PORT} -> <b>PID ${process.pid}</b> - Fecha: ${new Date().toLocaleDateString()}`);
});

module.exports = datosRoute;