import { Fragment, useContext, useEffect, useRef, useState } from 'react'
import { Disclosure, Menu, Transition } from '@headlessui/react'
import { Link, NavLink, useNavigate } from 'react-router-dom';
import LogOut from '../profile/LogOut';
import Cart from './Cart';
import { CartDataContext } from '../../../context/CartContext';
import ConfirmationModal from '../../common/ConfirmationModal';
import Timer from './Timer';
import fetchApi from '../../../util/helper';
import { API_ENDPOINTS } from '../../../config/api';
import TimeSetter from '../../admin/TimeSetter';

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
    const [time, setTime] = useState({ startTime: "", endTime: "" })
    const { cartData, setIsCartOpen, isCartOpen } = useContext(CartDataContext);
    const [isLogoutShow, setIsLogoutShow] = useState(false);
    const [isOpenMenu, setIsOpenMenu] = useState(false);
    const navigate = useNavigate();
    const timerRef = useRef(null);
    const navigation = role === 'admin' ? navigationAdmin : navigationUser;

    useEffect(() => {
        userData.user_role === "user" && getTime();
    }, []);

    const getTime = async () => {
        try {
            let response = await fetchApi({ url: API_ENDPOINTS.TIMER, method: 'GET', isAuthRequired: true })
            console.log(response.data);
            setTime({ endTime: response.data.end_time, startTime: response.data.start_time });
        } catch (error) {
            console.log(error)
        }
    }

    return (
        <Disclosure as="nav" className="bg-gray-800 sticky w-full top-0 z-10">
            <>
                <div className="mx-auto max-w-7xl py-0 px-2 sm:px-6 lg:px-8">
                    <div className="relative flex h-16 items-center justify-between">
                        <div className="absolute inset-y-0 left-0 flex items-center sm:hidden">
                            {/* Mobile menu button*/}
                            <button className='relative inline-flex items-center justify-center rounded-md p-2 text-gray-400 hover:bg-gray-700 hover:text-white focus:outline-none focus:ring-2 focus:ring-inset focus:ring-white'>
                                <i onClick={() => setIsOpenMenu(!isOpenMenu)} className={`block text-lg text-white fa-solid ${isOpenMenu ? "fa-xmark" : "fa-bars"}`}></i>
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
                        <div className="absolute inset-y-0 right-0 flex items-center sm:static sm:inset-auto sm:ml-6 sm:pr-0">
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
                                        <div className='relative bg-black w-11 h-11 rounded-full text-white text-xl'>
                                            <p className='absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2'>{userData.user_fname.charAt(0).toUpperCase() + userData.user_lname.charAt(0).toUpperCase()}</p>
                                        </div>
                                    </Menu.Button>
                                </div>
                                <Transition
                                    as={Fragment}
                                >
                                    <Menu.Items className="absolute right-0 z-20 mt-2 w-48 origin-top-right rounded-md bg-white py-1 shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none">
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
                {/* {role === "user" ? */}
                    <div className=' bg-gray-700  shadow-xl py-1'>
                        <Menu as="div" className="relative z-10 px-2 sm:px-6 lg:px-8 mx-auto max-w-7xl flex  justify-end">
                            <div>
                                <Menu.Button  onClick={() => timerRef.current && timerRef.current.startCountDown()} className="relative flex text-white bg-black rounded px-2 py-1 text-sm">
                                    {role !== 'admin' ? 'Timer' : 'Set Time'}
                                </Menu.Button>
                            </div>
                            <Transition
                                as={Fragment}
                            >
                                <Menu.Items className="absolute top-6 right-90 z-10 mt-2 w-fit  origin-top-right rounded-md bg-gray-700  shadow-lg ring-1 ring-black     ring-opacity-5 focus:outline-none">
                                    <Menu.Item>
                                        {role === 'admin' ? <TimeSetter /> : 
                                        <Timer ref={timerRef} endTime={time.endTime} startTime={time.startTime} />
                                        }
                                    </Menu.Item>
                                </Menu.Items>
                            </Transition>
                        </Menu>
                    </div>
                {/* } */}
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