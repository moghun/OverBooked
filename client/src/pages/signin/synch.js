import { useEffect } from "react";
import { useSelector } from "react-redux";
import { publicRequest } from "../requestMethods";
import { useDispatch } from "react-redux";
import { addProduct } from "../../redux/cartRedux";
import axios from "axios";
const Synch = () => {
  const currUser = useSelector((state) => state.user.currentUser);
  const cart = useSelector((state) => state.cart.products);
  const dispatch = useDispatch();

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
  };

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
  const addToDB = async () => {
    console.log(cart.length);
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
  addToRedux();
  const synchDb = async () => {
    await clearCartAPI();
    await addToDB();
  };

  useEffect(() => {
    synchDb();
  }, [cart]);

  return (
    //
    <>
      <p>Loading...</p>
      {cart.length > 0 && (window.location.href = "/")}
    </>
  );
};
export default Synch;
