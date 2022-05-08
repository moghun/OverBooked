import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { useLocation } from "react-router";
import { userRequest } from "./requestMethods";
import { useNavigate } from "react-router-dom";
import { Button } from "@material-ui/core";
import { clearCart } from "../redux/cartRedux";
import { useDispatch } from "react-redux";
import axios from "axios";

const Success = () => {
  const location = useLocation();
  const data = location.state.stripeData;
  const cart = location.state.cart;
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
    const createOrder = async () => {
      try {
        const res = await userRequest.post("/orders", {
          userId: currentUser._id,
          products: cart.products.map((item) => ({
            productId: item._id,
            quantity: item._quantity,
          })),
          amount: cart.total,
          address: data.billing_details.address,
        });
        console.log("111");
        setOrderId(res.data._id);
        clear();
        console.log("222");
      } catch {}
    };
    data && createOrder();
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
