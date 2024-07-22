import React from "react";
import { NavLink } from "react-router-dom";
import AvatarProfile from "../avatar/Avatar_profile";
import { useSelector } from "react-redux";
import { IoIosNotifications, IoIosNotificationsOutline } from "react-icons/io";
import { RiMessage3Fill, RiMessage3Line } from "react-icons/ri";
import Logo from "../Logo/Logo";
import MobileLayoutFooter from "./MobileLayoutFooter";

function MobileLayout() {
  return (
    <div>
      <div className="lg:hidden z-50 md:hidden bg-white shadow-5xl border-b-1 w-full flex items-center justify-between text-black gap-5 h-20">
        <div className="flex items-center gap-2 ml-5">
          <Logo height={40} width={40} />
          <span className="font-bold">fybox</span>
        </div>
        <div className="flex gap-4 mr-5">
          <NavLink
            to="/notification"
            activeClassName="text-[#000000] text-2xl transition-transform transform hover:scale-x-[-1]"
          >
            {({ isActive }) => (
              <>
                {isActive ? (
                  <>
                    <IoIosNotifications className="text-[#000000] text-2xl transition-transform transform hover:scale-x-[-1] " />
                  </>
                ) : (
                  <>
                    <IoIosNotificationsOutline className="text-[#000000] text-2xl transition-transform transform hover:scale-x-[-1]" />
                  </>
                )}
              </>
            )}
          </NavLink>

          <NavLink
            to="/chathome"
            activeClassName="text-[#000000] text-2xl transition-transform transform hover:scale-x-[-1]"
          >
            {({ isActive }) => (
              <>
                {isActive ? (
                  <>
                    <RiMessage3Fill className="text-[#000000] text-2xl transition-transform transform hover:scale-x-[-1] " />
                  </>
                ) : (
                  <>
                    <RiMessage3Line className="text-[#000000] text-2xl transition-transform transform hover:scale-x-[-1] " />
                  </>
                )}
              </>
            )}
          </NavLink>
        </div>
      </div>
      <MobileLayoutFooter />
    </div>
  );
}

export default MobileLayout;
