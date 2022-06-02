import Card from "@material-ui/core/Card";
import CardActions from "@material-ui/core/CardActions";
import CardContent from "@material-ui/core/CardContent";
import Button from "@material-ui/core/Button";
import TextField from "@material-ui/core/TextField";
import Typography from "@material-ui/core/Typography";
import React from "react";
import { useEffect, useState } from "react";
import axios from "axios";
import { useSelector } from "react-redux";
import { toast } from "react-toastify";

function SetPrice() {
  const currUser = useSelector((state) => state.user.currentUser);

  const [price, setCost] = useState(null);
  const [index, setIndex] = useState(null);
  const [allproducts, setAll] = useState([]);

  function handleChange(event) {
    setCost(event.target.value);
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

  const setPrice = async () => {
    try {
      axios.put(
        "http://localhost:5001/api/products/setCost/" + allproducts[index]._id, //Current products' ID here
        { newCost: price }, //Set cost here
        {
          headers: { token: "Bearer " + currUser.accessToken },
        }
      );
      toast.success("Price set successfully!", {
        position: toast.POSITION.TOP_CENTER,
      });
      setTimeout(() => {
        window.location.reload();
      }, 1500);
    } catch (err) {
      toast.error("Price cannot be set!", {
        position: toast.POSITION.TOP_CENTER,
      });
      setTimeout(() => {
        window.location.reload();
      }, 1500);
    }
  };

  return (
    <div className="main-container">
      <div style={{ display: "flex", justifyContent: "center" }}>
        <Card>
          <CardContent>
            <Typography variant="h6" style={{ marginLeft: "35%" }}>
              Set Price
            </Typography>
            <br />

            <select
              onChange={(e) => {
                setIndex(e.target.value);
              }}
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
                return (
                  <option key={item._id} value={i}>
                    {item.name}
                  </option>
                );
              })}
            </select>

            <br />

            <TextField
              onKeyDown={(event) => {if(event.key === "-"){event.preventDefault()}}}
              id="price"
              type="number"
              InputProps={{ inputProps: { min: 0} }}
              label="Price"
              margin="normal"
              onChange={handleChange}
              style={{ width: "100%" }}
            />
            <br />
          </CardContent>

          <CardActions>
            <Button
              color="secondary"
              href="/profile"
              variant="contained"
              style={{ marginLeft: "22.5%" }}
            >
              Cancel
            </Button>
            <Button
              color="primary"
              variant="contained"
              onClick={() => {
                setPrice();
              }}
            >
              Submit
            </Button>
          </CardActions>
        </Card>
      </div>
    </div>
  );
}

export default SetPrice;
