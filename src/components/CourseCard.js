import { useState } from 'react';
import { Card, Button } from 'react-bootstrap';
import { Link } from 'react-router-dom';

export default function CourseCard({courseProp}) {

    // console.log(courseProp)
    const { _id, name, description, price } = courseProp;

    return (
        <Card id="courseComponent1" className='m-2'>
            <Card.Body>
                <Card.Title>{name}</Card.Title>
                <Card.Subtitle>Description:</Card.Subtitle>
                <Card.Text>{description}</Card.Text>
                <Card.Subtitle>Price:</Card.Subtitle>
                <Card.Text>Php {price}</Card.Text>               
                <Button variant="primary" as={Link} to={`/courses/${_id}`}>Details</Button>
            </Card.Body>
        </Card>
    )
}