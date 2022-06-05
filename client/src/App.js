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
import EditProfile from "./pages/product-view/EditProfile";
import Checkout from "./pages/Checkout";
import ShoppingCart from "./pages/ShoppingCart";
import Success from "./pages/success";
import 'react-toastify/dist/ReactToastify.css';
import { ToastContainer,} from 'react-toastify'; 
import ScrollToTop from "./components/Scroll/ScrollToTop";

import SignUp from "./pages/signup/Signup";
import Signin from "./pages/signin/Signin";
import Synch from "./pages/signin/synch";
import { useSelector } from "react-redux";
import MyOrders from "./pages/MyOrders/MyOrders";
import ProductManagerAPI from "./pages/profilePage/product-managerPage/product-managerProfile";
import EditSales from "./pages/profilePage/sales-manager/EditSales";
import InvoicesPage from "./pages/profilePage/sales-manager/InvoicesPage";
import Wishlist from "./pages/wishlist/Wishlist";
import ProductManager from "./pages/ProductManager/ProductManager";
import Invoices from "./pages/ProductManager/Invoices";
import RemoveProduct from "./pages/ProductManager/RemoveProduct";
import UpdateOrder from "./pages/ProductManager/UpdateOrder";
import UpdateProduct from "./pages/ProductManager/UpdateProduct";
import UpdateStock from "./pages/ProductManager/UpdateStock";
import Revenues from "./pages/profilePage/sales-manager/Revenues";
import RemoveSale from "./pages/profilePage/sales-manager/RemoveSale";
import SetPrice from "./pages/profilePage/sales-manager/SetPrice";
import CancellationRequest from "./pages/profilePage/sales-manager/CancellationRequest";

function App() {
  const user = useSelector((state) => state.user.currentUser);
  return (
    <BrowserRouter>
    <ScrollToTop/>
    <ToastContainer style={{display: "flex", justifyContent: "center"}}/>


      <div style = {{position: 'fixed', zIndex: 1000, width: '100%'}}>
        <NavigationBar />
      </div>

      <br/>
      <br/>
      <br/>

      <div>
        <NavigationBar2 />
      </div>

      <Routes>
        {user ? (
          <>
            <Route exact path="/" element={<HomePage />} />
            <Route path="/profile" element={<Profile />} />
            <Route path="/productpage/:id" element={<ProductPage />} />
            <Route path="/editprofile" element={<EditProfile />} />
            <Route path="/searchpage/:q" element={<SearchPage />} />
            <Route path="/checkout" element={<Checkout />} />
            <Route path="/shoppingcart" element={<ShoppingCart />} />
            <Route path="/myorders" element={<MyOrders />} />
            <Route path="/success" element={<Success />} />
            <Route path="/synch" element={<Synch />} />
            <Route path="/wishlist" element={<Wishlist />} />
            <Route path="/productmanager" element={<ProductManager />} />
            <Route path='/Invoices' element={<Invoices/>} />
            <Route path="/removeproduct" element={<RemoveProduct />} />
            <Route path="/updatestock" element={<UpdateStock />} />
            <Route path="/updateorder" element={<UpdateOrder />} />
            <Route path="/updateproduct" element={<UpdateProduct />} />
            <Route path="/setprice" element={<SetPrice />} />

            <Route
              path="/approvaldisapproval"
              element={<ProductManagerAPI />}
            />
            <Route path="*" element={<HomePage />} />
            <Route path="/editsales" element={<EditSales />} />
            <Route path="/removesales" element={<RemoveSale />} />
            <Route path="/invoicessalesmanager" element={<InvoicesPage />} />
            <Route path="/revenues" element={<Revenues />} />
            <Route path="/refundrequests" element={<CancellationRequest />} />
          </>
        ) : (
          <>
            <Route exact path="/" element={<HomePage />} />
            <Route path="/shoppingcart" element={<ShoppingCart />} />
            <Route path="/productpage/:id" element={<ProductPage />} />
            <Route path="/searchpage/:q" element={<SearchPage />} />
            <Route path="/signup" element={<SignUp />} />
            <Route path="/signin" element={<Signin />} />
            <Route path="*" element={<HomePage />} />
          </>
        )}
      </Routes>
      <div>
        <Footer />
      </div>
    </BrowserRouter>
  );
}
export default App;
