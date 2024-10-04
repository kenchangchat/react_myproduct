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
    getDataList(req, function (err, respProduct) {
        if (err) {
            res.status(201).json({
                data: null,
                success: false,
                error: err
            });
        } else {
            if (respProduct.length) {
                res.status(200).json({
                    data: respProduct,
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
    var where = "";
    var groupBy = "";
    if (req.body.product_id) {
        where += " AND a.product_id = '" + req.body.product_id + "'";
    }
    if (req.body.product_type && req.body.product_type != "all") {
        where += " AND a.product_type = '" + req.body.product_type + "'";
    }
    if (req.body.product_status) {
        where += " AND a.product_status = '" + req.body.product_status + "'";
    }
    if (req.body.dataSearch) {
        where += " AND a.product_code LIKE '%" + req.body.dataSearch + "%' OR a.product_name LIKE '%" + req.body.dataSearch + "%' OR a.product_detail LIKE '%" + req.body.dataSearch + "%'";
    }
    var sql = "SELECT * FROM db_product a LEFT JOIN db_product_type b ON a.product_type = b.product_type_id WHERE a.product_status = 0 " + where + "" + groupBy;
    var arg = {};
    dbConnection.query(sql, arg, function (err, object) {
        if (typeof callback == 'function') {
            callback((err) ? err : null, object);
        }
    });
}
