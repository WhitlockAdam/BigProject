import React, {useState} from "react";
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';

function ResetPassword(){
    
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

    var email, verificationCode, newPassword;

    const[message, setMessage] = useState("");
    
    const doResetPassword = async event => {

        event.preventDefault();

        var obj = {email: email.value, verificationCode: verificationCode.value, newPassword: newPassword.value};

        var jsonObj = JSON.stringify(obj); 

        try{

            const response = await fetch(
                bp.buildPath("api/resetpassword"), 
                {method:"POST", body:jsonObj, headers:{"Content-Type":"application/json"}}
            );

            var res = JSON.parse(await response.text());

            if(res.error !== ""){
                
                setMessage(res.error)
            
            }

            else{

                setMessage("");

                window.location.href="/login";

            }

        }
        catch(e){

            alert(e.toString());
            
            return;
        
        }

    };

    return( 
    <div id="activateDiv">
        <p>Check your email for a message containing a six digit code.</p>
        <Form onSubmit={doResetPassword}>
            <Form.Group className="mb-3" controlId="resetPasswordForm.email">
                <Form.Label>Email</Form.Label>
                <Form.Control type="email" placeholder="you@email.com" ref={(c) => email = c}/>
            </Form.Group>
            <Form.Group className="mb-3" controlId="resetPasswordForm.code">
                <Form.Label>Verification Code</Form.Label>
                <Form.Control type="text" placeholder="000000" ref={(c) => verificationCode = c}/>
            </Form.Group>
            <Form.Group className="mb-3" controlId="resetPasswordForm.newPassword">
                <Form.Label>New Password</Form.Label>
                <Form.Control type="password" placeholder="new password" ref={(c) => newPassword = c}/>
            </Form.Group>
            <Button type="submit">Submit</Button>
        </Form>
        <span id="resetPasswordResult">{message}</span>
    </div>
    );

    

}

export default ResetPassword;