import React, {useState} from 'react';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';

function Register(){

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

    var registerEmail, registerFirstName, registerLastName, registerPassword;

    const[message, setMessage] = useState("");

    const doRegister = async event => {

        event.preventDefault();

        var obj = {email: registerEmail.value, password: registerPassword.value, firstName: registerFirstName.value, lastName: registerLastName.value};

        var jsonObj = JSON.stringify(obj); 

        try{

            const response = await fetch(
                buildPath("api/register"), 
                {method:"POST", body:jsonObj, headers:{"Content-Type":"application/json"}}
            );

            var res = JSON.parse(await response.text());

            if(res.error !== ""){
                
                setMessage(res.error)
            
            }

            else{

                setMessage("");

                window.location.href="/activate";

            }

        }
        catch(e){

            alert(e.toString());
            
            return;
        
        }

    };

    return(
        <div id="registerDiv">
            <Form onSubmit={doRegister}>
                <Form.Group className="mb-3" controlId="registerForm.email">
                    <Form.Label>Email</Form.Label>
                    <Form.Control type="email" placeholder="you@email.com" ref={(c) => registerEmail = c}/>
                </Form.Group>
                <Form.Group className="mb-3" controlId="registerForm.firstName">
                    <Form.Label>First Name</Form.Label>
                    <Form.Control type="text" placeholder="Jane" ref={(c) => registerFirstName = c}/>
                </Form.Group>
                <Form.Group className="mb-3" controlId="registerForm.lastName">
                    <Form.Label>Last Name</Form.Label>
                    <Form.Control type="text" placeholder="Doe" ref={(c) => registerLastName = c}/>
                </Form.Group>
                <Form.Group className="mb-3" controlId="registerForm.password">
                    <Form.Label>Password</Form.Label>
                    <Form.Control type="password" placeholder="password" ref={(c) => registerPassword = c}/>
                </Form.Group>
                <Button type="submit">Submit</Button>
            </Form>
            <span id="loginResult">{message}</span>
        </div>
    );

};

export default Register;