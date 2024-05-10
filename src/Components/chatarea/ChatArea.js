import React, { useEffect } from 'react';
import { IoVideocamSharp } from "react-icons/io5";
import { IoCallSharp } from "react-icons/io5";
import { IoIosContact } from "react-icons/io";
import { FaSearch } from "react-icons/fa";
import {Dropdown, DropdownTrigger, DropdownMenu, DropdownItem, Avatar, User} from "@nextui-org/react";
import {Input} from "@nextui-org/react";
import { IoMdSend } from "react-icons/io";
import axios from 'axios';

function ChatArea({user}) {

  
   

  return (
    <div className="hidden lg:block shadow-lg rounded-lg bg-white h-full">
        <header className="shadow-xl text-dark py-4 px-6 flex items-center justify-between">
            <div className="flex gap-4 items-center">
                <div>
                <Dropdown placement="bottom-start">
                    <DropdownTrigger>
                    <User
                        as="button"
                        avatarProps={{
                        isBordered: true,
                        src: "https://i.pravatar.cc/150?u=a042581f4e29026024d",
                        }}
                        className="transition-transform"
                        description="@tonyreichert"
                        name="Tony Reichert"
                    />
                    </DropdownTrigger>
                    <DropdownMenu aria-label="User Actions" variant="flat">
                    <DropdownItem key="profile" className="h-14 gap-2">
                        <p className="font-bold">Signed in as</p>
                        <p className="font-bold">@tonyreichert</p>
                    </DropdownItem>
                    <DropdownItem key="settings">My Settings</DropdownItem>
                    <DropdownItem key="team_settings">Team Settings</DropdownItem>
                    <DropdownItem key="analytics">Analytics</DropdownItem>
                    <DropdownItem key="system">System</DropdownItem>
                    <DropdownItem key="configurations">Configurations</DropdownItem>
                    <DropdownItem key="help_and_feedback">Help & Feedback</DropdownItem>
                    <DropdownItem key="logout" color="danger">Log Out</DropdownItem>
                    </DropdownMenu>
                </Dropdown>
                </div>
            </div>
            <div className='flex gap-2'>
                <div className="mt-4 border-solid border-1 rounded-lg border-white bg-[#F4F4F4] p-2">
                <IoVideocamSharp className="text-[#420BA1] text-1xl " />
                </div>
                <div className="mt-4 border-solid border-1 rounded-lg bg-[#F4F4F4] border-white p-2">
                <IoCallSharp className="text-[#420BA1] text-1xl " />
                </div>
                <div className="mt-4 border-solid border-1 rounded-lg bg-[#F4F4F4] border-white p-2">
                <FaSearch className="text-[#420BA1] text-1xl " />
                </div>
            </div>
        </header>
        <div className="w-full px-5 flex flex-col justify-between">
            <div className="flex flex-col mt-5">
                <div className="flex justify-end mb-4">
                    <div
                    className="mr-2 py-3 px-4 bg-blue-400 rounded-bl-3xl rounded-tl-3xl rounded-tr-xl text-white"
                    >
                    Welcome to group everyone !
                    </div>
                    <img
                    src="https://source.unsplash.com/vpOeXr5wmR4/600x600"
                    className="object-cover h-8 w-8 rounded-full"
                    alt=""
                    />
                </div>
                <div className="flex justify-start mb-4">
                    <img
                    src="https://source.unsplash.com/vpOeXr5wmR4/600x600"
                    className="object-cover h-8 w-8 rounded-full"
                    alt=""
                    />
                    <div
                    className="ml-2 py-3 px-4 bg-gray-400 rounded-br-3xl rounded-tr-3xl rounded-tl-xl text-white"
                    >
                    Lorem ipsum dolor sit amet consectetur adipisicing elit. Quaerat
                    at praesentium, aut ullam delectus odio error sit rem. Architecto
                    nulla doloribus laborum illo rem enim dolor odio saepe,
                    consequatur quas?
                    </div>
                </div>
                <div className="flex justify-end mb-4">
                    <div>
                    <div
                        className="mr-2 py-3 px-4 bg-blue-400 rounded-bl-3xl rounded-tl-3xl rounded-tr-xl text-white"
                    >
                        Lorem ipsum dolor, sit amet consectetur adipisicing elit.
                        Magnam, repudiandae.
                    </div>

                    <div
                        className="mt-4 mr-2 py-3 px-4 bg-blue-400 rounded-bl-3xl rounded-tl-3xl rounded-tr-xl text-white"
                    >
                        Lorem ipsum dolor sit amet consectetur adipisicing elit.
                        Debitis, reiciendis!
                    </div>
                    </div>
                    <img
                    src="https://source.unsplash.com/vpOeXr5wmR4/600x600"
                    className="object-cover h-8 w-8 rounded-full"
                    alt=""
                    />
                </div>
                <div className="flex justify-start mb-4">
                    <img
                    src="https://source.unsplash.com/vpOeXr5wmR4/600x600"
                    className="object-cover h-8 w-8 rounded-full"
                    alt=""
                    />
                    <div
                    className="ml-2 py-3 px-4 bg-gray-400 rounded-br-3xl rounded-tr-3xl rounded-tl-xl text-white"
                    >
                    happy holiday guys!
                    </div>
                </div>
            </div>
            <div className="absolute bottom-0  w-full max-w-[40vw]">
            <div className="flex items-center ">
            <Input type="text" size='lg' placeholder='enter your message'  className='w-full'/>
            <button className='m-4 border-solid border-1 rounded-lg border-white bg-[#F4F4F4] p-3'>
                <IoMdSend className='text-2xl'/>
            </button>
            </div>
            </div>
        </div>

    </div>
  );
}

export default ChatArea;
