import React, { useContext, useEffect, useState } from 'react'
import fetchApi from '../../../util/helper';
import { API_ENDPOINTS } from '../../../config/api';
import dayjs from 'dayjs'
import { toast } from 'react-toastify';
import { CartDataContext } from '../../../context/CartContext';
import { groupBy } from 'lodash';
import { useNavigate } from 'react-router-dom'

const Order = () => {
    const [orders, setOrders] = useState([]);
    const [buyAgainOrder, setBuyAgainOrder] = useState([]);
    const [loading, setLoading] = useState(false);
    const { fetchCart, cartData } = useContext(CartDataContext);
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
                const groupedOrders = groupBy(order, (element) => new Date(element.createdAt).toDateString());
                setOrders(groupedOrders);
                setLoading(false);
            } else {
                toast.error('ERROR - Invalid status code');
            }
            if (response.message === "jwt expired") {
                navigate("/login");
            }
        } catch (error) {
            toast.error('Error getting order history');
        }
    }

    const handleButAgain = async () => {
        try {
            const response = await fetchApi({ url: API_ENDPOINTS.CART, method: 'POST', data: { cart_items: buyAgainOrder.map(ele => ({ cartitm_fk_prd_id: ele.cartitm_fk_prd_id, cartitm_prd_qty: ele.cartitm_prd_qty })) }, isAuthRequired: true });
            if (response.status === 200) {
                fetchCart();
                setBuyAgainOrder([]);
            }
        } catch (error) {
            console.log("Error To Fetch API");
        }
    }

    const handleCheckBoxChange = (e, productId, quantity, item) => {
        let findOrder = orders[item].find(ele => ele.product_details._id === productId)
        console.log(findOrder)
        setBuyAgainOrder(pre => e.target.checked ?
            [...pre, { cartitm_fk_prd_id: productId, cartitm_prd_qty: quantity > 5 ? 5 : quantity, date: item }]
            : pre.filter(ele => ele.cartitm_fk_prd_id !== productId)
        )
        console.log(buyAgainOrder)
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
        Object.keys(orders).length === 0 ? (
            <h1 className='text-2xl font-bold'>Data is empty</h1>
        ) :
            (Object.keys(orders).map((item, index) => (
                <div key={index} className='w-full sm:w-10/12 mx-auto'>
                    <div className='flex justify-between items-center mt-3'>
                        <div className="flex items-center">
                            {/* {buyAgainOrder.length > 0 && <input className="h-4 w-4" type="checkbox" />} */}
                            {/* <h2 className={`${buyAgainOrder.length > 0 ? "ms-4 " : "ms-8"} text-3xl font-semibold text-shadow`}>{item}</h2> */}
                            <h2 className={`ms-8 text-3xl font-semibold text-shadow`}>{item}</h2>
                        </div>
                        {buyAgainOrder.length > 0 && buyAgainOrder.findIndex(ele => ele.date === item) !== -1 && <div>
                            <button
                                onClick={() => handleButAgain()}
                                className="sm:w-auto bg-indigo-600 ms-auto hover:bg-indigo-700 cursor-pointer flex items-center justify-center rounded-md border border-transparent px-4 py-2 text-lg font-medium text-white shadow-sm"
                            >Order</button>
                        </div>}
                    </div>
                    <div className='grid grid-cols-2 sm:block'>
                        {orders[item].map((dateArray, index) => (
                            <div key={index} className="m-2 py-4 border-b border-gray-200 flex flex-col sm:flex-row justify-between items-center">
                                <div className="block text-center sm:text-left sm:flex">
                                    <div className="w-7 my-auto mx-auto">
                                        <input className="h-4 w-4" type="checkbox" checked={buyAgainOrder.findIndex(ele => ele.cartitm_fk_prd_id === dateArray.product_details._id && ele.date === item) !== -1}
                                            onChange={(e) => handleCheckBoxChange(e, dateArray.product_details._id, dateArray.prd_total_qty, item)}
                                        />
                                    </div>
                                    <div className=" mb-3 sm:mb-0 w-40 sm:block mx-auto sm:h-40 flex-shrink-0 overflow-hidden rounded-md border">
                                        <img className="w-full h-full object-contain object-center"
                                            src={dateArray.product_details.prd_img}
                                            alt="Product" />
                                    </div>
                                    <div className=" px-0 sm:px-4">
                                        <p className="text-md sm:text-xl font-semibold">{dateArray.product_details.prd_name}</p>
                                        <p>₹ {dateArray.product_details.prd_price} / item</p>
                                        <p className="my-0 sm:mt-3 text-lg">Qty: {dateArray.prd_total_qty}</p>
                                        <p className="text-lg sm:text-2xl font-semibold">₹ {dateArray.prd_total_amount}</p>
                                    </div>
                                </div>
                                {/* <div className="mt-0 sm:mt-4 sm:w-1/3 text-right">
                                    <button
                                        onClick={() => handleButAgain({ cartitm_fk_prd_id: dateArray.product_details._id, cartitm_prd_qty: 1 })}
                                        className="sm:w-auto bg-indigo-600 ms-auto hover:bg-indigo-700 cursor-pointer flex items-center justify-center rounded-md border border-transparent px-4 py-2 text-lg font-medium text-white shadow-sm">
                                        Buy Again
                                    </button>
                                </div> */}
                            </div>))}
                    </div>
                </div>
            )))
    )
}

export default Order;