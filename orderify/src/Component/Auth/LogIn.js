import { Formik } from 'formik';
import React, { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom';
import logo from "../../LOGO.png"
import img from "../../register.jpg"
import fetchApi from '../../util/helper';
import CommonInput from './CommonInput';
import { validationSchema } from './Validation';

const LogIn = () => {
    const navigate = useNavigate();
    const [stopAPIRequest, setStopAPIRequest] = useState(true);

    const handleSubmit = async (values, action) => {
        let a = await fetchApi("login", values);
        console.log(a);
        if (a.status === 200) {
            navigate("/home");
            localStorage.setItem("auth", a.token);
            localStorage.setItem("userData", JSON.stringify({ fullName: a.data.user_fname + " " + a.data.user_lname }));
        }
        setStopAPIRequest(true);
    }


    return (
        <Formik
            initialValues={{ user_email: "", user_pass: "" }}
            // validationSchema={validationSchema}
            onSubmit={(values) => {
                if (stopAPIRequest) {
                    handleSubmit(values);
                    setStopAPIRequest(false);
                }
            }}
        >
            {formik => (
                <div className='flex flex-col lg:flex-row h-screen'>
                    <div className="flex min-h-full flex-1 flex-col justify-center px-6 py-12 lg:px-8">
                        <div className="sm:mx-auto sm:w-full sm:max-w-sm">
                            <span className='flex mb-10 justify-center align-baseline'>
                                <img className="h-10" alt="Your Company"
                                    src={logo}
                                />
                                <p className='text-3xl font-bold ms-0.5 text-amber-700 pt-1'>rderify</p>
                            </span>
                            <h2 className="mt-10 text-center text-2xl font-bold leading-9 tracking-tight text-gray-900">
                                Sign in to your account
                            </h2>
                        </div>
                        <div className="mt-10 sm:mx-auto sm:w-full sm:max-w-sm">
                            <form className="space-y-6" onSubmit={formik.handleSubmit}>
                                <CommonInput name="user_email" label="Email" type="email" formik={formik} />
                                <CommonInput name="user_pass" label="Password" type="password" formik={formik} />

                                <div>
                                    <button type="submit"
                                        className="flex w-full justify-center rounded-md bg-indigo-600 px-3 py-2 text-md font-semibold leading-6 text-white shadow-sm hover:bg-indigo-700 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
                                    >
                                        {stopAPIRequest ? "" : <div className="animate-spin me-2"><i className="fa-solid fa-spinner"></i></div>}
                                        {stopAPIRequest ? "Sign in" : ""}
                                    </button>
                                </div>
                                <div className="mt-4 text-center">
                                    <p className="text-gray-500 text-md">Don't have an account? <Link to="/register" className="text-blue-500 hover:text-blue-600">Register</Link></p>
                                </div>
                            </form>
                        </div>
                    </div>
                    <div className='lg:w-4/6 hidden lg:block'>
                        <img src={img} alt="" className='w-full h-full object-cover object-left' />
                    </div>
                </div>
            )
            }
        </Formik>
    )
}

export default LogIn;