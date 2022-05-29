import React from "react";
import "./Popup.css";
import { useState } from "react";
import axios from "axios";
import { useSelector } from "react-redux";

const Popup = (props) => {
  const [text, setText] = useState(null);
  const [id, setId] = useState(null);

  const currUser = useSelector((state) => state.user.currentUser);

  function deleteOrder() {
    try {
      axios.delete(
        "http://localhost:5001/api/orders/" + currUser._id + "/" + id
      );
      alert("Order Canceled");
    } catch (err) {
      console.log(err);
    }
  }

  function printText() {
    alert(text + " " + id);
  }

  return (
    <div className="popup-box">
      <div className="box">
        <span className="close-icon" onClick={props.handleClose}>
          x
        </span>
        <h
          style={{
            color: "#FAFAFA",
            fontSize: "20px",
            fontFamily: "OpenSans",
            marginLeft: "20%",
          }}
        >
          Please explain your cancelation reason
        </h>

        <div>
          <textarea
            placeholder=" Type your order id..."
            onChange={(e) => {
              setId(e.target.value);
            }}
            rows="1"
            cols="50"
            style={{
              resize: "none",
              width: "100%",
              outline: "none",
              borderRadius: "10px",
            }}
          ></textarea>
        </div>
        <div>
          <textarea
            placeholder=" Type your reasoning..."
            onChange={(e) => {
              setText(e.target.value);
            }}
            rows="4"
            cols="50"
            style={{
              resize: "none",
              width: "100%",
              outline: "none",
              borderRadius: "10px",
            }}
          ></textarea>
        </div>

        <button
          onClick={deleteOrder}
          style={{
            fontFamily: "OpenSans",
            border: "solid",
            outline: "none",
            borderWidth: "1px",
            borderRadius: "5px",
            width: "50px",
            fontSize: "20px",
            backgroundColor: "white",
          }}
        >
          Send
        </button>
      </div>
    </div>
  );
};

export default Popup;
