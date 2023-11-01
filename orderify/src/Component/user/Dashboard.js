import React, { useEffect, useState } from 'react';
import Header from './Home/Header';
import { Outlet } from 'react-router-dom';

const Dashboard = ({ role }) => {
    const [userData, setUserData] = useState(null);

    useEffect(() => {
        const storedUserData = JSON.parse(localStorage.getItem("userData"));
        if (storedUserData) {
            setUserData(storedUserData);
        }
    }, []);

    if (!role) {
        return <p>Please provide a role.</p>;
    }

    if (!userData) {
        return <p>Access denied.</p>;
    }

    return (
        <>
            <Header role={userData.user_role} />
            <Outlet />
        </>
    );
};

export default Dashboard;
