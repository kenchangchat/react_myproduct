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
    getDataList(req, function (err, dataList) {
        if (err) {
            res.status(201).json({
                data: null,
                success: false,
                error: err
            });
        } else {
            if (dataList.length) {
                forGetProduct(dataList, function (dataListNew) {
                    res.status(200).json({
                        data: dataListNew,
                        success: true,
                        error: null
                    });
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
    if (req.body.order_code) {
        where += " AND order_code = '" + req.body.order_code + "'";
    }
    if (req.user.user) {
        where += " AND user_id = '" + req.user.user + "'";
    }
    var sql = "SELECT * FROM db_order WHERE order_status = 0 " + where;
    var arg = {};
    dbConnection.query(sql, arg, function (err, object) {
        if (typeof callback == 'function') {
            callback((err) ? err : null, object);
        }
    });
}
function forGetProduct(dataList, callback) {
    var dataListNew = [];
    if (dataList.length > 0) {
        var Proc = function () {
            this.rows = 0;
            this.start = function () {
                this.next(true);
            };
            this.next = function (isReset) {
                this.rows = (isReset) ? 0 : this.rows + 1;
                if (dataList[this.rows]) {
                    var item = (dataList[this.rows]);
                    this.req(item);
                } else {
                    this.end();
                }
            };
            this.end = function () {
                callback(dataListNew);
            };
            this.req = function (item) {
                var _this = this;
                getDataItemList(item.order_id, function (err, dataItem) {
                    if (err) {
                        item['product_list'] = [];
                    } else {
                        item['product_list'] = dataItem;
                    }
                    dataListNew.push(item);
                    _this.next(false);
                });
            };
        };
        var r = new Proc();
        r.start();
    } else {
        callback(dataList);
    }
}
function getDataItemList(orderID, callback) {
    var sql = "SELECT " +
        "a.order_item_id, " +
        "a.order_id, " +
        "a.product_id, " +
        "a.product_price, " +
        "a.product_count, " +
        "a.product_price_total, " +
        "b.product_code, " +
        "b.product_name, " +
        "b.product_detail, " +
        "b.product_img, " +
        "b.product_type, " +
        "c.product_type_name " +
        "FROM db_order_item a " +
        "LEFT JOIN db_product b ON a.product_id = b.product_id " +
        "LEFT JOIN db_product_type c ON b.product_type = c.product_type_id " +
        "WHERE a.order_id = '" + orderID + "'";
    var arg = {};
    dbConnection.query(sql, arg, function (err, object) {
        if (typeof callback == 'function') {
            callback((err) ? err : null, object);
        }
    });
}
