import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'

const ProtectedLogIn = ({ Component }) => {
    const navigate = useNavigate();
    const [auth, setAuth] = useState("")
    useEffect(() => {
        let auth = localStorage.getItem("auth");
        let userData = localStorage.getItem("userData");
        setAuth(auth);
        if (auth) {
            navigate("/products");
        }
    }, []);

    return (
        !auth && <Component />
    )
}

export default ProtectedLogIn
