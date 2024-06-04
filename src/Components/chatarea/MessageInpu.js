import React, { useState } from 'react'
import { PlaceholdersAndVanishInput } from "../../Components/ui/placeholders-and-vanish-input";
import { GrEmoji } from "react-icons/gr";
import { MdOutlineMicOff } from "react-icons/md";
import { useSelector } from 'react-redux';

function MessageInpu({userArr}) {

    const [message, setMessage] = useState('')
    const senderId = useSelector(state => state.auth.user_id)
    const socket = new WebSocket(`ws://localhost:8000/ws/chat/${userArr.id}_${senderId}/`);

    const handleInputMessage = () => {
        socket.send(JSON.stringify({
            'message': message,
            'command': 'new_message',
        }));
    }



    const placeholders = [
        "What's the first rule of Fight Club?",
        "Who is Tyler Durden?",
        "Where is Andrew Laeddis Hiding?",
        "Write a Javascript method to reverse a string",
        "How to assemble your own PC?",
      ];
     
      const handleChange = (e) => {
        setMessage(e.target.value)
      };
      const onSubmit = (e) => {
        e.preventDefault();
        handleInputMessage();
      };
      return (
        <div className="absolute flex items-center bg-[#f5f5f5] p-4 w-full">
            <div className='flex gap-3 ml-5'>
                <div className='rounded-full  border-solid border-1 cursor-pointer border-white bg-[#fff] p-2'>
                    <GrEmoji className="text-2xl" />
                </div>
                <div className='rounded-full  border-solid border-1 cursor-pointer border-white bg-[#fff] p-2'>
                    <MdOutlineMicOff className="text-2xl" />

                </div>

            </div>

            <div className=" flex flex-col justify-center w-full items-center px-4">

            <PlaceholdersAndVanishInput
                placeholders={placeholders}
                onChange={handleChange}
                onSubmit={onSubmit}
            />
            </div>
        </div>
      );
    }

export default MessageInpu
