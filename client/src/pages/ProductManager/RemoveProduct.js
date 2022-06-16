
import React, { Component , useState, useEffect} from 'react';
import { Container, Card } from 'react-bootstrap';
import { Button } from '@material-ui/core';
import './ProductManager.css';
import TextField from "@material-ui/core/TextField";
import axios from "axios";
import { useSelector } from "react-redux";

const RemoveProduct = () => {


  const currUser = useSelector((state) => state.user.currentUser);

  const [allproducts, setAll] = useState([]);

  const [index, setIndex] = useState(null);

  const clickSubmit = () => {

    try {
      axios.delete("http://localhost:5001/api/products/" + allproducts[index]._id, {
        headers: { token: "Bearer " + currUser.accessToken },
        
      });

      toast.success("Your have removed a product", {
        position: toast.POSITION.TOP_CENTER,
      });
      
    } catch (err) {
      alert(err);
    }
  };


  useEffect(() => {
    const getAllProducts = async () => {
      try {
        const res = await axios.get("http://localhost:5001/api/products");
        setAll(res.data);
      } catch (err) {}
    }; 
    getAllProducts();
  }, []);


    return (



        <div>
        <br/>
        <Card style= {{borderRadius: '30px', boxShadow: '0 0 5px #ccc', padding: '0 15px', width: '70%', marginLeft: '14%'}}>
        <br/>
        <form className='form-horizontal'>
          <fieldset>
            <legend className='pcontainer' style = {{color: 'black', fontSize: '30px'}}>REMOVE PRODUCTS</legend>
            <div className='row form-group'  style={{marginLeft: '50px'}}>
              <label className='col-md-4 control-label'      style = {{padding: '12px 20px', background: 'orange', border: 'none', borderRadius: '30px', fontWeight: 'bold', boxShadow: "0px 5px 10px lightblue"}}>
                PRODUCTS
            </label>
            <select onClick={(e) => {setIndex(e.target.value);}} style={{borderRadius:'5px',width:'315px', borderColor:'lightgray', fontFamily:'OpenSans'}}>
            <option style={{fontFamily:'OpenSans'}} value="none" selected disabled hidden>Select an Option</option>
              {allproducts.map((item, i) => {return(<option style={{fontFamily:'OpenSans'}} value = {i}>{item.name + "-" + item.author + "-" + item._id}</option>);})}
            </select>
            </div>


            <div className='row form-group'  style={{marginLeft: '50px'}}>
              <label
                className='col-md-4 control-label'

              ></label>
              <div className='col-md-4'>
              <Button variant="contained" color = 'grey' onClick= {clickSubmit}> Remove </Button>
              <Button variant="contained" color = 'grey' href= "/profile"> Cancel </Button>
              </div>
            </div>
          </fieldset>
        </form>
      </Card>
      </div>


    )


};

export default RemoveProduct;