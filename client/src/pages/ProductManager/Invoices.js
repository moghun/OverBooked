import React from 'react';

import SideBar from './SideBar';

import "./ProductManager.css"

const Total = () => {


    return (

        <div style={{borderRadius: '30px', border: '2px solid #0400ff'}}>
        <div className='px-4 px-lg-0'>
          <div className='container text-black py-5 text-center'>
            <h1 className='pcontainer' style={{ fontSize: 40, marginLeft: 170 }}>
              Invoices
            </h1>
          </div>
        </div>
        <div className='pb-5'>
          <div className='container'>
            <div className='row'>
              <div className='col-lg-12 p-5 bg-white rounded shadow-sm mb-5'>
                <div className='table-responsive'>
                  <table className='table'>
                    <thead>
                      <tr>
                        <th scope='col' className='border-0 bg-light'>
                          <div className='p-2 px-3 text-uppercase'>
                            Customer ID
                          </div>
                        </th>
                        <th scope='col' className='border-0 bg-light'>
                          <div className='py-2 text-uppercase'>
                            Product ID
                          </div>
                        </th>
                        <th scope='col' className='border-0 bg-light'>
                          <div className='py-2 text-uppercase'> Delivery ID</div>
                        </th>
                        <th scope='col' className='border-0 bg-light'>
                          <div className='py-2 text-uppercase'>Delivered?</div>
                        </th>
                        <th scope='col' className='border-0 bg-light'>
                          <div className='py-2 text-uppercase'>Address</div>
                        </th>

                        <th scope='col' className='border-0 bg-light'>
                          <div className='py-2 text-uppercase'>Quantity</div>
                        </th>

                        <th scope='col' className='border-0 bg-light'>
                          <div className='py-2 text-uppercase'>Total Price</div>
                        </th>

                      </tr>
                    </thead>
                  </table>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    )


}


const Invoices = () => {

    return (
        <div>
        <div className='container'>
            <div className='row'>
            <div className='col-sm-3 pt-2'>
                <br />
                <br />

                <SideBar />
            </div>
            <div className='col-sm-9 pt-2'>
                <Total />
            </div>
            </div>
        </div>
        </div>

    )

}


export default Invoices;