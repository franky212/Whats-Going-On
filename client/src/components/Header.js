import React, {Component} from "react";
import {Nav, NavItem, Navbar, FormGroup, FormControl} from "react-bootstrap";
import {LinkContainer} from "react-router-bootstrap";

const styles = {
  searchBar: {
    padding: "25px",
    fontSize: "20px"
  },
  navBar: {
    position: "relative",
    zIndex: 9999,
    margin: 0
  }
}

export default class Header extends Component {
  constructor(props) {
    super(props);
    this.state = {
      search: ""
    }

    this.handleChange = this.handleChange.bind(this);
  }

  handleChange(e) {
    this.setState({[e.target.name]: e.target.value})
  }

  render() {
    return (
      <Navbar style={styles.navBar}>
        <Navbar.Header>
          <LinkContainer to="/Home"><img alt="Logo" className="logo" src={require("../img/whats-going-on-logo.png")} /></LinkContainer>
          <Navbar.Toggle/>
        </Navbar.Header>
        <Navbar.Collapse>
          <Nav className="search-nav">
            <NavItem>
              <Navbar.Form pullLeft>
                <FormGroup>
                  <FormControl
                    value={this.state.search}
                    name="search"
                    style={styles.searchBar}
                    type="text"
                    placeholder="Search"
                    onChange={this.handleChange}/>
                </FormGroup>
              </Navbar.Form>
          </NavItem>
          </Nav>
          <Nav className="link-nav" pullRight>
            <LinkContainer to="/">
              <NavItem eventKey={1}>Home</NavItem>
            </LinkContainer>
            <LinkContainer to="/SetUp">
              <NavItem eventKey={3}>Set up an event</NavItem>
            </LinkContainer>
            <LinkContainer to="/MapComponent">
              <NavItem eventKey={2}>Event Map</NavItem>
            </LinkContainer>
            <LinkContainer to="/SetUp">
              <NavItem eventKey={4}>Sign Up</NavItem>
            </LinkContainer>
          </Nav>
        </Navbar.Collapse>
      </Navbar>
    )
  }
}
