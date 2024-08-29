import { Col, Card, } from 'react-bootstrap'
import { Link } from 'react-router-dom'

export default function PreviewCourses(props) {
    console.log(props)
    const { data } = props;

    // Deconstrucyt
    const { _id, name, description, price, isActive } = data;

    return (
        <Col xs={12} md={2}>
            <Card className='cardHighlight mx-2'>
                <Card.Body >
                    <Card.Title className='text-center'>{name}</Card.Title>
                    <Card.Text>{description}</Card.Text>
                    <Card.Text>{isActive}</Card.Text>
                </Card.Body>
                <Card.Footer>
                    <h5 className='text-center'>P{price}</h5>
                    <Link className="btn btn-primary d-block" to={`/courses/${_id}`}>Details
                    </Link>
                </Card.Footer>
            </Card>
        </Col>
    )
}