import Card from "@material-ui/core/Card";
import CardActions from "@material-ui/core/CardActions";
import CardContent from "@material-ui/core/CardContent";
import Button from "@material-ui/core/Button";
import TextField from "@material-ui/core/TextField";
import Typography from "@material-ui/core/Typography";
import { publicRequest } from "../../requestMethods";
import React,{Component} from 'react';
import { useEffect, useState } from "react";
import axios from "axios";
import { useSelector } from "react-redux";

function RemoveSale() {

  const mylist = ["Apple",'Banana'];
  const items = [];

  const [rate, setRate] = useState(null);
  const [product, setProduct] = useState(null);
  const [allproducts, setAll] = useState([]);

  function handleChange(event) {
    setRate(event.target.value)
    console.log(rate);
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
            <Typography variant="h6" style={{marginLeft:'15%', fontFamily:'OpenSans'}}>Remove Sales</Typography>
            <br/>
            
            <select onClick={(e) => setProduct(e.target.value)} style={{borderRadius:'5px',width:'100%', borderColor:'lightgray', fontFamily:'OpenSans'}}>
            <option style={{fontFamily:'OpenSans'}} value="none" selected disabled hidden>Select an Option</option>
              {mylist.map((item) => {return(<option style={{fontFamily:'OpenSans'}} value = {item}>{item}</option>);})}
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
            <Button style={{fontFamily:'OpenSans'}} color="secondary" href="/profile" variant="contained">
              Cancel
            </Button>
            <Button style={{fontFamily:'OpenSans'}} color="primary" variant="contained" onClick={()=>{alert(product + " " + rate)}}>
              Submit
            </Button>
          </CardActions>
        </Card>
      </div>
    </div>
  );
}

export default RemoveSale