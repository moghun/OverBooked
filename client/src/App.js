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

import SignUp from "./pages/signup/Signup";
import Signin from "./pages/signin/Signin";
import Synch from "./pages/signin/synch";
import { useSelector } from "react-redux";
import MyOrders from "./pages/MyOrders/MyOrders";
import ProductManagerAPI from "./pages/profilePage/product-managerPage/product-managerProfile";
import Wishlist from "./pages/wishlist/Wishlist";
import ProductManager from "./pages/ProductManager/ProductManager";
import Invoices from "./pages/ProductManager/Invoices";
import RemoveProduct from "./pages/ProductManager/RemoveProduct";
import UpdateStock from "./pages/ProductManager/UpdateProduct";

function App() {
  const user = useSelector((state) => state.user.currentUser);
  return (
    <BrowserRouter>
    <ToastContainer style={{display: "flex", justifyContent: "center"}}/>
      <div>
        <NavigationBar />
      </div>

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
            <Route path="/createstore" element={<CreateStore />} />
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
            <Route path="/updateproduct" element={<UpdateStock />} />

            <Route
              path="/approvaldisapproval"
              element={<ProductManagerAPI />}
            />
            <Route path="*" element={<HomePage />} />
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
