import React, { useState } from 'react'
import Header from '../../Components/header/Header'
import ChatArea from '../../Components/chatarea/ChatArea'
import {useSelector} from 'react-redux'
import Login from '../Authentication/Login'
import CardUser from '../../Components/contacts/CardUser'
import EmptyChat from '../../Components/contacts/EmptyChat'
function Home() {
  const {email} = useSelector(state=>state.auth)
  const [userId,setUserId]=useState({})
  const [isBlurred, setIsBlurred] = useState(false); 

  const handleUserIdUpdate = (id,username,email) => {
    setUserId({
         "id":id,
         "username":username,
         "email":email
    })
  }

  const toggleBlur = (value) => {
    setIsBlurred(value);
  };
  console.log(isBlurred);
  
  return (
    

      <div className={`flex ${isBlurred ? 'blurred' : ''}`}>
        
        {email ?
        <>
         <div className='flex-none'>
          <Header toggleBlur={toggleBlur}/>
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


  )
}

export default Home
