import React, { useEffect, useRef, useState } from "react";
import { FiVideo } from "react-icons/fi";
import { FiPhone } from "react-icons/fi";
import { IoSearch } from "react-icons/io5";

import { useSelector } from "react-redux";
import Message from "./Message";
import MessageInput from "./MessageInput";
import ChatProfileDropdown from "./ChatProfileDropdown";

function ChatArea({ userArr }) {
  const [messages, setMessages] = useState([]);
  const senderId = useSelector((state) => state.auth.user_id);
  const messagesContainerRef = useRef(null);


  useEffect(() => {
    const socket = new WebSocket(
      `ws://localhost:8000/ws/chat/${userArr.id}_${senderId}/`
    );

    const fetchMessages = () => {
      socket.send(JSON.stringify({ command: "fetch_messages" }));
    };

    socket.onopen = () => {
      fetchMessages();
    };

    socket.onmessage = function (e) {
      const data = JSON.parse(e.data);
      if (data["command"] === "messages") {
        setMessages(data["messages"]);
      } else if (data["command"] === "new_message") {
        setMessages((prevMessages) => [...prevMessages, data["message"]]);
      }
    };

    socket.onclose = function (e) {
      console.error("Chat socket closed unexpectedly");
    };
  }, [userArr]);

  useEffect(() => {
    if (messagesContainerRef.current) {
      messagesContainerRef.current.scrollTop =
        messagesContainerRef.current.scrollHeight;
    }
  }, [messages]);


  console.log(messages,"this are the messages.........");

  return (
    <div className="hidden lg:block rounded-lg bg-white h-screen">
      <header className="w-full z-30 border-b-1 border-b-gray top-0 text-dark p-[13px] flex items-center justify-between bg-white">
        <div className="flex gap-4 items-center">
          <ChatProfileDropdown userArr={userArr} />
        </div>
        <div className="flex gap-2 justify-center items-center mr-7">
          <div className="border-solid border-1 rounded-lg border-white bg-[#F4F4F4] p-2">
            <FiVideo className="text-black text-1xl" />
          </div>
          <div className="border-solid border-1 rounded-lg bg-[#F4F4F4] border-white p-2">
            <FiPhone className="text-black text-1xl" />
          </div>
          <div className="border-solid border-1 rounded-lg bg-[#F4F4F4] border-white p-2">
            <IoSearch className="text-black text-1xl" />
          </div>
        </div>
      </header>
      <div
        className="messages-container w-full h-full z-0"
        ref={messagesContainerRef}
      >
        {messages.map((message, index) => (
          <Message
            key={index}
            text={message}
            is_read={message.is_read}
            sent={message.author === userArr.username}
            userArr={userArr}
          />
        ))}
      </div>
      <div className="relative bottom-8 w-full">
        <MessageInput userArr={userArr} />
      </div>
    </div>
  );
}

export default ChatArea;
