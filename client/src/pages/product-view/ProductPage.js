import { padding } from '@mui/system';
import React, { useState, useEffect } from 'react';
import {FaStar} from 'react-icons/fa';

const DetailsThumb = () => {

    const [products, setProduct] = useState({});
    const [amount, setAmount] = useState(null);
    const [comment, setComment] = useState(null);
    const [rating, setRating] = useState(null);


    function getComment(val){
        setComment(val.target.value)
    }

    function printCommentRating(){
        if(comment === null || rating === null){
            console.log("Rating or Comment cannot be left empty!")
        }
        else{
            console.log(comment)
            console.log(rating)
        }
    }
    
    function printAmount(){
        if(amount === null){
            console.log("Amount cannot be left empty!")
        }
        else{
            console.log(amount)
        }
    }

    useEffect(() => {
        setProduct({
            "_id": "1",
            "title": "Ay Zalim Bir Sevgilidir",
            "src": "http://www.ithaki.com.tr/wp-content/uploads/2017/06/Ay-Zalim-Bir-Sevgilidir.jpg",
            "price": "23.99 TL",
            "content": "Ay’ı Dünya’dan kontrol eden Otorite’ye karşı, yalnızca mahkûm ve sürgünlerin gönderildiği ceza kolonisine dönüşmüş Ay’daki isyanın ve devrimin öyküsü bu.",
            "count": 1,
            "author": "Robert A. Heinlein",
            "publisher": "İthaki Yayınları",
            "amount": 10
          });
    }, [products]);
   
    function getAmount(val){ 
        
        if(products.amount >= val.target.value && val.target.value > 0){
            console.log(val.target.value)
            setAmount(val.target.value)

        }
        else if(products.amount < val.target.value || val.target.value < 0){
            console.log("Out of boundry")
        }     
    }

    return (
        <div className = "app">
             <div className="details" key={products.id}>

                
                <div className="big-img">
                    <img src={products.src} alt = {products.title}/>
                </div>

                <div className="box">

                    <div className="row">
                        <h2>{products.title}</h2>   
                    </div>


                    <h5>Yazar: {products.author} Yayınevi: {products.publisher}</h5>                 
                    <p>{products.price}</p>
                    <p>{products.description}</p>
                    <p>{products.content}</p>

                    {products.amount !== 0 ? <><input type = "number" onChange={getAmount} className='addcount' min="1" max = {products.amount}></input> <button className="cart" onClick={printAmount}>Add to cart</button></> : <p style={{fontWeight: "bold"}}>SOLD OUT</p>}           
                     
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
                        <div><button onClick={printCommentRating} style={{cursor:'pointer', backgroundColor:"#333", color:'white', width:60}}>Submit</button></div>
                    </div>
                </div>
    </div> 
        </div> 
    )
}

export default DetailsThumb
