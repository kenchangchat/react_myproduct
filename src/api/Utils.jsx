import axios from 'axios';
import { format } from 'date-fns';
import { api2 } from "./config";
var token = sessionStorage.getItem("token");

export function requestPOST(url, params, callback) {
  let config = {
      method: 'post',
      url: api2.baseURL+url,
      headers: {
          'x-access-token': token,
          'Content-Type': 'application/json'
      },
      data : params
  };
  axios.request(config).then((response) => {
      callback(response.data);
  }).catch((error) => {
      callback(error);
  });
}

export function requestGET(url, params, callback) {
    let config = {
        method: 'get',
        url: api2.baseURL+url,
        headers: {
            'x-access-token': token,
            'Content-Type': 'application/json'
        },
        data : JSON.stringify(params)
    };
    axios.request(config).then((response) => {
        callback(response.data);
    }).catch((error) => {
        callback(error);
    });
}

export function requestPOST_PRODUCT(url, params, callback) {
    const FormData = require('form-data');
    let data = new FormData();
        data.append('product_code', params.product_code);
        data.append('product_name', params.product_name);
        data.append('product_detail',params.product_detail);
        data.append('product_price', params.product_price);
        data.append('product_type', params.product_type);
        data.append('product_id', params.product_id);
        data.append('product_img', params.product_img);
    let config = {
        method: 'post',
        maxBodyLength: Infinity,
        url: api2.baseURL+url,
        headers: { 
            'Accept': 'application/json', 
            'x-access-token': token
        },
        data : data
    };
    axios.request(config).then((response) => {
        callback(response.data);
    }).catch((error) => {
        callback(error);
    });
}

export function formatNumber(number) {
    var number = (parseFloat(number).toFixed(2)).toString();
    var delimiter = ",";
    var a = number.split('.', 2);
    var b = a[1];
    var c = parseInt(a[0]);
    if (isNaN(c)){ return "";}
    var minus = "";
    if (c < 0){minus = "-";}
    c = Math.abs(c);
    var n = new String(c);
    var m = [];
    while (n.length > 3) {
        var nn = n.substring(n.length - 3);
        m.unshift(nn);
        n = n.substring(0, n.length - 3);
    }
    if (n.length > 0) { m.unshift(n); }
    n = m.join(delimiter);
    if (b.length < 1) { number = n; }
    else { number = n + "." + b; }
    number = minus + number;
    return  number;
}

export function formatDateTime(dateime) {
    return format(new Date(dateime), 'dd/MM/yyyy HH:mm:ss');
}