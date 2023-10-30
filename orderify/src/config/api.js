const API_BASE_URL = 'https://orderify-qebp.onrender.com';

export const API_ENDPOINTS = {
    LOGIN: `${API_BASE_URL}/login`,
    REGISTER: `${API_BASE_URL}/register`,
    PRODUCT: `${API_BASE_URL}/product`,
    CART: `${API_BASE_URL}/cart`,

    // Order API
    ADMIN_ORDERS: `${API_BASE_URL}/order`,      // Admin Order Details
    // USER_ORDER: `${API_BASE_URL}/order`,         // User Order Details
};