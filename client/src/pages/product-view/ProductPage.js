import { padding } from "@mui/system";
import React, { useState, useEffect, useMemo } from "react";
import { FaStar } from "react-icons/fa";
import { publicRequest } from "../requestMethods";
import { useLocation } from "react-router-dom";
import { addProduct } from "../../redux/cartRedux";
import { useDispatch } from "react-redux";
import axios from "axios";
import { useSelector } from "react-redux";

const { v1: uuidv1 } = require("uuid");

const DetailsThumb = () => {
  const currUser = useSelector((state) => state.user.currentUser);
  const location = useLocation();
  const id = useMemo(() => location.pathname.split("/")[2]);
  const [product, setProduct] = useState({});
  const [amount, setAmount] = useState(null);
  const [maxAmount, setMaxAmount] = useState(null);
  const [comment, setComment] = useState(null);
  const [rating, setRating] = useState(null);
  const [usernames, setUsernames] = useState([]);
  const [isProductSet, setIsProductSet] = useState(false);
  const dispatch = useDispatch();

<<<<<<< HEAD
  const getUserInfo = async () => {
    var names = [];
    for (let i = 0; i < product.comments.length; i++) {
      try {
        id = product.comments[i].user_id;
        const res = await axios.get(
          "http://localhost:5001/api/users/find/" + id,
          { headers: { token: "Bearer " + currUser.accessToken } }
        );
        names.push(res.data.username);
      } catch (err) {}
      setUsernames(names);
    }
  };
  console.log(product);
  console.log(usernames);
  useEffect(async () => {
    getUserInfo();
  }, [isProductSet]);

=======
  async function getUserCart() {
    try {
      const res = await axios.get(
        "http://localhost:5001/api/users/find/" + currUser._id,
        { headers: { token: "Bearer " + currUser.accessToken } }
      );
      return res.data.cart;
    } catch (err) {}
  }
>>>>>>> master
  function getComment(val) {
    setComment(val.target.value);
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

  function postCommentOrRating() {
    if (comment === null && rating === null) {
      console.log("Rating and Comment cannot be left empty!");
    } else {
      if (comment !== "") {
        const sendComment = {
          //user_id must be taken from the redux storage
          comment_id: uuidv1(),
          user_id: currUser._id,
          comment: comment,
          isApproved: false,
        };
        try {
          //token needed to be sent from the redux storage
          axios.put(
            "http://localhost:5001/api/products/comment/" + id,
            sendComment,
            { headers: { token: "Bearer " + currUser.accessToken } }
          );
          alert("Your comment is sent for approve");
          window.location.reload();
        } catch (err) {}
      }

      if (rating != null) {
        try {
          //user_id must be taken from the redux storage
          const sendRating = {
            user_id: currUser._id,
            rating: rating,
          };
          //token needed to be sent from the redux storage
          axios.put(
            "http://localhost:5001/api/products/rate/" + id,
            sendRating,
            { headers: { token: "Bearer " + currUser.accessToken } }
          );
        } catch (err) {}
      }
    }
  }

  useEffect(() => {
    const getProduct = async () => {
      try {
        const res = await publicRequest.get("/products/find/" + id);
        setProduct(res.data);
        setIsProductSet(true);
      } catch {}
    };
    getProduct();
  }, []);

  function getAmount(val) {
    if (product.amount >= val.target.value && val.target.value > 0) {
      //val.target.value returns string so it has changed into int
      var q = parseInt(val.target.value);
      setAmount(q);
      setMaxAmount(product.amount);
    } else if (product.amount < val.target.value || val.target.value < 0) {
      console.log("Out of boundry");
    }
  }

  const addCart = () => {
    dispatch(addProduct({ ...product, amount, maxAmount }));
    addCartAPI(product._id, amount);
    alert("Product added to Cart");
  };
  let approvedComments;
  if (product.comments) {
    approvedComments = product.comments.filter((c) => c.isApproved === true);
  }

  return (
    <div className="app">
      <div className="details" key={product.id}>
        <div className="big-img">
          <img src={product.img} alt={product.name} />
        </div>

        <div className="box">
          <div className="row">
            <h2>{product.name}</h2>
          </div>

          <h5>Author: {product.author}</h5>
          <h5>Publisher: {product.publisher}</h5>
          <p>Amount: {product.amount}</p>
          {product.sale ? (
            <div>
              <p>Before Sale Cost: {product.before_sale_price} $</p>
              <p>Cost: {product.cost} $</p>
            </div>
          ) : (
            <p>Cost: {product.cost} $</p>
          )}
          <p>Description: {product.description}</p>
          <p>Category: {product.category}</p>

          {product.amount !== 0 ? (
            <>
              <input
                type="number"
                onChange={getAmount}
                className="addcount"
                min="1"
                max={product.amount}
                onKeyDown={(e) => e.preventDefault()}
                style={{ borderRadius: "5px", borderWidth: "1px" }}
              ></input>{" "}
              <button
                className="cart"
                onClick={addCart}
                style={{ borderRadius: "5px" }}
              >
                Add to cart
              </button>
            </>
          ) : (
            <p style={{ fontWeight: "bold" }}>SOLD OUT</p>
          )}

          <div style={{ marginTop: 10 }}>
            <div>
              {[...Array(5)].map((star, i) => {
                const ratingValue = i + 1;
                return (
                  <label>
                    <input
                      type="radio"
                      name="rating"
                      style={{ display: "none" }}
                    />
                    <FaStar
                      className="star"
                      size={20}
                      value={ratingValue}
                      onClick={() => setRating(ratingValue)}
                      color={ratingValue <= rating ? "#ffc107" : "#e4e5e9"}
                    />
                  </label>
                );
              })}
            </div>

            <textarea
              onChange={getComment}
              placeholder=" Write your comment here..."
              rows="4"
              cols="50"
              style={{
                resize: "none",
                borderWidth: "bold",
                borderRadius: "10px",
              }}
            ></textarea>
            <div>
              <button
                onClick={postCommentOrRating}
                style={{
                  cursor: "pointer",
                  backgroundColor: "#333",
                  color: "white",
                  width: 60,
                  borderRadius: "5px",
                }}
              >
                Submit
              </button>
            </div>
          </div>
        </div>
      </div>

      <hr style={{ width: "95%", marginLeft: "2.5%", borderWidth: "2px" }}></hr>

      <div className="comment-box" style={{ textAlign: "center" }}>
        <h3 style={{ marginBottom: "10px" }}>Product Comments</h3>
        {
          !approvedComments || approvedComments.length === 0 ? (
            <h>This product has no comment yet</h>
          ) : (
            approvedComments.map((cmt, i) => {
              //getUserInfo(cmt.user_id);
              return (
                <div
                  className="comment-row"
                  style={{
                    boxShadow: "0 0 5px #ccc",
                    outline: "solid",
                    outlineColor: "lightgray",
                    outlineWidth: "0.5px",
                    borderRadius: "5px",
                    margin: "20px",
                    padding: "10px",
                  }}
                >
                  <div class="comment-header d-flex justify-content-between">
                    <div class="comment-owner">
                      <strong>Username: </strong>
                      <h>{usernames[i]}</h>
                    </div>
                  </div>

                  <div style={{ textAlign: "left" }}>
                    <br></br>
                    <h className="comment-text">{cmt.comment}</h>
                  </div>
                </div>
              );
            })
          )

          //CommentDiv(product)
        }
      </div>
    </div>
  );
};

export default DetailsThumb;
