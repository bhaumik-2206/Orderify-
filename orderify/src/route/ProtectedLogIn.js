import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'

const ProtectedLogIn = ({ Component }) => {
    const navigate = useNavigate();
    const [auth, setAuth] = useState("")
    useEffect(() => {
        let auth = localStorage.getItem("auth");
        setAuth(auth);
        if (auth) {
            navigate("/home");
        }
    }, []);

    return (
        !auth && <Component />
    )
}

export default ProtectedLogIn
