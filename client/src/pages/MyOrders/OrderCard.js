import React from "react";
import { useState } from "react";

export default function OrderCard(props) {
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

  const [isOpen, setIsOpen] = useState(false);

  const togglePopup = (key) => {
    setIsOpen(!isOpen);
  };

  return (
    <div>
      {isOpen ? (
        <div
          style={{
            backgroundColor: "aliceblue",
            borderRadius: "10px",
            margin: "20px",
          }}
        >
          <div
            key={props._id}
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
            <h style={{ marginLeft: "25px" }}>{props._id}</h>
            <h
              style={{
                marginLeft: "25px",
                marginRight: -20,
                fontWeight: "bold",
              }}
            >
              Order Date:{" "}
            </h>
            <h style={{ marginLeft: "25px" }}>{props.updatedAt}</h>
            {orderStatus(props.status)}
            <h style={{ marginLeft: "15px", fontSize: "16px" }}>
              <strong>Total:</strong> {props.cost} USD
            </h>
            <button
              onClick={togglePopup}
              style={{
                borderRadius: "5px",
                backgroundColor: "lightgray",
                marginLeft: "10px",
                padding: "5px",
              }}
            >
              Details
            </button>
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
            {props.bought_products.map((bitem, i) => {
              return (
                <div style={{ marginTop: "5px" }}>
                  <h style={{ marginLeft: "50px", marginRight: "100px" }}>
                    <strong>Product Name:</strong> {bitem}
                  </h>
                  <h>
                    <strong>Amount:</strong> {props.amounts[i]}
                  </h>
                </div>
              );
            })}
          </div>
        </div>
      ) : (
        <div
          key={props._id}
          className="order-column"
          style={{ padding: "10px", margin: "20px" }}
        >
          <h
            style={{ marginLeft: "25px", fontWeight: "bold", marginRight: -20 }}
          >
            Order ID:
          </h>
          <h style={{ marginLeft: "25px" }}>{props._id}</h>
          <h
            style={{ marginLeft: "25px", marginRight: -20, fontWeight: "bold" }}
          >
            Order Date:{" "}
          </h>
          <h style={{ marginLeft: "25px" }}>{props.updatedAt}</h>
          {orderStatus(props.status)}
          <h style={{ marginLeft: "15px", fontSize: "16px" }}>
            <strong>Total:</strong> {props.cost} USD
          </h>
          <button
            onClick={togglePopup}
            style={{
              borderRadius: "5px",
              backgroundColor: "lightgray",
              marginLeft: "10px",
              padding: "5px",
            }}
          >
            Details
          </button>
        </div>
      )}
    </div>
  );
}
