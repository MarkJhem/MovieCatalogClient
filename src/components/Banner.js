import { Link } from "react-router-dom"
import { Row, Col } from "react-bootstrap";
import Image from 'react-bootstrap/Image';
import UserContext from '../UserContext';
import { useContext } from 'react';


import cinema_img from '../assets/cinema-img.jpg'


export default function Banner() {

    const { user } = useContext(UserContext);

    return (
    <>

        <Row className="py-5">
            <Col className="p-4 text-center">
            <h1 className="display-5 fw-bold text-body-emphasis lh-1 mb-3">Welcome to <span className="text-danger"><strong>Movie Catalog</strong></span></h1>
            <p className="lead">Movie Catalog is your go-to place for browsing and discovering movies. Easily find and explore films by genre, year, or popularity. Whether you're searching for something new or revisiting old favorites, Movie Catalog makes it easy to find the perfect movie.</p>
            <Link className="btn btn-danger btn-lg px-4 me-md-2" to={ user.id ? '/movies' : 'login' }>Check Movie List</Link>
             
            </Col>
        </Row>

    <div>
    <Image src={cinema_img} fluid />;
    </div>


    
    
    </>

        
    )
}