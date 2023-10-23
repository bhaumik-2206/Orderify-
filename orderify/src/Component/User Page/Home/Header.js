import React from 'react';
import logo from '../../../LOGO.png';
import { NavLink } from 'react-router-dom';

const Header = () => {
    return (
        <header className=" shadow-md mb-2 sticky z-50 top-0">
            <nav className="w-10/12 mx-auto bg-white border-gray-200 px-4 lg:px-6 py-2.5">
                <div className="flex flex-wrap justify-between items-center mx-auto ">
                    <div>
                        <div className='flex justify-center align-baseline'>
                            <img className="h-10" alt="Your Company" src={logo} />
                            <p className='text-3xl font-bold ms-0.5 text-amber-700 pt-1'>rderify</p>
                        </div>
                    </div>
                    <div className="hidden lg:ml-6 lg:block justify-between items-center w-full lg:w-auto lg:order-1"
                        id="mobile-menu-2">
                        <ul className="flex flex-col mt-4 font-medium lg:flex-row lg:space-x-8 lg:mt-0">
                            <li>
                                <NavLink to="/home" className={({ isActive }) =>
                                    `block text-xl py-2 pr-4 pl-3 duration-200 ${isActive ? "text-orange-500  " : "text-gray-700"} border-b border-gray-100 hover:bg-gray-50 lg:hover:bg-transparent lg:border-0 hover:text-orange-500  lg:p-0`
                                }>Home</NavLink>
                            </li>
                            <li>
                                <NavLink to="/order" className={({ isActive }) =>
                                    `block text-xl py-2 pr-4 pl-3 duration-200 ${isActive ? "text-orange-500" : "text-gray-700"} border-b border-gray-100 hover:bg-gray-50 lg:hover:bg-transparent lg:border-0 hover:text-orange-500 lg:p-0`
                                }>Orders</NavLink>
                            </li>
                            <li>
                                <NavLink to="/history" className={({ isActive }) =>
                                    `block text-xl py-2 pr-4 pl-3 duration-200 ${isActive ? "text-orange-500" : "text-gray-700"} border-b border-gray-100 hover:bg-gray-50 lg:hover:bg-transparent lg:border-0 hover:text-orange-500 lg:p-0`
                                }>History</NavLink>
                            </li>
                            <li>
                                <NavLink to="/profile" className={({ isActive }) =>
                                    `block text-xl py-2 pr-4 pl-3 duration-200 ${isActive ? "text-orange-500" : "text-gray-700"} border-b border-gray-100 hover:bg-gray-50 lg:hover:bg-transparent lg:border-0 hover:text-orange-500 lg:p-0`
                                }>Profile</NavLink>
                            </li>

                        </ul>
                    </div>
                    <div className="flex items-center justify-between lg:order-2">
                        <NavLink to="#" className="">
                            <span className='flex w-full justify-center border-2 text-orange-500 border-orange-500  rounded-md bg-transparent px-8 py-2 text-xl font-semibold leading-6 shadow-md hover:bg-orange-600 hover:text-white duration-300'>
                                Cart
                            </span>
                        </NavLink>
                    </div>
                </div>
                
                <div className="lg:hidden" id="mobile-menu">
                    <div className="space-y-1 px-2 pb-3 pt-2">
                        <NavLink to="/home" className={({ isActive }) =>
                            `rounded-md block text-md py-1.5 pr-4 pl-3 duration-200 ${isActive ? "bg-orange-500 text-white" : "bg-white"} border-b border-gray-100 lg:hover:bg-transparent lg:border-0 hover:bg-orange-500 lg:p-0`
                        } aria-current="page">Home</NavLink>
                        <NavLink to="/order" className={({ isActive }) =>
                            `rounded-md block text-md py-1.5 pr-4 pl-3 duration-200 ${isActive ? "bg-orange-500 text-white" : "bg-white"} border-b border-gray-100 lg:hover:bg-transparent lg:border-0 hover:bg-orange-500 lg:p-0`
                        } aria-current="page">Order</NavLink>
                        <NavLink to="/history" className={({ isActive }) =>
                            `rounded-md block text-md py-1.5 pr-4 pl-3 duration-200 ${isActive ? "bg-orange-500 text-white" : "bg-white"} border-b border-gray-100 lg:hover:bg-transparent lg:border-0 hover:bg-orange-500 lg:p-0`
                        } aria-current="page">History</NavLink>
                        <NavLink to="/profile" className={({ isActive }) =>
                            `rounded-md block text-md py-1.5 pr-4 pl-3 duration-200 ${isActive ? "bg-orange-500 text-white" : "bg-white"} border-b border-gray-100 lg:hover:bg-transparent lg:border-0 hover:bg-orange-500 lg:p-0`
                        } aria-current="page">Profile</NavLink>
                    </div>
                </div>
            </nav>
        </header>
    )
}

export default Header
