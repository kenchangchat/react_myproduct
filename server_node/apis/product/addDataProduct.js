const dbConnection = require("../../db/db_mysql");
const MultipartDataMgr = require('../_managers/MultipartDataMgr');

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

exports.uploadFile = function (req, res, next) {
    var uploader = MultipartDataMgr.uploadFile2(__dirname + '/../../../public/image/product').fields([
        { name: 'product_img' }
    ]);
    uploader(req, res, function (err) {
        if (err) {
            res.status(201).json({
                data: null,
                success: false,
                error: err.message
            });
        } else {
            next();
        }
    });
};

exports.find = function (req, res, next) {
    checkData(req, function (err, respCheckUser) {
        if (respCheckUser.length > 0) {
            res.status(201).json({
                data: "สินค้านี้มีอยู่ในรายการสินค้าแนะนำแล้ว",
                success: false,
                error: null
            });
        } else {
            insertProduct(req, function (err, respInsertProduct) {
                if (err) {
                    res.status(201).json({
                        data: null,
                        success: false,
                        error: err
                    });
                } else {
                    res.status(200).json({
                        data: {
                            "product_id": respInsertProduct.insertId,
                            "alert": "เพิ่มข้อมูลสินค้าสำเร็จเรียบร้อย"
                        },
                        success: true,
                        error: null
                    });
                }
            });
        }
    });
}

function checkData(req, callback) {
    var sql = "SELECT * FROM db_product WHERE product_code = '" + req.body.product_code + "' AND product_name = '" + req.body.product_name + "'";
    var arg = {};
    dbConnection.query(sql, arg, callback);
}

function insertProduct(req, callback) {
    var sql = "INSERT INTO db_product (" +
        "product_code," +
        "product_name," +
        "product_detail," +
        "product_price," +
        "product_type," +
        "product_img," +
        "product_created_by" +
        ") VALUES ?";
    var arg = [[
        req.body.product_code,
        req.body.product_name,
        req.body.product_detail,
        req.body.product_price,
        req.body.product_type,
        req.files.product_img[0].filename,
        req.user.user
    ]];
    dbConnection.query(sql, [arg], function (err, object) {
        if (typeof callback == 'function') {
            callback((err) ? err : null, object);
        }
    });
}