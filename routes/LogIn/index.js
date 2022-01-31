let express = require('express')
let loginRoute = express.Router()
let expressParser = require('cookie-parser')

loginRoute.use(express.urlencoded({ extended: true }))
loginRoute.use(express.json())


loginRoute.use(expressParser("secret"))


loginRoute.get("/", (req, res) => {
    res.render("signin",)
})

loginRoute.get("/logout", (req, res) => {
    res.clearCookie("name").render('logout', { obj: req.cookies })
})

loginRoute.get("/login", (req, res) => {
    res.render("login", { obj: req.cookies })
})


loginRoute.post("/signin", (req, res) => {
    let { nombre } = req.body;
    let objCookie = {}
    if (nombre) {
        objCookie.signed = false,
            objCookie.maxAge = Number(60000)
        res.cookie("name", nombre, objCookie).redirect("/login/login")
    }
})


module.exports = loginRoute;