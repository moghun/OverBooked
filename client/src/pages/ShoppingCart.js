import React from 'react'
import './ShoppingCart.css'
import { useSelector } from "react-redux";
import { removeProduct } from "../redux/cartRedux";
import { useDispatch } from "react-redux";

const ShoppingCart = () => {
  const cart = useSelector((state) => state.cart);
  const dispatch = useDispatch();
  

  var signedIn = true
  var total = 0;

  const removeItem = (item) => {
    dispatch(
      removeProduct(item)
    );
  };

  function addItem(){

  }

  function decreaseItem(){}

  

  return (
    <div className='shoppingcart-container'>

      <div className='Row'>

        <div className='products-container'>
          
          <div className='product-row'>

            {cart.products.map((item)=>{
                  return (
                    <div style={{padding: '10px', margin:'20px'}}>
                      <img src = {item.img} style={{marginLeft: '25px'}} className="itemimage"></img>
                      <h style={{marginLeft: '25px'}}>{item.name}</h>
                      <button style={{marginLeft: '25px', width: "50px"}}>-</button>
                      <input type = "number" min={0} value={item.amount} style={{marginLeft: '10px'}}></input>
                      <button style={{ marginLeft: '10px', width: "50px"}}>+</button>
                      <h style={{marginLeft: '25px'}}>{item.amount * item.cost} TL</h>
                      <input type = "submit" value = "delete item" onClick={() => removeItem(item)}  style={{marginLeft: '25px'}}/>
                    </div>
                );})}

            <hr style={{width: '100%', borderColor:'black',  borderWidth: "2px"}}></hr>
            <div><h style={{marginLeft:"50px"}}>Total: {cart.total}</h></div>
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