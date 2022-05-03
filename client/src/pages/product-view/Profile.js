import { Button } from "@material-ui/core";
import { Card } from "@material-ui/core";
import Avatar from '@material-ui/core/Avatar'
import { createContext, useState } from "react";
import ListItemText from '@material-ui/core/ListItemText'

const Profile = () => {



  /*Store = createContext();
  const { state} = useContext(Store);
  const { userInfo } = state;
  const [name] = useState(userInfo.name);
  const [email] = useState(userInfo.email);
  const [surname] = useState(userInfo.surname);
  const [password] = useState(userInfo.password);

  */

  /* useEffect(() => {
    read({
      userId: match.params.userId
    }, {t: jwt.token}, signal).then((data) => {
      if (data && data.error) {
        setRedirectToSignin(true)
      } else {
        setUser(data)
      }
    })

    return function cleanup(){
      abortController.abort()
    }

  }, [match.params.userId]) */


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
                <h2>Name: Name</h2>

                <h3> Surname: Surname </h3>
                <br/>
                <h4>Customer</h4>
                <br/>
                <h5>E-MAIL: E-MAIL</h5>
                <h6>Password: Password </h6>
              </div>


              <div>
                <Button href = "/editprofile" className="btn">Edit Profile</Button>
                <Button href = "/createstore" className="btn2">Become Seller</Button>
                <Button className="btn3">My Orders</Button>
              </div>
          </div>
        </Card>

    );
};

export default Profile;