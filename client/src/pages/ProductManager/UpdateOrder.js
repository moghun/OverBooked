import { React, useEffect, useState } from "react";
import { Card } from "react-bootstrap";
import { Button } from "@material-ui/core";
import "./ProductManager.css";
import DropdownButton from "react-bootstrap/DropdownButton";
import Dropdown from "react-bootstrap/Dropdown";
import TextField from "@material-ui/core/TextField";
import axios from "axios";
import { useSelector } from "react-redux";

const UpdateOrder = () => {
  const currUser = useSelector((state) => state.user.currentUser);

  const [Status, setStatus] = useState(null);

  const [id, setID] = useState(null);

  const [orders, setOrder] = useState([]);

  const [index, setIndex] = useState(null);

  const getOrders = async () => {
    try {
      const res = await axios.get(
        "http://localhost:5001/api/orders",

        { headers: { token: "Bearer " + currUser.accessToken } }
      );
      setOrder(res.data);
    } catch (error) {}
  };

  useEffect(() => {
    getOrders();
  }, []);

  function handleChange1(event) {
    setID(event.target.value);
  }

  const clickSubmit = () => {
    const update = {
      status: Status,
      oid: orders[index]._id,
    };

    try {
      axios.post(
        "http://localhost:5001/api/productmanager/changestatus",
        update,
        {
          headers: { token: "Bearer " + currUser.accessToken },
        }
      );
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <div>
      <br />
      <Card
        style={{
          borderRadius: "30px",
          boxShadow: "0 0 5px #ccc",
          padding: "0 15px",
          width: "70%",
          marginLeft: "14%",
        }}
      >
        <br />
        <form className="form-horizontal">
          <fieldset>
            <legend
              className="pcontainer"
              style={{ color: "black", fontSize: "30px" }}
            >
              UPDATE ORDER
            </legend>
            <div
              style={{
                marginLeft: "50px",
                display: "flex",
                justifyContent: "space-between",
              }}
            >
              <label
                className="col-md-4 control-label"
                style={{
                  padding: "12px 20px",
                  background: "orange",
                  border: "none",
                  borderRadius: "30px",
                  fontWeight: "bold",
                  boxShadow: "0px 5px 10px lightblue",
                }}
              >
                ORDER ID
              </label>

              <select
                onClick={(e) => setIndex(e.target.value)}
                style={{
                  borderRadius: "5px",
                  width: "315px",
                  borderColor: "lightgray",
                }}
              >
                <option value="none" selected disabled hidden>
                  Select Order ID
                </option>
                {orders.map((item, i) => {
                  return <option value={i}>{item._id}</option>;
                })}
              </select>

              <div>
                <select
                  onClick={(e) => setStatus(e.target.value)}
                  style={{
                    borderRadius: "5px",
                    width: "150px",
                    borderColor: "lightgray",
                  }}
                >
                  <option value="In-transit">In-transit</option>
                  <option value="Delivered">Delivered</option>
                  <option value="Processing">Processing</option>
                </select>
              </div>
            </div>

            <br />

            <div className="row form-group" style={{ marginLeft: "50px" }}>
              <label className="col-md-4 control-label"></label>
              <div className="col-md-4">
                <Button variant="contained" color="grey" onClick={clickSubmit}>
                  {" "}
                  Update{" "}
                </Button>
                <Button variant="contained" color="grey" href="/profile">
                  {" "}
                  Cancel{" "}
                </Button>
              </div>
            </div>
          </fieldset>
        </form>
      </Card>
    </div>
  );
};

export default UpdateOrder;
