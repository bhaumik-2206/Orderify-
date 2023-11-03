import React, { useContext, useEffect, useState } from 'react'
import fetchApi from '../../../util/helper';
import { API_ENDPOINTS } from '../../../config/api';
import dayjs from 'dayjs'
import { toast } from 'react-toastify';
import { CartDataContext } from '../../../context/CartContext';
import { groupBy } from 'lodash';
import { useNavigate } from 'react-router-dom'
import SkeletonForOrder from './SkeletonForOrder';

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
                toast.success("Order successfully added in cart");
            }
        } catch (error) {
            console.log("Error To Fetch API");
        }
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

    return (
        loading ?
            <SkeletonForOrder count={8} /> : Object.keys(orders).length === 0 ? <h1 className="text-center m-3 text-3xl text-blue-900">Data is Empty</h1>
                :
                <div className='relative w-full sm:w-10/12 mx-auto'>
                    {buyAgainOrder.length > 0 && <div>
                        <button
                            onClick={() => handleButAgain()}
                            className="absolute -top-2 right-0 sm:w-auto mx-auto mt-3 bg-indigo-600 sm:ms-auto hover:bg-indigo-700 cursor-pointer flex items-center justify-center rounded-md border border-transparent px-4 py-2 text-lg font-medium text-white shadow-sm"
                        >Order</button>
                    </div>}
                    {Object.keys(orders).map((item, index) => (
                        <div key={index}>
                            <div className='block text-center sm:h-12 sm:flex justify-between items-center mt-3'>
                                <div className="flex items-center">
                                    {/* {buyAgainOrder.length > 0 && <input className="h-4 w-4" type="checkbox" />} */}
                                    {/* <h2 className={`${buyAgainOrder.length > 0 ? "ms-4 " : "ms-8"} text-3xl font-semibold text-shadow`}>{item}</h2> */}
                                    <h2 className={`ms-8 text-3xl font-semibold text-shadow`}>{item}</h2>
                                </div>
                                {/* {buyAgainOrder.length > 0 && buyAgainOrder.findIndex(ele => ele.date === item) !== -1 && <div>
                            <button
                                onClick={() => handleButAgain()}
                                className="sm:w-auto mx-auto mt-3 bg-indigo-600 sm:ms-auto hover:bg-indigo-700 cursor-pointer flex items-center justify-center rounded-md border border-transparent px-4 py-2 text-lg font-medium text-white shadow-sm"
                            >Order</button>
                        </div>} */}
                            </div>
                            <div className='grid grid-cols-2'>
                                {orders[item].map((dateArray, index) => (
                                    <div onClick={() => dateArray.product_details.prd_is_visible && handleCheckBoxChange(dateArray.product_details._id, dateArray.prd_total_qty, item)} key={index}
                                        className={`${buyAgainOrder.find(ele => ele.cartitm_fk_prd_id === dateArray.product_details._id && ele.date === item) ? "bg-green-100 border border-green-700" : ""} ${!dateArray.product_details.prd_is_visible && "bg-gray-200 text-gray-600 border"} m-2 py-4 cursor-pointer border-b border-gray-200 flex flex-col sm:flex-row justify-between items-center`}>
                                        <div className="block text-center sm:text-left sm:flex">
                                            <div className=" mb-3 sm:mb-0 w-40 sm:block mx-auto sm:h-40 flex-shrink-0 overflow-hidden rounded-md border">
                                                <img className={`${!dateArray.product_details.prd_is_visible && "opacity-80"} w-full h-full object-contain object-center`}
                                                    src={dateArray.product_details.prd_img}
                                                    alt="Product" />
                                            </div>
                                            <div className=" px-0 sm:px-4">
                                                <p className="text-md sm:text-xl font-semibold">{dateArray.product_details.prd_name}</p>
                                                <p>₹ {dateArray.product_details.prd_price} / item</p>
                                                <p className="my-0 sm:mt-3 text-lg">Qty: {dateArray.prd_total_qty}</p>
                                                <p className="text-lg sm:text-2xl font-semibold">₹ {dateArray.prd_total_amount}</p>
                                                {!dateArray.product_details.prd_is_visible && <p>Item Not Available</p>}
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