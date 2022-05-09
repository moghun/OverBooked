import React,{useEffect, useState} from "react";
import "../MyOrders/MyOrders.css";
import { useSelector } from "react-redux";
import axios from "axios";

/*
const Popup = props => {
  return (
    <div className="popup-box">
      <div className="box">
        <span className="close-icon" onClick={props.handleClose}>x</span>
        {props.content}
      </div>
    </div>
  );
};
*/
const MyOrders = () => {

  const currUser = useSelector((state) => state.user.currentUser)

  //const [isOpen, setIsOpen] = useState(false);
  const [orders, setOrder] = useState([]);
  
  
 /*
  const togglePopup = () => {
    setIsOpen(!isOpen);
  }
*/
  const getOrders = async () => {
    const userStruct = {buyer_email:currUser.email}
    try {

      const res = await axios.get(
        'http://localhost:5001/api/orders/find/'+currUser._id,
      {params:userStruct}
      
      );
      setOrder(res.data);
      
    } catch (error) {
      
    }

    
  }

  
/*
  const getProducts = (orderlist) => {
    let products = []
    for(let i = 0; i<orderList.length;i++){
        const editProduct = Product.findById(orderList[i]);
        products.push(editProduct);
    }
    return products;
  }
*/
  useEffect(() => {getOrders()},[currUser]);
  console.log(orders)
  //const product = getProducts(orderList);
  

  function orderStatus(item){
    if(item === "delivered"){
      return(<input disabled="disabled" type = "text" value={item} style={{color:'black',borderRadius:"10px",backgroundColor: 'lightgreen',textAlign:'center',marginLeft: '100px', width:"100px"}} readonly></input>);
    }
    else if(item === "in-transit"){
      return(<input disabled="disabled" type = "text" value={item} style={{color:'black',borderRadius:"10px",backgroundColor: 'yellow',textAlign:'center',marginLeft: '100px', width:"100px"}} readonly></input>);
    }
    else{
      return(<input disabled="disabled" type = "text" value={item} style={{color:'black',borderRadius:"10px",backgroundColor: 'orange',textAlign:'center',marginLeft: '100px', width:"100px"}} readonly></input>);
    }
  }

    
    return (
      <div className='orders-holder'>
  
      <div className='Row'>
  
        <div className='orders-container'>
          <div>
  
            {orders.length === 0
            ? <h1 style={{padding: "50px",textAlign:'center'}}>You have no order</h1>
            :
            
            orders.map((order) => {
              return(
              <div key = {order._id} className="order-column"style={{padding: '10px', margin:'20px'}}>
                      <h style={{marginLeft: '25px', fontWeight:'bold', marginRight:-20}}>Order ID:</h>
                      <h style={{marginLeft: '25px'}}>{order._id}</h>
                      <h style={{marginLeft: '25px',marginRight:-20, fontWeight:'bold'}}>Order Date: </h>
                      <h style={{marginLeft: '25px'}}>{order.updatedAt}</h>
                      {orderStatus(order.status)}
                      <h style={{marginLeft: '100px', fontWeight:'bold'}}>Total: {order.cost} USD</h>
                      
                    </div>
              );
            })      
                    
}
                
  
          </div>

        </div>
      </div>
      </div>
    )
  }


export default MyOrders;
