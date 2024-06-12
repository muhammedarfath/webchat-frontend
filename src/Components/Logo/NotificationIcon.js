import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { TbBrandHipchat } from "react-icons/tb";
import { PiFilmReelDuotone } from "react-icons/pi";
import { ImNewspaper } from "react-icons/im";
import { FaChalkboardUser } from "react-icons/fa6";
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { logoutUser } from '../../Redux/auth/authSlice';

function NotificationIcon() {
    const [profiletoggle, setProfiletoggle] = useState(false);
    const dispatch = useDispatch();
    const navigate = useNavigate();

  const container = {
    hidden: { opacity: 1, scale: 0 },
    visible: {
      opacity: 1,
      scale: 1,
      transition: {
        delayChildren: 0.3,
        staggerChildren: 0.2
      }
    }
  };

  const item = {
    hidden: { y: 20, opacity: 0 },
    visible: { y: 0, opacity: 1 }
  };
  const handleprofiletoggle = () => {
    setProfiletoggle(!profiletoggle);
  };
  const handleLogout = () => {
    dispatch(
      logoutUser({ authTokens: null, user_id: null, is_superuser: false })
    );
    navigate("/login");
  };

  return (
    <motion.div
      className='max-w-40 border-1 border-black  rounded-xl grid grid-cols-2 p-3 gap-2'
      variants={container}
      initial='hidden'
      animate='visible'
    >
      <motion.div className='rounded-full w-9 h-9' variants={item}><TbBrandHipchat className='text-3xl' /></motion.div>
      <motion.div className='rounded-full w-9 h-9' variants={item}><PiFilmReelDuotone className='text-3xl' /></motion.div>
      <motion.div className='rounded-full w-9 h-9' variants={item}><ImNewspaper className='text-3xl' /></motion.div>
      <motion.div className='rounded-full w-9 h-9' variants={item}><FaChalkboardUser className='text-3xl' onClick={handleprofiletoggle}/></motion.div>
      {profiletoggle && (
        <div className="absolute top-20 right-6 w-36 bg-white shadow-md rounded-md z-10 profile-dropdown">
          <div className="arrow-up"></div>
          <ul>
            <li className="py-1 px-3 hover:bg-gray-200">Profile</li>
            <li
              className="py-1 px-3 hover:bg-gray-200 cursor-pointer"
              onClick={handleLogout}
            >
              Logout
            </li>
          </ul>
        </div>
      )}
    </motion.div>
  );
}

export default NotificationIcon;
