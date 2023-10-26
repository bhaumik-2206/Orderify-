import React from 'react'
import Products from '../../../products/Products';

const Home = () => {
    let data = JSON.parse(localStorage.getItem("userData"));
    return (
        <>
            <Products />
        </>
    )
}

export default Home;