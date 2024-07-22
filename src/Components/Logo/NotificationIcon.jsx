import React, { useState } from "react";
import { motion } from "framer-motion";
import { TbBrandHipchat } from "react-icons/tb";
import { PiFilmReelDuotone } from "react-icons/pi";
import { ImNewspaper } from "react-icons/im";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { logoutUser } from "../../Redux/auth/authSlice";
import { Avatar } from "@nextui-org/react";
import {
  Dropdown,
  DropdownTrigger,
  DropdownMenu,
  DropdownItem,
  } from "@nextui-org/react";
import Avatar_profile from "../avatar/Avatar_profile";

function NotificationIcon({containerRef}) {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { username, image } = useSelector((state) => state.auth);

  const container = {
    hidden: { opacity: 1, scale: 0 },
    visible: {
      opacity: 1,
      scale: 1,
      transition: {
        delayChildren: 0.3,
        staggerChildren: 0.2,
      },
    },
  };

  const item = {
    hidden: { y: 20, opacity: 0 },
    visible: { y: 0, opacity: 1 },
  };

  const handleLogout = () => {
    dispatch(
      logoutUser({ authTokens: null, user_id: null, is_superuser: false,image:null,username:null,email:null })
    );
    navigate("/login");
  };

  return (

    <motion.div
      className="max-w-40 border-1 border-black  rounded-xl grid grid-cols-2 p-3 gap-2"
      variants={container}
      initial="hidden"
      animate="visible"
      drag
      dragConstraints={containerRef}
    >
      <motion.div className="rounded-full lg:w-9 lg:h-9" variants={item}>
        <TbBrandHipchat className="lg:text-3xl text-2xl" />
      </motion.div>
      <motion.div className="rounded-full lg:w-9 lg:h-9" variants={item}>
        <Link to={`/reels/${username}`}>
          <PiFilmReelDuotone className="lg:text-3xl text-2xl" />
        </Link>
      </motion.div>
      <motion.div className="rounded-full lg:w-9 lg:h-9" variants={item}>
        <ImNewspaper className="lg:text-3xl text-2xl" />
      </motion.div>
      <Dropdown>
        <DropdownTrigger>
          <motion.div className="rounded-full lg:w-9 lg:h-9" variants={item}>
            <Avatar_profile  image={image} username={username}/>
          </motion.div>
        </DropdownTrigger>
        <DropdownMenu aria-label="Static Actions">
          <DropdownItem key="profile">
            <Link to={`/profile/${username}`}>Profile</Link>
          </DropdownItem>
          <DropdownItem onClick={handleLogout} key="logout">
            Logout
          </DropdownItem>
        </DropdownMenu>
      </Dropdown>
    </motion.div>

  );
}

export default NotificationIcon;
