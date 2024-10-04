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
    addDataOrder(req, function (err, respInsertOrder) {
        if (err) {
            res.status(201).json({
                data: null,
                success: false,
                error: err
            });
        } else {
            if (req.body.product_list.length) {
                forAddDataOrderItem(respInsertOrder.insertId, req.body.product_list, function (respInsertOrderItem) {
                    if (respInsertOrderItem == req.body.product_list.length){
                        res.status(201).json({
                            data: {
                                "order_id": respInsertOrder.insertId,
                                "alert": "เพิ่มข้อมูลการสั่งซื้อสำเร็จเรียบร้อย"
                            },
                            success: true,
                            error: null
                        });
                    }else{
                        res.status(201).json({
                            data: {
                                "order_id": respInsertOrder.insertId,
                                "alert": "เพิ่มข้อมูลการสั่งซื้อสำเร็จเรียบร้อย*"
                            },
                            success: true,
                            error: null
                        });
                    }
                });
            } else {
                res.status(201).json({
                    data: {
                        "order_id": respInsertOrder.insertId,
                        "alert": "เพิ่มข้อมูลการสั่งซื้อสำเร็จเรียบร้อย"
                    },
                    success: true,
                    error: null
                });
            }
        }
    });
}
function addDataOrder(req, callback) {
    var code = orderNumber("TK");
    var sql = "INSERT INTO db_order (" +
        "order_code," +
        "order_price," +
        "order_count," +
        "user_id" +
        ") VALUES ?";
    var arg = [[
        code,
        req.body.order_price,
        req.body.order_count,
        req.user.user
    ]];
    dbConnection.query(sql, [arg], function (err, object) {
        if (typeof callback == 'function') {
            callback((err) ? err : null, object);
        }
    });
}
function orderNumber(str) {
    let now = Date.now().toString();
    now += now + Math.floor(Math.random() * 10)
    return  str+[now.slice(0, 4), now.slice(4, 10), now.slice(10, 14)].join('')
}
function forAddDataOrderItem(orderID, dataList, callback) {
    var row = 0;
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
                callback(row);
            };
            this.req = function (item) {
                var _this = this;
                addDataOrderItem(orderID, item, function (err, dataItem) {
                    if (err) {
                        _this.next(false);
                    } else {
                        row++;
                        _this.next(false);
                    }
                });
            };
        };
        var r = new Proc();
        r.start();
    } else {
        callback(row);
    }
}
function addDataOrderItem(orderID, item, callback) {
    var sql = "INSERT INTO db_order_item (" +
        "order_id," +
        "product_id," +
        "product_price," +
        "product_count," +
        "product_price_total" +
        ") VALUES ?";
    var arg = [[
        orderID,
        item.product_id,
        item.product_price,
        item.product_count,
        item.product_sum
    ]];
    dbConnection.query(sql, [arg], function (err, object) {
        if (typeof callback == 'function') {
            callback((err) ? err : null, object);
        }
    });
}