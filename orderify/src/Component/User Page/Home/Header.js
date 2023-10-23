import React from 'react';
import logo from '../../../LOGO.png';
import { NavLink } from 'react-router-dom';

const Header = () => {
    return (
        <div>
            <header className="shadow-md mb-2 sticky z-50 top-0">
                <nav className=" bg-white border-gray-200 px-4 lg:px-6 py-2.5">
                    <div className="flex flex-wrap justify-between items-center mx-auto ">
                        <div>
                            <div className='flex justify-center align-baseline'>
                                <img className="h-10" alt="Your Company"
                                    src={logo}
                                />
                                <p className='text-3xl font-bold ms-0.5 text-amber-700 pt-1'>rderify</p>
                            </div>
                        </div>
                        <div
                            className=" justify-between items-center w-full lg:flex lg:w-auto lg:order-1"
                            id="mobile-menu-2"
                        >
                            <ul className="flex flex-col mt-4 font-medium lg:flex-row lg:space-x-8 lg:mt-0">
                                <li>
                                    <NavLink
                                        to="/home"
                                        className={({ isActive }) =>
                                            `block text-xl py-2 pr-4 pl-3 duration-200 ${isActive ? "text-orange-500  " : "text-gray-700"} border-b border-gray-100 hover:bg-gray-50 lg:hover:bg-transparent lg:border-0 hover:text-orange-500  lg:p-0`
                                        }
                                    >
                                        Home
                                    </NavLink>
                                </li>
                                <li>
                                    <NavLink
                                        to="/order"
                                        className={({ isActive }) =>
                                            `block text-xl py-2 pr-4 pl-3 duration-200 ${isActive ? "text-orange-500" : "text-gray-700"} border-b border-gray-100 hover:bg-gray-50 lg:hover:bg-transparent lg:border-0 hover:text-orange-500 lg:p-0`
                                        }
                                    >
                                        Orders
                                    </NavLink>
                                </li>
                                <li>
                                    <NavLink
                                        to="/history"
                                        className={({ isActive }) =>
                                            `block text-xl py-2 pr-4 pl-3 duration-200 ${isActive ? "text-orange-500" : "text-gray-700"} border-b border-gray-100 hover:bg-gray-50 lg:hover:bg-transparent lg:border-0 hover:text-orange-500 lg:p-0`
                                        }
                                    >
                                        History
                                    </NavLink>
                                </li>
                                <li>
                                    <NavLink
                                        to="/profile"
                                        className={({ isActive }) =>
                                            `block text-xl py-2 pr-4 pl-3 duration-200 ${isActive ? "text-orange-500" : "text-gray-700"} border-b border-gray-100 hover:bg-gray-50 lg:hover:bg-transparent lg:border-0 hover:text-orange-500 lg:p-0`
                                        }
                                    >
                                        Profile
                                    </NavLink>
                                </li>

                            </ul>
                        </div>
                        <div className="flex items-center justify-between lg:order-2">
                            <NavLink
                                to="#"
                                className=""
                            >
                                <span className='flex w-full justify-center border-2 text-orange-500 border-orange-500  rounded-md bg-transparent px-8 py-2 text-xl font-semibold leading-6 shadow-md hover:bg-orange-600 hover:text-white duration-300'>cart</span>
                            </NavLink>
                        </div>

                    </div>
                </nav>
            </header>
        </div>
    )
}

export default Header
