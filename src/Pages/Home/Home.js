import React from 'react'
import Header from '../../Components/header/Header'
import Contacts from '../../Components/contacts/Contacts'
import ChatArea from '../../Components/chatarea/ChatArea'

function Home() {
  return (
    <div className="flex" >
      <div className='flex-none'>
       <Header/>
      </div>
      <div className='flex-1'>
        <Contacts/>
      </div>
      <div className='flex-1'>
       <ChatArea/>
      </div>
    </div>
  )
}

export default Home
