const express = require("express");
const app = express();
const PORT = 3000;
let { Server: HttpServer } = require("http")
const httpServer = new HttpServer(app);
const path = require("path")
let Socket = require("./routes/Chat/chat")
let socket = new Socket(httpServer)
let mainRoute = require('./routes/Chat/index')
let fakerRoute = require("./utils/faker/index")
let logInRoute = require("./routes/LogIn/index");



//app.use(cors(config.cors));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static('./public'));
app.use("/", mainRoute);
app.use("/productos-test", fakerRoute);
app.use("/login", logInRoute)

app.set("views", path.join(__dirname, "views", "ejs"));
app.set("view engine", "ejs");

socket.init()


httpServer.listen(PORT, () => {
    console.log(`http://localhost:${PORT}`);
});
