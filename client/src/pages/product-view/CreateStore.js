import Card from '@material-ui/core/Card';
import CardActions from '@material-ui/core/CardActions';
import Button from '@material-ui/core/Button';
import { CardContent } from '@material-ui/core';
import Typography from '@material-ui/core/Typography';
import React, {useState} from 'react';
import TextField from '@material-ui/core/TextField'
import Icon from '@material-ui/core/Icon'

const CreateStore = () => {


  const [values, setValues] = useState({
    name: '',
    description: '',
    image: '',
    error: '',
  })

  const handleChange = name => event => {
    const value = name === 'image'
      ? event.target.files[0]
      : event.target.value
    setValues({...values, [name]: value })
  }


  const clickSubmit = () => {

    /*
    let shopData = new FormData()
    
    values.name && shopData.append('name', values.name)
    values.description && shopData.append('description', values.description)
    values.image && shopData.append('image', values.image)
    
    create({
      userId: jwt.user._id
    }, {
      t: jwt.token
    }, shopData).then((data) => {
      if (data.error) {
        setValues({...values, error: data.error})
      } else {
        setValues({...values, error: '', redirect: true})
      }
    })
    */
  }
  
  return (


    <div classname = 'main-container'>
  
      <div style={{ display: 'flex', justifyContent: 'center'}}>


        <Card>
          <CardContent>

            <Typography type="headline" component="h2">
              New Shop
            </Typography>
            <br/>
            <br/>
            <input accept="image/*" onChange={handleChange('image')} id="icon-button-file" type="file" />
            <label htmlFor="icon-button-file">
              <Button variant="contained" color="secondary" component="span">
                Upload Logo
              </Button>
            </label><br/>
            <TextField id="name" label="Name" value={values.name} onChange={handleChange('name')} margin="normal"/><br/>
            <TextField
              id="multiline-flexible"
              label="Description"
              multiline
              value={values.description}
              onChange={handleChange('description')}
              margin="normal"
            /><br/> {
              values.error && (<Typography component="p" color="error">
                <Icon color="error">error</Icon>
                {values.error}</Typography>)
            }
            <CardActions>
              <Button color="primary" onClick={clickSubmit} variant="contained">Submit</Button>
              <Button href = "/profile" variant="contained">Cancel</Button>
            </CardActions>
          </CardContent>
        </Card>
      </div>
    </div>
  
  );
};


export default CreateStore;