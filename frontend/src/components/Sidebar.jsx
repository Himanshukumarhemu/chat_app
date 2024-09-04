import React, { useState } from 'react';
import { FcSearch } from "react-icons/fc";
import OtherUsers from "./OtherUsers";
import axios from 'axios';
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from 'react-redux';
import { setSocket } from '../redux/socketSlice'; // Adjust import path as needed

const Sidebar = () => {
  const [search, setSearch] = useState("");
  const [filteredUsers, setFilteredUsers] = useState([]);
  const { otherUsers } = useSelector(store => store.user);
  const socket = useSelector(store => store.socket.socket);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const logoutHandler = async () => {
    try {
      // Perform logout request
      const res = await axios.get(`http://localhost:8080/api/v1/user/logout`);
      console.log(res);
      
      // Disconnect socket
      if (socket) {
        socket.disconnect();
        dispatch(setSocket(null)); // Clear the socket from Redux state
      }
      
      // Navigate to login page and show success message
      navigate("/login");
      toast.success(res.data.message);
    } catch (error) {
      console.error('Error during logout:', error);
      toast.error('Failed to log out. Please try again.');
    }
  };

  const searchSubmitHandler = (e) => {
    e.preventDefault();
    if (search.trim() === "") {
      // If search input is empty, reset to show all users
      setFilteredUsers([]);
    } else {
      const conversationUser = otherUsers?.filter(user =>
        user.fullName.toLowerCase().includes(search.toLowerCase())
      );
      setFilteredUsers(conversationUser);
    }
  };

  // Automatically reset the search results when the search input is cleared
  const handleSearchChange = (e) => {
    setSearch(e.target.value);
    if (e.target.value.trim() === "") {
      setFilteredUsers([]);
    }
  };

  return (
    <div className='border-r border-slate-500 p-4 flex flex-col'>
      <form onSubmit={searchSubmitHandler} className='flex items-center gap-2'>
        <input 
          value={search}
          onChange={handleSearchChange}
          className='input input-bordered rounded-md'
          type="text"
          placeholder='Search....'
        />
        <button type="submit" className='btn bg-zinc-800 text-white'>
          <FcSearch className='w-6 h-6 outline-none'/>
        </button>
      </form>
       
      <div className="divider px-3"></div>
      <OtherUsers filteredUsers={filteredUsers} /> {/* Pass filtered users */}
      <div className='mt-2'>
        <button onClick={logoutHandler} className='btn btn-sm'>LogOut</button>
      </div>
    </div>
  );
};

export default Sidebar;
