import Card from "@material-ui/core/Card";
import CardActions from "@material-ui/core/CardActions";
import CardContent from "@material-ui/core/CardContent";
import Button from "@material-ui/core/Button";
import Typography from "@material-ui/core/Typography";
import React from 'react';
import { useEffect, useState } from "react";
import axios from "axios";
import { useSelector } from "react-redux";
import { toast } from "react-toastify";

function RemoveSale() {

  const currUser = useSelector((state) => state.user.currentUser);

  //const [product, setProduct] = useState(null);
  //const [beforesalecost, setCost] = useState(null);
  const [allproducts, setAll] = useState([]);
  const [index, setIndex] = useState(null);

  useEffect(() => {

    const getSaleProducts = async () => {
      try {
        const res = await axios.get("http://localhost:5001/api/products?sale=true");
        setAll(res.data);
      } catch (err) {}
    };
    getSaleProducts();
  }, []);


  const removeSale = async () => {
    try {
      axios.put(
        "http://localhost:5001/api/products/stopSale/" + allproducts[index]._id, //Current products' ID here
        { cost: allproducts[index].before_sale_price }, //Take current products' before_sale_cost here
        {
          headers: { token: "Bearer " + currUser.accessToken },
        }

      );
      toast.success("Discount removed successfully!", {position: toast.POSITION.TOP_CENTER});
      setTimeout(() => {window.location.reload()}, 1500)
    } catch (err) {
      toast.error("Discount cannot be removed!", {position: toast.POSITION.TOP_CENTER});
      setTimeout(() => {window.location.reload()}, 1500)
    }

  }

  console.log(allproducts)

  return (
    <div className="main-container">
      <div style={{ display: "flex", justifyContent: "center" }}>
        <Card>
          <CardContent>
            <Typography variant="h6" style={{marginLeft:'30%',fontFamily:'OpenSans', marginRight:'15%'}}>Remove Sales</Typography>
            <br/>
            
            <select onClick={(e) => {setIndex(e.target.value);}} style={{borderRadius:'5px',width:'315px', borderColor:'lightgray', fontFamily:'OpenSans'}}>
            <option style={{fontFamily:'OpenSans'}} value="none" selected disabled hidden>Select an Option</option>
              {allproducts.map((item, i) => {return(<option style={{fontFamily:'OpenSans'}} value = {i}>{item.name}</option>);})}
            </select>

            <br/>
          </CardContent>

          <CardActions>
            <Button style={{fontFamily:'OpenSans', marginLeft:'22.5%'}} color="secondary" href="/profile" variant="contained">
              Cancel
            </Button>
            <Button style={{fontFamily:'OpenSans',marginRight:'20%'}} color="primary" variant="contained" onClick={()=>{removeSale()}}>
              Submit
            </Button>
          </CardActions>
        </Card>
      </div>
    </div>
  );
}

export default RemoveSale