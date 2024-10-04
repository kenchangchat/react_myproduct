const mysql = require("mysql2");

exports.connect = () => {
    const dbConnection = mysql.createConnection({
        // host: "localhost",
        // host: "db",
        user: "root",
        password: "",
        database: "db_products",
        port: "3306"
    });
    dbConnection.connect((err)=>{
        if (err) {
            console.log('Error connecting to MySQL = ', err);
        }else{
            console.log('MySQL connected');
        }
    });
}