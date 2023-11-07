import { Fragment, useRef, useState } from 'react'
import { Dialog, Transition } from '@headlessui/react'
import { Formik } from 'formik'
import { validationUserProfile } from '../../../config/Validation'
import CommonInput from '../../auth/CommonInput'
import fetchApi from '../../../util/helper'
import { API_ENDPOINTS } from '../../../config/api'
import { toast } from 'react-toastify'
import { useEffect } from 'react'

export default function ProfileUpdateModal({ show, setShow, userData, setUserData }) {
    const cancelButtonRef = useRef(null);
    const [loading, setLoading] = useState(false);

    const handleSubmit = async (values) => {
        setLoading(true)
        let data = {
            user_fname: values.user_fname,
            user_lname: values.user_lname,
            user_email: values.user_email,
            user_phone: String(values.user_phone),
        }
        try {
            let response = await fetchApi({ url: API_ENDPOINTS.USER, data, isAuthRequired: true, method: "PUT" })
            if (response.status === 200) {
                localStorage.setItem("userData", JSON.stringify(values));
                setUserData(values);
                setShow(false);
            }
        } catch (error) {
            toast.error("Error while fetching user data")
        }
        setLoading(false);
    }

    return (
        <Transition.Root show={show} as={Fragment}>
            <Dialog as="div" className="relative z-10" initialFocus={cancelButtonRef} onClose={setShow}>
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
                    <div className="flex min-h-full items-start justify-center p-4 text-center lg:items-center sm:p-0">
                        <Transition.Child
                            as={Fragment}
                            enter="ease-out duration-300"
                            enterFrom="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
                            enterTo="opacity-100 translate-y-0 sm:scale-100"
                            leave="ease-in duration-200"
                            leaveFrom="opacity-100 translate-y-0 sm:scale-100"
                            leaveTo="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
                        >
                            <Dialog.Panel className="relative transform overflow-hidden rounded-lg bg-white w-full p-3 text-left shadow-xl transition-all sm:my-8 sm:w-full sm:max-w-lg">
                                <div className="bg-white  sm:p-6 sm:pb-4">
                                    <div className="flex min-h-full flex-1 flex-col justify-center ">
                                        <div className="sm:mx-auto sm:w-full sm:max-w-sm">
                                            <h2 className="mt-1 text-center text-2xl font-bold leading-9 tracking-tight text-gray-900">
                                                User Profile
                                            </h2>
                                        </div>
                                        <div className="sm:mx-auto sm:w-full sm:max-w-sm">
                                            <Formik
                                                initialValues={userData}
                                                validationSchema={validationUserProfile}
                                                enableReinitialize
                                                onSubmit={(values) => handleSubmit(values)}
                                            >
                                                {formik => (
                                                    <div className='flex flex-col lg:flex-row '>
                                                        <div className="flex flex-1 flex-col justify-center py-4 lg:px-8">
                                                            <div className="sm:mx-auto sm:w-full sm:max-w-sm">
                                                                <form onSubmit={formik.handleSubmit}>
                                                                    <CommonInput name="user_fname" label="First Name" type="text" formik={formik} />
                                                                    <CommonInput name="user_lname" label="Last Name" type="text" formik={formik} />
                                                                    <CommonInput name="user_email" label="Email" type="email" formik={formik} disabled={true} />
                                                                    <CommonInput name="user_phone" label="Mobile Number" type="number" formik={formik} />
                                                                    <div>
                                                                        <div className="bg-gray-50 px-4 py-3 sm:flex sm:flex-row-reverse sm:px-6">
                                                                            <button disabled={loading} type="submit" className={`w-full sm:w-28 rounded-md  px-3 py-2 text-sm font-semibold text-white shadow-sm sm:ml-3 bg-indigo-600 hover:bg-indigo-700`}>
                                                                                {loading ? <div className="animate-spin me-2"><i className="fa-solid fa-spinner"></i></div> : "Edit"}
                                                                            </button>
                                                                            <button type="button" onClick={() => setShow(false)} className={`mt-3 w-full sm:w-28 inline-flex justify-center rounded-md bg-white px-3 py-2 text-sm font-semibold text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 hover-bg-gray-50 sm:mt-0`}>Cancel</button>
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
