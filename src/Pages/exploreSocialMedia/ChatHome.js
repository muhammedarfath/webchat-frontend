import React, { useState } from "react";
import ChatArea from "../../Components/chatarea/ChatArea";
import Friends from "../../Components/contacts/Friends";
import EmptyChat from "../../Components/contacts/EmptyChat";
import { useLocation } from "react-router-dom";

function ChatHome() {
  const [userId, setUserId] = useState({});
  const location = useLocation();
  const { username } = location.state || {}; 






  const fetchUserIdDetails = (id, email, username, image, full_name, bio) => {
    setUserId({
      id,
      username,
      email,
      image,
      full_name,
      bio,
    });
  };

  return (
    <>
      <div className="flex flex-col md:flex-row w-full lg:w-5/6 h-full">
        <div className="w-full md:w- lg:w-1/3 overflow-y-scroll h-full">
          <Friends fetchUserIdDetails={fetchUserIdDetails} username={username} />
        </div>
        <div className="hidden md:hidden lg:block lg:w-2/3 h-full">
          {Object.keys(userId).length !== 0 ? (
            <ChatArea userArr={userId} />
          ) : (
            <EmptyChat />
          )}
        </div>
      </div>
    </>
  );
}

export default ChatHome;
