import { useState, useEffect, useContext } from 'react';
import { Container, Row, Col, Card, Button } from 'react-bootstrap';
import { useParams, useNavigate, Link } from 'react-router-dom';
import Swal from 'sweetalert2';
import UserContext from '../UserContext';


export default function CourseView() {

	// Allows us to retrieve the courseId passed via the URL
	const { courseId } = useParams()

	const { user } = useContext(UserContext);

	const navigate = useNavigate();

	// States
	const [ name, setName ] = useState("");
	const [ description, setDescription ] = useState("");
	const [ price, setPrice ] = useState(0);


	useEffect(() => {
		fetch(`${process.env.REACT_APP_API_URL}/courses/specific/${courseId}`)
		.then(res => res.json())
		.then(data => {
			console.log(data)

			setName(data.name);
			setDescription(data.description);
			setPrice(data.price);
		})
	}, [courseId])


	const enroll = (courseId) => {

		fetch(`${process.env.REACT_APP_API_URL}/users/enroll`, {
			method: "POST",
			headers: {
				"Content-Type": "application/json",
				Authorization: `Bearer ${localStorage.getItem('token')}`
			},
			body: JSON.stringify({
				enrolledCourses: [{courseId}],
				totalPrice: price
			})
		})
		.then(res => res.json())
		.then(data => {
			console.log(data);

			if(data.message === "Admin is forbidden") {
				Swal.fire({
					title: "Admin enrollment error",
					icon: "error",
					text: "You are an administrator. You cannot enroll to a course"
				})
			} else if (data.message === "Enrolled successfully"){
				Swal.fire({
					title: "Successfully enrolled",
					icon: "success",
					text: "You have successfully enrolled to this course."
				})
				navigate("/courses");
			} else {
				Swal.fire({
					title: "Something went wrong",
					icon: "error",
					text: "Please try again."
				})
			}
		})
	}

	return (
		<Container className="mt-5">
		    <Row>
		        <Col lg={{ span: 6, offset: 3 }}>
		            <Card>
		                <Card.Body className="text-center">
		                    <Card.Title>{name}</Card.Title>
		                    <Card.Subtitle>Description:</Card.Subtitle>
		                    <Card.Text>{description}</Card.Text>
		                    <Card.Subtitle>Price:</Card.Subtitle>
		                    <Card.Text>PhP {price}</Card.Text>
		                    <Card.Subtitle>Class Schedule</Card.Subtitle>
		                    <Card.Text>8 am - 5 pm</Card.Text>

		                    {user.id !== null
			                    ?
			                    	<Button variant="primary" onClick={() => enroll(courseId)}>Enroll</Button>
			                    :
			                    	<Link className="btn btn-danger" to="/login">Log in to Enroll</Link>
		                    }

		                </Card.Body>        
		            </Card>
		        </Col>
		    </Row>
		</Container>
	)
}