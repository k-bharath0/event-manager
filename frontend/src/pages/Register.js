import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';
import { Container, Row, Col, Form, Button } from "react-bootstrap";
import Header from './Header';
const API_BASE_URL = process.env.REACT_APP_API_BASE_URL;

export default function Register() {
   const navigate = useNavigate();
   const [register, setregister] = useState({ name: '', username: '', email: '', password: ''});
   
   const changeHandler = (e) => {
       setregister({ ...register, [e.target.name]: e.target.value });
   }

   const submitHandler = (e) => {
       e.preventDefault();
       axios.post(`${API_BASE_URL}/api/auth/register`, register)
           .then(res => { alert(res.data); navigate('/'); })
           .catch(err => alert(err.response.data));
   }

   return (
      <div>
        <Header/>
        <Container className='login mt-3'>
            <Row className='mb-5'>
                <Col className='text-center'><h2>Register</h2></Col>
            </Row>
            <form onSubmit={submitHandler}>
                <Row className='mb-2'>
                    <Col>
                        <Form.Control name='name' required onChange={changeHandler} type="text" placeholder="Enter Fullname" />
                    </Col>
                </Row>
                <Row className='mb-2'>
                    <Col>
                        <Form.Control name='username' required onChange={changeHandler} type="text" placeholder="Enter Username" />
                    </Col>
                </Row>
                <Row className='mb-2'>
                    <Col>
                        <Form.Control name='email' required onChange={changeHandler} type="email" placeholder="Enter Email" />
                    </Col>
                </Row>
                <Row className='mb-2'>
                    <Col>
                        <Form.Control type="password" required onChange={changeHandler} name='password' placeholder='Enter Password'/>
                    </Col>
                </Row>
                <Row className='mt-5 mb-4'>
                    <Col className='text-center'>
                        <Button variant='info' type='submit'>Sign Up</Button>
                    </Col>
                </Row>
                <Row>
                    <Col>
                        <p>Already have an account? <Button size="sm" variant="outline-dark"><Link style={{ textDecoration: "none" }} to='/'>Sign-In</Link></Button></p>
                    </Col>
                </Row>
            </form>
        </Container>
      </div>
   );
}
