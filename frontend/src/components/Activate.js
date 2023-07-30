import React, {useState} from 'react';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';

function Activate(){
    
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

    var email, verificationCode;

    const[message, setMessage] = useState("");
    
    const doActivation = async event => {

        event.preventDefault();

        var obj = {email: email.value, verificationCode: verificationCode.value};

        var jsonObj = JSON.stringify(obj); 

        try{

            const response = await fetch(
                buildPath("api/verify"), 
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