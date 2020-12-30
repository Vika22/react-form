import React, { useState } from 'react'
import Cookies from 'js-cookie'
import AuthApi from './AuthApi'
import { Button } from 'react-bootstrap';
import { Redirect } from 'react-router-dom';

const List = ({ auth }) => {
    const [list, setList] = useState(Cookies.getJSON())

    const handleRemove = (key) => {
        const arr = Cookies.getJSON()
        delete arr[key]
        setList(arr)
        Cookies.remove(key);
        return <Redirect to='/list' />
    }
    return (
        <div>
            {auth ? <React.Fragment>

                <table className="table">
                    <thead>
                        <tr>
                            <th scope="col">Email</th>
                            <th scope="col">Name</th>
                            <th scope="col"></th>
                        </tr>
                    </thead>
                    {Object.values(list).map(m =>
                        <tbody >
                            <tr key={m.email}>
                                <td>{m.email}</td>
                                <td>{m.name}</td>
                                <td><Button onClick={() => handleRemove(m.email)}>Remove</Button></td>
                            </tr>
                        </tbody>
                    )}
                </table> </React.Fragment> : <Redirect to='/login' />}

        </div>
    )
}

export default List
