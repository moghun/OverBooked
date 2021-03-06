import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { publicRequest } from "../requestMethods";
import { useDispatch } from "react-redux";
import { addProduct } from "../../redux/cartRedux";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";

const containerStyle = {
  position: "relative",
  width: "6rem",
  height: "6rem",
  boxSizing: "border-box",
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
  left: 0,
};

const spinTransition = {
  loop: Infinity,
  ease: "linear",
  duration: 1,
};

const Synch = () => {
  const [waitingDB, setWaitingDB] = useState(true);
  const currUser = useSelector((state) => state.user.currentUser);
  const cart = useSelector((state) => state.cart.products);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  async function getProduct(id) {
    try {
      const res = await publicRequest.get("/products/find/" + id);
      return res.data;
    } catch {}
  }

  async function getUserCart() {
    try {
      const res = await axios.get(
        "http://localhost:5001/api/users/find/" + currUser._id,
        { headers: { token: "Bearer " + currUser.accessToken } }
      );
      return res.data.cart;
    } catch (err) {}
  }
  const addToRedux = async () => {
    let userCart = await getUserCart();
    for (let i = 0; i < userCart.length; i++) {
      let product = await getProduct(userCart[i].product_id);
      let amount = userCart[i].amount;
      let maxAmount = product.amount;
      dispatch(addProduct({ ...product, amount, maxAmount }));
    }
    setWaitingDB(false);
  };

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
  const addToDB = async () => {
    for (let i = 0; i < cart.length; i++) {
      let product = cart[i]._id;
      let amount = cart[i].amount;
      addCartAPI(product, amount);
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
  const synchDb = async () => {
    await clearCartAPI();
    await addToDB();
    navigate("/");
  };

  useEffect(() => {
    addToRedux();
  }, [currUser]);

  useEffect(() => {
    if (!waitingDB) {
      synchDb();
    }
  }, [waitingDB]);

  return (
    //
    <div
      style={{
        textAlign: "center",
        width: "8rem",
        height: "9rem",
        borderRadius: "10px",
        marginTop: "5%",
        marginLeft: "45%",
        boxShadow: "0 0 5px #ccc",
        padding: "1rem",
      }}
    >
      <div style={containerStyle}>
        <motion.span
          style={circleStyle}
          animate={{ rotate: 360 }}
          transition={spinTransition}
        />
      </div>
      <h
        style={{
          fontFamily: "OpenSans",
          color: "#e6b619",
          fontSize: "20px",
          marginLeft: "5px",
        }}
      >
        Loading...
      </h>
    </div>
  );
};
export default Synch;
