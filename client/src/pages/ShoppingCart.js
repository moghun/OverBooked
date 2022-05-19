import React from "react";
import "./ShoppingCart.css";
import { useSelector } from "react-redux";
import { removeProduct } from "../redux/cartRedux";
import { clearCart, addProduct } from "../redux/cartRedux";
import { useDispatch } from "react-redux";
import StripeCheckout from "react-stripe-checkout";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { userRequest } from "./requestMethods";
import { Button } from "@material-ui/core";
import axios from "axios";
import { publicRequest } from "./requestMethods";

const KEY = process.env.REACT_APP_STRIPE;

const ShoppingCart = () => {
  const cart = useSelector((state) => state.cart);
  const currUser = useSelector((state) => state.user.currentUser);
  const dispatch = useDispatch();

  async function getProduct(id) {
    try {
      const res = await publicRequest.get("/products/find/" + id);
      return res.data;
    } catch {}
  }

  async function getUserInfo() {
    try {
      const res = await axios.get(
        "http://localhost:5001/api/users/find/" + currUser._id,
        { headers: { token: "Bearer " + currUser.accessToken } }
      );
      return res.data.cart;
    } catch (err) {}
  }
  const syncCart = async () => {
    let userCart = await getUserInfo();
    for (let i = 0; i < userCart.length; i++) {
      let product = await getProduct(userCart[i].product_id);
      let amount = userCart[i].amount;
      let maxAmount = product.amount;
      dispatch(addProduct({ ...product, amount, maxAmount }));
    }
  };
  useEffect(() => {
    syncCart();
  }, [currUser]);

  const removeFromCartAPI = async (pid) => {
    try {
      await axios.put(
        "http://localhost:5001/api/users/removeFromCart/" + currUser._id,
        { product_id: pid },
        { headers: { token: "Bearer " + currUser.accessToken } }
      );
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

  const removeItem = (item) => {
    dispatch(removeProduct(item));
    removeFromCartAPI(item._id);
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
                  <div className="product-container">
                    <img
                      src={item.img}
                      style={{ marginLeft: "25px" }}
                      className="itemimage"
                    ></img>
                    <h style={{ marginLeft: "25px" }}>{item.name}</h>

                    <p style={{ marginLeft: "35px" }}>
                      {" "}
                      Amount: {item.amount}{" "}
                    </p>
                    <h style={{ marginLeft: "25px" }}>
                      {item.amount * item.cost} $
                    </h>
                  </div>
                  <div>
                    <input
                      type="submit"
                      value="Delete Product"
                      onClick={() => removeItem(item)}
                      style={{ marginLeft: "25px", width: "222px" }}
                    />
                  </div>
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
              <h style={{ marginLeft: "50px" }}>Total: {cart.total} $</h>
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
                  <Button style={{ width: "50px" }}>CHECKOUT</Button>
                </StripeCheckout>
              ) : (
                <Button
                  href="/signin"
                  style={{ marginLeft: "25px", width: "50px" }}
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
