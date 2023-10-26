import { Fragment, useState } from 'react'
import { Disclosure, Menu, Transition } from '@headlessui/react'
import { NavLink, useNavigate } from 'react-router-dom';
import LogOut from '../user/profile/LogOut';

const navigation = [
    { name: 'Dashboard', to: '/products', current: false },
    { name: 'Order', to: '/order', current: false },
    { name: 'Payment', to: '/profile', current: false },
    { name: 'History', to: '/history', current: false },
]

export default function AdminHeader() {
    const [isModalOpen, setIsModalOpen] = useState(false);
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
                                {open ?
                                    (<i onClick={() => setOpen(!open)} className="block px-2 text-lg text-white fa-solid fa-xmark"></i>) :
                                    (<i onClick={() => setOpen(!open)} className="block px-2 text-lg text-white fa-solid fa-bars"></i>)
                                }
                            </button>
                        </div>
                        <div className="flex flex-1 items-center justify-center sm:items-stretch sm:justify-start">
                            <div>
                                <div onClick={() => navigate("/products")} className='cursor-pointer flex justify-center align-baseline'>
                                    <img className="h-10" alt="Your Company" src="LOGO.png" />
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

                            {/* Profile dropdown */}
                            <Menu as="div" className="relative ml-3">
                                <div>
                                    <Menu.Button className="relative flex rounded-full bg-gray-800 text-sm focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-gray-800">
                                        <i className="fa-solid fa-user bg-black p-2 text-white rounded-full "></i>
                                    </Menu.Button>
                                </div>
                                <Transition
                                    as={Fragment}
                                >
                                    <Menu.Items className="absolute right-0 z-10 mt-2 w-48 origin-top-right rounded-md bg-white py-1 shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none">
                                        <Menu.Item>
                                            <NavLink
                                                to="/profile"
                                                className={({ isActive }) =>
                                                    `${isActive ? "bg-gray-100" : ""} block px-4 py-2 text-sm text-gray-700 hover:bg-slate-200`
                                                }
                                            >Your Profile</NavLink>
                                        </Menu.Item>
                                        <Menu.Item>
                                            <NavLink
                                                to="#"
                                                className={({ isActive }) =>
                                                    `${isActive ? "bg-gray-100" : ""} block px-4 py-2 text-sm text-gray-700 hover:bg-slate-200`
                                                }
                                            >Change Password</NavLink>
                                        </Menu.Item>
                                        <Menu.Item>
                                            <NavLink
                                                className={({ isActive }) =>
                                                    `${isActive ? "bg-gray-100" : ""} block px-4 py-2 text-sm text-gray-700 hover:bg-slate-200`
                                                }
                                                onClick={() => setIsModalOpen(true)}
                                            > Sign out</NavLink >
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