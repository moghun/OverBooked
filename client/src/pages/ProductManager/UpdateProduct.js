import SideBar from './SideBar';
import React, { Component } from 'react';
import { Container, Card } from 'react-bootstrap';
import { Button } from '@material-ui/core';
import './ProductManager.css';

const TotalPage = () => {
    return (
        <Card style={{borderRadius: '30px', border: '2px solid #0400ff'}}>
        <br/>
            <form className='form-horizontal'>
            <fieldset>
                <legend className='pcontainer'>UPDATE STOCK</legend>

                <div className='row form-group'  style={{marginLeft: '50px'}}>
                <label className='col-md-4 control-label' htmlFor='product_id'   style = {{padding: '12px 20px', background: 'red', border: 'none', borderRadius: '30px', fontWeight: 'bold', boxShadow: "10px 20px 30px lightblue"}}>  
                    PRODUCT NAME
                </label>
                <div className='col-md-4'>
                    <input
                    id='name2'
                    name='NAME'
                    placeholder='NAME'
                    className='form-control input-md'
                    required
                    />
                </div>
                </div>

                <div className='row form-group' style={{marginLeft: '50px'}}>
                <label className='col-md-4 control-label' htmlFor='product_id' style = {{padding: '12px 20px', background: 'red', border: 'none', borderRadius: '30px', fontWeight: 'bold', boxShadow: "10px 20px 30px lightblue"}}>
                    STOCK
                </label>
                <div className='col-md-4'>
                    <input
                    id='stock1'
                    name='STOCK'
                    placeholder='STOCK'
                    className='form-control input-md'
                    type='number'
                    required
                    />
                </div>
                </div>

                <div className='row form-group' style={{marginLeft: '50px'}}>
                <label className='col-md-4 control-label' htmlFor='product_id' style = {{padding: '12px 20px', background: 'red', border: 'none', borderRadius: '30px', fontWeight: 'bold', boxShadow: "10px 20px 30px lightblue"}}>
                    COST
                </label>
                <div className='col-md-4'>
                    <input
                    id='stock1'
                    name='COST'
                    placeholder='COST'
                    className='form-control input-md'
                    type='number'
                    required
                    />
                </div>
                </div>

                <div className='row form-group' style={{marginLeft: '50px'}}>
                <label
                    className='col-md-4 control-label'   
                    htmlFor='singlebutton'
                ></label>
                <div className='col-md-4'>
                <Button variant="contained" style={{backgroundColor: 'green'}}> Update </Button>
                </div>
                </div>
            </fieldset>
            </form>
        </Card>
      
    );
}



const UpdateStock = () => {
    return (

        <div className="container">
        <div className="row">
        <div className="col-sm-3">
          <SideBar />
        </div>
        <div className="col-sm-9">
          <TotalPage />
          <br />
        </div>
        </div>
      </div>





    );



}


export default UpdateStock;