import { Navigate } from "react-router-dom";

const fetchApi = async ({ url, method, data, isAuthRequired = null }) => {
    const token = localStorage.getItem("auth");
    const customHeaders = isAuthRequired && {
        "authorization": `Bearer ${token}`,
    };

    try {
        const headers = {
            'Content-Type': 'application/json',
            ...customHeaders
        };
        const requestConfig = { method, headers };
        if (data) {
            requestConfig.body = JSON.stringify(data);
        }
        const response = await fetch(url, requestConfig);
        const result = await response.json();

        if (result.message === "jwt expired") {
            localStorage.removeItem("auth");
            localStorage.removeItem("userData");
            // navigate("/login");
        }
        return result;
    } catch (error) {
        console.error("ERROR: " + error);
    }
};
export default fetchApi;