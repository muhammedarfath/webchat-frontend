import React from 'react'
import Header from '../../Components/header/Header'
import Contacts from '../../Components/contacts/Contacts'
import ChatArea from '../../Components/chatarea/ChatArea'
import {useSelector} from 'react-redux'
import { useNavigate } from 'react-router-dom'
import Login from '../Authentication/Login'
function Home() {
  const navigate = useNavigate()
  const {email} = useSelector(state=>state.auth)

  
  return (
    

      <div className="flex" >
        
        {email ?
        <>
         (<div className='flex-none'>
        <Header/>
        </div>
        <div className='flex-1'>
          <Contacts/>
        </div>
        <div className='flex-1'>
        <ChatArea/>
        </div>)
        </>
        :(<Login/>)
        
        }
      </div>


  )
}

export default Home
