import React from "react";
import './Popup.css';
import { useState } from "react";

const Popup = props => {

    const [text, setText] = useState(null);

    function printText(){
        alert(text+ " " + props.id);
    }

  return (
    <div className="popup-box">
      <div className="box">
            <span className="close-icon" onClick={props.handleClose}>x</span>
            <h style={{fontSize:'20px', fontFamily:'OpenSans', marginLeft:'20%'}}>Please explain your cancelation reason</h>

            <div><textarea onChange={(e)=>{ setText(e.target.value)}} rows="4" cols="50" style={{resize:'none', width:'100%', outline:'none', borderRadius:'10px'}}></textarea></div>

            <button onClick={printText} style={{
            fontFamily:'OpenSans', 
            border:'solid',
            outline:'none', 
            borderWidth:'1px',
            borderRadius:'5px',
            width:'50px',
            backgroundColor:'white'
            }}>Send</button>
        </div>
    </div>
        );
};

export default Popup;