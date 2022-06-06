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
    tax_id: "",
  });

  const clickSubmit = () => {
    const update = {
      name: values.name || undefined,
      adress: values.adress || undefined,
      password: values.password || undefined,
      surname: values.surname || undefined,
      username: values.username || undefined,
      tax_id: values.tax_id || undefined,
    };

    try {
      axios.put("http://localhost:5001/api/users/" + currUser._id, update, {
        headers: { token: "Bearer " + currUser.accessToken },
      });
      toast.success("Your information has been updated successfully", {
        position: toast.POSITION.TOP_CENTER,
      });
    } catch (err) {
      alert(err);
    }

    this.setState({
      name: "",
      surname: "",
      adress: "",
      password: "",
      username: "",
      tax_id: "",
    });
  };

  const handleChange = (name) => (event) => {
    setValues({ ...values, [name]: event.target.value });
  };

  return (
    <div className="main-container" style={{marginTop:'25px'}}>
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
              id="tax_id"
              type="tax_id"
              label="Tax ID"
              onChange={handleChange("tax_id")}
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
            <Button color="secondary" href="/profile" variant="contained">
              Cancel
            </Button>
            <Button color="primary" variant="contained" onClick={clickSubmit}>
              Submit
            </Button>
          </CardActions>
        </Card>
      </div>
    </div>
  );
};
export default EditProfile;
