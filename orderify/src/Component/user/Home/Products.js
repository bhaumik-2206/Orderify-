import React, { useContext, useEffect, useState, Fragment, useRef } from "react";
import fetchApi from "../../../util/helper";
import { API_ENDPOINTS } from "../../../config/api";
import { toast } from "react-toastify";
import { CartDataContext } from "../../../context/CartContext";
import PaginationComponent from "./PaginationComponent";
import { useNavigate } from "react-router-dom";
import "react-loading-skeleton/dist/skeleton.css";
import ProductModel from './ProductModel'
import ConfirmationModal from "../../common/ConfirmationModal";
import { Disclosure, Menu, Transition } from '@headlessui/react'
import Skeleton from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";

function Products() {
    // UI-related state
    const [deleteConfirm, setDeleteConfirm] = useState(false);
    const [isAddProductModal, setIsAddProductModal] = useState(false);
    const [updateProduct, setUpdateProduct] = useState(null);
    const [mode, setMode] = useState("add");
    const [id, setId] = useState(null)

    // Loading state
    const [loading, setLoading] = useState(true);

    // Search state
    const [search, setSearch] = useState("");

    // Product data state
    const { cartData, setCartData, changeQuantityContext, setTotalAmount } = useContext(CartDataContext);
    const [products, setProducts] = useState([]);
    const [selectedProducts, setSelectedProducts] = useState([]);
    const [loadingStates, setLoadingStates] = useState({});

    // Pagination state
    const [data, setData] = useState(0);
    const [itemOffset, setItemOffset] = useState(0);
    const currentPageRef = useRef(1);
    const itemsPerPage = 5;
    const totalPerPage = itemsPerPage + itemOffset;

    // User data
    const userData = JSON.parse(localStorage.getItem("userData"));

    // Navigation
    const navigate = useNavigate();


    const handlePageClick = (event) => {
        const newOffset =
            (event.selected * itemsPerPage) % data.total_products;
        // console.log(newOffset);
        setItemOffset(newOffset);
        const pageObj = search ?   {
            limit: itemsPerPage,
            page: Number(event.selected + 1),
            search
        } : {
            limit: itemsPerPage,
            page: Number(event.selected + 1),
        }
        fetchData(pageObj);
        currentPageRef.current = event.selected + 1;
        setLoading(true);
    };
    const openProductModal = (mode, product) => {
        console.log(product)
        setUpdateProduct(product)
        setIsAddProductModal(true);
        setMode(mode);
    };
    useEffect(() => {
        let timer
        if (search) {
            timer = setTimeout(() => {
                handleSearch();
            }, 500);
        } else {
            fetchData({
                limit: itemsPerPage,
                page: currentPageRef.current,
            });

        }
        return () => clearTimeout(timer);
    }, [search.trim()]);

    const fetchData = async (pageObj) => {
        try {
            const response = await fetchApi({
                url: API_ENDPOINTS.PRODUCT,
                method: "POST",
                isAuthRequired: true,
                data: pageObj,
            });
            if (response.status === 200) {
                setProducts(response.data.products);
                setData(response.data);
                setItemOffset(itemsPerPage * currentPageRef.current - 5)
            } else {
                setProducts([])
            }
            if (response.message === "jwt expired") {
                navigate("/login");
            }
        } catch (error) {
            console.log(error);
        } finally {
            setLoading(false);
        }
    };
    const orderProduct = async (itemData, id) => {
        try {
            const response = await fetchApi({
                url: API_ENDPOINTS.CART,
                method: "POST",
                data: itemData,
                isAuthRequired: true,
            });
            if (response.status === 200) {
                let index = products.findIndex((p) => p._id === id);
                setCartData((pre) => [
                    ...pre,
                    {
                        cartitm_fk_prd_id: products[index],
                        cartitm_prd_qty: 1,
                    },
                ]);
                setTotalAmount((pre) => pre + products[index].prd_price);
            }
            if (response.message === "jwt expired") {
                navigate("/login");
            }
            if (response.status === 400) {
                toast.error("Maxinum Quantity");
            }
        } catch (error) {
            console.log("Error To Fetch API");
        }
        toggleLoadingState(id, false);
    };
    const addItem = (productId) => {
        const updatedOrder = {
            cart_items: [{ cartitm_fk_prd_id: productId, cartitm_prd_qty: 1 }],
        };
        orderProduct(updatedOrder, productId);
    };

    const changeQuantity = async (productId, operation) => {
        toggleLoadingState(productId, true);
        await changeQuantityContext(productId, operation);
        toggleLoadingState(productId, false);
    };

    const toggleLoadingState = (productId, isLoading) => {
        setLoadingStates((prevState) => ({
            ...prevState,
            [productId]: isLoading,
        }));
    };

    const handleSearch = async () => {
        let Objdata= {
                         limit: itemsPerPage,
                         page: 1,
                         search
            }
        fetchData(Objdata)
        // try {
        //     let response = await fetchApi({
        //         url: API_ENDPOINTS.PRODUCT, method: "POST", isAuthRequired: true,
        //         data: {
        //             limit: itemsPerPage,
        //             page: 1,
        //             search
        //         }
        //     })
        //     if (response.status === 200) {
        //         setProducts(response.data.products);
        //         setData(response.data);
        //         setItemOffset(0)
        //     }
        //     console.log(response)
        // } catch (error) {
        //     console.log("ERROR: " + error)
        // }
    }
    const deleteSelectedProducts = async (id) => {
        try {
            const response = await fetchApi({
                url: API_ENDPOINTS.PRODUCT_ADD,
                method: "DELETE",
                isAuthRequired: true,
                data: { prd_ids: id ? [id] : selectedProducts }
            });
            if (response.status === 200) {
                await fetchData({
                    limit: 5,
                    page: currentPageRef.current,
                });
                toast.info("Deleted selected products");
                setSelectedProducts([]);
               
            }
        } catch (error) {
            console.log(error);
        }finally{
            setSearch("");
        }
    };

    const toggleProductSelection = (productId) => {
        setSelectedProducts((prevSelected) => {
            if (prevSelected.includes(productId)) {
                return prevSelected.filter((id) => id !== productId);
            } else {
                return [...prevSelected, productId];
            }
        });
    };

    return (
        <div className="bg-white">
            <div className="mx-auto max-w-screen-xl sm:px-6 lg:px-8">
                <div className="flex items-center justify-center mb-2 sm:mb-3 w-72 sm:w-1/2 mx-3 sm:mx-auto relative border border-black rounded-lg my-2 sm:my-5 ">
                    <label htmlFor="search" className="bg-black cursor-pointer border-black border text-white py-2 px-4 rounded-l-lg">
                        <i className="fas fa-search"></i>
                    </label>
                    <input type="text" id="search"
                        value={search}
                        onChange={(e) => setSearch(e.target.value)}
                        className="w-full py-2 px-4 text-black bg-white border border-black rounded-r-lg focus:outline-none focus:ring focus:border-blue-300"
                        placeholder="Search..." />
                </div>

                {userData.user_role === "admin" && <div className="flex px-2 justify-between items-center ">
                    <div>
                        {selectedProducts.length > 0 &&
                            <button
                                onClick={() => setDeleteConfirm(true)}
                                disabled={selectedProducts.length === 0}
                                className={` text-red-600 text-center sm:text-lg block w-full text-xs font-bold py-2 px-2 sm:py-2 sm:px-4 rounded-md border-2 border-red-500 cursor-pointer hover:bg-red-50 hover:text-white${selectedProducts.length === 0 ? "hidden" : "block"
                                    }`}
                            >
                                Delete Selected Products
                            </button>
                        }
                    </div>
                    <div>
                        <button className="border-2 text-blue-700 sm:text-lg border-blue-700 hover:bg-gray-100 p-2 rounded-md m-1 text-xs font-bold  text-center"
                            onClick={() => { openProductModal("add") }}
                        >
                            <i className="fa-solid fa-plus"></i> Add Proucts</button>

                    </div>
                </div>}
            </div>
            {loading ? (
                <div className=" mx-auto max-w-screen-xl p-3 gap-2 sm:gap-6 sm:py-8 sm:px-4 lg:px-8">
                    <div className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-2 sm:gap-6">
                        {Array(itemsPerPage).fill(0).map((_, index) => (
                            <Skeleton key={index} className="w-36 h-64 sm:h-96" />
                        ))
                        }
                    </div>
                </div>
            ) : (
                <div className="mx-auto max-w-screen-xl p-3  sm:py-8 sm:px-4 lg:px-8">
                    <ProductModel
                        open={isAddProductModal}
                        setOpen={setIsAddProductModal}
                        mode={mode}
                        fetchData={fetchData}
                        updateProduct={updateProduct}
                        currentPageRef={currentPageRef}
                        setSearch={setSearch}
                    />
                    {(products.length !== 0) ? <div className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-2 sm:gap-6">
                        {products.map((product) => (
                            <div
                                key={product._id}
                                className={`flex relative flex-col pb-2  justify-between rounded-lg overflow-hidden shadow-lg transition-transform ${selectedProducts.includes(product._id) ? "border-2 border-blue-600" : "border-2"
                                    } ${!product.prd_is_visible ? "bg-gray-300" : "bg-white"}`} >
                                <div >
                                    <div
                                        // onClick={ }
                                        className="relative w-34 h-34 sm:w-60 sm:h-60 mx-auto">
                                        <img
                                            src={
                                                product.prd_img
                                                    ? product.prd_img
                                                    : "images/download.png"
                                            }
                                            className={` ${!product.prd_is_visible ? "opacity-75" : ""} object-contain h-full w-full block mx-auto`}
                                            alt="Product Image"
                                        />
                                        {/* {!product.prd_is_visible && <p className="absolute bottom-0 px-3 bg-gray-200 bg-opacity-40">This product is not visible in user products</p>} */}
                                    </div>
                                    <div className={`px-4 pt-0.5`}>
                                        <h2 className="text-sm pb-1 sm:text-lg font-semibold text-gray-800  ">
                                            {product.prd_name}
                                        </h2>
                                        <p className="mt-0.5 text-xs sm:text-lg font-bold text-gray-900">
                                            Price: ₹ {product.prd_price}
                                        </p>
                                    </div>
                                </div>
                                {userData.user_role === "user" ? (<div className="px-4 pb-3">
                                    <div className="mt-2 border-2 border-blue-700 rounded-md">
                                        {cartData.some(
                                            (item) => item.cartitm_fk_prd_id._id === product._id
                                        ) ? (
                                            <div className="flex justify-between items-center space-x-2">
                                                <button
                                                    id="decrementButton"
                                                    className="w-1/3 block bg-slate-50 hover:bg-slate-100 text-blue-700 border-r-2 border-blue-700 font-bold py-1 px-1 sm:py-2 sm:px-4 rounded-l-md"
                                                    onClick={() => {
                                                        changeQuantity(product._id, false);
                                                    }}
                                                    disabled={loadingStates[product._id]}
                                                >
                                                    -
                                                </button>
                                                <div id="counter" className="text-xl font-semibold">
                                                    {!loadingStates[product._id] ? (
                                                        <p className="w-1/3 block text-center text-xl font-semibold mx-2 sm:mx-4">
                                                            {cartData.find(
                                                                (item) =>
                                                                    item.cartitm_fk_prd_id._id === product._id
                                                            ).cartitm_prd_qty}
                                                        </p>
                                                    ) : (
                                                        <div className="animate-spin">
                                                            <i className="fa-solid fa-spinner"></i>
                                                        </div>
                                                    )}
                                                </div>
                                                <button
                                                    id="incrementButton"
                                                    className="w-1/3 block bg-slate-50 hover:bg-slate-100 text-blue-700 border-l-2 border-blue-700 font-bold py-1 px-1 sm:py-2 sm:px-4 rounded-r-md"
                                                    onClick={() => {
                                                        changeQuantity(product._id, true);
                                                    }}
                                                    disabled={loadingStates[product._id]}
                                                >
                                                    +
                                                </button>
                                            </div>
                                        ) : (
                                            <div>
                                                <button
                                                    onClick={() => {
                                                        addItem(product._id);
                                                        toggleLoadingState(product._id, true);
                                                    }}
                                                    className="text-blue-700 text-center block w-full font-bold py-1 px-2 sm:py-2 sm:px-4 rounded-md hover:bg-slate-100"
                                                    disabled={loadingStates[product._id]}
                                                >
                                                    <span className="text-base">
                                                        {!loadingStates[product._id] ? (
                                                            "Add Item"
                                                        ) : (
                                                            <div className="animate-spin text-blue-700">
                                                                <i className="fa-solid fa-spinner"></i>
                                                            </div>
                                                        )}
                                                    </span>
                                                </button>
                                            </div>
                                        )}
                                    </div>
                                </div>) : (
                                    <div className=" absolute top-0 right-0 flex justify-between w-full px-2">
                                        <div className="text-center cursor-pointer  flex items-center">
                                            {product.prd_is_visible && <input
                                                type="checkbox"
                                                className="w-3 sm:w-4 h-3 sm:h-4 cursor-pointer"
                                                checked={selectedProducts.includes(product._id)}
                                                onChange={() => toggleProductSelection(product._id)}
                                            />}
                                        </div>
                                        <Menu as="div" className=" ml-3">
                                            <div>
                                                <Menu.Button className="relative  flex rounded-fulltext-sm focus:outline-none focus:ring-2 m-1 bg-blue-100 hover:bg-gray-300 bg-opacity-60 px-1 sm:px-3 rounded-lg py-1 sm:py-2">
                                                    <i className="fa-solid fa-ellipsis-vertical w-3"></i>
                                                </Menu.Button>
                                            </div>
                                            <Transition
                                                as={Fragment}
                                            >
                                                <Menu.Items className="absolute right-0 z-10 mt-2  w-fit origin-top-right rounded-md bg-white p-1 shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none">
                                                    {!selectedProducts.length > 0 && product.prd_is_visible && <Menu.Item>
                                                        <h1
                                                            onClick={() => { setDeleteConfirm(true); setId(product._id) }}
                                                            to="/profile"
                                                            className={`rounded cursor-pointer block px-7 py-2 text-sm text-gray-700 hover:bg-red-100 bg-slate-50`}
                                                        >Delete</h1>
                                                    </Menu.Item>}
                                                    <Menu.Item>
                                                        <h1
                                                            onClick={() => openProductModal("edit", product)}
                                                            className={`rounded block px-7 py-2 text-sm text-gray-700 hover:bg-green-200 cursor-pointer bg-slate-50`}
                                                        > Edit</h1 >
                                                    </Menu.Item>
                                                </Menu.Items>
                                            </Transition>
                                        </Menu>
                                    </div>
                                )}
                            </div>
                        ))}
                    </div> : loading || search.trim() === '' ?
                        <div className=" mx-auto max-w-screen-xl p-3 gap-2 sm:gap-6 sm:py-8 sm:px-4 lg:px-8">
                            <div className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-2 sm:gap-6">
                                {Array(itemsPerPage).fill(0).map((_, index) => (
                                    <Skeleton key={index} className="w-36 h-64 sm:h-96" />
                                ))
                                }
                            </div>
                        </div> : <h1 className="text-center m-3 text-3xl text-blue-900" >No product found</h1>}
                </div>
            )
            }
            {
                products.length > 0 && <div className={`${loading ? "hidden" : "block"}`}>
                    <div className="flex justify-between items-center px-3 flex-col md:flex-row max-w-7xl mx-auto ps-8">

                        <div className="sm:text-lg text-sm ">
                            Showing {itemOffset + 1} to{" "}
                            {totalPerPage > data.total_products
                                ? data.total_products
                                : totalPerPage}{" "}
                            of {data.total_products} results
                        </div>
                        <PaginationComponent
                            handlePageClick={handlePageClick}
                            endOffset={data.total_page}
                            search={search}
                        />
                    </div>
                </div>
            }
            <ConfirmationModal show={deleteConfirm} data={id} setShow={setDeleteConfirm} handleSubmit={deleteSelectedProducts} type={"delete"} />
        </div >
    );
}

export default Products;