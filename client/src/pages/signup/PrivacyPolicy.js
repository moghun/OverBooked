import { Button } from "@material-ui/core";
import "../../components/Navigation_Bar/NavigationBar.css";


const PrivacyPolicy = () => {


    return (


        <div>

        <Button href="/signup" color = 'grey' variant="contained" style = {{marginLeft: '10px', marginTop: '10px'}}>
                Back to Sign Up
        </Button>
        <div style = {{maxWidth:'750px', marginLeft: '400px'}}>


            <h1 style = {{marginTop: '35px', marginBottom: '30px', fontWeight: 'bold'}}>PRIVACY POLICY</h1>

        </div>

        <div>
            
            <p style = {{marginLeft: '80px', marginRight: '80px'}}> This page informs you of our policies regarding the collection, use, and disclosure of personal data when you use our Service and the choices you have associated with that data. </p>
        </div>


        <div>

        <p style = {{marginLeft: '80px', marginRight: '80px'}}> We use your data to provide and improve the Service. By using the Service, you agree to the collection and use of information in accordance with this policy. Unless otherwise defined in this Privacy Policy, terms used in this Privacy Policy have the same meanings as in our Terms and Conditions,</p>

        </div>



        <div style = {{maxWidth:'750px', marginLeft: '300px'}}>

            <h1 style = {{marginTop: '35px', marginBottom: '30px', fontWeight: 'bold'}}>Information Collection And Use</h1>
        </div>



        <p style = {{marginLeft: '80px', marginRight: '80px'}}> We collect several different types of information for various purposes to provide and improve our Service to you.</p>
        <p style = {{marginLeft: '80px', marginRight: '80px'}}> While using our Service, we may ask you to provide us with certain personally identifiable information that can be used to contact or identify you ("Personal Data").</p>

        </div>
    )


}

export default PrivacyPolicy;