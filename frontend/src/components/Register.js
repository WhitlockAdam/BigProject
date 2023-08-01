import React, {useState} from 'react';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import axios from 'axios';
import './css/loginsignup.css';

function Register(){

    var bp = require('./Path.js');

    var registerEmail, registerFirstName, registerLastName, registerPassword;

    const[message, setMessage] = useState("");

    const doRegister = async event => {

        event.preventDefault();

        var obj = {email: registerEmail.value, password: registerPassword.value, firstName: registerFirstName.value, lastName: registerLastName.value};

        var jsonObj = JSON.stringify(obj); 

        var config =
        {
            method: 'post',
            url: bp.buildPath('api/register'),
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

                window.location.href="/activate";

            }

        })
        .catch(function(e){

            alert(e.toString());
            
            return;
        
        });

    };

    return(
        <div id="registerDiv">
            <Form onSubmit={doRegister}>
                <Form.Group className="mb-3" controlId="registerForm.email">
                    <Form.Label className='form-label'>Email</Form.Label>
                    <Form.Control className='form-control' type="email" placeholder="you@email.com" ref={(c) => registerEmail = c}/>
                </Form.Group>
                <Form.Group className="mb-3" controlId="registerForm.firstName">
                    <Form.Label className='form-label'>First Name</Form.Label>
                    <Form.Control className='form-control' type="text" placeholder="Jane" ref={(c) => registerFirstName = c}/>
                </Form.Group>
                <Form.Group className="mb-3" controlId="registerForm.lastName">
                    <Form.Label className='form-label'>Last Name</Form.Label>
                    <Form.Control className='form-control' type="text" placeholder="Doe" ref={(c) => registerLastName = c}/>
                </Form.Group>
                <Form.Group className="mb-3" controlId="registerForm.password">
                    <Form.Label className='form-label'>Password</Form.Label>
                    <Form.Control className='form-control' type="password" placeholder="password" ref={(c) => registerPassword = c}/>
                </Form.Group>
                <Button type="submit" className='btn btn-primary'>Submit</Button>
            </Form>
            <span id="loginResult">{message}</span>
        </div>
    );

};

export default Register;