import React from 'react';
import './App.css';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
<<<<<<< HEAD
import HomePage from "./pages/homepage/Home";
=======
>>>>>>> 10bf394 (changes to add homepage branch)
import NavigationBar from "./components/Navigation_Bar/NavigationBar"
import ProductPage from "./pages/product-view/ProductPage";
import SearchPage from "./pages/search-page/SearchPage"
import Footer from './components/Footer/Footer';
import NavigationBar2 from './components/Navigation_Bar/NavigationBar2';
import Profile from './pages/product-view/Profile';
import CreateStore from './pages/product-view/CreateStore';
import EditProfile from './pages/product-view/EditProfile';
import HomePage from './pages/product-view/Home';


function App() {
    return (
  
  
      <BrowserRouter> 
        <div>
          <NavigationBar/>
        </div>

        <div>

<<<<<<< HEAD
    <BrowserRouter> 
      <div>
        <NavigationBar/>
      </div>
      <Routes>
        <Route path = "/" element = {<HomePage/>} />
        <Route path = "/searchpage" element = {<SearchPage/>} />
        <Route path = "/productpage" element = {<ProductPage/>} />
        
      </Routes>
      <div>
      <Footer/>
      </div>
    
    
    </BrowserRouter>
  )
};
=======
        <NavigationBar2/>
>>>>>>> 10bf394 (changes to add homepage branch)

        </div>
        <Routes>
          <Route path = "/" element = {<HomePage/>} />
          <Route path = "/profile" element = {<Profile/>} />
          <Route path = "/productpage" element = {<ProductPage/>} />
          <Route path = "/editprofile" element = {<EditProfile/>} />
          <Route path = "/createstore" element = {<CreateStore/>} />
          
        </Routes>
        <div>
        <Footer/>
        </div>
      
      
      </BrowserRouter>
    )
  };
export default App;