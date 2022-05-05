import React , {useState} from "react";
import '../signin/Signin.css';
import 'bootstrap';
import axios from "axios";
import { login } from "../../redux/apiCalls";
import { useDispatch,useSelector } from "react-redux";


const Signin = () => {

  const[username,setUsername] = useState("");
  const[password,setPassword] = useState("");
  const dispatch = useDispatch();
  const {isFetching,error} = useSelector((state)=>state.user)

  const handleClick = (e) => {
    e.preventDefault()
    login(dispatch,{username,password})
  }

  return (
    <div className="signincontainerholder">
      <div className="signincontainer">

        <h1 style={{fontFamily:'Open Sans', marginLeft:50}}>LOGIN</h1>
        <div className="username">
          <h>Username</h>
          <input className="text" placeholder="Type your username" onChange={(e)=>setUsername(e.target.value)}></input>
          <hr style={{width:200}}></hr>
        </div>

        <div className="passworddiv">
          <h>Password</h>
          <input type="password" className="password" placeholder="Type your password" onChange={(e)=>setPassword(e.target.value)}></input>
          <hr style={{width:200}}></hr>
        </div>

        <div className="loginbutton">
            <button onClick={handleClick} disabled = {isFetching} type="button" style={{fontFamily:'Open Sans'}}>Login</button>
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

export default Signin;

/*
class Signin extends Component{

  constructor(){
    super()
    this.state = {
        email:'',
        password:'',
    }

    this.changeMail = this.changeMail.bind(this);
    this.changePassword = this.changePassword.bind(this);
    this.onSubmit = this.onSubmit.bind(this);

  }

  changeMail(event){
    this.setState({
        email:event.target.value
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
        email: this.state.email,
        password: this.state.password,
    }
    axios.post('http://localhost:5001/api/auth/login', registered).then(response => console.log(response.data))
    this.setState({
      email: '',
      password: '',
  })
  }

  render(){
    return(
    <div className="signincontainerholder">
      <div className="signincontainer">

        <h1 style={{fontFamily:'Open Sans', marginLeft:50}}>LOGIN</h1>

        <div className="username">
          <h>Mail</h>
          <form onSubmit={this.onSubmit}>
            <input 
            className="text" 
            placeholder="Type your mail"
            onChange={this.changeMail}
            value={this.state.email}
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
          <p style={{fontSize: 14, margin:0}}>Or</p>
          <a href="/Signup" style={{fontSize: 16, color:'black', textDecoration:'none', marginLeft:30}}>Sign Up</a>
        </div>

      </div>
    </div>
    )
  }
}
export default Signin
*/