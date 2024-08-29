import { useContext, useEffect, useState } from "react"
import { Row, Col, Table, Badge, Button, Modal } from "react-bootstrap"
import Swal from "sweetalert2"

import UserContext from '../UserContext';
import AddComment from '../components/AddComment'
import AddMovie from "../components/AddMovie"
import UpdateMovie from "../components/UpdateMovie"
import DeleteMovie from "../components/DeleteMovie"
import GetComment from "../components/GetComment"
import { useNavigate } from "react-router-dom";

export default function Movie() {

    const { user } = useContext(UserContext);
    const navigate = useNavigate();
    

    const [movies, setMovies] = useState([])

    const [addMovieModal, setAddMovieModal] = useState(false);

    const closeAddMovieModal = () => setAddMovieModal(false);
    const showAddMovieModal = () => setAddMovieModal(true);


   

   

    // ADD MOVIE
    const addMovie = (title, director, description, genre, year) => {

        fetch('https://movieapi-amerna.onrender.com/movies/addMovie', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                Authorization: `Bearer ${localStorage.getItem('token')}`
            },
            body: JSON.stringify({
                title: title,
                director: director,
                description: description,
                genre: genre,
                year: year
            })
        })
        .then(res => res.json())
        .then(data => {
            if (typeof data.message !== "string") {
                Swal.fire({
                    title: "Added Movie Successfully",
                    icon: "success"
                });
                closeAddMovieModal();
            } else {
                Swal.fire({
                    title: "Failed to Add Workout",
                    icon: "error"
                });
            }
        })
    }

    // ADD COMMENT
    // const addComment = (comment, id, closeUpdate) => {

    //     fetch(`https://movieapi-amerna.onrender.com/movies/addComment/${id}`, {
    //         method: 'POST',
    //         headers: {
    //             'Content-Type': 'application/json',
    //             Authorization: `Bearer ${localStorage.getItem('token')}`
    //         },
    //         body: JSON.stringify({
    //             comment: comment
    //         })
    //     })
    //     .then(res => res.json())
    //     .then(data => {
    //         if (data.message === "Comment added successfully") {
    //             Swal.fire({
    //                 title: "Added Comment Successfully",
    //                 icon: "success"
    //             });
    //             closeUpdate();
    //         } else {
    //             Swal.fire({
    //                 title: "Failed to Add Comment",
    //                 icon: "error"
    //             });
    //         }
    //     })
    // }

    const addComment = async (comment, id, closeUpdate) => {
        try {
            const response = await fetch(`https://movieapi-amerna.onrender.com/movies/addComment/${id}`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    Authorization: `Bearer ${localStorage.getItem('token')}`
                },
                body: JSON.stringify({
                    comment: comment
                })
            });
    
            const data = await response.json();
    
            if (data.message === "Comment added successfully") {
                Swal.fire({
                    title: "Added Comment Successfully",
                    icon: "success"
                });
                closeUpdate();
            } else {
                Swal.fire({
                    title: "Failed to Add Comment",
                    icon: "error"
                });
            }
        } catch (error) {
            Swal.fire({
                title: "Error",
                text: "Something went wrong while adding the comment.",
                icon: "error"
            });
        }
    };




    // UPDATE
    const updateMovie = (title, director, description, genre, year, id, closeUpdate) => {

        fetch(`https://movieapi-amerna.onrender.com/movies/updateMovie/${id}`, {
            method: 'PATCH',
            headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${localStorage.getItem('token')}`
            },
            body: JSON.stringify({
                title: title,
                director: director,
                description: description,
                genre: genre,
                year: year
            })
        })
            .then(res => res.json())
            .then(data => {
                if (data.message === "Movie updated successfully") {
                    Swal.fire({
                        title: "Movie Updated Successfully",
                        icon: "success"
                    });
                    closeUpdate();
                } else {
                    Swal.fire({
                        title: "Failed to Update Movie",
                        icon: "error"
                    });
                }
            })
    }




    // DELETE

   const deleteMovie = (e, id) => {
    e.preventDefault();

    Swal.fire({
        title: 'Are you sure?',
        text: "You won't be able to revert this!",
        icon: 'warning',
        showCancelButton: true,
        confirmButtonText: 'Yes, delete it!',
        cancelButtonText: 'No, cancel!',
        reverseButtons: true
    }).then((result) => {
        if (result.isConfirmed) {
            fetch(`https://movieapi-amerna.onrender.com/movies/deleteMovie/${id}`, {
                method: 'DELETE',
                headers: {
                    'Content-Type': 'application/json',
                    Authorization: `Bearer ${localStorage.getItem('token')}`
                }
            })
            .then(res => res.json())
            .then(data => {
                if (data.message === 'Movie deleted successfully') {
                    Swal.fire({
                        title: "Deleted!",
                        text: "Your movie has been deleted.",
                        icon: "success"
                    });
                } else {
                    Swal.fire({
                        title: "Error",
                        text: "Cannot Delete.",
                        icon: "error"
                    });
                }
            })
            
        } else if (result.dismiss === Swal.DismissReason.cancel) {
            Swal.fire({
                title: 'Cancelled',
                text: 'Your Movie is safe :)',
                icon: 'info'
            });
        }
    });
}

    // Completed

    const getComment = (e, id) => {
        e.preventDefault();

        Swal.fire({
            title: 'Are you sure you completed the workout?',
            text: "You won't be able to revert this!",
            icon: 'warning',
            showCancelButton: true,
            confirmButtonText: "Yes, I've completed my workout!",
            cancelButtonText: 'No, cancel!',
            reverseButtons: true
        }).then((result) => {
            if (result.isConfirmed) {
                fetch(`https://app-building-api.onrender.com/workouts/completeWorkoutStatus/${id}`, {
                    method: 'PATCH',
                    headers: {
                        'Content-Type': 'application/json',
                        Authorization: `Bearer ${localStorage.getItem('token')}`
                    }
                })
                    .then(res => res.json())
                    .then(data => {

                        if (data.message === "Workout status updated successfully") {
                            Swal.fire({
                                title: "Congratulations!",
                                text: "Your workout has been completed.",
                                icon: "success"
                            });
                            fetchMovie();
                        } else {
                            Swal.fire({
                                title: "Error",
                                text: "Something went wrong.",
                                icon: "error"
                            });
                        }

                    })
                    .catch(error => {
                        Swal.fire({
                            title: "Error",
                            text: error.message,
                            icon: "error"
                        });
                    });
            } else if (result.dismiss === Swal.DismissReason.cancel) {
                Swal.fire({
                    title: 'Cancelled',
                    text: 'Please complete your workout :)',
                    icon: 'info'
                });
            }
        });

    }




    const fetchMovie = () => {

        fetch(`https://movieapi-amerna.onrender.com/movies/getMovies`, {
            headers: {
                Authorization: `Bearer ${localStorage.getItem('token')}`
            }
        })
            .then(res => res.json())
            .then(data => {
                // console.log("fetchWorkout", data);
                if (typeof data.message !== "string") {


                    // MAP
                    const moviesArr = data.movies.map(movie => {
                        return (
                            <tr key={movie._id}>

                               

                                <td>{movie.title}</td>
                                <td>{movie.director}</td>
                                <td>{movie.description}</td>
                                <td>{movie.genre}</td>
                                <td>{movie.year}</td>

                               
                                <td>
                                    {<UpdateMovie
                                    movieTitle={movie.title}
                                    movieDirector={movie.director} 
                                    movieDescription={movie.description} 
                                    movieYear={movie.year} 
                                    movieGenre={movie.genre} 
                                    movie={movie._id} onUpdate={updateMovie} />}

                                    {<AddComment
                                    movieComment={movie.comment}
                                    movie={movie._id} onUpdate={addComment} />}

                                    {<GetComment status={movie.status} movie={movie._id} onDone={getComment} />}


                                    {<DeleteMovie movie={movie._id} onDelete={deleteMovie} />}

                                </td>

                            </tr>
                        )
                    })



                    setMovies(moviesArr);

                } else {
                    setMovies([]);
                }

            });

    }

    useEffect(() => {

        if (!user.id) {
            navigate('/login');
        }
    

        fetchMovie(); //
        // console.log("setWorkoutsArr:", workouts);

    }, [addMovie, user.id, navigate])


    return (
        <>
            <Row>
                <Col className="p-4 text-center">
                    <h1>Your Workout Plans</h1>
                    <p></p>
                </Col>
            </Row>
            <Row>
                <Button variant="danger" onClick={showAddMovieModal}>
                    ADD MOVIE
                </Button>

                <AddMovie show={addMovieModal} handleClose={closeAddMovieModal} onAdd={addMovie} />
            </Row>

            <Row>



                <Table striped bordered hover responsive>
                    
                    <thead>
                        <tr className="text-center">
                            <th>Title</th>
                            <th>Director</th>
                            <th>Description</th>
                            <th>Genre</th>
                            <th>Year</th>
                            <th colSpan={2}>Actions</th>
                        </tr>
                        
                        
                    </thead>

                    <tbody>
                        {movies}
                    </tbody>
                </Table>
            </Row>




        </>
    )
}