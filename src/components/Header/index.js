import React from "react";
import { Navbar, Nav, Container } from "react-bootstrap";
import "bootstrap/dist/css/bootstrap.min.css";
import "./index.css"

const Header = () => {
  return (
    <Navbar bg="dark" variant="dark" expand="lg" sticky="top">
      <Container>
        <Navbar.Brand href="/">
          <img
            src="https://th.bing.com/th/id/OIP.pDfg1xsD6JMmkW3Uguvb5gHaHa?w=193&h=192&c=7&r=0&o=5&dpr=1.3&pid=1.7" alt="Logo"
            width="40"
            height="40"
            className="d-inline-block align-top logoImage"
          />{" "}
          Doctor's Appointment
        </Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="ms-auto">
          <Nav.Link  href="/">Home</Nav.Link>
          <Nav.Link href="/doctors">Doctors</Nav.Link>
          <Nav.Link href="/appointments">Appointments</Nav.Link>
          <Nav.Link href="/contact"> Contact</Nav.Link>
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
};

export default Header;
