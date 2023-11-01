import React, { useContext, useEffect, useState } from 'react';
import fetchApi from '../../../util/helper';
import { API_ENDPOINTS } from '../../../config/api';
import { toast } from 'react-toastify';
import { CartDataContext } from '../../../context/CartContext';
import ReactPaginate from 'react-paginate';

function Products() {
    const [loadingStates, setLoadingStates] = useState({});
    const [products, setProducts] = useState([]);
    const { cartData, setCartData, changeQuantityContext } = useContext(CartDataContext)
    const [endOffset, setEndOffset] = useState(0);
    const [loading, setLoading] = useState(true)
    const itemsPerPage = 3;
    const handlePageClick = (event) => {
        console.log(event)
        const pageObj = {
            limit: itemsPerPage,
            page: Number(event.selected + 1)
        }
        fetchData(pageObj);
        setLoading(true)
    };

    useEffect(() => {
        fetchData({
            limit: itemsPerPage,
            page: 1
        });
    }, []);

    const fetchData = async (pageObj) => {
        try {
            const response = await fetchApi({
                url: API_ENDPOINTS.PRODUCT, method: 'POST', isAuthRequired: true, data: pageObj
            });
            setProducts(response.data.products);
            setEndOffset(response.data.total_page)
        } catch (error) {
            console.log(error);
        } finally {
            // setIsPageChangingNow(false)
            setLoading(false)
        }
    };
    const orderProduct = async (itemData) => {
        try {
            const response = await fetchApi({ url: API_ENDPOINTS.CART, method: 'POST', data: itemData, isAuthRequired: true });
            if (response.status === 200) {
                // await fetchCart();
                setCartData(response.data.cart_items);
            }
            if (response.status === 400) {
                toast.error("Maxinum Quantity");
            }
        } catch (error) {
            console.log("Error To Fetch API");
        }
        toggleLoadingState(itemData.cartitm_fk_prd_id, false)
    };

    const addItem = (productId) => {
        const updatedOrder = { cartitm_fk_prd_id: productId, cartitm_prd_qty: 1 };
        orderProduct(updatedOrder);
    };


    const changeQuantity = async (productId, operation) => {
        toggleLoadingState(productId, true);
        await changeQuantityContext(productId, operation)
        toggleLoadingState(productId, false);
    }

    // const incrementQuantity = (productId) => {
    //     const currentQuantity = cartData.find((item) => item.cartitm_fk_prd_id._id === productId).cartitm_prd_qty;
    //     const updatedOrder = { cartitm_fk_prd_id: productId, cartitm_prd_qty: currentQuantity + 1 };
    //     orderProduct(updatedOrder);
    // };

    // const decrementQuantity = (productId) => {

    //     const currentQuantity = cartData.find((item) => item.cartitm_fk_prd_id._id === productId).cartitm_prd_qty;
    //     const updatedOrder = { cartitm_fk_prd_id: productId, cartitm_prd_qty: currentQuantity - 1 };

    //     orderProduct(updatedOrder);
    // };


    const toggleLoadingState = (productId, isLoading) => {
        setLoadingStates(prevState => ({
            ...prevState,
            [productId]: isLoading,
        }));
    };

    if (products.length === 0) {
        return (
            <div className="absolute inset-0 flex items-center justify-center">
                <div className="text-2xl sm:text-4xl md:text-5xl lg:text-6xl  text-blue-700">
                    <i className="fas fa-spinner fa-spin animate-spin"></i>
                </div>
            </div>
        )
    }
    return (

        < div className="bg-white" >
            {
                loading ? <div className="absolute inset-0 flex items-center justify-center">
                    <div className="text-2xl sm:text-4xl md:text-5xl lg:text-6xl  text-blue-700">
                        <i className="fas fa-spinner fa-spin animate-spin"></i>
                    </div>
                </div> :
                    <div className="mx-auto max-w-screen-xl px-4 py-8 sm:px-6 lg:px-8">
                        <div className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-6">
                            {products.map((product) => (
                                <div key={product._id} className="flex flex-col justify-between bg-white rounded-lg overflow-hidden shadow-lg transition-transform">
                                    <div>
                                        <div className="relative aspect-w-16 aspect-h-9">
                                            <img src={product.prd_img} className="object-cover h-full w-full " alt="Product Image" />
                                        </div>
                                        <div className="px-4 pt-0.5">
                                            <h2 className="text-lg font-semibold text-gray-800 ">{product.prd_name}</h2>
                                            <p className="mt-0.5 text-lg font-bold text-gray-900">Price: ₹ {product.prd_price}</p>
                                        </div>
                                    </div>
                                    <div className='px-4 pb-3'>
                                        <div className="mt-2 border-2 border-blue-700 rounded-md">
                                            {cartData.some((item) => item.cartitm_fk_prd_id._id === product._id) ? (
                                                <div className="flex justify-between items-center space-x-2">
                                                    <button
                                                        id="decrementButton"
                                                        className="w-1/3 block bg-slate-50 hover:bg-slate-100 text-blue-700 border-r-2 border-blue-700 font-bold py-1 px-1 sm:py-2 sm:px-4 rounded-l-md"
                                                        onClick={() => { changeQuantity(product._id, false) }}
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
                                                        onClick={() => { changeQuantity(product._id, true) }}
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
            }
            <div className={`${loading ? "hidden" : "block"}`}>
                {/ pagination /}
                <div className='border-t border-gray-200 bg-white px-4 py-3 sm:px-6 w-fit m-auto' >
                    <ReactPaginate
                        breakLabel="..."
                        nextLabel="next >"
                        onPageChange={handlePageClick}
                        pageRangeDisplayed={3}
                        pageCount={endOffset}
                        previousLabel="< previous"
                        renderOnZeroPageCount={null}
                        pageLinkClassName="pag-num p-2"
                        previousLinkClassName="page-num p-2"
                        activeClassName="bg-red-200 p-2"
                        previousClassName="relative ml-3 inline-flex items-center rounded-md border border-gray-300 bg-white p-0 text-sm font-medium text-gray-700 "
                        nextClassName='relative ml-3 inline-flex items-center rounded-md border border-gray-300 bg-white px-2 py-1 text-sm font-medium text-gray-700 '
                        breakClassName='relative ml-3 inline-flex items-center rounded-md border border-gray-300 bg-white px-4 py-2 text-sm font-medium text-gray-700 '
                        className="isolate inline-flex -space-x-px rounded-md shadow-sm"
                        pageClassName="relative inline-flex items-center px-4 py-2 text-sm font-semibold text-gray-900 ring-1 ring-inset ring-gray-300  focus:z-20 focus:outline-offset-0"
                    />
                </div>
            </div>
        </div >

    );
}

export default Products;
