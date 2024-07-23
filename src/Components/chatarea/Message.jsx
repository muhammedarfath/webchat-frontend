import React, { useEffect, useRef, useState } from "react";

import { BiCheckDouble } from "react-icons/bi";
import { BsThreeDots } from "react-icons/bs";
import AvatarProfile from "../avatar/Avatar_profile";

import MessageMenuDropdown from "./MessageMenuDropdown";

function Message({ text, sent, userArr, is_read }) {

  const [dropdownVisible, setDropdownVisible] = useState(false);
  const dropdownRef = useRef(null);
  const handleDropdownToggle = () => {
    setDropdownVisible(!dropdownVisible);
  };
  const handleClickOutside = (event) => {
    if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
      setDropdownVisible(false);
    }
  };

  useEffect(() => {
    if (dropdownVisible) {
      document.addEventListener("mousedown", handleClickOutside);
    } else {
      document.removeEventListener("mousedown", handleClickOutside);
    }

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [dropdownVisible]);

  return (
    <div className="flex flex-col mb-14">
      {sent ? (
        <div className="flex mr-3 flex-col items-end mb-4">
          <div className="flex justify-end gap-5">
            <div className="mt-8 gap-2 flex items-center ">
              <small className="mt-1">8:16 PM</small>
              <BsThreeDots
                className="text-[#424242] cursor-pointer"
                onClick={handleDropdownToggle}
              />
            </div>
          </div>
          <div className="py-2 px-4 mt-2 bg-[#15a0fd] rounded-bl-2xl rounded-tl-2xl rounded-br-xl text-white">
            {text.content}
          </div>
        </div>
      ) : (
        <div className="flex items-start ml-4 mt-10">
          <div className="flex justify-end gap-3">
            {userArr.image ? (
              <AvatarProfile image={userArr.image} size="md" />
            ) : (
              <AvatarProfile username={userArr.username} size="md" />
            )}
            <div className="flex relative flex-col justify-start gap-2">
              <div className="flex items-center gap-2">
                <small className="mt-1 ml-2">8:16 PM</small>
                <div ref={dropdownRef} className="relative">
                  <BsThreeDots
                    className="text-[#424242] cursor-pointer"
                    onClick={handleDropdownToggle}
                  />
                  {dropdownVisible && <MessageMenuDropdown />}
                </div>
              </div>
              <div className="py-2 px-3 shadow-small flex items-center gap-3 bg-[#EFEFEF] rounded-br-3xl rounded-tr-3xl rounded-bl-xl text-[#424242]">
                {text.content}{" "}
                {is_read && (
                  <BiCheckDouble className="text-sm text-[#2eff3c]" />
                )}
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default Message;
