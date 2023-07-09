import React from "react";

function LoggedInName(){

    var user = {};

    const doLogout = event =>{

        event.preventDefault();

    };

    return(
        <div id="loggedInDiv">
            <span id="username"></span>
            <br/>
            <button type="button" id="logoutButton" class="buttons" onClick={doLogout}>Log Out</button>
        </div>
    );

};

export default LoggedInName;