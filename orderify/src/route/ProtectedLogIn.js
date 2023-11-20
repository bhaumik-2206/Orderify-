import jwtDecode from 'jwt-decode';
import React, { useEffect, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';

const ProtectedLogIn = ({ Component }) => {

    const navigate = useNavigate();
    const location = useLocation();
    const [userData, setUserData] = useState({});
    const token = localStorage.getItem('auth');

    useEffect(() => {
        const storedUserData = JSON.parse(localStorage.getItem('userData'));
        if (token) {
            try {
                const decodedToken = jwtDecode(token);
                if (decodedToken) {
                    setUserData(decodedToken);

                    if (storedUserData.user_role === 'admin') {
                        navigate(location.pathname === "/login" || location.pathname === "/" || location.pathname === "/order-history" ? "/orders" : location.pathname);
                    } else {
                        navigate(location.pathname === "/login" || location.pathname === "/" || location.pathname === "/orders" ? "/products" : location.pathname);
                    }
                } else {
                    navigate('/login');
                }
            } catch (error) {
                console.error('Invalid token:', error);
                toast.error("Invalid or Expire token ")
                navigate('/login');
            }
        } else {
            navigate('/login');
        }
    }, [token]);
    return (
        userData ? <Component userData={userData} /> : null
    );
};

export default ProtectedLogIn;