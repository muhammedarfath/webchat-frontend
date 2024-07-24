import React, { useEffect, useState } from "react";
import ChatArea from "../../Components/chatarea/ChatArea";
import Friends from "../../Components/contacts/Friends";
import EmptyChat from "../../Components/contacts/EmptyChat";
import { useSearchParams } from "react-router-dom";
import axios from "axios";
import requests from "../../utils/urls";
import { showErrorToast } from "../../utils/Toaser";

function ChatHome() {
  const [userDetails, setUserDetails] = useState({});
  const [searchParams, setSearchParams] = useSearchParams();
  const username = searchParams.get("user");
  const id = searchParams.get("id");
  

  const fetchUserIdDetails = (id, email, username, image, full_name, bio) => {
    setUserDetails({
      id,
      username,
      email,
      image,
      full_name,
      bio,
    });
  };

  useEffect(() => {
    const handleChat = async () => {
      try {
        const response = await axios.post(
          `${requests.handleChat}${username}/`,
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
          showErrorToast("Something went wrong");
        }
      } catch (error) {
        showErrorToast("Something went wrong: " + error.message); 
      }
    };
    if (username) handleChat();
  }, [username, id]);


  
  useEffect(() => {
    const fetchPublicMessages = async () => {
      try {
        const response = await axios.get(`${requests.PublicMessages}`);
        console.log(response, "this is public message");
      } catch (error) {
        showErrorToast("Error fetching public messages: " + error.message);
      }
    };
    fetchPublicMessages();
  }, []);



  return (
    <>
      <div className="flex flex-col md:flex-row w-full lg:w-5/6 h-full">
        <div className="w-full lg:w-1/3 overflow-y-scroll h-full">
          <Friends setSearchParams={setSearchParams} />
        </div>
        <div className="hidden md:hidden lg:block lg:w-2/3 h-full">
          {Object.keys(userDetails).length !== 0 ? (
            <ChatArea userArr={userDetails} />
          ) : (
            <EmptyChat />
          )}
        </div>
      </div>
    </>
  );
}

export default ChatHome;
