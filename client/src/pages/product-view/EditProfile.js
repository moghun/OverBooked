import React, { useState } from "react";
import Card from "@material-ui/core/Card";
import CardActions from "@material-ui/core/CardActions";
import CardContent from "@material-ui/core/CardContent";
import Button from "@material-ui/core/Button";
import TextField from "@material-ui/core/TextField";
import Typography from "@material-ui/core/Typography";
import axios from "axios";
import { useSelector } from "react-redux";
import { toast } from "react-toastify";

const EditProfile = () => {
  const currUser = useSelector((state) => state.user.currentUser);

  const [values, setValues] = useState({
    name: "",
    surname: "",
    adress: "",
    password: "",
    username: "",
  });

  const clickSubmit = () => {
    toast.success("User Updated Successfully");

    const update = {
      name: values.name || undefined,
      adress: values.adress || undefined,
      password: values.password || undefined,
      surname: values.surname || undefined,
      username: values.username || undefined,
    };

    try {
      axios.put("http://localhost:5001/api/users/" + currUser._id, update, {
        headers: { token: "Bearer " + currUser.accessToken },
      });
    } catch (err) {
      toast.error(err);
    }

    this.setState({
      name: "",
      surname: "",
      adress: "",
      password: "",
      username: "",
    });
  };

  const handleChange = (name) => (event) => {
    setValues({ ...values, [name]: event.target.value });
  };

  return (
    <div className="main-container">
      <div style={{ display: "flex", justifyContent: "center" }}>
        <Card>
          <CardContent>
            <Typography variant="h6">Edit Profile</Typography>
            <TextField
              id="username"
              type="username"
              label="Username"
              onChange={handleChange("username")}
              margin="normal"
            />
            <br />
            <TextField
              id="password"
              type="password"
              label="Password"
              onChange={handleChange("password")}
              margin="normal"
            />
            <br />
            <TextField
              id="name"
              type="name"
              label="Name"
              onChange={handleChange("name")}
              margin="normal"
            />
            <br />
            <TextField
              id="surname"
              type="surname"
              label="Surname"
              onChange={handleChange("surname")}
              margin="normal"
            />
            <br />
            <TextField
              id="adress"
              type="adress"
              label="Adress"
              onChange={handleChange("adress")}
              margin="normal"
            />
            <br />
            <br />
          </CardContent>
          <CardActions>
            <Button color="primary" variant="contained" onClick={clickSubmit}>
              Submit
            </Button>
            <Button color="secondary" href="/profile" variant="contained">
              Cancel
            </Button>
          </CardActions>
        </Card>
      </div>
    </div>
  );
};
export default EditProfile;
