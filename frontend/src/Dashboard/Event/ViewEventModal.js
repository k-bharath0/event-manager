import axios from 'axios';
import React from 'react';
import { Modal, Button, Container, Row, Col } from 'react-bootstrap';
const API_BASE_URL = process.env.REACT_APP_API_BASE_URL;

export default function ViewEventModal({ event, show, closeModal,fetch,int }) {

  if(!event.createdAt){
    return;
  }

  const dateTime = event.createdAt; 
  const [date, time] = dateTime.split("T"); 
  const formattedTime = time.split(".")[0];
  
  const send=(e,id)=>{
      e.preventDefault();
      axios.post(`${API_BASE_URL}/interest`,{eventId: id,userId: localStorage.getItem('user')})
      .then((response) => {
        // Handle success response
        fetch();
        alert("Interest saved successfully:");
        // You can update state, show a success message, etc.
      })
      .catch((error) => {
        // Handle error response
        alert("There was an error saving the interest:");
      });
  }


  return (
    <div className="App p-4">
      <Modal centered backdrop="static" show={show} onHide={closeModal}>
        <Modal.Header closeButton style={{ border: "none" }}>
          <Modal.Title>{event.title} @ {event.category}</Modal.Title>
        </Modal.Header>

        <Modal.Body>
          <Container>
          <Row>
            <Col>
             <p>Posted on: {date}, {formattedTime}</p>
           </Col>
            </Row>
            <Row>
              <Col>
                <p>Date: {event.date}</p>  
              </Col>
            </Row>
            <Row>
              <Col>
                <p>Time: {event.time}</p>  
              </Col>
            </Row>

            <Row>
              <Col>
                <p>location: {event.location}</p>
              </Col>
            </Row>
            <Row>
              <Col>
                <p>Description: {event.des}</p>
              </Col>
            </Row>
          </Container>
        </Modal.Body>
        <Modal.Footer style={{ border: "none" }} className='text-end'>
         
          {int !== "interestedEvents" ? 
          <Button variant="outline-dark" onClick={(e) => send(e, event._id)}>
           Interested
          </Button>
           : null}
          
        </Modal.Footer>
      </Modal>
    </div>
  );
}
