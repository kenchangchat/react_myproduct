const dbConnection = require("../../db/db_mysql");

exports.validate = function (req, res, next) {
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
    getDataList(req, function (err, respProductType) {
        if (err) {
            res.status(201).json({
                data: null,
                success: false,
                error: err
            });
        } else {
            if (respProductType.length) {
                res.status(200).json({
                    data: respProductType,
                    success: true,
                    error: null
                });
            } else {
                res.status(201).json({
                    data: [],
                    success: true,
                    error: null
                });
            }
        }
    });
}

function getDataList(req, callback) {
    var sql = "SELECT * FROM db_product_type";
    var arg = {};
    dbConnection.query(sql, arg, function (err, object) {
        if (typeof callback == 'function') {
            callback((err) ? err : null, object);
        }
    });
}
