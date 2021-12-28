let { Server: SocketIO } = require("socket.io")
let Contenedor = require("../Productos/productos");
let contenedor = new Contenedor("../../productos.txt")
const db_obj = require("./../../config/db");
const db = db_obj.client;

class Socket {
    static instancia;
    constructor(http) {
        this.backOutInfo = "",
            this.mensajes = [],
            this.usuarios = [],
            this.db = db
        if (Socket.instancia) {
            return Socket.instancia;
        } else {
            Socket.instancia = this;
            this.io = new SocketIO(http);
        }
    }
    init() {
        try {
            contenedor.CreateDB()
            this.io.on('connection', socket => {
                console.log(`Usuario conectado ${socket.id}`)
                socket.emit("init", this.backOutInfo)
                socket.on("infoProductos", async item => {
                    contenedor.addProductos(item)
                    let res = await this.db.from("Productos")
                    this.backOutInfo = res
                    this.io.sockets.emit("mi_sala", res)
                })
                socket.emit("init_chat", this.mensajes);
                socket.on("mensaje", async data => {
                    this.mensajes.push(data);
                    await this.db.from("ecommerce").insert(data)
                    this.io.sockets.emit('listenserver', this.mensajes);
                });

                socket.on("addUser", data => {
                    if (this.usuarios.length > 0) {
                        let verifivation_user = false;
                        this.usuarios = this.usuarios.map(usuario => {
                            if (usuario.email == data.email) {
                                verifivation_user = true;
                                return {
                                    id: socket.id,
                                    ...data,
                                    active: true
                                };
                            } else {
                                return usuario;
                            }
                        });
                        if (!verifivation_user) {
                            this.usuarios.push({
                                id: socket.id,
                                ...data,
                                active: true
                            });
                        }

                    } else {
                        this.usuarios.push({
                            id: socket.id,
                            ...data,
                            active: true
                        });
                    }
                    this.io.sockets.emit('loadUsers', this.usuarios);
                });

                socket.on("disconnect", data => {
                    this.usuarios = this.usuarios.map(usuario => {
                        if (usuario.id == socket.id) {
                            delete usuario.active;
                            return {
                                ...usuario,
                                active: false
                            };
                        } else {
                            return usuario;
                        }
                    });
                    console.log("Alguien se desconectó", socket.id);
                    this.io.sockets.emit('loadUsers', this.usuarios);
                });
            })
        } catch (error) {
            console.log(error)
        }
    }
}

module.exports = data = [];

module.exports = Socket;