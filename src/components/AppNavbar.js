import { useState, useContext } from 'react';
import { Container, Navbar, Nav } from 'react-bootstrap';
import { Link, NavLink } from 'react-router-dom';
import UserContext from '../UserContext';

export default function AppNavbar() {

	const { user } = useContext(UserContext);
	console.log(user)
	
	return (
		<Navbar expand="lg" className="bg-body-tertiary">
		    <Container>
		        <Navbar.Brand as={Link} to="/">Zuitt Booking</Navbar.Brand>
		        <Navbar.Toggle aria-controls="basic-navbar-nav" />
		        <Navbar.Collapse id="basic-navbar-nav">
					<Nav className="ms-auto">
						<Nav.Link as={NavLink} to="/">Home</Nav.Link>
						<Nav.Link as={NavLink} to="/courses">Courses</Nav.Link>

						{
							(user.id !== null) ? 

							            user.isAdmin 
							            ?
							            <>
							                <Nav.Link as={Link} to="/addCourse">Add Course</Nav.Link>
							                <Nav.Link as={Link} to="/logout">Logout</Nav.Link>
							            </>
							            :
							            <>
							                <Nav.Link as={Link} to="/profile">Profile</Nav.Link>
							                <Nav.Link as={Link} to="/logout">Logout</Nav.Link>
							            </>
							        : 
							            <>
							                <Nav.Link as={Link} to="/login">Login</Nav.Link>
							                <Nav.Link as={Link} to="/register">Register</Nav.Link>
							            </>
						}
					</Nav>
		        </Navbar.Collapse>
		    </Container>
		</Navbar>
	)
}