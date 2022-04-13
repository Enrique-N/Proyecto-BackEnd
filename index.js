const express = require("express");
const path = require("path")
const app = express();
let { Server: HttpServer } = require("http")
const httpServer = new HttpServer(app);
let Socket = require("./routes/Chat/chat")
let socket = new Socket(httpServer)
let mainRoute = require('./routes/Chat/index')
let logInRoute = require("./routes/LogIn/index");
let PORT = 8080;

//app.use(cors(config.cors));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
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
