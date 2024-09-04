import React from "react";
import OtherUser from "./OtherUser";
import useGetOtherUsers from "../hooks/useGetOtherUsers";
import { useSelector } from "react-redux";

const OtherUsers = ({ filteredUsers }) => {
  // Custom hook to fetch other users
  useGetOtherUsers();

  const { otherUsers } = useSelector(store => store.user);

  // Determine which list to display: filtered or full
  const usersToDisplay = filteredUsers && filteredUsers.length > 0 ? filteredUsers : otherUsers;

  if (!usersToDisplay || usersToDisplay.length === 0) {
    return <p>No users found</p>; // Show message if no users to display
  }

  return (
    <div className="overflow-auto flex-1">
      {usersToDisplay.map((user) => (
        <OtherUser key={user._id} user={user} />
      ))}
    </div>
  );
};

export default OtherUsers;
