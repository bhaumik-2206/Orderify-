import { Fragment, useState } from "react";
import { Dialog, Transition } from "@headlessui/react";
import { XMarkIcon } from "@heroicons/react/24/outline";
import ConfirmationModal from "./common components/ConfirmationModal.js";

export default function Cart({ open, setOpen }) {
  const [isConfDeleteShow, setIsConfDeleteShow] = useState(false);
  const [idForRemoveItm, setIdForRemoveItm] = useState(null);
  
  let exampleData = [
    { name: "dahi", quantity: 2, price: 20, _id: 1 },
    { name: "monoco", quantity: 2, price: 10, _id: 2 },
    { name: "choco", quantity: 2, price: 40, _id: 3 },
    { name: "coffee", quantity: 2, price: 100, _id: 4 },
  ];
  const [manualData, setManualData] = useState(exampleData);

  function handleConfForDelete() {
    console.log(idForRemoveItm);
    setManualData((pv) => {
      let forUpdate = [...pv];
      forUpdate = forUpdate.filter((item) => item._id !== idForRemoveItm);
      return forUpdate;
    });
    setIsConfDeleteShow(false);
    setOpen(true);
  }
  function handleCancelForDelete() {
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
            onCancel={handleCancelForDelete}
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
                  <Dialog.Panel className="pointer-events-auto relative w-screen max-w-md">
                    <Transition.Child
                      as={Fragment}
                      enter="ease-in-out duration-500"
                      enterFrom="opacity-0"
                      enterTo="opacity-100"
                      leave="ease-in-out duration-500"
                      leaveFrom="opacity-100"
                      leaveTo="opacity-0"
                    >
                      <div className="absolute left-0 top-0 -ml-8 flex pr-2 pt-4 sm:-ml-10 sm:pr-4">
                        <button
                          type="button"
                          className="relative rounded-md text-gray-300 hover:text-white focus:outline-none focus:ring-2 focus:ring-white"
                          onClick={() => setOpen(false)}
                        >
                          <span className="absolute -inset-2.5" />
                          <span className="sr-only">Close panel</span>
                          <XMarkIcon className="h-6 w-6" aria-hidden="true" />
                        </button>
                      </div>
                    </Transition.Child>
                    <div className="flex h-full flex-col overflow-y-scroll bg-white py-6 shadow-xl">
                      <div className="px-4 sm:px-6">
                        <Dialog.Title className="text-base font-semibold leading-6 text-gray-900">
                          Cart Items
                        </Dialog.Title>
                      </div>
                      <div className="relative mt-6 flex-1 px-4 sm:px-6 w-100">
                        {/* {
                            manualData.map((item,index) => (
                                <div key={index} className='flex justify-between bg-gray-700 text-white rounded p-3 m-2 w-50'>
                                    <div className="col">
                                    <h1 className='text-amber-700 font-bold'>{item.name.toUpperCase()}</h1>
                                    <h4>Qty : {item.quantity}</h4>
                                    <h4>Price: {item.price}</h4>
                                    </div>
                                    <i onClick={()=>{
                                        setIsConfDeleteShow(true)
                                        setIdForRemoveItm(item._id)
                                      }} className="cursor-pointer hover:bg-slate-600 h-fit p-1 rounded text-amber-700 fa-solid fa-xmark"></i>
                                </div>
                            ))
                        } */}
                        <div className="flow-root">
                          <ul
                            role="list"
                            className="-my-6 divide-y divide-gray-200"
                          >
                            {manualData.map((item) => (
                              <li key={item._id} className="flex py-3">
                                <div className="h-24 w-24 flex-shrink-0 overflow-hidden rounded-md border border-gray-200">
                                  <img
                                    src="cart.jpg"
                                    alt="item image"
                                    className="h-full w-full object-cover object-center"
                                  />
                                </div>

                                <div className="ml-4 flex flex-1 flex-col">
                                  <div>
                                    <div className="flex justify-between text-base font-medium text-gray-900">
                                      <h3>{item.name.toUpperCase()}</h3>
                                      <p className="ml-4">
                                        Total: {item.price * item.quantity}
                                      </p>
                                    </div>
                                    <p className="mt-1 text-sm text-gray-500">
                                      Rs. {item.price} / item
                                    </p>
                                  </div>
                                  <div className="flex flex-1 items-end justify-between text-sm">
                                    <p className="text-gray-500">
                                      Qty {item.quantity}
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
                              </li>
                            ))}
                          </ul>
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