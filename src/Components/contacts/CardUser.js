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
    const [isFollowed, setIsFollowed] = React.useState(false);
    const [users,setUsers] = useState([])
    const current_userId = useSelector(state=>state.auth.user_id)


    useEffect(()=>{
      const fetchAllUsers = async () =>{
        try{
          const response = await axios.post('http://127.0.0.1:8000/chat/users/',{
            current_userId
          })
          console.log(response.data);
          setUsers(response.data)
        }catch(error){
          alert(error)
        }
      }
      fetchAllUsers();

    },[])





    const handlechat = async (id,username) => {
      try{
        const response = await axios.post(`http://127.0.0.1:8000/chat/${username}/`,{
          user_id: id,
        })
        if (response){
          console.log(response.data);
          const data = response.data
          handleUserIdUpdate(data.id,data.user.email,data.user.username,data.image,data.full_name,data.bio)
        }else{
          console.log('somthing went wrong');
        }
      }catch(error){
        alert(error)
      }
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
        // <Card className='m-5 transition ease-in-out delay-50 hover:-translate-y-1 hover:scale-100 duration-300'>
        // <CardHeader className="justify-between">
        //   <div className="flex gap-5">
        //     <Avatar isBordered radius="full" size="md" src={`http://127.0.0.1:8000${user.image}`} />
        //     <div className="flex flex-col gap-1 items-start justify-center">
        //       <h4 className="text-small font-semibold leading-none text-default-600">{user.user.username}</h4>
        //       <h5 className="text-small tracking-tight text-default-400">@zoeylang</h5>
        //     </div>
        //   </div>
        //   <Button
        //     className="border-default-200 bg-[#420BA1] text-white"
        //     radius="full"
        //     size="sm"
        //     variant={isFollowed ? "bordered" : "solid"}
        //     onPress={() => setIsFollowed(!isFollowed)}
        //     onClick={()=>handlechat(user.id,user.user.username)}
        //   >
        //     {isFollowed ? "Unfollow" : "Follow"}
        //   </Button>
        // </CardHeader>
        // {/* <CardBody className="px-3 py-0 text-small text-default-400">
        //   <p>
        //     Frontend developer and UI/UX enthusiast. Join me on this coding adventure!
        //   </p>
        //   <span className="pt-2">
        //     #FrontendWithZoey 
        //     <span className="py-2" aria-label="computer" role="img">
        //       💻
        //     </span>
        //   </span>
        // </CardBody>
        // <CardFooter className="gap-3">
        //   <div className="flex gap-1">
        //     <p className="font-semibold text-default-400 text-small">4</p>
        //     <p className=" text-default-400 text-small">Following</p>
        //   </div>
        //   <div className="flex gap-1">
        //     <p className="font-semibold text-default-400 text-small">97.1K</p>
        //     <p className="text-default-400 text-small">Followers</p>
        //   </div>
        // </CardFooter> */}
        // </Card>
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
