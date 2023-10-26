import { Fragment, useEffect, useState } from "react";
import { Dialog, Transition } from "@headlessui/react";
import { XMarkIcon } from "@heroicons/react/24/outline";
import ConfirmationModal from "./common components/ConfirmationModal.js";
import fetchApi from "../../../util/helper.js";
import { API_ENDPOINTS } from "../../../config/api.js";

export default function Cart({ open, setOpen }) {
  const [isConfDeleteShow, setIsConfDeleteShow] = useState(false);
  const [idForRemoveItm, setIdForRemoveItm] = useState(null);

  let exampleData = [
    { name: "dahi", quantity: 2, price: 20, _id: 1 },
    { name: "monoco", quantity: 2, price: 10, _id: 2 },
    { name: "choco", quantity: 2, price: 40, _id: 3 },
    { name: "coffee", quantity: 2, price: 100, _id: 4 },
  ];
  const [itemsForCart, setItemsForCart] = useState([]);
  const token = localStorage.getItem("auth");

  console.log(token)
  const customHeaders = {
    // Auth: 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjY1MzdjMGZkZmUwNzI2ZTUwZTAyZDgzZSIsInJvbGUiOiJ1c2VyIiwiaWF0IjoxNjk4MzE3MDM3LCJleHAiOjE2OTg0MDM0Mzd9.wd8DNVPvoPpbA1OVsv7-Je0m6yISSjQNpL6XsWaxOKo',
    Auth: token,
  };

  useEffect(() => {
    fetchData();
  }, []);

  async function fetchData() {
    try {
      let response = await fetchApi({
        url: API_ENDPOINTS.CART,
        method: "GET",
        customHeaders,
      });
      console.log(response)
      if(response.status === 200) {
        // let data = await response.json();
        console.log('data '+ response)
        setItemsForCart(response.data.cart_items)
      }
      // console.log(response);
    } catch (error) {
      console.log(error)
    }
  }
  console.log(itemsForCart)

  function handleConfForDelete() {
    console.log(idForRemoveItm);
    setItemsForCart((pv) => {
      let forUpdate = [...pv];
      forUpdate = forUpdate.filter((item) => item._id !== idForRemoveItm);
      return forUpdate;
    });
    setIsConfDeleteShow(false);
    setOpen(true);
  }

  return (
    <>
      <Transition.Root show={open} as={Fragment}>
        <Dialog as="div" className="relative z-10" onClose={setOpen}>
          <ConfirmationModal
            isModalOpen={isConfDeleteShow}
            message="Are you sure you want to remove this item from cart ?"
            onConfirm={handleConfForDelete}
            onCancel={() => {
              setIsConfDeleteShow(false); 
              setOpen(true);
            }}
          />
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

          <div className="fixed inset-0 overflow-hidden">
            <div className="absolute inset-0 overflow-hidden">
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
                    <div className="flex h-full flex-col  bg-white shadow-xl">
                      <div className="flex-1 overflow-y-auto px-4 py-6 sm:px-6">
                        <div className="flex items-start justify-between">
                          <Dialog.Title className="text-lg font-medium text-gray-900">
                            Shopping cart
                          </Dialog.Title>
                          <div className="ml-3 flex h-7 items-center">
                            <button
                              type="button"
                              className="relative -m-2 p-2 text-gray-400 hover:text-gray-500"
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
                              className="-my-6 divide-y divide-gray-200"
                            >
                              {itemsForCart.map((item) => (
                                <div
                                  key={item._id}
                                  className="flex py-3 bg-slate-200 m-1 rounded px-2"
                                >
                                  <div className="h-24 w-24 flex-shrink-0 overflow-hidden rounded-md border border-gray-200">
                                    <img
                                      src="cart.jpg"
                                      alt="item image"
                                      className="h-full w-full object-cover object-center"
                                    />
                                  </div>

                                  <div className="ml-4 flex flex-1 flex-col w-60">
                                    <div>
                                      <div className="flex justify-between text-base font-medium text-gray-900">
                                        <p className="text-sm text-ellipsis overflow-hidden">
                                          {item.cartitm_fk_prd_id.prd_name}
                                        </p>
                                      </div>
                                      <p className="mt-1 text-sm text-gray-500">
                                        Rs. {item.cartitm_fk_prd_id.prd_price} / item
                                      </p>
                                      <p className="text-sm text-gray-500">
                                        Qty {item.cartitm_prd_qty}
                                      </p>
                                    </div>
                                    <div className="flex flex-1 items-end justify-between text-sm">
                                      <p className="text-bold">
                                        Total: {item.cartitm_fk_prd_id.prd_price * item.cartitm_prd_qty}
                                      </p>
                                      <div className="flex">
                                        <button
                                          onClick={() => {
                                            setIsConfDeleteShow(true);
                                            setIdForRemoveItm(item._id);
                                          }}
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
                           Rs. {(() => {
                             let totalPrc = 0;
                             exampleData.forEach((item) => {
                               totalPrc += Number(item.quantity * item.price);
                             });
                             return totalPrc;
                           })()}
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
