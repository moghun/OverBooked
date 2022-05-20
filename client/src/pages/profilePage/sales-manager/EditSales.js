import Card from "@material-ui/core/Card";
import CardActions from "@material-ui/core/CardActions";
import CardContent from "@material-ui/core/CardContent";
import Button from "@material-ui/core/Button";
import TextField from "@material-ui/core/TextField";
import Typography from "@material-ui/core/Typography";
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemText from '@mui/material/ListItemText';
import axios from "axios";
import { publicRequest } from "../../requestMethods";

import React,{Component} from 'react';
import { useEffect, useState } from "react";

function EditSales() {

  const mylist = ["Apple",'Banana'];
  const items = [];

  const [rate, setRate] = useState(null);
  const [product, setProduct] = useState(null);
  const [allproducts, setAll] = useState([]);

  function handleChange(event) {
    setRate(event.target.value)
    console.log(rate);
  }

  function addItem(item){
    if(items.indexOf(item) === -1){
      items.push(item);
      console.log(items);
    }
  }

  useEffect(() => {
    const getProduct = async () => {
      try {
        const res = await publicRequest.get("/");
        setAll(res.data);
      } catch {}
    };
    getProduct();
  }, []);

  console.log(allproducts)

  return (
    <div className="main-container">
      <div style={{ display: "flex", justifyContent: "center" }}>
        <Card>
          <CardContent>
            <Typography variant="h6" style={{marginLeft:'30%'}}>Edit Sales</Typography>
            <br/>
            
            <select onClick={(e) => setProduct(e.target.value)} style={{width:'100%'}}>
            <option value="none" selected disabled hidden>Select an Option</option>
              {mylist.map((item) => {return(<option value = {item}>{item}</option>);})}
            </select>

            <br/>

            <TextField
              id="discountrate"
              type="discountrate"
              label="Discount Rate"
              margin="normal"
              onChange={handleChange}
              style={{width:'100%'}}
            />
            <br />
          </CardContent>

          <CardActions>
            <Button color="primary" variant="contained" >
              Submit
            </Button>
            <Button color="secondary" href="/profile" variant="contained">
              Cancel
            </Button>
            <Button color="primary" variant="contained" style={{marginLeft:'10px'}} onClick={() => {addItem(product)}}>
              Add
            </Button>
          </CardActions>
        </Card>
      </div>
    </div>
  );
}

export default EditSales