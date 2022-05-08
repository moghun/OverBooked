import React from "react";
import "./App.css";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import HomePage from "./pages/homepage/Home";
import NavigationBar from "./components/Navigation_Bar/NavigationBar";
import ProductPage from "./pages/product-view/ProductPage";
import SearchPage from "./pages/search-page/SearchPage";
import Footer from "./components/Footer/Footer";
import NavigationBar2 from "./components/Navigation_Bar/NavigationBar2";
import Profile from "./pages/product-view/Profile";
import CreateStore from "./pages/product-view/CreateStore";
import EditProfile from "./pages/product-view/EditProfile";
import Checkout from "./pages/Checkout";
import ShoppingCart from "./pages/ShoppingCart";
import Success from "./pages/success";

import SignUp from "./pages/signup/Signup";
import Signin from "./pages/signin/Signin";
import { useSelector } from "react-redux";
import MyOrders from "./pages/MyOrders/MyOrders";
import ProductManagerAPI from "./pages/profilePage/product-managerPage/product-managerProfile";

function App() {
  const user = useSelector((state) => state.user.currentUser);
  return (
    <BrowserRouter>
      <div>
        <NavigationBar />
      </div>

      <div>
        <NavigationBar2 />
      </div>
      <Routes>
        <Route exact path="/" element={<HomePage />} />
        <Route path="/profile" element={<Profile />} />
        <Route path="/productpage/:id" element={<ProductPage />} />
        <Route path="/editprofile" element={<EditProfile />} />
        <Route path="/createstore" element={<CreateStore />} />
        <Route path="/searchpage/:q" element={<SearchPage />} />
        <Route path="/signup" element={<SignUp />} />
        <Route path="/signin" element={<Signin />} />
        <Route path="/checkout" element={<Checkout />} />
        <Route path="/shoppingcart" element={<ShoppingCart />} />
        <Route path="/myorders" element={<MyOrders />} />
        <Route path="/success" element={<Success />} />
        <Route path="/approvaldisapproval" element={<ProductManagerAPI />} />
      </Routes>
      <div>
        <Footer />
      </div>
    </BrowserRouter>
  );
}
export default App;
