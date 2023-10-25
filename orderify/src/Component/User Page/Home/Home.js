import React from 'react'
import Products from '../../../products/Products';

const Home = () => {
    let data = JSON.parse(localStorage.getItem("userData"));
    return (
        <>
        <div className='text-5xl text-center font-bold'>
            Welcome {data && data.fname}
        </div>
            <Products/>
        </>
    )
}

export default Home;