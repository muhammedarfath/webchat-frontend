import React, { useEffect, useState } from 'react'
import { IoMdSend } from "react-icons/io";
import {Input} from "@nextui-org/react";
import { useSelector } from 'react-redux';

function MessageInput({userArr}) {
    const [message,setMessage]=useState('')
    const current_user = useSelector(state=>state.auth)
    const socket = new WebSocket(`ws://localhost:8000/ws/chat/${userArr.username}/`);

    

    const handleInputMessage = () =>{
        socket.send(JSON.stringify({
            'message': message,
            'command':'new_message',
            'from':userArr.username
        }));
    }
  return (
    <div className="flex items-center ">
            <Input
                type="text"
                size='lg'
                onChange={(e)=>setMessage(e.target.value)}
                placeholder='enter your message'
                value={message}
                className='w-full'
            />
        <button onClick={handleInputMessage} className='m-4 border-solid border-1 rounded-lg border-white bg-[#F4F4F4] p-3'>
            <IoMdSend className='text-2xl'/>
        </button>
    </div>
  )
}

export default MessageInput
