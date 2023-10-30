import { Fragment, useContext, useState } from "react";
import { Dialog, Transition } from "@headlessui/react";
import { XMarkIcon } from "@heroicons/react/24/outline";
import fetchApi from "../../../util/helper.js";
import { API_ENDPOINTS } from "../../../config/api.js";
import { CartDataContext } from "../../../context/CartContext.js";
import { toast } from "react-toastify";
import { Link } from "react-router-dom";
import ConfirmOrder from "./ConfirmOrder.js";

export default function Cart({ open, setOpen }) {
  const [loading, setLoading] = useState({});
  const [show, setShow] = useState(false);
  const { cartData, totalAmount, fetchCart } = useContext(CartDataContext);
  const token = localStorage.getItem("auth");

  const customHeaders = {
    Auth: token,
  };

  const removeData = async (data) => {
    const response = await fetchApi({ url: API_ENDPOINTS.CART, method: "DELETE", data: { cart_items: data }, customHeaders })
    if (response.status === 200) {
      fetchCart();
      toast.success("Item Removed Successfully");
    } else {
      toast.error("Error to remove the item");
    }
  }
  const changeQuantity = async (productId, operation) => {
    setLoading(pre => ({ ...pre, [productId]: true }));
    const currentQuantity = cartData.find((item) => item.cartitm_fk_prd_id._id === productId).cartitm_prd_qty;
    if (operation === "+" && currentQuantity === 5) {
      toast.error("Maxinum Quantity")
    }
    if (operation === "-" && currentQuantity === 1) {
      toast.success(`Item Removed Successfully`);
    }
    try {
      let response = await fetchApi({
        url: API_ENDPOINTS.CART, method: "POST",
        data: operation === "-" ? { cartitm_fk_prd_id: productId, cartitm_prd_qty: currentQuantity - 1 } :
          { cartitm_fk_prd_id: productId, cartitm_prd_qty: currentQuantity + 1 }
        , customHeaders
      })
      if (response.status === 200) {
        fetchCart();
      }
    } catch (error) {
      toast.error("Error to add item");
    } finally {
      setLoading(pre => ({ ...pre, [productId]: false }));
    }
  }

  return (
    <>
      <Transition.Root show={open} as={Fragment}>
        <Dialog as="div" className="relative z-10" onClose={setOpen}>
          <Transition.Child
            as={Fragment}
            enter="ease-in-out duration-500"
            enterFrom="opacity-0"
            enterTo="opacity-100"
            leave="ease-in-out duration-500"
            leaveFrom="opacity-100"
            leaveTo="opacity-0"
          >
            <div className="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity" />
          </Transition.Child>

          <div className="fixed inset-0 ">
            <div className="absolute inset-0 ">
              <div className="pointer-events-none fixed inset-y-0 right-0 flex max-w-full pl-10">
                <Transition.Child
                  as={Fragment}
                  enter="transform transition ease-in-out duration-500 sm:duration-700"
                  enterFrom="translate-x-full"
                  enterTo="translate-x-0"
                  leave="transform transition ease-in-out duration-500 sm:duration-700"
                  leaveFrom="translate-x-0"
                  leaveTo="translate-x-full"
                >
                  <Dialog.Panel className="pointer-events-auto w-screen max-w-md">
                    <div className="flex h-full flex-col bg-white shadow-xl">
                      <div className="flex-1 bg-white overflow-y-auto sm:px-6">
                        <div className="sticky top-0 py-4 bg-white block sm:flex px-4 items-start justify-between">
                          <Dialog.Title className="text-2xl text-center font-medium text-gray-900">
                            Shopping cart
                          </Dialog.Title>
                          <div className=" flex justify-between h-7 items-center">
                            <button
                              className="text-red-700 text-lg px-0  sm:px-3"
                              onClick={() => cartData.length > 0 && removeData(cartData.map(item => item.cartitm_fk_prd_id._id))}
                            >
                              Remove all
                            </button>
                            <button
                              type="button"
                              className="relative -m-2 p-2 text-gray-500 hover:text-gray-600"
                              onClick={() => setOpen(false)}
                            >
                              <span className="absolute -inset-0.5" />
                              <span className="sr-only">Close panel</span>
                              <XMarkIcon className="h-6 w-6" aria-hidden="true" />
                            </button>
                          </div>
                        </div>

                        <div className="mt-8 px-4">
                          <div className="flow-root">
                            <ul className="-my-6 divide-y">
                              {cartData.length > 0 ? cartData.map((item, index) => (
                                <div key={index}
                                  className="flex flex-col sm:flex-row py-3 m-1 px-2"
                                >
                                  <div className="mb-3 sm:mb-0 w-1/2 block mx-auto sm:h-24 sm:w-24  flex-shrink-0 overflow-hidden rounded-md border">
                                    <img
                                      src={item.cartitm_fk_prd_id.prd_img}
                                      alt="Item"
                                      className="h-full w-full object-cover object-center"
                                    />
                                  </div>

                                  <div className="w-full ml-4 flex flex-1 flex-col">
                                    <div>
                                      <div className="flex justify-between text-base font-medium text-gray-900">
                                        <p className="text-md text-ellipsis">
                                          {item.cartitm_fk_prd_id.prd_name}
                                        </p>
                                        <div className="flex border-2 h-8 border-blue-700 rounded justify-between item-center space-x-2">
                                          <button
                                            id="decrementButton"
                                            className="w-1/3 block bg-slate-50 hover:bg-slate-100 text-blue-700 border-r-2 border-blue-700 font-bold p-0 px-2 rounded-l-md"
                                            onClick={() => changeQuantity(item.cartitm_fk_prd_id._id, "-")}
                                            disabled={loading[item.cartitm_fk_prd_id._id]}
                                          >-
                                          </button>
                                          {
                                            loading[item.cartitm_fk_prd_id._id] ?
                                              <div className="animate-spin"><i className="fa-solid fa-spinner"></i></div> :
                                              <p className='w-1/3 block text-center text-md font-semibold mx-2 sm:mx-4'>{item.cartitm_prd_qty}</p>
                                          }

                                          <button
                                            id="incrementButton"
                                            className="w-1/3 block bg-slate-50 hover:bg-slate-100 text-blue-700 border-l-2 border-blue-700 font-bold px-2 rounded-r-md"
                                            onClick={() => changeQuantity(item.cartitm_fk_prd_id._id, "+")}
                                            disabled={loading[item.cartitm_fk_prd_id._id]}
                                          >
                                            +
                                          </button>
                                        </div>
                                      </div>
                                      <p className="mt-1 text-sm text-gray-500">
                                        ₹ {item.cartitm_fk_prd_id.prd_price} / item
                                      </p>
                                    </div>
                                    <div className="flex flex-1 items-end justify-between text-sm">
                                      <p className="text-bold text-lg">
                                        Total: {item.cartitm_fk_prd_id.prd_price * item.cartitm_prd_qty}
                                      </p>
                                      <div className="flex">
                                        <button
                                          onClick={() => removeData([item.cartitm_fk_prd_id._id])}
                                          type="button"
                                          className="font-medium text-indigo-600 hover:text-indigo-500"
                                        >Remove
                                        </button>
                                      </div>
                                    </div>
                                  </div>
                                </div>
                              )) : (
                                <div className="text-center">
                                  <img className="block mx-auto w-4/6" src="https://cdn.kekastatic.net/shared/assets/images/components/placeholder/thinking-face.svg" alt="" />
                                  <p className="text-xl">Empty</p>
                                </div>
                              )}
                            </ul>
                          </div>
                        </div>
                      </div>

                      <div className="border-t border-gray-200 px-4 py-6 sm:px-6">
                        <div className="text-2xl flex justify-between font-medium text-gray-900">
                          <p>Total</p>
                          <p className="font-bold text-3xl">
                            ₹ {totalAmount}
                          </p>
                        </div>
                        <div className="mt-6">
                          <Link
                            onClick={() => {
                              setShow(true);
                            }}
                            className={`${cartData.length > 0 ? "bg-indigo-600 hover:bg-indigo-700 cursor-pointer" : "bg-gray-600 cursor-not-allowed"} flex items-center justify-center rounded-md border border-transparent  px-6 py-3 text-base font-medium text-white shadow-sm`}
                            disabled={cartData.length === 0}
                          >Order</Link>
                        </div>
                      </div>
                    </div>
                  </Dialog.Panel>
                </Transition.Child>
              </div>
            </div>
          </div>
          <ConfirmOrder show={show} setShow={setShow} setOpen={setOpen} />
        </Dialog>
      </Transition.Root>
    </>
  );
}
