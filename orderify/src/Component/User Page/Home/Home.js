import React from 'react'

const Home = () => {
    let data = JSON.parse(localStorage.getItem("userData"));
    return (
        <div className='text-5xl text-center font-bold'>
            Welcome {data && data.fullName}
        </div>
    )
}

export default Home;