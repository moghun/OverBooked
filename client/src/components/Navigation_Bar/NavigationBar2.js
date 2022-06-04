import "./NavigationBar.css"
import "./NavigationBar2.css"
import {react, useEffect, useState} from "react"
import { useSelector } from "react-redux";
import axios from "axios";
import { Button } from "@material-ui/core";

const NavigationBar2= () =>{




  const currUser = useSelector((state) => state.user.currentUser);

  function userstatus(userrole) {
    if (userrole === "customer") {
      return <a href = "/myOrders"> My-Orders </a>;
    } else if (userrole === "product-manager") {
      return <a href = "/productmanager"> Product Manager Panel </a>;
    } else if (userrole === "sales-manager") {
      return <a href = "/salesmanager"> Sales Manager Panel </a>;
    }
  }

  const [allprod, settallprod] = useState([]);

  const getAllProducts = async () => {
    try {
      const res = await axios.get("http://localhost:5001/api/products");
      settallprod(res.data);
      return res.data;
    } catch (err) {}
  };


  useEffect(() => {
    getAllProducts();
  }, []);


  console.log(allprod);
    return (

      <div className="navbar1">
          <a href="/">Home</a>
          {userstatus(currUser.user_role)}

          <div class="dropdown1">
          <button class="dropbtn">LIST1 
            <i class="fa fa-caret-down"></i>
          </button>

          <li class="dropdown1-content">

          {allprod.slice(0,3).map((AllSales) => (

            <Button>{AllSales.name}</Button>

          ))}
          </li>
          </div>

          <div class="dropdown1">
          <button class="dropbtn">LIST2 
            <i class="fa fa-caret-down"></i>
          </button>

          <li class="dropdown1-content">

          {allprod.slice(5,8).map((AllSales) => (

            <Button>{AllSales.name}</Button>

          ))}
          </li>
          </div>

          <div class="dropdown1">
          <button class="dropbtn">LIST3 
            <i class="fa fa-caret-down"></i>
          </button>

          <li class="dropdown1-content">

          {allprod.slice(9,12).map((AllSales) => (

            <Button href = {"/productpage/" + AllSales._id}>{AllSales.name}</Button>

          ))}
          </li>
          </div>
          </div>







    );
}
export default NavigationBar2;