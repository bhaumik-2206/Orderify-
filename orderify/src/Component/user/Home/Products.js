import React, { useContext, useEffect, useState } from "react";
import fetchApi from "../../../util/helper";
import { API_ENDPOINTS } from "../../../config/api";
import { toast } from "react-toastify";
import { CartDataContext } from "../../../context/CartContext";
import PaginationComponent from "./PaginationComponent";
import { useNavigate } from "react-router-dom";
import "react-loading-skeleton/dist/skeleton.css";
import SkeletonForProduct from "./SkeletonForProduct";
import ProductModel from './ProductModel'

function Products() {
    const [isAddProductModal, setIsAddProductModal] = useState(false)
    const [loadingStates, setLoadingStates] = useState({});
    const [products, setProducts] = useState([]);
    const [selectedProducts, setSelectedProducts] = useState([]);
    const [loading, setLoading] = useState(true);
    const { cartData, setCartData, changeQuantityContext, setTotalAmount } = useContext(CartDataContext);
    const userData = JSON.parse(localStorage.getItem("userData"));
    const [endOffset, setEndOffset] = useState(0);
    const [itemOffset, setItemOffset] = useState(0);
    const navigate = useNavigate();
    const [search, setSearch] = useState("");
    const itemsPerPage = 5;
    const totalPerPage = itemsPerPage + itemOffset;
    const [updateProduct, setUpdateProduct] = useState(null)
    const [mode, setMode] = useState("add");
    const handlePageClick = (event) => {
        const newOffset =
            (event.selected * itemsPerPage) % endOffset.total_products;
        console.log(newOffset);
        setItemOffset(newOffset);
        const pageObj = {
            limit: itemsPerPage,
            page: Number(event.selected + 1),
        };
        fetchData(pageObj);
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
            }, 800);
        } else {
            fetchData({
                limit: itemsPerPage,
                page: 1,
            });
        }
        return () => clearTimeout(timer);
    }, [search]);

    const fetchData = async (pageObj) => {
        if (search) {
            pageObj.search = search;
        }
        try {
            const response = await fetchApi({
                url: API_ENDPOINTS.PRODUCT,
                method: "POST",
                isAuthRequired: true,
                data: pageObj,
            });
            if (response.status === 200) {
                setProducts(response.data.products);
                setEndOffset(response.data);
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
        try {
            let response = await fetchApi({
                url: API_ENDPOINTS.PRODUCT, method: "POST", isAuthRequired: true,
                data: {
                    limit: itemsPerPage,
                    page: 1,
                    search
                }
            })
            if (response.status === 200) {
                setProducts(response.data.products);
                setEndOffset(response.data);
            }
            console.log(response)
        } catch (error) {
            console.log("ERROR: " + error)
        }
    }
    const deleteSelectedProducts = async (id) => {
        try {
            const response = await fetchApi({
                url: API_ENDPOINTS.PRODUCT_ADD,
                method: "DELETE",
                isAuthRequired: true,
                data: id ? { prd_ids: id } : { prd_ids: selectedProducts },
            });
            if (response.status === 200) {
                toast.info("Deleted selected products");
                setProducts((prevProducts) =>
                    prevProducts.filter((product) =>
                        id ? !id.includes(product._id) : !selectedProducts.includes(product._id)
                    )
                );
                setSelectedProducts([]);
            }
        } catch (error) {
            console.log(error);
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

    // if (products.length === 0) {
    //     return (
    //         <div className="absolute inset-0 flex items-center justify-center">
    //             <div className="text-2xl sm:text-4xl md:text-5xl lg:text-6xl  text-blue-700">
    //                 {
    //                     loading ? <SkeletonForProduct count={itemsPerPage} /> : <h1>Data Empty</h1>
    //                 }
    //             </div>
    //         </div>
    //     )
    // }

    return (
        <div className="bg-white">
            <div className="mx-auto max-w-screen-xl sm:px-6 lg:px-8">
                {userData.user_role === "user" ? (
                    <div className="flex items-center justify-center mb-3 w-1/2 mx-auto relative border border-black rounded-lg">
                        <input type="text"
                            value={search}
                            onChange={(e) => setSearch(e.target.value)}
                            className="w-full py-2 px-4 text-black bg-white border border-black rounded-l-lg focus:outline-none focus:ring focus:border-blue-300"
                            placeholder="Search..." />
                        <button onClick={() => handleSearch()} className="bg-black text-white py-2 px-4 rounded-r-lg">
                            <i className="fas fa-search"></i>
                        </button>
                    </div>
                ) : (
                    <div className="flex justify-between items-center">
                        <div>
                            <button
                                onClick={() => deleteSelectedProducts()}
                                disabled={selectedProducts.length === 0}
                                className={` text-red-600 text-center block w-full font-bold py-1 px-2 sm:py-2 sm:px-4 rounded-md border-2 border-red-500 hover:bg-red-200 hover:text-white ${selectedProducts.length === 0 ? "hidden" : "block"
                                    }`}
                            >
                                Delete Selected Products
                            </button>
                        </div>
                        <div>
                            <button className="bg-blue-700 text-white p-2 rounded-md m-1 text-lg font-bold  text-center"
                                onClick={() => { openProductModal("add") }}
                            >
                                <i class="fa-solid fa-plus"></i> Add Proucts</button>

                        </div>
                    </div>
                )
                }
            </div>
            {loading ? (
                <SkeletonForProduct count={itemsPerPage} />
            ) : (
                <div className="mx-auto max-w-screen-xl px-4 py-8 sm:px-6 lg:px-8">
                    <ProductModel
                        open={isAddProductModal}
                        setOpen={setIsAddProductModal}
                        mode={mode}
                        fetchData={fetchData}
                        updateProduct={updateProduct}
                    />
                      {(products.length !== 0) ? <div className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-6">
                        {products.map((product) => (
                            <div
                                key={product._id}
                                className={`flex flex-col  justify-between bg-white rounded-lg overflow-hidden shadow-lg transition-transform ${selectedProducts.includes(product._id) ? "border-2 border-blue-600" : ""
                                    }`} >
                                <div >
                                    <div className="relative w-34 h-34 sm:w-60 sm:h-60 mx-auto">
                                        <img
                                            src={
                                                product.prd_img
                                                    ? product.prd_img
                                                    : "images/download.png"
                                            }
                                            className="object-contain h-full w-full block mx-auto"
                                            alt="Product Image"
                                        />
                                    </div>
                                    <div className="px-4 pt-0.5">
                                        <h2 className="text-lg font-semibold text-gray-800 ">
                                            {product.prd_name}
                                        </h2>
                                        <p className="mt-0.5 text-lg font-bold text-gray-900">
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
                                                            {
                                                                cartData.find(
                                                                    (item) =>
                                                                        item.cartitm_fk_prd_id._id === product._id
                                                                ).cartitm_prd_qty
                                                            }
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
                                    <div className=" flex justify-between w-full px-2">
                                        <div className="text-center flex items-center">
                                            <input
                                                type="checkbox"
                                                checked={selectedProducts.includes(product._id)}
                                                onChange={() => toggleProductSelection(product._id)}
                                            />
                                        </div>
                                        <div className="pr-2 py-1  w-full  text-end">
                                            <button className="p-1 px-3 mr-2 border-2 border-gray-400 text-blue-700 hover:bg-gray-200 rounded-md"
                                                onClick={() => openProductModal("edit", product)}>
                                                <i className="fa-solid fa-pen "></i>
                                            </button>
                                            {
                                                !selectedProducts.length > 0 &&
                                                <button className="p-1 px-3  border-2 border-gray-400  text-red-600 hover:bg-gray-200 rounded-md"
                                                    onClick={() => deleteSelectedProducts(product._id)}>
                                                    <i className="fa-solid fa-trash"></i>
                                                </button>
                                            }
                                        </div>
                                    </div>
                                )}
                            </div>
                        ))}
                    </div> : loading || search.trim() === '' ? <SkeletonForProduct count={itemsPerPage} /> : <h1 className="text-center m-3 text-3xl text-blue-900" >No product found</h1>}
                </div>
            )}
             {products.length > 0 &&<div className={`${loading ? "hidden" : "block"}`}>
                <div className="flex justify-between items-center px-3 flex-col md:flex-row max-w-7xl mx-auto ps-8">
                    <div className="text-lg  ">
                        Showing {itemOffset + 1} to{" "}
                        {totalPerPage > endOffset.total_products
                            ? endOffset.total_products
                            : totalPerPage}{" "}
                        of {endOffset.total_products} results
                    </div>
                    <PaginationComponent
                        handlePageClick={handlePageClick}
                        endOffset={endOffset.total_page}
                        search={search}
                    />
                </div>
            </div>}
        </div>
    );
}

export default Products;
