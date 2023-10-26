// import jwtDecode from 'jwt-decode';
import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'

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
        console.log(auth)
        if (!auth) {
        }
    }, [])

    return (
        auth && <Component />
    )
}

export default ProtectedHome
