const db_obj = require("./../../config/db");
const db = db_obj.client;

class Contenedor {
    constructor() {
        this.db = db
    }
    async CreateDB() {
        try {
            await this.db.schema.createTable("Productos", table => {
                table.increments("id").primary(),
                    table.string("tittle"),
                    table.float("precio"),
                    table.string("thumbail")
            })
            await this.db.schema.createTable("ecommerce", table => {
                table.string("name"),
                    table.string("email"),
                    table.string("mensaje"),
                    table.string('date')
            })
        } catch (error) {
            console.log(error);
        }
    } async getAll(res) {
        try {
            let response = await this.db.from("Productos");
            res.json(response);
        } catch (error) {
            console.log(error);
        }
    } async addProductos(item) {
        try {
            data.push({
                ...item
            })
            await this.db.from("Productos").insert(item);
        } catch (error) {
            console.log(error);
        }
    } async getByid(id, res) {
        try {
            let response = await this.db.from("Productos").where("id", "=", id);
            res.send(response);
        } catch (error) {
            console.log(error);
        }
    }
}

module.exports = Contenedor;