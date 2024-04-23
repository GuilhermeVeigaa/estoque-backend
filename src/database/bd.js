const mysql = require('mysql')

const db = mysql.createConnection({
    host: "localhost",
    user: "root",
    password: "25560123",
    database: "estoque"
})

module.exports = db