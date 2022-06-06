
import { React,useEffect, useState } from "react";
import './ProductManager.css';
import axios from "axios";
import { useSelector } from "react-redux";
import {toast} from "react-toastify";

const UpdateOrder = () => {


  const currUser = useSelector((state) => state.user.currentUser);
  const [orders, setOrder] = useState([]);

  const getOrders = async () => {

    try {
      const res = await axios.get(
        "http://localhost:5001/api/orders",
        
          { headers: { token: "Bearer " + currUser.accessToken }},
      );
      let carrier = [];
      res.data.forEach(element => {
        if(element.status === "Processing" || element.status === "In-transit"){
          carrier.push(element);
        }
      });
      setOrder(carrier);
    } catch (error) {}
  };

  useEffect(() => {
    getOrders();
  }, []);

  console.log(orders);
  const changeIntransit = (id) => {

    const update = {
      status:  "In-transit",
      oid: id,
    };

    try {

      axios.post("http://localhost:5001/api/productmanager/changestatus", update,{
        headers: { token: "Bearer " + currUser.accessToken },
      });
      toast.success("Order status changed successfully.", {position: toast.POSITION.TOP_CENTER, });
      setTimeout(() => { window.location.reload();}, 1500);
    } catch (err) {

      console.log(err);
      toast.error("Failed to change order status!", {position: toast.POSITION.TOP_CENTER,});
      setTimeout(() => {window.location.reload();}, 1500);
    }
  };

  const changeDelivered = (id) => {

    const update = {
      status:  "Delivered",
      oid: id,
    };

    try {

      axios.post("http://localhost:5001/api/productmanager/changestatus", update,{
        headers: { token: "Bearer " + currUser.accessToken },
      });
      toast.success("Order status changed successfully.", {position: toast.POSITION.TOP_CENTER,});
      setTimeout(() => {window.location.reload();}, 1500);

    } catch (err) {

      console.log(err);toast.error("Failed to change order status!", {position: toast.POSITION.TOP_CENTER,});
      setTimeout(() => {window.location.reload();}, 1500);
    }
  };

    return (
      <div className="approval-holder">
      <div className="Row">
        <div className="approval-container">
          <div>
            {orders.length === 0 ? (
              <h1 style={{ padding: "50px", textAlign: "center",  outline:'none', border:'none', color:"#FAFAFA" }}>
                You have no order waiting status update
              </h1>
            ) : (
              orders.map((item) => (
                <div
                  key={item.order_id}
                  className="approval-column"
                  style={{ padding: "10px", margin: "20px" }}
                >

                    <input
                      disabled="disabled"
                      type="text"
                      value={"ID: " + item._id}
                      style={{
                        color: "black",
                        borderRadius: "10px",
                        backgroundColor: "aliceblue",
                        marginLeft: "10px",
                        width: "325px",
                        border: "none",
                        outline: "none",
                      }}
                      readonly
                    ></input>
                    <input
                      disabled="disabled"
                      type="text"
                      value={"Buyer: " + item.buyer_email}
                      style={{
                        color: "black",
                        borderRadius: "10px",
                        backgroundColor: "aliceblue",
                        marginLeft: "10px",
                        width: "325px",
                        border: "none",
                        outline: "none",
                      }}
                      readonly
                    ></input>
                    <input
                      disabled="disabled"
                      type="text"
                      value={item.status}
                      style={{
                        color: "black",
                        borderRadius: "10px",
                        backgroundColor: "aliceblue",
                        marginLeft: "10px",
                        width: "100px",
                        border: "none",
                        outline: "none",
                      }}
                      readonly
                    ></input>

                  <input
                    type="submit"
                    onClick={()=> changeIntransit(item._id)}
                    value="In-transit"
                    style={{
                      backgroundColor: "lightgray",
                      marginLeft: "50px",
                      width: "100px",
                      borderRadius: "5px",
                      outline:'none',
                      border:'none'
                    }}
                  />
                  <input
                    type="submit"
                    onClick={() => changeDelivered(item._id)}
                    value="Delivered"
                    style={{
                      backgroundColor: "lightgray",
                      marginLeft: "25px",
                      width: "100px",
                      borderRadius: "5px",
                      outline:'none',
                      border:'none'
                    }}
                  />
                </div>
              ))
            )}
          </div>
        </div>
      </div>
      </div>


    )


};

export default UpdateOrder;