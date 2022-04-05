import React from 'react';
import './App.css';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import NavigationBar from "./components/Navigation_Bar/NavigationBar"
import ProductPage from "./pages/product-view/ProductPage";
import Footer from './components/Footer/Footer';

function App() {
  return (


    <BrowserRouter> 
      <div>
        <NavigationBar/>
      </div>
      <Routes>
        <Route path = "/productpage" element = {<ProductPage/>} />

      </Routes>
      <div>
      <Footer/>
      </div>
    
    
    </BrowserRouter>
  )
};

export default App;
