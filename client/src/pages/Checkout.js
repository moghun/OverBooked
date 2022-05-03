import React , {Component} from 'react'
import 'bootstrap';
import axios from "axios";
import './Checkout.css';

class Checkout extends Component{

  constructor(){
    super()
    this.state = {
        name: '',
        surname: '',
        email:'',
        phoneNumber: '',
        country: '',
        province: '',
        city: '',
        address: '',
        cardnumber: '',
        expirationdate: '',
        securitynumber: ''
    }

    this.changeMail = this.changeMail.bind(this);
    this.changeName = this.changeName.bind(this);
    this.changeSurname = this.changeSurname.bind(this);
    this.changePhoneNumber = this.changePhoneNumber.bind(this);
    this.changeCountry = this.changeCountry.bind(this);
    this.changeProvince = this.changeProvince.bind(this);
    this.changeCity = this.changeCity.bind(this);
    this.changeAddress = this.changeAddress.bind(this);
    this.changeCardNumber = this.changeCardNumber.bind(this);
    this.changeDate = this.changeDate.bind(this);
    this.changeSecurityNumber = this.changeSecurityNumber.bind(this);
    this.onSubmit = this.onSubmit.bind(this);

  }

  changeMail(event){
    this.setState({
        email:event.target.value
    })
  }

  changeName(event){
    this.setState({
        name:event.target.value
    })
  }

  changeSurname(event){
    this.setState({
        surname:event.target.value
    })
  }

  changePhoneNumber(event){
    this.setState({
        phoneNumber:event.target.value
    })
  }

  changeCountry(event){
    this.setState({
        country:event.target.value
    })
  }

  changeProvince(event){
    this.setState({
        province:event.target.value
    })
  }

  changeCity(event){
    this.setState({
        city:event.target.value
    })
  }

  changeAddress(event){
    this.setState({
        address:event.target.value
    })
  }

  changeCardNumber(event){
    this.setState({
      cardnumber: event.target.value
    })
  }

  changeDate(event){
    this.setState({
      expirationdate: event.target.value
    })
  }

  changeSecurityNumber(event){
    this.setState({
      securitynumber: event.target.value
    })
  }

  
  onSubmit(event){
    event.preventDefault();
    const registered ={
        email: this.state.email,
        name: this.state.name,
        surname: this.state.surname,
        phoneNumber: this.state.phoneNumber,
        country: this.state.country,
        province: this.state.province, 
        city: this.state.city,
        address: this.state.address,
        cardnumber: this.state.cardnumber, 
        expirationdate: this.state.expirationdate,
        securitynumber: this.state.securitynumber
    }

    console.log("Email: ", registered.address)
    console.log("Name: ", registered.name)
    console.log("Surname: ", registered.surname)
    console.log("Phone Number: ", registered.phoneNumber)
    console.log("Country: ", registered.country)
    console.log("Province: ", registered.province)
    console.log("City: ", registered.city)
    console.log("Card Number: ", registered.cardnumber)
    console.log("Expiration Date: ", registered.expirationdate)
    console.log("Security Number: ", registered.securitynumber)


    this.setState({
      email: '',
      name: '',
      surname: '',
      phoneNumber: '',
      country: '',
      province: '',
      city: '',
      address: '', 
      cardnumber: '',
      expirationdate: '',
      securitynumber: ''
    })
  }

  render(){
    return(

    <div className='checkout-container'>

      <div className="personalinfo-container">

      <h1 style={{fontFamily:'Open Sans'}}>Personal</h1>
      <h1 style={{fontFamily:'Open Sans', marginLeft: -35}}>INFORMATIONS</h1>

        <div className="name">
          <h>Name</h>
          <form onSubmit={this.onSubmit}>
            <input 
            className="text" 
            placeholder="Type your name"
            onChange={this.changeName}
            value={this.state.name}
            />
          </form>
          <hr style={{width:200}}></hr>
        </div>
      

        <div className="surname">
          <h>Surname</h>
          <form onSubmit={this.onSubmit}>
            <input 
            type="text" 
            className="text"
            placeholder="Type your surname"
            onChange={this.changeSurname}
            value={this.state.surname}
            />
          </form>
          <hr style={{width:200}}></hr>
        </div>

        <div className="email">
          <h>Email</h>
          <form onSubmit={this.onSubmit}>
            <input 
            type="text" 
            className="text"
            placeholder="Type your email"
            onChange={this.changeMail}
            value={this.state.email}
            />
          </form>
          <hr style={{width:200}}></hr>
        </div>

        <div className="phonenumber">
          <h>Phone Number</h>
          <form onSubmit={this.onSubmit}>
            <input 
            type="number"
            className="number"
            placeholder="Type your phone number"
            onChange={this.changePhoneNumber}
            value={this.state.phoneNumber}
            />
          </form>
          <hr style={{width:200}}></hr>
        </div>

        <div className="country">
          <h>Country</h>
          <form onSubmit={this.onSubmit}>
            <input 
            type="text" 
            className="text"
            placeholder="Type your country"
            onChange={this.changeCountry}
            value={this.state.country}
            />
          </form>
          <hr style={{width:200}}></hr>
        </div>

        <div className="province">
          <h>Province</h>
          <form onSubmit={this.onSubmit}>
            <input 
            type="text" 
            className="text"
            placeholder="Type your province"
            onChange={this.changeProvince}
            value={this.state.province}
            />
          </form>
          <hr style={{width:200}}></hr>
        </div>

        <div className="city">
          <h>City</h>
          <form onSubmit={this.onSubmit}>
            <input 
            type="text" 
            className="text"
            placeholder="Type your province"
            onChange={this.changeCity}
            value={this.state.city}
            />
          </form>
          <hr style={{width:200}}></hr>
        </div>

        <div className="addressline">
          <h>Address</h>
          <form onSubmit={this.onSubmit}>
            <input 
            type="text" 
            className="text"
            placeholder="Type your address"
            onChange={this.changeAddress}
            value={this.state.address}
            />
          </form>
          <hr style={{width:200}}></hr>
        </div>

      </div>

      <div className='cardinfo-container'>

        <h1 style={{fontFamily:'Open Sans'}}>CARD</h1>
        <h1 style={{fontFamily:'Open Sans', marginLeft: -35}}>INFORMATIONS</h1>

        <div className="cardnumber">
          <h>Card Number</h>
          <form onSubmit={this.onSubmit}>
            <input 
            className="text" 
            placeholder="Type your card number"
            onChange={this.changeCardNumber}
            value={this.state.cardnumber}
            />
          </form>
          <hr style={{width:200}}></hr>
        </div>

        <div className="expirationdate">
          <h>Expiration Date</h>
          <form onSubmit={this.onSubmit}>
            <input 
            className="text"
            placeholder="Type your expiration date"
            onChange={this.changeDate}
            value={this.state.expirationdate}
            />
          </form>
          <hr style={{width:200}}></hr>
        </div>

        <div className="securitynumber">
          <h>Security Number</h>
          <form onSubmit={this.onSubmit}>
            <input 
            className="number" 
            placeholder="Type your security number"
            pattern='[0-9]{3}'
            onChange={this.changeSecurityNumber}
            value={this.state.securitynumber}
            />
          </form>
          <hr style={{width:200}}></hr>
        </div>

      </div>

      <div className="checkout-button" >
        <form onSubmit={this.onSubmit}>
          <input type='submit' style={{fontFamily:'Open Sans'}} value="Checkout"></input>
        </form>
      </div>

    </div>
    
    )
  }
}
export default Checkout

