import React, {useState} from 'react'
import Card from '@material-ui/core/Card'
import CardActions from '@material-ui/core/CardActions'
import CardContent from '@material-ui/core/CardContent'
import Button from '@material-ui/core/Button'
import TextField from '@material-ui/core/TextField'
import Typography from '@material-ui/core/Typography'

const EditProfile = () => {


    const [values, setValues] = useState({
        name: '',
        email: '',
        password: '',
        seller: false,
        error: ''
    })


    const clickSubmit = () => {
        const user = {
          name: values.name || undefined,
          email: values.email || undefined,
          password: values.password || undefined,
          seller: values.seller || undefined
        }
        /*
        update({
          userId: match.params.userId
        }, {
          t: jwt.token
        }, user).then((data) => {
          if (data && data.error) {
            setValues({...values, error: data.error})
          } else {
            auth.updateUser(data, ()=>{
              setValues({...values, userId: data._id})
            })
          }
        })
        */
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
                <TextField id="name" label="Name" onChange={handleChange('name')} margin="normal"/><br/>
                <TextField id="name" type="Name" label="Surname" onChange={handleChange('surname')} margin="normal"/><br/>
                <TextField id="password" type="password" label="Password" onChange={handleChange('password')} margin="normal"/>
                <Typography variant="subtitle1">
                    Seller Account
                </Typography>
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