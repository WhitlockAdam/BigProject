import React from 'react';
import Button from 'react-bootstrap/Button';

function Account(){
    var _ud = localStorage.getItem("user_data");
    var ud = JSON.parse(_ud);
    var firstName = ud.firstName;
    var lastName = ud.lastName;
    var email = ud.email;
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

    const doSendResetPasswordEmail = async event =>{
        event.preventDefault();

        var obj = {email: email};

        var jsonObj = JSON.stringify(obj); 

        try{

            const response = await fetch(
                buildPath("api/sendresetpasswordemail"), 
                {method:"POST", body:jsonObj, headers:{"Content-Type":"application/json"}}
            );

            var res = JSON.parse(await response.text());

            window.location.href = "/resetpassword2";

        }
        catch(e){

            alert(e.toString());
            
            return;
        
        }
    }

    return(
        <div id="accountDiv">
            <span id="firstName">First Name: {firstName}</span>
            <br/>
            <span id="lastName">Last Name: {lastName}</span>
            <br/>
            <br/>
            <Button onClick={doSendResetPasswordEmail}>Change Password</Button>
            <br/>
            <br/>
            <Button>Delete Account</Button>
        </div>
    );
}

export default Account;