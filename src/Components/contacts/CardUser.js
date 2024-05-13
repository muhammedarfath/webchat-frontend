import React, { useEffect, useState } from 'react'
import {Card, CardHeader, CardBody, CardFooter, Avatar, Button} from "@nextui-org/react";
import axios from 'axios';
import { useSelector } from 'react-redux';
import { IoIosArrowDown } from "react-icons/io";
import { IoIosSearch } from "react-icons/io";
import { BsThreeDotsVertical } from "react-icons/bs";
import { RiMessage3Line } from "react-icons/ri";
import { BiCheckDouble } from "react-icons/bi";





function CardUser({handleUserIdUpdate}) {

    const [users,setUsers] = useState([])
    const current_userId = useSelector(state=>state.auth.user_id)
    const [isLoading, setIsLoading] = useState(false);

    useEffect(()=>{
      const fetchAllUsers = async () =>{
        setIsLoading(true);
        try{
          const response = await axios.post('http://127.0.0.1:8000/chat/users/',{
            current_userId
          })
          console.log(response.data);
          setUsers(response.data)
        }catch(error){
          alert(error)
        }
        setIsLoading(false);
      }
      fetchAllUsers();

    },[])




    const handlechat = async (id,username) => {
      setIsLoading(true);
      try{
        const response = await axios.post(`http://127.0.0.1:8000/chat/${username}/`,{
          user_id: id,

        })
        if (response){
          const data = response.data
          handleUserIdUpdate(data.id,data.user.email,data.user.username,data.image,data.full_name,data.bio)
        }else{
          console.log('somthing went wrong');
        }
      }catch(error){
        alert(error)
      }
      setIsLoading(false);
    }

  return (
    <div className='border-none w-full h-full bg-[#FFFFFF]'>
      <div className='flex items-center border-b-1 border-b-gray p-6 justify-between'>
        <div className='flex items-center gap-2'>
          <h1 className='font-bold'>All Chats</h1>
          <IoIosArrowDown className='font-bold'/>
        </div>
        <div className='flex items-center ml-3 gap-3'>
          <IoIosSearch className='text-2xl font-bold'/>
          <BsThreeDotsVertical />
        </div>
      </div>



      <div className='flex items-center ml-4 mt-5 gap-3'>
        <RiMessage3Line className='text-2xl font-bold'/>
        <h1>Recent Chat</h1>
      </div>
      {users.map((user)=>
        <div onClick={()=>handlechat(user.id,user.user.username)} class='hover:bg-[#F8E8FF] cursor-pointer bg-opacity-100 flex items-center justify-between border border-gray mb-3 ml-9 mt-3 mr-9 p-3 rounded-lg relative'>
            <div class="w-9 h-9 overflow-hidden">
                {user.image ? (<img src={`http://127.0.0.1:8000${user.image}`} class="w-full h-full rounded-full" alt="image" />) : (<img src='images/profil-image.webp' class="w-full h-full rounded-full" alt="image" />)}
                <h1 class='absolute bottom-0 left-0 text-black text-xs bg-[#2eff3c] px-1 rounded-b'> Online </h1>
            </div>
            <div class='flex flex-col items-start ml-3'>
                <h1 class='text-1xl font-medium'>{user.user.username}</h1>
                <small>hai</small>
            </div>
            <div class='flex flex-col items-end ml-auto'>
                <small>10:20</small>
                <BiCheckDouble class='text-sm' />
            </div>
        </div>

      )}
    </div>

    
  )
}

export default CardUser
