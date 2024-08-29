import { Button, Row, Col } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import { useContext } from 'react';
import UserContext from '../UserContext';
import Banner from '../components/Banner';


export default function Home() {

    const { user } = useContext(UserContext);

    return (
        <>
        <Banner />
       
        </>
    )
}