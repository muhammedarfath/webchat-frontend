import React, { useEffect, useState } from 'react'
import { IoMdSend } from "react-icons/io";
import { useSelector } from 'react-redux';
import { GrEmoji } from "react-icons/gr";
import { MdOutlineMicOff } from "react-icons/md";

function MessageInput({ userArr }) {
    const [message, setMessage] = useState('')
    const senderId = useSelector(state => state.auth.user_id)
    const socket = new WebSocket(`ws://localhost:8000/ws/chat/${userArr.id}_${senderId}/`);

    const handleInputMessage = () => {
        socket.send(JSON.stringify({
            'message': message,
            'command': 'new_message',
        }));    
    }

    return (
        <div className="flex items-center bg-[#f5f5f5]">
            <div className='flex gap-3 ml-5'>
                <div className='rounded-full  border-solid border-1 cursor-pointer border-white bg-[#fff] p-2'>
                    <GrEmoji className="text-2xl" />
                </div>
                <div className='rounded-full  border-solid border-1 cursor-pointer border-white bg-[#fff] p-2'>
                    <MdOutlineMicOff className="text-2xl" />

                </div>

            </div>
            <div className="flex-grow mr-5 w-full">
                <input
                    value={message}
                    onChange={(e) => setMessage(e.target.value)}
                    placeholder="Type Your Message Here....."
                    className="p-3 rounded-lg w-full bg-white m-5 shadow-md"
                />
            </div>
            <button
                onClick={handleInputMessage}
                className="m-4 border-solid border-1 text-white rounded-lg border-gray bg-[#420BA1] p-3 transition-colors duration-100 shadow-lg hover:bg-transparent hover:text-[#420BA1]"
            >
                <IoMdSend className="text-2xl" />
            </button>

        </div>
    );
}

export default MessageInput
