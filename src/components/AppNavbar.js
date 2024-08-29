import { useState, useContext } from 'react';
import { Container, Navbar, Nav } from "react-bootstrap";
import { Link, NavLink } from 'react-router-dom';

import UserContext from '../UserContext';

export default function AppNavbar() {

    const { user } = useContext(UserContext);

    return(
        <Navbar bg="danger" expand="lg">
            <Container>
                <Navbar.Brand as={Link} to="/" className='text-white'><strong>Movie Catalog</strong></Navbar.Brand>
                <Navbar.Toggle aria-controls="basic-navbar-nav" />
                <Navbar.Collapse id="basic-navbar-nav">
                    <Nav className="ms-auto">
                        <Nav.Link as={NavLink} to="/" exact="true" className='text-white'>Home</Nav.Link>
                        {
                            user.id
                            ?
                            <>
                                <Nav.Link as={Link} to="/movies" className='text-white'>Movies</Nav.Link>
                                <Nav.Link as={Link} to="/logout" className='text-white'>Logout</Nav.Link>
                            </>
                            :
                            <>
                                <Nav.Link as={Link} to="/login" className='text-white'>Login</Nav.Link>
                                <Nav.Link as={Link} to="/register" className='text-white'>Register</Nav.Link>
                            </>

                        }
                    </Nav>
                </Navbar.Collapse>
            </Container>
        </Navbar>
        )
}
