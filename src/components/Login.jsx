import React, { useState, useContext } from 'react'
import { Redirect } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';
import validate from './Validation'
import { Form, Button } from 'react-bootstrap';
import Cookies from 'js-cookie'
import AuthApi from './AuthApi'

const initialState = {
    username: '1',
    email: '',
    password: ''
}
const Login = ({ auth }) => {
    const Auth = useContext(AuthApi)

    const [show, setShow] = useState(false)
    const [errors, setErrors] = useState({});
    const [user, setUser] = useState(initialState);

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
        if (Object.keys(errors).length === 0) {
            for (const key in Cookies.getJSON()) {
                if (Cookies.getJSON()[key].email === user.email && Cookies.getJSON()[key].password === user.password) {
                    Auth.setAuth(true);
                }
            }
        }
    }
    return (
        <div className="m-5">
            {auth ? <Redirect to='/list' /> :
                <Form onSubmit={handleSubmit} >
                    <Form.Group controlId="formBasicEmail">
                        <Form.Label>Email address</Form.Label>
                        <Form.Control type="email" name='email' value={user.email} onChange={handleEmail} placeholder="Enter email" />
                        <p className="help text-danger">{errors.email}</p>
                    </Form.Group>
                    <Form.Group controlId="formBasicPassword">
                        <Form.Label>Password</Form.Label>
                        <Form.Control type={show ? 'text' : "password"} placeholder="Password" name='password' value={user.password} onChange={handlePassword} />
                        <p className="help text-danger">{errors.password}</p>
                    </Form.Group>
                    <Form.Group controlId="formBasicCheckbox">
                        <Form.Check type="checkbox" onClick={() => setShow(!show)} label="Show password" />
                    </Form.Group>
                    <Button variant="primary" type="submit">
                        Submit
                </Button>
                </Form>
            }
        </div>
    )
}

export default Login
