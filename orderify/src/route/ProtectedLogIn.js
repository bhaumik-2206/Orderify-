import jwtDecode from 'jwt-decode';
import React, { useEffect, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';

const ProtectedLogIn = ({ Component}) => {

    const navigate = useNavigate();
    const location = useLocation();
    // console.log(location)
    // const [auth, setAuth] = useState('');
    const [userData, setUserData] = useState({});
    const token = localStorage.getItem('auth');
    
    useEffect(() => {
      
        const storedUserData = JSON.parse(localStorage.getItem('userData'));
        // console.log(token)
        if (token) {
            try {
                const decodedToken =jwtDecode(token); 
                console.log(decodedToken)
                // const isTokenValid = isTokenValid(decodedToken); 
                if (decodedToken) {
                    // setAuth(true);
                    setUserData(decodedToken);

                    if (storedUserData.user_role === 'admin') {
                        // navigate('/orders');
                        // location.pathname==="/login" ? navigate("/orders") : navigate(loacation.pathname)
                        navigate(location.pathname === "/login" ||location.pathname === "/"  ? "/orders"  : location.pathname);
                    } else {
                        // navigate('/products');
                        navigate(location.pathname === "/login"||location.pathname === "/"  ? "/products" : location.pathname);

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
        userData ? <Component userData={userData} /> :null  
    );
};

export default ProtectedLogIn;

// import jwtDecode from 'jwt-decode';
// import React, { useEffect, useState } from 'react';
// import { useNavigate } from 'react-router-dom';
// import { toast } from 'react-toastify';

// const ProtectedLogIn = ({ Component }) => {
//     const navigate = useNavigate();
//     const [userData, setUserData] = useState(null); // Initialize userData as null

//     useEffect(() => {
//         const token = localStorage.getItem('auth');
//         const storedUserData = JSON.parse(localStorage.getItem('userData'));

//         if (token) {
//             try {
//                 const decodedToken = jwtDecode(token);

//                 if (decodedToken) {
//                     setUserData(decodedToken); // Set the user data instead of the token
//                     if (storedUserData.user_role === 'admin') {
//                         navigate('/orders');
//                     } else {
//                         navigate('/products');
//                     }
//                 } else {
//                     navigate('/login');
//                     toast.error('Token not found!');
//                 }
//             } catch (error) {
//                 console.error('Invalid token:', error);
//                 toast.error('Invalid or Expired token');
//                 navigate('/login');
//             }
//         } else {
//             navigate('/login');
//         }
//     }, [navigate]);

//     return userData ? <Component userData={userData} /> : null;
// };

// export default ProtectedLogIn;


// import jwtDecode from 'jwt-decode';
// import React, { useEffect, useState } from 'react';
// import { useNavigate } from 'react-router-dom';

// const ProtectedLogIn = ({ Component }) => {
//     const navigate = useNavigate();
//     const [auth, setAuth] = useState(null);
//     const [userData, setUserData] = useState({});

//     useEffect(() => {
//         const token = localStorage.getItem('auth');
//         const storedUserData = JSON.parse(localStorage.getItem('userData'));

//         if (token) {
//             try {
//                 const decodedToken = jwtDecode(token);
                
//                 if (decodedToken) {
//                     setAuth(token);
//                     setUserData(storedUserData);
//                 }
//             } catch (error) {
//                 console.error('Invalid token:', error);
//                 navigate('/login');
//             }
//         }

//         if (!auth) {
//             navigate('/login');
//         }
//     }, [auth, navigate]);

//     return auth ? <Component /> : null;
// };

// export default ProtectedLogIn;

// import React, { useEffect, useState } from 'react'
// import { useNavigate } from 'react-router-dom'

// const ProtectedLogIn = ({ Component }) => {
//     const navigate = useNavigate();
//     const [auth, setAuth] = useState("")
//     useEffect(() => {
//         let auth = localStorage.getItem("auth");
//         let userData = JSON.parse(localStorage.getItem("userData"));
//         setAuth(auth);
//         if (auth) {
//             if (userData.user_role === "admin") {
//                 navigate("/orders");
//             } else {
//                 navigate("/products");
//             }
//         }
//     }, []);

//     return (
//         !auth && <Component />
//     )
// }

// export default ProtectedLogIn