const dbConnection = require("../../db/db_mysql");
const jwt = require('jsonwebtoken');

exports.validate = function (req, res, next) {
    if (!req.body && !req.body.user_id) {
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
    updateData(req, function(err, resp){
        if (err) {
            res.status(201).json({
                data: null,
                success: false,
                error: err
            });
        } else {
            res.status(200).json({
                data: "แก้ไขข้อมูลสำเร็จเรียบร้อย",
                success: true,
                error: null
            });
        }
    });
}

function updateData(req, callback) {
    var value = "user_id = '"+req.body.user_id+"'";
    if (req.body.password){
        value += " ,user_password = '"+req.body.password+"'";
    }
    if (req.body.user_name){
        value += " ,user_name = '"+req.body.user_name+"'";
    }
    if (req.body.user_tel){
        value += " ,user_tel = '"+req.body.user_tel+"'";
    }
    var sql = "UPDATE users SET "+value+" WHERE user_id = '"+req.body.user_id+"'";
    var arg = {};
    dbConnection.query(sql, arg, function(err, object){
        if (typeof callback == 'function') {
            callback((err) ? err : null, object);
        }
    });
}