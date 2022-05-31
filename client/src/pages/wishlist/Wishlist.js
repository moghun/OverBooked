import React, { useState, useEffect } from "react";
import BookCard from "../../components/BookCard";
import "./Wishlist.css";
import { View } from "react-native";
import { Button } from "@material-ui/core";
import { useSelector } from "react-redux";
import { useDispatch } from "react-redux";
import axios from "axios";
import { clearWishlist } from "../../redux/userRedux";

const Wishlist = () => {
  const currUser = useSelector((state) => state.user.currentUser);

  const [allprod, settallprod] = useState([]);
  const [wishlist, setwishlist] = useState([]);
  const dispatch = useDispatch();

  const getAllProducts = async () => {
    try {
      const res = await axios.get("http://localhost:5001/api/products");
      settallprod(res.data);
      return res.data;
    } catch (err) {}
  };

  const clearWishlistAPI = async () => {
    try {
      await axios.put(
        "http://localhost:5001/api/users/clearWishlist/" + currUser._id,
        undefined,
        { headers: { token: "Bearer " + currUser.accessToken } }
      );
    } catch (err) {
      console.log(err);
    }
  };

  const CreateWishlist = () => {
    var returnArray = [];
    for (let i = 0; i < allprod.length; i++) {
      for (let j = 0; j < currUser.wishlist.length; j++) {
        if (allprod[i]._id === currUser.wishlist[j].product_id) {
          returnArray.push(allprod[i]);
        }
      }
    }
    setwishlist(returnArray);
  };

  function avgrating(items) {
    var totalrate = 0;
    for (var i = 0; i < items.rating.length; i++) {
      totalrate += items.rating[i].rating;
    }

    if (isNaN(totalrate / items.rating.length)) {
      return 0;
    }
    return (totalrate / items.rating.length).toFixed(1);
  }
  const Clear = () => {
    clearWishlistAPI();
    dispatch(clearWishlist());
  };
  useEffect(() => {
    getAllProducts();
  }, [currUser]);
  useEffect(() => {
    CreateWishlist();
  }, [allprod.length > 0]);
  return (
    <div>
      <View style={{ flexDirection: "row", alignItems: "center" }}>
        <View style={{ flex: 1, height: 4, backgroundColor: "black" }} />
        <View>
          <View
            style={{
              width: 200,
              textAlign: "center",
              color: "green",
              fontWeight: "bold",
              fontSize: 40,
            }}
          >
            Wish List
          </View>
        </View>
        <View style={{ flex: 1, height: 4, backgroundColor: "black" }} />
      </View>

      <div style={{ display: "flex", justifyContent: "space-between" }}>
        <Button href="\profile" className="containerWbtn3">
          Back to Profile
        </Button>
        <Button href="\profile" className="containerWbtn3" onClick={Clear}>
          Clear Wishlist
        </Button>
      </div>

      <div style={{ display: "flex", justifyContent: "space-between" }}>
        <hr
          style={{ flex: 1, height: 4, backgroundColor: "green", width: 135 }}
        />
        <hr
          style={{ flex: 1, height: 4, backgroundColor: "white", width: 135 }}
        />
        <hr
          style={{ flex: 1, height: 4, backgroundColor: "blue", width: 135 }}
        />
      </div>

      <div className="containerW">
        {wishlist.length === 0 ? (
          <h1 style={{ padding: "50px", textAlign: "center", color: "green" }}>
            There is no items in your wishlist
          </h1>
        ) : (
          wishlist.map((list) => (
            <BookCard
              id={list._id}
              name={list.name}
              amount={list.amount}
              author={list.author}
              imgurl={list.img}
              publisher={list.publisher}
              price={list.cost}
              score={avgrating(list)}
              beforeprice={list.before_sale_price}
            ></BookCard>
          ))
        )}
      </div>
    </div>
  );
};

export default Wishlist;
