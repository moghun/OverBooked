import SideBar from './SideBar';
import React, { Component } from 'react';
import { Container, Card } from 'react-bootstrap';

const AddProduct = () => {
    return (


        <Card>
        <form className='form-horizontal'>
          <fieldset>
            <legend>ADD PRODUCTS</legend>
            <div className='row form-group'>
              <label className='col-md-4 control-label' htmlFor='product_id'>
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
            <div className='row form-group'>
              <label className='col-md-4 control-label' htmlFor='product_name'>
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
            <div className=' row form-group'>
              <label
                className='col-md-4 control-label'
                htmlFor='product_name_fr'
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

            <div className='row form-group'>
              <label
                className='col-md-4 control-label'
                htmlFor='available_quantity'
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

            <div className='row form-group'>
              <label
                className='col-md-4 control-label'
                htmlFor='available_quantity'
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

            <div className='row form-group'>
              <label
                className='col-md-4 control-label'
                htmlFor='product_weight'
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

            <div className='row form-group'>
              <label
                className='col-md-4 control-label'
                htmlFor='product_weight'
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
            <div className='row form-group'>
              <label
                className='col-md-4 control-label'
                htmlFor='percentage_discount'
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
            <div className='row form-group'>
              <label className='col-md-4 control-label' htmlFor='stock_alert'>
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
            <div className='row form-group'>
              <label
                className='col-md-4 control-label'
                htmlFor='product_categorie'
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
            <div className='row form-group'>
              <label className='col-md-4 control-label' htmlFor='author'>
                LISTED DATE
              </label>
              <div className='col-md-4'>
                <input
                  id='listedDate'
                  name='listedDate'
                  placeholder='LISTED DATE'
                  className='form-control input-md'
                  required
                  type='text'
                />
              </div>
            </div>
            <div className='row form-group'>
              <label
                className='col-md-4 control-label'
                htmlFor='enable_display'
              >
                CATEGORY ICON
              </label>
              <div className='col-md-4'>
                <input
                  id='categoryIconScr'
                  name='categoryIconScr'
                  placeholder='CATEGORY ICON'
                  className='form-control input-md'
                  required
                  type='text'
                />
              </div>
            </div>
            <div className='row form-group'>
              <label
                className='col-md-4 control-label'
                htmlFor='singlebutton'
              ></label>
              <div className='col-md-4'>
                <button
                  id='singlebutton'
                  name='singlebutton'
                  className='btn btn-primary'
                  type='submit'
                >
                  ADD
                </button>
              </div>
            </div>
          </fieldset>
        </form>
      </Card>


    );


}



const RemoveProduct = () => {
    return (



        <Card>
        <form className='form-horizontal'>
          <fieldset>
            <legend>REMOVE PRODUCTS</legend>
            <div className='row form-group'>
              <label className='col-md-4 control-label'>
                PRODUCT NAME
            </label>
              <div className='col-md-4'>
                <input
                  id='name1'
                  name='NAME'
                  placeholder='NAME'
                  className='form-control input-md'
                  required
                />
              </div>
            </div>

            {/* Button */}
            <div className='row form-group'>
              <label
                className='col-md-4 control-label'

              ></label>
              <div className='col-md-4'>
                <button
                  id='singlebutton1'
                  name='singlebutton'
                  className='btn btn-primary'
                  type='submit'
                >
                  REMOVE
              </button>
              </div>
            </div>
          </fieldset>
        </form>
      </Card>


    )


};




const UpdateStock = () => {
    return (
        <Card>
            <form className='form-horizontal'>
            <fieldset>
                <legend>UPDATE STOCK</legend>

                <div className='row form-group'>
                <label className='col-md-4 control-label' htmlFor='product_id'>
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

                <div className='row form-group'>
                <label className='col-md-4 control-label' htmlFor='product_id'>
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

                <div className='row form-group'>
                <label
                    className='col-md-4 control-label'
                    htmlFor='singlebutton'
                ></label>
                <div className='col-md-4'>
                    <button
                    id='singlebutton'
                    name='singlebutton'
                    className='btn btn-primary'
                    type='submit'
                    >
                    UPDATE STOCK
                </button>
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
            <RemoveProduct />
          <br />

            <UpdateStock />
        </div>
        </div>
       

      </div>





    );



}




export default ProductManager;