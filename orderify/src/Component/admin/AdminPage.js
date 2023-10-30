import React, { useEffect, useState } from 'react'
import fetchApi from '../../util/helper'
import { API_ENDPOINTS } from '../../config/api'

function AdminPage() {
    const [orders, setOders] = useState([]);
    const [showUser, setShowUser] = useState({});
    const token = localStorage.getItem('auth');
    const customHeaders = {
        'Auth': token,
    };
    const fetchOders = async () => {
        try {
            const response = await fetchApi({ url: API_ENDPOINTS.ADMIN_ORDERS, method: 'GET', customHeaders });
            setOders(response.data)
            if (!(response.status === 200)) {
                setOders([])
            }
            console.log(response);
        } catch (error) {
            console.log(error)
            setOders([])
        }

    }
    // console.log(showUser)
    useEffect(() => {
        fetchOders();
    }, [])
    return (

        <div className="inset-0 overflow-hidden">
            <div className="flex-1 overflow-y-auto px-4 py-6 sm:px-6">
                <div className="mt-2">
                    <div className="flow-root">
                        <ul role="list" className="-my-6 divide-y divide-gray-200 ">
                            {orders.map((item) => (
                                <div key={item.prd_id} >
                                    <li className="flex py-6">
                                        <div className="h-24 w-24 flex-shrink-0 overflow-hidden rounded-md border border-gray-200">
                                            <img
                                                src={item.prd_img}
                                                // alt={item.imageAlt}
                                                className="h-full w-full object-cover object-center"
                                            />
                                        </div>

                                        <div className="ml-4 flex flex-1 flex-col">
                                            <div>
                                                <div className="flex justify-between text-base font-medium text-gray-900">
                                                    <h3>
                                                        <p >{item.prd_name}</p>
                                                    </h3>
                                                    <div>
                                                        <p className="ml-4">Price: ₹ {item.prd_price}/item</p>
                                                        <p className="ml-4">Total Amount: ₹ {item.total_amount}</p>
                                                    </div>
                                                </div>
                                            </div>
                                            <div className="flex flex-1 items-end justify-between text-sm">
                                                <p className="text-lg ">Qty:{item.total_qty}</p>

                                                <div className="flex">
                                                    <button
                                                        type="button"
                                                        className="font-medium text-indigo-600 hover:text-indigo-500 text-lg"
                                                        onClick={() => setShowUser(pre => !pre[item.prd_id]&&({ [item.prd_id]: true }))}
                                                    >
                                                        {showUser[item.prd_id] ? "hide users" : "show users"}
                                                    </button>
                                                </div>
                                            </div>
                                        </div>
                                    </li>

                                    <div className={`${showUser[item.prd_id] ? "block" : "hidden"}
                                     transition-all duration-300 ease-in-out overflow-hidden`}>
                                        <ul role="list" className="divide-y divide-gray-100">
                                            {item.user.map((person, index) => (
                                                <li key={index} className="flex justify-between gap-x-6 py-2">
                                                    <div className="flex min-w-0 gap-x-4">
                                                        <div className="h-8 w-12 flex-none rounded-full bg-gray-50" >
                                                            <i className="fa-solid fa-user bg-black px-3 sm:px-3 py-2 sm:py-1.5 text-white rounded-full text-sm sm:text-lg"></i>
                                                        </div>
                                                        <div className="min-w-0 flex-auto">
                                                            <p className="text-sm font-semibold leading-6 text-gray-900">{person.user_fname} {person.user_lname}</p>
                                                            <p className="mt-0.5 truncate text-xs leading-5 text-gray-600">Oder Quntity: {person.prd_qty}</p>
                                                        </div>
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


