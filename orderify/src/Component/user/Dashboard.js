import React, { useEffect, useState } from 'react';
import { Outlet } from 'react-router-dom';
import Header from './home/Header';

const Dashboard = ({ userData }) => {
    return (
        <>
            <Header role={userData.role} />
            <Outlet />
        </>
    );
};

export default Dashboard;
