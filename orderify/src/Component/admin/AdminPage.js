import React, { useEffect, useState } from 'react'
import fetchApi from '../../util/helper'
import { API_ENDPOINTS } from '../../config/api'

function AdminPage() {
    const [orders, setOders] = useState([]);
    const [showUser, setShowUser] = useState({});

    const fetchOders = async () => {
        try {
            const response = await fetchApi({ url: API_ENDPOINTS.ADMIN_ORDERS, method: 'GET', isAuthRequired: true });
            if (response.status === 200) {
                setOders(response.data)
            } else {
                setOders([])
            }
        } catch (error) {
            console.log(error)
        }

    }

    useEffect(() => {
        fetchOders();
    }, []);

    console.log(showUser)

    return (
        <div className="inset-0 overflow-hidden">
            <div className="flex-1 overflow-y-auto px-4 py-6 sm:px-6">
                <div className="mt-2">
                    <div className="flow-root">
                        <ul role="list" className="-my-6 divide-y divide-gray-200 ">
                            {orders.map((item) => (
                                <div key={item.prd_id} >
                                    <li className="block sm:flex py-6">
                                        <div className="h-28 w-28 mx-auto sm:h-40 sm:w-40 flex-shrink-0 overflow-hidden rounded-md border border-gray-200">
                                            <img src={item.product_details.prd_img} alt="Item"
                                                className="h-full w-full object-cover object-center"
                                            />
                                        </div>

                                        <div className="ml-4 flex flex-1 flex-col">
                                            <div>
                                                <div className="flex justify-between text-base font-medium text-gray-900">
                                                    <div className='w-1/2'>
                                                        <p>{item.product_details.prd_name}</p>
                                                        <p className="text-xl ">Qty: <b>{item.prd_total_qty}</b></p>
                                                    </div>
                                                    <div className='text-right w-1/2'>
                                                        <p>₹ {item.product_details.prd_price}/item</p>
                                                        <p className='text-xl'>Total: ₹ <b className='text-2xl'>{item.prd_total_amount}</b></p>
                                                    </div>
                                                </div>
                                            </div>
                                            <div className="flex flex-1 items-end justify-end text-sm">
                                                <div className="flex">
                                                    <button
                                                        type="button"
                                                        className="font-medium text-indigo-600 hover:text-indigo-500 text-lg"
                                                        onClick={() => setShowUser(pre => !pre[item.product_details._id] && ({ [item.product_details._id]: true }))}
                                                    >{showUser[item.product_details._id] ? "hide users" : "show users"}</button>
                                                </div>
                                            </div>
                                        </div>
                                    </li>

                                    <div className={`${showUser[item.product_details._id] ? "block" : "hidden"}
                                     transition-all duration-300 ease-in-out overflow-hidden`}>
                                        <ul role="list" className="divide-y divide-gray-100">
                                            {item.user_details.map((person, index) => (
                                                <li key={index} className="flex justify-between gap-x-6 py-2">
                                                    <div className="flex min-w-0 gap-x-4 justify-between">
                                                        <div className="h-8 w-12 flex-none rounded-full bg-gray-50" >
                                                            <i className="fa-solid fa-user bg-black px-3 sm:px-3 py-2 sm:py-1.5 text-white rounded-full text-sm sm:text-lg"></i>
                                                        </div>
                                                        <div className="min-w-0 flex-auto">
                                                            <p className="text-sm font-semibold leading-6 text-gray-900">{person.user_id.user_fname} {person.user_id.user_lname}</p>
                                                            <p className="mt-0.5 truncate text-xs leading-5 text-gray-600">Oder Quntity: {person.prd_qty}</p>
                                                        </div>
                                                    </div>
                                                    <div>
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


