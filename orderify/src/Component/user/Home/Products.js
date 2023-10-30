import React, { useContext, useEffect, useState } from 'react';
import fetchApi from '../../../util/helper';
import { API_ENDPOINTS } from '../../../config/api';
import { toast } from 'react-toastify';
import { CartDataContext } from '../../../context/CartContext';


function Products() {
    const [loadingStates, setLoadingStates] = useState({});
    const [products, setProducts] = useState([]);
    // const [cartData, setCartData] = useState([]);
    const { cartData, fetchCart } = useContext(CartDataContext)
    const token = localStorage.getItem('auth');
    const customHeaders = {
        'Auth': token,
    };
    // console.log(cartData)
    useEffect(() => {
        fetchData();
        fetchCart();
    }, []);
    // console.log(products)
    const fetchData = async () => {
        try {
            const response = await fetchApi({ url: API_ENDPOINTS.PRODUCT, method: 'GET', customHeaders });
            setProducts(response.data);
        } catch (error) {
            console.log(error);
        }
    };
    // const fetchCart = async () => {
    //     try {
    //         const response = await fetchApi({ url: API_ENDPOINTS.CART, method: 'GET', customHeaders });
    //         setCartData(response.data.cart_items);
    //     } catch (error) {
    //         console.log(error);
    //     }
    // };
    const orderProduct = async (itemData) => {
        try {
            const response = await fetchApi({ url: API_ENDPOINTS.CART, method: 'POST', data: itemData, customHeaders });
            if (response.status === 200) {
                fetchCart();
            }
            if (response.status === 400) {
                toast.warn(response.message, {
                    position: "bottom-center",
                    autoClose: 1000,
                    theme: "dark",
                });
            }
        } catch (error) {
            console.log("Error To Fetch API");
        } finally {
            toggleLoadingState(itemData.cartitm_fk_prd_id, false)
        }
    };

    const addItem = (productId) => {
        const updatedOrder = { cartitm_fk_prd_id: productId, cartitm_prd_qty: 1 };
        orderProduct(updatedOrder);
    };

    const incrementQuantity = (productId) => {

        const currentQuantity = cartData.find((item) => item.cartitm_fk_prd_id._id === productId).cartitm_prd_qty;
        const updatedOrder = { cartitm_fk_prd_id: productId, cartitm_prd_qty: currentQuantity + 1 };
        orderProduct(updatedOrder);
    };

    const decrementQuantity = (productId) => {
        
        const currentQuantity = cartData.find((item) => item.cartitm_fk_prd_id._id === productId).cartitm_prd_qty;
        const updatedOrder = { cartitm_fk_prd_id: productId, cartitm_prd_qty: currentQuantity - 1 };
        
        orderProduct(updatedOrder);
    };


    const toggleLoadingState = (productId, isLoading) => {
        setLoadingStates(prevState => ({
            ...prevState,
            [productId]: isLoading,
        }));

    };

    
    if (products.length === 0) {
        return (
            <div className="absolute inset-0 flex items-center justify-center">
                <div className="text-5xl font-bold text-blue-700">
                    <i className="fas fa-spinner fa-spin animate-spin"></i>
                    Loading...
                </div>
            </div>


        )
    }
    return (
        <div className="bg-white">
            <div className="mx-auto max-w-screen-xl px-4 py-8 sm:px-6 lg:px-8">
                <div className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-6">
                    {products.map((product) => (
                        <div key={product._id} className="flex flex-col justify-between bg-white rounded-lg overflow-hidden shadow-lg transition-transform">
                            <div className="relative aspect-w-16 aspect-h-9">
                                <img src={product.prd_img} className="object-cover h-full w-full " alt="Product Image" />
                            </div>
                            <div className="px-4">
                                <h2 className="text-lg font-semibold text-gray-800 ">{product.prd_name}</h2>
                                <p className="mt-1 text-lg font-bold text-gray-900">Price: ₹ {product.prd_price}</p>
                            </div>
                            <div className='px-4 pb-3'>
                                <div className="mt-2 border-2 border-blue-700 rounded-md">
                                    {cartData.some((item) => item.cartitm_fk_prd_id._id === product._id  ) ? (
                                        <div className="flex justify-between items-center space-x-2">
                                            <button
                                                id="decrementButton"
                                                className="w-1/3 block bg-slate-50 hover:bg-slate-100 text-blue-700 border-r-2 border-blue-700 font-bold py-1 px-1 sm:py-2 sm:px-4 rounded-l-md"
                                                onClick={() => { decrementQuantity(product._id); toggleLoadingState(product._id, true); }}
                                                disabled={loadingStates[product._id]}
                                            >
                                                -
                                            </button>
                                            <div id="counter" className="text-xl font-semibold">
                                                {!loadingStates[product._id] ? (
                                                    <p className='w-1/3 block text-center text-xl font-semibold mx-2 sm:mx-4'>{cartData.find((item) => item.cartitm_fk_prd_id._id === product._id).cartitm_prd_qty}</p>
                                                ) : (
                                                    <div className="animate-spin"><i className="fa-solid fa-spinner"></i></div>
                                                )}
                                            </div>
                                            <button
                                                id="incrementButton"
                                                className="w-1/3 block bg-slate-50 hover:bg-slate-100 text-blue-700 border-l-2 border-blue-700 font-bold py-1 px-1 sm:py-2 sm:px-4 rounded-r-md"
                                                onClick={() => { incrementQuantity(product._id); toggleLoadingState(product._id, true); }}
                                                disabled={loadingStates[product._id]}
                                            >
                                                +
                                            </button>
                                        </div>
                                    ) : (
                                        <div>
                                            <button
                                                onClick={() => { addItem(product._id); toggleLoadingState(product._id, true); }}
                                                className="text-blue-700 text-center block w-full font-bold py-1 px-2 sm:py-2 sm:px-4 rounded-md hover:bg-slate-100"
                                                disabled={loadingStates[product._id]}
                                            >
                                                <span className="text-base">
                                                    {!loadingStates[product._id] ? "Add Item" : <div className="animate-spin text-blue-700"><i className="fa-solid fa-spinner"></i></div>}
                                                </span>
                                            </button>
                                        </div>
                                    )}
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </div>

    );
}

export default Products;
