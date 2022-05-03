import React from 'react';
import './App.css';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import HomePage from "./pages/homepage/Home";
import NavigationBar from "./components/Navigation_Bar/NavigationBar"
import ProductPage from "./pages/product-view/ProductPage";
import SearchPage from "./pages/search-page/SearchPage"
import Footer from './components/Footer/Footer';
import NavigationBar2 from './components/Navigation_Bar/NavigationBar2';
import Profile from './pages/product-view/Profile';
import CreateStore from './pages/product-view/CreateStore';
import EditProfile from './pages/product-view/EditProfile';


function App() {
    return (
  
  
      <BrowserRouter> 
        <div>
          <NavigationBar/>
        </div>

        <div>

        <NavigationBar2/>

        </div>
        <Routes>
          <Route path = "/" element = {<HomePage/>} />
          <Route path = "/profile" element = {<Profile/>} />
          <Route path = "/productpage" element = {<ProductPage/>} />
          <Route path = "/editprofile" element = {<EditProfile/>} />
          <Route path = "/createstore" element = {<CreateStore/>} />
          <Route path = "/searchpage" element = {<SearchPage/>} />
          
        </Routes>
        <div>
        <Footer/>
        </div>
      
      
      </BrowserRouter>
    )
  };
export default App;