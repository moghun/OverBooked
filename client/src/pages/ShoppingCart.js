import React from 'react'
import './ShoppingCart.css'

const ShoppingCart = () => {

  var signedIn = true
  var total = 0;
  const cartlist = [
    {productId: 1, cartamount: 1, price: 13.99, name: "Ay Zalim Bir Sevgilidir", image: 'http://www.ithaki.com.tr/wp-content/uploads/2017/06/Ay-Zalim-Bir-Sevgilidir.jpg'},
    {productId: 2, cartamount: 2, price: 18.99, name: "Yenilmez", image: 'http://www.ithaki.com.tr/wp-content/uploads/2017/11/yenilmez-ithaki.jpg'},
    {productId: 3, cartamount: 3, price: 9.99, name: "Ben, Robot", image: 'http://www.ithaki.com.tr/wp-content/uploads/2017/06/ben-robot.jpg'}
  ]

  function removeItem(){

  }

  function addItem(){

  }

  function decreaseItem(){}

  

  return (
    <div className='shoppingcart-container'>

      <div className='Row'>

        <div className='products-container'>
          
          <div className='product-row'>

            {cartlist.map((item)=>{
                  return (
                    <div style={{padding: '10px', margin:'20px'}}>
                      <img src = {item.image} style={{marginLeft: '25px'}} className="itemimage"></img>
                      <h style={{marginLeft: '25px'}}>{item.name}</h>
                      <button style={{marginLeft: '25px', width: "50px"}}>-</button>
                      <input type = "number" min={0} value={item.cartamount} style={{marginLeft: '10px'}}></input>
                      <button style={{ marginLeft: '10px', width: "50px"}}>+</button>
                      <h style={{marginLeft: '25px'}}>{item.cartamount * item.price} TL</h>
                      <input type = "submit" value = "delete item" style={{marginLeft: '25px'}}/>
                    </div>
                );})}

            <hr style={{width: '100%', borderColor:'black',  borderWidth: "2px"}}></hr>
            <div><h style={{marginLeft:"50px"}}>Total: {total}</h></div>
            {signedIn 
              ? <form style={{marginLeft:"50px"}} action='/checkout'><input type='submit' value="Checkout"/></form> 
              : <a style={{marginLeft:"50px"}} href='/'>Sign in to checkout</a>
            }
          
          </div>

        </div>

      </div>

    </div>
  )
}

export default ShoppingCart

/*
<div className='totalcheckout-container'>

<div><h>Total: {total}</h></div>
<a href='/'>Sign in to checkout</a>
<form action='/checkout'><input type='submit' value="Checkout"/></form>

</div>
*/