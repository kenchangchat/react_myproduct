const dbConnection = require("../../db/db_mysql");

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
    getDataList(req, function(err, resp){
        if (err) {
            res.status(201).json({
                data: null,
                success: false,
                error: err
            });
        } else {
            if (resp.length > 0) {
                res.status(200).json({
                    data: resp,
                    success: true,
                    error: null
                });
            }else{
                res.status(201).json({
                    data: "ข้อมุลที่ร้องขอไม่ถูกต้อง",
                    success: false,
                    error: null
                });
            }
        }
    });
}

function getDataList(req, callback) {
    var sql = "SELECT * FROM users WHERE user_id = '"+req.body.user_id+"'";
    var arg = {};
    dbConnection.query(sql, arg, function(err, object){
        if (typeof callback == 'function') {
            callback((err) ? err : null, object);
        }
    });
}