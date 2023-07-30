import React, {useState} from "react";
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';

function SendResetPasswordEmail(){
    
    var bp = require('./Path.js');

    /*
    const app_name = "budget-manager-group14-bacfc735e9a2";
    function buildPath(route)
    {

        if(process.env.NODE_ENV === "production")
        {
            return("https://" + app_name + ".herokuapp.com/" + route);
        }
        else
        {
            return "http://localhost:5000/" + route;
        }

    }
    */

    var email;

    const[message, setMessage] = useState("");
    
    const doSendResetPasswordEmail = async event => {

        event.preventDefault();

        var obj = {email: email.value};

        var jsonObj = JSON.stringify(obj); 

        try{

            const response = await fetch(
                bp.buildPath("api/sendresetpasswordemail"), 
                {method:"POST", body:jsonObj, headers:{"Content-Type":"application/json"}}
            );

            var res = JSON.parse(await response.text());

            if(res.error !== ""){
                
                setMessage(res.error)
            
            }

            else{

                setMessage("");

                window.location.href="/resetpassword2";

            }

        }
        catch(e){

            alert(e.toString());
            
            return;
        
        }

    };

    return( 
    <div id="activateDiv">
        <Form onSubmit={doSendResetPasswordEmail}>
            <Form.Group className="mb-3" controlId="resetPasswordForm.email">
                <Form.Label>Email</Form.Label>
                <Form.Control type="email" placeholder="you@email.com" ref={(c) => email = c}/>
            </Form.Group>
            <Button type="submit">Submit</Button>
        </Form>
        <span id="resetPasswordResult">{message}</span>
    </div>
    );

    

}

export default SendResetPasswordEmail;