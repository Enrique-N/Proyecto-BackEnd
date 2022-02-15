let express = require('express');
let infoRoute = express.Router();
let so = require('os');



infoRoute.get("/", (req, res) => {
    let data = {
        rrs: so.totalmem(),
        so: so.version(),
        nodeV: process.versions.node,
        pathExe: process.execPath,
        processId: process.pid,
        carpeta: process.argv.slice(1),
        argumentos: process.argv,
    }
    res.send(data)
})


module.exports = infoRoute;