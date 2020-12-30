import React, { useContext, useState } from 'react'
import AuthApi from './AuthApi'
import validate from './Validation'
import Cookies from 'js-cookie'
import { Redirect } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Form, Button } from 'react-bootstrap';
const initialState = {
    email: '',
    username: '',
    password: ''
}
const Register = ({ auth }) => {
    const [show, setShow] = useState(false)
    const Auth = useContext(AuthApi)
    const [user, setUser] = useState(initialState);
    const [errors, setErrors] = useState({});

    const handleName = (e) => {
        const { name, value } = e.target;
        setUser(v => ({ ...v, [name]: value }))
    }
    const handleEmail = (e) => {
        const { name, value } = e.target;
        setUser(v => ({ ...v, [name]: value }))
    }
    const handlePassword = (e) => {
        const { name, value } = e.target;
        setUser(v => ({ ...v, [name]: value }))
    }
    const handleSubmit = e => {
        e.preventDefault();
        setErrors(validate(user))
        Object.keys(Cookies.getJSON()).map(v => v !== user.email ? '' : setErrors(v => ({ ...v, ['email']: 'User with this email address has already exist' })))
        if (Object.keys(errors).length === 0 && user.email !== '' && user.name !== '' && user.password !== '') {
            Cookies.set(user.email, { email: user.email, username: user.username, password: user.password });
            Auth.setAuth(true);
        }
    }
    return (
        <div className="m-5">
            {auth ? <Redirect to='/list' /> :
                <Form onSubmit={handleSubmit}>
                    <Form.Group controlId="formBasicName">
                        <Form.Label>Name</Form.Label>
                        <Form.Control type="text" name='username' value={user.username} onChange={handleName} placeholder="Enter name" />
                        {errors.username && (
                            <p className="help text-danger">{errors.username}</p>
                        )}
                    </Form.Group>
                    <Form.Group controlId="formBasicEmail">
                        <Form.Label>Email address</Form.Label>
                        <Form.Control type="email" name='email' value={user.email} onChange={handleEmail} placeholder="Enter email" />
                        {errors.email && (
                            <p className="help text-danger">{errors.email}</p>
                        )}
                    </Form.Group>
                    <Form.Group controlId="formBasicPassword">
                        <Form.Label>Password</Form.Label>
                        <Form.Control type={show ? 'text' : "password"} placeholder="Password" name='password' value={user.password} onChange={handlePassword} />
                        {errors.password && (
                            <p className="help text-danger">{errors.password}</p>
                        )}
                    </Form.Group>
                    <Form.Group controlId="formBasicCheckbox">
                        <Form.Check type="checkbox" onClick={() => setShow(!show)} label="Show password" />
                    </Form.Group>
                    <Button variant="primary" type="submit">
                        Submit
                    </Button>
                </Form>}
        </div>
    )
}

export default Register
