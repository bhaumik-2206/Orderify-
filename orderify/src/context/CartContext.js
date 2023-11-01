import React, { createContext, useEffect, useState } from 'react'
import fetchApi from '../util/helper';
import { API_ENDPOINTS } from '../config/api';
import { toast } from 'react-toastify';

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

    const changeQuantityContext = async (productId, operation) => {
        const currentQuantity = cartData.find((item) => item.cartitm_fk_prd_id._id === productId).cartitm_prd_qty;
        if (currentQuantity === 5 && operation) {
            toast.error("Maxinum Quantity");
            return;
        }
        // if (currentQuantity === 1 && !operation) {

        // }
        try {
            let response = await fetchApi({
                url: API_ENDPOINTS.CART, method: "POST",
                data: { cartitm_fk_prd_id: productId, cartitm_prd_qty: (operation ? currentQuantity + 1 : currentQuantity - 1) }
                , isAuthRequired: true
            });
            if (response.status === 200) {
                setCartData(pre => pre.map(p => {
                    return p.cartitm_fk_prd_id._id === productId ? {
                        ...p,
                        cartitm_prd_qty: (operation ? p.cartitm_prd_qty + 1 : p.cartitm_prd_qty - 1)
                    } : p
                }))
            }
            if (currentQuantity === 1 && !operation) {
                toast.success("Item Removed Successfully");
                setCartData([]);
            }
        } catch (error) {
            toast.error("Error to add item");
        }
    }

    useEffect(() => {
        userData && userData.user_role === "user" && fetchCart();
    }, [])


    return (
        <CartDataContext.Provider value={{ cartData, setCartData, fetchCart, totalAmount, changeQuantityContext }}>
            {children}
        </CartDataContext.Provider>
    )
}

export default CartContext;