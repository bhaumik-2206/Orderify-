import logo from "../../../LOGO.png"
import { Fragment, useState } from 'react'
import { Disclosure, Menu, Transition } from '@headlessui/react'
import { Link, NavLink, useNavigate } from 'react-router-dom';
import LogOut from '../profile/LogOut';
import Cart from "./Cart";

const navigation = [
    { name: 'Home', to: '/home', current: true },
    { name: 'Order', to: '/order', current: false },
    { name: 'History', to: '/history', current: false },
]

export default function Header() {
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [isCartModalShow, setIsCartModalShow] = useState(false);
    const [open, setOpen] = useState(false);
    const navigate = useNavigate();

    return (
        <Disclosure as="nav" className="bg-gray-800">
            <>
                <div className="mx-auto max-w-7xl px-2 sm:px-6 lg:px-8">
                    <div className="relative flex h-16 items-center justify-between">
                        <div className="absolute inset-y-0 left-0 flex items-center sm:hidden">
                            {/* Mobile menu button*/}
                            <button className='relative inline-flex items-center justify-center rounded-md p-2 text-gray-400 hover:bg-gray-700 hover:text-white focus:outline-none focus:ring-2 focus:ring-inset focus:ring-white'>
                                <i onClick={() => setOpen(!open)} className={`block px-2 text-lg text-white fa-solid ${open ? "fa-xmark" : "fa-bars"}`}></i>
                            </button>
                        </div>
                        <div className="flex flex-1 items-center justify-center sm:items-stretch sm:justify-start">
                            <div>
                                <div onClick={() => navigate("/home")} className='cursor-pointer flex justify-center align-baseline'>
                                    <img className="h-10" alt="Your Company" src={logo} />
                                    <p className='text-3xl font-bold ms-0.5 text-amber-700 pt-1'>rderify</p>
                                </div>
                            </div>
                            <div className="hidden sm:ml-6 sm:block">
                                <div className="flex space-x-4">
                                    {navigation.map((item, index) => (
                                        <NavLink key={index} to={item.to} className={({ isActive }) =>
                                            `rounded-md px-3 py-2 text-sm font-medium ${isActive ? "bg-gray-900 text-white  " : "text-gray-300 hover:bg-gray-700 hover:text-white"} `
                                        }>{item.name}</NavLink>
                                    ))}
                                </div>
                            </div>
                        </div>
                        <div className="absolute inset-y-0 right-0 flex items-center pr-2 sm:static sm:inset-auto sm:ml-6 sm:pr-0">
                            <button type="button"
                                onClick={()=>setIsCartModalShow(pv=>!pv)}
                                className="relative rounded-full bg-gray-800 p-1 text-gray-400 hover:text-white focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-gray-800"
                            >
                                <i className="fa-solid fa-cart-shopping"></i>
                            </button>
                            <Cart isCartModalShow={isCartModalShow} setIsCartModalShow={setIsCartModalShow}/>

                            {/* Profile dropdown */}
                            <Menu as="div" className="relative ml-3">
                                <div>
                                    <Menu.Button className="relative flex rounded-full bg-gray-800 text-sm focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-gray-800">
                                        <i className="fa-solid fa-user bg-black p-2 text-white rounded-full "></i>
                                    </Menu.Button>
                                </div>
                                <Transition
                                    as={Fragment}
                                // enter="transition ease-out duration-100"
                                // enterFrom="transform opacity-0 scale-95"
                                // enterTo="transform opacity-100 scale-100"
                                // leave="transition ease-in duration-75"
                                // leaveFrom="transform opacity-100 scale-100"
                                // leaveTo="transform opacity-0 scale-95"
                                >
                                    <Menu.Items className="absolute right-0 z-10 mt-2 w-48 origin-top-right rounded-md bg-white py-1 shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none">
                                        <Menu.Item>
                                            <Link
                                                to="/profile"
                                                className={`block px-4 py-2 text-sm text-gray-700 hover:bg-slate-200 bg-slate-50`}
                                            >Your Profile</Link>
                                        </Menu.Item>
                                        <Menu.Item>
                                            <Link
                                                to="#"
                                                className={`block px-4 py-2 text-sm text-gray-700 hover:bg-slate-200 bg-slate-50`}
                                            >Change Password</Link>
                                        </Menu.Item>
                                        <Menu.Item>
                                            <Link
                                                className={`block px-4 py-2 text-sm text-gray-700 hover:bg-slate-200 bg-slate-50`}
                                                onClick={() => setIsModalOpen(true)}
                                            > Sign out</Link >
                                        </Menu.Item>
                                    </Menu.Items>
                                </Transition>
                            </Menu>
                        </div>
                    </div>
                </div>
                {open &&
                    <div className='space-y-1 px-2 pb-3 pt-2'>
                        {navigation.map((item, index) => (
                            <NavLink key={index} to={item.to} className={({ isActive }) =>
                                `block rounded-md px-3 py-2 text-base font-medium ${isActive ? "bg-gray-900 text-white  " : "text-gray-300 hover:bg-gray-700 hover:text-white"} `
                            } onClick={() => setOpen(false)} >{item.name}</NavLink>
                        ))}
                    </div>
                }
            </>
            <LogOut isModalOpen={isModalOpen} setIsModalOpen={setIsModalOpen} />
        </Disclosure >
    )
}