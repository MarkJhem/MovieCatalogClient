import { useState } from 'react';
import { Form, Button, Modal, FloatingLabel } from 'react-bootstrap';

export default function UpdateMovieModal({ctitle, cdirector, cgenre, cyear, cdescription, movie, onUpdateMovie}) {

    const [title, setTitle] = useState(ctitle)
    const [director, setDirector] = useState(cdirector)
    const [genre, setGenre] = useState(cgenre)
    const [year, setYear] = useState(cyear)
    const [description, setDescription] = useState(cdescription)

    const [updateModal, setUpdateModal] = useState(false);
    const showModal = () => setUpdateModal(true);
    const closeModal = () => setUpdateModal(false);

    const handleSubmit = (e) => {
        e.preventDefault();
        onUpdateMovie(title, director, genre, year, description, movie, closeModal);

    };

    return (
        <>

            <Button className="me-1" variant="success" size="sm" onClick={showModal}> Update </Button>

            <Modal show={updateModal} onHide={closeModal}>
                <Form onSubmit={handleSubmit}>

                    <Modal.Header closeButton>
                        <Modal.Title>Update Movie</Modal.Title>
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
                            Cancel
                        </Button>
                        <Button variant="primary" type="submit">
                            Update
                        </Button>
                    </Modal.Footer>
                </Form>
            </Modal>
        </>
    );
}


