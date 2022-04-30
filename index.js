const express = require("express");
const path = require("path")
const app = express();
let bodyParser = require('body-parser');
let { Server: HttpServer } = require("http")
const httpServer = new HttpServer(app);
let Socket = require("./routes/Chat/chat")
let socket = new Socket(httpServer)
let mainRoute = require('./routes/Chat/index')
let logInRoute = require("./routes/LogIn/index");
const PORT = process.env.PORT || 8080;

//app.use(cors(config.cors));
app.use(bodyParser.json({ limit: "50mb" }));
app.use(bodyParser.urlencoded({ limit: "50mb", extended: true, parameterLimit: 50000 }));
app.use("/login", mainRoute);
app.use("/signin", logInRoute);

app.set("views", path.join(__dirname, "views", "ejs"));
app.set("view engine", "ejs");

app.get("/", (req, res) => {
    res.redirect("/signin")
})


socket.init()

httpServer.listen(PORT, () => {
    console.log(`http://localhost:${PORT}`);
});
