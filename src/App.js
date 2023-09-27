import React, { useState } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import "./components/css/App.css";
import "bootstrap/dist/css/bootstrap.min.css";
import Navbar from "./components/Navbar";
import ProductList from "./components/ProductList";
import Cart from "./components/Cart";
import Footer from "./components/Footer";
import Login from "./components/Login";
import Signup from "./components/Signup";
import Alert from "./components/Alert";
import Category from "./Admincomponents/Category";
import Product from "./Admincomponents/Product";
import Plans from "./Admincomponents/Plans";
import Order from "./Admincomponents/Order";
import AddCategory from "./Admincomponents/AddCategory";
import AddProduct from "./Admincomponents/AddProduct";
import AddPlans from "./Admincomponents/AddPlans";
import OrderView from "./Admincomponents/OrderView";
import CategoryEdit from "./Admincomponents/CategoryEdit";
import ProductEdit from "./Admincomponents/ProductEdit";
import PlansEdit from "./Admincomponents/PlansEdit";
import ViewUser from "./Admincomponents/ViewUser";
import PrivateRoute from "./Admincomponents/PrivateRoute";
import ProductPage from "./components/ProductPage";
import About from "./components/About";
import Contact from "./components/Contact";
import ScrollButton from "./components/ScrollButton";
import Payment from "./components/Payment";
import Helps from "./components/Helps";
import Shop from "./components/Shop";
import OrderInvoice from "./components/OrderInvoice";
import OrderHistory from "./components/OrderHistory";
import HistoryView from "./components/HistoryView";

function App() {
  const [alert, setAlert] = useState(null);
  const showAlert = (message, type) => {
    setAlert({
      msg: message,
      type: type,
    });
    setTimeout(() => {
      setAlert(null);
    }, 1500);
  };

  return (
    <>
      <BrowserRouter>
        <Navbar />
        <ScrollButton />
        <Alert alert={alert} />
        <Routes>
          <Route path="/" element={<ProductList showAlert={showAlert} />} />
          <Route path="/shop" element={<Shop />} />
          <Route path="/cart" element={<Cart />} />
          <Route path="/login" element={<Login showAlert={showAlert} />} />
          <Route path="/signup" element={<Signup showAlert={showAlert} />} />
          <Route path="/:_id" element={<ProductPage />} />
          <Route path="/about" element={<About />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="/order" element={<Order />} />
          <Route path="/orderView/:orderId" element={<OrderView />} />
          <Route path="/payment" element={<Payment />} />
          <Route path="/orderinvoice/:id" element={<OrderInvoice />} />
          <Route path="/history/:userId" element={<OrderHistory />} />
          <Route path="/historyView/:orderId" element={<HistoryView />} />
          <Route path="/helps" element={<Helps />} />
          <Route element={<PrivateRoute />}>
            <Route path="/category" element={<Category />} />
            <Route path="/addcategories" element={<AddCategory />} />
            <Route path="/editcategory/:_id" element={<CategoryEdit />} />
            <Route path="/product" element={<Product />} />
            <Route path="/addproduct" element={<AddProduct />} />
            <Route path="/editproduct/:_id" element={<ProductEdit />} />
            <Route path="/plans" element={<Plans />} />
            <Route path="/addplans" element={<AddPlans />} />
            <Route path="/editplans/:_id" element={<PlansEdit />} />
            <Route path="/viewuser" element={<ViewUser />} />
          </Route>
        </Routes>
        <Footer />
      </BrowserRouter>
    </>
  );
}

export default App;
