var mysql = require('mysql');

var con = mysql.createPool({
    host: "client-db.cf8aou1pqhfm.ap-south-1.rds.amazonaws.com",
    user: "nitesh",
    password: "yPfH3mWIdOmmkS2aOGox",
    database: "client_db",
    multipleStatements: true
});

module.exports = con;