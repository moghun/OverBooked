import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { useLocation } from "react-router";
import { userRequest } from "./requestMethods";
import { Button } from "@material-ui/core";
import { clearCart } from "../redux/cartRedux";
import { useDispatch } from "react-redux";
import axios from "axios";

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
  useEffect(() => {
    function createOrder(){


      const idArray = cart.products.map((book) =>book._id)
      const amountArray = cart.products.map((book) =>book.amount)
      
      

      const orderStruct = {
        order_id: Math.floor(Math.random() * 10),
        buyer_email: currentUser.email,
        status: "Processing",
        cost: cart.total,
        date: Date.now(),
        bought_products: idArray,
        amounts: amountArray,
      };


      try {
        userRequest.post("/orders",
        orderStruct,{ headers: { token: "Bearer " + currentUser.accessToken } });
      } catch(err){
        console.log(err);
      }
    };
    createOrder();
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
