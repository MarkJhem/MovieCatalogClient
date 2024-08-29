
import { Row, Col } from "react-bootstrap";

import MovieCard from "./MovieCard";


export default function UserViewMovies({movies}) {

    return (

        <>
            <Row>
                <Col className="mt-5 p-4 text-center mx-auto">
                    <h1>Movie List</h1>
                </Col>
            </Row>
            <Row>
                {
                    movies.movies && movies.movies.length > 0 ? (
                        movies.movies.map(movie => (
                            <Col md={3} key={movie._id}>
                                <MovieCard movie={movie}  />
                            </Col>
                        ))
                    ) : (
                        <Col className="text-center">
                            <p>No movies available.</p>
                        </Col>
                    )
                }
            </Row>
        </>

    )
}