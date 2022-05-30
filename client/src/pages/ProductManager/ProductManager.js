import SideBar from './SideBar';
import React, { Component } from 'react';
import { Container, Card } from 'react-bootstrap';
import { Button } from '@material-ui/core';
import './ProductManager.css';

const AddProduct = () => {
    return (


        <Card style={{borderRadius: '30px', border: '2px solid #0400ff'}}>
          <br/>
        <form className='form-horizontal'>
          <fieldset>
            <br/>
            <legend className='pcontainer'>ADD PRODUCTS</legend>
            <div className='row form-group' style={{marginLeft: '50px'}}>
              <label className='col-md-4 control-label' htmlFor='product_id' style = {{padding: '12px 20px', background: 'red', border: 'none', borderRadius: '30px', fontWeight: 'bold', boxShadow: "10px 20px 30px lightblue"}}>
                PRICE
              </label>
              <div className='col-md-4'>
                <input
                  id='price'
                  name='price'
                  placeholder='PRICE'
                  className='form-control input-md'
                  required
                  type='number'
                />
              </div>
            </div>
            <div className='row form-group' style={{marginLeft: '50px'}}>
              <label className='col-md-4 control-label' htmlFor='product_name' style = {{padding: '12px 20px', background: 'red', border: 'none', borderRadius: '30px', fontWeight: 'bold', boxShadow: "10px 20px 30px lightblue"}}>
                OLD PRICE
              </label>
              <div className='col-md-4'>
                <input
                  id='oldPrice'
                  name='oldPrice'
                  placeholder='OLD PRICE'
                  className='form-control input-md'
                  required
                  type='number'
                />
              </div>
            </div>
            <div className=' row form-group' style={{marginLeft: '50px'}}>
              <label
                className='col-md-4 control-label'
                htmlFor='product_name_fr' style = {{padding: '12px 20px', background: 'red', border: 'none', borderRadius: '30px', fontWeight: 'bold', boxShadow: "10px 20px 30px lightblue"}}
              >
                STOCK
              </label>
              <div className='col-md-4'>
                <input
                  id='stock'
                  name='stock'
                  placeholder='STOCK'
                  className='form-control input-md'
                  required
                  type='number'
                />
              </div>
            </div>

            <div className='row form-group' style={{marginLeft: '50px'}}>
              <label
                className='col-md-4 control-label'
                htmlFor='available_quantity' style = {{padding: '12px 20px', background: 'red', border: 'none', borderRadius: '30px', fontWeight: 'bold', boxShadow: "10px 20px 30px lightblue"}}
              >
                IMAGE SOURCE
              </label>
              <div className='col-md-4'>
                <input
                  id='imgSrc'
                  name='imgSrc'
                  placeholder='IMAGE SOURCE'
                  className='form-control input-md'
                  required
                  type='text'
                />
              </div>
            </div>

            <div className='row form-group' style={{marginLeft: '50px'}}>
              <label
                className='col-md-4 control-label'
                htmlFor='available_quantity' style = {{padding: '12px 20px', background: 'red', border: 'none', borderRadius: '30px', fontWeight: 'bold', boxShadow: "10px 20px 30px lightblue"}}
              >
                NAME
              </label>
              <div className='col-md-4'>
                <input
                  id='name'
                  name='name'
                  placeholder='NAME'
                  className='form-control input-md'
                  required
                  type='text'
                />
              </div>
            </div>

            <div className='row form-group' style={{marginLeft: '50px'}}>
              <label
                className='col-md-4 control-label'
                htmlFor='product_weight' style = {{padding: '12px 20px', background: 'red', border: 'none', borderRadius: '30px', fontWeight: 'bold', boxShadow: "10px 20px 30px lightblue"}}
              >
                MODEL NUMBER
              </label>
              <div className='col-md-4'>
                <input
                  id='modelNo'
                  name='modelNo'
                  placeholder='MODEL NUMBER'
                  className='form-control input-md'
                  required
                  type='text'
                />
              </div>
            </div>

            <div className='row form-group' style={{marginLeft: '50px'}}>
              <label
                className='col-md-4 control-label'
                htmlFor='product_weight' style = {{padding: '12px 20px', background: 'red', border: 'none', borderRadius: '30px', fontWeight: 'bold', boxShadow: "10px 20px 30px lightblue"}}
              >
                COST
              </label>
              <div className='col-md-4'>
                <input
                  id='cost'
                  name='cost'
                  placeholder='COST'
                  className='form-control input-md'
                  required
                  type='number'
                />
              </div>
            </div>
            <div className='row form-group' style={{marginLeft: '50px'}}>
              <label
                className='col-md-4 control-label'
                htmlFor='percentage_discount'  style = {{padding: '12px 20px', background: 'red', border: 'none', borderRadius: '30px', fontWeight: 'bold', boxShadow: "10px 20px 30px lightblue"}}
              >
                DESCRIPTION
              </label>
              <div className='col-md-4'>
                <input
                  id='description'
                  name='description'
                  placeholder='DESCRIPTION'
                  className='form-control input-md'
                  required
                  type='text'
                />
              </div>
            </div>
            <div className='row form-group' style={{marginLeft: '50px'}}>
              <label className='col-md-4 control-label' htmlFor='stock_alert'  style = {{padding: '12px 20px', background: 'red', border: 'none', borderRadius: '30px', fontWeight: 'bold', boxShadow: "10px 20px 30px lightblue"}}>
                WARRANTY STATUS
              </label>
              <div className='col-md-4'>
                <input
                  id='warrantyStatus'
                  name='warrantyStatus'
                  placeholder='WARRANTY STATUS'
                  className='form-control input-md'
                  required
                  type='text'
                />
              </div>
            </div>
            <div className='row form-group' style={{marginLeft: '50px'}}>
              <label
                className='col-md-4 control-label'
                htmlFor='product_categorie'   style = {{padding: '12px 20px', background: 'red', border: 'none', borderRadius: '30px', fontWeight: 'bold', boxShadow: "10px 20px 30px lightblue"}}
              >
                PRODUCT CATEGORY
              </label>
              <div className='col-md-4'>
                <input
                  id='categoryName'
                  name='categoryName'
                  placeholder='Category Name'
                  className='form-control input-md'
                  required
                  type='text'
                />
              </div>
            </div>
            <div className='row form-group' style={{marginLeft: '50px'}}>
              <label
                className='col-md-4 control-label'
                htmlFor='singlebutton'
              ></label>
              <div className='col-md-4'>
                <Button variant="contained" style={{backgroundColor: 'green'}}> Add </Button>
              </div>
            </div>
          </fieldset>
        </form>
      </Card>


    );


}

const ProductManager = () => {
    return (

        <div className="container">
        <div className="row">
        <div className="col-sm-3">
          <SideBar />
        </div>
        <div className="col-sm-9">
          <AddProduct />
          <br />
        </div>
        </div>
      </div>





    );



}




export default ProductManager;