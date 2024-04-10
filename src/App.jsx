import { BrowserRouter, Route, Routes } from "react-router-dom";
import "./App.css";
import { AdminOnlyRoute, Footer, Header } from "./components";


import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import OrderDetails from "./components/admin/orderDetails/OrderDetails";
import { ProductDetail } from "./components/product";
import { Checkout, CheckoutDetails, CheckoutSuccess } from "./pages/checkout";
import { AddProduct } from "./components/admin";
import { Admin, Cart, Contact, Home, Login, NotFound, Product, Register, Reset } from "./pages";
import OrderHistory from "./pages/orderHistory/orderHistory";

function App() {
  return (
    <>
      <BrowserRouter>
        <ToastContainer />
        <Header />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/reset" element={<Reset />} />

          <Route
            path="/admin/*"
            element={
              <AdminOnlyRoute>
                <Admin />
              </AdminOnlyRoute>
            }
          />
          <Route path="/product" element={<Product />} />

          <Route path="/product-details/:id" element={<ProductDetail />} />
          <Route path="/cart" element={<Cart />} />
          <Route path="/product-details/:id" element={<ProductDetail />} />
          <Route path="/checkout" element={<Checkout />} />
          <Route path="/checkout-details" element={<CheckoutDetails />} />
          <Route path="/checkout-success" element={<CheckoutSuccess />} />
          <Route path="/order-history" element={<OrderHistory />} />
          <Route path="order-details/:id" element={<OrderDetails />} />
          <Route path="*" element={<NotFound />} />
          <Route path="/addProduct" element={<AddProduct />} />
        </Routes>
        <Footer />
      </BrowserRouter>
    </>
  );
}

export default App;
