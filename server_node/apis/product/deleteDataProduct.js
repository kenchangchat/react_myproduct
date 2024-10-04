const dbConnection = require("../../db/db_mysql");

exports.validate = function (req, res, next) {
    if (!req.body && !req.body.product_id) {
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
    updateData(req, function (err, resp) {
        if (err) {
            res.status(201).json({
                data: null,
                success: false,
                error: err
            });
        } else {
            res.status(200).json({
                data: "ลบข้อมูลสำเร็จเรียบร้อย",
                success: true,
                error: null
            });
        }
    });
}
function updateData(req, callback) {
    var sql = "UPDATE db_product SET " +
        "product_status=1," +
        "product_updated=NOW()," +
        "product_updated_by='" + req.user.user + "'" +
        "WHERE product_id = " + req.body.product_id
    var arg = {};
    dbConnection.query(sql, arg, function (err, object) {
        if (typeof callback == 'function') {
            callback((err) ? err : null, object);
        }
    });
}