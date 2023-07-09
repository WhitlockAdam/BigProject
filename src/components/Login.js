import React, {useState} from "react";

function Login(){

    var loginName, loginPassword;

    const[message, setMessage] = useState("");

    const doLogin = async event => {

        event.preventDefault();

        alert(loginName.value + " " + loginPassword.value);

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