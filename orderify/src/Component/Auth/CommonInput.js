import React, { useState } from 'react';

const CommonInput = ({ name, label, type, formik, disabled = false }) => {
    const [show, setShow] = useState(false);
    const { handleChange, handleBlur, values, errors, touched, } = formik;

    return (
        <div className="p-0.5 relative" style={{ marginTop: "10px" }}>
            <label htmlFor={name} className=" text-lg font-medium leading-5 text-gray-700 p-0.5">
                {label}
            </label>
            <input
                type={type === "password" ? (show ? 'text' : 'password') : type}
                id={name}
                name={name}
                onChange={handleChange}
                onFocus={handleBlur}
                value={values[name]}
                disabled={disabled}
                className={`${type === "checkbox" ? "inline ms-2" : "block focus:ring-indigo-600 w-full rounded-md border-0 py-1.5 ps-4  text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset  sm:text-sm sm:leading-6"} `}
            />
            {touched[name] && errors[name] && (
                <p className="text-md text-red-600">{errors[name]}</p>
            )}
            {type === "password" && (
                <i className={`fa-solid ${show ? 'fa-eye' : 'fa-eye-slash'} absolute right-4 top-8 text-xl cursor-pointer`} onClick={() => setShow(pre => !pre)}></i>
            )}
        </div>
    );
};

export default CommonInput;
