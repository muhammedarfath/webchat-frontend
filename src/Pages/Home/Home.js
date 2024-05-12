import React, { useState } from 'react'
import Header from '../../Components/header/Header'
import ChatArea from '../../Components/chatarea/ChatArea'
import {useSelector} from 'react-redux'
import Login from '../Authentication/Login'
import CardUser from '../../Components/contacts/CardUser'
import EmptyChat from '../../Components/contacts/EmptyChat'
import ProfileModal from '../../Components/modal/ProfileModal'
function Home() {
  const {email} = useSelector(state=>state.auth)
  const [userId,setUserId]=useState({})
  const [isProfileModelOpen, setIsProfileModelOpen] = useState(false);

  const handleUserIdUpdate = (id,email,username,image,full_name,bio) => {
    setUserId({
         "id":id,
         "username":username,
         "email":email,
         "image":image,
         "full_name":full_name,
         "bio":bio
    })
  }



  const handleProfileModelOpen = () => {
    setIsProfileModelOpen(true);
};
  return (
    
    <>

      <div className='flex'>
        
        {email ?
        <>
        <div className='w-1/3 flex'>
          <div className='flex-none'>
            <Header handleProfileModelOpen={handleProfileModelOpen}/>
          </div>
          <div className='w-full'>
            <CardUser handleUserIdUpdate={handleUserIdUpdate}/>
          </div>
        </div>
        <div className='flex-1 w-2/3'>
        { Object.keys(userId).length !== 0 ? (<ChatArea userArr={userId}/>) : (<EmptyChat/>)}
        </div>
        </>
        :(<Login/>)
        
        }

      </div>
      <ProfileModal isProfileModelOpen={isProfileModelOpen} setIsProfileModelOpen={setIsProfileModelOpen} />
    </>  


  )
}

export default Home
