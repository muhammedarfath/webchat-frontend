import React, { useEffect, useState } from 'react'
import {Card, CardHeader, CardBody, CardFooter, Avatar, Button} from "@nextui-org/react";
import Header from '../../Components/header/Header';
import { useSelector } from 'react-redux';
import { IoIosArrowDown } from "react-icons/io";
import { IoIosSearch } from "react-icons/io";
import { BsThreeDotsVertical } from "react-icons/bs";
import { RiMessage3Line } from "react-icons/ri";
import { BiCheckDouble } from "react-icons/bi";
import axios from 'axios';

function People() {
    const [isFollowed, setIsFollowed] = React.useState(false);
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
  


    return (
       <div className='h-screen overflow-auto relative'>
            <div className="fixed left-0">
                <Header/>
            </div>
            <div className='flex justify-center items-center'>
                <div className='border-none w-[600px] h-screen overflow-y-auto'>
                    <div className='flex items-center p-6 justify-between'>
                        <div className='flex items-center gap-2'>
                        <h1 className='font-bold'>Suggested</h1>
                        </div>
                    </div>

                    {users.map((user)=>
                        <div class='cursor-pointer bg-opacity-100 flex items-center justify-between ml-9 mt-1 mr-9 rounded-lg relative'>
                            <div class="w-10 h-10 overflow-hidden">
                                {user.image ? (<img src={`http://127.0.0.1:8000${user.image}`} class="w-full h-full rounded-full" alt="image" />) : (<img src='images/profil-image.webp' class="w-full h-full rounded-full" alt="image" />)}
                                {/* <h1 class='absolute bottom-0 left-0 text-black text-xs bg-[#2eff3c] px-1 rounded-b'> Online </h1> */}

                            </div>
                            <div class='flex flex-col items-start ml-3'>
                                <h1 class='text-1xl mt-3 font-medium'>{user.user.username}</h1>
                                <small>arfathusr</small>
                                <small>Suggested for you</small>
                            </div>
                            <div class='flex gap-3 items-end ml-auto'>
                                <button className='bg-[#0095F6] p-2 rounded-xl text-white font-medium '>Message</button>
                                <button className='bg-[#0095F6] p-2 rounded-xl text-white font-medium' >Follow</button>

                            </div>
                        </div>

                    )}
                </div>
            </div>


       </div> 

    );
}

export default People
