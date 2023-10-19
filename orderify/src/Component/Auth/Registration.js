import React from 'react';
import { Formik, Form } from 'formik'; // Remove Field and ErrorMessage
import { validationSchema } from './Validation';
import CommonInput from './CommonInput';

const Registration = () => {
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
            user_phone: String(values.user_phone),
        };
        try {
            let response = await fetch("https://orderify-qebp.onrender.com/register", {
                method: "POST",
                headers: {
                    "Content-type": "application/json"
                },
                body: JSON.stringify(postData)
            });
            let result = await response.json();
            console.log(result);
        } catch (error) {

        }
        console.log(postData);
        console.log(values);
    };

    return (
        <div className="flex min-h-full flex-1 flex-col justify-center px-6 py-5 lg:px-8 p-4 w-1/2 mx-auto mt-2 rounded-md">
            <div className="sm:mx-auto sm:w-full sm:max-w-sm">
                <h2 className="text-center text-2xl font-bold leading-9 tracking-tight text-gray-900">
                    Registration Form
                </h2>
            </div>

            <div className="mt-2 sm:mx-auto sm:w-full sm:max-w-sm">
                <Formik
                    initialValues={initialValues}
                    validationSchema={validationSchema}
                    onSubmit={handleSubmit}
                >
                    {formik => (
                        <Form className="space-y-6">
                            <div className="flex justify-between">
                                <CommonInput name="user_fname" label="First Name" type="text" formik={formik} />
                                <CommonInput name="user_lname" label="Last Name" type="text" formik={formik} />
                            </div>
                            <CommonInput name="user_phone" label="Mobile Number" type="number" formik={formik} />
                            <CommonInput name="user_email" label="Email address" type="email" formik={formik} />
                            <CommonInput name="user_pass" label="Password" type="password" formik={formik} />
                            <CommonInput name="user_confirmPassword" label="Confirm Password" type="password" formik={formik} />
                            <div>
                                <button
                                    type="submit"
                                    className="flex w-full justify-center rounded-md bg-indigo-600 px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-indigo-800 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
                                >
                                    Sign up
                                </button>
                            </div>
                        </Form>
                    )}
                </Formik>
            </div>
        </div>
    );
};

export default Registration;
