import React, { useEffect, useRef, useState } from 'react';
import { IoVideocamSharp } from "react-icons/io5";
import { IoCallSharp } from "react-icons/io5";
import { IoIosContact } from "react-icons/io";
import { FaSearch } from "react-icons/fa";
import { Dropdown, DropdownTrigger, DropdownMenu, DropdownItem, Avatar, User } from "@nextui-org/react";
import { useSelector } from 'react-redux';
import Message from './Message';
import MessageInput from './MessageInput';
import MessageInpu from './MessageInpu';

function ChatArea({ userArr }) {
    const [messages, setMessages] = useState([]);
    const senderId = useSelector(state => state.auth.user_id);
    const messagesContainerRef = useRef(null);

    useEffect(() => {
        const socket = new WebSocket(`ws://localhost:8000/ws/chat/${userArr.id}_${senderId}/`);

        const fetchMessages = () => {
            socket.send(JSON.stringify({ 'command': 'fetch_messages' }));
        };

        socket.onopen = () => {
            fetchMessages();
        };

        socket.onmessage = function (e) {
            const data = JSON.parse(e.data);
            if (data['command'] === 'messages') {
                setMessages(data['messages']);
            } else if (data['command'] === 'new_message') {
                setMessages(prevMessages => [...prevMessages, data['message']]);
            }
        };

        socket.onclose = function (e) {
            console.error('Chat socket closed unexpectedly');
        };


    }, [userArr]);

    useEffect(() => {
        if (messagesContainerRef.current) {
            messagesContainerRef.current.scrollTop = messagesContainerRef.current.scrollHeight;
        }
    }, [messages]);


    return (
        <div className="hidden  lg:block rounded-lg bg-white h-screen">
            <header className="w-full z-30 border-b-1 border-b-gray top-0 text-dark p-[13px] flex items-center justify-between bg-white">
                <div className="flex gap-4 items-center">
                    <div>
                        <Dropdown placement="bottom-start">
                            <DropdownTrigger>
                                <User
                                    as="button"
                                    avatarProps={{
                                        isBordered: true,
                                        src: `http://127.0.0.1:8000${userArr.image}`,
                                    }}
                                    className="transition-transform font-semibold gap-4"
                                    description='Last Seen at 07:15 PM'
                                    name={userArr.username.toUpperCase()}

                                />
                            </DropdownTrigger>
                            <DropdownMenu aria-label="User Actions" variant="flat">
                                <DropdownItem key="profile" className="h-14 gap-2">
                                    <p className="font-bold">Signed in as</p>
                                    <p className="font-bold">@tonyreichert</p>
                                </DropdownItem>
                                <DropdownItem key="settings">My Settings</DropdownItem>
                                <DropdownItem key="team_settings">Team Settings</DropdownItem>
                                <DropdownItem key="analytics">Analytics</DropdownItem>
                                <DropdownItem key="system">System</DropdownItem>
                                <DropdownItem key="configurations">Configurations</DropdownItem>
                                <DropdownItem key="help_and_feedback">Help & Feedback</DropdownItem>
                                <DropdownItem key="logout" color="danger">Log Out</DropdownItem>
                            </DropdownMenu>
                        </Dropdown>
                    </div>
                </div>
                <div className='flex gap-2 justify-center items-center mr-7'>
                    <div className="border-solid border-1 rounded-lg border-white bg-[#F4F4F4] p-2">
                        <IoVideocamSharp className="text-[#420BA1] text-1xl" />
                    </div>
                    <div className="border-solid border-1 rounded-lg bg-[#F4F4F4] border-white p-2">
                        <IoCallSharp className="text-[#420BA1] text-1xl" />
                    </div>
                    <div className="border-solid border-1 rounded-lg bg-[#F4F4F4] border-white p-2">
                        <FaSearch className="text-[#420BA1] text-1xl" />
                    </div>
                </div>

            </header>
            <div className="messages-container w-full z-0 mt-[60px] pb-[70px]" ref={messagesContainerRef}>
                {messages.map((message, index) => (
                    <Message key={index} text={message} sent={message.author === userArr.username} />
                ))}
            </div>

            <div className="relative bottom-20 w-full">
                <MessageInpu userArr={userArr}/>
                {/* <MessageInput userArr={userArr} /> */}
            </div>
        </div>
    );
}

export default ChatArea;
