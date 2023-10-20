import { toast } from "react-toastify";

export const fetchApi = async (endpoint, data) => {
    try {
        const response = await fetch(`https://orderify-qebp.onrender.com/${endpoint}`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(data),
        });

        const result = await response.json();
        if (response.ok) {
            // console.log(result)
            if (result.status === 200) {
                toast.success(`${endpoint} Successfully`);
            } else {
                toast.error(result.message);
            }
        }else{
            toast.error(result.message);
        }
        return result;
    } catch (error) {
        console.log("ERROR: " + error)
    }
};

export default fetchApi;
