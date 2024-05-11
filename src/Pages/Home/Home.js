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
  const [isCoinModelOpen, setIsCoinModelOpen] = useState(false);

  const handleUserIdUpdate = (id,username,email) => {
    setUserId({
         "id":id,
         "username":username,
         "email":email
    })
  }



  const handleGiftModelOpen = () => {
    setIsCoinModelOpen(true);
};
  return (
    
    <>

      <div className='flex'>
        
        {email ?
        <>
         <div className='flex-none'>
          <Header handleGiftModelOpen={handleGiftModelOpen}/>
        </div>
        <div className='flex-1'>
          <CardUser handleUserIdUpdate={handleUserIdUpdate}/>
        </div>
        <div className='flex-1'>
        { Object.keys(userId).length !== 0 ? (<ChatArea user={userId}/>) : (<EmptyChat/>)}
        </div>
        </>
        :(<Login/>)
        
        }

      </div>
      <ProfileModal isCoinModelOpen={isCoinModelOpen} setIsCoinModelOpen={setIsCoinModelOpen} />
    </>  


  )
}

export default Home
