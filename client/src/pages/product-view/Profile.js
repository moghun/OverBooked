import { Button } from "@material-ui/core";
import { Card } from "@material-ui/core";
import Avatar from "@material-ui/core/Avatar";
import { useState } from "react";
import { Typography } from "@material-ui/core";
import { useSelector } from "react-redux";

const Profile = () => {
  const currUser = useSelector((state) => state.user.currentUser);

  function userstatus(userrole) {
    if (userrole === "customer") {
      return <h2> CUSTOMER </h2>;
    } else if (userrole === "product-manager") {
      return <h2> Product Manager </h2>;
    } else if (userrole === "sales-manager") {
      return <h2> Sales Manager </h2>;
    }
  }

  function buttonstatus(userrole) {
    if (userrole === "customer") {
      return (
        <Button className="btn3" href="\myorders">
          {" "}
          My Orders{" "}
        </Button>
      );
    } else if (userrole === "product-manager") {
      return <Button className="btn3"> Edit Product Panel </Button>;
    } else if (userrole === "sales-manager") {
      return <Button className="btn3"> Edit Sales Panel </Button>;
    }
  }

  return (
    <Card>
      <div class="upper-container">
        <p
          style={{
            display: "flex",
            justifyContent: "center",
            fontWeight: "bold",
            fontSize: 40,
          }}
        >
          YOUR PROFILE
        </p>
      </div>
      <div class="lower-container">
        <div>
          <Avatar style={{ width: 200, height: 200 }} />
        </div>

        <div>
          <h2>Name: {currUser.name} </h2>
          <br />
          <h2>Surname: {currUser.surname} </h2>
          <br />
          {userstatus(currUser.user_role)}
          <br />
          <h2>E-MAIL: {currUser.email} </h2>
          <br />
          <h2>Username: {currUser.username} </h2>
          <br />

          <h2>Adress: {currUser.adress} </h2>
          <br />
        </div>

        <div>
          <Button href="/editprofile" className="btn">
            Edit Profile
          </Button>
          {buttonstatus(currUser.user_role)}
        </div>
      </div>
    </Card>
  );
};

export default Profile;
