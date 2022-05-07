import { Button } from "@material-ui/core";
import { Card } from "@material-ui/core";
import Avatar from '@material-ui/core/Avatar'
import { useState } from "react";
import { Typography } from "@material-ui/core";
import {useSelector} from "react-redux";

const Profile = () => {



  const currUser = useSelector((state) => state.user.currentUser);

  const [values, setValues] = useState({
    name: '',
    surname: '',
    adress: '',
    username: '',
    user_role: '',
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
                <Typography id = "name" onChange={currUser.name} margin="normal"/><br/>
                <h3> Surname: </h3>
                <Typography id = "surname" onChange={currUser.surname} margin="normal"/><br/>
                {userstatus(this.values.user_role)}
                <h5>E-MAIL: </h5>
                <Typography id = "email" onChange={currUser.email} margin="normal"/><br/>
                <h4>Username: </h4>
                <Typography id = "username" onChange={currUser.username} margin="normal"/><br/>

                <h5>Name: </h5>
                <Typography id = "adress" onChange={currUser.adress} margin="normal"/><br/>

              </div>


              <div>
                <Button href = "/editprofile" className="btn">Edit Profile</Button>
                {buttonstatus(currUser.user_role)}
              </div>
          </div>
        </Card>

    );
};

export default Profile;