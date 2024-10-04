const dbConnection = require("../../db/db_mysql");
const fs = require('fs');
const path = require('path');
const MultipartDataMgr = require("../_managers/MultipartDataMgr");

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
            if (Object.keys(req.files).length > 0){
                var imgOld = respCheckUser[0].product_img;
                if (imgOld){
                    const filePath = path.join(__dirname, '/../../../public/image/product', imgOld);
                    fs.unlink(filePath, (err) => {
                        if (err) {
                            console.error('Error deleting the file:', err);
                        }
                        console.log('File deleted successfully');
                    });
                }
            }
            updateData(req, function (err, resp) {
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
        }else{
            res.status(201).json({
                data: "หาข้อมุลที่ต้องการแก้ไขไม่พบ",
                success: true,
                error: null
            });
        }
    });
}
function checkData(req, callback) {
    var sql = "SELECT * FROM db_product WHERE product_id = '" + req.body.product_id + "'";
    var arg = {};
    dbConnection.query(sql, arg, callback);
}
function updateData(req, callback) {
    var img = "";
    if (Object.keys(req.files).length > 0){
        img += "product_img='" + req.files.product_img[0].filename + "',";
    }
    var sql = "UPDATE db_product SET " +
        "product_code='" + req.body.product_code + "'," +
        "product_name='" + req.body.product_name + "'," +
        "product_detail='" + req.body.product_detail + "'," +
        "product_price='" + req.body.product_price + "'," +
        "product_type='" + req.body.product_type + "'," +
        img +
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