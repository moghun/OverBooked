import { Container } from '@material-ui/core';
import React, { useEffect, useRef } from 'react';
import ProductCarousel from './ProductCarousel';
import { Heading, Main } from './HomeMain';
import "../wishlist/Wishlist.css";



const HomeMain1 = () => {

    let headingRef = useRef(null);


    return (
        <div className='home-main'>
            <Container maxWidth={'lg'}>
                <Main ref={el => headingRef = el}>
                    <Heading >
                        Lose yourself between the lines!
                        Select from a wide range of books.
                    </Heading>
                    
                    <div style={{width: '40%'}}>
                        <ProductCarousel />
                    </div>
                </Main>
            </Container>
            <div className="back-blur"></div>
        </div>
    )
}

export default HomeMain1;