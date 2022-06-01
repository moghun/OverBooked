import Card from "@material-ui/core/Card";
import CardActions from "@material-ui/core/CardActions";
import CardContent from "@material-ui/core/CardContent";
import Button from "@material-ui/core/Button";
import TextField from "@material-ui/core/TextField";
import Typography from "@material-ui/core/Typography";
import React from 'react';
import { useEffect, useState } from "react";
import axios from "axios"
import { useSelector } from "react-redux";
import {toast} from 'react-toastify';

function EditSales() {
  const currUser = useSelector((state) => state.user.currentUser);

  const [rate, setRate] = useState(null);
  const [index, setIndex] = useState(null);
  const [allproducts, setAll] = useState([]);

  function handleChange(event) {
    setRate(event.target.value)
    console.log(rate);
  }

  useEffect(() => {
    const getAllProducts = async () => {
      try {
        const res = await axios.get("http://localhost:5001/api/products?sale=false");
        setAll(res.data);
      } catch (err) {}
    }; 
    getAllProducts();
  }, []);


  const addSale = async () => {

    try {
      axios.put(
        "http://localhost:5001/api/products/setSale/" + allproducts[index]._id, //Current products' ID here
        {
          cost: allproducts[index].cost, //Take current products' before_sale_cost here
          perc: rate, //Give sale percentage here
        },
        {
          headers: { token: "Bearer " + currUser.accessToken },
        }
      );
      toast.success("Discount applied successfully!", {position: toast.POSITION.TOP_CENTER});
      setTimeout(() => {window.location.reload()}, 1500)

    } catch (err) {
      toast.error("Discount cannot be applied!", {position: toast.POSITION.TOP_CENTER});
      setTimeout(() => {window.location.reload()}, 1500)
    }

  }


  console.log(allproducts);

  return (
    <div className="main-container">
      <div style={{ display: "flex", justifyContent: "center" }}>
        <Card>
          <CardContent>
            <Typography variant="h6" style={{marginLeft:'35%'}}>Edit Sales</Typography>
            <br/>
            
            <select onClick={(e) => setIndex(e.target.value)} style={{borderRadius:'5px',width:'315px', borderColor:'lightgray'}}>
            <option value="none" selected disabled hidden>Select an Option</option>
              {allproducts.map((item, i) => {return(<option value = {i}>{item.name}</option>);})}
            </select>

            <br/>

            <TextField
              
              id="discountrate"
              type="number"
              InputProps={{ inputProps: { min: 0, max: 100 } }}
              onKeyDown={(e) => e.preventDefault()}
              label="Discount Rate"
              margin="normal"
              onChange={handleChange}
              style={{width:'100%'}}
            />
            <br />
          </CardContent>

          <CardActions>
            <Button color="secondary" href="/profile" variant="contained" style={{marginLeft:'22.5%'}}>
              Cancel
            </Button>
            <Button color="primary" variant="contained" onClick={()=>{addSale()}}>
              Submit
            </Button>
          </CardActions>
        </Card>
      </div>
    </div>
  );
}

export default EditSales