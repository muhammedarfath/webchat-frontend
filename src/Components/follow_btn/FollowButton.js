import axios from 'axios';
import React, { useState } from 'react';
import { useSelector } from 'react-redux';

function FollowButton({ user, currentUser }) {
  const current_userId = useSelector((state) => state.auth.user_id);
  const username = useSelector((state) => state.auth.username);
  const [isRequested, setIsRequested] = useState(false);

  const handleNotification = (userId) => {
    const socket = new WebSocket(`ws://localhost:8000/ws/notification/${userId}/`);

    socket.onopen = () => {
      console.log('WebSocket connection established');
      socket.send(
        JSON.stringify({
          message: `${username} has requested to follow you.`,
          command: "new_notify",
        })
      );
    };

    socket.onerror = (error) => {
      console.error('WebSocket Error: ', error);
    };
  };

  const handleFollow = async () => {
    try {
      const response = await axios.post(
        "http://127.0.0.1:8000/chat/send_follow_request/",
        {
          followerId: current_userId,
          userId: user.id,
        }
      );
      if (response.data) {
        console.log('success');
        setIsRequested(prevState => !prevState); 
      } else {
        alert("Something went wrong");
      }
    } catch (error) {
      console.log(error);
    }

    handleNotification(user.id);
  };

console.log(isRequested);


  const isFollowing = (followers, currentUser) => {
    return followers.some((follower) => follower.username === currentUser);
  };


  

  return (
    <div className="flex gap-3 items-end cursor-pointer">
        {isFollowing(user.followers, currentUser) && isRequested ?(
            <div className="shadow-sm p-1.5 px-4 rounded-md bg-[#282828] text-white">
            <span className="font-semibold text-sm " onClick={handleFollow} >Requested</span>
            </div>
        ) : (
            <div className="shadow-sm p-1.5 px-4 text-white rounded-md bg-[#0095F6]">
            <span className="font-semibold text-sm" onClick={handleFollow} >Follow</span>
            </div>
        )}
    </div>
  );
}

export default FollowButton;




