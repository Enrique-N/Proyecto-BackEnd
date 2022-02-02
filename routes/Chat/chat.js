let { Server: SocketIO } = require("socket.io")
let Contenedor = require("../Productos/productos");
let contenedor = new Contenedor("../../productos.txt")
let { db: firebaseDB } = require("../../utils/firebase")
let { schema, normalize, denormalize } = require('normalizr');
let inspect = require('../../utils/normalizr/index')

class Socket {
    static instancia;
    constructor(http) {
        this.backOutInfo = "",
            this.mensajes = [],
            this.usuarios = [],
            this.porcentaje = 0
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
                console.log(`Usuario conectado ${socket.id}`)
                socket.emit("init", this.backOutInfo)
                socket.on("infoProductos", async item => {
                    await contenedor.addProductos(item)
                    let res = await firebaseDB.collection('productos').get();
                    let data = res.docs;
                    let items = []
                    data.map((doc) => {
                        items.push(doc.data())
                    })
                    this.backOutInfo = items;
                    this.io.sockets.emit("mi_sala", items)
                })
                socket.emit("init_chat", this.mensajes);
                socket.emit('normalizer_data', this.porcentaje)
                socket.on("mensaje", async data => {
                    this.mensajes.push(data);
                    let cont = firebaseDB.collection('ecommerce');
                    await cont.doc().set(data)
                    this.io.sockets.emit('listenserver', this.mensajes);
                    const id = new schema.Entity('id')
                    const msj = new schema.Entity('mensaje')
                    const author = new schema.Entity('authors', { author: id }, { idAttribute: 'id' });
                    const esquema = new schema.Entity('mensajes', {
                        author: author,
                        mensaje: msj
                    }, { idAttribute: 'mensaje' });
                    const normali = normalize(this.mensajes, [esquema]);
                    //inspect(normali)
                    let mensajes_lg = JSON.stringify(this.mensajes).length;
                    let mensajes_normalizados_lg = JSON.stringify(normali).length;
                    let porcentaje = (mensajes_lg * 100) / mensajes_normalizados_lg;
                    this.porcentaje = porcentaje
                    this.io.sockets.emit('normalizer_data', porcentaje)
                });
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