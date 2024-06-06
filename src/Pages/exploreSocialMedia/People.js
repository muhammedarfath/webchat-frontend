import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import axios from "axios";
import { Link } from "react-router-dom";
import Layout from "../../Components/Layout/Layout";

function People() {
  const [users, setUsers] = useState([]);
  const current_userId = useSelector((state) => state.auth.user_id);
  const username = useSelector((state) => state.auth.username);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    const fetchAllUsers = async () => {
      setIsLoading(true);
      try {
        const response = await axios.post(
          "http://127.0.0.1:8000/chat/suggested_friends/",
          {
            current_userId,
          }
        );
        const usersWithFollowStatus = response.data.map((user) => ({
          ...user,
          isFollowed: false,
        }));
        setUsers(usersWithFollowStatus);
      } catch (error) {
        alert(error);
      }
      setIsLoading(false);
    };
    fetchAllUsers();
  }, [current_userId]);

  const handleFollow = async (userId) => {
    try {
      const response = await axios.post(
        "http://127.0.0.1:8000/chat/send_follow_request/",
        {
          followerId: current_userId,
          userId: userId,
        }
      );
      if (response.data) {
        console.log('success');
        setUsers(
          users.map((user) => 
            user.id === userId
              ? {
                  ...user,
                  isFollowed: !user.isFollowed,
                }
              : user
          )
        );
      } else {
        alert("something went wrong");
      }
    } catch (error) {
      console.log(error);
    }
  
    handleNotification(userId);
  };

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
  
  return (
    <div className="h-screen overflow-auto w-full">
      <div className="flex justify-center items-center mt-16">
        <div className="border-none w-[600px] h-screen overflow-y-auto">
          <div className="flex items-center p-6 justify-between">
            <div className="flex items-center gap-2">
              <h1 className="font-bold">Suggested</h1>
            </div>
          </div>

          {users.map((user) => (
            <div className="cursor-pointer bg-opacity-100 flex items-center justify-between ml-9 mt-1 mr-9 rounded-lg relative" key={user.id}>
              <div className="w-10 h-10 overflow-hidden">
                {user.image ? (
                  <img
                    src={`http://127.0.0.1:8000${user.image}`}
                    className="w-full h-full rounded-full"
                    alt="image"
                  />
                ) : (
                  <img
                    src="images/profil-image.webp"
                    className="w-full h-full rounded-full"
                    alt="image"
                  />
                )}
              </div>
              <div className="flex flex-col items-start ml-3">
                <Link to={`/profile/${user.user.username}`}>
                  <h1 className="text-1xl mt-3 font-medium ">
                    {user.user.username}
                  </h1>
                </Link>
                <small>arfathusr</small>
                <small>Suggested for you</small>
              </div>
              <div className="flex gap-3 items-end ml-auto">
                {user.isFollowed ? (
                  <button
                    className="bg-[#080b0c] p-2 px-5 rounded-xl text-white font-medium"
                    onClick={() => handleFollow(user.id)}
                  >
                    Requested
                  </button>
                ) : (
                  <button
                    className="bg-[#0095F6] p-2 px-5 rounded-xl text-white font-medium"
                    onClick={() => handleFollow(user.id)}
                  >
                    Follow
                  </button>
                )}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default People;
