import { Fragment, useContext, useState } from 'react'
import { Disclosure, Menu, Transition } from '@headlessui/react'
import { Link, NavLink, useNavigate } from 'react-router-dom';
import LogOut from '../profile/LogOut';
import Cart from './Cart';
import { CartDataContext } from '../../../context/CartContext';
import ConfirmationModal from '../../common/ConfirmationModal';
import Timer from './Timer';

const navigationUser = [
    { name: 'Products', to: '/products', current: true },
    { name: 'Orders', to: '/order', current: false },
]
const navigationAdmin = [
    { name: 'Orders', to: '/orders', current: false },
    { name: 'Products', to: '/products', current: false },
]
export default function Header({ role }) {
    const userData = JSON.parse(localStorage.getItem("userData"));
    const { cartData, setIsCartOpen, isCartOpen } = useContext(CartDataContext);
    const [isLogoutShow, setIsLogoutShow] = useState(false);
    const [isOpenMenu, setIsOpenMenu] = useState(false);
    const navigate = useNavigate();
    const navigation = role === 'admin' ? navigationAdmin : navigationUser;
    return (
        <Disclosure as="nav" className="bg-gray-800 sticky top-0 z-10">
            <>
                <div className="mx-auto max-w-7xl px-2 py-2 sm:py-0 sm:px-6 lg:px-8">
                    <div className="relative flex h-16 items-center justify-between">
                        <div className="absolute inset-y-0 left-0 flex items-center sm:hidden">
                            {/* Mobile menu button*/}
                            <button className='relative inline-flex items-center justify-center rounded-md p-2 text-gray-400 hover:bg-gray-700 hover:text-white focus:outline-none focus:ring-2 focus:ring-inset focus:ring-white'>
                                <i onClick={() => setIsOpenMenu(!isOpenMenu)} className={`block px-2 text-lg text-white fa-solid ${isOpenMenu ? "fa-xmark" : "fa-bars"}`}></i>
                            </button>
                        </div>
                        <div className="flex flex-1 items-center justify-center sm:items-stretch sm:justify-start">
                            <div>
                                <div onClick={() => navigate("/products")} className='cursor-pointer flex justify-center align-baseline'>
                                    <img className="h-10" alt="Your Company" src="images/LOGO.png" />
                                    <p className='text-3xl font-bold ms-0.5 text-amber-700 pt-1 mr-10 sm:mr-0 select-none'>rderify</p>
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
                            {
                                role === "user" ? (
                                    <button type="button"
                                        onClick={() => { setIsCartOpen(true); }}
                                        className="relative rounded-full bg-black py-2 px-3 text-white hover:text-white focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-gray-800"
                                    >{cartData.length > 0 &&
                                        <p className='absolute z-10 text-sm bg-orange-500 rounded-full px-1.5 -top-2 -right-2'>
                                            {cartData.length}
                                        </p>
                                        }<i className={`fa-solid text-sm sm:text-xl ${cartData.length > 0 ? "text-orange-500" : "text-white"} fa-cart-shopping`}></i>
                                    </button>
                                ) : null
                            }

                            <Cart open={isCartOpen} setOpen={setIsCartOpen} />

                            {/* Profile dropdown */}
                            <Menu as="div" className="relative ml-3">
                                <div>
                                    <Menu.Button className="relative flex rounded-full bg-gray-800 text-sm focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-gray-800">
                                        {/* <i className="fa-solid fa-user bg-black px-3 sm:px-3 py-2 sm:py-1.5 text-white rounded-full text-sm sm:text-lg"></i> */}
                                        <p className=' bg-black px-3 sm:px-3 py-2 sm:py-2 text-white rounded-full text-lg sm:text-xl'>{userData.user_fname.charAt(0).toUpperCase() + userData.user_lname.charAt(0).toUpperCase()}</p>
                                    </Menu.Button>
                                </div>
                                <Transition
                                    as={Fragment}
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
                                                className={`block px-4 py-2 text-sm text-gray-700 hover:bg-slate-200 bg-slate-50`}
                                                onClick={() => setIsLogoutShow(true)}
                                            > Log out</Link >
                                        </Menu.Item>
                                    </Menu.Items>
                                </Transition>
                            </Menu>
                        </div>
                    </div>
                </div>
                {/* {role === "user" ?
                    <div className=' bg-gray-700  shadow-xl py-1'>
                        <Menu as="div" className="relative px-2 sm:px-6 lg:px-8 mx-auto max-w-7xl flex  justify-end">
                            <div>
                                <Menu.Button className="relative flex text-white bg-black rounded px-2  text-sm">
                                    Timer
                                </Menu.Button>
                            </div>
                            <Transition
                                as={Fragment}
                            >
                                <Menu.Items className="absolute top-4 right-90 z-10 mt-2 w-fit  origin-top-right rounded-md bg-gray-700  shadow-lg ring-1 ring-black     ring-opacity-5 focus:outline-none">
                                    <Menu.Item>
                                        <Timer />
                                    </Menu.Item>
                                </Menu.Items>
                            </Transition>
                        </Menu>
                    </div> : null
                } */}
                {isOpenMenu &&
                    <div className='block sm:hidden space-y-1 px-2 pb-3 pt-2'>
                        {navigation.map((item, index) => (
                            <NavLink key={index} to={item.to} className={({ isActive }) =>
                                `block rounded-md px-3 py-2 text-base font-medium ${isActive ? "bg-gray-900 text-white  " : "text-gray-300 hover:bg-gray-700 hover:text-white"} `
                            } onClick={() => setIsOpenMenu(false)} >{item.name}</NavLink>
                        ))}
                    </div>
                }
            </>
            <LogOut isModalOpen={isLogoutShow} setIsModalOpen={setIsLogoutShow} />
            <ConfirmationModal show={isLogoutShow} setShow={setIsLogoutShow} type="logOut" />
        </Disclosure >
    )
}