import React,{ useEffect, useRef, useState } from 'react'
import Avatar_profile from "../avatar/Avatar_profile";
import { IoSaveOutline } from "react-icons/io5";
import { IoSaveSharp } from "react-icons/io5";
import { IoNewspaperOutline } from "react-icons/io5";
import { IoNewspaperSharp } from "react-icons/io5";
import { BsMusicNoteList } from "react-icons/bs";
import { BsMusicNote } from "react-icons/bs";
import { PiGooglePodcastsLogo } from "react-icons/pi";
import { PiGooglePodcastsLogoBold } from "react-icons/pi";
import { PiFilmReel } from "react-icons/pi";
import { PiFilmReelFill } from "react-icons/pi";
import { MdOutlineAddBox } from "react-icons/md";
import { RiMessage3Line } from "react-icons/ri";
import { RiMessage3Fill } from "react-icons/ri";
import { NavLink } from "react-router-dom";
import { GoHome } from "react-icons/go";
import { IoIosSearch } from "react-icons/io";
import { IoMdSearch } from "react-icons/io";
import { IoIosNotificationsOutline } from "react-icons/io";
import { IoIosNotifications } from "react-icons/io";
import {
  Modal,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalFooter,
  Button,
  useDisclosure,
} from "@nextui-org/react";
import { FaArrowRight } from "react-icons/fa";
import { IoIosImages } from "react-icons/io";
import { Textarea } from "@nextui-org/react";
import { Input } from "@nextui-org/react";
import { useSelector } from 'react-redux';






