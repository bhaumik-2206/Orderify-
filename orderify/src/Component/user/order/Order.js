import React, { useContext, useEffect, useState } from 'react'
import fetchApi from '../../../util/helper';
import { API_ENDPOINTS } from '../../../config/api';
import dayjs from 'dayjs'
import { toast } from 'react-toastify';
import { CartDataContext } from '../../../context/CartContext';

const Order = () => {
    const [orders, setOrders] = useState([]);
    const [loading, setLoading] = useState(false);
    const { fetchCart, cartData } = useContext(CartDataContext);
    const token = localStorage.getItem("auth");
    const customHeaders = {
        Auth: token,
    };

    useEffect(() => {
        fetchUserOrder();
    }, [cartData]);

    const fetchUserOrder = async () => {
        setLoading(true);
        try {
            let date = dayjs();
            const response = await fetchApi({
                url: API_ENDPOINTS.USER_ORDER, method: 'POST', data: { start: date.subtract(10, "day").format("DD-MM-YYYY"), end: date.format("DD-MM-YYYY") }, customHeaders
            });
            if (response.status === 200) {
                let order = response.data.reverse();
                const groupedOrders = Object.entries(order.reduce((result, order) => {
                    const date = new Date(order.order_date).toDateString();
                    if (!result[date]) {
                        result[date] = [];
                    }
                    result[date].push(order);
                    return result;
                }, {}));
                setOrders(groupedOrders);
                setLoading(false);
            } else {
                console.log("ERROR")
            }
        } catch (error) {
            toast.error("Error to get order History")
        }
    }

    const handleButAgain = async (productId) => {
        try {
            const response = await fetchApi({ url: API_ENDPOINTS.CART, method: 'POST', data: productId, customHeaders });
            if (response.status === 200) {
                fetchCart();
            }
        } catch (error) {
            console.log("Error To Fetch API");
        }
    }

    if (loading) {
        return (
            <div className="fixed inset-0 flex items-center justify-center">
                <div className="text-2xl sm:text-4xl md:text-5xl lg:text-6xl  text-blue-700">
                    <i className="fas fa-spinner fa-spin animate-spin"></i>
                </div>
            </div>
        )
    }
    return (
        orders.length === 0 ? (
            <h1 className='text-2xl font-bold'>Data is empty</h1>
        ) :
            (orders.map(([date, dateArray], index) => (
                <div key={index} className='w-full sm:w-10/12 mx-auto'>
                    <h2 className='text-3xl mt-3 font-semibold mx-5 text-shadow'>{date}</h2>
                    <div className='grid grid-cols-2 sm:block'>
                        {dateArray.map((dateArray, index) => (
                            <div key={index} className="m-2 py-4 border-b border-gray-200 flex flex-col sm:flex-row justify-between items-center">
                                <div className="block text-center sm:text-left sm:flex">
                                    <div className=" mb-3 sm:mb-0 w-40 sm:block mx-auto sm:h-40 flex-shrink-0 overflow-hidden rounded-md border">
                                        <img className="w-full h-full object-contain object-center"
                                            src={dateArray.order_item.prd_img}
                                            alt="Product" />
                                    </div>
                                    <div className="py-2 px-0 sm:py-6 sm:px-4">
                                        <p className="text-md sm:text-xl font-semibold">{dateArray.order_item.prd_name}</p>
                                        <p>₹ {dateArray.order_item.prd_price} / item</p>
                                        <p className="my-0 sm:mt-3 text-lg">Qty: {dateArray.orderitm_prd_qty}</p>
                                        <p className="text-lg sm:text-2xl font-semibold">₹ {dateArray.total_amt}</p>
                                    </div>
                                </div>
                                <div className="mt-0 sm:mt-4 sm:w-1/3 text-right">
                                    <button
                                        onClick={() => handleButAgain({ cartitm_fk_prd_id: dateArray.order_item._id, cartitm_prd_qty: 1 })}
                                        className="sm:w-auto bg-indigo-600 ms-auto hover:bg-indigo-700 cursor-pointer flex items-center justify-center rounded-md border border-transparent px-4 py-2 text-lg font-medium text-white shadow-sm">
                                        Buy Again
                                    </button>
                                </div>
                            </div>))}
                    </div>
                </div>
            )))
    )
}

export default Order;