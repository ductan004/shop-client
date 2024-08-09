import React from "react";
import ReactDOM from "react-dom/client";
import reportWebVitals from "./reportWebVitals";
import { store } from "./redux/store";
import { Provider } from "react-redux";
import { BrowserRouter, Routes, Route } from "react-router-dom";

import App from "./App";
import Home from "./pages/Home";
import Shop from "./pages/Shop";
import Cart from "./pages/Cart";
import Detail from "./pages/Detail";
import Checkout from "./pages/Checkout";
import Login from "./pages/Login";
import Register from "./pages/Register";
import ChangePassword from "./pages/ChangePassword";
import OrderHistory from "./pages/OrderHistory";

import Admin from "./admin/Admin";
import Catalog from "./admin/pages/Catalog";
import Dashboard from "./admin/pages/Dashboard";
import Product from "./admin/pages/Product";
import ProductAdd from "./admin/pages/ProductAdd";
import ProductEdit from "./admin/pages/ProductEdit";
import CatalogAdd from "./admin/pages/CatalogAdd";
import CatalogEdit from "./admin/pages/CatalogEdit";
import Order from "./admin/pages/Order";

import UserInfo from "./components/UserInfo";
import ProtectedRoute from "./components/ProtectedRoute";

import { Bounce, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const root = ReactDOM.createRoot(document.getElementById("root"));

root.render(
  <Provider store={store}>
    <BrowserRouter>
      <Routes>
        {/* Routes cho phần người dùng */}
        <Route
          path="/"
          element={
            <>
              <UserInfo /> <App />
            </>
          }
        >
          <Route path="/" element={<Home />}></Route>
          <Route path="/shop" element={<Shop />}></Route>
          <Route path="/shop/:id" element={<Shop />}></Route>
          <Route path="/cart" element={<Cart />}></Route>
          <Route path="/login" element={<Login />}></Route>
          <Route path="/changePassword" element={<ChangePassword />}></Route>
          <Route path="/register" element={<Register />}></Route>
          <Route path="/product/:id" element={<Detail />}></Route>
          <Route path="/checkout" element={<Checkout />}></Route>
          <Route path="/orderUser" element={<OrderHistory />}></Route>
        </Route>

        {/* Routes cho phần admin */}
        <Route
          path="/admin"
          element={
            <>
              <UserInfo /> <ProtectedRoute /> <Admin />
            </>
          }
        >
          <Route path="/admin" element={<Dashboard />} />
          <Route path="/admin/product" element={<Product />}></Route>
          <Route path="/admin/productAdd" element={<ProductAdd />}></Route>
          <Route
            path="/admin/productEdit/:id"
            element={<ProductEdit />}
          ></Route>
          <Route path="/admin/catalog" element={<Catalog />}></Route>
          <Route path="/admin/catalogAdd" element={<CatalogAdd />}></Route>
          <Route
            path="/admin/catalogEdit/:id"
            element={<CatalogEdit />}
          ></Route>
          <Route path="/admin/order" element={<Order />}></Route>
          {/* Các route khác cho admin */}
        </Route>
      </Routes>
      <ToastContainer
        position="top-left"
        autoClose={3000}
        hideProgressBar={false}
        newestOnTop
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="light"
        transition={Bounce}
      />
    </BrowserRouter>
  </Provider>
);

reportWebVitals();
