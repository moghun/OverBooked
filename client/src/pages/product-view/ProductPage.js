import React from 'react';

const DetailsThumb = () => {

    const [products, setProduct] = useState(
        [{
        "_id": "1",
        "title": "Ay Zalim Bir Sevgilidir",
        "src": "http://www.ithaki.com.tr/wp-content/uploads/2017/06/Ay-Zalim-Bir-Sevgilidir.jpg",
        "price": "23.99 TL",
        "content": "Ay’ı Dünya’dan kontrol eden Otorite’ye karşı, yalnızca mahkûm ve sürgünlerin gönderildiği ceza kolonisine dönüşmüş Ay’daki isyanın ve devrimin öyküsü bu.",
        "count": 1,
        "author": "Robert A. Heinlein",
        "publisher": "İthaki Yayınları",
        "amount": 10
      }]);
      
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
