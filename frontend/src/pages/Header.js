import React from 'react';
import { Container, Row, Col, Button } from 'react-bootstrap';
import { useLocation } from 'react-router-dom';

export default function Header({ openEventModal }) {

  const location = useLocation();

  const endSession = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    window.location.href = '/';
  };

  //const showButton = location.pathname !== "/" && location.pathname !== "/Signup" && location.pathname !== "/Guest";
  const showButton = localStorage.getItem("token");
  const GuestBtn = location.pathname === '/Guest' && !localStorage.getItem("token");
  return (
    <div>
      <Container fluid style={{ backgroundColor: "black" }} className='p-5'>
        <Row className='p-3 justify-content-between'>
          <Col>
            <h1 style={{ color: "white" }} className='ms-5'>Event Manager</h1>
          </Col>
          {showButton &&(
          <Col className='text-end'>
            <Button onClick={endSession} variant="outline-info" className='me-2 mb text-nowrap'>Log Out</Button>
            <Button onClick={openEventModal} variant="info" className='text-nowrap'>Post a Event</Button>
          </Col>)}
          {GuestBtn &&(
          <Col className='text-end'>
            <Button variant="outline-info" onClick={()=>{window.location.href = '/';}}>Log Out</Button>
          </Col>)}
        </Row>
      </Container>
    </div>
  );
}
