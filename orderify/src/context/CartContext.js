import React, { createContext, useEffect, useState } from 'react'
import fetchApi from '../util/helper';
import { API_ENDPOINTS } from '../config/api';

export const CartDataContext = createContext();

const CartContext = ({ children }) => {
    const [cartData, setCartData] = useState([]);
    const [totalAmount, setTotalAmount] = useState("");
    const userData = JSON.parse(localStorage.getItem('userData'));

    const fetchCart = async () => {
        try {
            const response = await fetchApi({ url: API_ENDPOINTS.CART, method: 'GET', isAuthRequired: true });
            setCartData(response.data.cart_items);
            setTotalAmount(response.data.cart_total_amount);
        } catch (error) {
            console.log(error);
        }
    };
    useEffect(() => {
        // fetchCart();
        userData.user_role === "user" && fetchCart();
    }, [])


    return (
        <CartDataContext.Provider value={{ cartData, setCartData, fetchCart, totalAmount }}>
            {children}
        </CartDataContext.Provider>
    )
}

export default CartContext;