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
    const currUser = useSelector((state) => state.user.currentUser);
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
        window.location.reload();

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

<<<<<<< HEAD
    //using redux adds this product with selected amount to the reduxstore
=======
    function commentDiv(item){
        if(item.comments.length === 0){
            return(<h>This product has no comment yet</h>); 
        }
        else{
            
            return(
                
                item.comments.map(
                    (cmt) =>{
                        return(
                            
                            <div className='comment-row' style={{outline:'solid',  outlineWidth:'1px', borderRadius: '5px', margin:'20px', padding:'5px'}}>
                                <h className='comment-text'>{cmt.comment}</h>
                            </div>
                            
                        )
                    }
                )
                
            )

        }
    }
>>>>>>> 2809b50 (on comment submit page refresh and comment section added)
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
                        <h2>{product.name}</h2>   
                    </div>


<<<<<<< HEAD
                    <h5>Author: {product.author} Publisher: {product.publisher}</h5>                 
=======
                    <h5>Yazar: {product.author}</h5>
                    <h5>Yayınevi: {product.publisher}</h5>                
>>>>>>> 2809b50 (on comment submit page refresh and comment section added)
                    <p>Amount: {product.amount}</p>
                    {product.sale 
                    ? <p>Cost: {product.after_sale_price} TL</p>
                    : <p>Cost: {product.cost} TL</p>
                    }
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
            

            <div className='comment-box' style={{textAlign:'center'}}>
                <h3 style={{marginBottom: '10px'}}>Product Comments</h3>
                {/*
                    product.comments.length === 0
                    ? <h>This product has no comment yet</h>
                    : product.comments.map(
                        (cmt) => {
                            return(
                                <div className='comment-row' style={{outline:'solid',  outlineWidth:'1px', borderRadius: '5px', margin:'20px', padding:'5px'}}>
                                    <h className='comment-text'>{cmt.comment}</h>
                                </div>
                            );
                        }
                    )
                    */
                   //commentDiv(product)
                }
                
            </div>



        </div> 
    )
}

export default DetailsThumb
