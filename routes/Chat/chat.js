let { Server: SocketIO } = require("socket.io")
let Contenedor = require("../Productos/productos");
let contenedor = new Contenedor("../../productos.txt")
let { db: firebaseDB } = require("../../utils/firebase")

class Socket {
    static instancia;
    constructor(http) {
        this.backOutInfo = "",
            this.mensajes = [],
            this.usuarios = []
        if (Socket.instancia) {
            return Socket.instancia;
        } else {
            Socket.instancia = this;
            this.io = new SocketIO(http);
        }
    }
    init() {
        try {
            //contenedor.CreateDB()
            this.io.on('connection', socket => {
                socket.emit("init", this.backOutInfo)
                socket.on("infoProductos", async item => {
                    await contenedor.addProductos(item);
                    let res = await firebaseDB.collection('productos').orderBy('date').get();
                    let data = res.docs;
                    let items = [];
                    data.map((doc) => {
                        items.push(doc.data())
                    })
                    this.backOutInfo = items;
                    this.io.sockets.emit("mi_sala", items)
                })
                socket.on("addUser", data => {
                    if (this.usuarios.length > 0) {
                        let verifivation_user = false;
                        this.usuarios = this.usuarios.map(usuario => {
                            if (usuario.id == data.id) {
                                verifivation_user = true;
                                return {
                                    id_: socket.id,
                                    ...data,
                                    active: true
                                };
                            } else {
                                return usuario;
                            }
                        });
                        if (!verifivation_user) {
                            this.usuarios.push({
                                id_: socket.id,
                                ...data,
                                active: true
                            });
                        }

                    } else {
                        this.usuarios.push({
                            id_: socket.id,
                            ...data,
                            active: true
                        });
                    }
                    this.io.sockets.emit('loadUsers', this.usuarios);
                });

                socket.on("disconnect", data => {
                    this.usuarios = this.usuarios.map(usuario => {
                        if (usuario.id_ == socket.id) {
                            delete usuario.active;
                            return {
                                ...usuario,
                                active: false
                            };
                        } else {
                            return usuario;
                        }
                    });
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