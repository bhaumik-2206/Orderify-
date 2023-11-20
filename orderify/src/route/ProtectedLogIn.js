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

                const isTokenExpired = decodedToken.exp < Date.now() / 1000;

                if (!isTokenExpired) {
                    setUserData(decodedToken);
                    const adminRedirectPaths = ["/login", "/register", "/", "/order-history"];
                    const userRedirectPaths = ["/login", "/register", "/", "/orders"];

                    const redirectPath = storedUserData.user_role === 'admin'
                        ? adminRedirectPaths.includes(location.pathname) ?  "/orders"  : location.pathname
                        : userRedirectPaths.includes(location.pathname) ? "/products" : location.pathname;

                    navigate(redirectPath);
                    // if (storedUserData.user_role === 'admin') {
                    //     navigate(location.pathname === "/login" || location.pathname === "/register" || location.pathname === "/" || location.pathname === "/order-history" ? "/orders" : location.pathname);
                    // } else {
                    //     navigate(location.pathname === "/login" || location.pathname === "/register"  || location.pathname === "/" || location.pathname === "/orders" ? "/products" : location.pathname);
                    // }
                } else {
                    toast.error("Token has expired");
                    navigate('/login');
                }
            } catch (error) {
                console.error('Invalid token:', error);
                toast.error("Invalid  token");
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