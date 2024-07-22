import React from "react";
import { MdOutlineAddBox } from "react-icons/md";
import { PiFilmReel, PiFilmReelFill } from "react-icons/pi";
import { GoHome } from "react-icons/go";
import { IoNewspaperOutline, IoNewspaperSharp } from "react-icons/io5";
import { useDisclosure } from "@nextui-org/react";
import PostAddModal from "./PostAddModal";
import { IoIosSearch, IoMdSearch } from "react-icons/io";
import { NavLink } from "react-router-dom";

function MobileLayoutFooter() {
    
  const { isOpen, onOpen, onClose } = useDisclosure();

  const handleOpen = () => {
    onOpen();
  };
  
  return (
    <div className="lg:hidden z-50 md:hidden fixed bottom-0 bg-white shadow-2xl w-full text-black flex items-center justify-evenly gap-5 h-20">
      <NavLink
        to="/"
        activeClassName="text-[#000000] text-2xl transition-transform transform hover:scale-x-[-1]"
      >
        <GoHome className="text-black text-2xl transition-transform transform hover:scale-x-[-1]" />
      </NavLink>

      <NavLink
        to="/search"
        activeClassName="text-[#000000] text-2xl transition-transform transform hover:scale-x-[-1]"
      >
        {({ isActive }) => (
          <>
            {isActive ? (
              <>
                <IoMdSearch className="text-black text-2xl transition-transform transform hover:scale-x-[-1] " />
              </>
            ) : (
              <>
                <IoIosSearch className="text-black text-2xl transition-transform transform hover:scale-x-[-1] " />
              </>
            )}
          </>
        )}
      </NavLink>

      <NavLink
        onClick={handleOpen}
        className="border p-5 rounded-full shadow-2xl "
        activeClassName="text-black text-2xl transition-transform transform hover:scale-x-[-1]"
      >
        <MdOutlineAddBox className="text-black text-2xl transition-transform transform hover:scale-x-[-1]" />
      </NavLink>

      <NavLink
        to="/news"
        activeClassName="text-black text-2xl transition-transform transform hover:scale-x-[-1]"
      >
        {({ isActive }) => (
          <>
            {isActive ? (
              <>
                <IoNewspaperSharp className="text-black text-2xl transition-transform transform hover:scale-x-[-1] " />
              </>
            ) : (
              <>
                <IoNewspaperOutline className="text-black text-2xl transition-transform transform hover:scale-x-[-1] " />
              </>
            )}
          </>
        )}
      </NavLink>

      <NavLink
        to="/reels"
        activeClassName="text-[#000000] text-2xl transition-transform transform hover:scale-x-[-1]"
      >
        {({ isActive }) => (
          <>
            {isActive ? (
              <>
                <PiFilmReelFill className="text-black text-2xl transition-transform transform hover:scale-x-[-1] " />
              </>
            ) : (
              <>
                <PiFilmReel className="text-black text-2xl transition-transform transform hover:scale-x-[-1]" />
              </>
            )}
          </>
        )}
      </NavLink>
      <PostAddModal isOpen={isOpen} onClose={onClose} />
    </div>
  );
}

export default MobileLayoutFooter;
