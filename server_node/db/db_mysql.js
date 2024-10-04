const mysql = require("mysql2");
const dbConnection = mysql.createConnection({
        // host: "localhost",
        // host: "db",
        user: "root",
        password: "",
        database: "db_products",
        port: "3306"
});
module.exports = dbConnection;