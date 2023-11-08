import React, { Fragment, useEffect, useState } from 'react'
import fetchApi from '../../util/helper'
import { API_ENDPOINTS } from '../../config/api'
import Skeleton from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";
import { Menu, Transition } from '@headlessui/react'
import ConfirmationModal from '../common/ConfirmationModal';
import { toast } from 'react-toastify';

function AdminPage() {
    const [orders, setOders] = useState([]);
    const [showUser, setShowUser] = useState({});
    const [changeStatus, setChangeStatus] = useState([]);
    const [isPageLoading, setIsPageLoading] = useState(false);
    const [summaryDetails, setSummaryDetails] = useState({ total_users: '', total_items: '', total_amount: '', total_quantity: '' });
    const [loadingInStatus, setLoadingInStatus] = useState(false);
    const [changedStatus, setChangedStatus] = useState("")
    const [show, setShow] = useState(false);

    useEffect(() => {
        fetchOders();
    }, []);

    const summaryDetailsFill = (data) => {
        function findUniqueUsers(dataForUsers) {
            let userIds = []
            dataForUsers.forEach((item) => {
                item.users.forEach((user) => {
                    userIds.includes(user.user_data._id) || userIds.push(user.user_data._id)
                })
            })
            console.log(userIds)
            return userIds
        }
        let user = findUniqueUsers(data).length
        let items = data.length
        let amount = data.reduce((total, item) => total + item.prd_total_amount, 0)
        let quantity = data.reduce((total, item) => total + item.prd_total_qty, 0)
        setSummaryDetails({ total_users: user, total_items: items, total_amount: amount, total_quantity: quantity })
    }

    const fetchOders = async () => {
        setIsPageLoading(true)
        try {
            const response = await fetchApi({ url: API_ENDPOINTS.ORDER, method: 'GET', isAuthRequired: true });
            if (response.status === 200) {
                setOders(response.data)
                summaryDetailsFill(response.data);
            }
        } catch (error) {
            console.log(error);
        }
        setIsPageLoading(false)
    }

    const handleChange = ({ productId, type }) => {
        if (type === "all") {
            if (changeStatus.length === orders.length) {
                setChangeStatus([]);
            } else {
                setChangeStatus(orders.map(ele => ele.id))
            }
        } else {
            setChangeStatus(pre => pre.includes(productId) ? pre.filter(ele => ele !== productId) : [...pre, productId])
        }
    }

    const handleUpdateStatus = async (status) => {
        setLoadingInStatus(true);
        try {
            let response = await fetchApi({ url: API_ENDPOINTS.ORDER, method: "PUT", data: { prd_ids: changeStatus, order_status: status }, isAuthRequired: true })
            if (response.status === 200) {
                let a = orders.map(ele => changeStatus.includes(ele.id) ? ({ ...ele, order_status: status }) : ele)
                setOders(a);
                setChangeStatus([]);
            }
        } catch (error) {
            toast.error("Error to fetch data")
        }
        setLoadingInStatus(false)
    }

    return (
        <div className="inset-0 overflow-hidden mx-auto max-w-7xl">
            <div className="flex-1 overflow-y-auto px-4 py-1 sm:py-6 sm:px-6">
                {/* {(!isPageLoading && orders.length !== 0) ?  : null} */}
                <div className="mt-2">
                    <div className="flow-root">
                        <div>
                            {isPageLoading ? <div className=" mx-auto max-w-screen-xl gap-2 sm:gap-6">
                                <Skeleton count={4} className="w-max h-44 sm:h-36 mb-3" />
                            </div> : orders.length === 0 ? <h1 className="text-center m-3 text-3xl text-blue-900">Empty Orders List</h1> :
                                <>
                                    <div className='flex items-center justify-between mb-2'>
                                        <div className='sm:px-3'>
                                            <p onClick={() => handleChange({ type: "all" })}
                                                className='border-2 p-1 font-semibold text-blue-600 border-blue-700 rounded hover:text-blue-500 cursor-pointer text-sm sm:text-lg sm:px-3 sm:ms-6'
                                            >Select All</p>
                                        </div>
                                        <div className='flex'>
                                            {changeStatus.length > 0 && <div className="flex justify-between sm:pb-4">
                                                {/* <button disabled={changeStatus.length === 0 || loadingInStatus} onClick={() => { setShow(true); setChangedStatus("pending") }} className={`sm:w-28 rounded-md px-3 py-2 text-md font-semibold shadow-sm sm:ml-3 ${changeStatus.length > 0 ? "border-blue-600 border-2 text-blue-600 hover:bg-blue-600 hover:text-white transition-all" : "bg-gray-600 text-white"}`}>Pending</button> */}
                                                <button disabled={changeStatus.length === 0 || loadingInStatus} onClick={() => { setShow(true); setChangedStatus("completed") }} className={`p-1 sm:w-28 rounded-md sm:px-3 sm:py-2 mr-2 text-sm md:text-md font-semibold shadow-sm sm:ml-3 ${changeStatus.length > 0 ? "border-green-600 border-2 text-green-600 hover:bg-green-600 hover:text-white transition-all" : "bg-gray-600 text-white"}`}>Accept</button>

                                                <button disabled={changeStatus.length === 0 || loadingInStatus} onClick={() => { setShow(true); setChangedStatus("rejected") }} className={`p-1 sm:w-28 rounded-md sm:px-3 sm:py-2 text-sm md:text-md font-semibold shadow-sm sm:ml-3 ${changeStatus.length > 0 ? "border-red-600 border-2 text-red-600 hover:bg-red-600 hover:text-white transition-all" : "bg-gray-600 text-white"}`}>Reject</button>
                                            </div>}
                                            <Menu as="div" className="relative px-3  mx-auto max-w-screen-xl flex justify-end sm:pb-4">
                                                <div>
                                                    <Menu.Button className="sm:w-28 rounded-md p-1 sm:px-3 sm:py-2 text-sm font-semibold shadow-sm sm:ml-3 border-blue-600 border-2 text-blue-600 hover:bg-blue-600 hover:text-white transition-all">
                                                        Summary
                                                    </Menu.Button>
                                                </div>
                                                <Transition
                                                    as={Fragment}
                                                    enter="transition ease-out duration-100"
                                                    enterFrom="transform opacity-0 scale-95"
                                                    enterTo="transform opacity-100 scale-100"
                                                    leave="transition ease-in duration-75"
                                                    leaveFrom="transform opacity-100 scale-100"
                                                    leaveTo="transform opacity-0 scale-95"
                                                >
                                                    <Menu.Items className="absolute top-7 right-90 z-10 mt-2 w-48  origin-top-right rounded-md bg-white  text-black shadow-lg ring-1 ring-black  ring-opacity-5 focus:outline-none">
                                                        <Menu.Item>
                                                            <div className='p-2'>
                                                                <h1 className='mb-2 py-1 px-2  border rounded'>Total Users - {summaryDetails.total_users}</h1>
                                                                <h1 className='mb-2 py-1 px-2  border rounded'>Total Items - {summaryDetails.total_items}</h1>
                                                                <h1 className='mb-2 py-1 px-2  border rounded'>Total Quantity - {summaryDetails.total_quantity}</h1>
                                                                <h1 className='mb-2 py-1 px-2  border rounded'>Total Amount - ₹{summaryDetails.total_amount} </h1>
                                                            </div>
                                                        </Menu.Item>
                                                    </Menu.Items>
                                                </Transition>
                                            </Menu>
                                        </div>
                                    </div>
                                    <ul role="list" className="-my-6 divide-y divide-gray-200 py-4">
                                        {orders.map((item, index) => (
                                            <div key={index}>
                                                <li className="flex py-4  sm:py-6 sm:items-center">
                                                    <div className='sm:px-3 pr-1'>
                                                        <input
                                                            type="checkbox"
                                                            checked={changeStatus.includes(item.id)}
                                                            className='w-[14px] h-[14px] cursor-pointer'
                                                            onChange={() => handleChange({ productId: item.id })}
                                                            name="" id="" />
                                                    </div>
                                                    <div className="h-28 w-20 mx-auto sm:h-36 sm:w-36 flex-shrink-0 overflow-hidden rounded-md border border-gray-200 mb-4 sm:mb-0">
                                                        <img
                                                            src={item.product_details.prd_img} alt="Item"
                                                            onError={(e) => {
                                                                e.target.src = 'images/download.png';
                                                            }}
                                                            className="h-full w-full object-contain sm:object-cover object-center"
                                                        />
                                                    </div>

                                                    <div className="sm:ml-7 ml-3 flex flex-1 flex-col">
                                                        <div>
                                                            <div className="block sm:flex justify-between text-base font-medium text-gray-900 ">

                                                                <div className=' sm:w-1/2 '>
                                                                    <p className='text-lg text-ellipsis overflow-hidden sm:text-xl'>{item.product_details.prd_name}</p>
                                                                    <p>₹ {item.product_details.prd_price}/item</p>
                                                                    <p className="sm:text-lg text-sm">Quantity: <b>{item.prd_total_qty}</b></p>


                                                                </div>

                                                                <div className='w-full text-left sm:text-right sm:w-1/2'>
                                                                    <p className='text-md sm:text-lg'>Total: ₹ <b className='text-md sm:text-lg'>{item.prd_total_amount}</b></p>
                                                                </div>
                                                            </div>
                                                        </div>
                                                        <div className="flex  items-center justify-between text-sm">
                                                            
                                                        <p className={`${item.order_status === "completed" && "bg-green-500"} ${item.order_status === "rejected" && "bg-red-500"} bg-gray-500 inline-block sm:mt-3 py-1 px-2 rounded text-white sm:text-sm text-xs`}>{item.order_status}</p>

                                                            <div className="flex">
                                                                <button
                                                                    type="button"
                                                                    className="font-medium text-indigo-600 hover:text-indigo-500 text-lg"

                                                                >
                                                                    <div className='flex text-sm sm:text-lg items-center gap-2' onClick={() => setShowUser(pre => !pre[item.product_details._id] && ({ [item.product_details._id]: true }))}>
                                                                        <p>User</p>
                                                                        <i style={{ transition: '0.2s', transform: `rotate(${!showUser[item.product_details._id] ? 180 : 0}deg)` }} className="fa-solid fa-chevron-up "></i>
                                                                    </div>
                                                                </button>
                                                            </div>
                                                        </div>
                                                    </div>
                                                </li>
                                                <div className={`${showUser[item.product_details._id] ? "block" : "hidden"} transition-all duration-300 ease-in-out overflow-hidden`}>
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
                                </>
                            }
                        </div>
                    </div>
                </div>
            </div>
            <ConfirmationModal show={show} setShow={setShow} handleSubmit={handleUpdateStatus} data={changedStatus} type={changedStatus} />
        </div >
    )
}

export default AdminPage