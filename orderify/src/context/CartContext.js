import React, { createContext, useEffect, useState } from 'react'
import fetchApi from '../util/helper';
import { API_ENDPOINTS } from '../config/api';

export const CartDataContext = createContext();

const CartContext = ({ children }) => {
    const [cartData, setCartData] = useState([]);
    const token = localStorage.getItem('auth');
    const customHeaders = {
        'Auth': token,
    };
    const fetchCart = async () => {
        try {
            const response = await fetchApi({ url: API_ENDPOINTS.CART, method: 'GET', customHeaders });
            setCartData(response.data.cart_items);
        } catch (error) {
            console.log(error);
        }
    };
    useEffect(()=>{
        fetchCart();
    })
    return (
        <CartDataContext.Provider value={{ cartData, setCartData,fetchCart }}>
            {children}
        </CartDataContext.Provider>
    )
}

export default CartContext;