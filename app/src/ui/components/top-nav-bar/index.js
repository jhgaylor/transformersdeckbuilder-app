import React, { Component } from 'react';
import {
  Collapse,
  Navbar,
  NavbarToggler,
  NavbarBrand,
  Nav,
  NavItem } from 'reactstrap';
import { Link } from "react-router-dom";

export default class TopNavBar extends Component {
  constructor(props) {
    super(props);

    this.toggle = this.toggle.bind(this);
    this.state = {
      isOpen: false
    };
  }

  toggle() {
    this.setState({
      isOpen: !this.state.isOpen
    });
  }

  render() {
  	let {user} = this.props
    return (
      <Navbar color="light" light sticky="top" expand="md">
        <div className="container">
          <NavbarBrand href="/">Deck Builder Home</NavbarBrand>
          <NavbarToggler onClick={this.toggle} />
          <Collapse isOpen={this.state.isOpen} navbar>
            <Nav className="mr-auto" navbar>
              <NavItem>
                <Link to="/decks/" className="nav-link">View All Decks</Link>
              </NavItem>
              {
                user ? 
                <NavItem>
                  <Link to="/decks/mine" className="nav-link">View My Decks</Link>
                </NavItem>
                : null
              }
              {
                user ? 
                <NavItem>
                  <Link to="/logout" className="nav-link">Logout {user.email}</Link>
                </NavItem>
                : null
              }
              {
                ! user ? 
                <NavItem>
                  <Link to="/login" className="nav-link">Login</Link>
                </NavItem>
                : null
              }
              {
                ! user ? 
                <NavItem>
                  <Link to="/signup" className="nav-link">Sign up</Link>
                </NavItem>
                : null
              }    
            </Nav>
          </Collapse>
        </div>
      </Navbar>
    );
  }
}
