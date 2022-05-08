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
        history("/success", {state:{
          stripeData: res.data,
<<<<<<< HEAD
          products: cart,
        });
=======
          products: cart }});
>>>>>>> 0fc4028 (Go to success page is fixed)
      } catch {}
    };
    stripeToken && cart.total >= 1 && makeRequest();
  }, [stripeToken, cart.total, history]);

  return (
    <div className="shoppingcart-container">
      <div className="Row">
        <div className="products-container">
          <button className="clear" onClick={clear}>
            Clear Cart
          </button>
          <div className="product-row">
            {cart.products.map((item) => {
              return (
                <div style={{ padding: "10px", margin: "20px" }}>
                  <img
                    src={item.img}
                    style={{ marginLeft: "25px" }}
                    className="itemimage"
                  ></img>
                  <h style={{ marginLeft: "25px" }}>{item.name}</h>
                  <button style={{ marginLeft: "25px", width: "50px" }}>
                    -
                  </button>
                  <input
                    type="number"
                    min={0}
                    value={item.amount}
                    style={{ marginLeft: "10px" }}
                  ></input>
                  <button style={{ marginLeft: "10px", width: "50px" }}>
                    +
                  </button>
                  <h style={{ marginLeft: "25px" }}>
                    {item.amount * item.cost} TL
                  </h>
                  <input
                    type="submit"
                    value="delete item"
                    onClick={() => removeItem(item)}
                    style={{ marginLeft: "25px" }}
                  />
                </div>
              );
            })}

            <hr
              style={{
                width: "100%",
                borderColor: "black",
                borderWidth: "2px",
              }}
            ></hr>
            <div>
              <h style={{ marginLeft: "50px" }}>Total: {cart.total}</h>
            </div>

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
              <button style={{ marginLeft: "25px", width: "50px" }}>
                CHECKOUT
              </button>
            </StripeCheckout>
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
