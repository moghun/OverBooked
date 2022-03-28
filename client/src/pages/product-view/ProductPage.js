import React from 'react';

const DetailsThumb = ({products}) => {
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

                    {products.amount !== 0 ? <><input type = "number" className='addcount' min="1" max = {products.amount}></input> <button className="cart">Add to cart</button></> : <p style={{fontWeight: "bold"}}>SOLD OUT</p>}           
                     
                    
                </div>
            </div>
        </div>
    )
}

export default DetailsThumb
