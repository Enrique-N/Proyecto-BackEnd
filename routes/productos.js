const res = require("express/lib/response");

class Contenedor {
    constructor(db) {
        this.db = db
    }
    async CreateDB() {
        try {
            await this.db.schema.createTable("productos", table => {
                table.increments("id").primary(),
                    table.string("tittle"),
                    table.float("precio"),
                    table.string("thumbail")
            })
        } catch (error) {
            console.log(error);
        }
    } async getAll(res) {
        try {
            let response = await this.db.from("productos");
            res.json(response);
        } catch (error) {
            console.log(error);
        }
    } async addProductos() {
        try {
            let data = [
                {
                    tittle: "Televisor",
                    precio: 15,
                    thumbail: "imagen.com"
                },
                {
                    tittle: "Televisor2",
                    precio: 25,
                    thumbail: "imagen.com"
                }
            ];
            await this.db.from("productos").insert(data);
        } catch (error) {
            console.log(error);
        }
    } async getByid(id, res) {
        try {
            let response = await this.db.from("productos").where("id", "=", id);
            res.send(response);
        } catch (error) {
            console.log(error);
        }
    }
}

module.exports = Contenedor;