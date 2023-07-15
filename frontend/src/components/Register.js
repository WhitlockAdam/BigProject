import React, {useState} from 'react';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';

function Register(){

    var registerEmail, registerFirstName, registerLastName, registerPassword;

    const[message, setMessage] = useState("");

    const doRegister = async event => {

        event.preventDefault();

        var obj = {email: registerEmail.value, firstName: registerFirstName.value, lastName: registerLastName.value, password: registerPassword.value};

        var jsonObj = JSON.stringify(obj); 

        try{

            const response = await fetch(
                "http://localhost:5000/api/register", 
                {method:"POST", body:jsonObj, headers:{"Content-Type":"application/json"}}
            );

            var res = JSON.parse(await response.text());

            if(res.id <= 0){
                
                setMessage("Failed to register.")
            
            }

            else{
                
                var user = {firstName:res.firstName, lastName:res.lastName, id:res.id};

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