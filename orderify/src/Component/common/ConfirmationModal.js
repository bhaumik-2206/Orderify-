import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';

const ConfirmationModal = ({ show, setShow, handleSubmit, data = null, type }) => {
    const [loading, setLoading] = useState(false);
    const navigate = useNavigate();
    const values = {
        setTime: {
            title: 'Set Time',
            message: 'Are you sure you want to set time',
            button: 'Set',
            color: "bg-sky-600",
            colorHover: "hover:bg-sky-500",
            rounded: "bg-sky-100",
        },
        delete: {
            title: "Invisible Item",
            message: "Are you sure you want to invisible this product?",
            button: "invisible",
            color: "bg-red-600",
            colorHover: "hover:bg-red-500",
            rounded: "bg-red-100",
        },
        order: {
            title: "Order Item",
            message: "Are you sure you want to Order the product",
            button: "Order",
            color: "bg-sky-700",
            colorHover: "hover:bg-sky-600",
            rounded: "bg-sky-100",
        },
        logOut: {
            title: "Log out account",
            message: "Are you sure you want to Log Out your account?",
            button: "Log out",
            color: "bg-red-600",
            colorHover: "hover:bg-red-500",
            rounded: "bg-red-100",
        },
        remove: {
            title: "Remove Item",
            message: "Are you sure you want to remove the item from cart?",
            button: "Remove",
            color: "bg-red-600",
            colorHover: "hover:bg-red-500",
            rounded: "bg-red-100",
        },
        completed: {
            title: "Accept Item",
            message: "Are you sure you want to Accept the item?",
            button: "Accept",
            color: "bg-green-600",
            colorHover: "hover:bg-green-500",
            rounded: "bg-green-100",
        },
        rejected: {
            title: "Reject Item",
            message: "Are you sure you want to reject the item?",
            button: "Reject",
            color: "bg-red-600",
            colorHover: "hover:bg-red-500",
            rounded: "bg-red-100",
        },
        pending: {
            title: "Pending Item",
            message: "Are you sure you want to pending the item",
            button: "Pending",
            color: "bg-blue-600",
            colorHover: "hover:bg-blue-500",
            rounded: "bg-blue-100",
        },
    }

    const handleOperation = async () => {
        setLoading(true);
        if (type === "logOut") {
            localStorage.removeItem("userData");
            localStorage.removeItem("auth");
            navigate("/logIn");
            toast.success("Log Out Successfully");
        } else {
            await handleSubmit(data);
        }
        setShow(false);
        setLoading(false);
    }

    return (
        <>
            {show && (
                <>
                    <div onClick={() => setShow(false)} className="relative z-20" aria-labelledby="modal-title" role="dialog" aria-modal="true">
                        <div className={`inset-0 ${show ? "bg-gray-500 fixed" : "bg-transparent"} bg-opacity-75`} />
                        <div className="fixed inset-0  w-screen overflow-y-auto">
                            <div className="flex min-h-full items-end justify-center p-4 text-center sm:items-center sm:p-0">
                                <div className="relative z-20 transform overflow-hidden rounded-lg bg-white text-left shadow-xl transition-all sm:my-8 sm:w-full sm:max-w-lg" onClick={(e) => { e.stopPropagation() }}>
                                    <div className="bg-white px-4 pb-4 pt-5 sm:p-6 sm:pb-4">
                                        <div className="sm:flex sm:items-start">
                                            <div className={`mx-auto flex h-12 w-12 flex-shrink-0 items-center justify-center rounded-full ${values[type].rounded} sm:mx-0 sm:h-10 sm:w-10`}>
                                            </div>
                                            <div className="mt-3 text-center sm:ml-4 sm:mt-0 sm:text-left">
                                                <h3 className="text-base font-semibold leading-6 text-gray-900" id="modal-title">{values[type].title}</h3>
                                                <div className="mt-2">
                                                    <p className="text-sm text-gray-500">{values[type].message}</p>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="bg-gray-50 px-4 py-3 sm:flex sm:flex-row-reverse sm:px-6">
                                        <button disabled={loading} type="button" onClick={handleOperation} className={`${values[type].color} ${values[type].colorHover} w-full sm:w-28 rounded-md  px-3 py-2 text-sm font-semibold text-white shadow-sm sm:ml-3`}>
                                            {
                                                loading ? <div className="animate-spin me-2"><i className="fa-solid fa-spinner"></i></div> :
                                                    values[type].button
                                            }
                                        </button>
                                        <button disabled={loading} type="button" onClick={() => setShow(false)} className={`${loading && "cursor-not-allowed"} mt-3 w-full sm:w-28 inline-flex justify-center rounded-md bg-white px-3 py-2 text-sm font-semibold text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 hover-bg-gray-50 sm:mt-0`}>Cancel</button>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </>
            )}
        </>
    )
}

export default ConfirmationModal;