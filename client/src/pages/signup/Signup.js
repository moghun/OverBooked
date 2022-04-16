import React from 'react';
import '../signup/Signup.css';

const Signup = () => {
  return (
    <div className='signupcontainer'>

        <h1 style={{fontFamily:'Open Sans', fontSize: 20, marginTop:0}}>SIGN UP</h1>

        <div className='username'>
            <h>Username</h>
            <input className="text" placeholder="Type your username"></input>
            <hr style={{width:200}}></hr>
        </div>

        <div className='usersurname'>
            <h>Surname</h>
            <input className="text" placeholder="Type your surname"></input>
            <hr style={{width:200}}></hr>
        </div>

        <div className='useremail'>
            <h>Email</h>
            <input className="text" placeholder="Type your email"></input>
            <hr style={{width:200}}></hr>
        </div>

        <div className='userpassword'>
            <h>Password</h>
            <input type="password" className="password" placeholder="Type your password"></input>
            <hr style={{width:200}}></hr>
        </div>

        <div className='userpasswordconfirm'>
            <h style={{}}>Confirm Password</h>
            <input type="password" className="password" placeholder="Confirm your password"></input>
            <hr style={{width:200}}></hr>
        </div>

        <div className='privacypolicy'>
            <input type="checkbox" name="box1"></input>
            <label for="box1">I have read and accepted</label><br/>
            <a href='/' style={{color:"blue"}}>Privacy Policy</a>
        </div>

        <div className='signupbutton'>
        <button type="button" style={{fontFamily:'Open Sans'}}>Sign Up</button>
        </div>

        <a href="/">You already have an account?</a>

    </div>
  )
}

export default Signup