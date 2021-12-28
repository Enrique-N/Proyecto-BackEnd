const express = require("express");
const app = express();
const cors = require('cors');
const { config } = require("./config");
const PORT = config.port;
let { Server: HttpServer } = require("http")
const httpServer = new HttpServer(app);
const productosRoute = require("./routes/Productos/index");
const chatRoutes = require("./routes/Chat/index");
const path = require("path")
let Socket = require("./routes/Chat/chat")
let socket = new Socket(httpServer)


app.use(cors(config.cors));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static('./public'))


app.set("views", path.join(__dirname, "views", "ejs"));
app.set("view engine", "ejs");


productosRoute(app)
chatRoutes(socket)


httpServer.listen(PORT, () => {
    console.log(`http://localhost:${PORT}`);
});