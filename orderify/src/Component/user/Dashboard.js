import React, { useEffect, useState } from 'react';
import { Outlet } from 'react-router-dom';
import Header from './home/Header';

const Dashboard = ({ userData }) => {
    const [userDatas, setUserData] = useState(null);

    useEffect(() => {
        const storedUserData = JSON.parse(localStorage.getItem("userData"));
        if (storedUserData) {
            setUserData(storedUserData);
        }
    }, []);


    return (
        <>
            <Header role={userData.role} />
            <Outlet />
        </>
    );
};

export default Dashboard;
