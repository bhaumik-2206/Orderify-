// import React, { useState } from 'react';
import logo from '../../../LOGO.png';
// import { NavLink } from 'react-router-dom';

// const Header = () => {
//     const [show, setShow] = useState(false);
//     return (
//         <nav className="bg-gray-800">
//             <div className="mx-auto max-w-7xl px-2 sm:px-6 lg:px-8">
//                 <div className="relative flex h-16 items-center justify-between">
//                     <div className="flex flex-1 items-center justify-center sm:items-stretch sm:justify-start">
//                         <div>
//                             <div className='flex justify-center align-baseline'>
//                                 <img className="h-10" alt="Your Company" src={logo} />
//                                 <p className='text-3xl font-bold ms-0.5 text-amber-700 pt-1'>rderify</p>
//                             </div>
//                         </div>
//                         <div className="hidden sm:ml-6 sm:block">
//                             <div className="flex space-x-4">
//                                 <NavLink to="#" className="bg-gray-900 text-white rounded-md px-3 py-2 text-sm font-medium" aria-current="page">Home</NavLink>
//                                 <NavLink to="#" className="text-gray-300 hover:bg-gray-700 hover:text-white rounded-md px-3 py-2 text-sm font-medium">Order</NavLink>
//                                 <NavLink to="#" className="text-gray-300 hover:bg-gray-700 hover:text-white rounded-md px-3 py-2 text-sm font-medium">History</NavLink>
//                             </div>
//                         </div>
//                     </div>
//                     <div className="absolute inset-y-0 right-0 flex items-center pr-2 sm:static sm:inset-auto sm:ml-6 sm:pr-0">
//                         <button type="button" className="relative rounded-full bg-gray-800 p-1 text-gray-400 hover:text-white focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-gray-800">
//                             <i className="fa-solid fa-cart-shopping text-white bg-black p-2 rounded-full"></i>
//                         </button>

//                         <div className="relative ml-3">
//                             <div>
//                                 <button onClick={() => setShow(!show)} type="button" className="relative flex rounded-full bg-gray-800 text-sm focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-gray-800" id="user-menu-button" aria-expanded="false" aria-haspopup="true">
//                                     <i className="fa-solid fa-user text-white bg-black p-2 rounded-full "></i>
//                                 </button>
//                             </div>
//                             {show &&
//                                 <div className={`absolute right-0 z-10 mt-2 w-48 origin-top-right rounded-md bg-white py-1 shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none`} role="menu" aria-orientation="vertical" aria-labelledby="user-menu-button" tabindex="-1">
//                                     <NavLink to="#" className="block px-4 py-2 text-sm text-gray-700" role="menuitem" tabindex="-1" id="user-menu-item-0">Your Profile</NavLink>
//                                     <NavLink to="#" className="block px-4 py-2 text-sm text-gray-700" role="menuitem" tabindex="-1" id="user-menu-item-1">Change Password</NavLink>
//                                     <NavLink to="#" className="block px-4 py-2 text-sm text-gray-700" role="menuitem" tabindex="-1" id="user-menu-item-2">Sign out</NavLink>
//                                 </div>}
//                         </div>
//                     </div>
//                 </div>
//             </div>

//             <div className="sm:hidden" id="mobile-menu">
//                 <div className="space-y-1 px-2 pb-3 pt-2">
//                     <NavLink to="#" className="bg-gray-900 text-white block rounded-md px-3 py-2 text-base font-medium" aria-current="page">Dashboard</NavLink>
//                     <NavLink to="#" className="text-gray-300 hover:bg-gray-700 hover:text-white block rounded-md px-3 py-2 text-base font-medium">Team</NavLink>
//                     <NavLink to="#" className="text-gray-300 hover:bg-gray-700 hover:text-white block rounded-md px-3 py-2 text-base font-medium">Projects</NavLink>
//                     <NavLink to="#" className="text-gray-300 hover:bg-gray-700 hover:text-white block rounded-md px-3 py-2 text-base font-medium">Calendar</NavLink>
//                 </div>
//             </div>
//         </nav>

