import React, { useState, useEffect, useMemo, useRef  } from "react";
import Paper from '@mui/material/Paper';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TablePagination from '@mui/material/TablePagination';
import TableRow from '@mui/material/TableRow';
import FormControl from '@mui/material/FormControl';
import TextField from '@mui/material/TextField';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import Select from '@mui/material/Select';
import { Skeleton } from "antd";
import Swal from 'sweetalert2'
import 'bootstrap/dist/css/bootstrap.min.css';
import "./Shopping.css";

import {requestPOST, requestGET, formatNumber} from "../../api/Utils";

function Shopping() {
    var token = sessionStorage.getItem("token");
    if (token == null) {
        window.location.replace('/login');
    }

    const [loading, setLoading] = useState(false);
    const [productList, setProductList] = useState([]);
    
    // เก็บสินค้าในตะกร้า
    const [cartList, setCartList] = useState(() => {
        const savedCart = localStorage.getItem('cart_list');
        return savedCart ? JSON.parse(savedCart) : [];
    });

    useEffect(()=>{
        getProductProductList();
        localStorage.setItem('cart_list', JSON.stringify(cartList));
	}, [cartList]);

    const getProductProductList = () => {
        requestPOST("/getDataProduct", {}, function(response) {
            if (response.success) {
                console.log(response.data);
                setProductList(response.data);
            }
        });
    }

    const onAddCart = (product) => {
        console.log(product);
        setCartList((prevCart) => {
            // ตรวจสอบว่าสินค้านี้มีในตะกร้าอยู่แล้วหรือไม่
            const existingProduct = prevCart.find((item) => item.product_id === product.product_id);
            if (existingProduct) {
                // ถ้ามีอยู่ เพิ่มจำนวน
                return prevCart.map((item) =>
                item.product_id === product.product_id
                    ? {
                        ...item,
                        product_count: item.product_count + 1,
                        product_sum: (item.product_count + 1) * item.product_price,
                    }
                    : item
                );
            } else {
                // ถ้ายังไม่มี ให้เพิ่ม
                return [...prevCart, { ...product, product_count: 1, product_sum: product.product_price }];
            }
        });
        window.location.replace("/shopping/");
    }

    return (
        <div>
            {productList.length > 0 && (
                <div className="row">
                    {productList.map((val, i) => {
                        const item = productList[i];
                        var pathImg = "/image/product/" + item.product_img;
                        return (
                            <div className="col-4">
                                <div className="card">
                                    <img src={pathImg} alt="Photo" className="sneaaker-img" />
                                    <h5 className="color_fff">{item.product_name}</h5>
                                    <span>{item.product_detail}</span>
                                    <div className="button-box text-center color_fff">
                                        <h3>{item.product_price} ฿</h3>
                                    </div>
                                    <div className="button-box">
                                        <button className="purchase" onClick={() => onAddCart(val)}>Add to Cart</button>
                                    </div>
                                </div>
                            </div>
                        );
                    })}
                </div>
            )}  
        </div>
    );
}

export default Shopping;

