// import React from 'react'
// import { Route } from 'react-router-dom'

// const ProtectedRoute = ({ Component, isLogIn, userRole, ...rest }) => {
//     return (
//         <Route {...rest} render={props => (
//             isLogIn ?
//                 <Component {...props} /> :
//                 (console.log("Protected Route"))
//         )} />
//     )
// }
// export default ProtectedRoute;


import jwtDecode from 'jwt-decode';
import React from 'react';
import { Route, useNavigate } from 'react-router-dom';

const TOKEN_KEY = 'auth';

const AuthService = {
    login: (token) => {
        localStorage.setItem(TOKEN_KEY, token);
    },
    logout: () => {
        localStorage.removeItem(TOKEN_KEY);
    },
    getToken: () => {
        return localStorage.getItem(TOKEN_KEY);
    },
    isAuthenticated: () => {
        const token = AuthService.getToken();
        return token && !AuthService.isTokenExpired(token);
    },
    isTokenExpired: (token) => {
        try {
            const decoded = jwtDecode(token);
            const currentTime = Date.now() / 1000;
            return decoded.exp < currentTime;
        } catch (err) {
            return true;
        }
    },
};

const ProtectedRoute = ({ component: Component, ...rest }) => {
    const navigate = useNavigate();
    return (
        <Route
            {...rest}
            render={(props) =>
                AuthService.isAuthenticated() ? (
                    <Component {...props} />
                ) : (
                    navigate("/login")
                )
            }
        />
    );
};
export default ProtectedRoute;