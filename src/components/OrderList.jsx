import React, { useState, useEffect } from "react";
import Paper from '@mui/material/Paper';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TablePagination from '@mui/material/TablePagination';
import TableRow from '@mui/material/TableRow';
import { Skeleton } from "antd";
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import 'bootstrap/dist/css/bootstrap.min.css';

import {requestPOST, requestGET, formatNumber, formatDateTime} from "../api/Utils";

function OrderList() {
    var token = sessionStorage.getItem("token");
    if (token === null) {
        window.location.replace('/login');
    }

    const [loading, setLoading] = useState(false);
    const [page, setPage] = useState(0);
    const [rowsPerPage, setRowsPerPage] = useState(10);

    const [dataOrderList, setDataOrderList] = useState([]);
    const [dataOrderByItemList, setDataOrderByItemList] = useState([]);
    
    const [modalViewDetailOrder, setModalViewDetailOrder] = useState(false);

    useEffect(()=>{
        getOderList();
	}, []);

    const getOderList = () => {
        setLoading(true);
        requestPOST("/getDataOrder", {}, function(response) {
            console.log(response);
            if (response.success) {
                setDataOrderList(response.data);
            }
            setLoading(false);
        });
    };
    
    const columns = [
        { dataName: '', label: 'No', width: 20, align: 'center' },
        { dataName: 'order_code', label: 'Order No', width: 100, align: 'left' },
        { dataName: 'order_date', label: 'Date', width: 100, align: 'left' },
        { dataName: 'order_count', label: 'Order Count', width: 100, align: 'right' },
        { dataName: 'order_price', label: 'Total', width: 100, align: 'right' },
        { dataName: 'order_status', label: 'Status', width: 100, align: 'right' },
        { dataName: 'order_id', label: '#', width: 50, align: 'center', active: true},
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
                        {column.dataName === "" 
                            ? index+1 
                            : column.dataName === "order_price" 
                                ? formatNumber(value)
                                :  column.active 
                                    ? <ButtonDetail value={value} />
                                    : column.dataName === "order_date" 
                                        ? formatDateTime(value)
                                        : column.dataName === "order_status" 
                                            ? value === 0 ? "Order completed" : "Wait"
                                            : value
                        }
                    </TableCell>
                )
            })}
        </TableRow>
        )
    };

    const ButtonDetail = ({ value }) => (
        <div>
            <button className="btn btn-primary mb-2" onClick={() => onViewDetail(value)}>Detail</button>{" "}
        </div>
    );

    const onViewDetail = (val) => {
         const orderBy = dataOrderList.map((item) => {
            if (item.order_id === val) {
                return item;
            }
            return null;
        }).filter(Boolean); 
        if (orderBy.length > 0) {
            setDataOrderByItemList(orderBy);
            setModalViewDetailOrder(true);
        }
    }

    const closeModal = () => setModalViewDetailOrder(false);

    const handleChangeRowsPerPage = (event) => {
        setRowsPerPage(+event.target.value);
        setPage(0);
    };
    
    const handleChangePage = (event, newPage) => {
        setPage(newPage);
    };

  return (
    <>
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
                            {dataOrderList.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage).map((row, index) => (
                                <TableBodyItem item={row} index={index} />
                            ))}
                        </TableBody>
                        </Table>
                        </Skeleton>
                    </TableContainer>
                    <TablePagination
                        rowsPerPageOptions={[10, 50, 100]}
                        component="div"
                        count={dataOrderList.length}
                        rowsPerPage={rowsPerPage}
                        page={page}
                        onPageChange={handleChangePage}
                        onRowsPerPageChange={handleChangeRowsPerPage}
                    />
                </Paper>
            </div>
        </div>
        <hr />
    </div>
    <Dialog open={modalViewDetailOrder} onClose={closeModal} fullWidth={true} maxWidth="lg" >
        {dataOrderByItemList.length > 0 && (
        <DialogTitle>Order product list: <b>#{dataOrderByItemList[0].order_code}</b></DialogTitle>
        )}
        <DialogContent>
            {dataOrderByItemList.length > 0 && (
            <DialogContentText>
            <div className="row">
                <div className="col-4">
                    <p>Date: <b>{formatDateTime(dataOrderByItemList[0].order_date)}</b></p>
                </div>
                <div className="col-4">
                    <p>List Count: <b>{dataOrderByItemList[0].order_count}</b></p>
                </div>
                <div className="col-4">
                    <p>Total Amount: <b>{formatNumber(dataOrderByItemList[0].order_price)}</b></p>
                </div>
            </div>
            </DialogContentText>
            )}
            <div className="row">
                <div className="col-12">
                    {dataOrderByItemList.length > 0 && (
                    <TableContainer component={Paper}>
                        <Table sx={{ minWidth: 650 }} aria-label="simple table">
                            <TableBody>
                                {/* <TableRow key="00" sx={{ '&:last-child td, &:last-child th': { border: 0 } }} >
                                    <TableCell align="center" width="5%">#</TableCell>
                                    <TableCell align="center" width="10%">Photo</TableCell>
                                    <TableCell align="center" width="10%">Barcode</TableCell>
                                    <TableCell align="center" width="20%">Product Name</TableCell>
                                    <TableCell align="center" width="10%">Price</TableCell>
                                    <TableCell align="center" width="10%">Quantity</TableCell>
                                    <TableCell align="center" width="10%">Total</TableCell>
                                </TableRow> */}
                                {dataOrderByItemList[0].product_list.map((item, i) => {
                                    return (
                                    <TableRow key={i} sx={{ '&:last-child td, &:last-child th': { border: 0 } }} >
                                        <TableCell align="center" width="5%">{i+1}</TableCell>
                                        <TableCell align="center" width="10%"><img src={`./image/product/${item.product_img}`} alt="photo" height="50" /></TableCell>
                                        <TableCell align="center" width="10%">{item.product_code}</TableCell>
                                        <TableCell align="center" width="20%">{item.product_name}</TableCell>
                                        <TableCell align="center" width="10%">{formatNumber(item.product_price)}</TableCell>
                                        <TableCell align="center" width="10%">{item.product_count}</TableCell>
                                        <TableCell align="center" width="10%">{formatNumber(item.product_price_total)}</TableCell>
                                    </TableRow>
                                    )
                                })}
                            </TableBody>
                        </Table>
                    </TableContainer>
                    )}
                </div>
            </div>
        </DialogContent>
        <DialogActions>
            <button className="btn btn-secondary mb-2" onClick={() => closeModal()}>Close</button>
        </DialogActions>
    </Dialog>
    </>
  );
}

export default OrderList;

