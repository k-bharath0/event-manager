import React from 'react';
import axios from 'axios';
import { Container, Row, Col, Button } from 'react-bootstrap';
const API_BASE_URL = process.env.REACT_APP_API_BASE_URL;

export default function EventDetails({ event,openModal,d,d2 }) {
    const deleteHandler = (id) => {
        axios.delete(`${API_BASE_URL}/${id}`).then(res => window.location.reload(false));
    };

    return (
        <Container className="p-4 card" key={event.title}>
            <Row className="justify-content-center align-items-center flex-wrap">
                <Col>
                    <p>{event.title}</p>
                    <p className="category">{event.category}</p>
                    <p>Number of Atendess: {event.interestedUsers.length}</p>
                </Col>
                <Col className="text-end">
                    <p>{event.date} | {event.time} | {event.location}</p>
                    {d &&(
                    <Button className={d} onClick={() => deleteHandler(event._id)} variant="outline-dark">Delete</Button>
                    )}   
                    {d2 &&(        
                    <Button className={d2} variant='info' onClick={openModal}>Check</Button>
                    )}
                </Col>
            </Row>
        </Container>
    );
}
