import React , {Component} from "react";
import '../signin/Signin.css';
import 'bootstrap';
import axios from "axios";

/*
const Signin = () => {


  return (
    <div className="signincontainerholder">
      <div className="signincontainer">

        <h1 style={{fontFamily:'Open Sans', marginLeft:50}}>LOGIN</h1>
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

        <div className="manuelsignup">
          <p style={{fontSize: 14, margin:0}}>Or Sign Up Using</p>
          <a href="/Signup" style={{fontSize: 16, color:'black', textDecoration:'none', marginLeft:30}}>Sign Up</a>
        </div>

      </div>
    </div>
  )
}
*/


class Signin extends Component{

  constructor(){
    super()
    this.state = {
        user:'',
        password:'',
    }

    this.changeUser = this.changeUser.bind(this);
    this.changePassword = this.changePassword.bind(this);
    this.onSubmit = this.onSubmit.bind(this);

  }

  changeUser(event){
    this.setState({
        user:event.target.value
    })
  }

  changePassword(event){
    this.setState({
        password:event.target.value
    })

  }
  
  onSubmit(event){
    event.preventDefault();
    const registered ={
        user: this.state.user,
        password: this.state.password,
    }
    axios.post('http://localhost:5001/Signin', registered).then(response => console.log(response.data))
    this.setState({
      user: '',
      password: '',
  })
  }

  render(){
    return(
    <div className="signincontainerholder">
      <div className="signincontainer">

        <h1 style={{fontFamily:'Open Sans', marginLeft:50}}>LOGIN</h1>

        <div className="username">
          <h>Username</h>
          <form onSubmit={this.onSubmit}>
            <input 
            className="text" 
            placeholder="Type your username"
            onChange={this.changeUser}
            value={this.state.user}
            />
          </form>
          <hr style={{width:200}}></hr>
        </div>

        <div className="passworddiv">
          <h>Password</h>
          <form onSubmit={this.onSubmit}>
            <input 
            type="password" 
            className="password"
            placeholder="Type your password"
            onChange={this.changePassword}
            value={this.state.password}
            />
          </form>
          <hr style={{width:200}}></hr>
        </div>

        <div className="loginbutton" >
            <form onSubmit={this.onSubmit}>
              <input type='submit' style={{fontFamily:'Open Sans'}} value="Login"></input>
            </form>
        </div>

        <div className="forgetmypassword">
          <a href="/" style={{color:'black', textDecoration:'none'}}>Forget Password?</a>
        </div>

        <div className="manuelsignup">
          <p style={{fontSize: 14, margin:0}}>Or Sign Up Using</p>
          <a href="/Signup" style={{fontSize: 16, color:'black', textDecoration:'none', marginLeft:30}}>Sign Up</a>
        </div>

      </div>
    </div>
    )
  }
}
export default Signin