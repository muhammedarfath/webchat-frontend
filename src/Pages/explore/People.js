import React, { useEffect, useState } from 'react'
import Header from '../../Components/header/Header';
import { useSelector } from 'react-redux';
import axios from 'axios';

function People() {
    const [isFollowed, setIsFollowed] = useState(false);
    const [users,setUsers] = useState([])
    const current_userId = useSelector(state=>state.auth.user_id)
    const [isLoading, setIsLoading] = useState(false);

    useEffect(()=>{
        const fetchAllUsers = async () =>{
          setIsLoading(true);
          try{
            const response = await axios.post('http://127.0.0.1:8000/chat/suggested_friends/',{
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



      const handlefollow =async (userId) => {
        try{
          const response = await axios.post('http://127.0.0.1:8000/chat/send_follow_request/',{
            followerId: current_userId,
            userId: userId
         })
         if (response.data){
          console.log(response.data);
          setIsFollowed(!isFollowed)
         }else{
          alert('somthing went wrong')
         }
        }catch(error){
            console.log(error)
        }
      }
  


    return (
       <div className='h-screen overflow-auto'>
            <div className="fixed left-0">
                <Header/>
            </div>
            <div className='flex justify-center items-center mt-16'>
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

                            </div>
                            <div class='flex flex-col items-start ml-3'>
                                <h1 class='text-1xl mt-3 font-medium'>{user.user.username}</h1>
                                <small>arfathusr</small>
                                <small>Suggested for you</small>
                            </div>
                            <div class='flex gap-3 items-end ml-auto'>
                                {isFollowed ?(<button className='bg-[#080b0c] p-2 px-5 rounded-xl text-white font-medium' onClick={()=>handlefollow(user.id)} >Requested</button>) : (<button className='bg-[#0095F6] p-2 px-5 rounded-xl text-white font-medium' onClick={()=>handlefollow(user.id)} >Follow</button>)}

                            </div>
                        </div>

                    )}
                </div>
            </div>


       </div> 

    );
}

export default People
