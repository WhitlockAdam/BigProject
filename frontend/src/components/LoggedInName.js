import React from "react";
import Button from "react-bootstrap/esm/Button";

function LoggedInName(){

    var _ud = localStorage.getItem("user_data");
    var ud = JSON.parse(_ud);
    var firstName = ud.firstName;
    var lastName = ud.lastName;

    const doLogout = event =>{

        event.preventDefault();

        localStorage.removeItem("user_data");
        window.location.href="/";

    };

    return(
        <div id="loggedInDiv">
            <span id="username">{firstName} {lastName}</span>
            <Button style={{marginLeft: '.5rem'}} type="button" id="logoutButton" class="buttons" onClick={doLogout}>Log Out</Button>
        </div>
    );

};

export default LoggedInName;