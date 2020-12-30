import React, { useContext } from 'react'
import { Route } from 'react-router-dom';
import AuthApi from './AuthApi'
import List from './List'
import Login from './Login'
import Register from './Register'

const Routes = () => {
    const Auth = useContext(AuthApi)
    return (
        <div>
            <Route path="/login">
                <Login auth={Auth.auth} />
            </Route>
            <Route path="/register">
                <Register auth={Auth.auth} />
            </Route>
            <Route path="/list">
                <List auth={Auth.auth} />
            </Route>
        </div>
    )
}

export default Routes
