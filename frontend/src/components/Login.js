import React, {useState} from "react";
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import axios from 'axios';
import jwt_decode from 'jwt-decode'; 
import './css/loginsignup.css';

function Login(){

    var bp = require('./Path.js');
    var storage = require('../tokenStorage.js')

    var loginEmail, loginPassword;

    const[message, setMessage] = useState("");

    const doLogin = async event => {

        event.preventDefault();

        var obj = {email: loginEmail.value, password: loginPassword.value};

        var jsonObj = JSON.stringify(obj); 

        var config =
        {
            method: 'post',
            url: bp.buildPath('api/login'),
            headers:
            {
                'Content-Type': 'application/json'
            },
            data: jsonObj
        };

        axios(config).then(function (response){

            var res = response.data;

            if(res.error){
                
                setMessage(res.error);
            
            }

            else{

                storage.storeToken(res);

                var ud = jwt_decode(storage.retrieveToken(),{complete: true});

                var user = {firstName: ud.firstName, lastName: ud.lastName, _id: ud._id, email: ud.email};

                localStorage.setItem("user_data", JSON.stringify(user));

                setMessage("");

                window.location.href="/expenses";

            }

        })
        .catch(function (e){

            console.log(e);
        
        });

    };

    return(
        <div id="loginDiv">
            <Form onSubmit={doLogin}>
                <Form.Group className="mb-3" controlId="loginForm.email">
                    <Form.Label className='form-label'>Email</Form.Label>
                    <Form.Control className='form-control' type="email" placeholder="you@email.com" ref={(c) => loginEmail = c}/>
                </Form.Group>
                <Form.Group className="mb-3" controlId="loginForm.password">
                    <Form.Label className='form-label'>Password</Form.Label>
                    <Form.Control className='form-control' type="password" placeholder="password" ref={(c) => loginPassword = c}/>
                </Form.Group>
                <Button type="submit" className="btn btn-primary">Submit</Button>
            </Form>
            <br/>
            <Button className="btn btn-primary" onClick={() => window.location.href = "/resetpassword"}>Reset Password</Button> 
            <br/>
            <span id="loginResult">{message}</span>
        </div>
    );

};

export default Login;