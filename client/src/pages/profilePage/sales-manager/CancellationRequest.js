import React, { useEffect, useState } from "react";
import "../../MyOrders/MyOrders.css";
import axios from "axios";
import { toast } from "react-toastify";
import { useSelector } from "react-redux";

const CancellationRequest = () => {
  const [allRequests, setAllrequest] = useState([]);
  const [requests, setRequest] = useState([]);
  const currUser = useSelector((state) => state.user.currentUser);

  const getAllRequests = async () => {
    try {
      const res = await axios.get("http://localhost:5001/api/orders/", {
        headers: { token: "Bearer " + currUser.accessToken },
      });
      setAllrequest(res.data);
    } catch (error) {}
  };

  const getRequests = () => {
    setRequest(allRequests.filter((c) => c.status === "Return Requested"));
    console.log(requests);
  };

  const Accept = (id) => {
    const OrderStruct = {
      status: "Returned",
    };
    try {
      axios.put(
        "http://localhost:5001/api/orders/approveReturn/" +
          currUser._id +
          "/" +
          id,
        OrderStruct,
        { headers: { token: "Bearer " + currUser.accessToken } }
      );
      toast.success("Return request has been approved.", {
        position: toast.POSITION.TOP_CENTER,
      });
      setTimeout(() => {
        window.location.reload();
      }, 1500);
    } catch (err) {
      console.log(err);
    }
  };

  const Reject = (id) => {
    const OrderStruct = {
      status: "Return Rejected",
    };
    try {
      axios.put(
        "http://localhost:5001/api/orders/rejectReturn/" +
          currUser._id +
          "/" +
          id,
        OrderStruct,
        { headers: { token: "Bearer " + currUser.accessToken } }
      );
      toast.success("Return request has been rejected.", {
        position: toast.POSITION.TOP_CENTER,
      });
      setTimeout(() => {
        window.location.reload();
      }, 1500);
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    getAllRequests();
  }, [currUser]);

  useEffect(() => {
    getRequests();
  }, [allRequests.length > 0]);

  return (
    <div className="orders-holder">
      <div className="Order-Row">
        <div className="orders-container">
          <div>
            {requests.length === 0 ? (
              <h1
                style={{
                  padding: "50px",
                  textAlign: "center",
                  fontFamily: "OpenSans",
                  color: "whitesmoke",
                }}
              >
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
                      value={"Email: " + order.buyer_email}
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
                      value={"Description: " + order.refundDescription}
                      style={{
                        color: "black",
                        borderRadius: "10px",
                        backgroundColor: "aliceblue",
                        marginLeft: "10px",
                        width: "300px",
                        height: "50px",
                        border: "none",
                        outline: "none",
                        resize: "none",
                        fontSize: "14px",
                      }}
                      readonly
                    ></textarea>

                    <button
                      onClick={(e) => {
                        Accept(e.target.value);
                      }}
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
                      onClick={(e) => {
                        Reject(e.target.value);
                      }}
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
              })
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default CancellationRequest;
