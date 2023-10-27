import { Formik } from 'formik';
import React, { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom';
import fetchApi from '../../util/helper';
import CommonInput from './CommonInput';
import { API_ENDPOINTS } from '../../config/api';
import { toast } from 'react-toastify';
import { initialLogInValue } from '../../config/InitialValue';
import { LogInValidation } from '../../config/Validation';

const LogIn = () => {
    const navigate = useNavigate();
    const [lodding, setLoadding] = useState(true);

    const handleSubmit = async (values) => {
        setLoadding(false);
        try {
            const response = await fetchApi({ url: API_ENDPOINTS.LOGIN, method: 'POST', data: values });
            if (response.status === 200) {
                localStorage.setItem("auth", response.token);
                localStorage.setItem("userData", JSON.stringify(response.data));
                navigate("/products");
                toast.success("Log In Successfully");
            } else {
                toast.error(response.message);
            }
        } catch (error) {
            toast.error("Error To Fetch API");
        } finally {
            setLoadding(true);
        }
    };


    return (
        <Formik
            initialValues={initialLogInValue}
            validationSchema={LogInValidation}
            onSubmit={(values) => lodding && handleSubmit(values)}
        >
            {formik => (
                <div className='flex flex-col lg:flex-row h-screen'>
                    <div className="flex min-h-full flex-1 flex-col justify-center px-6 py-12 lg:px-8">
                        <div className="sm:mx-auto sm:w-full sm:max-w-sm">
                            <span className='flex mb-10 justify-center align-baseline'>
                                <img className="h-10" alt="Your Company"
                                    src="images/LOGO.png"
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
                                        {lodding ? "Sign in" : <div className="animate-spin me-2"><i className="fa-solid fa-spinner"></i></div>}
                                    </button>
                                </div>
                                <div className="mt-4 text-center">
                                    <p className="text-gray-500 text-md">Don't have an account? <Link to="/register" className="text-blue-500 hover:text-blue-600">Register</Link></p>
                                </div>
                            </form>
                        </div>
                    </div>
                    <div className='lg:w-4/6 hidden lg:block'>
                        <img src="images/register.jpg" alt="" className='w-full h-full object-cover object-left' />
                    </div>
                </div>
            )
            }
        </Formik>
    )
}

export default LogIn;