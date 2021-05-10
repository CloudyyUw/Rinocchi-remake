const sqlite3 = require('sqlite3').verbose()

const db = new sqlite3.Database("db.sqlite", (err) => {
    if (err) {
        console.error(err.message)
    } else {
        console.log("Conectado ao Banco de dados")
    }
});

module.exports = db;