import React, { useEffect, useState } from 'react'
import dayjs from 'dayjs';

const userDetails = [
    { title: "First Name", value: "user_fname" },
    { title: "Middle Name", value: "user_middle" },
    { title: "Last Name", value: "user_lname" },
    { title: "Email", value: "user_email" },
    { title: "Mobile Number", value: "user_phone" },
];
const Profile = () => {
    const [userData, setUserData] = useState({})
    useEffect(() => {
        setUserData(JSON.parse(localStorage.getItem("userData")));
    }, []);

    const date = dayjs(userData.createdAt)
    

    return (
        <div className="bg-gray-100">
            <div className="container mx-auto p-5">
                <div className="md:flex no-wrap md:-mx-2 ">
                    <div className="w-full md:w-3/12 md:mx-2">
                        <div className="bg-white p-3 border-t-4 border-green-400">
                            <h1 className="text-gray-900 font-bold text-xl leading-8 my-1">{userData.user_fname} {userData.user_lname}</h1>
                            <ul
                                className="bg-gray-100 text-gray-600 hover:text-gray-700 hover:shadow py-2 px-3 mt-3 divide-y rounded shadow-sm">
                                <li className="flex items-center py-3">
                                    <span>Status</span>
                                    <span className="ml-auto"><span
                                        className="bg-green-500 py-1 px-2 rounded text-white text-sm">Active</span></span>
                                </li>
                                <li className="flex items-center py-3">
                                    <span>Member since</span>
                                    <span className="ml-auto"> {date.format("DD MMM ,YYYY")}</span>
                                </li>
                            </ul>
                        </div>
                        <div className="my-4"></div>
                    </div>
                    <div className="w-full md:w-9/12 mx-2 h-64">
                        <div className="bg-white p-3 shadow-sm rounded-sm">
                            <div className="flex items-center space-x-2 font-semibold text-gray-900 leading-8">
                                <span clas="text-green-500">
                                    <i className="fa-solid fa-user text-lg px-3"></i>
                                </span>
                                <span className="tracking-wide">About</span>
                            </div>
                            <div className="text-gray-700">
                                <div>
                                    {userDetails.map((details, index) => (
                                        <div key={index} className="grid grid-cols-2">
                                            <div className="px-4 py-2 font-semibold">{details.title}</div>
                                            {userData[details.value] ? <div className="px-4 py-2">{userData[details.value]}</div> : <p className='px-4 py-2'>Not Added</p>}
                                        </div>
                                    ))}
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Profile
