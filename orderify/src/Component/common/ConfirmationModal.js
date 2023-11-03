import React from 'react'
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';

const ConfirmationModal = ({ show, setShow, handleSubmit, data = null, type = "delete" }) => {
    const navigate = useNavigate();
    const values = {
        delete: {
            title: "Delete Item",
            message: "Are you sure you want to delete the product",
            button: "Delete",
            color: "bg-red-600"
        },
        order: {
            title: "Order Item",
            message: "Are you sure you want to Order the product",
            button: "Order",
            color: "bg-sky-700"
        },
        logOut: {
            title: "Log out account",
            message: "Are you sure you want to Log Out your account?",
            button: "Log out",
            color: "bg-red-600"
        },
    }

    const handleOperation = () => {
        if (type === "logOut") {
            localStorage.removeItem("userData");
            localStorage.removeItem("auth");
            navigate("/logIn");
            toast.success("Log Out Successfully");
        }
        handleSubmit(data);
        setShow(false);
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
                                            <div className="mx-auto flex h-12 w-12 flex-shrink-0 items-center justify-center rounded-full bg-red-100 sm:mx-0 sm:h-10 sm:w-10">
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
                                        <button type="button" onClick={handleOperation} className={`${values[type].color} inline-flex w-full justify-center rounded-md  px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-red-500 sm:ml-3 sm:w-auto`}>{values[type].button}</button>
                                        <button type="button" onClick={() => setShow(false)} className={`mt-3 inline-flex w-full justify-center rounded-md bg-white px-3 py-2 text-sm font-semibold text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 hover-bg-gray-50 sm:mt-0 sm:w-auto`}>Cancel</button>
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