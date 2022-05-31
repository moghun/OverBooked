import React, { useEffect, useState } from "react";
import "../MyOrders/MyOrders.css";
import { useSelector } from "react-redux";
import axios from "axios";
import Popup from "./Popup";
import { publicRequest } from "../requestMethods";
import CancelPopup from "./CancelPopUp";

const MyOrders = () => {
  const currUser = useSelector((state) => state.user.currentUser);

  const [isOpen, setIsOpen] = useState(false);
  const [index, setIndex] = useState(null);
  const [orders, setOrder] = useState([]);
  const [productNames, setProductNames] = useState([]);
  const [isNamesSet, setNames] = useState(false);
  const [popupOpen, setPopup] = useState(false);
  const [cancelpopup, setCancelPopUp] = useState(false);


  const togglePopup = (key) => {
    if (key !== index && index !== null && isOpen === true) {
      setIndex(key);
    } else if (key !== index && index !== null && isOpen === false) {
      setIndex(key);
      setIsOpen(!isOpen);
    } else if (index === null) {
      setIndex(key);
      setIsOpen(!isOpen);
    } else if (key === index) {
      setIsOpen(!isOpen);
    }
  };

  async function getProductName() {
    var products = [];
    for (let i = 0; i < orders.length; i++) {
      products.push([]);
      for (let j = 0; j < orders[i].bought_products.length; j++) {
        try {
          var id = orders[i].bought_products[j];
          const res = await publicRequest.get("/products/find/" + id);
          products[i].push(res.data.name);
        } catch {}
      }
    }
    setProductNames(products);
  }

  const openPopup = () => {
    setPopup(!popupOpen);
  };

  const openCancel = () => {
    setCancelPopUp(!cancelpopup);
  }

  const getOrders = async () => {
    const userStruct = { buyer_email: currUser.email };
    try {
      const res = await axios.get(
        "http://localhost:5001/api/orders/find/" + currUser._id,
        { params: userStruct }
      );
      setOrder(res.data);
    } catch (error) {}
  };

  useEffect(() => {
    getOrders();
  }, [currUser]);
  
  useEffect(() => {
    getProductName();
    setNames(true);
  }, [orders.length > 0, !isNamesSet]);

  function orderStatus(item) {
    if (item === "Delivered") {
      return (
        <input
          disabled="disabled"
          type="text"
          value={item}
          style={{
            color: "black",
            borderRadius: "10px",
            backgroundColor: "lightgreen",
            textAlign: "center",
            marginLeft: "20px",
            width: "100px",
          }}
          readonly
        ></input>
      );
    } else if (item === "In-transit") {
      return (
        <input
          disabled="disabled"
          type="text"
          value={item}
          style={{
            color: "black",
            borderRadius: "10px",
            backgroundColor: "yellow",
            textAlign: "center",
            marginLeft: "20px",
            width: "100px",
          }}
          readonly
        ></input>
      );
    } else {
      return (
        <input
          disabled="disabled"
          type="text"
          value={item}
          style={{
            color: "black",
            borderRadius: "10px",
            backgroundColor: "orange",
            textAlign: "center",
            marginLeft: "20px",
            width: "100px",
          }}
          readonly
        ></input>
      );
    }
  }


  function cancelRefund(item, date){
    var orderdate = new Date(date);
    var today = new Date();
    var difference = today.getTime() - orderdate.getTime();
    var days = Math.floor(difference / (1000 * 3600 * 24));

    if(item === "Delivered" && (days <= 30)){
      return(
      <button onClick={openPopup} style={{ borderRadius: "5px", backgroundColor: "lightgray", marginLeft: "10px", padding: "5px",}}>
        Refund
      </button>
    )}
    
    else if(item === "Processing"){ 
      return(
      <button onClick={openCancel} style={{ borderRadius: "5px", backgroundColor: "lightgray", marginLeft: "10px", padding: "5px",}}>
        Cancel
      </button>
      )} 
    }
  

  return (
    <div className="orders-holder">
      <div className="Order-Row">
        <div className="orders-container">
          <div>
            {orders.length === 0 ? (
              <h1 style={{ padding: "50px", textAlign: "center" }}>
                You have no order
              </h1>
            ) : (
              orders.map((order, i) => {
                if (isOpen && i === index) {
                  return (
                    <div
                      style={{
                        backgroundColor: "aliceblue",
                        borderRadius: "10px",
                        margin: "20px",
                        width:'1019px'
                      }}
                    >
                      <div
                        key={order._id}
                        className="order-column"
                        style={{ padding: "5px", margin: "20px"  }}
                      >
                        <input
                          disabled="disabled"
                          type="text"
                          value={"Order ID: " + order._id}
                          style={{
                            color: "black",
                            borderRadius: "10px",
                            backgroundColor: "aliceblue",
                            marginLeft: "10px",
                            width: "350px",
                            border:'none',
                            outline:'none'
                          }}
                          readonly
                      ></input>
                      <input
                          disabled="disabled"
                          type="text"
                          value={"Order Date: " + order.updatedAt.substring(0,order.updatedAt.indexOf("T"))}
                          style={{
                            color: "black",
                            borderRadius: "10px",                         
                            backgroundColor: "aliceblue",
                            marginLeft: "10px",
                            width: "200px",
                            border:'none',
                            outline:'none'
                          }}
                          readonly
                      ></input>
                      {orderStatus(order.status)}
                      <input
                          disabled="disabled"
                          type="text"
                          value={"Total: " + order.cost + " USD"}
                          style={{
                            color: "black",
                            borderRadius: "10px",
                            backgroundColor: "aliceblue",
                            marginLeft: "10px",
                            width: "150px",
                            border:'none',
                            outline:'none'
                          }}
                          readonly
                      ></input>
                      <button
                        onClick={() => {
                          togglePopup(i);
                        }}
                        style={{
                          borderRadius: "5px",
                          backgroundColor: "lightgray",
                          marginLeft: "10px",
                          padding: "5px",
                        }}
                      >
                        Details
                      </button>
                        {cancelRefund(order.status, order.updatedAt)}
                      </div>
                      <div>
                        <hr
                          color="black"
                          style={{
                            width: "95%",
                            marginLeft: "2.5%",
                            borderWidth: "1.5px",
                            borderColor: "black",
                          }}
                        ></hr>
                        {order.bought_products.map((bitem, j) => {
                          return (
                            <div style={{ marginTop: "5px", display:'flex' }}>

                              <input
                                disabled="disabled"
                                type="text"
                                value={"Product Name: " + productNames[i][j]}
                                style={{
                                  color: "black",
                                  borderRadius: "10px",
                                  backgroundColor: "aliceblue",
                                  marginLeft: "30px",
                                  width: "500px",
                                  border:'none',
                                  outline:'none'
                                  }}
                                  readonly
                                ></input>
                              <input
                                disabled="disabled"
                                type="text"
                                value={"Amount: " + order.amounts[j]}
                                style={{
                                  color: "black",
                                  borderRadius: "10px",
                                  backgroundColor: "aliceblue",
                                  marginLeft: "10px",
                                  width: "500px",
                                  border:'none',
                                  outline:'none'
                                  }}
                                  readonly
                                ></input>                              

                            </div>
                          );
                        })}
                      </div>
                    </div>
                  );
                } else {
                  return (
                    <div
                      key={order._id}
                      className="order-column"
                      style={{ padding: "10px", margin: "20px" }}
                    >
                      <input
                          disabled="disabled"
                          type="text"
                          value={"Order ID: " + order._id}
                          style={{
                            color: "black",
                            borderRadius: "10px",                           
                            backgroundColor: "aliceblue",
                            marginLeft: "10px",
                            width: "350px",
                            border:'none',
                            outline:'none'
                          }}
                          readonly
                      ></input>
                      <input
                          disabled="disabled"
                          type="text"
                          value={"Order Date: " + order.updatedAt.substring(0,order.updatedAt.indexOf("T"))}
                          style={{
                            color: "black",
                            borderRadius: "10px",
                            backgroundColor: "aliceblue",
                            marginLeft: "10px",
                            width: "200px",
                            border:'none',
                            outline:'none'
                          }}
                          readonly
                      ></input>
                      {orderStatus(order.status)}
                      <input
                          disabled="disabled"
                          type="text"
                          value={"Total: " + order.cost + " USD"}
                          style={{
                            color: "black",
                            borderRadius: "10px",
                            backgroundColor: "aliceblue",
                            marginLeft: "10px",
                            width: "150px",
                            border:'none',
                            outline:'none'
                          }}
                          readonly
                      ></input>
                      <button
                        onClick={() => {
                          togglePopup(i);
                        }}
                        style={{
                          borderRadius: "5px",
                          backgroundColor: "lightgray",
                          marginLeft: "10px",
                          padding: "5px",
                        }}
                      >
                        Details
                      </button>
                      {cancelRefund(order.status, order.updatedAt)}
                      {popupOpen ? (
                        <Popup handleClose={openPopup} />
                      ) : (
                        ""
                      )}
                      {cancelpopup ? (
                        <CancelPopup handleClose={openCancel} />
                      ) : (
                        ""
                      )}
                    </div>
                  );
                }
              })
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

export default MyOrders;
