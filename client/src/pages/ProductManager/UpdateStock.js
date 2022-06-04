
import React, { Component, useState, useEffect } from 'react';
import { Container, Card } from 'react-bootstrap';
import { Button } from '@material-ui/core';
import './ProductManager.css';
import TextField from "@material-ui/core/TextField";
import axios from "axios";
import { useSelector } from "react-redux";
import { toast } from "react-toastify";

const UpdateStock = () => {

    const currUser = useSelector((state) => state.user.currentUser);


    const [id, setID] = useState(null);
    const [stock1, setstock1] = useState(null);


    function handleChange1(event) {
      setID(event.target.value)
      console.log(id);
    }


    function handleChange2(event) {
      setstock1(event.target.value)
      console.log(stock1);
    }


    const clickSubmit = async () => {

        const update = {
          stock:  stock1,
          _id: id,
        };
    
        try {
            axios.post("http://localhost:5001/api/productmanager/changestock", update,{
            headers: { token: "Bearer " + currUser.accessToken },
          });
          toast.success("Your information has been updated successfully", {position: toast.POSITION.TOP_CENTER});
        } catch (err) {
          alert(err);
        }

      };


    return (


      <div>
      <br/>
        <Card style={{borderRadius: '30px', boxShadow: '0 0 5px #ccc', padding: '0 15px', width: '70%', marginLeft: '14%'}}>
        <br/>
            <form className='form-horizontal'>
            <fieldset>
                <legend className='pcontainer' style = {{color: 'black', fontSize: '30px'}}>UPDATE STOCK</legend>

                <div className='row form-group'  style={{marginLeft: '50px'}}>
                <label className='col-md-4 control-label' htmlFor='product_id'   style = {{padding: '12px 20px', background: 'orange', border: 'none', borderRadius: '30px', fontWeight: 'bold', boxShadow: "0px 5px 10px lightblue"}}>  
                    PRODUCT ID
                </label>
                <div className='col-md-4'>
                    <TextField
                    id="product_id"
                    placeholder='ID'
                    type="string"
                    required
                    onChange={handleChange1}

                    />
                </div>
                </div>

                <div className='row form-group' style={{marginLeft: '50px'}}>
                <label className='col-md-4 control-label' htmlFor='product_id' style = {{padding: '12px 20px', background: 'orange', border: 'none', borderRadius: '30px', fontWeight: 'bold', boxShadow: "0px 5px 10px lightblue"}}>
                    STOCK
                </label>
                <div className='col-md-4'>
                    <TextField
                    id="stock"
                    placeholder='STOCK'
                    type="number"
                    required
                    onChange={handleChange2}
                    />
                </div>
                </div>

                <div className='row form-group' style={{marginLeft: '50px'}}>
                <label
                    className='col-md-4 control-label'   
                    htmlFor='singlebutton'
                ></label>
                <div className='col-md-4'>
                <Button variant="contained" color = 'grey' onClick={()=>{clickSubmit()}}> Update </Button>
                <Button variant="contained" color = 'grey' href= "/profile"> Cancel </Button>
                </div>
                </div>
            </fieldset>
            </form>
        </Card>
        </div>
      
    );
}


export default UpdateStock;