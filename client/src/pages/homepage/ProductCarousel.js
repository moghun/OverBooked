import axios from 'axios';
import React, { useState, useEffect } from 'react';
import Carousel from 'react-material-ui-carousel';
import { CarouselItem} from './ProductCarousel1';
import ArrowForwardIosRoundedIcon from '@material-ui/icons/ArrowForwardIosRounded';
import ArrowBackIosRoundedIcon from '@material-ui/icons/ArrowBackIosRounded';
import "../wishlist/Wishlist.css";
import { Button } from '@material-ui/core';


const ProductCarousel = () => {

    const [ products, setProducts ] = useState([]);

    useEffect(()=>{

        const getAllProducts = async () => {
            try {
              const res = await axios.get("http://localhost:5001/api/products");
              setProducts(res.data);
              return res.data;
            } catch (err) {}
          };
          getAllProducts();

    },[])

    return (
        <>
        <Carousel 
            animation='fade'
            NextIcon={<ArrowForwardIosRoundedIcon />}
            PrevIcon={<ArrowBackIosRoundedIcon />}
            navButtonsProps={{
                style: {
                    backgroundColor: 'cornflowerblue',
                    borderRadius: '50%'
                }
            }}
            indicatorIconButtonProps={{
                style: {
                    padding: '10px',    // 1
                    color: 'white'       // 3
                }
            }}
            activeIndicatorIconButtonProps={{
                style: {
                    transition: 'all .3s ease-out',
                    transform: 'scale(1.5)'
                }
            }}
        
            >
            {products.length > 0 && (
                products.map( product => (
                    <CarouselItem elevation={3} key={product._id}>
                        <div className="carousel-img" >
                            <img src={product.img} alt={product.name}></img>
                        </div> 
                        <div className="info">
                            <div className="name">
                                <h3>{product.name}</h3>
                                <p>{product.author}</p>
                            </div>
                            <div>
                                <Button href = {"/productpage/" + product._id} >Buy Now <ArrowForwardIosRoundedIcon /> </Button>
                            </div>
                        </div>
                    </CarouselItem>
                ))
            )}
        </Carousel>
        </>
    )
}


export default ProductCarousel;