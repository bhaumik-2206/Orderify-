import React, { useState } from 'react';

const CommonInput = ({ name, label, type, formik }) => {
    const [show, setShow] = useState(false);
    const { handleChange, handleBlur, values, errors, touched } = formik;

    return (
        <div className="mb-2 relative">
            <label htmlFor={name} className="block text-sm font-medium leading-5 text-gray-700">
                {label}
            </label>
            <input
                type={type === "password" ? (show ? 'text' : 'password') : type}
                id={name}
                name={name}
                onChange={handleChange}
                onBlur={handleBlur}
                value={values[name]}
                className="block w-full rounded-md border-0 py-1 px-2 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
            />
            {touched[name] && errors[name] && (
                <p className="mt-2 text-sm text-red-600">{errors[name]}</p>
            )}
            {type === "password" ? (
                show ? (<i className="fa-solid fa-eye absolute right-4 top-6 text-xl cursor-pointer" onClick={() => setShow(pre => !pre)}></i>) : (
                    <i className="fa-solid fa-eye-slash absolute right-4 top-6 text-xl cursor-pointer" onClick={() => setShow(pre => !pre)}></i>)
            ) : (false)}
        </div>
    );
};

export default CommonInput;
