import React from "react";
import './CancelPopUp.css';
import { useState } from "react";
import axios from "axios";
import { useSelector } from "react-redux";
import { toast } from "react-toastify";

const CancelPopup = props => {

    const [id, setId] = useState(null);

    const currUser = useSelector((state) => state.user.currentUser);

    function deleteOrder() {
        try {
          axios.delete(
            "http://localhost:5001/api/orders/" + currUser._id + "/" + id,
            { headers: { token: "Bearer " + currUser.accessToken } }
          );
          toast.success("Your order has been cancelled.", {position: toast.POSITION.TOP_CENTER});
          setTimeout(()=>{window.location.reload()},1500)
         
        } catch (err) {
          console.log(err);
        }
      }

    function cancelOrder(){
        alert("Your order has been cancelled");
        
    }

  return (
    <div className="popup-box">
      <div className="boxboxbox">
            <span className="close-icon" onClick={props.handleClose}>x</span>
            <h style={{color:'#FAFAFA', fontSize:'20px', fontFamily:'OpenSans', marginLeft:'15%'}}>Do you really want to cancel your order? 😓</h>
            
            <div style={{marginTop:'5px'}}>
                <textarea
                    placeholder=" Verify your order id..."
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
                    }}>
                </textarea>
            </div>

            <div style={{display:'flex', marginTop:'5px'}}>
                <div>            
                    <button onClick={deleteOrder} style={{
                    fontFamily:'OpenSans', 
                    border:'solid',
                    outline:'none', 
                    borderWidth:'1px',
                    borderRadius:'5px',
                    marginLeft:'150px',
                    fontSize:'20px',
                    backgroundColor:'lightgreen'
                    }}>YES</button>
                </div>

                <div>
                    <button onClick={props.handleClose} style={{
                        fontFamily:'OpenSans', 
                        border:'solid',
                        outline:'none', 
                        borderWidth:'1px',
                        borderRadius:'5px',
                        marginLeft:'100px',
                        width:'50px',
                        fontSize:'20px',
                        backgroundColor:'red'
                    }}>NO</button>                
                </div>                
            </div>


        </div>
    </div>
        );
};

export default CancelPopup;