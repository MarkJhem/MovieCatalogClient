import { useState } from 'react';
import { Form, Button, Modal, FloatingLabel } from 'react-bootstrap';

export default function AddMovieModal({onAddMovie}) {

    const [title, setTitle] = useState('')
    const [director, setDirector] = useState('')
    const [genre, setGenre] = useState('')
    const [year, setYear] = useState('')
    const [description, setDescription] = useState('')

    const [addModal, setAddModal] = useState(false);
    const showModal = () => setAddModal(true);
    const closeModal = () => setAddModal(false);

    const handleSubmit = (e) => {
        e.preventDefault();
        onAddMovie(title, director, genre, year, description, closeModal );

        setTitle('')
        setDirector('')
        setGenre('')
        setDescription('')
    };

    return (
        <>
         
            <Button variant="danger" onClick={showModal}> ADD MOVIE </Button>

            <Modal show={addModal} onHide={closeModal}>
                <Form onSubmit={handleSubmit}>

                    <Modal.Header closeButton>
                        <Modal.Title >Add Movie</Modal.Title>
                    </Modal.Header>

                    <Modal.Body>
                        <Form.Group className='pb-2'>
                            <FloatingLabel controlId="floatingInput" label="Title">
                                <Form.Control 
                                type="text"
                                placeholder="Enter Title"
                                value={title}
                                onChange={(e) => setTitle(e.target.value)}
                                required
                                />
                            </FloatingLabel>
                        </Form.Group>

                        <Form.Group className='pb-2'>
                            <FloatingLabel controlId="floatingInput" label="Director">
                                <Form.Control 
                                type="text"
                                placeholder="Enter Director"
                                value={director}
                                onChange={(e) => setDirector(e.target.value)}
                                required
                                />
                            </FloatingLabel>
                        </Form.Group>

                        <Form.Group className='pb-2'>
                            <FloatingLabel controlId="floatingInput" label="Genre">
                                <Form.Control 
                                type="text"
                                placeholder="Enter Genre"
                                value={genre}
                                onChange={(e) => setGenre(e.target.value)}
                                required
                                />
                            </FloatingLabel>
                        </Form.Group>

                        <Form.Group className='pb-2'>
                            <FloatingLabel controlId="floatingInput" label="Year">
                                <Form.Control 
                                type="number"
                                placeholder="Enter Year"
                                value={year}
                                onChange={(e) => setYear(e.target.value)}
                                required
                                />
                            </FloatingLabel>
                        </Form.Group>

                        <Form.Group className='pb-2'>
                            <FloatingLabel controlId="floatingInput" label="Description">
                                <Form.Control 
                                type="text"
                                placeholder="Enter Description"
                                value={description}
                                onChange={(e) => setDescription(e.target.value)}
                                required
                                />
                            </FloatingLabel>
                        </Form.Group>
                    </Modal.Body>

                    <Modal.Footer>
                        <Button variant="danger" onClick={closeModal}>
                            Close
                        </Button>
                        <Button variant="primary" type="submit">
                            Add
                        </Button>
                    </Modal.Footer>
                </Form>
            </Modal>
        </>
    );
}


