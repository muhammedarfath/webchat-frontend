import React, { useState } from 'react'
import Header from '../../Components/header/Header'
import ChatArea from '../../Components/chatarea/ChatArea'
import {useSelector} from 'react-redux'
import Login from '../Authentication/Login'
import CardUser from '../../Components/contacts/CardUser'
import EmptyChat from '../../Components/contacts/EmptyChat'
function Home() {
  const {email} = useSelector(state=>state.auth)
  const [userId,setUserId]=useState(false)
  
  const handleUserIdUpdate = (id) => {
    setUserId(true)
  }

  
  return (
    

      <div className="flex" >
        
        {email ?
        <>
         <div className='flex-none'>
          <Header/>
        </div>
        <div className='flex-1'>
          <CardUser handleUserIdUpdate={handleUserIdUpdate}/>
        </div>
        <div className='flex-1'>
        {userId ? (<ChatArea/>) : (<EmptyChat/>)}
        </div>
        </>
        :(<Login/>)
        
        }
      </div>


  )
}

export default Home
