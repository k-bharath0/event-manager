import React, { useState } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import { Container, Row, Col, Form, Button } from 'react-bootstrap';
import Header from './Header';
const API_BASE_URL = process.env.REACT_APP_API_BASE_URL;

export default function Login() {
    const [login, setlogin] = useState({ username: '', password: ''});

    const changeHandler = (e) => {
        setlogin({ ...login, [e.target.name]: e.target.value });
    };

    const submitHandler = (e) => {
        e.preventDefault();
        axios.post(`${API_BASE_URL}/api/auth/login`, login)
            .then(res => {
                console.log(res.data);
                localStorage.setItem('token', res.data.token); localStorage.setItem('user',res.data.id);
                window.location.href = '/';
            })
            .catch(err => alert(err.response.data));
    };

    return (
        <div>
            <Header />
            <Container  className='login mt-3'>
                <Row className='mb-5'>
                    <Col className='text-center'>
                        <h2>Sign In</h2>
                    </Col>
                </Row>
                <form onSubmit={submitHandler}>
                    <Row className='mb-2'>
                        <Col>
                            <Form.Control
                                required
                                name='username'
                                onChange={changeHandler}
                                type="text"
                                placeholder="Enter Username"
                                autoComplete="username"
                            />
                        </Col>
                    </Row>
                    <Row className='mb-2'>
                        <Col>
                            <Form.Control
                                required
                                type="password"
                                name='password'
                                onChange={changeHandler}
                                placeholder='Enter Password'
                                autoComplete="current-password"
                            />
                        </Col>
                    </Row>
                    <Row className='mt-5 mb-4'>
                        <Col className='text-center'>
                            <Button type='submit' variant='info'>Login</Button>
                        </Col>
                    </Row>
                </form>
                <Row>
                    <Col>
                        <p>
                            Don't have an account? <br/>
                            <Button size="sm" variant='outline-dark' className='me-1'>
                                <Link to='/Signup' style={{ textDecoration: "none" }}>Sign-Up</Link>
                            </Button>
                            <Button size="sm" variant='outline-info'>
                                <Link to='/Guest' style={{ textDecoration: "none",color:"black" }}>Guest-Login</Link>
                            </Button>
                            
                        </p>
                    </Col>
                </Row>
            </Container>
        </div>
    );
}
