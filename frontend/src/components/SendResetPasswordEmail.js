import React, {useState} from "react";
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import axios from 'axios';

function SendResetPasswordEmail(){
    
    var bp = require('./Path.js');

    var email;

    const[message, setMessage] = useState("");
    
    const doSendResetPasswordEmail = async event => {

        event.preventDefault();

        var obj = {email: email.value};

        var jsonObj = JSON.stringify(obj); 

        var config =
        {
            method: 'post',
            url: bp.buildPath('api/sendresetpasswordemail'),
            headers:
            {
                'Content-Type': 'application/json'
            },
            data: jsonObj
        };

        axios(config).then(function(response){

            var res = response.data;

            if(res.error){
                
                setMessage(res.error)
            
            }

            else{

                setMessage("");

                window.location.href="/resetpassword2";

            }

        })
        .catch(function(e){

            alert(e.toString());
            
            return;
        
        });

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