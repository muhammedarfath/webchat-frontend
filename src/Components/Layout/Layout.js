import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { Link, NavLink, Outlet, useNavigate } from "react-router-dom";
import { RiHome2Line } from "react-icons/ri";
import { IoMdSearch } from "react-icons/io";
import { RiMovie2Line } from "react-icons/ri";
import { FiMessageCircle } from "react-icons/fi";
import { MdOutlineNotifications } from "react-icons/md";
import { MdOutlineAddBox } from "react-icons/md";
import { AiOutlineMenu } from "react-icons/ai";
import { GoHomeFill } from "react-icons/go";
import { RiMovie2Fill } from "react-icons/ri";
import { TbMessageCircle2Filled } from "react-icons/tb";
import { RiMessage3Line } from "react-icons/ri";
import { RiMessage3Fill } from "react-icons/ri";

function Layout() {
  const current_user = useSelector((state) => state.auth.user_id);
  const [notifications, setNotifications] = useState([]); 

  useEffect(() => {
    const socket = new WebSocket(`ws://localhost:8000/ws/notification/${current_user}/`);

    const fetchNotification= () => {
      socket.send(JSON.stringify({ command: "fetch_notificaion" }));
    };

    socket.onopen = () => {
      fetchNotification();
    };

    socket.onmessage = (event) => {
      const data = JSON.parse(event.data);
      console.log('Notification received:', data);
      setNotifications((prevNotifications) => [...prevNotifications, ...data.messages]); 
    };

    socket.onerror = (error) => {
      console.log('WebSocket error:', error);
    };

    socket.onclose = () => {
      console.log('WebSocket connection closed');
    };

    return () => {
      socket.close();
    };
  }, [current_user]);





  return (
    <div className="flex flex-col md:flex-row w-full h-full">
      <div className="w-full lg:w-1/6 md:w-24 h-full">
        <div className="hidden md:block border-2 lg:flex h-screen">
          <div className="text-[#000000] p-4 bg-white md:justify-center md:flex md:flex-col md:items-center">
            <div className="py-4 flex items-center justify-center">
              <a
                href="#"
                className="text-[#000000] italic text-2xl text font-semibold uppercase"
              >
                <span className="md:hidden lg:block">𝓞𝓝𝓔 𝓣𝓐𝓟</span>
                <span className="md:block lg:hidden">𝓞𝓣</span>
              </a>
            </div>

            <nav className="flex-1 flex flex-col items-center py-[2rem] gap-5">
            <NavLink 
                to="/"
                className="flex gap-3 w-full hover:bg-gray-100 py-2 rounded-lg items-center cursor-pointer"
                activeClassName="text-[#000000] text-2xl transition-transform transform hover:scale-x-[-1]"
              >

                <RiHome2Line className="text-[#000000] text-2xl transition-transform transform hover:scale-x-[-1]" />
                <span className="md:hidden lg:block">Home</span>
  
                    
              </NavLink>



              <div className="flex gap-4 w-full hover:bg-gray-100 py-2 rounded-lg items-center cursor-pointer">
                <IoMdSearch className="text-[#000000] text-2xl transition-transform transform hover:scale-x-[-1] " />
                <span className="md:hidden lg:block">Search</span>
              </div>
              <NavLink 
                to="/reels"
                className="flex gap-3 w-full hover:bg-gray-100 py-2 rounded-lg items-center cursor-pointer"
                activeClassName="text-[#000000] text-2xl transition-transform transform hover:scale-x-[-1]"
              >
                {({ isActive })=>(
                  <>
                  {isActive ? (
                    <>
                      <RiMovie2Fill className="text-[#000000] text-2xl transition-transform transform hover:scale-x-[-1] " />
                      <span className="md:hidden lg:block">Reels</span>
                    </>
                  ) : (
                    <>
                      <RiMovie2Line className="text-[#000000] text-2xl transition-transform transform hover:scale-x-[-1] " />
                      <span className="md:hidden lg:block">Reels</span>
                    </>
                  )}
                </>
                )}
              </NavLink>


              <NavLink 
                to="/chathome"
                className="flex gap-3 w-full hover:bg-gray-100 py-2 rounded-lg items-center cursor-pointer"
                activeClassName="text-[#000000] text-2xl transition-transform transform hover:scale-x-[-1]"
              >
                {({ isActive })=>(
                  <>
                  {isActive ? (
                    <>
                      <RiMessage3Fill className="text-[#000000] text-2xl transition-transform transform hover:scale-x-[-1] " />
                      <span className="md:hidden lg:block">Message</span>
                    </>
                  ) : (
                    <>
                      <RiMessage3Line className="text-[#000000] text-2xl transition-transform transform hover:scale-x-[-1] " />
                      <span className="md:hidden lg:block">Message</span>
                    </>
                  )}
                </>
                )}
              </NavLink>








              <div className="flex gap-3 w-full hover:bg-gray-100 py-2 rounded-lg items-center cursor-pointer">
                <MdOutlineNotifications className="text-[#000000] text-2xl transition-transform transform hover:scale-x-[-1] " />
                <span className="md:hidden lg:block">Notification</span>
              </div>
              <div className="flex gap-3 w-full hover:bg-gray-100 py-2 rounded-lg items-center cursor-pointer">
                <MdOutlineAddBox className="text-[#000000] text-2xl transition-transform transform hover:scale-x-[-1] " />
                <span className="md:hidden lg:block">Create</span>
              </div>
              {/* <Link to={`/profile/${username}`}>
                <div className="flex gap-3 w-full hover:bg-gray-100 py-2 pr-7 rounded-lg items-center">
                  {image ? <img
                    src={`http://127.0.0.1:8000${image}`}
                    class=" w-9 rounded-full"
                    alt="image"
                  />:<img
                  src='images/profil-image.webp'
                  class="w-9 rounded-full"
                  alt="image/profil-image.webp"
                />}
                  <span className="md:hidden lg:block">Profile</span>
                </div>
              </Link> */}
            </nav>
            <div class="absolute bottom-4 flex gap-3  hover:bg-gray-100 py-4 rounded-lg items-center">
              <AiOutlineMenu className="text-[#000000] text-2xl transition-transform transform hover:scale-x-[-1] " />
              <span className="md:hidden lg:block">More</span>
            </div>
          </div>
        </div>
      </div>
      <Outlet />
    </div>
  );
}

export default Layout;
