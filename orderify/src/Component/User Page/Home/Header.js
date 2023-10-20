import React from 'react';
import logo from '../../../LOGO.png';
import { NavLink } from 'react-router-dom';

const Header = () => {
    return (
        <div className='shadow-md '>
            <div className='flex w-10/12 mx-auto justify-between items-center py-3 mb-2'>
                <div>
                    <div className='flex justify-center align-baseline'>
                        <img className="h-10" alt="Your Company"
                            src={logo}
                        />
                        <p className='text-3xl font-bold ms-0.5 text-amber-700 pt-1'>rderify</p>
                    </div>
                </div>
                <div>
                    <ul className='flex'>
                        <li className='px-3 h-full'>
                            <NavLink to="/home" className={({ isActive }) =>
                                `text-xl ${isActive ? " text-orange-500 border-b-2 border-orange-500" : "text-gray-700"} hover:text-orange-500 duration-200`
                            } >Home</NavLink>
                        </li>
                        <li className='px-3 text-lg '>
                            <NavLink to="/order" className={({ isActive }) =>
                                `text-xl ${isActive ? " text-orange-500 border-b-2 border-orange-500" : "text-gray-700"} hover:text-orange-500 duration-200`
                            } >Order</NavLink>
                        </li>
                        <li className='px-3 text-lg '>
                            <NavLink to="/history" className={({ isActive }) =>
                                `text-xl ${isActive ? " text-orange-500 border-b-2 border-orange-500" : "text-gray-700"} hover:text-orange-500 duration-200`
                            } >History</NavLink>
                        </li>
                        <li className='px-3 text-lg '>
                            <NavLink to="/profile" className={({ isActive }) =>
                                `text-xl ${isActive ? " text-orange-500 border-b-2 border-orange-500" : "text-gray-700"} hover:text-orange-500 duration-300`
                            } >Profile</NavLink>
                        </li>
                    </ul>
                </div>
                <div>
                    <button className='flex w-full justify-center border-2 text-orange-500 border-orange-500  rounded-md bg-transparent px-8 py-2 text-xl font-semibold leading-6 shadow-md hover:bg-orange-600 hover:text-white duration-300'>Cart</button>
                </div>
            </div>
        </div>
    )
}

export default Header
