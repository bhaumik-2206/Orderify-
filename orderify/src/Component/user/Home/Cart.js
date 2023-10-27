import { Fragment, useContext, useEffect, useState } from "react";
import { Dialog, Transition } from "@headlessui/react";
import { XMarkIcon } from "@heroicons/react/24/outline";
import fetchApi from "../../../util/helper.js";
import { API_ENDPOINTS } from "../../../config/api.js";
import { CartDataContext } from "../../../context/CartContext.js";

export default function Cart({ open, setOpen }) {
  const { cartData, setCartData } = useContext(CartDataContext);
  const [data, setData] = useState({})
  const token = localStorage.getItem("auth");

  console.log(cartData)

  const customHeaders = {
    Auth: token,
  };

  useEffect(() => {
    fetchData();
  }, [open]);

  async function fetchData() {
    try {
      let response = await fetchApi({
        url: API_ENDPOINTS.CART,
        method: "GET",
        customHeaders,
      });
      if (response.status === 200) {
        setCartData(response.data.cart_items);
        setData(response.data);
      }
    } catch (error) {
      console.log(error)
    }
  }

  const removeData = (data) => {
    fetchApi({ url: API_ENDPOINTS.CART, method: "DELETE", data: { cart_items: data }, customHeaders })
    fetchData()
  }

  return (
    <>
      <Transition.Root show={open} as={Fragment}>
        <Dialog as="div" className="relative z-10" onClose={setOpen}>
          {/* <ConfirmationModal
            isModalOpen={isConfDeleteShow}
            message="Are you sure you want to remove this item from cart ?"
            onConfirm={handleConfForDelete}
            onCancel={() => {
              setOpen(true);
            }}
          /> */}
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

          <div className="fixed inset-0  overflow-hidden">
            <div className="absolute inset-0  overflow-hidden">
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
                  <Dialog.Panel className="pointer-events-auto  w-screen max-w-md">
                    <div className="flex h-full flex-col bg-white shadow-xl">
                      <div className="flex-1 bg-white overflow-y-auto px-4 sm:px-6">
                        <div className="sticky top-0 py-4 bg-white flex items-start justify-between">
                          <Dialog.Title className="text-lg font-medium text-gray-900">
                            Shopping cart
                          </Dialog.Title>
                          <div className="ml-3 flex h-7 items-center">
                            <button className="text-red-700 text-lg px-3"
                              onClick={() => removeData(cartData.map(item => item.cartitm_fk_prd_id._id))}>
                              Remove all
                            </button>
                            <button
                              type="button"
                              className="relative -m-2 p-2 text-gray-500 hover:text-gray-600"
                              onClick={() => setOpen(false)}
                            >
                              <span className="absolute -inset-0.5" />
                              <span className="sr-only">Close panel</span>
                              <XMarkIcon
                                className="h-6 w-6"
                                aria-hidden="true"
                              />
                            </button>
                          </div>
                        </div>

                        <div className="mt-8">
                          <div className="flow-root">
                            <ul
                              role="list"
                              className="-my-6 divide-y"
                            >
                              {cartData.map((item) => (
                                <div
                                  key={item._id}
                                  className="flex py-3  m-1 px-2"
                                >
                                  <div className="h-24 w-24 flex-shrink-0 overflow-hidden rounded-md border">
                                    <img
                                      src="cart.jpg"
                                      alt="item image"
                                      className="h-full w-full object-cover object-center"
                                    />
                                  </div>

                                  <div className="ml-4 flex flex-1 flex-col w-60">
                                    <div>
                                      <div className="flex justify-between text-base font-medium text-gray-900">
                                        <p className="text-md text-ellipsis overflow-hidden">
                                          {item.cartitm_fk_prd_id.prd_name}
                                        </p>
                                      </div>
                                      <p className="mt-1 text-sm text-gray-500">
                                        ₹ {item.cartitm_fk_prd_id.prd_price} / item
                                      </p>
                                      <p className="text-sm text-gray-500">
                                        Qty {item.cartitm_prd_qty}
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
                                        >
                                          Remove
                                        </button>
                                      </div>
                                    </div>
                                  </div>
                                </div>
                              ))}
                            </ul>
                          </div>
                        </div>
                      </div>

                      <div className="border-t border-gray-200 px-4 py-6 sm:px-6">
                        <div className="flex justify-between text-base font-medium text-gray-900">
                          <p>Total</p>
                          <p>
                            {data.cart_total_amount}
                          </p>
                        </div>
                        <div className="mt-6">
                          <a
                            href="#"
                            className="flex items-center justify-center rounded-md border border-transparent bg-indigo-600 px-6 py-3 text-base font-medium text-white shadow-sm hover:bg-indigo-700"
                          >
                            Order
                          </a>
                        </div>
                        <div className="mt-6 flex justify-center text-center text-sm text-gray-500">
                          <p>
                            or
                            <button
                              type="button"
                              className="font-medium text-indigo-600 hover:text-indigo-500"
                              onClick={() => setOpen(false)}
                            >
                              Continue Shopping
                              <span aria-hidden="true"> &rarr;</span>
                            </button>
                          </p>
                        </div>
                      </div>
                    </div>
                  </Dialog.Panel>
                </Transition.Child>
              </div>
            </div>
          </div>
        </Dialog>
      </Transition.Root>
    </>
  );
}
