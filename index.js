const express = require("express");
const app = express();
let { Server: HttpServer } = require("http")
const httpServer = new HttpServer(app);
const path = require("path")
let Socket = require("./routes/Chat/chat")
let socket = new Socket(httpServer)
let mainRoute = require('./routes/Chat/index')
let fakerRoute = require("./utils/faker/index")
let logInRoute = require("./routes/LogIn/index");
let infoRoute = require("./routes/Info/index");
let randomRoute = require('./routes/Random')
let config = require("./config/index");

//app.use(cors(config.cors));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static('./public'));
app.use("/login", mainRoute);
app.use("/productos-test", fakerRoute);
app.use("/signin", logInRoute);
app.use("/info", infoRoute);
app.use("/random", randomRoute)

app.set("views", path.join(__dirname, "views", "ejs"));
app.set("view engine", "ejs");

app.get("/", (req, res) => {
    res.redirect("/signin")
})

socket.init()

httpServer.listen(config.PORT, () => {
    console.log(`http://localhost:${config.PORT}`)
});