//         // <header className=" shadow-md mb-2 sticky z-50 top-0">
//         //     <nav className="mx-auto bg-white border-gray-200 px-4 lg:px-6 py-2.5">
//         //         <div className="flex flex-wrap justify-between items-center mx-auto ">
//         //             <div>
//         //                 <div className='flex justify-center align-baseline'>
//         //                     <img className="h-10" alt="Your Company" src={logo} />
//         //                     <p className='text-3xl font-bold ms-0.5 text-amber-700 pt-1'>rderify</p>
//         //                 </div>
//         //             </div>
//         //             <div className="hidden lg:ml-6 lg:block justify-between items-center w-full lg:w-auto lg:order-1"
//         //                 id="mobile-menu-2">
//         //                 <ul className="flex flex-col mt-4 font-medium lg:flex-row lg:space-x-8 lg:mt-0">
//         //                     <li>
//         //                         <NavLink to="/home" className={({ isActive }) =>
//         //                             `block text-xl py-2 pr-4 pl-3 duration-200 ${isActive ? "text-orange-500  " : "text-gray-700"} border-b border-gray-100 hover:bg-gray-50 lg:hover:bg-transparent lg:border-0 hover:text-orange-500  lg:p-0`
//         //                         }>Home</NavLink>
//         //                     </li>
//         //                     <li>
//         //                         <NavLink to="/order" className={({ isActive }) =>
//         //                             `block text-xl py-2 pr-4 pl-3 duration-200 ${isActive ? "text-orange-500" : "text-gray-700"} border-b border-gray-100 hover:bg-gray-50 lg:hover:bg-transparent lg:border-0 hover:text-orange-500 lg:p-0`
//         //                         }>Orders</NavLink>
//         //                     </li>
//         //                     <li>
//         //                         <NavLink to="/profile" className={({ isActive }) =>
//         //                             `block text-xl py-2 pr-4 pl-3 duration-200 ${isActive ? "text-orange-500" : "text-gray-700"} border-b border-gray-100 hover:bg-gray-50 lg:hover:bg-transparent lg:border-0 hover:text-orange-500 lg:p-0`
//         //                         }>Profile</NavLink>
//         //                     </li>

//         //                 </ul>
//         //             </div>
//         //             <div className="flex items-center justify-between lg:order-2 pe-5">
//         //                 <div className='text-orange-500 text-xl '>
//         //                     <i className="fa-solid fa-cart-shopping"></i>
//         //                 </div>
//         //                 <div className='text-orange-500 text-xl '>
//         //                     <i className="fa-solid fa-user bg-black p-2 rounded-full "></i>
//         //                 </div>
//         //             </div>
//         //         </div>

//         //         <div className="lg:hidden" id="mobile-menu">
//         //             <div className="space-y-1 px-2 pb-3 pt-2">
//         //                 <NavLink to="/home" className={({ isActive }) =>
//         //                     `rounded-md block text-md py-1.5 pr-4 pl-3 duration-200 ${isActive ? "bg-orange-500 text-white" : "bg-white"} border-b border-gray-100 lg:hover:bg-transparent lg:border-0 hover:bg-orange-500 lg:p-0`
//         //                 } aria-current="page">Home</NavLink>
//         //                 <NavLink to="/order" className={({ isActive }) =>
//         //                     `rounded-md block text-md py-1.5 pr-4 pl-3 duration-200 ${isActive ? "bg-orange-500 text-white" : "bg-white"} border-b border-gray-100 lg:hover:bg-transparent lg:border-0 hover:bg-orange-500 lg:p-0`
//         //                 } aria-current="page">Order</NavLink>
//         //                 <NavLink to="/history" className={({ isActive }) =>
//         //                     `rounded-md block text-md py-1.5 pr-4 pl-3 duration-200 ${isActive ? "bg-orange-500 text-white" : "bg-white"} border-b border-gray-100 lg:hover:bg-transparent lg:border-0 hover:bg-orange-500 lg:p-0`
//         //                 } aria-current="page">History</NavLink>
//         //             </div>
//         //         </div>
//         //     </nav>
//         // </header>
//     )
// }

// export default Header



import { Fragment } from 'react'
import { Disclosure, Menu, Transition } from '@headlessui/react'
import { Bars3Icon, XMarkIcon } from '@heroicons/react/24/outline'
import { NavLink } from 'react-router-dom';

const navigation = [
    { name: 'Home', to: '/home', current: true },
    { name: 'Order', to: '/order', current: false },
    { name: 'History', to: '/history', current: false },
]

function classNames(...classes) {
    return classes.filter(Boolean).join(' ')
}

