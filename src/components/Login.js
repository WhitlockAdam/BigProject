import React, {useState} from "react";

function Login(){

    var loginName, loginPassword;

    const[message, setMessage] = useState("");

    const doLogin = async event => {

        event.preventDefault();

        var obj = {login: loginName.value, password: loginPassword.value};

        var jsonObj = JSON.stringify(obj); 

        try{

            const response = await fetch(
                "http://localhost:5000/api/login", 
                {method:"POST", body:jsonObj, headers:{"Content-Type":"application/json"}}
            );

            var res = JSON.parse(await response.text());

            if(res.id <= 0){
                
                setMessage("Invalid credentials.")
            
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
        <div id="loginDiv">
            <form onSubmit={doLogin}>
                <span>Log In</span>
                <br/>
                <input type="text" id="loginName" placeholder="Username" ref={(c) => loginName = c}></input>
                <br/>
                <input type="password" id="loginPassword" placeholder="Password" ref={(c) => loginPassword = c}></input>
                <br/>
                <input type="submit" id="loginButton" class="buttons" value="Submit"></input>
            </form>
            <span id="loginResult">{message}</span>
        </div>
    );

};

export default Login;