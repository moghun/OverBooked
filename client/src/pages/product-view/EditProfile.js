import React, {useState} from 'react'
import Card from '@material-ui/core/Card'
import CardActions from '@material-ui/core/CardActions'
import CardContent from '@material-ui/core/CardContent'
import Button from '@material-ui/core/Button'
import TextField from '@material-ui/core/TextField'
import Typography from '@material-ui/core/Typography'
import axios from 'axios'

const EditProfile = () => {


    const [values, setValues] = useState({
        name: '',
        surname: '',
        adress: '',
        password: '',
        username: '',
    })


    const clickSubmit = () => {
      const update ={
          name: values.name,
          adress: values.adress,
          password: values.password,
          surname: values.surname,
          username: values.username,      
      }


      console.log(update)
//      axios.post('http://localhost:5001/api/users/', update).then(response => console.log(response.data))
      this.setState({
        name: '',
        surname: '',
        adress: '',
        password: '',
        username: '',
          
      })
      }


    const handleChange = name => event => {
        setValues({...values, [name]: event.target.value})
      }

    return (

      <div className='main-container'>
        <div style={{ display: 'flex', justifyContent: 'center'}}>
            <Card>
                <CardContent>
                <Typography variant="h6">
                    Edit Profile
                </Typography>
                <TextField id="username" type="username" label="Username" onChange={handleChange('username')} margin="normal"/><br/>
                <TextField id="password" type="password" label="Password" onChange={handleChange('password')} margin="normal"/><br/>
                <TextField id="name" label="name" onChange={handleChange('name')} margin="normal"/><br/>
                <TextField id="surname" type="surname" label="Surname" onChange={handleChange('surname')} margin="normal"/><br/>
                <TextField id="adress" type="adress" label="Address" onChange={handleChange('address')} margin="normal"/><br/>
                <br/>
                </CardContent>
                <CardActions>
                <Button color="primary" variant="contained" onClick={clickSubmit} >Submit</Button>
                <Button color="secondary" href = "/profile" variant="contained" >Cancel</Button>
                </CardActions>
            </Card>
        </div>
      </div>
    );
}
export default EditProfile;