export default function Header() {
    return (
        <Disclosure as="nav" className="bg-gray-800">
            {({ open }) => (
                <>
                    <div className="mx-auto max-w-7xl px-2 sm:px-6 lg:px-8">
                        <div className="relative flex h-16 items-center justify-between">
                            <div className="absolute inset-y-0 left-0 flex items-center sm:hidden">
                                {/* Mobile menu button*/}
                                <Disclosure.Button className="relative inline-flex items-center justify-center rounded-md p-2 text-gray-400 hover:bg-gray-700 hover:text-white focus:outline-none focus:ring-2 focus:ring-inset focus:ring-white">
                                    <span className="absolute -inset-0.5" />
                                    <span className="sr-only">Open main menu</span>
                                    {open ? (
                                        <XMarkIcon className="block h-6 w-6" aria-hidden="true" />
                                    ) : (
                                        <Bars3Icon className="block h-6 w-6" aria-hidden="true" />
                                    )}
                                </Disclosure.Button>
                            </div>
                            <div className="flex flex-1 items-center justify-center sm:items-stretch sm:justify-start">
                                <div>
                                    <div className='flex justify-center align-baseline'>
                                        <img className="h-10" alt="Your Company" src={logo} />
                                        <p className='text-3xl font-bold ms-0.5 text-amber-700 pt-1'>rderify</p>
                                    </div>
                                </div>
                                <div className="hidden sm:ml-6 sm:block">
                                    <div className="flex space-x-4">
                                        {navigation.map((item) => (
                                            <NavLink to={item.to} className={({ isActive }) =>
                                                `rounded-md px-3 py-2 text-sm font-medium ${isActive ? "bg-gray-900 text-white  " : "text-gray-300 hover:bg-gray-700 hover:text-white"} `
                                            }>{item.name}</NavLink>
                                        ))}
                                    </div>
                                </div>
                            </div>
                            <div className="absolute inset-y-0 right-0 flex items-center pr-2 sm:static sm:inset-auto sm:ml-6 sm:pr-0">
                                <button type="button"
                                    className="relative rounded-full bg-gray-800 p-1 text-gray-400 hover:text-white focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-gray-800"
                                >
                                    <i className="fa-solid fa-cart-shopping"></i>
                                </button>

                                {/* Profile dropdown */}
                                <Menu as="div" className="relative ml-3">
                                    <div>
                                        <Menu.Button className="relative flex rounded-full bg-gray-800 text-sm focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-gray-800">
                                            <i className="fa-solid fa-user bg-black p-2 text-white rounded-full "></i>
                                        </Menu.Button>
                                    </div>
                                    <Transition
                                        as={Fragment}
                                        enter="transition ease-out duration-100"
                                        enterFrom="transform opacity-0 scale-95"
                                        enterTo="transform opacity-100 scale-100"
                                        leave="transition ease-in duration-75"
                                        leaveFrom="transform opacity-100 scale-100"
                                        leaveTo="transform opacity-0 scale-95"
                                    >
                                        <Menu.Items className="absolute right-0 z-10 mt-2 w-48 origin-top-right rounded-md bg-white py-1 shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none">
                                            <Menu.Item>
                                                {({ active }) => (
                                                    <NavLink
                                                        to="#"
                                                        className={classNames(active ? 'bg-gray-100' : '', 'block px-4 py-2 text-sm text-gray-700')}
                                                    >Your Profile</NavLink>
                                                )}
                                            </Menu.Item>
                                            <Menu.Item>
                                                {({ active }) => (
                                                    <NavLink to="#"
                                                        className={classNames(active ? 'bg-gray-100' : '', 'block px-4 py-2 text-sm text-gray-700')}
                                                    >Change Password</NavLink>
                                                )}
                                            </Menu.Item>
                                            <Menu.Item>
                                                {({ active }) => (
                                                    <NavLink
                                                        to="#"
                                                        className={classNames(active ? 'bg-gray-100' : '', 'block px-4 py-2 text-sm text-gray-700')}
                                                    >Sign out</NavLink>
                                                )}
                                            </Menu.Item>
                                        </Menu.Items>
                                    </Transition>
                                </Menu>
                            </div>
                        </div>
                    </div>

                    <Disclosure.Panel className="sm:hidden">
                        <div className="space-y-1 px-2 pb-3 pt-2">
                            {navigation.map((item) => (

                                <NavLink to={item.to} className={({ isActive }) =>
                                    `block rounded-md px-3 py-2 text-base font-medium ${isActive ? "bg-gray-900 text-white  " : "text-gray-300 hover:bg-gray-700 hover:text-white"} `
                                }>{item.name}</NavLink>

                                // <Disclosure.Button
                                //     key={item.name}
                                //     as="NavLink"
                                //     to={item.to}
                                //     className={classNames(
                                //         item.current ? 'bg-gray-900 text-white' : 'text-gray-300 hover:bg-gray-700 hover:text-white',
                                //         'block rounded-md px-3 py-2 text-base font-medium'
                                //     )}
                                //     aria-current={item.current ? 'page' : undefined}>
                                //     <NavLink to={item.to}>
                                //         {item.name}
                                //     </NavLink>
                                // </Disclosure.Button>
                            ))}
                        </div>
                    </Disclosure.Panel>
                </>
            )
            }
        </Disclosure >
    )
}
