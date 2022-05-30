import React from "react";
import './CancelPopUp.css';
import { useState } from "react";

const CancelPopup = props => {

    const [text, setText] = useState(null);
    const [id, setId] = useState(null);



    function cancelOrder(){
        alert("Your order has been cancelled");
        window.location.reload();
    }

  return (
    <div className="popup-box">
      <div className="box">
            <span className="close-icon" onClick={props.handleClose}>x</span>
            <h style={{color:'#FAFAFA', fontSize:'20px', fontFamily:'OpenSans', marginLeft:'20%'}}>Please explain your cancelation reason</h>

            <button onClick={cancelOrder} style={{
            fontFamily:'OpenSans', 
            border:'solid',
            outline:'none', 
            borderWidth:'1px',
            borderRadius:'5px',
            width:'50px',
            fontSize:'20px',
            backgroundColor:'lightgreen'
            }}>YES</button>

            <button onClick={props.handleClose} style={{
                fontFamily:'OpenSans', 
                border:'solid',
                outline:'none', 
                borderWidth:'1px',
                borderRadius:'5px',
                width:'50px',
                fontSize:'20px',
                backgroundColor:'red'
            }}>NO</button>
        </div>
    </div>
        );
};

export default CancelPopup;