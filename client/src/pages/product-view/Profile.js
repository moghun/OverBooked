import { Button } from "@material-ui/core";
import { Card } from "@material-ui/core";
import Avatar from '@material-ui/core/Avatar'
import { useState } from "react";
import { Typography } from "@material-ui/core";

const Profile = () => {



  const [values, setValues] = useState({
    name: '',
    surname: '',
    adress: '',
    username: '',
    user_role: 'customer',
    email: '',
  })


  function userstatus(userrole) {

    if(userrole === 'customer') {


      return (<Typography> CUSTOMER </Typography>)
    }


    else if (userrole === 'product-manager') {

      return (<Typography> Product Manager </Typography>)


    }


    else if (userrole === 'sales-manager') {

      return (<Typography> Sales Manager </Typography>)


    }
  }


  function buttonstatus(userrole) {

    if(userrole === 'customer') {


      return (<Button className="btn3" href = "\myorders"> My Orders </Button>)
    }


    else if (userrole === 'product-manager') {

      return (<Button className="btn3"> Edit Product Panel </Button>)


    }


    else if (userrole === 'sales-manager') {

      return (<Button className="btn3"> Edit Sales Panel </Button>)


    }
  }






  const handleChange = name => event => {

    const get ={
      name: this.values.name,
      adress: this.values.adress,
      surname: this.values.surname,
      username: this.values.username, 
      user_role: this.values.user_role,
      email: this.values.email,

    }

    axios.get('http://localhost:5001/api/users/'+"id", get).then(response => console.log(response.data))
    setValues({...values, [name]: event.target.value})
  }


    return (
        <Card>
          <div class="upper-container">
            <p style = {{ display: 'flex', justifyContent: 'center', fontWeight: 'bold', fontSize: 40}}>
              YOUR PROFILE
            </p>
          </div>
          <div class="lower-container">

              <div>
                <Avatar style={{width: 200, height: 200}}/>
              </div>

              <div>
                <h2>Name: </h2>
                <Typography id = "name" onChange={handleChange('name')} margin="normal"/><br/>
                <h3> Surname: </h3>
                <Typography id = "surname" onChange={handleChange('surname')} margin="normal"/><br/>
                {userstatus(this.values.user_role)}
                <h5>E-MAIL: </h5>
                <Typography id = "email" onChange={handleChange('email')} margin="normal"/><br/>
                <h4>Username: </h4>
                <Typography id = "username" onChange={handleChange('username')} margin="normal"/><br/>

                <h5>Name: </h5>
                <Typography id = "adress" onChange={handleChange('adress')} margin="normal"/><br/>

              </div>


              <div>
                <Button href = "/editprofile" className="btn">Edit Profile</Button>
                {buttonstatus(this.values.user_role)}
              </div>
          </div>
        </Card>

    );
};

export default Profile;