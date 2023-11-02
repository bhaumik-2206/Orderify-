import { Fragment, useRef, useState } from 'react'
import { Dialog, Transition } from '@headlessui/react'
import { ExclamationTriangleIcon } from '@heroicons/react/24/outline'
import { Formik } from 'formik'
import { initialProductAddValue } from '../../../config/InitialValue'
import {  ProductValidation } from '../../../config/Validation'
import CommonInput from '../../auth/CommonInput'
import fetchApi from '../../../util/helper'
import { API_ENDPOINTS } from '../../../config/api'
import { toast } from 'react-toastify'

export default function AddProductModel({ open, setOpen }) {
    const cancelButtonRef = useRef(null)
    const handleSubmit = async (values) => {
        try{
            const response = await fetchApi({ url: API_ENDPOINTS.PRODUCT_ADD, method: 'POST', data: values,isAuthRequired: true});
            if(response.status === 200){
                setOpen(false);
            }
            if(response.status===409){
                toast.error(response.message);
            }
        }catch (error){
            console.log(error)
        }
        console.log(values)
    }
    return (
        <Transition.Root show={open} as={Fragment}>
            <Dialog as="div" className="relative z-10" initialFocus={cancelButtonRef} onClose={setOpen}>
                <Transition.Child
                    as={Fragment}
                    enter="ease-out duration-300"
                    enterFrom="opacity-0"
                    enterTo="opacity-100"
                    leave="ease-in duration-200"
                    leaveFrom="opacity-100"
                    leaveTo="opacity-0"
                >
                    <div className="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity" />
                </Transition.Child>

                <div className="fixed inset-0 z-10 w-screen overflow-y-auto">
                    <div className="flex min-h-full items-end justify-center p-4 text-center sm:items-center sm:p-0">
                        <Transition.Child
                            as={Fragment}
                            enter="ease-out duration-300"
                            enterFrom="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
                            enterTo="opacity-100 translate-y-0 sm:scale-100"
                            leave="ease-in duration-200"
                            leaveFrom="opacity-100 translate-y-0 sm:scale-100"
                            leaveTo="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
                        >
                            <Dialog.Panel className="relative transform overflow-hidden rounded-lg bg-white text-left shadow-xl transition-all sm:my-8 sm:w-full sm:max-w-lg">
                                <div className="bg-white px-4 pb-4 pt-5 sm:p-6 sm:pb-4">
                                    <div className="flex min-h-full flex-1 flex-col justify-center px-6 py-12 lg:px-8">
                                        <div className="sm:mx-auto sm:w-full sm:max-w-sm">
                                            <h2 className="mt-1 text-center text-2xl font-bold leading-9 tracking-tight text-gray-900">
                                                Add New Product
                                            </h2>
                                        </div>
                                        <div className="sm:mx-auto sm:w-full sm:max-w-sm">
                                            <Formik
                                                initialValues={initialProductAddValue}
                                                validationSchema={ProductValidation}
                                                onSubmit={(values) => handleSubmit(values)}
                                            >
                                                {formik => (
                                                    <div className='flex flex-col lg:flex-row '>
                                                        <div className="flex flex-1 flex-col justify-center px-6 py-12 lg:px-8">
                                                            <div className="sm:mx-auto sm:w-full sm:max-w-sm">
                                                                <form onSubmit={formik.handleSubmit}>
                                                                    <CommonInput name="prd_name" label="Product Name" type="text" formik={formik} />
                                                                    <CommonInput name="prd_price" label="Product Price" type="Number" formik={formik} />
                                                                    <CommonInput name="prd_img" label="Product Image Url" type="text" formik={formik} />
                                                                    <div>
                                                                        <div className=" px-4 py-3 sm:flex sm:flex-row-reverse sm:px-6">
                                                                            <button
                                                                                type="submit"
                                                                                className="inline-flex w-full justify-center rounded-md bg-blue-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-indigo-700 sm:ml-3 sm:w-auto"
                                                                                // onClick={() => setOpen(false)}
                                                                            >
                                                                                Add Product
                                                                            </button>
                                                                            <button
                                                                                type="button"
                                                                                className="mt-3 inline-flex w-full justify-center rounded-md bg-white px-3 py-2 text-sm font-semibold text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 hover:bg-gray-50 sm:mt-0 sm:w-auto"
                                                                                onClick={() => setOpen(false)}
                                                                                ref={cancelButtonRef}
                                                                            >
                                                                                Cancel
                                                                            </button>
                                                                        </div>
                                                                    </div>
                                                                </form>
                                                            </div>
                                                        </div>
                                                    </div>
                                                )
                                                }
                                            </Formik>
                                        </div>
                                    </div>
                                </div>

                            </Dialog.Panel>
                        </Transition.Child>
                    </div>
                </div>
            </Dialog>
        </Transition.Root>
    )
}