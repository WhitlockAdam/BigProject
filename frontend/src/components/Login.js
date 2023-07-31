import React, {useState} from "react";
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';

function Login(){

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

    var loginEmail, loginPassword;

    const[message, setMessage] = useState("");

    const doLogin = async event => {

        event.preventDefault();

        var obj = {email: loginEmail.value, password: loginPassword.value};

        var jsonObj = JSON.stringify(obj); 

        try{

            const response = await fetch(
                bp.buildPath("api/login"), 
                {method:"POST", body:jsonObj, headers:{"Content-Type":"application/json"}}
            );

            var res = JSON.parse(await response.text());

            alert(res.jwtToken);

            if(res.error !== "" || res.error !== null){
                
                setMessage(res.error);
            
            }

            else{
                
                var user = {firstName: res.firstName, lastName: res.lastName, _id: res._id, email: res.email};

                localStorage.setItem("user_data", JSON.stringify(user));

                setMessage("");

                window.location.href="/expenses";

            }

        }
        catch(e){

            alert(e.toString());
            
            return;
        
        }

    };

    return(
        <div id="loginDiv">
            <Form onSubmit={doLogin}>
                <Form.Group className="mb-3" controlId="loginForm.email">
                    <Form.Label>Email</Form.Label>
                    <Form.Control type="email" placeholder="you@email.com" ref={(c) => loginEmail = c}/>
                </Form.Group>
                <Form.Group className="mb-3" controlId="loginForm.password">
                    <Form.Label>Password</Form.Label>
                    <Form.Control type="password" placeholder="password" ref={(c) => loginPassword = c}/>
                </Form.Group>
                <Button type="submit">Submit</Button>
            </Form>
            <br/>
            <Button onClick={() => window.location.href = "/resetpassword"}>Reset Password</Button> 
            <span id="loginResult">{message}</span>
        </div>
    );

};

export default Login;