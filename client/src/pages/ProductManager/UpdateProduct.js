
import React, { Component,  useState, useEffect} from 'react';
import { Container, Card } from 'react-bootstrap';
import { Button } from '@material-ui/core';
import './ProductManager.css';
import TextField from "@material-ui/core/TextField";
import axios from "axios";
import { useSelector } from "react-redux";

const UpdateProduct = () => {


  const currUser = useSelector((state) => state.user.currentUser);

  const [id, setID] = useState(null);
  const [cost, setCost] = useState(null);
  const [amount, setAmount] = useState(null);
  const [publisher, setPublisher] = useState(null);
  const [img, setimg] = useState(null);
  const [description, setDescription] = useState(null);
  const [warranty, setWarranty] = useState(null);
  const [author, setAuthor] = useState(null);
  const [category, setCategory] = useState(null);
  const [subcategories, setSubCategories] = useState(null);
  const [sale, setSale] = useState(null);
  const [before_sale_price, setBSaleP] = useState(null);
  const [name, setName] = useState(null);


  const clickSubmit = () => {

    const add = {
        _id: id,
        cost: cost,
        amount: amount,
        publisher: publisher,
        img: img,
        description: description,
        warranty: warranty,
        author: author,
        category: category, 
        subcategories: subcategories,
        sale: sale,
        before_sale_price: before_sale_price,
        name: name,
    };

    try {
      axios.post("http://localhost:5001/api/products/", add, {
        headers: { token: "Bearer " + currUser.accessToken },
      });
      
    } catch (err) {
      alert(err);
    }

  };


  function handleChange1(event) {
      setID(event.target.value)
    console.log(id);}

    function handleChange2(event) {
    setCost(event.target.value)
    console.log(cost);
    }

    function handleChange3(event) {
        setAmount(event.target.value)
        console.log(amount);
      }

    function handleChange4(event) {
       setPublisher(event.target.value)
        console.log(publisher);
      }
    
    
      function handleChange5(event) {
        setimg(event.target.value)
        console.log(img);
      }
    
    
      function handleChange6(event) {
        setDescription(event.target.value)
        console.log(description);
      }
    
    
      function handleChange7(event) {
        setWarranty(event.target.value)
        console.log(warranty);
      }
    
    
      function handleChange8(event) {
        setAuthor(event.target.value)
        console.log(author);
      }
    
    
      function handleChange9(event) {
        setCategory(event.target.value)
        console.log(category);
      }
    
      function handleChange10(event) {
        setSubCategories(event.target.value)
        console.log(subcategories);
      }
      function handleChange11(event) {
       setSale(event.target.value)
       console.log(sale);
     }
    
     function handleChange12(event) {
       setBSaleP(event.target.value)
        console.log(before_sale_price);
      }
    
      function handleChange13(event) {
        setName(event.target.value)
        console.log(name);
      }

    return (

      <div>
        <br/>
        <Card style= {{borderRadius: '30px', boxShadow: '0 0 5px #ccc', padding: '0 15px', width: '70%', marginLeft: '14%'}}>
          <br/>
        <form className='form-horizontal'>
          <fieldset>
            <br/>
            <legend className='pcontainer' style = {{color: 'black', fontSize: '30px'}}>UPDATE PRODUCTS</legend>


            <div className='row form-group' style={{marginLeft: '50px'}}>
              <label className='col-md-4 control-label' htmlFor='product_id' style = {{padding: '12px 20px', background: 'orange', border: 'none', borderRadius: '30px', fontWeight: 'bold', boxShadow: "0px 5px 10px lightblue"}}>
                PRODUCT ID
              </label>
              <div className='col-md-4'>
                <TextField
                  id="_id"
                  placeholder='PRODUCT ID'
                  required
                  type="string"
                  onChange={handleChange1}
                />
              </div>
            </div>


            <div className='row form-group' style={{marginLeft: '50px'}}>
              <label className='col-md-4 control-label' htmlFor='product_id' style = {{padding: '12px 20px', background: 'orange', border: 'none', borderRadius: '30px', fontWeight: 'bold', boxShadow: "0px 5px 10px lightblue"}}>
                IMAGE SOURCE
              </label>
              <div className='col-md-4'>
                <TextField
                  id="IMAGE"
                  placeholder='IMAGE'
                  required
                  type="string"
                  onChange={handleChange5}
                />
              </div>
            </div>


            
            <div className='row form-group' style={{marginLeft: '50px'}}>
              <label className='col-md-4 control-label' htmlFor='product_id' style = {{padding: '12px 20px', background: 'orange', border: 'none', borderRadius: '30px', fontWeight: 'bold', boxShadow: "0px 5px 10px lightblue"}}>
                SALE
              </label>
              <div className='col-md-4'>
                <TextField
                  id="sale"
                  placeholder='SALE'
                  required
                  type="bool"
                  onChange={handleChange11}
                />
              </div>
            </div>


            
            <div className='row form-group' style={{marginLeft: '50px'}}>
              <label className='col-md-4 control-label' htmlFor='product_id' style = {{padding: '12px 20px', background: 'orange', border: 'none', borderRadius: '30px', fontWeight: 'bold', boxShadow: "0px 5px 10px lightblue"}}>
                BEFORE SALE PRICE
              </label>
              <div className='col-md-4'>
                <TextField
                  id="before_sale_price"
                  placeholder='BEFORE SALE PRICE'
                  required
                  type="number"
                  onChange={handleChange12}
                />
              </div>
            </div>


            <div className='row form-group' style={{marginLeft: '50px'}}>
              <label className='col-md-4 control-label' htmlFor='product_id' style = {{padding: '12px 20px', background: 'orange', border: 'none', borderRadius: '30px', fontWeight: 'bold', boxShadow: "0px 5px 10px lightblue"}}>
                WARRANTY
              </label>
              <div className='col-md-4'>
                <TextField
                  id="warranty"
                  placeholder='WARRANTY'
                  required
                  type="number"
                  onChange={handleChange7}
                />
              </div>
            </div>

            <div className='row form-group' style={{marginLeft: '50px'}}>
              <label className='col-md-4 control-label' htmlFor='product_id' style = {{padding: '12px 20px', background: 'orange', border: 'none', borderRadius: '30px', fontWeight: 'bold', boxShadow: "0px 5px 10px lightblue"}}>
                AUTHOR
              </label>
              <div className='col-md-4'>
                <TextField
                  id="author"
                  placeholder='AUTHOR'
                  required
                  type="string"
                  onChange={handleChange8}
                />
              </div>
            </div>

            <div className='row form-group' style={{marginLeft: '50px'}}>
              <label className='col-md-4 control-label' htmlFor='product_id' style = {{padding: '12px 20px', background: 'orange', border: 'none', borderRadius: '30px', fontWeight: 'bold', boxShadow: "0px 5px 10px lightblue"}}>
                COST
              </label>
              <div className='col-md-4'>
                <TextField
                  id="cost"
                  placeholder='COST'
                  required
                  type="number"
                  onChange={handleChange2}
                />
              </div>
            </div>
            <div className=' row form-group' style={{marginLeft: '50px'}}>
              <label
                className='col-md-4 control-label'
                htmlFor='product_name_fr' style = {{padding: '12px 20px', background: 'orange', border: 'none', borderRadius: '30px', fontWeight: 'bold', boxShadow: "0px 5px 10px lightblue"}}
              >
                STOCK
              </label>
              <div className='col-md-4'>
                <TextField
                  id="AMOUNT"
                  placeholder='STOCK'
                  required
                  type='number'
                  onChange={handleChange3}
                />
              </div>
            </div>

            <div className='row form-group' style={{marginLeft: '50px'}}>
              <label
                className='col-md-4 control-label'
                htmlFor='available_quantity' style = {{padding: '12px 20px', background: 'orange', border: 'none', borderRadius: '30px', fontWeight: 'bold', boxShadow: "0px 5px 10px lightblue"}}
              >
                NAME
              </label>
              <div className='col-md-4'>
                <TextField
                  id="NAME"
                  placeholder='NAME'
                  required
                  type="string"
                  onChange={handleChange13}
                />
              </div>
            </div>

            <div className='row form-group' style={{marginLeft: '50px'}}>
              <label
                className='col-md-4 control-label'
                htmlFor='percentage_discount'  style = {{padding: '12px 20px', background: 'orange', border: 'none', borderRadius: '30px', fontWeight: 'bold', boxShadow: "0px 5px 10px lightblue"}}
              >
                DESCRIPTION
              </label>
              <div className='col-md-4'>
                <TextField
                  id="DESCRIPTION"
                  placeholder='DESCRIPTION'
                  required
                  type='string'
                  onChange={handleChange6}
                />
              </div>
            </div>
            <div className='row form-group' style={{marginLeft: '50px'}}>
              <label
                className='col-md-4 control-label'
                htmlFor='product_categorie'   style = {{padding: '12px 20px', background: 'orange', border: 'none', borderRadius: '30px', fontWeight: 'bold', boxShadow: "0px 5px 10px lightblue"}}
              >
                PRODUCT CATEGORY
              </label>
              <div className='col-md-4'>
                <TextField
                  id="CATEGORY"
                  placeholder='Category Name'
                  required
                  type='text'
                  onChange={handleChange9}
                />
              </div>
            </div>


            <div className='row form-group' style={{marginLeft: '50px'}}>
              <label
                className='col-md-4 control-label'
                htmlFor='product_categorie'   style = {{padding: '12px 20px', background: 'orange', border: 'none', borderRadius: '30px', fontWeight: 'bold', boxShadow: "0px 5px 10px lightblue"}}
              >
                PRODUCT SUB-CATEGORY
              </label>
              <div className='col-md-4'>
                <TextField
                  id="CATEGORY"
                  placeholder='Sub Category Name'
                  required
                  type="string"
                  onChange={handleChange10}
                />
              </div>
            </div>


            <div className='row form-group' style={{marginLeft: '50px'}}>
              <label
                className='col-md-4 control-label'
                htmlFor='product_categorie'   style = {{padding: '12px 20px', background: 'orange', border: 'none', borderRadius: '30px', fontWeight: 'bold', boxShadow: "0px 5px 10px lightblue"}}
              >
                PUBLISHER
              </label>
              <div className='col-md-4'>
                <TextField
                  id="publisher"
                  placeholder='PUBLISHER'
                  required
                  type="string"
                  onChange={handleChange4}
                />
              </div>
            </div>

            
            <div className='row form-group' style={{marginLeft: '50px'}}>
              <label
                className='col-md-4 control-label'
                htmlFor='singlebutton'
              ></label>
              <div className='col-md-4'>
                <Button variant="contained" color = 'grey' onClick= {clickSubmit}> Add </Button>
                <Button variant="contained" color = 'grey' href= "/profile"> Cancel </Button>
              </div>
            </div>
          </fieldset>
        </form>
      </Card>
      </div>


    );


}

export default UpdateProduct;