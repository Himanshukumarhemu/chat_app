import React, { useRef } from 'react'
import { IoIosSend } from "react-icons/io";
import { useState } from 'react';
import axios from "axios";
import { useDispatch, useSelector } from 'react-redux';
import store from '../redux/store';
import { setMessages } from '../redux/messageSlice';


const SendInput = () => {
  const[message,setMessage] = useState("");
  const dispatch = useDispatch();
  const {selectedUser}= useSelector(store=>store.user);
  const {messages}=useSelector(store=>store.message);

  const onSubmithandler = async(e) =>{
    e.preventDefault();
    try {
      const res = await axios.post(`http://localhost:8080/api/v1/message/send/${selectedUser?._id}`,{message},{
        headers:{
          "Content-Type":"application/json"
        },
        withCredentials:true
      });
      console.log(res);
      dispatch(setMessages([...messages,res?.data?.newMessage]))
      
    } catch (error) {
      console.log(error);
      
    }
    setMessage("");
  }
  return (
   <form onSubmit={onSubmithandler} className='px-4 my-3'>
    <div className='w-full relative'>
        <input 
        value={message}
        onChange={(e)=> setMessage(e.target.value)}
        type="text"
        placeholder='Send Message'
        className='border text-sm rounded-lg block w-full p-3 border-zinc-500 bg-gray-600 text-white'/>
        <button  type="submit" className='absolute flex inset-y-0 end-0  items-center pr-4'>
        <IoIosSend />
        </button>
    </div>
   </form>
  )
}

export default SendInput
