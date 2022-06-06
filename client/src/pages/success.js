import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { useLocation } from "react-router";
import { userRequest } from "./requestMethods";
import { Button } from "@material-ui/core";
import { clearCart } from "../redux/cartRedux";
import { useDispatch } from "react-redux";
import axios from "axios";
import { format } from "date-fns";
import { motion } from "framer-motion";




const containerStyle = {
  position: "relative",
  width: "6rem",
  height: "6rem",
  boxSizing: "border-box"
};

const circleStyle = {
  display: "block",
  width: "6rem",
  height: "6rem",
  border: "0.5rem solid #e9e9e9",
  borderTop: "0.5rem solid #e6b619",
  borderRadius: "50%",
  position: "absolute",
  boxSizing: "border-box",
  top: 0,
  left: 0
};

const spinTransition = {
  loop: Infinity,
  ease: "linear",
  duration: 1
};


const { v1: uuidv1 } = require("uuid");

const Success = () => {
  const location = useLocation();
  const data = location.state.stripeData;
  const cart = location.state.products;
  const currentUser = useSelector((state) => state.user.currentUser);
  const [orderId, setOrderId] = useState(null);
  const dispatch = useDispatch();

  const clearCartAPI = async () => {
    try {
      await axios.put(
        "http://localhost:5001/api/users/clearCart/" + currentUser._id,
        undefined,
        { headers: { token: "Bearer " + currentUser.accessToken } }
      );
    } catch (err) {
      console.log(err);
    }
  };

  const clear = () => {
    dispatch(clearCart());
    clearCartAPI();
  };

  const createInvoice = async (i_id) => {
    try {
      const invoice = {
        invoice_id: i_id,
        email: currentUser.email,
        username: currentUser.username,
        adress: currentUser.adress,
        name: currentUser.name,
        surname: currentUser.surname,
        cost: cart.total,
        products: [
          cart.products.map((book) => book.cost),
          cart.products.map((book) => book.name),
          cart.products.map((book) => book.amount),
        ],
        status: "Processing",
        tax_id: currentUser.tax_id,
        card_no: data.source.last4,
        date: format(Date.now(), "MM/dd/yyyy"),
      };
      await axios.put(
        "http://localhost:5001/api/users/invoice/" + currentUser._id,
        invoice,
        { headers: { token: "Bearer " + currentUser.accessToken } }
      );
    } catch (err) {}
  };

  const sendInvoice = async (i_id) => {
    try {
      const invoice_m = {
        invoice_id: i_id,
        email: currentUser.email,
        username: currentUser.username,
        name: currentUser.name,
        cost: cart.total,
        products: cart.products,
        amount: cart.amount,
        adress: currentUser.adress,
        tax_id: currentUser.tax_id,
        card_no: data.source.last4,
      };
      await axios.post(
        "http://localhost:5001/api/orders/sendRecepit",
        invoice_m,
        { headers: { token: "Bearer " + currentUser.accessToken } }
      );
    } catch (err) {}
  };

  useEffect(() => {
    function createOrder() {
      const idArray = cart.products.map((book) => book._id);
      const amountArray = cart.products.map((book) => book.amount);
      const orderStruct = {
        buyer_email: currentUser.email,
        status: "Processing",
        payment_method: data.payment_method,
        last_four_digit: data.source.last4,
        cost: cart.total,
        user_adress: currentUser.adress,
        date: Date.now(),
        bought_products: idArray,
        amounts: amountArray,
      };

      try {
        userRequest.post("/orders", orderStruct, {
          headers: { token: "Bearer " + currentUser.accessToken },
        });
      } catch (err) {
        console.log(err);
      }
    }
    const i_id = uuidv1();
    createOrder();
    createInvoice(i_id);
    sendInvoice(i_id);
    clear();
  }, [cart, data, currentUser]);

  return (
    <div
      style={{
        height: "50vh",
        width:"60vh",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        boxShadow: "0 0 5px #ccc",
        marginTop:'5vh',
        marginLeft:'35%',
        borderRadius:'10vh'
      }}
    >
            
        {orderId
        ? <h style={{fontFamily:'OpenSans', fontSize:'20px'}}>Order has been created successfully. Your order number is ${orderId}</h>
        : <h style={{fontFamily:'OpenSans', fontSize:'20px'}}>Successfull. Your order is being prepared...</h>}
      <Button href={"/"} style={{ padding: 10, marginTop: 20, fontFamily:'OpenSans'  }}>
        Go to Homepage
      </Button>
      

    </div>
  );
};

export default Success;
