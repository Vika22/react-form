import React, { useState } from 'react'
import { BrowserRouter as Router, Link } from 'react-router-dom';
import AuthApi from './components/AuthApi'
import Routes from './components/Routes'
import { Button } from 'react-bootstrap';
function App() {
  const [auth, setAuth] = useState(false)

  const logOut = () => {
    setAuth(false);
  }
  return (
    <div >
      <AuthApi.Provider value={{ auth, setAuth }}>
        <Router>
          <nav className="d-flex justify-content-center">
            <Button variant="light">
              <Link to="/register">Register</Link>
            </Button>
            <Button variant="light">
              <Link to="/login">Login</Link>
            </Button>
            <Button variant="light">
              <Link to="/list">List</Link>
            </Button>
            {auth ? <Button onClick={() => logOut()}> Log out </Button> : ''}
          </nav>
          <Routes />
        </Router>
      </AuthApi.Provider>
    </div >
  );
}

export default App;
