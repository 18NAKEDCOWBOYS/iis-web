import React from 'react';
import Navbar from 'react-bootstrap/Navbar'
import Nav from 'react-bootstrap/Nav'
import Container from 'react-bootstrap/Container'
import NavDropdown from 'react-bootstrap/NavDropdown'
import { Link } from 'react-router-dom';
import { useState } from 'react';
const userLoggedIn = true
const userName = "Bohuš"
export default function NavigationBar(props) {

  console.log(userLoggedIn)
  return (<Navbar collapseOnSelect fixed="top" expand="lg" bg="dark" variant="dark">
    <Container>
      <Navbar.Brand as={Link} to="/">
        Aukce
      </Navbar.Brand>

      <Navbar.Toggle aria-controls="responsive-navbar-nav" />
      <Navbar.Collapse id="responsive-navbar-nav">
        <Nav className="ms-auto">
          <Nav.Item>
            <Nav.Link as={Link} to="/" style={(props.page === "auctions") ? { color: 'white' } : {}}> Seznam aukcí</Nav.Link>
          </Nav.Item>
          <Nav.Item>
            <Nav.Link as={Link} to="/usr-man" style={(props.page === "usr-man") ? { color: 'white' } : {}}> Správa uživatelů</Nav.Link>
          </Nav.Item>

          {userLoggedIn ?

            <>
              <Nav.Item>
                <NavDropdown align="end" menuVariant="dark" title={userName} id="collasible-nav-dropdown">
                  <NavDropdown.Item as={Link} to="/user-profile" style={(props.page === "user-profile") ? { color: 'white' } : {}}> Můj profil </NavDropdown.Item>
                  <NavDropdown.Item as={Link} to="#"> Odhlásit se</NavDropdown.Item>
                </NavDropdown>
              </Nav.Item>

            </>
            :
            <>
              <Nav.Item style={{ borderRadius: 5, backgroundColor: '#0d6efd' }}>
                <Nav.Link as={Link} to="/Login" style={(props.page === "Login") ? { color: 'white' } : { color: '#cfcfcf' }}> Přihlásit se</Nav.Link>
              </Nav.Item>
            </>
          }

        </Nav>
      </Navbar.Collapse>
    </Container>
  </Navbar >)
}