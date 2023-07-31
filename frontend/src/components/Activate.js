import React, {useState} from 'react';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import axios from 'axios';

function Activate(){
    
    var bp = require('./Path.js');
    
    var email, verificationCode;

    const[message, setMessage] = useState("");
    
    const doActivation = async event => {

        event.preventDefault();

        var obj = {email: email.value, verificationCode: verificationCode.value};

        var jsonObj = JSON.stringify(obj); 

        var config =
        {
            method: 'post',
            url: bp.buildPath('api/verify'),
            headers:
            {
                'Content-Type': 'application/json'
            },
            data: jsonObj
        };

        axios(config).then(async function(response){

            var res = response.data;

            if(res.error !== ""){
                
                setMessage(res.error)
            
            }

            else{

                setMessage("");

                window.location.href="/login";

            }

        })
        .catch(function(e){

            alert(e.toString());
            
            return;
        
        });

    };

    return( 
    <div id="activateDiv">
        <Form onSubmit={doActivation}>
            <Form.Group className="mb-3" controlId="activateForm.email">
                <Form.Label>Email</Form.Label>
                <Form.Control type="email" placeholder="you@email.com" ref={(c) => email = c}/>
            </Form.Group>
            <Form.Group className="mb-3" controlId="activateForm.code">
                <Form.Label>Verification Code</Form.Label>
                <Form.Control type="text" placeholder="000000" ref={(c) => verificationCode = c}/>
            </Form.Group>
            <Button type="submit">Submit</Button>
        </Form>
        <span id="verificationResult">{message}</span>
    </div>
    );

    

}

export default Activate;