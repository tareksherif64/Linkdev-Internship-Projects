import React, { useContext } from 'react';
import { Link } from 'react-router-dom';
import { Navbar, Nav } from 'react-bootstrap';
import styles from './Navbar.module.css';
import { ThemeContext } from '../../ThemeContext'; // Import the ThemeContext

function NavigationBar() {
  const { toggleTheme } = useContext(ThemeContext); // Use the ThemeContext to get the toggleTheme function

  return (
    <Navbar bg="dark" variant="dark" expand="lg" className={styles.navbar}>
      <Navbar.Brand as={Link} to="/">Tarek's Website</Navbar.Brand>
      <Navbar.Toggle aria-controls="basic-navbar-nav" />
      <Navbar.Collapse id="basic-navbar-nav">
        <Nav className="ml-auto">
          <Nav.Link as={Link} to="/">Home</Nav.Link>
          <Nav.Link as={Link} to="/movies">Movies</Nav.Link>
          <Nav.Link as={Link} to="/weather">Weather</Nav.Link>
          <Nav.Link as={Link} to="/bookmark">Bookmark Manager</Nav.Link>
        </Nav>
      </Navbar.Collapse>
    </Navbar>
  );
}

export default NavigationBar;
