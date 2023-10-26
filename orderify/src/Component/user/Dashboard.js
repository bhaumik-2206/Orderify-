import React, { useEffect, useState } from 'react'
import Header from './Home/Header';
import { Outlet } from 'react-router-dom';
import AdminHeader from '../admin/AdminHeader';

const Dashboard = () => {
    const [userData, setUserData] = useState({});

    useEffect(() => {
        setUserData(JSON.parse(localStorage.getItem("userData")));
    }, [])

    return (
        <>
            {userData.user_role === "admin" ? <AdminHeader /> : <Header />}
            <Outlet />
        </>
    )
}

export default Dashboard;