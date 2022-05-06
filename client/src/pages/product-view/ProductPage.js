import { padding } from '@mui/system';
import React, { useState, useEffect } from 'react';
import {FaStar} from 'react-icons/fa';
import { publicRequest } from "../requestMethods";
import { useLocation } from "react-router-dom";
import { addProduct } from "../../redux/cartRedux";
import { useDispatch } from "react-redux";
import axios from "axios";
import { useSelector } from "react-redux";



const DetailsThumb = () => {
    const currUser = useSelector((state) => state.user);
    const location = useLocation();
    const id = location.pathname.split("/")[2];
    const [product, setProduct] = useState({});
    const [amount, setAmount] = useState(null);
    const [maxAmount, setMaxAmount] = useState(null);
    const [comment, setComment] = useState(null);
    const [rating, setRating] = useState(null);
    const dispatch = useDispatch();


    function getComment(val){
        setComment(val.target.value)
        console.log(val.target.value)
    }

    function postCommentOrRating(){
        if(comment === null && rating === null){
            console.log("Rating and Comment cannot be left empty!")
        }
        else{
            console.log(comment)
            console.log(rating)

            if(comment != "")
            {
                const sendComment = {
                    //user_id must be taken from the redux storage
                    user_id: currUser._id,
                    comment: comment,
                    isApproved: false,
                }
                try{ 
                    //token needed to be sent from the redux storage
                    axios.put("http://localhost:5001/api/products/comment/" + id, sendComment, {headers: {token: ("Bearer "+ currUser.accessToken)}}
                    );
                } catch (err){}
            }

            if(rating != null)
            {
                try{ 
                    //user_id must be taken from the redux storage
                    const sendRating = {
                        user_id: currUser._id,
                        rating: rating,
                    }
                    //token needed to be sent from the redux storage
                    axios.put("http://localhost:5001/api/products/rate/" + id, sendRating, {headers: {token: ("Bearer "+ currUser.accessToken)}}
                    );
                } catch (err){}
            }

        }
    }
    

    useEffect(() => {
        const getProduct = async () => {
          try {
            const res = await publicRequest.get("/products/find/" + id);
            setProduct(res.data);
          } catch {}
        };
        getProduct();
      }, [id]);
   
    
    function getAmount(val){ 
        
        if(product.amount >= val.target.value && val.target.value > 0){
            //val.target.value returns string so it has changed into int
            var q = parseInt(val.target.value);
            setAmount(q);
            setMaxAmount(product.amount);
        }
        else if(product.amount < val.target.value || val.target.value < 0){
            console.log("Out of boundry")
        }     
    }

    //using redux adds this product with selected amount to the reduxstore
    const addCart = () => {
        dispatch(
          addProduct({ ...product, amount, maxAmount})
        );
      };

    return (
        <div className = "app">
             <div className="details" key={product.id}>

                
                <div className="big-img">
                    <img src={product.img} alt = {product.name}/>
                </div>

                <div className="box">

                    <div className="row">
                        <h2>{product.title}</h2>   
                    </div>


                    <h5>Author: {product.author} Publisher: {product.publisher}</h5>                 
                    <p>Amount: {product.amount}</p>
                    <p>Cost: {product.cost} TL</p>
                    <p>{product.description}</p>
                    <p>{product.category}</p>

                    {product.amount !== 0 ? <><input type = "number" onChange={getAmount} className='addcount' min="1" max = {product.amount}></input> <button className="cart" onClick={addCart}>Add to cart</button></> : <p style={{fontWeight: "bold"}}>SOLD OUT</p>}           
                     
                    <div style={{marginTop: 10}}>
                        <div>
                            {[...Array(5)].map((star, i) => {
                                const ratingValue = i+1;
                                return(
                                <label>
                                    <input type = "radio" name="rating" style={{display:'none'}}/>
                                    <FaStar className = "star" 
                                        size = {20} 
                                        value = {ratingValue} 
                                        onClick={() => setRating(ratingValue)}
                                        color={ratingValue <= rating ? "#ffc107" : "#e4e5e9" }
                                    />
                                </label>)
                            })}
                        </div>    

                        <textarea onChange={getComment} placeholder=" Write your comment here..." rows="4" cols="50" style={{resize:'none', borderWidth:'bold'}}></textarea>
                        <div><button onClick={postCommentOrRating} style={{cursor:'pointer', backgroundColor:"#333", color:'white', width:60}}>Submit</button></div>
                    </div>
                </div>
    </div> 
        </div> 
    )
}

export default DetailsThumb
