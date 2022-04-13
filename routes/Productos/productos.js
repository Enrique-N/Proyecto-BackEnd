let { db: firebaseDB } = require("../../utils/firebase")

class Contenedor {
    constructor() {
        this.contador = 0
    }
    async getAll(res) {
        try {
            let data = await firebaseDB.collection('productos').get()
            let doc = data.docs;
            let items = []
            doc.map((doc) => {
                items.push(doc.data())
            })
            items.sort((a, b) => {
                if (a.id > b.id) {
                    return 1;
                }
                if (a.id < b.id) {
                    return -1;
                }
                return 0;
            })
            return res.send(items)
        } catch (error) {
            console.log(error);
        }
    } async addProductos(item) {
        try {
            this.contador++
            let productos = firebaseDB.collection('productos')
            await productos.doc().set({
                ...item,
                id: this.contador,
                date: new Date().toLocaleString()
            });
            return productos;
        } catch (error) {
            console.log(error);
        }
    } async getByid(id, res) {
        try {
            let data = await firebaseDB.collection('productos').get()
            let doc = data.docs;
            let items = []
            doc.map((doc) => {
                items.push(doc.data())
            })
            let getItem = items.filter(item => item.id === parseFloat(id))
            if (getItem) {
                return res.send(getItem)
            } else {
                return res.send({ error: "Producto no encontrado" })
            }
        } catch (error) {
            console.log(error);
        }
    }
}

module.exports = Contenedor;