import { useContext } from 'react';
import { Row, Col} from 'react-bootstrap';
import { Navigate } from 'react-router-dom';
import UserContext from '../UserContext';
import ResetPassword from '../components/ResetPassword';
import UpdateProfile from '../components/UpdateProfile';



export default function Profile(){

    const {user} = useContext(UserContext);

    const userDetail = {
        firstName: "John",
        lastName: "Doe",
        email: "JohnDoe@gmail.com",
        mobileNumber: "09123456789"
    }

    return (
        (user.access === null) 
        ?
        <Navigate to="/courses" />
        :
        <>

        <Row>
            <Col className="p-5 ">
                <h1 className="my-1 ">Profile</h1>
                <h3 className="mt-3">Contact</h3>
                <hr />
                <ul>
                    <li><strong>First Name: </strong> {userDetail.firstName}</li>
                    <li><strong>Last Name: </strong>{userDetail.lastName}</li>
                    <li><strong>Email: </strong>{userDetail.email}</li>
                    <li><strong>Mobile Number: </strong>{userDetail.mobileNumber}</li>
                </ul>
            </Col>
        </Row>

        <hr />

        <Row>
            <Col className='pt-4 mt-4'>
                <ResetPassword/>
            </Col>
        </Row>

        <hr />

        <Row>
            <Col className='pt-4 mt-4'>
                <UpdateProfile />
            </Col>
        </Row>

        <hr />

        </>

    )

}