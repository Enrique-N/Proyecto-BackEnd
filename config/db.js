let { db } = require('./index')
let knex = require('knex')

let mysql = knex({
    client: 'mysql',
    connection: {
        ...db
    },
    pool: { min: 0, max: 7 }
})

let sqlite = knex({
    client: 'sqlite3',
    connection: { filename: './DB/ecommerce.sqlite' }
})

class Database {
    static client;
    constructor() {
        if (Database.client) {
            return Database.client;
        }
        Database.client = sqlite;
        this.client = Database.client;
    }
}


module.exports = new Database()