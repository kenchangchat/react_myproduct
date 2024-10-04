const dbConnection = require('../../db/db_mysql');

exports.validate = function(req, res, next){
    if (!req.body) {
        res.status(201).json({
            data: "ส่งค่ามาไม่ครบถ้วน",
            success: false,
            error: null
        });
    } else {
        next();
    }
}

exports.find = function (req, res, next) {
    checkUser(req.body.username, function(err, respCheckUser){
        if (respCheckUser.length > 0) {
            res.status(201).json({
                data: "อีเมล์นี้ถูกใช้ไปแล้ว",
                success: false,
                error: null
            });
        } else {
            insertUser(req, function(err, respInsertUser){
                if (err) {
                    res.status(201).json({
                        data: null,
                        success: false,
                        error: err
                    });
                } else {
                    res.status(200).json({
                        data: "ลงทะเบียนสำเร็จเรียบร้อย",
                        success: true,
                        error: null
                    });
                }
            });
        }
    });
}

function checkUser(username, callback) {
    var sql = "SELECT * FROM db_user WHERE user_username = '"+username+"'";
    var arg = {};
    dbConnection.query(sql, arg, callback);
}

function insertUser(req, callback){
    var sql = "INSERT INTO db_user (user_firstname, user_lastname, user_username, user_password) VALUES ?";
    var arg = [[req.body.firstname, req.body.lastname, req.body.username, req.body.password]];
    dbConnection.query(sql, [arg], function(err, object){
        if (typeof callback == 'function') {
            callback((err) ? err : null, object);
        }
    });
}