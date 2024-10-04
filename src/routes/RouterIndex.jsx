import React from "react";
// import { CssBaseline } from "@mui/material";
// import { Routes, Route } from "react-router-dom";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";

import Page404 from "../pages/404Page";
import HomePage from "../pages/HomePage";
import RegisterPage from "../pages/RegisterPage";
import LoginPage from "../pages/LoginPage";
import LogoutPage from "../pages/LogoutPage";
import ProductListPage from "../pages/ProductListPage";
import ProductDetailPage from "../pages/ProductDetailPage";
import ProductAddPage from "../pages/ProductAddPage";
import ShoppingPage from "../pages/ShoppingPage";
import CartListPage from "../pages/CartListPage";
import OrderListPage from "../pages/OrderListPage";

function RouterIndex() {
  
  return (
    <div>
      <Router>
        <Routes>
          <Route path="*" element={<Page404 />} />
          <Route path="/" element={<HomePage />} />
          <Route path="/register" element={<RegisterPage />} />
          <Route path="/login" element={<LoginPage />} />
          <Route path="/logout" element={<LogoutPage />} />
          <Route path="/product" element={<ProductListPage />} />
          <Route path="/product/:id" element={<ProductDetailPage />} />
          <Route path="/product/add" element={<ProductAddPage />} />
          <Route path="/shopping" element={<ShoppingPage />} />
          <Route path="/cart" element={<CartListPage />} />
          <Route path="/orderhistory" element={<OrderListPage />} />
        </Routes>
      </Router>
    </div>
  );
}

export default RouterIndex;
