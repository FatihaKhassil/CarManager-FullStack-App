import React from 'react';
import { Navbar, Nav, Container } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import logo from '../images/logo.png';

class NavigationBar extends React.Component {
  render() {
    return (
      <Navbar className="app-navbar" expand="lg">
        <Container fluid style={{ maxWidth: '1280px' }}>
          <Link to="/" className="navbar-brand">
            <img src={logo} width="24" height="24" alt="logo" />{' '}
            MIOLA Shop
          </Link>

          <Navbar.Toggle aria-controls="main-nav" style={{ borderColor: '#30363d' }} />

          <Navbar.Collapse id="main-nav">
            <Nav className="ms-auto">
              <Link to="/add" className="nav-link">Ajouter</Link>
              <Link to="/list" className="nav-link">Liste des voitures</Link>
              <Link to="/analyse" className="nav-link">Analyse prix</Link>
              <Link to="/register" className="nav-link">Inscription</Link>
              <Link to="/login" className="nav-link">Connexion</Link>
            </Nav>
          </Navbar.Collapse>
        </Container>
      </Navbar>
    );
  }
}

export default NavigationBar;
