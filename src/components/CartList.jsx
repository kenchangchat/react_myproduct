import React, { useState, useEffect, useMemo } from "react";
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
import { Link } from "react-router-dom";
import CircularProgress from "@mui/material/CircularProgress";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import 'bootstrap/dist/css/bootstrap.min.css';

import {requestPOST, requestGET, formatNumber} from "../api/Utils";

function CartList() {
    var token = sessionStorage.getItem("token");
    if (token == null) {
        window.location.replace('/login');
    }

    const [loading, setLoading] = useState(false);
    const [page, setPage] = useState(0);
    const [rowsPerPage, setRowsPerPage] = useState(10);

    const [cartList, setCartList] = useState(() => {
        const savedCart = localStorage.getItem('cart_list');
        return savedCart ? JSON.parse(savedCart) : [];
    });
    const [sumTotal, setSumTotalPage] = useState(0);

    useEffect(()=>{
        sumTotalPrice();
        localStorage.setItem('cart_list', JSON.stringify(cartList));
	}, [cartList]);

    const sumTotalPrice = () => {
        const sum = cartList.reduce((total, i) => {
            return total + i.product_sum;
        }, 0);
        setSumTotalPage(sum);
    };
    
    const columns = [
        { dataName: '', label: 'No', width: 20, align: 'center' },
        { dataName: 'product_img', label: 'Photo', width: 100, align: 'left' },
        { dataName: 'product_code', label: 'Code', width: 100, align: 'left' },
        { dataName: 'product_name', label: 'Name', width: 200, align: 'left' },
        { dataName: 'product_price', label: 'Price', width: 100, align: 'right' },
        { dataName: 'product_count', label: 'Quantity', width: 100, align: 'right' },
        { dataName: 'product_sum', label: 'Total', width: 100, align: 'right' },
        { dataName: 'product_id', label: '#', width: 50, align: 'center', active: true},
    ];

    const TableHeadItem = ({ item }) => (
        <TableCell key={item.dataName} align={item.align} style={{ top: 0, minWidth: item.width }}>
            {item.label}
        </TableCell>
    );
    const TableBodyItem = ({ item, index }) => {
        return (
        <TableRow hover tabIndex={index} key={item.id}>
            {columns.map((column) => {
                const value = item[column.dataName];
                 return (
                    <TableCell align={column.align}>
                        {column.dataName == "" 
                            ? index+1 
                            : column.active 
                                ? <ButtonEdit value={value} />
                                : column.dataName == "product_sum" 
                                    ? formatNumber(value)
                                    :  column.dataName == "product_price" 
                                        ? formatNumber(value)
                                        : column.dataName == "product_img" 
                                            ? <img src={`./image/product/${value}`} alt="photo" height="50" />
                                            : value
                        }
                    </TableCell>
                )
            })}
        </TableRow>
        )
    };
    const ButtonEdit = ({ value }) => (
        <div>
            <button className="btn btn-danger mb-2" onClick={() => updateDeleteProduct(value)}>Delete</button>
        </div>
    );
    const updateDeleteProduct = (i) => {
        Swal.fire({
        title: "ยืนยัน",
        text: "คุณต้องการลบข้อมูลนี้ ใช่หรือไม่!",
        icon: "warning",
        showCancelButton: true,
        confirmButtonColor: "#3085d6",
        cancelButtonColor: "#d33",
        confirmButtonText: "ตกลง",
        cancelButtonText: "ยกเลิก",
        }).then((result) => {
            if (result.isConfirmed) {
                console.log("delete");
                setCartList((prevCart) => {
                    const updatedCart = prevCart.map((item) => {
                        if (item.product_id === i) {
                            const updatedCount = item.product_count - 1; // ลดจำนวน
                            if (updatedCount > 0) {
                                return {
                                    ...item,
                                    product_count: updatedCount,
                                    product_sum: updatedCount * item.product_price,
                                };
                            } else {
                                return null;
                            }
                        }
                        return item;
                        }).filter(Boolean); 
                    return updatedCart; // คืนค่า cartList ใหม่
                });
                window.location.replace("/cart");
            }
        });
    }

    const handleChangeRowsPerPage = (event) => {
        setRowsPerPage(+event.target.value);
        setPage(0);
    };
    
    const handleChangePage = (event, newPage) => {
        setPage(newPage);
    };

    const makePayment = () => {
        var params = {
            order_price: sumTotal,
            order_count: cartList.length,
            product_list: cartList
        };
        console.log(params);

        setLoading(true);
        Swal.fire({
        title: "ยืนยัน",
        text: "คุณต้องการดำเนินการสั่งซื้อ ใช่หรือไม่!",
        icon: "warning",
        showCancelButton: true,
        confirmButtonColor: "#3085d6",
        cancelButtonColor: "#d33",
        confirmButtonText: "ตกลง",
        cancelButtonText: "ยกเลิก",
        }).then((result) => {
            if (result.isConfirmed) {
                requestPOST("/addDataOrder", params, function (response) {
                    console.log(response);
                    if (response.success == true) {
                        setLoading(false);
                        Swal.fire({
                            title: "SUCCESS",
                            html: response.data.data,
                            icon: "success",
                            confirmButtonText: "ตกลง",
                        }).then(() => {
                            setCartList([]);
                            setTimeout(() => {
                                window.location.replace('/orderhistory');
                            }, 1000);
                        });
                    } else {
                        setLoading(false);
                        Swal.fire({
                            title: "ERROR!",
                            html: "เกิดข้อผิดพลาดในการสั่งซื้อ",
                            icon: "error",
                            confirmButtonText: "ตกลง",
                        });
                    }
                });
            }else{
                setLoading(false);
            }
        });
    };

  return (
    <div className="container">
        <div className="row">
            <div className="col-12">
                <h3><b>List of products in cart</b></h3>
            </div>
        </div>
        <hr />
        <div className="row">
            <div className="col-12">
                <Paper sx={{ width: '100%' }}>
                    <TableContainer>
                        <Skeleton loading={loading} style={{ margin: "0 auto", marginTop: "50px" }}>
                        <Table stickyHeader aria-label="sticky table">
                        <TableHead>
                            <TableRow key={'headerProduct'}>
                            {columns.map((column) => (
                                <TableHeadItem item={column} />
                            ))}
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {cartList.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage).map((row, index) => (
                                <TableBodyItem item={row} index={index} />
                            ))}
                        </TableBody>
                        </Table>
                        </Skeleton>
                    </TableContainer>
                    <TablePagination
                        rowsPerPageOptions={[10, 50, 100]}
                        component="div"
                        count={cartList.length}
                        rowsPerPage={rowsPerPage}
                        page={page}
                        onPageChange={handleChangePage}
                        onRowsPerPageChange={handleChangeRowsPerPage}
                    />
                </Paper>
            </div>
        </div>
        <hr />
        <Card>
            <CardContent>
                <div className="row  my-4">
                    <div className="col-12">
                        <h3>Total Amount: {formatNumber(sumTotal)} ฿</h3>
                    </div>
                    {cartList.length > 0 && (
                    <div className="col-12">
                        {loading ? (
                        <CircularProgress />
                        ) : (
                        <button className="btn btn-success" type="button" onClick={makePayment}>Order Now</button>
                        )}
                    </div>
                    )}
                </div>
            </CardContent>
        </Card>
    </div>
  );
}

export default CartList;

