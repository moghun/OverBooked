import React from 'react';
import { useState } from "react"
import './App.css';
import ProductPage from './pages/product-view/ProductPage';
import NavigationBar from './components/Navigation_Bar/NavigationBar';
import Footer from './components/Footer/Footer';
const App = () => {


  const [products, setProduct] = useState(
    [{
    "_id": "1",
    "title": "Ay Zalim Bir Sevgilidir",
    "src": "http://www.ithaki.com.tr/wp-content/uploads/2017/06/Ay-Zalim-Bir-Sevgilidir.jpg",
    "price": "23.99 TL",
    "content": "Ay’ı Dünya’dan kontrol eden Otorite’ye karşı, yalnızca mahkûm ve sürgünlerin gönderildiği ceza kolonisine dönüşmüş Ay’daki isyanın ve devrimin öyküsü bu.",
    "count": 1,
    "author": "Robert A. Heinlein",
    "publisher": "İthaki Yayınları",
    "amount": 10
  }]);


  return (
    <div>
      <NavigationBar/>
      <ProductPage products = {products[0]}/>
      <Footer/>
    </div>
  )
}

export default App
