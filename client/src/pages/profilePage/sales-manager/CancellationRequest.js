import React, {useEffect ,useState} from 'react';
import "../../MyOrders/MyOrders.css";

const CancellationRequest = () => {




  const Accept = (e) => {
    alert(e)
  }

  const Reject = (e) => {
    alert(e)
  }

    const requests= [{username: "Mehmet", _id:"629606c04232bad5ba67d7b7", refundDescription:"sevemedim ürünü iade etmek istiyorum"}];
    return (
        <div className="orders-holder">
          <div className="Order-Row">
            <div className="orders-container">
              <div>
                {requests.length === 0 ? (
                  <h1 style={{ padding: "50px", textAlign: "center", fontFamily:'OpenSans', color:"whitesmoke" }}>
                    There is no cancellation or refund request!
                  </h1>
                ) : (
                  requests.map((order, i) => {
                      return (
                        <div
                          key={order._id}
                          className="order-column"
                          style={{ padding: "10px", margin: "20px" }}
                          value={order._id}
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
                              border: "none",
                              outline: "none",
                            }}
                            readonly
                          ></input>
                          <input
                            disabled="disabled"
                            type="text"
                            value={
                              "Username: " + order.username
                            }
                            style={{
                              color: "black",
                              borderRadius: "10px",
                              backgroundColor: "aliceblue",
                              marginLeft: "10px",
                              width: "200px",
                              border: "none",
                              outline: "none",
                            }}
                            readonly
                          ></input>
                          <textarea
                          
                            disabled="disabled"
                            type="text"
                            value={
                              "Description: " + order.refundDescription
                              
                            }
                            style={{
                              color: "black",
                              borderRadius: "10px",
                              backgroundColor: "aliceblue",
                              marginLeft: "10px",
                              width: "300px",
                              height: "50px",
                              border: "none",
                              outline: "none",
                              resize:"none",
                              fontSize:"14px"
                            }}
                            readonly
                            
                          ></textarea>
                          
                          <button
                            onClick={(e) => {Accept(e.target.value)}}
                            value={order._id}
                            style={{
                              borderRadius: "5px",
                              backgroundColor: "lightgray",
                              marginLeft: "10px",
                              padding: "5px",
                            }}
                          >
                            Accept
                          </button>
                          <button
                          value={order._id}
                            onClick={(e)=> {Reject(e.target.value)}}
                            style={{
                              borderRadius: "5px",
                              backgroundColor: "lightgray",
                              marginLeft: "10px",
                              padding: "5px",
                            }}
                          >
                            Reject
                          </button>

                        </div>
                      );
                    }
                  )
                )}
              </div>
            </div>
          </div>
        </div>
      );
}

export default CancellationRequest
