import { useState } from 'react';
import { Button, Modal, Form } from 'react-bootstrap';
import Swal from 'sweetalert2';

export default function EditCourse({course, fetchData}) {

	// States for the edit form
	const [ name, setName ] = useState("");
	const [ description, setDescription ] = useState("");
	const [ price, setPrice ] = useState(0)
	// State for opening/closing the modal
	const [ showEdit, setShowEdit ] = useState(false);


	// function for opening the modal
	const openEdit = (courseId) => {
		fetch(`${process.env.REACT_APP_API_URL}/courses/specific/${courseId}`)
		.then(res => res.json())
		.then(data => {
			console.log(data);
			setName(data.name);
			setDescription(data.description);
			setPrice(data.price);
		})
		// open the modal
		setShowEdit(true)
	}

	// function for closing the modal
	const closeEdit = () => {
		setShowEdit(false);
		setName("");
		setDescription("");
		setPrice(0);
	}


	// function to update the course
	const editCourse = (e, courseId) => {
		e.preventDefault()
		fetch(`${process.env.REACT_APP_API_URL}/courses/${courseId}`, {
			method: 'PATCH',
			headers: {
				"Content-Type": "application/json",
				Authorization: `Bearer ${localStorage.getItem('token')}`
			},
			body: JSON.stringify({
				name: name,
				description: description,
				price: price
			})
		})
		.then(res => res.json())
		.then(data => {
			console.log(data)

			if(data.message === "Course updated successfully"){
				Swal.fire({
					title: "Success!",
					icon: "success",
					text: "Course successfully updated"
				})
				closeEdit();
                fetchData()
			} else {
				Swal.fire({
					title: "Error!",
					icon: "error",
					text: "Please try again"
				})
				closeEdit();
                fetchData()
			}
		})
	}


	return(
		<>
			<Button variant="primary" size="sm" onClick={() => openEdit(course)}>Edit</Button>

			{/*EDIT MODAL*/}
			<Modal show={showEdit} onHide={closeEdit}>
			    <Form onSubmit={e => editCourse(e, course)}>
			        <Modal.Header closeButton>
			            <Modal.Title>Edit Course</Modal.Title>
			        </Modal.Header>
			        <Modal.Body>    
			            <Form.Group controlId="courseName">
			                <Form.Label>Name</Form.Label>
			                <Form.Control 
			                	type="text"
			                	required
			                	value={name}
			                	onChange={e => setName(e.target.value)}
			                	/>
			            </Form.Group>
			            <Form.Group controlId="courseDescription">
			                <Form.Label>Description</Form.Label>
			                <Form.Control 
			                	type="text" 
			                	required
			                	value={description}
			                	onChange={e => setDescription(e.target.value)}
			                	/>
			            </Form.Group>
			            <Form.Group controlId="coursePrice">
			                <Form.Label>Price</Form.Label>
			                <Form.Control 
			                type="number" 
			                required
			                value={price}
			                onChange={e => setPrice(e.target.value)}
			                />
			            </Form.Group>
			        </Modal.Body>
			        <Modal.Footer>
			            <Button variant="secondary" onClick={closeEdit}>Close</Button>
			            <Button variant="success" type="submit">Submit</Button>
			        </Modal.Footer>
			    </Form>
			</Modal>
		</>
	)
}