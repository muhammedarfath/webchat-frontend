import React from "react";
import { IoIosArrowDown } from "react-icons/io";
import { Story } from "./Story";
import ContactAreaHeaderItems from "./ContactAreaHeaderItems";

function ContactAreaHeader({ users }) {
  return (
    <>
      <div className="flex items-center border-b-1 border-b-gray p-6 justify-between">
        <div className="flex items-center gap-2">
          <h1 className="font-bold">All Chats</h1>
          <IoIosArrowDown className="font-bold" />
        </div>
        <div className="flex items-center ml-3 gap-3">
         <ContactAreaHeaderItems/>
        </div>
      </div>
      {users.length === 0 ? (
        <div className="flex flex-col w-full p-5">
          <h1 className="font-medium text-[#424242]">Notes</h1>
          <h2 className="text-lg font-medium text-gray-500 mb-4">....</h2>
        </div>
      ) : (
        <div className="flex flex-col w-full p-5">
          <h1 className="font-medium text-[#424242]">Notes</h1>
          <Story />
        </div>
      )}
    </>
  );
}

export default ContactAreaHeader;
