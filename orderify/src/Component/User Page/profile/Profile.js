import React, { useEffect, useState } from 'react'

const userDetails = [
    { title: "First Name", value: "user_fname" },
    { title: "Middle Name", value: "user_middle" },
    { title: "Last Name", value: "user_lname" },
    { title: "Email", value: "user_email" },
    { title: "Mobile Number", value: "user_phone" },
    { title: "Date Of Birth", value: "user_DOB" },
    { title: "Gender", value: "user_gender" },
    { title: "Blood Group", value: "user_blood" },
];
const Profile = () => {
    const [userData, setUserData] = useState({})
    useEffect(() => {
        setUserData(JSON.parse(localStorage.getItem("userData")));
    }, [])

    return (
        <div className='w-10/12 mx-auto'>
            <div className="bg-gray-700 text-white my-4 rounded-lg">
                <div className='w-full flex border-b-2 border-black p-3 justify-between align-middle'>
                    <div>
                        <h1 className='ps-3 text-2xl font-bold'>Primary Details</h1>
                    </div>
                    <div>
                        <button className='block text-blue-950'>Edit</button>
                    </div>
                </div>
                <div className="flex flex-wrap p-3">
                    {userDetails.map((item, index) => (
                        <div key={index} className='ps-3 w-1/2 mb-3' >
                            <p className='text-md'>{item.title}</p>
                            {userData[item.value] ? <p className='text-sm'>{userData[item.value]}</p> : <p>Not Added</p>}
                        </div>
                    ))}
                </div>
            </div>
        </div>
    )
}

export default Profile
