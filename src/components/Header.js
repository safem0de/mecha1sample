import React, { Component } from 'react';
import { Link } from "react-router-dom";
import { connect } from "react-redux";
import { logout ,getUser } from "../actions/userActions";
import {Navbar,Nav,NavDropdown,Form,FormControl,Button} from 'react-bootstrap';
class Header extends Component{

    render(){
        return(
            <Navbar bg="light" expand="sm">
            <Navbar.Brand href="/all">Mecha-Sample</Navbar.Brand>
            <Navbar.Toggle aria-controls="basic-navbar-nav" />
            <Navbar.Collapse id="basic-navbar-nav">
                <Nav className="mr-auto">
                <Nav.Link href="/all">Home</Nav.Link>
                <Nav.Link href="/calendar">Calendar</Nav.Link>
                <NavDropdown title="Sample(Eng)" id="basic-nav-dropdown">
                    <NavDropdown.Item href="/">Add New Lot</NavDropdown.Item>
                    <NavDropdown.Item href="/chart">Summary Chart</NavDropdown.Item>
                    <NavDropdown.Divider />
                    <NavDropdown.Item href="/table">Sample Situation</NavDropdown.Item>
                </NavDropdown>
                </Nav>
                <Form inline>
                <FormControl type="text" placeholder="Search" className="mr-sm-2" />
                <Button variant="outline-success">Search</Button>
                </Form>
                <ul className='nav navbar navbar-right'>
                        {
                            this.props.user === null ?
                            (
                                <li>
                                    <Link to='/login'>Login</Link>
                                </li>
                            ):(
                                <li>
                                    <Link to='/login' onClick={()=> {this.props.logout()}}>Logout</Link>
                                </li>
                            )
                        }
                </ul>
            </Navbar.Collapse>
            </Navbar>
        )
    }
}
function mapStateToProps(state,ownProps){
    return{
        user:state.user
    };
}

export default connect(mapStateToProps,{getUser,logout})(Header);