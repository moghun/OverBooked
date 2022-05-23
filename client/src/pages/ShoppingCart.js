import React from "react";
import "./ShoppingCart.css";
import { useSelector } from "react-redux";
import { removeProduct } from "../redux/cartRedux";
import { clearCart } from "../redux/cartRedux";
import { useDispatch } from "react-redux";
import StripeCheckout from "react-stripe-checkout";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { userRequest } from "./requestMethods";
import { Button } from "@material-ui/core";
import axios from "axios";

const KEY = process.env.REACT_APP_STRIPE;

const ShoppingCart = () => {
  const cart = useSelector((state) => state.cart);
  const currUser = useSelector((state) => state.user.currentUser);
  const dispatch = useDispatch();

  const removeFromCartAPI = async (pid) => {
    try {
      await axios.put(
        "http://localhost:5001/api/users/removeFromCart/" + currUser._id,
        { product_id: pid },
        { headers: { token: "Bearer " + currUser.accessToken } }
      );
      console.log(pid);
    } catch (err) {
      console.log(err);
    }
  };
  const clearCartAPI = async () => {
    try {
      await axios.put(
        "http://localhost:5001/api/users/clearCart/" + currUser._id,
        undefined,
        { headers: { token: "Bearer " + currUser.accessToken } }
      );
    } catch (err) {
      console.log(err);
    }
  };

  var signedIn = true;
  var total = 0;

  const removeItem = (item) => {
    dispatch(removeProduct(item));
    removeFromCartAPI(item._id);
    console.log("calısıyo keriz");
  };

  const clear = () => {
    dispatch(clearCart());
    clearCartAPI();
  };

  const [stripeToken, setStripeToken] = useState(null);
  const history = useNavigate();

  const onToken = (token) => {
    setStripeToken(token);
  };

  useEffect(() => {
    const makeRequest = async () => {
      try {
        const res = await userRequest.post("/checkout/payment", {
          tokenId: stripeToken.id,
          amount: cart.total * 100,
        });
        history("/success", {
          state: {
            stripeData: res.data,
            products: cart,
          },
        });
      } catch {}
    };
    stripeToken && cart.total >= 1 && makeRequest();
  }, [stripeToken, cart.total, history]);


  const reduceAmount = (item) =>{
    if(item.amount === 1){
      removeItem(item)
    }
    else {
      alert(item.amount)
    }
  }

  const increaseAmount = (item) => {
    if(item.amount === item.maxAmount){alert("No more increase")}
    else{}
  }

  return (
    <div className="shoppingcart-container">
      <div className="Row">
        <div className="products-container">
          
          <div className="product-row">
            {cart.products.map((item) => {
              return (
                <div style={{ padding: "10px", margin: "20px" }}>
                  <div className="product-container">
                    <img
                      src={item.img}
                      style={{ marginLeft: "25px" }}
                      className="itemimage"
                    ></img>
                    <h style={{ marginLeft: "25px" }}>{item.name}</h>

                    <h style={{ marginLeft: "35px" }}>
                      {" "}
                      Amount: {item.amount}{" "}
                    </h>
                    <h style={{ marginLeft: "25px" }}>
                      {item.amount * item.cost} $
                    </h>
                    <button  onClick={() => reduceAmount(item)} style={{ outline:'none',fontWeight:'bold',fontSize:'20px',marginLeft: "25px", width:'25px' }}>-</button>
                    <input readOnly onKeyDown={(e) => e.preventDefault()} defaultValue={item.amount} type="number" style={{borderRadius:'10px',border:'none',textAlign:'center',outline:'none',marginLeft:"5px", width:'100px' }}></input>
                    <button onClick={() => increaseAmount(item)} style={{outline:'none',fontWeight:'bold',fontSize:'20px', marginLeft: "5px", width:'25px' }}>+</button>
                  
                    <input
                      type="submit"
                      value="Delete Product"
                      onClick={() => removeItem(item)}
                      style={{ cursor:'pointer',border:'none', borderRadius:'10px',marginLeft:'25px',width: "150px" }}
                    />
                  </div>

                </div>
              );
            })}

              <button className="clear" style = {{outline:'none',color: '#F0F0F0',marginLeft:'88%' , padding:'5px',width: '100px', border:'none', marginBottom:'10px'}}onClick={clear}>
                Clear Cart
              </button>
              

            <hr
              style={{
                width: "100%",
                borderColor: "black",
                borderWidth: "2px",
              }}
            ></hr>
            <div>
              <h style={{ color: '#F0F0F0',fontSize: '20px', fontFamily:'OpenSans' ,marginLeft: "35px" }}>
                <strong style={{fontFamily:'OpenSans'}}>Total:</strong> {cart.total} $
              </h>
            </div>

            <div className="checkout-container">
              {currUser !== null ? (
                <StripeCheckout
                  name="OverBooked"
                  image="https://st3.depositphotos.com/1031343/33199/v/1600/depositphotos_331995822-stock-illustration-overbooked-sign-or-stamp.jpg"
                  billingAddress
                  shippingAddress
                  description={`Your total is $${cart.total}`}
                  amount={cart.total * 100}
                  token={onToken}
                  stripeKey={KEY}
                >
                  <Button style={{ outline:'none',color: '#F0F0F0',width: "100px", padding:'5px', border:'none'}}>CHECKOUT</Button>
                </StripeCheckout>
              ) : (
                <Button
                  href="/signin"
                  style={{outline:'none',marginLeft: "25px", width: "100px", padding:'5px', border:'solid' }}
                >
                  CHECKOUT
                </Button>
              )}


            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ShoppingCart;

/*
<div className='totalcheckout-container'>

<div><h>Total: {total}</h></div>
<a href='/'>Sign in to checkout</a>
<form action='/checkout'><input type='submit' value="Checkout"/></form>

</div>
*/
