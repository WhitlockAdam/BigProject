import React, {useState} from "react";
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import axios from "axios";
import ToggleButton from "react-bootstrap/esm/ToggleButton.js";

function DeleteAccount(){
    
    var bp = require('./Path.js');

    var email, verificationCode;

    const[message, setMessage] = useState("");

    const[confirmation, setConfirmation] = useState(false);
    
    const doDeleteAccount = async event => {

        event.preventDefault();

        if(!confirmation){
            return;
        }

        var obj = {email: email.value, verificationCode: verificationCode.value};

        var jsonObj = JSON.stringify(obj); 

        var config =
        {
            method: 'post',
            url: bp.buildPath('api/deleteaccount'),
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

                localStorage.removeItem("user_data");

                window.location.href="/login";

            }

        })
        .catch(function (e){

            console.log(e);
        
        });

    };

    return( 
    <div id="activateDiv">
        <p>Check your email for a message containing a six digit code.</p>
        <Form onSubmit={doDeleteAccount}>
            <Form.Group className="mb-3" controlId="deleteAccountForm.email">
                <Form.Label>Email</Form.Label>
                <Form.Control type="email" placeholder="you@email.com" ref={(c) => email = c}/>
            </Form.Group>
            <Form.Group className="mb-3" controlId="deleteAccountForm.code">
                <Form.Label>Verification Code</Form.Label>
                <Form.Control type="text" placeholder="000000" ref={(c) => verificationCode = c}/>
            </Form.Group>
            <ToggleButton className="mb-2" type='checkbox' variant="outline-primary" checked={confirmation} onClick={() => setConfirmation(!confirmation)}>Confirm</ToggleButton>
            <br/>
            <Button type="submit">Submit</Button>
        </Form>
        <span id="deleteAccountResult">{message}</span>
    </div>
    );

}

export default DeleteAccount;