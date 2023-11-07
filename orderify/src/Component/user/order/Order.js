import React, {Fragment ,useContext, useEffect, useState } from 'react'
import { Disclosure, Menu, Transition } from '@headlessui/react'
import fetchApi from '../../../util/helper';
import { API_ENDPOINTS } from '../../../config/api';
import dayjs from 'dayjs'
import { toast } from 'react-toastify';
import { CartDataContext } from '../../../context/CartContext';
import { groupBy, sortBy } from 'lodash';
import { useNavigate } from 'react-router-dom'
import Skeleton from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";

const Order = () => {
    const [orders, setOrders] = useState([]);
    const [buyAgainOrder, setBuyAgainOrder] = useState([]);
    const [loading, setLoading] = useState(false);
    const [buyAgainLoading, setBuyAgainLoading] = useState(false);
    const { fetchCart, setIsCartOpen } = useContext(CartDataContext);
    const navigate = useNavigate();

    useEffect(() => {
        fetchUserOrder();
    }, []);
    const fetchUserOrder = async () => {
        setLoading(true);
        try {
            const date = dayjs();
            const response = await fetchApi({
                url: API_ENDPOINTS.USER_ORDER,
                method: 'POST',
                data: {
                    start_date: date.subtract(10, 'day').format('DD-MM-YYYY'),
                    end_date: date.format('DD-MM-YYYY')
                },
                isAuthRequired: true
            });

            if (response.status === 200) {
                const order = response.data;
                
                const sortedOrders = sortBy(order, (element) => new Date(element.createdAt)).reverse();
                const groupedOrders = groupBy(sortedOrders, (element) => new Date(element.createdAt).toDateString());
                setOrders(groupedOrders);
            } else {
                toast.error('ERROR - Invalid status code');
            }
            if (response.message === "jwt expired") {
                navigate("/login");
            }
        } catch (error) {
            toast.error('Error getting order history');
        }
        setLoading(false);
    }

    const handleButAgain = async () => {
        setBuyAgainLoading(true)
        try {
            const response = await fetchApi({ url: API_ENDPOINTS.CART, method: 'POST', data: { cart_items: buyAgainOrder.map(ele => ({ cartitm_fk_prd_id: ele.cartitm_fk_prd_id, cartitm_prd_qty: ele.cartitm_prd_qty })) }, isAuthRequired: true });
            if (response.status === 200) {
                await fetchCart();
                setBuyAgainOrder([]);
                toast.success("Order successfully added in cart");
                setIsCartOpen(true);
            }
        } catch (error) {
            console.log("Error To Fetch API");
        }
        setBuyAgainLoading(false)
    }

    const handleCheckBoxChange = (productId, quantity, item) => {
        let findOrder = orders[item].find(ele => ele.product_details._id === productId);
        let findOrderInAgain = buyAgainOrder.find(ele => ele.cartitm_fk_prd_id === productId);
        let findDate = buyAgainOrder.find(ele => ele.cartitm_fk_prd_id === productId && ele.date !== item);
        if (findDate) {
            toast.error("Order already selected")
            return
        }
        setBuyAgainOrder(pre => findOrder && !findOrderInAgain ?
            [...pre, { cartitm_fk_prd_id: productId, cartitm_prd_qty: quantity > 5 ? 5 : quantity, date: item }]
            : pre.filter(ele => ele.cartitm_fk_prd_id !== productId)
        )
    }

    function summaryDetailsFiller(arrayOfItem) {
        let items = arrayOfItem.length
        let amount = arrayOfItem.reduce((total,item)=>total+item.prd_total_amount,0)
        let quantity = arrayOfItem.reduce((total,item)=>total+item.prd_total_qty,0)               
        return {items,quantity,amount}
    }

    return (
        loading ?
            <div className=" mx-auto max-w-screen-xl p-3 gap-2 sm:gap-6 sm:py-8 sm:px-4 lg:px-8">
                <Skeleton width={300} className=' h-12 mb-3' />
                <div className="grid grid-cols-2 gap-2">
                    {Array(6).fill(0).map((_, index) => (
                        <Skeleton key={index} className="w-96 h-72 sm:h-44" />
                    ))
                    }
                </div>
            </div>
            : Object.keys(orders).length === 0 ? <h1 className="text-center m-3 text-3xl text-blue-900">Data is Empty</h1>
                :
                <div className='mx-auto max-w-screen-xl relative w-full px-2 sm:px-6 lg:px-8'>
                    {/* {buyAgainOrder.length > 0 && <div>
                        <button
                            onClick={() => handleButAgain()}
                            className="absolute -top-3 right-10 sm:w-auto mx-auto mt-3 bg-indigo-600 sm:ms-auto hover:bg-indigo-700 cursor-pointer flex items-center justify-center rounded-md border border-transparent px-4 py-2 text-lg font-medium text-white shadow-sm"
                        >Order</button>
                    </div>} */}
                    {Object.keys(orders).map((item, index) => (
                        <div key={index}>
                            <div className='max-w-7xl mx-auto m-2 block text-center sm:h-12 sm:flex justify-between items-center mt-3'>
                                <div className="flex items-center">
                                    <h2 className={`mx-1 text-3xl font-semibold text-shadow`}>{item}</h2>
                                    <Menu as="div" className="relative px-3 flex justify-end">
                                        <div>
                                            <Menu.Button className="relative shadow flex text-white bg-black rounded px-2 py-1 text-sm">
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
                                            <Menu.Items className="absolute top-7 right-90 z-10 mt-2 w-fit  origin-top-right rounded-md bg-white  text-black shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none">
                                                <Menu.Item>
                                                    <div className='p-2 text-start'>
                                                        {/* {console.log(orders[item])} */}
                                                        <h1 className='mb-2 py-1 px-2 w-44  border rounded'>Total Items - {summaryDetailsFiller(orders[item]).items}</h1>
                                                        <h1 className='mb-2 py-1 px-2 w-44 border rounded'>Total Quantity - {summaryDetailsFiller(orders[item]).quantity}</h1>
                                                        <h1 className='mb-2 py-1 px-2 w-44 border rounded'>Total Amount - {summaryDetailsFiller(orders[item]).amount} ₹</h1>
                                                    </div>
                                                </Menu.Item>
                                            </Menu.Items>
                                        </Transition>
                                    </Menu>
                                    {buyAgainOrder.length > 0 && <div>
                                    <button
                                        onClick={() => handleButAgain()}
                                        className="absolute right-10 -top-1 sm:w-auto mx-auto mt-2 bg-indigo-600 sm:ms-auto hover:bg-indigo-700 cursor-pointer flex items-center justify-center rounded-md border border-transparent px-4 py-2 text-lg font-medium text-white shadow-sm"
                                    >
                                        {buyAgainLoading ? <div className="animate-spin me-2"><i className="fa-solid px-[9px] fa-spinner"></i></div> : "order"}
                                    </button>
                                </div>}
                                </div>
                            </div>
                            <div className='grid grid-cols-2'>
                                {orders[item].map((dateArray, index) => (
                                    <div onClick={() => dateArray.product_details.prd_is_visible && handleCheckBoxChange(dateArray.product_details._id, dateArray.prd_total_qty, item)} key={index}
                                        className={`${buyAgainOrder.find(ele => ele.cartitm_fk_prd_id === dateArray.product_details._id && ele.date === item) ? "bg-green-100 border border-green-700" : "border"} ${!dateArray.product_details.prd_is_visible && "bg-gray-200 text-gray-600 border"} m-2 py-2 rounded cursor-pointer border-b border-gray-200 flex flex-col sm:flex-row justify-between items-center px-2`}>
                                        <div className="px-4 block text-center sm:text-left sm:flex">
                                            <div className=" mb-3 sm:mb-0 w-40 sm:block mx-auto sm:h-40 flex-shrink-0 overflow-hidden rounded-md border">
                                                <img className={`${!dateArray.product_details.prd_is_visible && "opacity-80"} w-full h-full  object-contain object-center`}
                                                    src={dateArray.product_details.prd_img}
                                                    alt="Product" />
                                            </div>
                                            <div className=" px-0 sm:px-4">
                                                <p className="text-md sm:text-xl font-semibold">{dateArray.product_details.prd_name}</p>
                                                <p>₹ {dateArray.product_details.prd_price} / item</p>
                                                <p className="my-0 sm:mt-3 text-lg">Qty: {dateArray.prd_total_qty}</p>
                                                <p className="text-lg sm:text-2xl font-semibold">₹ {dateArray.prd_total_amount}</p>
                                                {!dateArray.product_details.prd_is_visible && <p className='text-red-500'>Item Not Available</p>}
                                            </div>
                                        </div>
                                    </div>))}
                            </div>
                        </div>
                    ))}
                </div>
    )
}

export default Order;