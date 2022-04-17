import "../../components/Navigation_Bar/NavigationBar.css";
import { Form, Button, Row, Col } from "react-bootstrap";
import axios from 'axios'

class EditProfile extends Component{


    constructor(){
        super()
        this.state = {
            username:'',
            email:'',
            password:'',
        }

        this.changeEmail = this.changeEmail.bind(this);
        this.changePassword = this.changePassword.bind(this);
        this.changeUserName = this.changeUserName.bind(this);
        this.onSubmit = this.onSubmit.bind(this);
    }


    changeUserName(event){
        this.setState({
            username:event.target.value
        })
    }

    changeEmail(event){
        this.setState({
            email:event.target.value
        })
    }

    changePassword(event){
        this.setState({
            password:event.target.value
        })
    }


    onSubmit(event){
        event.preventDefault();
        const registered ={
            username: this.state.username,
            email: this.state.email,
            password: this.state.password,

        }

        axios.post('http://localhost:3000/', registered).then(response => console.log(response.data))
        this.setState({
            username: '',
            email: '',
            password: '',
        })

    }



    render(){
        return(
            <label title="EDIT PROFILE">
                <Row className="profileContainer">
                    <Form method="post" onSubmit={this.onSubmit}>
                        <label>Name</label>
                        <input
                            type="text"
                            placeholder="Enter UserName"
                            value={this.state.username}
                            onChange={this.changeUserName}
                        ></input>
                        <label>Email Address</label>
                        <input
                            type="email"
                            placeholder="Enter Email"
                            value={this.state.email}
                        ></input>
                        <label>Password</label>
                        <input
                            type="password"
                            placeholder="Enter Password"
                            value={this.state.password}
                            onChange={this.changePassword}
                        ></input>
                        <Button type="submit">
                        Update
                        </Button>
                    </Form>
                </Row>
            </label>
        );
    };
};
  
export default EditProfile;