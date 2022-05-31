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
      <a href="#"> <LocalMallIcon/> Product-Manager-Panel</a>
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
              <a href="#">
                  <Avatar style={{ width: 100, height: 100 }}/>
              </a>
              <h1 style={{borderRadius: 'var(--border-radius-md)', backgroundColor:'yellow', color: 'black'}}>{currUser.name}</h1>
              <h1 style={{borderRadius: 'var(--border-radius-md)', backgroundColor:'green'}}>{currUser.surname}</h1>
              <p style={{borderRadius: 'var(--border-radius-md)', backgroundColor:'red'}}>{currUser.email}</p>
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
          <div class="bio-graph-heading">
          <View style={{flexDirection: 'row', alignItems: 'center'}}>
            <View style={{flex: 1, height: 4, backgroundColor: 'black'}} />
            <View>
              <View style={{width: 200, textAlign: 'center', color: 'green', fontWeight: "bold", fontSize: 40}}>PROFILE</View>
            </View>
            <View style={{flex: 1, height: 4, backgroundColor: 'black'}} />
          </View>
          </div>

          <br/>
          <div class="panel-body bio-graph-info">
            <div class="row">
                <div class="bio-row">
                    <p><span>First Name </span>: {currUser.name}</p>
                </div>
                <div class="bio-row">
                    <p><span>Last Name </span>: {currUser.surname}</p>
                </div>
                <div class="bio-row">
                    <p><span>Adress </span>: {currUser.adress}</p>
                </div>
                <div class="bio-row">
                    <p><span>Username</span>: {currUser.username}</p>
                </div>
                <div class="bio-row">
                    <p><span>Email </span>: {currUser.email}</p>
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
