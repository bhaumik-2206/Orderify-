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

    if (!response.ok) {
      throw new Error(`HTTP error! Status: ${response.status}`);
    }

    const result = await response.json();
    console.log(result)
    if (result.status === 200) {
      // localStorage.setItem("auth", result.token)
      toast.success(`${endpoint} Successfully`);
    } else {
      toast.error(result.message);
    }
    return result;
  } catch (error) {

    throw error;
  }
};

export default fetchApi;
