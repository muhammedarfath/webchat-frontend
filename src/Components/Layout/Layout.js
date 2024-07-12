import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { NavLink, Outlet, useNavigate } from "react-router-dom";
import { GoHome } from "react-icons/go";
import { IoIosSearch } from "react-icons/io";
import { IoMdSearch } from "react-icons/io";
import { IoIosNotificationsOutline } from "react-icons/io";
import { IoIosNotifications } from "react-icons/io";
import { AiOutlineMenu } from "react-icons/ai";
import { RiMessage3Line } from "react-icons/ri";
import { RiMessage3Fill } from "react-icons/ri";
import Logo from "../Logo/Logo";
import { FaQuestion } from "react-icons/fa6";
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
import { MdAddToPhotos } from "react-icons/md";
import {Modal, ModalContent, ModalHeader, ModalBody, ModalFooter, Button, useDisclosure} from "@nextui-org/react";

function Layout() {
  const current_user = useSelector((state) => state.auth.user_id);
  const [notifications, setNotifications] = useState([]);
  const [unreadCount, setUnreadCount] = useState(0);
  const {isOpen, onOpen, onClose} = useDisclosure();
  const {username} = useSelector((state)=>state.auth)

  const handleOpen = () => {
    console.log("hiii");
    onOpen();
  }

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

  return (
    <div className="flex flex-col md:flex-row w-full h-full fixed ">
      <div className="w-full lg:w-1/6 md:w-24">
        <div className="hidden md:block border-2 lg:flex h-screen">
          <div className="text-[#000000] w-full p-2 bg-white md:justify-center md:flex md:flex-col md:items-center">
            <div className="py-4 flex w-full justify-between">
              <div class=" hover:bg-gray-100 px-2 py-2 rounded-lg">
                <AiOutlineMenu className="text-[#000000] text-2xl transition-transform transform hover:scale-x-[-1] " />
              </div>
              <a
                href="#"
                className="text-[#000000] italic text-2xl text font-semibold uppercase"
              >
                <span className="">
                  <Logo />
                </span>
              </a>
            </div>

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

              <Modal 
                isOpen={isOpen} 
                onClose={onClose} 
              >
              <ModalContent>
          {(onClose) => (
            <>
              <ModalHeader className="flex flex-col gap-1">Modal Title</ModalHeader>
              <ModalBody>
                <p> 
                  Lorem ipsum dolor sit amet, consectetur adipiscing elit.
                  Nullam pulvinar risus non risus hendrerit venenatis.
                  Pellentesque sit amet hendrerit risus, sed porttitor quam.
                </p>
                <p>
                  Lorem ipsum dolor sit amet, consectetur adipiscing elit.
                  Nullam pulvinar risus non risus hendrerit venenatis.
                  Pellentesque sit amet hendrerit risus, sed porttitor quam.
                </p>
                <p>
                  Magna exercitation reprehenderit magna aute tempor cupidatat consequat elit
                  dolor adipisicing. Mollit dolor eiusmod sunt ex incididunt cillum quis. 
                  Velit duis sit officia eiusmod Lorem aliqua enim laboris do dolor eiusmod. 
                </p>
              </ModalBody>
              <ModalFooter>
                <Button color="danger" variant="light" onPress={onClose}>
                  Close
                </Button>
                <Button color="primary" onPress={onClose}>
                  Action
                </Button>
              </ModalFooter>
            </>
          )}
              </ModalContent>

              </Modal>
            </nav>
          </div>
        </div>
      </div>
      <div className="fixed bottom-0 right-0 border rounded-full p-4 m-6 bg-white shadow-2xl">
        <FaQuestion className="text-2xl font-bold" />
      </div>
      <Outlet />
    </div>
  );
}

export default Layout;
