import React, { createContext, useState } from 'react'

export const CartDataContext = createContext();

const CartContext = ({ children }) => {
    const [cartData, setCartData] = useState([]);

    return (
        <CartDataContext.Provider value={{ cartData, setCartData }}>
            {children}
        </CartDataContext.Provider>
    )
}

export default CartContext;