import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import jwtDecode from "jwt-decode";

const ProtectedHome = ({ Component }) => {
    const navigate = useNavigate();
    const [auth, setAuth] = useState("")
    useEffect(() => {
        let auth = localStorage.getItem("auth");
        setAuth(auth);
        let token = jwtDecode(auth);
        console.log(token)
        // console.log(auth)
        if (!auth) {    
            navigate("/login");
        }
    }, [])

    return (
        auth && <Component />
    )
}

export default ProtectedHome;


// import jwtDecode from 'jwt-decode';
// import React, { Fragment } from 'react';
// import { Route, useNavigate } from 'react-router-dom';

// const ProtectedRoute = ({ component: Component, ...rest }) => {
//     const navigate = useNavigate();
//     const checkValidToken = () => {
//         const token = localStorage.getItem('auth');
//         let decode;
//         try {
//             decode = jwtDecode(token);
//         } catch (error) {
//             console.log("first")
//         }
//         if (decode) {
//             return true;
//         } else {
//             return false;
//         }
//     }
//     return (
//         <Fragment>
//             {checkValidToken()
//                 ? <Route {...rest} render={props => <Component {...rest} {...props} />} />
//                 : navigate("login")
//             }
//         </Fragment>
//     );
// }
// export default ProtectedRoute