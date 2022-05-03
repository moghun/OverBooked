import React, { Component } from 'react'
import 'bootstrap'
import '../signup/Signup.css'
import axios from 'axios'
class SignUp extends Component{
    
    constructor(){
        super()
        this.state = {
            username:'',
            mail:'',
            password:'',
        }

        this.changeEmail = this.changeEmail.bind(this);
        this.changePassword = this.changePassword.bind(this);
        this.changeUserName = this.changeUserName.bind(this);
        this.onSubmit = this.onSubmit.bind(this);
    }
    
    changeUserName(event){
        this.setState({
            username:event.target.value
        })
    }

    changeEmail(event){
        this.setState({
            mail:event.target.value
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
            username: this.state.username,
            email: this.state.email,
            password: this.state.password,
        }

        axios.post('http://localhost:5001/register', registered).then(response => console.log(response.data))
        this.setState({
            username: '',
            mail: '',
            password: '',
            
        })
    }
    
    render(){
        return(
    <div className='signupcontainerholder'>
        <div className='signupcontainer'>

            <h1 style={{fontFamily:'Open Sans', fontSize: 20, marginTop:0, marginLeft:70}}>SIGN UP</h1>
    
            <div className='username'>
                <h>Username</h>
                <form onSubmit={this.onSubmit}>
                    <input
                    className="text"
                     placeholder="Type your username"
                     onChange={this.changeUserName}
                     value={this.state.username}
                     ></input>
                </form>
                <hr style={{width:200}}></hr>
            </div>
    
            <div className='useremail'>
                <h>Email</h>
                <form onSubmit={this.onSubmit}>
                    <input className="text"
                     placeholder="Type your email"
                     onChange={this.changeEmail}
                     value={this.state.email}
                     />
                </form>                
                <hr style={{width:200}}></hr>
            </div>
    
            <div className='userpassword'>
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
    
            <div className='privacypolicy'>
                <input type="checkbox" name="box1"/>
                <label for="box1">I have read and accepted</label><br/>
                <a href='/' style={{color:"blue", marginLeft:60}}>Privacy Policy</a>
            </div>
    
            <div className='signupbutton'>
                <form onSubmit={this.onSubmit}>
                    <input type="submit" style={{fontFamily:'Open Sans', marginTop: 10}}  value="Sign Up"/>
                </form>
            <a href="/signin" style={{marginLeft: 30}}>You have an account?</a>
            </div>
            
        </div>
    </div>
        );
    }
}

export default SignUp;