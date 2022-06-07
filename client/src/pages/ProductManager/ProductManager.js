
import React, { Component,  useState, useEffect} from 'react';
import { Container, Card, Toast } from 'react-bootstrap';
import { Button } from '@material-ui/core';
import './ProductManager.css';
import TextField from "@material-ui/core/TextField";
import axios from "axios";
import { useSelector } from "react-redux";
import { toast } from "react-toastify";

const ProductManager = () => {


  const currUser = useSelector((state) => state.user.currentUser);

  const [cost, setCost] = useState(null);
  const [amount, setAmount] = useState(null);
  const [publisher, setPublisher] = useState(null);
  const [description, setDescription] = useState(null);
  const [author, setAuthor] = useState(null);
  const [category, setCategory] = useState(null);
  const [name, setName] = useState(null);
  const [warranty, setWarranty] = useState(null);
  const [subcategories, setSubCategories] = useState(null);
  const [img, setImg] = useState(null);
  const [sale, setSale] = useState(null);
  const [before_sale_price, setBSP] = useState(null);


  const clickSubmit = () => {



    if(name === null) {

      toast.error("Name is required, Please enter a value ", {position: toast.POSITION.TOP_CENTER});
      
    }

    if(author === null) {

      toast.error("Author is required, Please enter a value ", {position: toast.POSITION.TOP_CENTER});
      
    }


    if(cost === null) {

      toast.error("Cost is required, Please enter a value ", {position: toast.POSITION.TOP_CENTER});
      
    }


    if(amount === null) {

      toast.error("Amount is required, Please enter a value ", {position: toast.POSITION.TOP_CENTER});
      
    }


    if(description === null) {

      toast.error("Description is required, Please enter a value ", {position: toast.POSITION.TOP_CENTER});
      
    }


    if(category === null) {

      toast.error("Category is required, Please enter a value ", {position: toast.POSITION.TOP_CENTER});
      
    }


    if(publisher === null) {

      toast.error("Publisher is required, Please enter a value ", {position: toast.POSITION.TOP_CENTER});
      
    }

    if (author !== null && name !== null && cost !== null && amount !== null && publisher !== null && description !== null && category !== null) {

      const add = {
        publisher: publisher || undefined,
        cost: cost || undefined,
        amount: amount || undefined,
        img: img || undefined,
        description: description || undefined,
        warranty: warranty || undefined,
        author: author || undefined,
        category: category || undefined, 
        subcategories: subcategories || undefined,
        sale: sale || undefined,
        before_sale_price: before_sale_price || undefined,
        name: name || undefined,

      };

      try {
        axios.post("http://localhost:5001/api/products/", add, {
          headers: { token: "Bearer " + currUser.accessToken },
        });
        
      } catch (err) {
        alert(err);
      }
    }

  };

  function handleChange1(event) {
    setWarranty(event.target.value)
    console.log(warranty);
  }


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
    setImg(event.target.value)
    console.log(img);
  }



  function handleChange6(event) {
    setDescription(event.target.value)
    console.log(description);
  }


  function handleChange7(event) {
    setSubCategories(event.target.value)
    console.log(subcategories);
  }



  function handleChange8(event) {
    setAuthor(event.target.value)
    console.log(author);
  }


  function handleChange9(event) {
    setCategory(event.target.value)
    console.log(category);
  }


  function handleChange11(event) {
    setBSP(event.target.value)
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
            <legend className='pcontainer' style = {{color: 'black', fontSize: '30px'}}>ADD PRODUCTS</legend>


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
                  type="text"
                  onChange={handleChange13}
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
                PUBLISHER
              </label>
              <div className='col-md-4'>
                <TextField
                  id="publisher"
                  placeholder='PUBLISHER'
                  required
                  type='text'
                  onChange={handleChange4}
                />
              </div>
            </div>


            <div className='row form-group' style={{marginLeft: '50px'}}>
              <label
                className='col-md-4 control-label'
                htmlFor='product_categorie'   style = {{padding: '12px 20px', background: 'orange', border: 'none', borderRadius: '30px', fontWeight: 'bold', boxShadow: "0px 5px 10px lightblue"}}
              >
                IMAGE SOURCE
              </label>
              <div className='col-md-4'>
                <TextField
                  id="img"
                  placeholder='IMAGE'
                  required
                  type='text'
                  onChange={handleChange5}
                />
              </div>
            </div>


            <div className='row form-group' style={{marginLeft: '50px'}}>
              <label
                className='col-md-4 control-label'
                htmlFor='product_categorie'   style = {{padding: '12px 20px', background: 'orange', border: 'none', borderRadius: '30px', fontWeight: 'bold', boxShadow: "0px 5px 10px lightblue"}}
              >
                SUB-CATEGORIES
              </label>
              <div className='col-md-4'>
                <TextField
                  id="subcategories"
                  placeholder='SUB-CATEGORIES'
                  required
                  type='text'
                  onChange={handleChange7}
                />
              </div>
            </div>


            <div className='row form-group' style={{marginLeft: '50px'}}>
              <label
                className='col-md-4 control-label'
                htmlFor='product_categorie'   style = {{padding: '12px 20px', background: 'orange', border: 'none', borderRadius: '30px', fontWeight: 'bold', boxShadow: "0px 5px 10px lightblue"}}
              >
                WARRANTY
              </label>
              <div className='col-md-4'>
                <TextField
                  id="warranty"
                  placeholder='Warranty'
                  required
                  type='number'
                  onChange={handleChange1}
                />
              </div>
            </div>

            <div className='row form-group' style={{marginLeft: '50px'}}>
              <label
                className='col-md-4 control-label'
                htmlFor='product_categorie'   style = {{padding: '12px 20px', background: 'orange', border: 'none', borderRadius: '30px', fontWeight: 'bold', boxShadow: "0px 5px 10px lightblue"}}
              >
                SALE
              </label>
              <div className='col-md-4'>
              <select onClick={(e) => setSale(e.target.value)} style={{borderRadius:'5px',width:'315px', borderColor:'lightgray'}}>
            <option value="none" selected disabled hidden>Select an Option</option>
            <option value = {true}>True</option>
            <option value = {false}>False</option>
            </select>
              </div>
            </div>

            <div className='row form-group' style={{marginLeft: '50px'}}>
              <label
                className='col-md-4 control-label'
                htmlFor='product_categorie'   style = {{padding: '12px 20px', background: 'orange', border: 'none', borderRadius: '30px', fontWeight: 'bold', boxShadow: "0px 5px 10px lightblue"}}
              >
                BEFORE SALE PRICE
              </label>
              <div className='col-md-4'>
                <TextField
                  id="before_sale_price"
                  placeholder='BEFORE SALE PRICE'
                  required
                  type='number'
                  onChange={handleChange11}
                />
              </div>
            </div>

            
            <div className='row form-group' style={{marginLeft: '50px'}}>
              <label
                className='col-md-4 control-label'
                htmlFor='singlebutton'
              ></label>
              <div style={{display: 'flex', justifyContent: 'space-between'}}>
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




export default ProductManager;