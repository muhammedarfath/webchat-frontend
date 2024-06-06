import React, { useEffect, useState } from "react";
import { IoIosArrowDown, IoIosSearch } from "react-icons/io";
import { BsThreeDotsVertical } from "react-icons/bs";
import { RiMessage3Line } from "react-icons/ri";
import { BiCheckDouble } from "react-icons/bi";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";

function Friends({ fetchUserIdDetails }) {
  const current_userId = useSelector((state) => state.auth.user_id);
  const navigate = useNavigate();
  const [users, setUsers] = useState([]);

  useEffect(() => {
    const fetchAllUsers = async () => {
      try {
        const response = await axios.post("http://127.0.0.1:8000/chat/users/", {
          current_userId,
        });

        if (response.status === 200 || response.status === 204) {
          const data = response.data;
          if (!data?.length) {
            navigate("/people");
          }
          setUsers(data);
        }
      } catch (error) {
        console.error("Error fetching users:", error);
      }
    };

    fetchAllUsers();
  }, [current_userId]);

  const handlechat = async (id, username) => {
    try {
      const response = await axios.post(
        `http://127.0.0.1:8000/chat/${username}/`,
        {
          user_id: id,
        }
      );

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
    <>
      {users && (
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

          <div className="ml-9 mt-5 gap-3">
            <h1 className="font-medium text-[#424242]">Online Now</h1>
            <div className="flex w-9 h-9 m-2 gap-4 items-center">
              <img
                src="images/profil-image.webp"
                className="rounded-full"
                alt="image"
              />
              <img
                src="images/profil-image.webp"
                className="rounded-full"
                alt="image"
              />
              <img
                src="images/profil-image.webp"
                className="rounded-full"
                alt="image"
              />
              <img
                src="images/profil-image.webp"
                className="rounded-full"
                alt="image"
              />
            </div>
          </div>

          <div className="flex items-center ml-9 mt-5 gap-3">
            <RiMessage3Line className="text-2xl font-bold" />
            <h1>Recent Chat</h1>
          </div>
          {users.map((user) => (
            <div
              key={user.id}
              onClick={() => handlechat(user.id, user.user.username)}
              className="hover:bg-[#F8E8FF] cursor-pointer bg-opacity-100 flex items-center justify-between border border-gray mb-3 ml-9 mt-3 mr-9 p-3 rounded-lg relative"
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
                    src="images/profil-image.webp"
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
          ))}
        </div>
      )}
    </>
  );
}

export default Friends;