function Nav() {

    const current_user = useSelector((state) => state.auth.user_id);
    const [notifications, setNotifications] = useState([]);
    const [unreadCount, setUnreadCount] = useState(0);
    const { isOpen, onOpen, onClose } = useDisclosure();
    const { username } = useSelector((state) => state.auth);
    const [imageUrl, setImageUrl] = useState(null);
    const fileInputRef = useRef(null);



    const handleOpen = () => {
        onOpen();
      };
    
      useEffect(() => {
        const socket = new WebSocket(
          `ws://localhost:8000/ws/notification/${current_user}/`
        );
    
        const fetchNotification = () => {
          socket.send(JSON.stringify({ command: "fetch_notificaion" }));
        };
    
        socket.onopen = () => {
          fetchNotification();
        };
    
        socket.onmessage = (event) => {
          try {
            const data = JSON.parse(event.data);
    
            if (data && data.message && typeof data.message === "object") {
              setNotifications((prevNotifications) => [
                ...prevNotifications,
                data.message,
              ]);
              setUnreadCount((prevCount) => prevCount + 1);
            } else {
              console.error("Invalid data format received:", data);
            }
          } catch (error) {
            console.error("Error parsing WebSocket message:", error);
          }
        };
        socket.onerror = (error) => {
          console.log("WebSocket error:", error);
        };
    
        socket.onclose = () => {
          console.log("WebSocket connection closed");
        };
    
        return () => {
          socket.close();
        };
      }, [current_user]);
    
      const handleFileChange = (event) => {
        const files = event.target.files;
        if (files.length > 0) {
          const file = files[0];
    
          console.log("Selected file:", file);
          const imageUrl = URL.createObjectURL(file);
          setImageUrl(imageUrl);
          console.log(imageUrl, "tjosoooooooooo");
        } else {
          console.error("No file selected.");
        }
      };
      const handleButtonClick = () => {
        fileInputRef.current.click();
      };
    




  return (
    <nav className="flex-1 w-full flex flex-col items-center gap-3">
    <NavLink
      to="/"
      className="flex gap-3 w-full hover:bg-gray-100 py-2 px-2 rounded-lg items-center cursor-pointer"
      activeClassName="text-[#000000] text-2xl transition-transform transform hover:scale-x-[-1]"
    >
      <GoHome className="text-[#000000] text-2xl transition-transform transform hover:scale-x-[-1]" />
      <span className="md:hidden lg:block">Home</span>
    </NavLink>

    <NavLink
      to="/search"
      className="flex gap-3 w-full hover:bg-gray-100 py-2 px-2 rounded-lg items-center cursor-pointer"
      activeClassName="text-[#000000] text-2xl transition-transform transform hover:scale-x-[-1]"
    >
      {({ isActive }) => (
        <>
          {isActive ? (
            <>
              <IoMdSearch className="text-[#000000] text-2xl transition-transform transform hover:scale-x-[-1] " />
              <span className="md:hidden lg:block">Search</span>
            </>
          ) : (
            <>
              <IoIosSearch className="text-[#000000] text-2xl transition-transform transform hover:scale-x-[-1] " />
              <span className="md:hidden lg:block">Search</span>
            </>
          )}
        </>
      )}
    </NavLink>

    <NavLink
      to="/notification"
      className="flex gap-3 w-full hover:bg-gray-100 py-2 px-2 rounded-lg items-center cursor-pointer"
      activeClassName="text-[#000000] text-2xl transition-transform transform hover:scale-x-[-1]"
    >
      {({ isActive }) => (
        <>
          {isActive ? (
            <>
              <IoIosNotifications className="text-[#000000] text-2xl transition-transform transform hover:scale-x-[-1] " />
              <span className="md:hidden lg:block">Notification</span>
            </>
          ) : (
            <>
              <IoIosNotificationsOutline className="text-[#000000] text-2xl transition-transform transform hover:scale-x-[-1]" />
              <span className="md:hidden lg:block">Notification</span>
              {unreadCount > 0 && (
                <span className="absolute top-0 left-0 bg-red-600 text-white rounded-full text-xs w-5 h-5 flex items-center justify-center">
                  {unreadCount}
                </span>
              )}
            </>
          )}
        </>
      )}
    </NavLink>

    <hr className="bg-gray-100 w-full" />

    <NavLink
      to="/"
      className="flex gap-3 w-full hover:bg-gray-100 py-2 px-2 rounded-lg items-center cursor-pointer"
      activeClassName="text-[#000000] text-2xl transition-transform transform hover:scale-x-[-1]"
    >
      <Avatar_profile />
      <span className="md:hidden lg:block">Profile</span>
    </NavLink>

    <NavLink
      to="/search"
      className="flex gap-3 w-full hover:bg-gray-100 py-2 px-2 rounded-lg items-center cursor-pointer"
      activeClassName="text-[#000000] text-2xl transition-transform transform hover:scale-x-[-1]"
    >
      {({ isActive }) => (
        <>
          {isActive ? (
            <>
              <IoSaveSharp className="text-[#000000] text-2xl transition-transform transform hover:scale-x-[-1] " />
              <span className="md:hidden lg:block">Save</span>
            </>
          ) : (
            <>
              <IoSaveOutline className="text-[#000000] text-2xl transition-transform transform hover:scale-x-[-1] " />
              <span className="md:hidden lg:block">Save</span>
            </>
          )}
        </>
      )}
    </NavLink>

    <hr className="bg-gray-100 w-full" />

    <h1 className="w-full pl-4 font-bold">Explore</h1>

    <NavLink
      to="/chathome"
      className="flex gap-3 w-full hover:bg-gray-100 py-2 px-2 rounded-lg items-center cursor-pointer"
      activeClassName="text-[#000000] text-2xl transition-transform transform hover:scale-x-[-1]"
    >
      {({ isActive }) => (
        <>
          {isActive ? (
            <>
              <RiMessage3Fill className="text-[#000000] text-2xl transition-transform transform hover:scale-x-[-1] " />
              <span className="md:hidden lg:block">Chatify</span>
            </>
          ) : (
            <>
              <RiMessage3Line className="text-[#000000] text-2xl transition-transform transform hover:scale-x-[-1] " />
              <span className="md:hidden lg:block">Chatify</span>
            </>
          )}
        </>
      )}
    </NavLink>

    <NavLink
      to="/search"
      className="flex gap-3 w-full hover:bg-gray-100 py-2 px-2 rounded-lg items-center cursor-pointer"
      activeClassName="text-[#000000] text-2xl transition-transform transform hover:scale-x-[-1]"
    >
      {({ isActive }) => (
        <>
          {isActive ? (
            <>
              <IoNewspaperSharp className="text-[#000000] text-2xl transition-transform transform hover:scale-x-[-1] " />
              <span className="md:hidden lg:block">Newsify</span>
            </>
          ) : (
            <>
              <IoNewspaperOutline className="text-[#000000] text-2xl transition-transform transform hover:scale-x-[-1] " />
              <span className="md:hidden lg:block">Newsify</span>
            </>
          )}
        </>
      )}
    </NavLink>

    <NavLink
      to="/notification"
      className="flex gap-3 w-full hover:bg-gray-100 py-2 px-2 rounded-lg items-center cursor-pointer"
      activeClassName="text-[#000000] text-2xl transition-transform transform hover:scale-x-[-1]"
    >
      {({ isActive }) => (
        <>
          {isActive ? (
            <>
              <BsMusicNote className="text-[#000000] text-2xl transition-transform transform hover:scale-x-[-1] " />
              <span className="md:hidden lg:block">Music</span>
            </>
          ) : (
            <>
              <BsMusicNoteList className="text-[#000000] text-2xl transition-transform transform hover:scale-x-[-1]" />
              <span className="md:hidden lg:block">Music</span>
              {unreadCount > 0 && (
                <span className="absolute top-0 left-0 bg-red-600 text-white rounded-full text-xs w-5 h-5 flex items-center justify-center">
                  {unreadCount}
                </span>
              )}
            </>
          )}
        </>
      )}
    </NavLink>

    <NavLink
      to="/notification"
      className="flex gap-3 w-full hover:bg-gray-100 py-2 px-2 rounded-lg items-center cursor-pointer"
      activeClassName="text-[#000000] text-2xl transition-transform transform hover:scale-x-[-1]"
    >
      {({ isActive }) => (
        <>
          {isActive ? (
            <>
              <PiGooglePodcastsLogoBold className="text-[#000000] text-2xl transition-transform transform hover:scale-x-[-1] " />
              <span className="md:hidden lg:block">Roomify</span>
            </>
          ) : (
            <>
              <PiGooglePodcastsLogo className="text-[#000000] text-2xl transition-transform transform hover:scale-x-[-1]" />
              <span className="md:hidden lg:block">Roomify</span>
              {unreadCount > 0 && (
                <span className="absolute top-0 left-0 bg-red-600 text-white rounded-full text-xs w-5 h-5 flex items-center justify-center">
                  {unreadCount}
                </span>
              )}
            </>
          )}
        </>
      )}
    </NavLink>

    <NavLink
      to={`/reels/${username}`}
      className="flex gap-3 w-full hover:bg-gray-100 py-2 px-2 rounded-lg items-center cursor-pointer"
      activeClassName="text-[#000000] text-2xl transition-transform transform hover:scale-x-[-1]"
    >
      {({ isActive }) => (
        <>
          {isActive ? (
            <>
              <PiFilmReelFill className="text-[#000000] text-2xl transition-transform transform hover:scale-x-[-1] " />
              <span className="md:hidden lg:block">Reelsify</span>
            </>
          ) : (
            <>
              <PiFilmReel className="text-[#000000] text-2xl transition-transform transform hover:scale-x-[-1]" />
              <span className="md:hidden lg:block">Reelsify</span>
              {unreadCount > 0 && (
                <span className="absolute top-0 left-0 bg-red-600 text-white rounded-full text-xs w-5 h-5 flex items-center justify-center">
                  {unreadCount}
                </span>
              )}
            </>
          )}
        </>
      )}
    </NavLink>

    <NavLink
      onClick={() => handleOpen()}
      className="flex gap-3 w-full hover:bg-gray-100 py-2 px-2 rounded-lg items-center cursor-pointer"
      activeClassName="text-[#000000] text-2xl transition-transform transform hover:scale-x-[-1]"
    >
      <MdOutlineAddBox className="text-[#000000] text-2xl transition-transform transform hover:scale-x-[-1]" />
      <span className="md:hidden lg:block">Post</span>
    </NavLink>

    <Modal isOpen={isOpen} onClose={onClose}>
      <ModalContent>
        {(onClose) => (
          <>
            <ModalHeader className="flex flex-col gap-1 justify-center items-center">
              Create new post
            </ModalHeader>
            <ModalBody>
              <input
                type="file"
                accept="image/*"
                onChange={handleFileChange}
                ref={fileInputRef}
                style={{ display: "none" }}
              />

              {imageUrl ? (
                <>
                  <img
                    src={imageUrl}
                    alt="Selected"
                    className="mt-4 w-full h-auto rounded-lg"
                  />
                  <ModalFooter className="flex flex-col gap-5">
                    <Textarea
                      label="Write a caption..."
                      className="max-w-xs"
                      variant="underlined"
                    />
                    <div className="flex max-w-xs flex-wrap md:flex-nowrap mb-6 md:mb-0 gap-4">
                      <Input
                        type="text"
                        variant="underlined"
                        label="Tags(add tags,separeted by commas)"
                      />
                    </div>
                    <Button
                      className="bg-gray-300 w-full hover:bg-gray-500"
                      onPress={onclose}
                    >
                      <FaArrowRight />
                    </Button>
                  </ModalFooter>
                </>
              ) : (
                <>
                  <div className="flex flex-col justify-center items-center pb-6">
                    <IoIosImages className="text-9xl" />
                    <h1>Drag photos and videos here</h1>
                  </div>
                  <Button
                    onClick={handleButtonClick}
                    className="bg-gray-300 mb-6 hover:bg-gray-500"
                  >
                    Select From Computer
                  </Button>
                </>
              )}
            </ModalBody>
          </>
        )}
      </ModalContent>
    </Modal>
    </nav>
  )
}

export default Nav