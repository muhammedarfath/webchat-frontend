import React, { useState } from "react";
import Avatar_profile from "../avatar/Avatar_profile";
import {
  BsBookmarks,
  BsBookmarksFill,
  BsMusicNoteList,
  BsMusicNote,
} from "react-icons/bs";
import { IoNewspaperOutline, IoNewspaperSharp } from "react-icons/io5";
import {
  PiGooglePodcastsLogo,
  PiGooglePodcastsLogoBold,
  PiFilmReel,
  PiFilmReelFill,
} from "react-icons/pi";
import { MdOutlineAddBox } from "react-icons/md";
import { RiMessage3Line, RiMessage3Fill } from "react-icons/ri";
import { NavLink } from "react-router-dom";
import { GoHome } from "react-icons/go";
import {
  IoIosSearch,
  IoMdSearch,
  IoIosNotificationsOutline,
  IoIosNotifications,
} from "react-icons/io";
import { useSelector } from "react-redux";
import PostAddModal from "./PostAddModal";
import { useDisclosure } from "@nextui-org/react";

function Navbar() {
  const [unreadCount, setUnreadCount] = useState(0);
  const { username, image } = useSelector((state) => state.auth);
  const { isOpen, onOpen, onClose } = useDisclosure();

  const handleOpen = () => {
    onOpen();
  };

  const renderNavLink = (to, iconInactive, iconActive, label) => (
    <NavLink to={to} className="nav-link" activeClassName="nav-link-active">
      {({ isActive }) => (
        <>
          {isActive ? iconActive : iconInactive}
          <span className="md:hidden lg:block">{label}</span>
          {to === "/notification" && unreadCount > 0 && (
            <span className="absolute top-0 left-0 bg-red-600 text-white rounded-full text-xs w-5 h-5 flex items-center justify-center">
              {unreadCount}
            </span>
          )}
        </>
      )}
    </NavLink>
  );

  return (
    <nav className="flex-1 w-full flex flex-col items-center gap-3">
      {renderNavLink(
        "/",
        <GoHome className="nav-link-active" />,
        <GoHome className="nav-link-active" />,
        "Home"
      )}
      {renderNavLink(
        "/search",
        <IoIosSearch className="nav-link-active" />,
        <IoMdSearch className="nav-link-active" />,
        "Search"
      )}
      {renderNavLink(
        "/notification",
        <IoIosNotificationsOutline className="nav-link-active" />,
        <IoIosNotifications className="nav-link-active" />,
        "Notification"
      )}
      <hr className="bg-gray-100 w-full" />
      {renderNavLink(
        `/profile/${username}`,
        <Avatar_profile image={image} username={username} />,
        <Avatar_profile image={image} username={username} />,
        "Profile"
      )}
      {renderNavLink(
        "/save",
        <BsBookmarks className="nav-link-active" />,
        <BsBookmarksFill className="nav-link-active" />,
        "Save"
      )}
      <hr className="bg-gray-100 w-full" />
      <h1 className="w-full pl-4 font-bold">Explore</h1>
      {renderNavLink(
        "/chathome",
        <RiMessage3Line className="nav-link-active" />,
        <RiMessage3Fill className="nav-link-active" />,
        "Chatify"
      )}
      {renderNavLink(
        "/news",
        <IoNewspaperOutline className="nav-link-active" />,
        <IoNewspaperSharp className="nav-link-active" />,
        "Newsify"
      )}
      {renderNavLink(
        "/music",
        <BsMusicNoteList className="nav-link-active" />,
        <BsMusicNote className="nav-link-active" />,
        "Music"
      )}
      {renderNavLink(
        "/roomify",
        <PiGooglePodcastsLogo className="nav-link-active" />,
        <PiGooglePodcastsLogoBold className="nav-link-active" />,
        "Roomify"
      )}
      {renderNavLink(
        "/reels",
        <PiFilmReel className="nav-link-active" />,
        <PiFilmReelFill className="nav-link-active" />,
        "Reelsify"
      )}
      <NavLink
        onClick={handleOpen}
        className="nav-link"
        activeClassName="nav-link-active"
      >
        <MdOutlineAddBox className="nav-link-active" />
        <span className="md:hidden lg:block">Post</span>
      </NavLink>
      <PostAddModal isOpen={isOpen} onClose={onClose} />
    </nav>
  );
}

export default Navbar;
