import React from 'react'
import { Route } from 'react-router-dom'

const ProtectedRoute = ({ Component, isLogIn, userRole, ...rest }) => {
    return (
        <Route {...rest} render={props => (
            isLogIn ?
                <Component {...props} /> :
                (console.log("Protected Route"))
        )} />
    )
}

export default ProtectedRoute;