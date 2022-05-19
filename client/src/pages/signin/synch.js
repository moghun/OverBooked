import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import axios from "axios";
const Synch = () => {
  const currUser = useSelector((state) => state.user.currentUser);
  const cart = useSelector((state) => state.cart.products);

  const addCartAPI = async (product_id, amount) => {
    const cartStruct = {
      product_id: product_id,
      amount: amount,
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
  const syncCart = async () => {
    for (let i = 0; i < cart.length; i++) {
      let product = cart[i]._id;
      let amount = cart[i].amount;
      addCartAPI(product, amount);
    }
  };
  useEffect(() => {
    syncCart();
  }, []);
  return (window.location.href = "/");
};
export default Synch;
