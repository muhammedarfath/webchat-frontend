
import { motion } from "framer-motion";
import React, { useEffect, useState } from "react";
import { AuroraBackground } from "../../Components/ui/background-gradient-animation";
import { BentoGridThirdDemo } from '../../Components/grid/Grid';
import Footer from '../../Components/footer/Footer'
import { useDispatch, useSelector } from 'react-redux';
import ProfileIcon from "../../Components/profile_icon/ProfileIcon";
import { logoutUser } from "../../Redux/auth/authSlice";
import { useNavigate } from "react-router-dom";


function AppHome() {

  const {authTokens} = useSelector(state=>state.auth)
  const [profiletoggle,setProfiletoggle] = useState(false)
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleprofiletoggle = () =>{
    setProfiletoggle(!profiletoggle)
}
  const handleLogout = () => {
    dispatch(logoutUser({ authTokens: null, user_id: null,is_superuser:false}));
    navigate('/login');
  };

  useEffect(() => {
    if (!authTokens) {
      navigate('/login');
    }
  }, [authTokens, navigate]);



  return (
    <AuroraBackground>
            <div 
                className="absolute top-6 right-6 border border-slate-500 p-2 rounded-full cursor-pointer" 
                onClick={handleprofiletoggle}
            >
                <ProfileIcon />
            </div>
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
      <motion.div
        initial={{ opacity: 0.0, y: 40 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{
          delay: 0.3,
          duration: 0.8,
          ease: "easeInOut",
        }}
        className="relative flex flex-col gap-4 items-center justify-center px-4 lg:mt-[45rem] mt-[95rem] md:mt-[50rem] "
      >

        <div className="text-3xl md:text-7xl font-bold dark:text-white text-center">
          Background lights are cool you know.
        </div>
        <div className="font-extralight text-base md:text-4xl dark:text-neutral-200 py-4">
          And this, is chemical burn.
        </div>
        <button className="bg-black dark:bg-white rounded-full w-fit text-white dark:text-black px-4 py-2">
          Debug now
        </button>
         <div className="h-full">
         <BentoGridThirdDemo />
          </div>
      </motion.div>
      <div className="w-full mt-4">
        <Footer/>
      </div>
    </AuroraBackground>
  )
}

export default AppHome
