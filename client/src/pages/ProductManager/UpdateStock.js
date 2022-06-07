import React, { Component, useState, useEffect } from "react";
import { Container, Card } from "react-bootstrap";
import { Button } from "@material-ui/core";
import "./ProductManager.css";
import TextField from "@material-ui/core/TextField";
import axios from "axios";
import { useSelector } from "react-redux";
import { toast } from "react-toastify";

const UpdateStock = () => {
  const currUser = useSelector((state) => state.user.currentUser);

  const [stock1, setstock1] = useState(null);
  const [allproducts, setAll] = useState([]);
  const [index, setIndex] = useState(null);

  function handleChange2(event) {
    setstock1(event.target.value);
  }

  useEffect(() => {
    const getAllProducts = async () => {
      try {
        const res = await axios.get("http://localhost:5001/api/products");
        setAll(res.data);
      } catch (err) {}
    };
    getAllProducts();
  }, []);

  const clickSubmit = async () => {
    const update = {
      product_id: allproducts[index]._id,
      stock: stock1,
    };

    try {
      axios.post(
        "http://localhost:5001/api/productmanager/changestock",
        update,
        {
          headers: { token: "Bearer " + currUser.accessToken },
        }
      );
      toast.success("Your information has been updated successfully", {
        position: toast.POSITION.TOP_CENTER,
      });
    } catch (err) {
      toast.error(err, {
        position: toast.POSITION.TOP_CENTER,
        autoClose: 1500,
      });
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
              UPDATE STOCK
            </legend>
            <div
              style={{
                marginLeft: "50px",
                display: "flex",
                justifyContent: "space-between",
              }}
            >
              <select
                onClick={(e) => setIndex(e.target.value)}
                style={{
                  borderRadius: "5px",
                  width: "315px",
                  borderColor: "lightgray",
                }}
              >
                <option value="none" selected disabled hidden>
                  Select Product ID
                </option>
                {allproducts.map((item, i) => {
                  return (
                    <option value={i}>
                      {item.name + "- Current Stock: " + item.amount}
                    </option>
                  );
                })}
              </select>

              <TextField
                id="stock"
                type="number"
                InputProps={{ inputProps: { min: 0, max: 100 } }}
                onKeyDown={(e) => e.preventDefault()}
                label="STOCK"
                margin="normal"
                onChange={handleChange2}
                style={{ width: "100%" }}
              />
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

export default UpdateStock;
