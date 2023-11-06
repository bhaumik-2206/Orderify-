import React, { useEffect, useState } from 'react'
import fetchApi from '../../util/helper'
import { API_ENDPOINTS } from '../../config/api'
import { useNavigate } from 'react-router-dom';
import Skeleton from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";

function AdminPage() {
    const [orders, setOders] = useState([]);
    const [showUser, setShowUser] = useState({});
    const [isPageLoading, setIsPageLoading] = useState(false);
    const navigate = useNavigate();

    useEffect(() => {
        fetchOders();
    }, []);

    const fetchOders = async () => {
        setIsPageLoading(true)
        try {
            const response = await fetchApi({ url: API_ENDPOINTS.ORDER, method: 'GET', isAuthRequired: true });
            if (response.status === 200) {
                setOders(response.data)
            }
            if (response.message === "jwt expired") {
                navigate("/login");
            }
        } catch (error) {
            console.log(error);
        }
        setIsPageLoading(false)
    }



    return (
        <div className="inset-0 overflow-hidden mx-auto max-w-7xl">
            <div className="flex-1 overflow-y-auto px-4 py-6 sm:px-6">
                <div className="mt-2">
                    <div className="flow-root">
                        <ul role="list" className="-my-6 divide-y divide-gray-200 ">

                            {isPageLoading ? <div className=" mx-auto max-w-screen-xl p-3 gap-2 sm:gap-6 sm:py-8 sm:px-4 lg:px-8">
                                    <Skeleton count={4} className="w-max h-44 sm:h-36 mb-3" />
                            </div>
                             : orders.length === 0 ? <h1 className="text-center m-3 text-3xl text-blue-900">Empty Orders List</h1> : orders.map((item, index) => (
                                <div key={index}>
                                    <li className="flex sm:flex py-6">
                                        <div className="h-28 w-20 mx-auto sm:h-36 sm:w-36 flex-shrink-0 overflow-hidden rounded-md border border-gray-200 mb-4 sm:mb-0">
                                            <img src={item.product_details.prd_img} alt="Item"
                                                className="h-full w-full object-contain sm:object-cover object-center"
                                            />
                                        </div>

                                        <div className="ml-7 flex flex-1 flex-col">
                                            <div>
                                                <div className="block sm:flex justify-between text-base font-medium text-gray-900 ">
                                                    <div className=' sm:w-1/2 '>
                                                        <p className='text-lg text-ellipsis overflow-hidden sm:text-xl'>{item.product_details.prd_name}</p>
                                                        <p>₹ {item.product_details.prd_price}/item</p>
                                                        <p className="sm:text-lg text-sm">Qty: <b>{item.prd_total_qty}</b></p>
                                                    </div>
                                                    <div className='w-full text-left sm:text-right sm:w-1/2'>
                                                        <p className='text-lg sm:text-xl'>Total: ₹ <b className='text-lg sm:text-2xl'>{item.prd_total_amount}</b></p>
                                                    </div>
                                                </div>
                                            </div>
                                            <div className="flex flex-1 items-end justify-end text-sm">
                                                <div className="flex">
                                                    <button
                                                        type="button"
                                                        className="font-medium text-indigo-600 hover:text-indigo-500 text-lg"
                                                        onClick={() => setShowUser(pre => !pre[item.product_details._id] && ({ [item.product_details._id]: true }))}
                                                    >
                                                        {/* {showUser[item.product_details._id] ? "hide users" : "show users"} */}
                                                        <div className='flex items-center gap-2'>
                                                            <p>User</p>
                                                            <i style={{transition:'0.2s',transform:`rotate(${!showUser[item.product_details._id]?180:0}deg)`}} className="fa-solid fa-chevron-up "></i>
                                                        </div>
                                                    </button>
                                                </div>
                                            </div>
                                        </div>
                                    </li>

                                    <div className={`${showUser[item.product_details._id] ? "block" : "hidden"}
                                     transition-all duration-300 ease-in-out overflow-hidden`}>
                                        <ul role="list" className="divide-y divide-gray-100">
                                            {item.users.map((person, index) => (
                                                <li key={index} className="bloc sm:flex justify-between gap-x-6 py-2">
                                                    <div className="flex gap-x-2">
                                                        <div className="h-8 w-12 flex-none rounded-full bg-gray-50" >
                                                            <i className="fa-solid fa-user bg-black px-3 sm:px-3 py-2 sm:py-1.5 text-white rounded-full text-sm sm:text-lg"></i>
                                                        </div>
                                                        <div>
                                                            <p className="text-sm font-semibold leading-6 text-gray-900">{person.user_data.user_fname} {person.user_data.user_lname}</p>
                                                            <p className="mt-0.5 truncate text-xs leading-5 text-gray-600">Quntity: {person.prd_qty}</p>
                                                        </div>
                                                    </div>
                                                    <div className='flex gap-x-2'>
                                                        <div className="h-8 w-12 flex-none" ></div>
                                                        <p>Total Amount: {person.prd_qty * item.product_details.prd_price}</p>
                                                    </div>
                                                </li>
                                            ))}
                                        </ul>
                                    </div>
                                </div>
                            ))}
                        </ul>
                    </div>
                </div>
            </div >
        </div >
    )
}

export default AdminPage