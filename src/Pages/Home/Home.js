import React, { useState } from 'react';
import Header from '../../Components/header/Header';
import ChatArea from '../../Components/chatarea/ChatArea';
import CardUser from '../../Components/contacts/CardUser';
import EmptyChat from '../../Components/contacts/EmptyChat';
import ProfileModal from '../../Components/modal/ProfileModal';

function Home() {
  const [userId, setUserId] = useState({});
  const [isProfileModelOpen, setIsProfileModelOpen] = useState(false);

  const handleUserIdUpdate = (id, email, username, image, full_name, bio) => {
    setUserId({
      id,
      username,
      email,
      image,
      full_name,
      bio
    });
  };

  const handleProfileModelOpen = () => {
    setIsProfileModelOpen(true);
  };

  return (
    <>
      <div className='flex flex-col md:flex-row w-full h-full'>
        <div className='w-full lg:w-1/6 md:w-1/5 h-full'>
          <Header handleProfileModelOpen={handleProfileModelOpen} />
        </div>
        <div className='flex flex-col  md:w-4/5 md:flex-row w-full lg:w-5/6 h-full'>
          <div className='w-full lg:w-1/3 overflow-y-scroll h-full'>
            <CardUser handleUserIdUpdate={handleUserIdUpdate} />
          </div>
          <div className='hidden md:hidden lg:block lg:w-2/3 h-full'>
            {Object.keys(userId).length !== 0 ? <ChatArea userArr={userId} /> : <EmptyChat />}
          </div>
        </div>
      </div>
      {isProfileModelOpen && <ProfileModal />}
    </>
  );
}

export default Home;
