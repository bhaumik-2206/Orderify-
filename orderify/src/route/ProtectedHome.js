import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
// import jwtDecode from "jwt-decode";

const ProtectedHome = ({ Component }) => {
    const navigate = useNavigate();
    const [auth, setAuth] = useState("")
    useEffect(() => {
        // let decode;
        // try {
        //     let token = localStorage.getItem("auth");
        //     decode = jwtDecode(token);
        //     setAuth(decode);
        //     console.log(decode);
        //     // if (!decode) {
        //     //     navigate("/logIn");
        //     // }
        // } catch (error) {
        //     if (error.name === "InvalidTokenError") {
        //         navigate("/logIn");
        //     } else {
        //         console.log("ERROR: " + error)
        //         console.log(decode);
        //     }
        // }
        let auth = localStorage.getItem("auth");
        setAuth(auth);
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