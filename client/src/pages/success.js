import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { useLocation } from "react-router";
import { userRequest } from "./requestMethods";
import { Button } from "@material-ui/core";
import { clearCart } from "../redux/cartRedux";
import { useDispatch } from "react-redux";
import axios from "axios";
import { format } from "date-fns";

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
        name: currentUser.name,
        surname: currentUser.surname,
        cost: cart.total,
        products: [
          cart.products.map((book) => book.cost),
          cart.products.map((book) => book.name),
          cart.products.map((book) => book.amount),
        ],
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
        height: "100vh",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
      }}
    >
      {orderId
        ? `Order has been created successfully. Your order number is ${orderId}`
        : `Successfull. Your order is being prepared...`}
      <Button href={"/"} style={{ padding: 10, marginTop: 20 }}>
        Go to Homepage
      </Button>
    </div>
  );
};

export default Success;
