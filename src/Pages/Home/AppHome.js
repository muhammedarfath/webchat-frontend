import { motion } from "framer-motion";
import React, { useEffect, useState } from "react";
import { AuroraBackground } from "../../Components/ui/background-gradient-animation";
import { BentoGridThirdDemo } from "../../Components/grid/Grid";
import Footer from "../../Components/footer/Footer";
import { useDispatch, useSelector } from "react-redux";
import { logoutUser } from "../../Redux/auth/authSlice";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import NotificationIcon from "../../Components/Logo/NotificationIcon";
import DrowLogo from "../../Components/Logo/DrowLogo";
import {Toaster} from 'react-hot-toast'

function AppHome() {
  const { authTokens } = useSelector((state) => state.auth);
  const navigate = useNavigate();
 
 

  useEffect(() => {
    if (!authTokens) {
      navigate("/login");
    }
  }, [authTokens, navigate]);






  return (
    <AuroraBackground>
      <div
        className="justify-between flex w-full border border-slate-500 p-2 bg-black rounded-full cursor-pointer"
        
      >
        <div className="fixed top-6 right-6">
          <NotificationIcon/>
        </div>

      </div>
      
        <div className="fixed top-6 left-6">

        <DrowLogo/>
        </div>


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
        
        <div className="text-3xl md:text-7xl font-bold dark:text-white  text-center">
          ONE TAP.
        </div>
        <div className="font-extralight text-base md:text-4xl dark:text-neutral-200 py-4">
        All your media needs just one tap.
        </div>
        <div className="h-full">
          <BentoGridThirdDemo />
        </div>
      </motion.div>
      <div className="w-full mt-4">
        <Footer />
      </div>
    </AuroraBackground>
  );
}

export default AppHome;
