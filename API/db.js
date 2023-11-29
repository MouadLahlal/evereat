const mysql = require('mysql2');

const dbOptions = {
    connectionLimit : 100,
    host: "localhost",
    user: "node",
    password : "node",
    database : "kebab_project",
    multipleStatements: true
};

const dbPool = mysql.createPool(dbOptions);

module.exports = dbPool;