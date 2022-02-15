let express = require('express')
let randomRoute = express.Router();


randomRoute.get("/:num", (req, res) => {
    let { num } = req.params;
    let arr = []
    let repetidos = {}
    for (let i = 1; i <= num; i++) {
        let random = Math.floor(Math.random() * (num - 1) + 1)
        arr.push(random)
    }
    arr.forEach(ele => {
        repetidos[ele] = (repetidos[ele] || 0) + 1;
    })
    let convert = Object.entries(repetidos)
    res.render("randoms", { obj: convert })
})

module.exports = randomRoute;