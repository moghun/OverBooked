import React, { Component, useState, useEffect } from "react";
import { Container, Card } from "react-bootstrap";
import { Button } from "@material-ui/core";
import "./ProductManager.css";
import TextField from "@material-ui/core/TextField";
import axios from "axios";
import { useSelector } from "react-redux";
import { toast } from "react-toastify";

const UpdateProduct = () => {
  const currUser = useSelector((state) => state.user.currentUser);

  const [index, setIndex] = useState(null);
  const [allproducts, setAll] = useState([]);

  const [cost, setCost] = useState(null);
  const [amount, setAmount] = useState(null);
  const [publisher, setPublisher] = useState(null);
  const [img, setimg] = useState(null);
  const [description, setDescription] = useState(null);
  const [warranty, setWarranty] = useState(null);
  const [author, setAuthor] = useState(null);
  const [category, setCategory] = useState(null);
  const [subcategories, setSubCategories] = useState(null);
  const [sale, setSale] = useState(null);
  const [before_sale_price, setBSaleP] = useState(null);
  const [name, setName] = useState(null);

  useEffect(() => {
    const getAllProducts = async () => {
      try {
        const res = await axios.get("http://localhost:5001/api/products");
        setAll(res.data);
      } catch (err) {}
    };
    getAllProducts();
  }, []);

  const clickSubmit = () => {
    const update = {
      cost: cost || undefined,
      amount: amount || undefined,
      publisher: publisher || undefined,
      img: img || undefined,
      description: description || undefined,
      warranty: warranty || undefined,
      author: author || undefined,
      category: category || undefined,
      subcategories: subcategories || undefined,
      sale: sale || undefined,
      before_sale_price: before_sale_price || undefined,
      name: name || undefined,
    };

    try {
      axios.put(
        "http://localhost:5001/api/products/" + allproducts[index]._id,
        update,
        {
          headers: { token: "Bearer " + currUser.accessToken },
        }
      );
    } catch (err) {
      toast.error(err, {
        position: toast.POSITION.TOP_CENTER,
        autoClose: 1500,
      });
    }
  };

  function handleChange2(event) {
    if (event.target.value != null) {
      setCost(event.target.value);
    }
    console.log(cost);
  }

  function handleChange4(event) {
    if (event.target.value != null) {
      setPublisher(event.target.value);
    }
    console.log(publisher);
  }

  function handleChange5(event) {
    if (event.target.value != null) {
      setimg(event.target.value);
    }
    console.log(img);
  }

  function handleChange6(event) {
    if (event.target.value != null) {
      setDescription(event.target.value);
    }
    console.log(description);
  }

  function handleChange7(event) {
    if (event.target.value != null) {
      setWarranty(event.target.value);
    }
    console.log(warranty);
  }

  function handleChange8(event) {
    if (event.target.value != null) {
      setAuthor(event.target.value);
    }
    console.log(author);
  }

  function handleChange9(event) {
    if (event.target.value != null) {
      setCategory(event.target.value);
    }
    console.log(category);
  }

  function handleChange10(event) {
    if (event.target.value != null) {
      setSubCategories(event.target.value);
    }
    console.log(subcategories);
  }

  function handleChange12(event) {
    if (event.target.value != null) {
      setBSaleP(event.target.value);
    }
    console.log(before_sale_price);
  }

  function handleChange13(event) {
    if (event.target.value != null) {
      setName(event.target.value);
    }
    console.log(name);
  }

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
            <br />
            <legend
              className="pcontainer"
              style={{ color: "black", fontSize: "30px" }}
            >
              UPDATE PRODUCTS
            </legend>

            <label
              className="col-md-4 control-label"
              htmlFor="product_id"
              style={{
                padding: "12px 20px",
                background: "orange",
                border: "none",
                borderRadius: "30px",
                fontWeight: "bold",
                boxShadow: "0px 5px 10px lightblue",
              }}
            >
              PRODUCT ID
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
                Select an Option
              </option>
              {allproducts.map((item, i) => {
                return <option value={i}>{item._id}</option>;
              })}
            </select>

            <br />

            <div
              style={{
                marginLeft: "50px",
                display: "flex",
                justifyContent: "space-between",
              }}
            >
              <label
                className="col-md-4 control-label"
                htmlFor="product_id"
                style={{
                  padding: "12px 20px",
                  background: "orange",
                  border: "none",
                  borderRadius: "30px",
                  fontWeight: "bold",
                  boxShadow: "0px 5px 10px lightblue",
                }}
              >
                IMAGE SOURCE
              </label>

              <div className="col-md-4">
                <TextField
                  id="IMAGE"
                  placeholder="IMAGE"
                  required
                  type="text"
                  onChange={handleChange5}
                />
              </div>
            </div>

            <br />

            <div
              style={{
                marginLeft: "50px",
                display: "flex",
                justifyContent: "space-between",
              }}
            >
              <label
                className="col-md-4 control-label"
                htmlFor="product_id"
                style={{
                  padding: "12px 20px",
                  background: "orange",
                  border: "none",
                  borderRadius: "30px",
                  fontWeight: "bold",
                  boxShadow: "0px 5px 10px lightblue",
                }}
              >
                SALE
              </label>

              <select
                onClick={(e) => setSale(e.target.value)}
                style={{
                  borderRadius: "5px",
                  width: "315px",
                  borderColor: "lightgray",
                }}
              >
                <option value="none" selected disabled hidden>
                  Select an Option
                </option>
                <option value={true}>True</option>
                <option value={false}>False</option>
              </select>
            </div>

            <br />

            <div
              style={{
                marginLeft: "50px",
                display: "flex",
                justifyContent: "space-between",
              }}
            >
              <label
                className="col-md-4 control-label"
                htmlFor="product_id"
                style={{
                  padding: "12px 20px",
                  background: "orange",
                  border: "none",
                  borderRadius: "30px",
                  fontWeight: "bold",
                  boxShadow: "0px 5px 10px lightblue",
                }}
              >
                BEFORE SALE PRICE
              </label>

              <div className="col-md-4">
                <TextField
                  id="before_sale_price"
                  placeholder="BEFORE SALE PRICE"
                  required
                  type="number"
                  onChange={handleChange12}
                />
              </div>
            </div>

            <br />

            <div
              style={{
                marginLeft: "50px",
                display: "flex",
                justifyContent: "space-between",
              }}
            >
              <label
                className="col-md-4 control-label"
                htmlFor="product_id"
                style={{
                  padding: "12px 20px",
                  background: "orange",
                  border: "none",
                  borderRadius: "30px",
                  fontWeight: "bold",
                  boxShadow: "0px 5px 10px lightblue",
                }}
              >
                WARRANTY
              </label>

              <div className="col-md-4">
                <TextField
                  id="warranty"
                  placeholder="WARRANTY"
                  required
                  type="number"
                  onChange={handleChange7}
                />
              </div>
            </div>

            <br />

            <div
              style={{
                marginLeft: "50px",
                display: "flex",
                justifyContent: "space-between",
              }}
            >
              <label
                className="col-md-4 control-label"
                htmlFor="product_id"
                style={{
                  padding: "12px 20px",
                  background: "orange",
                  border: "none",
                  borderRadius: "30px",
                  fontWeight: "bold",
                  boxShadow: "0px 5px 10px lightblue",
                }}
              >
                AUTHOR
              </label>

              <div className="col-md-4">
                <TextField
                  id="author"
                  placeholder="AUTHOR"
                  required
                  type="string"
                  onChange={handleChange8}
                />
              </div>
            </div>

            <br />

            <div
              style={{
                marginLeft: "50px",
                display: "flex",
                justifyContent: "space-between",
              }}
            >
              <label
                className="col-md-4 control-label"
                htmlFor="product_id"
                style={{
                  padding: "12px 20px",
                  background: "orange",
                  border: "none",
                  borderRadius: "30px",
                  fontWeight: "bold",
                  boxShadow: "0px 5px 10px lightblue",
                }}
              >
                COST
              </label>

              <div className="col-md-4">
                <TextField
                  id="cost"
                  placeholder="COST"
                  required
                  type="number"
                  onChange={handleChange2}
                />
              </div>
            </div>

            <br />

            <div
              style={{
                marginLeft: "50px",
                display: "flex",
                justifyContent: "space-between",
              }}
            >
              <label
                className="col-md-4 control-label"
                htmlFor="available_quantity"
                style={{
                  padding: "12px 20px",
                  background: "orange",
                  border: "none",
                  borderRadius: "30px",
                  fontWeight: "bold",
                  boxShadow: "0px 5px 10px lightblue",
                }}
              >
                NAME
              </label>

              <div className="col-md-4">
                <TextField
                  id="NAME"
                  placeholder="NAME"
                  required
                  type="string"
                  onChange={handleChange13}
                />
              </div>
            </div>

            <br />

            <div
              style={{
                marginLeft: "50px",
                display: "flex",
                justifyContent: "space-between",
              }}
            >
              <label
                className="col-md-4 control-label"
                htmlFor="percentage_discount"
                style={{
                  padding: "12px 20px",
                  background: "orange",
                  border: "none",
                  borderRadius: "30px",
                  fontWeight: "bold",
                  boxShadow: "0px 5px 10px lightblue",
                }}
              >
                DESCRIPTION
              </label>

              <div className="col-md-4">
                <TextField
                  id="DESCRIPTION"
                  placeholder="DESCRIPTION"
                  required
                  type="string"
                  onChange={handleChange6}
                />
              </div>
            </div>

            <br />

            <div
              style={{
                marginLeft: "50px",
                display: "flex",
                justifyContent: "space-between",
              }}
            >
              <label
                className="col-md-4 control-label"
                htmlFor="product_categorie"
                style={{
                  padding: "12px 20px",
                  background: "orange",
                  border: "none",
                  borderRadius: "30px",
                  fontWeight: "bold",
                  boxShadow: "0px 5px 10px lightblue",
                }}
              >
                PRODUCT CATEGORY
              </label>

              <div className="col-md-4">
                <TextField
                  id="CATEGORY"
                  placeholder="Category Name"
                  required
                  type="text"
                  onChange={handleChange9}
                />
              </div>
            </div>

            <br />

            <div
              style={{
                marginLeft: "50px",
                display: "flex",
                justifyContent: "space-between",
              }}
            >
              <label
                className="col-md-4 control-label"
                htmlFor="product_categorie"
                style={{
                  padding: "12px 20px",
                  background: "orange",
                  border: "none",
                  borderRadius: "30px",
                  fontWeight: "bold",
                  boxShadow: "0px 5px 10px lightblue",
                }}
              >
                PRODUCT SUB-CATEGORY
              </label>

              <div className="col-md-4">
                <TextField
                  id="CATEGORY"
                  placeholder="Sub Category Name"
                  required
                  type="string"
                  onChange={handleChange10}
                />
              </div>
            </div>

            <br />

            <div
              style={{
                marginLeft: "50px",
                display: "flex",
                justifyContent: "space-between",
              }}
            >
              <label
                className="col-md-4 control-label"
                htmlFor="product_categorie"
                style={{
                  padding: "12px 20px",
                  background: "orange",
                  border: "none",
                  borderRadius: "30px",
                  fontWeight: "bold",
                  boxShadow: "0px 5px 10px lightblue",
                }}
              >
                PUBLISHER
              </label>

              <div className="col-md-4">
                <TextField
                  id="publisher"
                  placeholder="PUBLISHER"
                  required
                  type="string"
                  onChange={handleChange4}
                />
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

export default UpdateProduct;
