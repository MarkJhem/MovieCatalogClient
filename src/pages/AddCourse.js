import { Form, Button} from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';
import { useState, useEffect } from 'react';
import Swal from 'sweetalert2';



export default function Course(){

    const [name, setName] = useState("");
	const [description, setDescription] = useState("");
    const [price, setPrice] = useState("");
    const [isActive, setIsActive] = useState(false);

    const navigate = useNavigate();

    console.log(name);
	console.log(description);
    console.log(price);

    function addCourse(e){
        e.preventDefault();

        fetch('http://ec2-3-14-126-118.us-east-2.compute.amazonaws.com/b1/courses', {
			method: 'POST',
			headers: {
				"Content-Type": "application/json",
                Authorization: `Bearer ${localStorage.getItem('token')}`
			},
			body: JSON.stringify({
				name: name,
				description: description,
				price: price,
			})
		})
		.then(res => res.json())
		.then(data => {
			//data is the response of the api/server after it's been process as JS object through our res.json() method.
			console.log(data)
			if(data.message === "Course added successfully"){
				setName('');
				setDescription('');
				setPrice('');
		
				// alert("Course added successfully");
                Swal.fire({
					title: "Course Added",
					icon: "success",
                    
				})
                navigate("/courses");

			} else if(data.message === "Course already exists")  {

				// alert("Course already exists")
                Swal.fire({
					title: "Course already exists",
					icon: "error",
				})

			} else {

                // alert("Something went wrong")
                Swal.fire({
					title: "Unsuccessful Course Creation",
					icon: "error",
				})
            }
		})
	}

	useEffect(() => {
		if(name !== "" && description !== "" && price !== "") {
            setIsActive(true)
        } else {
            setIsActive(false)
        }

	}, [name, description, price])

    return (
        <Form onSubmit={(e) => addCourse(e)}>

            <h1 className='text-center mt-5'>Add Course</h1>
            <Form.Group className="mb-3" controlId="formName">
                <Form.Label>Name:</Form.Label>
                <Form.Control
                    type="text" 
                    placeholder="Enter Name"
                    required
                    value={name}
                    onChange={e => {setName(e.target.value)}}
                />
            </Form.Group>

            <Form.Group className="mb-3" controlId="formName">
                <Form.Label>Description:</Form.Label>
                <Form.Control
                    type="text" 
                    placeholder="Enter Description"
                    required
                    value={description}
                    onChange={e => {setDescription(e.target.value)}}
                />
            </Form.Group>

            <Form.Group className="mb-3" controlId="formName">
                <Form.Label>Price:</Form.Label>
                <Form.Control
                    type="number" 
                    placeholder="0"
                    required
                    value={price}
                    onChange={e => {setPrice(e.target.value)}}
                />
            </Form.Group>
            { isActive ?
            	<Button variant="primary" type="submit" id="submitBtn">Submit</Button>
            	:
            	<Button variant="danger" type="submit" id="submitBtn" disabled>Submit</Button>
        	}
          
        </Form>
    )

}
