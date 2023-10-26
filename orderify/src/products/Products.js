import React, { useEffect, useState } from 'react';
import fetchApi from '../util/helper';
import { API_ENDPOINTS } from '../config/api';

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
            setOrder([...order, { id: productId, quantity: 1, name: addProduct.prd_name, price: addProduct.prd_price[0] }]);
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

    const addPrice = (productId, price) => {
        setOrder((pre) => {
            return pre.map(item => item.id === productId ? { ...item, price: Number(price) } : item)
        })
    }
    console.log(order)
    localStorage.setItem("orderItems", JSON.stringify(order));
    return (
        <div className="bg-white">
            <div className="mx-auto max-w-2xl px-4 py-16 sm:px-6 sm:py-24 lg:max-w-7xl lg:px-8">
                <h2 className="sr-only">Products</h2>

                <div className="grid grid-cols-1 gap-x-6 gap-y-10 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 xl:gap-x-8">
                    {products.map((product) => (
                        <div key={product._id} className="group">
                            <div className="aspect-h-1 aspect-w-1 w-full overflow-hidden rounded-lg bg-gray-300 xl:aspect-h-8 xl:aspect-w-7">
                                <img
                                    src={`https://source.unsplash.com/150x100/?${product.prd_name}`}
                                    alt={product.imageAlt}
                                    className="h-full w-full object-cover object-center group-hover:opacity-75"
                                />
                            </div>
                            <h2 className="mt-4 text-lg text-gray-700">{product.prd_name}</h2>
                            <p className="mt-1 text-xl font-bold text-gray-900">₨:₹{product.prd_price}</p>
                        </div>
                    ))}
                </div>
            </div>
        </div>

        // <ul className="divide-y divide-gray-100">
        //     {products.map((product) => (
        //         <li key={product._id} className="flex justify-between gap-x-6 py-5 p-3">
        //             <div className="flex min-w-0 gap-x-4">
        //                 <p className="text-xl font-semibold leading-6 text-gray-900">{product.prd_name}</p>
        //             </div>
        //             <div className="block shrink-0 sm:flex sm:flex-col sm:items-center">
        //                 <div className='flex items-center'>
        //                     <p className="leading-6 text-gray-900 text-xl text-center p-1">Price</p>
        //                     {/* <select name="price" id="" className='border-2 rounded-md p-1' onChange={(e) => addPrice(product._id, e.target.value)}>
        //                         {product.prd_price.map((price, index) => (
        //                             <option key={index} value={price} >{price}</option>
        //                         ))}
        //                     </select> */}
        //                 </div>
        //             </div>
        //             <div className="block shrink-0 sm:flex sm:flex-col sm:items-end">
        //                 <div className="flex items-center justify-center bg-gray-300 rounded-md p-1">
        //                     {order.some(item => item.id === product._id) ? (
        //                         <>
        //                             <button id="incrementButton" className="bg-gray-300 hover:bg-gray-700 text-white font-bold py-2 px-4 rounded-md mr-4"
        //                                 onClick={() => incrementQuantity(product._id)}>+</button>
        //                             <p id="counter" className="text-xl font-semibold">{order.find(item => item.id === product._id).quantity}</p>
        //                             <button id="decrementButton" className="bg-gray-300 hover:bg-gray-700 text-white font-bold py-2 px-4 rounded-md ml-4"
        //                                 onClick={() => decrementQuantity(product._id)}>-</button>
        //                         </>
        //                     ) : (
        //                         <button onClick={() => addItem(product._id)}>Add Item</button>
        //                     )}
        //                 </div>
        //             </div>
        //         </li>
        //     ))}
        // </ul>
    );
}

export default Products;


