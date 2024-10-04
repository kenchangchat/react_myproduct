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
import 'bootstrap/dist/css/bootstrap.min.css';

import {requestPOST, requestGET, formatNumber} from "../api/Utils";

function ProductList() {
    var token = sessionStorage.getItem("token");
    if (token == null) {
        window.location.replace('/login');
    }

    const [loading, setLoading] = useState(false);
    const [dataType, setDataType] = useState("all");
    const [dataStatus, setDataStatus] = useState("all");
    const [dataSearch, setDataSearch] = useState("");
    const [typeList, setTypeList] = useState([]);
    const [dataList, setData] = useState(() => []);
    const [page, setPage] = useState(0);
    const [rowsPerPage, setRowsPerPage] = useState(10);

    useEffect(()=>{
        getProductTypeList();
        onSearch();
	}, []);

    const getProductTypeList = () => {
        requestPOST("/getDataProductType", {}, function(response) {
                console.log(response);
            if (response.success) {
                setTypeList(response.data);
            }
        });
    }
    
    const onSearch = () => {
        setLoading(true);
        const params = {
            product_type: dataType,
            product_status: dataStatus,
            dataSearch: dataSearch
        };
        requestPOST("/getDataProduct", params, function(response) {
            console.log(response);
            if (response.success) {
                setData(response.data);
            }
            setLoading(false);
        });
    }
    
    const columns = [
        { dataName: '', label: 'No', width: 20, align: 'center' },
        { dataName: 'product_img', label: 'Photo', width: 100, align: 'left' },
        { dataName: 'product_code', label: 'Code', width: 100, align: 'left' },
        { dataName: 'product_name', label: 'Name', width: 100, align: 'left' },
        { dataName: 'product_detail', label: 'Detail', width: 200, align: 'left' },
        { dataName: 'product_type_name', label: 'Type', width: 100, align: 'left' },
        { dataName: 'product_status', label: 'Status', width: 100, align: 'left' },
        { dataName: 'product_price', label: 'Price', width: 100, align: 'right' },
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
                                : column.dataName == "product_status" 
                                    ? value == 1 ? "Disable" : "Enable"
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
            <button className="btn btn-primary mb-2" onClick={() => onEdit(value)}>Update</button>{" "}
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
                var params = {
                    product_id: i
                };
                console.log(params);
                requestPOST("/deleteDataProduct", params, function(response) {
                    console.log(response);
                    if (response.success == true ) {
                        Swal.fire({
                            title: "SUCCESS",
                            html: "คุณได้ลบข้อมูลสำเร็จเรียบร้อย",
                            icon: 'success',
                            confirmButtonText: 'ตกลง',
                        }).then(() => {
                            onSearch();
                        });
                    } else {
                        Swal.fire({
                            title: "ERROR!",
                            html: "เกิดข้อผิดพลาดในการลบข้อมูล",
                            icon: 'error',
                            confirmButtonText: 'ตกลง',
                        });
                    }
                });
            }
        });
    }
    const onAdd = () => {
        window.location.replace('/product/add');
    }
    const onEdit = (code) => {
        // console.log(code);
        window.location.replace('/product/'+code);
    }
    const handleChangePage = (event, newPage) => {
        setPage(newPage);
    };
    const handleChangeRowsPerPage = (event) => {
        setRowsPerPage(+event.target.value);
        setPage(0);
    };
    const onChangeDataType = (e) => {
        setDataType(e.target.value);
    }
    const onChangeDataStatus = (e) => {
        setDataStatus(e.target.value);
    }
    const onChangeDataSearch = (e) => {
        setDataSearch(e.target.value);
    }

  return (
    <div className="containerBackend">
        <div className="row">
            <div className="col-6">
                <h3><b>Product List</b></h3>
            </div>
            <div className="col-6" style={{ textAlign: "right" }}>
                <button className="btn btn-success mb-2" onClick={onAdd}>Add Product</button>
            </div>
        </div>
        <hr />
        <div className="row">
            <div className="col-2">
                <FormControl fullWidth sx={{ m: 1 }} size="small">
                    <InputLabel id="select_type">Product Type</InputLabel>
                    <Select multiline labelId="select_type" label="Product Type" id="type" name="type" value={dataType} onChange={onChangeDataType}>
                        <MenuItem value="all" index="typeAll">All</MenuItem>
                        {typeList.map((item, index) => (
                            <MenuItem value={item.product_type_id} index={index}>{item.product_type_name}</MenuItem>
                        ))}
                    </Select>
                </FormControl>
            </div>
            <div className="col-2">
                <FormControl fullWidth sx={{ m: 1 }} size="small">
                    <InputLabel id="select_status">Status</InputLabel>
                    <Select multiline labelId="select_status" label="Status" id="status" name="status" value={dataStatus} onChange={onChangeDataStatus}>
                        <MenuItem value="all" index="statusAll0">All</MenuItem>
                        <MenuItem value="0" index="statusAll1">ใช้งาน</MenuItem>
                        <MenuItem value="1" index="statusAll2">ระงับ</MenuItem>
                    </Select>
                </FormControl>
            </div>
            <div className="col-3">
                <FormControl fullWidth sx={{ m: 1 }}>
                    <TextField value={dataSearch} onChange={onChangeDataSearch} multiline size="small" label="Search"/>
                </FormControl>
            </div>
            <div className="col-2">
                <FormControl fullWidth sx={{ m: 1 }}>
                    <button type="button" className="btn btn-primary" onClick={onSearch}>
                        Search
                    </button>
                </FormControl>
            </div>
        </div>
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
                            {dataList.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage).map((row, index) => (
                                <TableBodyItem item={row} index={index} />
                            ))}
                        </TableBody>
                        </Table>
                        </Skeleton>
                    </TableContainer>
                    <TablePagination
                        rowsPerPageOptions={[10, 50, 100]}
                        component="div"
                        count={dataList.length}
                        rowsPerPage={rowsPerPage}
                        page={page}
                        onPageChange={handleChangePage}
                        onRowsPerPageChange={handleChangeRowsPerPage}
                    />
                </Paper>
            </div>
        </div>
    </div>
  );
}

export default ProductList;

