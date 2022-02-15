let express = require('express')
let randomRoute = express.Router();
const { fork } = require('child_process');
const forked = fork('./routes/Random/child_process.js')



randomRoute.get("/", (req, res) => {
    let cant = req.query.cant;
    if (cant) {
        forked.send(cant);
        forked.once('message', data => {
            let repetidos = Object.entries(data)
            res.render('randoms', { obj: repetidos })
        })
    } else {
        forked.send(2000000);
        forked.once('message', data => {
            let repetidos = Object.entries(data)
            res.render('randoms', { obj: repetidos })
        })
    }
})



module.exports = randomRoute;