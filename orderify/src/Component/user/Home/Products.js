import React, { useEffect, useState } from 'react';
import fetchApi from '../../../util/helper';
import { API_ENDPOINTS } from '../../../config/api';


function Products() {
    const [products, setProducts] = useState([]);
    const [order, setOrder] = useState([]);
    const token = localStorage.getItem('auth');
    const customHeaders = {
        'Auth': token,
    };

    const fetchData = async () => {
        try {
            const response = await fetchApi({ url: API_ENDPOINTS.PRODUCT, method: 'GET', customHeaders });
            setProducts(response.data);
        } catch (error) {
            console.log(error);
        }
    };

    useEffect(() => {
        fetchData();
    }, []);
    const addItem = (productId) => {
        let addProduct = products.find(item => item._id === productId);
        if (!order.some(item => item.id === productId)) {
            setOrder([...order, { id: productId, quantity: 1, name: addProduct.prd_name, price: addProduct.prd_price }]);
        }
    };
    const incrementQuantity = (productId) => {
        setOrder((pre) => {
            return pre.map(item =>
                item.id === productId
                    ? { ...item, quantity: item.quantity + 1 }
                    : item
            );
        });
    };
    const decrementQuantity = (productId) => {
        setOrder((pre) => {
            return pre.map(item =>
                item.id === productId
                    ? { ...item, quantity: Math.max(item.quantity - 1, 1) }
                    : item
            );
        });
    };
    const orderData = {
        orders: order,
    };
    const orderProduct = async (values) => {
        try {
            if (order.length > 0) {
                const response = await fetchApi({ url: API_ENDPOINTS.CART, method: 'POST', data: orderData, customHeaders });
                console.log(response);
            }
        } catch (error) {
            console.log("Error To Fetch API");
        }
    };
    useEffect(() => {
        orderProduct();
    }, [order])

    console.log(order)
    localStorage.setItem("orderItems", JSON.stringify(order));
    return (
        <div className="bg-white">
            <div className="mx-auto max-w-2xl px-4 py-16 sm:px-6 sm:py-24 lg:max-w-7xl lg:px-8">
                <div className="grid grid-cols-1 sm:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 2xl:grid-cols-7 gap-8">
                    {products.map((product) => (
                        <div key={product._id} className="group bg-white rounded p-2 hover:transform hover:scale-105 hover:shadow-lg transition-transform">
                            <div className="aspect-w-4 aspect-h-5 sm:aspect-w-3 sm:aspect-h-4 xl:aspect-w-4 xl:aspect-h-5">
                                <img
                                    src={`https://via.placeholder.com/100x100`}
                                    className="object-cover w-full h-full object-center group-hover:opacity-75"
                                />
                            </div>
                            <h2 className="mt-2 text-sm sm:text-sm text-gray-700">{product.prd_name}</h2>
                            <p className="mt-1 text-sm sm:text-base font-bold text-gray-900 p-1">₨ : ₹ {product.prd_price}</p>
                            <div className="flex border-2 border-blue-700 flex-col sm:flex-row items-center justify-center mt-2">
                                {order.some((item) => item.id === product._id) ? (
                                    <div className="flex items-center">
                                        <button
                                            id="decrementButton"
                                            className=" text-blue-700 border-r-2 border-blue-700 font-bold py-1 px-1 sm:py-2 sm:px-4  mb-1 sm:mb-0"
                                            onClick={() => decrementQuantity(product._id)}
                                        >
                                            -
                                        </button>
                                        <p id="counter" className="text-xl font-semibold mx-2 sm:mx-4">
                                            {order.find((item) => item.id === product._id).quantity}
                                        </p>
                                        <button
                                            id="incrementButton"
                                            className="text-blue-700 border-l-2 border-blue-700 font-bold py-1 px-1 sm:py-2 sm:px-4 "
                                            onClick={() => incrementQuantity(product._id)}
                                        >
                                            +
                                        </button>
                                    </div>
                                ) : (
                                    <button
                                        onClick={() => addItem(product._id)}
                                        className="text-blue-700  font-bold py-1 px-2 sm:py-2 sm:px-4 rounded-md"
                                    >
                                        Add Item
                                    </button>
                                )}
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
}

export default Products;


// const addPrice = (productId, price) => {
//     setOrder((pre) => {
//         return pre.map(item => item.id === productId ? { ...item, price: Number(price) } : item)
//     })
// }