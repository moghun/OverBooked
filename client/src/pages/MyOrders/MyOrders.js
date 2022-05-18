import React,{useEffect, useState} from "react";
import "../MyOrders/MyOrders.css";
import { useSelector } from "react-redux";
import axios from "axios";

const MyOrders = () => {

  const currUser = useSelector((state) => state.user.currentUser)

  const [isOpen, setIsOpen] = useState(false);
  const [orders, setOrder] = useState([]);
  const [items, setItems] = useState([]);
  
  
 
  const togglePopup = (key) => {
    setIsOpen(!isOpen);
    console.log(isOpen)
  }

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


  
  
  useEffect(() => {getOrders()},[currUser]);

  console.log(orders)
  
  function orderStatus(item){
    if(item === "delivered"){
      return(<input disabled="disabled" type = "text" value={item} style={{color:'black',borderRadius:"10px",backgroundColor: 'lightgreen',textAlign:'center',marginLeft: '20px', width:"100px"}} readonly></input>);
    }
    else if(item === "in-transit"){
      return(<input disabled="disabled" type = "text" value={item} style={{color:'black',borderRadius:"10px",backgroundColor: 'yellow',textAlign:'center',marginLeft: '20px', width:"100px"}} readonly></input>);
    }
    else{
      return(<input disabled="disabled" type = "text" value={item} style={{color:'black',borderRadius:"10px",backgroundColor: 'orange',textAlign:'center',marginLeft: '20px', width:"100px"}} readonly></input>);
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
              if(isOpen){
                return(
                <div style={{backgroundColor: "aliceblue", borderRadius:'10px'}}>
                  <div key = {order._id} className="order-column"style={{padding: '10px', margin:'20px'}}>
                    <h style={{marginLeft: '25px', fontWeight:'bold', marginRight:-20}}>Order ID:</h>
                    <h style={{marginLeft: '25px'}}>{order._id}</h>
                    <h style={{marginLeft: '25px',marginRight:-20, fontWeight:'bold'}}>Order Date: </h>
                    <h style={{marginLeft: '25px'}}>{order.updatedAt}</h>
                    {orderStatus(order.status)}
                    <h style={{marginLeft: '15px', fontSize:'16px'}}><strong>Total:</strong> {order.cost} USD</h>
                    <button onClick={togglePopup} style={{borderRadius:'5px', backgroundColor:'lightgray', marginLeft:'10px', padding:'5px'}}>Details</button>
                    
                  </div>
                  <div>
                    <hr color="black" style={{width:'90%', marginLeft:'5%', borderWidth:'1.5px', borderColor:'black'}}></hr>
                    {order.bought_products.map((bitem, i) =>
                    {
                      return(
                        <div style={{marginTop:'5px'}}>
                          <h style={{marginLeft:'50px', marginRight:'100px'}}><strong>Product Name:</strong> {bitem}</h>
                          <h><strong>Amount:</strong> {order.amounts[i]}</h>
                        </div>
                      );}
                    )}
                    </div>
                  </div>
            );
              }
              else{
                return(
                
                  <div key = {order._id} className="order-column"style={{padding: '10px', margin:'20px'}}>
                    <h style={{marginLeft: '25px', fontWeight:'bold', marginRight:-20}}>Order ID:</h>
                    <h style={{marginLeft: '25px'}}>{order._id}</h>
                    <h style={{marginLeft: '25px',marginRight:-20, fontWeight:'bold'}}>Order Date: </h>
                    <h style={{marginLeft: '25px'}}>{order.updatedAt}</h>
                    {orderStatus(order.status)}
                    <h style={{marginLeft: '15px', fontSize:'16px'}}><strong>Total:</strong> {order.cost} USD</h>
                    <button onClick={togglePopup} style={{borderRadius:'5px', backgroundColor:'lightgray', marginLeft:'10px', padding:'5px'}}>Details</button>
                    
                  </div>
            );
              }

            })      
                    
}
                
  
          </div>

        </div>
      </div>
      </div>
    )
  }


export default MyOrders;
