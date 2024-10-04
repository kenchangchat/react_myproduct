
require('./config/connect').connect();
const express = require('express');
const cors = require('cors');
const auth = require('./apis/_managers/auth');
const bodyParser = require("body-parser");
const app = express();
app.use(function (req, res, next) {
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE');
    res.setHeader('Access-Control-Allow-Headers', 'Content-Type');
    res.setHeader('Access-Control-Allow-Credentials', true);
    next();
});
app.use(cors());
app.use(express.json());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.rootPath = '/api';
var url = express.Router();

// register & login
var addUser = require('./apis/user/register'); url.post('/register', addUser.validate, addUser.find);
var getUser = require('./apis/user/login'); url.post('/login', getUser.validate, getUser.find);

// ข้อมูลผู้ใช้งาน
// var getDataUser = require('./apis/users/getDataUser'); url.post('/getDataUser', getDataUser.validate, auth, getDataUser.find);
// var updateDataUser = require('./apis/users/updateDataUser'); url.post('/updateDataUser', updateDataUser.validate, auth, updateDataUser.find);

// ข้อมูลสินค้า
var getDataProduct = require('./apis/product/getDataProduct'); url.post('/getDataProduct', getDataProduct.validate, auth, getDataProduct.find);
var addDataProduct = require('./apis/product/addDataProduct'); url.post('/addDataProduct', addDataProduct.validate, auth, addDataProduct.uploadFile, addDataProduct.find);
var updateDataProduct = require('./apis/product/updateDataProduct'); url.post('/updateDataProduct', updateDataProduct.validate, auth, updateDataProduct.uploadFile, updateDataProduct.find);
var deleteDataProduct = require('./apis/product/deleteDataProduct'); url.post('/deleteDataProduct', deleteDataProduct.validate, auth, deleteDataProduct.find);

// ข้อมูลสประเภทสินค้า
var getDataProductType = require('./apis/product/getDataProductType'); url.post('/getDataProductType', getDataProductType.validate, auth, getDataProductType.find);

// ข้อมูลการสั่งซื้อสินค้า
var getDataOrder = require('./apis/order/getDataOrder'); url.post('/getDataOrder', getDataOrder.validate, auth, getDataOrder.find);
var addDataOrder = require('./apis/order/addDataOrder'); url.post('/addDataOrder', addDataOrder.validate, auth, addDataOrder.find);

app.use(app.rootPath, url);
module.exports = app;