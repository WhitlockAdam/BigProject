import React, {useState} from 'react';
import Button from 'react-bootstrap/Button';
import axios from 'axios';

function Account(){

    var bp = require('./Path.js');

    var _ud = localStorage.getItem("user_data");
    var ud = JSON.parse(_ud);
    var firstName = ud.firstName;
    var lastName = ud.lastName;
    var email = ud.email;
    const [message, setMessage] = useState('');

    const doSendResetPasswordEmail = async event =>{
        event.preventDefault();

        var obj = {email: email};

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

        axios(config).then(async function (response){

            var res = response.data;

            if(res.error){

                setMessage(res.error);
            
            }
            else{

                window.location.href = "/resetpassword2";
            
            }
        })
        .catch(function(e){

            alert(e.toString());
            
            return;
        
        });
    }

    const doSendDeleteAccountEmail = async event =>{
        event.preventDefault();

        var obj = {email: email};

        var jsonObj = JSON.stringify(obj); 

        var config =
        {
            method: 'post',
            url: bp.buildPath('api/senddeleteaccountemail'),
            headers:
            {
                'Content-Type': 'application/json'
            },
            data: jsonObj
        };

        axios(config).then(async function (response){

            var res = response.data;

            if(res.error){

                setMessage(res.error);
            
            }
            else{

                window.location.href = "/deleteaccount";
            
            }
        })
        .catch(function(e){

            alert(e.toString());
            
            return;
        
        });
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
            <Button onClick={doSendDeleteAccountEmail}>Delete Account</Button>
            <br/>
            <span id="messageSpan">{message}</span>
        </div>
    );
}

export default Account;