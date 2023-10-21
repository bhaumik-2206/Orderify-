import React, { useState } from 'react';
import { Formik, Form } from 'formik';
import { validationSchema } from './Validation';
import CommonInput from './CommonInput';
import { useNavigate } from 'react-router';
import { Link } from 'react-router-dom';
import fetchApi from '../../util/helper';
import img from '../../register.jpg'

const Registration = () => {
    let [stopApi, SetStopApi] = useState(true);
    const navigate = useNavigate();
    const initialValues = {
        user_fname: '',
        user_lname: '',
        user_email: '',
        user_pass: '',
        user_confirmPassword: '',
        user_phone: '',
    };


    const handleSubmit = async (values) => {
        const postData = {
            user_fname: values.user_fname,
            user_lname: values.user_lname,
            user_email: values.user_email,
            user_pass: values.user_pass,
            user_phone: values.user_phone,
        };
        let a = await fetchApi("register", postData);
        console.log(a)
        if (a.status === 200) {
            navigate("/login");
        }
        SetStopApi(true);
    };

    return (
        <div className='flex flex-col lg:flex-row h-screen'>


            <div className="lg:w-2/6 flex-1 flex flex-col justify-center px-6 py-1 lg:px-8 p-4 ">
                <div className="sm:mx-auto sm:w-full sm:max-w-sm">
                    <h2 className="text-center text-2xl font-bold leading-9 tracking-tight text-gray-900">
                        Registration Form
                    </h2>
                </div>
                <div className="mt-2 sm:mx-auto sm:w-full sm:max-w-sm">
                    <Formik
                        initialValues={initialValues}
                        validationSchema={validationSchema}
                        onSubmit={(values) => {
                            if (stopApi) {
                                handleSubmit(values)
                                SetStopApi(false);
                            }
                        }}
                    >
                        {formik => (
                            <Form className="">
                                <div className="flex justify-between m-0">
                                    <CommonInput name="user_fname" label="First Name" type="text" formik={formik} />
                                    <CommonInput name="user_lname" label="Last Name" type="text" formik={formik} />
                                </div>
                                <CommonInput name="user_phone" label="Mobile Number" type="text" formik={formik} />
                                <CommonInput name="user_email" label="Email address" type="email" formik={formik} />
                                <CommonInput name="user_pass" label="Password" type="password" formik={formik} />
                                <CommonInput name="user_confirmPassword" label="Confirm Password" type="password" formik={formik} />
                                <div>
                                    <button
                                        type="submit"
                                        className="mt-2 flex w-full justify-center rounded-md bg-indigo-600 px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-indigo-800 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
                                    >
                                        Sign up
                                    </button>
                                </div>
                            </Form>
                        )}
                    </Formik>
                    <p className="text-gray-500 text-md text-center p-2">Already Register? <Link to="/login" className="text-blue-500 hover:text-blue-600">Login</Link></p>
                </div>
            </div>
            <div className='lg:w-4/6'>
                <img src={img} alt="" className='w-full h-full object-cover object-left' />
            </div>
        </div>
    );
};

export default Registration;