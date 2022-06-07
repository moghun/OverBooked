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
import { publicRequest } from "./requestMethods";
import { addProduct } from "../redux/cartRedux";
import { toast } from "react-toastify";

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
  async function getUserCart() {
    try {
      const res = await axios.get(
        "http://localhost:5001/api/users/find/" + currUser._id,
        { headers: { token: "Bearer " + currUser.accessToken } }
      );
      return res.data.cart;
    } catch (err) {}
  }
  const addCartAPI = async (product_id, amount) => {
    let userCart = await getUserCart();
    let oldAmount = 0;
    for (let i = 0; i < userCart.length; i++) {
      if (userCart[i].product_id == product_id) {
        oldAmount = userCart[i].amount;
      }
    }
    const newAmount = amount + oldAmount;
    const cartStruct = {
      product_id: product_id,
      amount: newAmount,
    };
    try {
      await axios.put(
        "http://localhost:5001/api/users/addToCart/" + currUser._id,
        cartStruct,
        { headers: { token: "Bearer " + currUser.accessToken } }
      );
    } catch (err) {
      console.log(err);
    }
  };

  const removeItem = (item) => {
    dispatch(removeProduct(item));
    removeFromCartAPI(item._id);
    toast.success("Selected product has been deleted", {
      position: toast.POSITION.TOP_CENTER,
    });
  };

  const clear = () => {
    dispatch(clearCart());
    clearCartAPI();
    toast.success("All shopping cart has been deleted", {
      position: toast.POSITION.TOP_CENTER,
    });
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

  const reduceAmount = (item) => {
    var amount = -1;
    var maxAmount = item.maxAmount;
    if (item.amount === 1) {
      removeItem(item);
    } else {
      addCartAPI(item._id, amount);
      dispatch(addProduct({ ...item, amount, maxAmount }));
    }
  };

  const increaseAmount = (item) => {
    var amount = 1;
    var maxAmount = item.maxAmount;
    if (item.amount === item.maxAmount) {
      toast.error("You reached maximum amount possible!", {
        position: toast.POSITION.TOP_CENTER,
      });
    } else {
      addCartAPI(item._id, amount);
      dispatch(addProduct({ ...item, amount, maxAmount }));
    }
  };

  return (
    <div className="shoppingcart-container">
      <div className="Rowx">
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
                    <button
                      onClick={() => reduceAmount(item)}
                      style={{
                        outline: "none",
                        fontWeight: "bold",
                        fontSize: "20px",
                        marginLeft: "25px",
                        width: "25px",
                      }}
                    >
                      -
                    </button>
                    <input
                      readOnly
                      onKeyDown={(e) => e.preventDefault()}
                      value={item.amount}
                      type="number"
                      style={{
                        borderRadius: "10px",
                        border: "none",
                        textAlign: "center",
                        outline: "none",
                        marginLeft: "5px",
                        width: "100px",
                      }}
                    ></input>
                    <button
                      onClick={() => increaseAmount(item)}
                      style={{
                        outline: "none",
                        fontWeight: "bold",
                        fontSize: "20px",
                        marginLeft: "5px",
                        width: "25px",
                      }}
                    >
                      +
                    </button>

                    <input
                      type="submit"
                      value="Delete Product"
                      onClick={() => removeItem(item)}
                      style={{
                        cursor: "pointer",
                        border: "none",
                        borderRadius: "10px",
                        marginLeft: "25px",
                        width: "150px",
                      }}
                    />
                  </div>
                </div>
              );
            })}

            <button
              className="clear"
              style={{
                outline: "none",
                color: "#F0F0F0",
                marginLeft: "88%",
                padding: "5px",
                width: "100px",
                border: "none",
                marginBottom: "10px",
              }}
              onClick={clear}
            >
              Clear Cart
            </button>

            <hr
              style={{
                width: "100%",
                borderColor: "gray",
                borderWidth: "2px",
              }}
            ></hr>

            <div className="checkout-container">
              <h
                style={{
                  color: "#F0F0F0",
                  fontSize: "20px",
                  fontFamily: "OpenSans",
                }}
              >
                <strong style={{ fontFamily: "OpenSans" }}>Total:</strong>{" "}
                {cart.total} $
              </h>
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
                  <Button
                    style={{
                      marginLeft: "790%",
                      outline: "none",
                      color: "#F0F0F0",
                      width: "100px",
                      padding: "5px",
                      border: "none",
                    }}
                  >
                    CHECKOUT
                  </Button>
                </StripeCheckout>
              ) : (
                <Button
                  href="/signin"
                  style={{
                    outline: "none",
                    marginLeft: "25px",
                    width: "100px",
                    padding: "5px",
                    border: "solid",
                  }}
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
