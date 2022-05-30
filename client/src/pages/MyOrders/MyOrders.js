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
    if (item === "delivered") {
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
    } else if (item === "in-transit") {
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


  function cancelRefund(item){
    if(item === "Delivered"){
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
                      }}
                    >
                      <div
                        key={order._id}
                        className="order-column"
                        style={{ padding: "10px", margin: "20px" }}
                      >
                        <h
                          style={{
                            marginLeft: "25px",
                            fontWeight: "bold",
                            marginRight: -20,
                          }}
                        >
                          Order ID:
                        </h>
                        <h style={{ marginLeft: "25px" }}>{order._id}</h>
                        <h
                          style={{
                            marginLeft: "25px",
                            marginRight: -20,
                            fontWeight: "bold",
                          }}
                        >
                          Order Date:{" "}
                        </h>
                        <h style={{ marginLeft: "25px" }}>{order.updatedAt}</h>
                        {orderStatus(order.status)}
                        <h style={{ marginLeft: "15px", fontSize: "16px" }}>
                          <strong>Total:</strong> {order.cost} USD
                        </h>
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
                        {cancelRefund(order.status)}
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
                            <div style={{ marginTop: "5px" }}>
                              <h
                                style={{
                                  marginLeft: "50px",
                                  marginRight: "100px",
                                }}
                              >
                                <strong>Product Name:</strong>{" "}
                                {productNames[i][j]}
                              </h>
                              <h>
                                <strong>Amount:</strong> {order.amounts[j]}
                              </h>
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
                      <h
                        style={{
                          marginLeft: "25px",
                          fontWeight: "bold",
                          marginRight: -20,
                        }}
                      >
                        Order ID:
                      </h>
                      <h style={{ marginLeft: "25px" }}>{order._id}</h>
                      <h
                        style={{
                          marginLeft: "25px",
                          marginRight: -20,
                          fontWeight: "bold",
                        }}
                      >
                        Order Date:{" "}
                      </h>
                      <h style={{ marginLeft: "25px" }}>{order.updatedAt}</h>
                      {orderStatus(order.status)}
                      <h style={{ marginLeft: "15px", fontSize: "16px" }}>
                        <strong>Total:</strong> {order.cost} USD
                      </h>
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
                      {order.status === "Delivered" ? (
                        <button
                          onClick={openPopup}
                          style={{
                            borderRadius: "5px",
                            backgroundColor: "lightgray",
                            marginLeft: "10px",
                            padding: "5px",
                          }}
                        >
                          Refund
                        </button>
                      ) : (
                        <button
                          onClick={openPopup}
                          style={{
                            borderRadius: "5px",
                            backgroundColor: "lightgray",
                            marginLeft: "10px",
                            padding: "5px",
                          }}
                        >
                          Cancel
                        </button>
                      )}
                      {popupOpen ? (
                        <Popup id={orders[i]._id} handleClose={openPopup} />
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
