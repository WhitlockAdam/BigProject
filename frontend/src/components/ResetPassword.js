import React, {useState} from "react";
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import axios from "axios";
import './css/loginsignup.css';

function ResetPassword(){
    
    var bp = require('./Path.js');

    var email, verificationCode, newPassword;

    const[message, setMessage] = useState("");
    
    const doResetPassword = async event => {

        event.preventDefault();

        var obj = {email: email.value, verificationCode: verificationCode.value, newPassword: newPassword.value};

        var jsonObj = JSON.stringify(obj); 

        var config =
        {
            method: 'post',
            url: bp.buildPath('api/resetpassword'),
            headers:
            {
                'Content-Type': 'application/json'
            },
            data: jsonObj
        };

        axios(config).then(function (response){

            var res = response.data;

            if(res.error){
                
                setMessage(res.error)
            
            }

            else{

                setMessage("");

                window.location.href="/login";

            }

        })
        .catch(function (e){

            console.log(e);
        
        });

    };

    return( 
    <div id="resetPasswordDiv">
        <p>Check your email for a message containing a six digit code.</p>
        <Form onSubmit={doResetPassword}>
            <Form.Group className="mb-3" controlId="resetPasswordForm.email">
                <Form.Label className='form-label'>Email</Form.Label>
                <Form.Control type="email" className='form-control' placeholder="you@email.com" ref={(c) => email = c}/>
            </Form.Group>
            <Form.Group className="mb-3" controlId="resetPasswordForm.code">
                <Form.Label className='form-label'>Verification Code</Form.Label>
                <Form.Control type="text" className='form-control' placeholder="000000" ref={(c) => verificationCode = c}/>
            </Form.Group>
            <Form.Group className="mb-3" controlId="resetPasswordForm.newPassword">
                <Form.Label className='form-label'>New Password</Form.Label>
                <Form.Control type="password" className='form-control' placeholder="new password" ref={(c) => newPassword = c}/>
            </Form.Group>
            <Button className="btn btn-primary" type="submit">Submit</Button>
        </Form>
        <span id="resetPasswordResult">{message}</span>
    </div>
    );

    

}

export default ResetPassword;