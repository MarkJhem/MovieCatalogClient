// import { Row, Col, Button } from 'react-bootstrap';
// import { Link } from 'react-router-dom';


// export default function Banner({data}) {

// 	const {title, content, destination, label} = data;

// 	return (
// 		<Row>
// 			<Col className="p-5 text-center">
// 				<h1>{title}</h1>
//                 <p>{content}</p>
//                 <Link className="btn btn-primary" to={destination}>{label}</Link>
// 			</Col>
// 		</Row>
// 	)
// }

import { Link } from "react-router-dom"
import Image from 'react-bootstrap/Image';

import cinema_img from '../assets/cinema-img.jpg'


export default function Banner() {

    return (
    <>
    <div className="container-fluid" id="banner">
        <div className="row flex-lg-row-reverse align-items-center g-5 py-5">

            <div className="col-lg-6">
                <h1 className="display-5 fw-bold text-body-emphasis lh-1 mb-3">Welcome to <span className="text-danger"><strong>Fitness Club</strong></span></h1>
                <p className="lead">Achieve your health goals with our top-notch facilities, expert trainers, and diverse classes. Join us today for a healthier, happier you!</p>
                <div className="d-grid gap-2 d-md-flex justify-content-md-start">
                    <Link className="btn btn-danger btn-lg px-4 me-md-2" to={"/login"}>Check you workout</Link>
          
                </div>
                
            </div>

             <div className="col-12 col-sm-8 col-lg-6">
                <img className="d-block mx-lg-auto img-fluid" alt="Bootstrap Themes" width="700" height="500" loading="lazy"></img>
            </div>

            
        </div>

    </div>


    <div>
    <Image src={cinema_img} fluid />;
    </div>


    
    
    </>

        
    )
}