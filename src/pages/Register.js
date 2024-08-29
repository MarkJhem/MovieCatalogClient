import { useState, useEffect, useContext } from 'react';
import { Form, Button, FloatingLabel } from 'react-bootstrap';
import { Navigate, useNavigate } from 'react-router-dom';
import Swal from 'sweetalert2';
import UserContext from '../UserContext';

export default function Register() {

    // First Name
    // Email
    // password

    const { user } = useContext(UserContext);
    const navigate = useNavigate();

    const [mobileNo, setMobileNo] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");

    const [isActive, setIsActive] = useState(false);

    useEffect(() => {

        if ((mobileNo !== "" && email !== "" && password !== '' && confirmPassword !== "") && (password === confirmPassword)) {
            setIsActive(true)
        } else {
            setIsActive(false)
        }

        if(user.id){
            navigate('/movies')
        }

    }, [email, password, confirmPassword, navigate, user.id])

    function registerUser(e) {

        e.preventDefault();

        fetch('https://movieapi-amerna.onrender.com/users/register', {

            method: 'POST',
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
                mobileNo:  mobileNo,
                email: email,
                password: password

            })
        })
            .then(res => res.json())
            .then(data => {

                //determine the returned data. Especially useful when the given API is online.
                console.log(data);

                //data will only contain an email property if we can properly save our user.
                if (data.message === "Registered Successfully") {

                    setMobileNo('');
                    setEmail('');
                    setPassword('');
                    setConfirmPassword('');

                    Swal.fire({
                        title: "Registration Successful",
                        icon: "success",
                        text: "Thank you for registering!"
                    });

                }

            })
    }


    return (

        <>

        <div className='d-flex justify-content-center gap-4'>
        <Form onSubmit={(e) => registerUser(e)} className='col-lg-5 col-10'>
        <h1 className="my-5 text-center">Register</h1>

			
            <Form.Group className='pb-2'>
                <FloatingLabel controlId="floatingInput" label="Email address">
                    <Form.Control 
                    type="email"
                    placeholder="Enter address"
                    value={email}
                    onChange={e => {setEmail(e.target.value)}}
                    required
                    />
                </FloatingLabel>
            </Form.Group>
            
            <Form.Group className='pb-2'>
                <FloatingLabel controlId="floatingInput" label="Mobile No.">
                    <Form.Control 
                    type="number"
                    placeholder="Mobile No."
                    value={mobileNo}
                    onChange={e => {setMobileNo(e.target.value)}}
                    required
                    />
                </FloatingLabel>           
            </Form.Group>

            <Form.Group className='pb-2'>
                <FloatingLabel controlId="floatingInput" label="Password">
                    <Form.Control 
                    type="password"
                    placeholder="Password"
                    value={password}
                    onChange={e => {setPassword(e.target.value)}}
                    required
                    />
                </FloatingLabel> 
            </Form.Group>

            <Form.Group className='pb-2'>
                <FloatingLabel controlId="floatingInput" label="Confrim Password">
                    <Form.Control 
                    type="password"
                    placeholder="Confrim Password"
                    value={confirmPassword}
                    onChange={e => {setConfirmPassword(e.target.value)}}
                    required
                    />
                </FloatingLabel> 
            </Form.Group>
           
			
            {
                isActive

                ? <Button variant="primary" type="submit" className=' col-12 p-2'>Register</Button>
                : <Button variant="danger" className=' col-12 p-2' disabled>Register</Button>
            }
        </Form>
        </div>
        </>

    )
}