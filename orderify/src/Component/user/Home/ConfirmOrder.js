import React, { useContext } from 'react'
import fetchApi from '../../../util/helper'
import { API_ENDPOINTS } from '../../../config/api'
import { toast } from 'react-toastify'
import { CartDataContext } from '../../../context/CartContext'

const ConfirmOrder = ({ show, setShow, setOpen }) => {
    const { cartData, setCartData } = useContext(CartDataContext);

    const handleOrderSubmit = async () => {
        const response = await fetchApi({ url: API_ENDPOINTS.ORDER, method: "POST", isAuthRequired: true })
        if (response.status === 200) {
            setCartData([]);
        } else {
            toast.error("Error to send order")
        }
        setShow(false);
    }

    return (
        <>
            {cartData.length > 0 && show && (
                <>
                    {/* <div onClick={() => setShow(false)} className={`inset-0 ${show ? "bg-gray-500 fixed" : "bg-transparent"} bg-opacity-75`} /> */}
                    <div className="relative z-20" aria-labelledby="modal-title" role="dialog" aria-modal="true">
                        <div onClick={() => setShow(false)} className="fixed z-30 inset-0 bg-gray-500 bg-opacity-75 transition-opacity"></div>
                        <div className="fixed z-40 inset-0 w-screen overflow-y-auto">
                            <div className="flex min-h-full items-end justify-center p-4 text-center sm:items-center sm:p-0">
                                <div className="relative transform overflow-hidden rounded-lg bg-white text-left shadow-xl transition-all sm:my-8 sm:w-full sm:max-w-lg">
                                    <div className="bg-white px-4 pb-4 pt-5 sm:p-6 sm:pb-4">
                                        <div className="sm:flex sm:items-start">
                                            <div className="mt-3 text-center sm:ml-4 sm:mt-0 sm:text-left">
                                                <h3 className="text-base font-semibold leading-6 text-gray-900" id="modal-title">Order</h3>
                                                <div className="mt-2">
                                                    <p className="text-sm text-gray-500">Are you sure you want to place order</p>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="bg-gray-50 px-4 py-3 sm:flex sm:flex-row-reverse sm:px-6">
                                        <button type="button" onClick={handleOrderSubmit} className="inline-flex w-full justify-center rounded-md bg-sky-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-sky-500 sm:ml-3 sm:w-auto">Order</button>
                                        <button type="button" onClick={() => {
                                            setShow(false);
                                            setOpen(true);
                                        }} className="mt-3 inline-flex w-full justify-center rounded-md bg-white px-3 py-2 text-sm font-semibold text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 hover-bg-gray-50 sm:mt-0 sm:w-auto">Cancel</button>
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

export default ConfirmOrder;