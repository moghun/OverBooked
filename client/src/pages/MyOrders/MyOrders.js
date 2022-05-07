import React from "react";
import "../MyOrders/MyOrders.css";

const MyOrders = () => {

  const orderList = [
    {date: "2022-05-03", status: "delivered", total: 99.90, oid: 123456} ,
    {date: "2022-05-03", status: "confirmed", total: 78.90, oid: 789456} ,
    {date: "2022-05-03", status: "shipped", total: 25.90, oid: 193782} 
  ]


  function orderStatus(item){
    if(item === "delivered"){
      return(<input disabled="disabled" type = "text" value={item} style={{color:'black',borderRadius:"10px",backgroundColor: 'lightgreen',textAlign:'center',marginLeft: '100px', width:"100px"}} readonly></input>);
    }
    else if(item === "shipped"){
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
  
            {orderList.length === 0 
            ? <h1 style={{padding: "50px",textAlign:'center'}}>You have no order</h1>
            :
            orderList.map((item)=>{
                  return (
                  
                    <div className="order-column"style={{padding: '10px', margin:'20px'}}>
                      <h style={{marginLeft: '25px', fontWeight:'bold', marginRight:-20}}>Order ID:</h>
                      <h style={{marginLeft: '25px'}}>{item.oid}</h>
                      <h style={{marginLeft: '25px',marginRight:-20, fontWeight:'bold'}}>Order Date: </h>
                      <h style={{marginLeft: '25px'}}>{item.date}</h>
                      {orderStatus(item.status)}
                      <h style={{marginLeft: '100px', fontWeight:'bold'}}>Total: {item.total} TL</h>
                      <input type = "submit" value = "Details"  style={{marginLeft: '100px', width:"50px",borderRadius:'5px'}}/>
                    </div>
                );})}
  
          </div>
        </div>
      </div>
      </div>
    )
  }


export default MyOrders;
