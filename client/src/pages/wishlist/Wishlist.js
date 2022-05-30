import React, { useState, useEffect} from "react";
import BookCard from "../../components/BookCard";
import './Wishlist.css';
import { View,} from "react-native";
import { Button } from "@material-ui/core";
import { useSelector } from "react-redux";
import { useDispatch } from "react-redux";
//import { clearCart } from "../redux/cartRedux";
//import { removeProduct } from "../redux/cartRedux";


const Wishlist = () => {



  const currUser = useSelector((state) => state.user.currentUser);
  const dispatch = useDispatch();


  const [wishlist, setwishlist] = useState([]);



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

    const getWishlist = async () => {
      const userStruct = {buyer_email:currUser.email}
      try {
  
        const res = await axios.get(
          'http://localhost:5001/api/orders/find/'+currUser._id,
        {params:userStruct}
        
        );
        setwishlist(res.data);
        
      } catch (error) {
        
      }
  
      
    }

    const removeFromCartAPI = async (pid) => {
      try {
        await axios.put(
          "http://localhost:5001/api/users/removeFromWishlist/" + currUser._id,
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
          "http://localhost:5001/api/users/clearWishlist/" + currUser._id,
          undefined,
          { headers: { token: "Bearer " + currUser.accessToken } }
        );
      } catch (err) {
        console.log(err);
      }
    };


    useEffect(() => {getWishlist(), clearCartAPI(), removeFromCartAPI()},[currUser]);



    const clear = () => {
      dispatch(clearCart());
      clearCartAPI();
    };


    const removeItem = (item) => {
      dispatch(removeProduct(item));
      removeFromCartAPI(item._id);
    };

      return (


        <div>


          <View style={{flexDirection: 'row', alignItems: 'center'}}>
            <View style={{flex: 1, height: 4, backgroundColor: 'black'}} />
            <View>
              <View style={{width: 200, textAlign: 'center', color: 'green', fontWeight: "bold", fontSize: 40}}>Wish List</View>
            </View>
            <View style={{flex: 1, height: 4, backgroundColor: 'black'}} />
          </View>


          <div style={{display: "flex", justifyContent: "space-between"}}>

            <Button href = "\profile" className="containerWbtn3">Back to Profile</Button>
            <Button href = "\profile" className="containerWbtn3" onClick={clear}>Clear Wishlist</Button>

          </div>



          <div style={{display: "flex", justifyContent: "space-between"}}>

            <hr style={{flex: 1, height: 4, backgroundColor: 'green', width: 135,}}/>
            <hr style={{flex: 1, height: 4, backgroundColor: 'white', width: 135,}}/>
            <hr style={{flex: 1, height: 4, backgroundColor: 'blue', width: 135,}}/>

          </div>



          <div className="containerW">

            {wishlist.length === 0
              ? <h1 style={{padding: "50px",textAlign:'center', color: 'green'}}>There is no items in your wishlist</h1>
              :

              wishlist.map((list)=> (

                <BookCard
                  onclick={list._id}
                  name={list.name}
                  imgurl={list.img}
                  price={list.cost}
                  score={avgrating(list)}
                ></BookCard>

              ))}

          </div>


        </div>












      )

}


export default Wishlist;


