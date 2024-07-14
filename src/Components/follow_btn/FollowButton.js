import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';

function FollowButton({ follow_user,follow_status }) {
  const current_userId = useSelector((state) => state.auth.user_id);
  const username = useSelector((state) => state.auth.username);
  const [isRequested, setIsRequested] = useState(false);
  const [followStatus, setFollowStatus] = useState('');

  

  // const handleNotification = (userId) => {
  //   const socket = new WebSocket(`ws://localhost:8000/ws/notification/${userId}/`);

  //   socket.onopen = () => {
  //     console.log('WebSocket connection established');
  //     socket.send(
  //       JSON.stringify({
  //         message: `${username} has requested to follow you.`,
  //         command: "new_notify",
  //       })
  //     );
  //   };

  //   socket.onerror = (error) => {
  //     console.error('WebSocket Error: ', error);
  //   };
  // };

  useEffect(() => {
    const fetchFollowStatus = async () => {
      try {
        const response = await axios.get('http://127.0.0.1:8000/app_profile/check_relationship/', {
          params: { current_userId, follow_user },
        });
        setFollowStatus(response.data.status);
      } catch (error) {
        console.error('Error fetching follow status:', error);
      }
    };

    fetchFollowStatus();
  }, [current_userId, follow_user]);

  const handleFollowBack = async () => {
    try {
      const response = await axios.post(
        'http://127.0.0.1:8000/app_profile/follow_back_request/',
        {
          current_user: current_userId,
          follow_user: follow_user,
        }
      );
      if (response.data.message === 'Followed back successfully') {
        setFollowStatus('followed');
      } else if (response.data.message === 'Already following') {
        setFollowStatus('followed');
      } else {
        alert('Something went wrong');
      }
    } catch (error) {
      console.log(error);
    }
  };


  const handleFollow = async () => {
    try {
      const response = await axios.post(
        "http://127.0.0.1:8000/app_profile/send_follow_request/",
        {
          current_user: current_userId,
          follow_user: follow_user,
        }
      );
      if (response.data) {
        console.log('success');
      } else {
        alert("Something went wrong");
      }
    } catch (error) {
      console.log(error);
    }

    // handleNotification(user.id);
  };


  

  return (
    <div className="flex gap-3 items-end cursor-pointer">
      {followStatus === 'self' ? (
        <div className="shadow-sm px-5 py-3 rounded-3xl bg-[#282828] text-white">
          <span className="font-semibold text-sm">It's You</span>
        </div>
      ) : followStatus === 'requested' ? (
        <div className="shadow-sm px-5 py-3 rounded-3xl bg-[#282828] text-white">
          <span className="font-semibold text-sm">Requested</span>
        </div>
      ) : followStatus === 'followed' ? (
        <div className="shadow-sm px-5 py-3 rounded-3xl bg-[#282828] text-white">
          <span className="font-semibold text-sm">Following</span>
        </div>
      ) : followStatus === 'following' ? (
        <div className="shadow-sm px-5 py-3 rounded-3xl bg-[#282828] text-white" onClick={handleFollowBack}>
          <span className="font-semibold text-sm">Follow Back</span>
        </div>
      ) : (
        <div className="shadow-sm px-5 py-3 rounded-3xl text-white hover:bg-[#d5d5d5] bg-[#E60022]" onClick={handleFollow}>
          <span className="font-semibold text-sm">Follow</span>
        </div>
      )}
    </div>
  );
}

export default FollowButton;




