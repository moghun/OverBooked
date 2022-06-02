import React from "react";
import "./Popup.css";
import { useState } from "react";
import axios from "axios";
import { useSelector } from "react-redux";
import { toast } from "react-toastify";

const Popup = (props) => {
  const [text, setText] = useState(null);
  const [id, setId] = useState(null);

  const currUser = useSelector((state) => state.user.currentUser);

  function returnOrder() {
    const OrderStruct = {
      status: "Return Requested",
      refundDescription: text,
    };
    try {
      axios.put(
        "http://localhost:5001/api/orders/requestReturn/" +
          currUser._id +
          "/" +
          id,
        OrderStruct,
        { headers: { token: "Bearer " + currUser.accessToken } }
      );
      toast.success("Your order has been cancelled.", {
        position: toast.POSITION.TOP_CENTER,
      });
      setTimeout(() => {
        window.location.reload();
      }, 1500);
    } catch (err) {
      console.log(err);
    }
  }

  return (
    <div className="popup-box">
      <div className="boxboxbox">
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
          onClick={returnOrder}
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
