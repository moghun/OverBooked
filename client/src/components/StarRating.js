import React,{ useState } from 'react'
import {FaStar} from 'react-icons/fa';

const StarRating = () => {

    const [rating, setRating] = useState(null);

    return (
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
    )
}

export default StarRating
