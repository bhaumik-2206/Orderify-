import React, { useEffect, useState } from 'react'
import dayjs from 'dayjs';
import ProfileUpdateModal from './ProfileUpdateModal';
import fetchApi from '../../../util/helper';
import { API_ENDPOINTS } from '../../../config/api';

const userDetails = [
    { title: "First Name", value: "user_fname" },
    { title: "Last Name", value: "user_lname" },
    { title: "Email", value: "user_email" },
    { title: "Mobile Number", value: "user_phone" },
];
const Profile = () => {
    const [userData, setUserData] = useState({})
    const [isProfileEdit, setIsProfileEdit] = useState(false);
    const [loading, setLoading] = useState(false)
    useEffect(() => {
        fetchUserData();
    }, []);


    async function fetchUserData() {
        setLoading(true);
        try {
            let response = await fetchApi({ url: API_ENDPOINTS.USER, method: 'GET', isAuthRequired: true })
            setUserData(response.data);
        } catch (error) {
            console.log(error)
        }
        setLoading(false);
    }

    const date = dayjs(userData.createdAt)


    return (
        loading ? (
            <div className='text-center py-4'>
                <svg aria-hidden="true" className="inline w-12 h-12 mr-2 text-gray-200 animate-spin dark:text-gray-600 fill-blue-600" viewBox="0 0 100 101" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z" fill="currentColor" />
                    <path d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z" fill="currentFill" />
                </svg>
            </div>
        ) : (
            <div className="bg-gray-100">
                <div className="container p-5 max-w-7xl mx-auto">
                    <div className="md:flex no-wrap md:-mx-2 ">
                        <div className="w-full md:w-3/12 md:mx-2">
                            <div className="bg-white p-3 border-t-4 border-green-400">
                                <h1 className="text-gray-900 font-bold text-xl leading-8 my-1">{userData.user_fname
                                } {userData.user_lname}</h1 >
                                <ul
                                    className="bg-gray-100 text-gray-600 hover:text-gray-700 hover:shadow py-2 px-3 mt-3 divide-y rounded shadow-sm">
                                    <li className="flex items-center py-3">
                                        <span>Status</span>
                                        <span className="ml-auto"><span
                                            className="bg-green-500 py-1 px-2 rounded text-white text-sm">Active</span></span>
                                    </li>
                                    <li className="flex md:block lg:flex items-center py-3">
                                        <p>Member since</p>
                                        <p className="ml-auto"> {date.format("DD MMM ,YYYY")}</p>
                                    </li>
                                </ul>
                            </div >
                            <div className="my-4"></div>
                        </div >
                        <div className="w-full md:w-9/12 mx-2 h-64">
                            <div className="bg-white p-3 shadow-sm rounded-sm">
                                <div className="flex justify-between items-center space-x-2 font-semibold text-gray-900 leading-8 mr-8 ms-1">
                                    <div className='flex'>
                                        <span clas="text-green-500">
                                            <i className="fa-solid fa-user text-lg px-3"></i>
                                        </span>
                                        <span className="tracking-wide">About</span>
                                    </div>
                                    <button>
                                        <i onClick={() => setIsProfileEdit(true)} className="fa-regular fa-pen-to-square text-2xl"></i>
                                    </button>
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
                    </div >
                </div >
                <ProfileUpdateModal show={isProfileEdit} setShow={setIsProfileEdit} userData={userData} setUserData={setUserData} />
            </div >)
    )
}

export default Profile
