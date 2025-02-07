import React, { useState } from 'react';
import { Modal, Form, Container, Row, Col, Button } from "react-bootstrap";
import axios from 'axios';
const API_BASE_URL = process.env.REACT_APP_API_BASE_URL;

export default function NewEventModal({ show, closeEventModal, fetch }) {
    const [formData, setFormData] = useState({
        title: '',
        category: 'Social Events',
        date: '',
        time: '00:00',
        des: '',
        location: '',
    });

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const send = (e) => {
        e.preventDefault();
        axios.post(`${API_BASE_URL}/store`, {
            ...formData,
            userId: localStorage.getItem('user')
        })
        .then(() => {
            setFormData({
                title: '', category: 'Social Events', date: '', time: '00:00', location: '', des: '', postMessage: 'Event posted successfully!'
            });
            fetch();
            setTimeout(() => setFormData((prev) => ({ ...prev, postMessage: '' })), 1500);
        })
        .catch(() => {
            setFormData((prev) => ({ ...prev, postMessage: 'Failed to post the Event.' }));
        });
    };

    return (
        <div className="App p-4">
            <Modal centered backdrop="static" show={show} onHide={closeEventModal}>
                <form method="POST" onSubmit={send}>
                    <Modal.Header closeButton style={{ border: "none" }}>
                        <Modal.Title>Post Event</Modal.Title>
                    </Modal.Header>

                    <Modal.Body>
                        <Container>
                            <Row className='mb-2'>
                                <Col>
                                    <Form.Control value={formData.title} required name="title" onChange={handleChange} type="text" placeholder="Event title *" />
                                </Col>
                                <Col>
                                    <select name="category" value={formData.category} className='w-100 p-2' onChange={handleChange}>
                                        <option value="Social Events">Social Events</option>
                                        <option value="Corporate Events">Corporate Events</option>
                                        <option value="Cultural & Traditional Events">Cultural & Traditional Events</option>
                                        <option value="Educational Events">Educational Events</option>
                                        <option value="Entertainment & Media Events">Entertainment & Media Events</option> 
                                    </select>
                                </Col>
                            </Row>
                            <Row className='mb-2'>
                                <Col>
                                    <Form.Control required value={formData.date} name='date' onChange={handleChange} type="date"  />
                                </Col>
                                <Col>
                                    <Form.Control required value={formData.time} name='time' onChange={handleChange} type="time" />
                                </Col>
                            </Row>
                            <Row>
                                <Col>
                                    <Form.Control required value={formData.location} name='location' onChange={handleChange} type="text" placeholder="Location *" />
                                </Col>
                            </Row>
                            <Row className='mb-2'>
                                <Col>
                                    <Form.Control required value={formData.des} name='des' onChange={handleChange} as="textarea" rows={3} placeholder="Description *" />
                                </Col>
                            </Row>
                        </Container>
                    </Modal.Body>

                    <Modal.Footer style={{ border: "none" }} className='justify-content-between'>
                        <p className='text-danger'>*required</p>
                        {formData.postMessage && <p className='text-info fw-bold'>{formData.postMessage}</p>}
                        <Button type='submit' variant="info">Post Event</Button>
                    </Modal.Footer>
                </form>
            </Modal>
        </div>
    );
}
