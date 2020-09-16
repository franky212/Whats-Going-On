import React, {Component} from "react";
import {Nav, NavItem, Navbar,} from "react-bootstrap";
import {LinkContainer} from "react-router-bootstrap";

export default class Header extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <Navbar>
        <Navbar.Header>
          <LinkContainer to="/"><img alt="Logo" className="logo" src={require("../img/whats-going-on-logo.png")} /></LinkContainer>
          <Navbar.Toggle/>
        </Navbar.Header>
        <Navbar.Collapse>
          <Nav className="link-nav" pullRight>
            <LinkContainer to="/">
              <NavItem eventKey={1}>Home</NavItem>
            </LinkContainer>
            <LinkContainer to="/EventList">
              <NavItem eventKey={2}>Event List</NavItem>
            </LinkContainer>
            <LinkContainer to="/SetUp">
              <NavItem eventKey={3}>Set up an event</NavItem>
            </LinkContainer>
            <LinkContainer to="/MapComponent">
              <NavItem eventKey={4}>Event Map</NavItem>
            </LinkContainer>
            <LinkContainer to="/SetUp">
              <NavItem eventKey={5}>Sign Up</NavItem>
            </LinkContainer>
          </Nav>
        </Navbar.Collapse>
      </Navbar>
    )
  }
}
