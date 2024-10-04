import React, { useState, useEffect, useRef } from "react";
import TextField from "@mui/material/TextField";
import FormControl from "@mui/material/FormControl";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import Select from "@mui/material/Select";
import Stack from "@mui/material/Stack";
import Avatar from "@mui/material/Avatar";
import Badge from "@mui/material/Badge";
import ImageIcon from "@mui/icons-material/Image";
import DeleteForeverIcon from "@mui/icons-material/DeleteForever";
import { red } from "@mui/material/colors";
import Swal from "sweetalert2";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import Box from "@mui/material/Box";
import CircularProgress from "@mui/material/CircularProgress";
import Switch from "@mui/material/Switch";
import Divider from "@mui/material/Divider";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import { Link } from "react-router-dom";

import {requestPOST, requestGET, requestPOST_PRODUCT, formatNumber} from "../api/Utils";

function ProductAddPage() {
  var token = sessionStorage.getItem("token");
  if (token == null) {
    window.location.replace("/login");
  }

  const [loading, setLoading] = useState(false);
  const [typeList, setTypeList] = useState([]);

  const [inputFiles, setInputFiles] = useState([]);
  const urlFIleView = inputFiles.map((file) => URL.createObjectURL(file));

  const [dataInput, setDataInput] = useState({
    type: "",
    barcode: "",
    name: "",
    detail: "",
    price: "0",
    img: ""
  });

  useEffect(() => {
    getProductTypeList();
  }, []);

    const getProductTypeList = () => {
      requestPOST("/getDataProductType", {}, function(response) {
        if (response.success) {
          setTypeList(response.data);
        }
      });
    }
  const onRemoveFile = (index) => {
    setInputFiles(inputFiles.filter((o, i) => index !== i));
  };
  const handleChange = (e) => {
    const { target } = e;
    const { name } = target;
    const value = target.value;
    setDataInput({ ...dataInput, [name]: value });
  };
  const onSubmit = (e) => {
    e.preventDefault();
    setLoading(true);
    console.log(dataInput);
    var params = {
      product_code: dataInput.barcode,
      product_name: dataInput.name,
      product_detail: dataInput.detail,
      product_price: dataInput.price,
      product_type: dataInput.type,
    };
    if (inputFiles.length > 0) {
      params['product_img'] = inputFiles[0];
    }
    console.log("params: ", params);
      requestPOST_PRODUCT("/addDataProduct", params, function (response) {
        console.log(response);
        if (response.success == true) {
          setLoading(false);
          Swal.fire({
            title: "SUCCESS",
            html: response.data.data,
            icon: "success",
            confirmButtonText: "ตกลง",
          }).then(() => {
            window.location.replace("/product");
          });
        } else {
          setLoading(false);
          Swal.fire({
            title: "ERROR!",
            html: "เกิดข้อผิดพลาดในการแก้ไขข้อมูล",
            icon: "error",
            confirmButtonText: "ตกลง",
          });
        }
      });
    setLoading(false);
  };

  return (
    <div className="containerBackend">
      <Card>
        <CardContent>
          <div className="col-12">
            <div className="row">
              <div className="col-12">
                <h3>
                  <b>Product New</b>
                </h3>
              </div>
            </div>
          </div>
          <div className="col-12">
            <form onSubmit={onSubmit}>
              <div className="row">
                <div className="col-3">
                  <div className="row  my-4">
                    <div className="col-12 text-center">
                      <FormControl fullWidth sx={{ m: 1 }}>
                        <input
                          type="file"
                          // multiple
                          className="hide"
                          accept="image/*"
                          id="files"
                          name="files"
                          onChange={(e) => {
                            console.log(e);
                            const file = e.target.files;
                            if (file) {
                              const files = [...file];
                              setInputFiles(files);
                            }
                          }}
                        />
                      </FormControl>
                    </div>
                    {urlFIleView.length == 0 && (
                      <div className="col-12 text-center pd-t10">
                        <button className="btn btn-default" type="button"><label htmlFor="files">Add Photo</label></button>
                      </div>
                    )}
                    {urlFIleView.length > 0 && (
                      <div className="col-12 text-center pd-t10">
                        <p>New photo</p>
                          {urlFIleView.map((url, i) => {
                            const filename = inputFiles[i].name;
                            return (
                              <Badge
                                overlap="circular"
                                anchorOrigin={{
                                  vertical: "top",
                                  horizontal: "right",
                                }}
                                badgeContent={
                                  <DeleteForeverIcon
                                    sx={{ color: red[900] }}
                                    onClick={() => onRemoveFile(i)}
                                  />
                                }
                              >
                                <Avatar
                                  variant="rounded"
                                  src={url}
                                  alt={filename}
                                  sx={{ width: 200, height: 200 }}
                                />
                              </Badge>
                            );
                          })}
                      </div>
                    )}
                  </div>
                </div>
                <div className="col-9">
                  <div className="row  my-4">
                    <div className="col-4">
                      <FormControl fullWidth sx={{ m: 1 }} size="small">
                        <InputLabel id="select_type">Type</InputLabel>
                        <Select
                          multiline
                          labelId="select_type"
                          label="Type"
                          id="type"
                          name="type"
                          value={dataInput.type}
                          onChange={handleChange}
                          required
                        >
                          {typeList.map((item, index) => (
                            <MenuItem value={item.product_type_id} index={index}>
                              {item.product_type_name}
                            </MenuItem>
                          ))}
                        </Select>
                      </FormControl>
                    </div>
                    <div className="col-4">
                      <FormControl fullWidth sx={{ m: 1 }}>
                        <TextField
                          multiline
                          size="small"
                          label="Code"
                          id="barcode"
                          name="barcode"
                          value={dataInput.barcode}
                          onChange={handleChange}
                          required
                        />
                      </FormControl>
                    </div>
                    <div className="col-4">
                      <FormControl fullWidth sx={{ m: 1 }}>
                        <TextField
                          multiline
                          size="small"
                          label="Price"
                          id="price"
                          name="price"
                          value={dataInput.price}
                          onChange={handleChange}
                        />
                      </FormControl>
                    </div>
                    <div className="col-12">
                      <FormControl fullWidth sx={{ m: 1 }}>
                        <TextField
                          multiline
                          size="small"
                          label="Name"
                          id="name"
                          name="name"
                          value={dataInput.name}
                          onChange={handleChange}
                          required
                        />
                      </FormControl>
                    </div>
                    <div className="col-12">
                      <FormControl fullWidth sx={{ m: 1 }}>
                        <TextField
                          multiline
                          size="small"
                          label="Detail"
                          id="detail"
                          name="detail"
                          rows={3}
                          value={dataInput.detail}
                          onChange={handleChange}
                        />
                      </FormControl>
                    </div>
                  </div>
                </div>
              </div>
              <hr />
              <div className="row  my-4">
                <div className="col-6 text-center">
                  <Link to="/product">
                    <button className="btn btn-default">Go Back</button>
                  </Link>
                </div>
                <div className="col-6 text-center">
                  {loading ? (
                    <CircularProgress />
                  ) : (
                    <button className="btn btn-success" type="submit">Save</button>
                  )}
                </div>
              </div>
            </form>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}

export default ProductAddPage;
