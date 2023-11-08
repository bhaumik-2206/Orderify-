import React,{useEffect,useState} from 'react'
import fetchApi from "../../util/helper";
import { API_ENDPOINTS } from "../../config/api";
import ConfirmationModal from '../common/ConfirmationModal';
import { toast } from 'react-toastify';

function TimeSetter({onClose}) {
    const [selectedTime, setSelectedTime] = useState({ start_time: "", end_time: "" })
    const [isSetTimeConfShow, setIsSetTimeConfShow] = useState(false);
    useEffect(() => {
        userData.user_role === "admin" && getTime();
    }, [])
    const userData = JSON.parse(localStorage.getItem("userData"));

    const handleChangeTime = async () => {
        
        try {
            await fetchApi({
                url: API_ENDPOINTS.TIMER, method: "PUT", data: selectedTime, isAuthRequired: true
            })
            // onClose();
            toast.success('Time set successfully')
        } catch (error) {
            console.log("ERROR: " + error)
        }
        
    }
    const getTime = async () => {
        try {
            let response = await fetchApi({ url: API_ENDPOINTS.TIMER, method: "GET", isAuthRequired: true })
            if (response.status === 200) {
                setSelectedTime(pre => ({ start_time: response.data.start_time, end_time: response.data.end_time }))
            }
        } catch (error) {
            console.log("ERROR: " + error)
        }
    }
  return (
    <div className='flex h-30 flex-col md:flex-row justify-center items-center bg-gray-800 w-fit rounded px-5 py-3'>
        <ConfirmationModal  show={isSetTimeConfShow} setShow={setIsSetTimeConfShow} handleSubmit = {handleChangeTime}  type = 'setTime' />
       <div className="text-start flex flex-col gap-2">
            <div>
            <label className='text-white' htmlFor='startTime'>Start : </label>
                    <input value={selectedTime.start_time} id='startTime' onChange={(e) => setSelectedTime(pre => ({ ...pre, start_time: e.target.value + ":00" }))} className="border-2 ms-1 bg-[#374151] text-white rounded border-black px-3" type="time" />
            </div>
        <div>
        <label className='text-white' htmlFor='endTime'>End : </label>
                    <input value={selectedTime.end_time} id='endTime' onChange={(e) => setSelectedTime(pre => ({ ...pre, end_time: e.target.value + ":00" }))} className="border-2 bg-[#374151] text-white ms-2 rounded border-black px-3" type="time" />
        </div>
                    <button 
                    disabled={selectedTime.start_time > selectedTime.end_time}
                     onClick={()=>{setIsSetTimeConfShow(true)}} className={`p-1 ${selectedTime.start_time > selectedTime.end_time ? 'bg-gray-500' : 'bg-blue-600 hover:bg-blue-700'} my-2 px-3 text-white text-center sm:text-lg text-xs rounded-md cursor-pointer`}>{selectedTime.start_time > selectedTime.end_time ? 'Invalid' : 'Set'}</button>
                </div>
    </div>
  )
}

export default TimeSetter
