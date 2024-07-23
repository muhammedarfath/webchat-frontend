import React, { useEffect, useState } from "react";
import { RiMessage3Line } from "react-icons/ri";
import { BiCheckDouble } from "react-icons/bi";
import axios from "axios";
import { Link } from "react-router-dom";
import { useSelector } from "react-redux";
import requests from "../../utils/urls";
import { showErrorToast } from "../../utils/Toaser";
import ContactAreaHeader from "./ContactAreaHeader";
import Avatar_profile from "../avatar/Avatar_profile";
function Friends({ setSearchParams }) {
  const current_userId = useSelector((state) => state.auth.user_id);
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchAllUsers = async () => {
      setLoading(true);
      try {
        const response = await axios.post(`${requests.fetchAllUser}`, {
          current_userId,
        });
        if (response.status === 200 || response.status === 204) {
          const data = response.data;
          setUsers((prevUsers) => [...prevUsers, ...data]);
        }
      } catch (error) {
        showErrorToast("Error fetching users:", error);
      } finally {
        setLoading(false);
      }
    };
    fetchAllUsers();
  }, [current_userId]);

  return (
    <>
      {!loading && (
        <div className="border-none w-full h-screen bg-[#FFFFFF]">
          <ContactAreaHeader users={users} />
          <div className="flex items-center ml-9 mt-5 gap-3">
            <RiMessage3Line className="text-2xl font-bold" />
            <h1>Recent Chat</h1>
          </div>
          {users.length === 0 ? (
            <div className="flex flex-col justify-center items-center h-full">
              <h2 className="text-lg font-medium text-gray-500 mb-4">
                You have no friends
              </h2>
              <Link to="/people">
                <button className="px-4 py-2 bg-black text-white hover:bg-gray-900 rounded-md">
                  Add New Message
                </button>
              </Link>
            </div>
          ) : (
            users.map((user) => (
              <div
                key={user.id}
                onClick={() =>
                  setSearchParams({ user: user.user.username, id: user.id })
                }
                className="hover:bg-[#eaf5fb] cursor-pointer bg-opacity-100 flex items-center justify-between border border-gray mb-3 ml-9 mt-3 mr-9 p-3 rounded-lg relative"
              >
                <div className="w-9 h-9 overflow-hidden">
                  {user.image ? (
                    <Avatar_profile image={user.image} size="md" />
                  ) : (
                    <Avatar_profile username={user.user.username} size="md" />
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
      )}
    </>
  );
}

export default Friends;
