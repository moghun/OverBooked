import React from "react";
import '../signin/Signin.css';


const Signin = () => {
  return (
    <div className="signincontainer">

      <h1 style={{fontFamily:'Open Sans'}}>LOGIN</h1>
      <div className="username">
        <h>Username</h>
        <input className="text" placeholder="Type your username"></input>
        <hr style={{width:200}}></hr>
      </div>

      <div className="passworddiv">
        <h>Password</h>
        <input type="password" className="password" placeholder="Type your password"></input>
        <hr style={{width:200}}></hr>
      </div>

      <div className="loginbutton">
          <button type="button" style={{fontFamily:'Open Sans'}}>Login</button>
      </div>

      <div className="forgetmypassword">
        <a href="/" style={{color:'black', textDecoration:'none'}}>Forget Password?</a>
      </div>

      <div className="socialmediasignup">
        <p style={{margin:0}}>Or Sign Up Using</p>
        <div class = "row">
          <button className="gmail"></button>
          <button className="facebook"></button>
        </div>
      </div>

      <div className="manuelsignup">
        <p style={{fontSize: 14, margin:0}}>Or Sign Up Using</p>
        <a href="/Signup" style={{fontSize: 16, color:'black', textDecoration:'none'}}>Sign Up</a>
      </div>

    </div>
  )
}

export default Signin