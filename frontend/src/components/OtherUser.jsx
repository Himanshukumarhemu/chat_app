import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { setSelectedUser } from '../redux/userSlice';

const OtherUser = ({ user }) => {
  const dispatch = useDispatch(); //dispatch the selected user information

  const { selectedUser, onlineUsers } = useSelector(store => store.user); //to stay on the clicked user

  // Check if onlineUsers is not null or undefined before using .includes()
  const isOnline = onlineUsers ? onlineUsers.includes(user._id) : false;

  const selectedUserHandler = (user) => {
    dispatch(setSelectedUser(user));
  };

  return (
    <>
      <div 
        onClick={() => selectedUserHandler(user)} 
        className={`${selectedUser?._id === user?._id ? 'bg-zinc-900' : ''} flex gap-2 items-center hover:bg-zinc-900 rounded-sm p-2 cursor-pointer`}
      >
        <div className={`avatar ${isOnline ? 'online' : ''}`}>
          <div className="w-12 rounded-full">
            <img src={user?.profilephoto} alt="user-profile" />
          </div>
        </div>
        <div className="flex flex-col flex-1">
          <div className="flex justify-between gap-2">
            <p>{user?.fullName}</p>
          </div>
        </div>
      </div>
      <div className="divider my-0 py-0 h-1"></div>
    </>
  );
};

export default OtherUser;
