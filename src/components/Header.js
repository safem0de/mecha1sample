import React, { Component } from 'react';
import {Navbar,Nav,NavDropdown,Form,FormControl,Button} from 'react-bootstrap';
class Header extends Component{
    render(){
        return(
            <Navbar bg="light" expand="lg">
            <Navbar.Brand href="All">Mecha-Sample</Navbar.Brand>
            <Navbar.Toggle aria-controls="basic-navbar-nav" />
            <Navbar.Collapse id="basic-navbar-nav">
                <Nav className="mr-auto">
                <Nav.Link href="/AllSample">Home</Nav.Link>
                <Nav.Link href="/Calendar">Calendar</Nav.Link>
                <NavDropdown title="Sample(Eng)" id="basic-nav-dropdown">
                    <NavDropdown.Item href="/">Add New Lot</NavDropdown.Item>
                    <NavDropdown.Item href="#action/3.2">Another action</NavDropdown.Item>
                    <NavDropdown.Item href="#action/3.3">Something</NavDropdown.Item>
                    <NavDropdown.Divider />
                    <NavDropdown.Item href="#action/3.4">Separated link</NavDropdown.Item>
                </NavDropdown>
                </Nav>
                <Form inline>
                <FormControl type="text" placeholder="Search" className="mr-sm-2" />
                <Button variant="outline-success">Search</Button>
                </Form>
            </Navbar.Collapse>
            </Navbar>
        )
    }
}

export default Header