import React, { useEffect, useState } from "react";
import { IoIosArrowDown, IoIosSearch } from "react-icons/io";
import { BsThreeDotsVertical } from "react-icons/bs";
import { RiMessage3Line } from "react-icons/ri";
import { BiCheckDouble } from "react-icons/bi";
import axios from "axios";
import { useNavigate, Link } from "react-router-dom";
import { useSelector } from "react-redux";
import { OnlineUser } from "../onlineuser/OnlineUser";

function Friends({ fetchUserIdDetails, username }) {
  const current_userId = useSelector((state) => state.auth.user_id);
  const navigate = useNavigate();
  const [users, setUsers] = useState([]);
  const [fetchedProfileUser, setFetchedProfileUser] = useState(false);

  useEffect(() => {
    const fetchAllUsers = async () => {
      try {
        const response = await axios.post("http://127.0.0.1:8000/chat/users/", {
          current_userId,
        });

        if (response.status === 200 || response.status === 204) {
          const data = response.data;
          setUsers((prevUsers) => [...prevUsers, ...data]);
        }
      } catch (error) {
        console.error("Error fetching users:", error);
      }
    };

    fetchAllUsers();
  }, [current_userId]);



  useEffect(() => {
    if (username && !fetchedProfileUser) {
      const fetchProfileUser = async () => {
        try {
          const response = await axios.post("http://127.0.0.1:8000/app_profile/userprofile/", {
            username,
          });

          if (response.status === 200) {
            const data = response.data;
            setUsers((prevUsers) => [data, ...prevUsers]);
            setFetchedProfileUser(true);
          } else {
            setUsers((prevUsers) => [...prevUsers]);
          }
        } catch (error) {
          console.error("Error fetching user profile:", error);
          setUsers((prevUsers) => [...prevUsers]);
        }
      };

      fetchProfileUser();
    }
  }, [username, fetchedProfileUser]);




  const handleChat = async (id, username) => {
    try {
      const response = await axios.post(`http://127.0.0.1:8000/chat/${username}/`, {
        user_id: id,
      });

      if (response.status === 200) {
        const data = response.data;
        fetchUserIdDetails(
          data.id,
          data.user.email,
          data.user.username,
          data.image,
          data.full_name,
          data.bio
        );
      } else {
        console.log("something went wrong");
      }
    } catch (error) {
      alert(error);
    }
  };

  return (
    <div className="border-none w-full h-screen bg-[#FFFFFF]">
      <div className="flex items-center border-b-1 border-b-gray p-6 justify-between">
        <div className="flex items-center gap-2">
          <h1 className="font-bold">All Chats</h1>
          <IoIosArrowDown className="font-bold" />
        </div>
        <div className="flex items-center ml-3 gap-3">
          <IoIosSearch className="text-2xl font-bold" />
          <BsThreeDotsVertical />
        </div>
      </div>

      {users.length === 0 ? (<div className="flex flex-col w-full p-5">
        <h1 className="font-medium text-[#424242]">Notes</h1>
        <h2 className="text-lg font-medium text-gray-500 mb-4">....</h2>
      </div>):(
        <div className="flex flex-col w-full p-5">
        <h1 className="font-medium text-[#424242]">Notes</h1>
          <OnlineUser/>
      </div>
      )}

      <div className="flex items-center ml-9 mt-5 gap-3">
        <RiMessage3Line className="text-2xl font-bold" />
        <h1>Recent Chat</h1>
      </div>
      
      {users.length === 0 ? (
        <div className="flex flex-col justify-center items-center h-full">
          <h2 className="text-lg font-medium text-gray-500 mb-4">You have no friends</h2>
          <Link to='/people'>
            <button className="px-4 py-2 bg-[#E9E9E9] text-black hover:bg-[#d5d5d5] rounded-md">
              Add New Message
            </button>
          </Link>
        </div>
      ) : (
        users.map(( user ) => (
          <div
            key={user.id}
            onClick={() => handleChat(user.id, user.user.username)}
            className="hover:bg-[#d5d5d5] cursor-pointer bg-opacity-100 flex items-center justify-between border border-gray mb-3 ml-9 mt-3 mr-9 p-3 rounded-lg relative"
          >
            <div className="w-9 h-9 overflow-hidden">
              {user.image ? (
                <img
                  src={`http://127.0.0.1:8000${user.image}`}
                  className="w-full h-full rounded-full"
                  alt="image"
                />
              ) : (
                <img
                  src="/images/profile-image.webp"
                  className="w-full h-full rounded-full"
                  alt="image"
                />
              )}
              <span className="absolute top-4 left-9 border-1 border-white bg-green-500 rounded-full w-3 h-3"></span>
            </div>
            <div className="flex flex-col items-start ml-3">
              <h1 className="text-1xl font-medium">{user.user.username}</h1>
              <small>hai</small>
            </div>
            <div className="flex flex-col items-end ml-auto">
              <small>10:20</small>
              <BiCheckDouble className="text-sm" />
            </div>
          </div>
        ))
      )}
    </div>
  );
}

export default Friends;
