import { Button } from "@material-ui/core";
import { Card } from "@material-ui/core";
import Avatar from "@material-ui/core/Avatar";
import axios from "axios";
import React, { useState, useEffect } from "react";
import { Typography } from "@material-ui/core";
import "./Profile.css";
import { View,} from "react-native";

import RemoveCircleIcon from '@mui/icons-material/RemoveCircle';
import EditIcon from '@material-ui/icons/Edit';
import PersonIcon from '@material-ui/icons/Person';
import LocalMallIcon from '@material-ui/icons/LocalMall';
import MailIcon from '@mui/icons-material/Mail';
import TrendingUpIcon from '@mui/icons-material/TrendingUp';
import SavingsIcon from '@mui/icons-material/Savings';
import SellIcon from '@mui/icons-material/Sell';


import LocalAtmIcon from '@material-ui/icons/LocalAtm';
import CommentIcon from '@material-ui/icons/Comment';
import AddShoppingCartIcon from '@material-ui/icons/AddShoppingCart';
import SystemUpdateAltIcon from '@material-ui/icons/SystemUpdateAlt';
import AirportShuttleIcon from '@material-ui/icons/AirportShuttle';

import { useSelector } from "react-redux";

const Profile = () => {
  const loggedUser = useSelector((state) => state.user.currentUser);
  const [currUser, setUser] = useState({});

  const getUserInfo = async () => {
    try {
      const res = await axios.get(
        "http://localhost:5001/api/users/find/" + loggedUser._id,
        { headers: { token: "Bearer " + loggedUser.accessToken } }
      );
      setUser(res.data);
    } catch (err) {}
  };

  useEffect(async () => {
    getUserInfo();
  }, []);

  function userstatus(userrole) {
    if (userrole === "customer") {
      return <h2> Customer </h2>;
    } else if (userrole === "product-manager") {
      return <h2> Product Manager </h2>;
    } else if (userrole === "sales-manager") {
      return <h2> Sales Manager </h2>;
    }
  }

  function buttonstatus(userrole) {
    if (userrole === "customer") {
      return (
        <a href="/myorders"> <LocalMallIcon/> My-Orders</a>
      );
    } else if (userrole === "product-manager") {
      return(
      <>
      <a href="/productmanager"><AddShoppingCartIcon/>Add Product</a>
      <a href="/productmanager"><CommentIcon/>Approve Comment</a>
      <a href="/updateproduct"> <SystemUpdateAltIcon/>Update Product</a>
      <a href="/removeproduct"><RemoveCircleIcon/>Remove Product</a>
      <a href="/Invoices"><LocalAtmIcon/>Invoices</a>
      <a href="/updateproduct"> <AirportShuttleIcon/>Update Order</a>
      <a href="/removeproduct"><SystemUpdateAltIcon/>Update Stock</a>

      
      </>
      );

    } else if (userrole === "sales-manager") {
      return(
      <>
      <a href="/setprice"><SellIcon/>Set Price</a>
      <a href="/editsales"> <LocalMallIcon/>Edit Sales</a>
      <a href="/removesales"><RemoveCircleIcon/>Remove Sales</a>
      <a href="/invoicessalesmanager"><MailIcon/>Invoices</a>
      <a href="/revenues"><SavingsIcon/>Revenues</a>
      </>
      );
    }
  }

  return (

<div class="container bootstrap snippets bootdey">
<div class="row">
  <div class="profile-nav col-md-3">
      <div class="panel">
          <div class="user-heading round">
              <a>
                  <Avatar style={{ width: 100, height: 100 }}/>
              </a>
              <h1 style={{color: 'black'}}>{currUser.name}</h1>
              <h1 style={{color: 'black'}}>{currUser.surname}</h1>
              <p style={{color: 'black'}}>{currUser.email}</p>
          </div>

          <ul class="nav nav-pills flex-column">
              <li class="active"><a href="#"> <PersonIcon/> Profile</a></li>
              <li><a href="/editprofile"> <EditIcon/> Edit profile</a></li>
              <li>{buttonstatus(currUser.user_role)}</li>
          </ul>
      </div>
  </div>
  <div class="profile-info col-md-9">
      <div class="panel">
          <div class="containerW2">
          <View style={{flexDirection: 'row', alignItems: 'center'}}>
            <View style={{flex: 1, height: 4, backgroundColor: 'black'}} />
            <View>
              <View style={{width: 200, textAlign: 'center', color: 'black', fontWeight: "bold", fontSize: 40}}>PROFILE</View>
            </View>
            <View style={{flex: 1, height: 4, backgroundColor: 'black'}} />
          </View>
          </div>

          <br/>
          <div class="panel-body bio-graph-info">
            <div class = "row">
                <div class="bio-row">
                    <p style = {{color:  'black'}}><span>First Name </span>: {currUser.name}</p>
                </div>
                <div class="bio-row">
                    <p style = {{color:  'black'}}><span>Last Name </span>: {currUser.surname}</p>
                </div>
                <div class="bio-row">
                    <p style = {{color:  'black'}}><span>Adress </span>: {currUser.adress}</p>
                </div>
                <div class="bio-row">
                    <p style = {{color:  'black'}}><span>Username</span>: {currUser.username}</p>
                </div>
                <div class="bio-row">
                    <p style = {{color: 'black'}}><span>Email </span>: {currUser.email}</p>
                </div>

                <div class="bio-row">
                    <p style = {{color: 'black'}}><span>User-Role </span>: {currUser.user_role}</p>
                </div>

                <div class="bio-row">
                    <p style = {{color: 'black'}}><span>Tax-ID </span>: {currUser.tax_id}</p>
                </div>
            </div>
        </div>
      </div>
  </div>
</div>
</div>




  );
};

export default Profile;
