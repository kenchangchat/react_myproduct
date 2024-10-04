const mysql = require("mysql");
const dbConnection = mysql.createConnection({
        host: "localhost",
        user: "root",
        password: "",
        database: "db_products",
        port: "3306"
});
module.exports = dbConnection;