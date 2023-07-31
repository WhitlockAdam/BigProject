import React from "react";
import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import PageTitle from "./PageTitle";
import LoggedInName from "./LoggedInName";

function DefaultNav(){
    return(
        <Nav className="me-auto">
            <Nav.Link href="/">Home</Nav.Link> 
            <Nav.Link href="/login">Login</Nav.Link>
            <Nav.Link href="/register">Register</Nav.Link>
            <Nav.Link href="/activate">Activate</Nav.Link>
        </Nav>
    );
}

function LoggedInNav(){
    return(
        <Nav className="me-auto">
            <Nav.Link href="/">Home</Nav.Link>
            <Nav.Link href="/expenses">Expenses</Nav.Link>
            <Nav.Link href="/account">Account</Nav.Link>
        </Nav>
    );
}

function NavigationBar(){
    return(
        <div>
            <Navbar expand="lg" className="bg-body-tertiary">
                <Container>
                    <Navbar.Brand>
                        <PageTitle/>
                    </Navbar.Brand>
                    <Navbar.Toggle aria-controls="basic-navbar-nav"/>
                    <Navbar.Collapse id="basic-navbar-nav">
                        {localStorage.getItem("user_data") == null ? <DefaultNav/> : <LoggedInNav/>}
                    </Navbar.Collapse>
                    {localStorage.getItem("user_data") != null && <LoggedInName/>}
                </Container>
            </Navbar>
            
        </div>
    );
};

export default NavigationBar;