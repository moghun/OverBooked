import React, { Component, useState, useEffect } from "react";
import { Container, Card } from "react-bootstrap";
import { Button } from "@material-ui/core";
import "./ProductManager.css";
import TextField from "@material-ui/core/TextField";
import axios from "axios";
import { useSelector } from "react-redux";
import { toast } from "react-toastify";

const AddCategory = () => {
  const currUser = useSelector((state) => state.user.currentUser);


  const [category, setCategory] = useState(null);


  function handleChange(event) {
    setCategory(event.target.value);
    console.log(category);
  }


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
      toast.success("You have added a category", {
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
              ADD CATEGORY
            </legend>



            <div style = {{marginLeft: '300px'}}>
            <TextField
                id="category"
                placeholder="CATEGORY"
                required
                type="text"
                style={{ width: "50%" }}
                onChange={handleChange}
              />

              </div>

            <br />

            <div className="row form-group" style={{ marginLeft: "50px" }}>
              <label className="col-md-4 control-label"></label>
              <div className="col-md-4">
                <Button variant="contained" color="grey" onClick={clickSubmit}>
                  Add
                </Button>
                <Button variant="contained" color="grey" href="/profile">
                  Cancel
                </Button>
              </div>
            </div>
          </fieldset>
        </form>
      </Card>
    </div>
  );
};

export default AddCategory;
