const dbConnection = require("../../db/db_mysql");
const jwt = require('jsonwebtoken');
const tokenKey = process.env.TOKEN_KEY || "9FbpyQaOdS4/aWtRYEw3d8CzKlgZbUwNfPEfIqaVErE=";

exports.validate = function (req, res, next) {
    if (!req.body && !req.body.username && !req.body.password) {
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
    getDataList(req, function(err, resp){
        if (err) {
            res.status(201).json({
                data: null,
                success: false,
                error: err
            });
        } else {
            if (resp.length > 0) {
                const token = jwt.sign(
                    {user: resp[0].user_id},
                    tokenKey || 'default_secret',
                    {expiresIn: '24h'}
                );
                var respData = {
                    user_id: resp[0].user_id,
                    user_name: resp[0].user_name,
                    user_username: resp[0].user_username,
                    user_type: resp[0].user_type,
                    token: token,
                }
                setLogLogin(resp[0].user_id, function(err, resp){
                    res.status(200).json({
                        data: respData,
                        success: true,
                        error: null
                    });
                });
            }else{
                res.status(201).json({
                    data: "username หรือ password ไม่ถูกต้อง",
                    success: false,
                    error: null
                });
            }
        }
    });
}

function getDataList(req, callback) {
    var sql = "SELECT * FROM db_user WHERE user_status = 0 AND user_username = '"+req.body.username+"' AND user_password = '"+req.body.password+"'";
    var arg = {};
    dbConnection.query(sql, arg, function(err, object){
        if (typeof callback == 'function') {
            callback((err) ? err : null, object);
        }
    });
}

function setLogLogin(id, callback) {
    var sql = "UPDATE db_user SET " +
        "user_last_login = NOW() " +
        "WHERE user_id  = '" + id + "'";
    var arg = {};
    dbConnection.query(sql, arg, function (err, object) {
        if (typeof callback == 'function') {
            callback((err) ? err : null, object);
        }
    });
}