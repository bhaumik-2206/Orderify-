import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'

const ProtectedHome = ({ Component }) => {
    const navigate = useNavigate();
    const [auth, setAuth] = useState("")
    useEffect(() => {
        let auth = localStorage.getItem("auth");
        setAuth(auth);
        console.log(auth)
        if (!auth) {
            navigate("/logIn");
        }
    }, [])

    return (
        auth && <Component />
    )
}

export default ProtectedHome
