import { useEffect, useState } from 'react';
import { Modal, Button, Form } from 'react-bootstrap';


export default function ViewMovieModal({ show, handleClose, movie }) {
    const [comments, setComments] = useState([]);
    const [newComment, setNewComment] = useState('');
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        if (show && movie._id) {
            fetch(`https://movieapi-amerna.onrender.com/movies/getComments/${movie._id}`, {
                headers: {
                    "Content-Type": "application/json",
                    Authorization: `Bearer ${localStorage.getItem('token')}`
                },
            })
                .then(response => response.json())
                .then(data => setComments(data))
                .catch(error => console.error('Error fetching comments:', error));
                console.log('comments',comments)
        }

    }, [show, movie._id, loading]);

    const handleAddComment = (e) => {
        e.preventDefault();
        if (newComment.trim() === '') {
            alert('Please enter a comment');
            return;
        }

        setLoading(true);

        fetch(`https://movieapi-amerna.onrender.com/movies/addComment/${movie._id}`, {
            method: 'PATCH',
            headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${localStorage.getItem('token')}`
            },
            body: JSON.stringify({ comment: newComment })
        })
            .then(response => response.json())
            .then(data => {
                if (data.updatedMovie) {
                    setComments(data.updatedMovie.comments);
                    setNewComment(''); // Clear the input after submission
                } else {
                    alert(data.message);
                }
            })
            .catch(error => console.error('Error adding comment:', error))
            .finally(() => setLoading(false));
    };

    return (
        <Modal show={show} onHide={handleClose}>
            <Modal.Header closeButton>
                <Modal.Title>{movie.title}</Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <p><strong>Year:</strong> {movie.year}</p>
                <p><strong>Genre:</strong> {movie.genre}</p>
                <p><strong>Director:</strong> {movie.director}</p>
                <p>{movie.description}</p>
                <hr />
                <h5>Comments</h5>
                {comments.comments && comments.comments.length > 0 ? (
                    <ul>
                        {comments.comments.map(comment => (
                            <li key={comment._id}>
                                <strong>User {comment.userId}:<br /></strong> <span className='ps-3'>{comment.comment}</span>
                            </li>
                        ))}
                    </ul>
                ) : (
                    <p>No comments yet.</p>
                )}

                {/* Add Comment Form */}
                <Form onSubmit={handleAddComment}>
                    <Form.Group controlId="comment">
                        <Form.Label>Add a Comment</Form.Label>
                        <Form.Control
                            type="text"
                            placeholder="Enter your comment"
                            value={newComment}
                            onChange={(e) => setNewComment(e.target.value)}
                            disabled={loading}
                        />
                    </Form.Group>
                    <Button
                        variant="primary"
                        type="submit"
                        disabled={loading}
                        className="mt-3"
                    >
                        {loading ? 'Adding...' : 'Add Comment'}
                    </Button>
                </Form>
            </Modal.Body>
            <Modal.Footer>
                {/* <Button variant="secondary" onClick={handleClose} disabled={loading}>
                    Close
                </Button> */}
            </Modal.Footer>
        </Modal>
    );
}

