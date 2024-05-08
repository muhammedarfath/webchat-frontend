import React from 'react'
import { RiMessage2Fill } from "react-icons/ri";
import { IoVideocamSharp } from "react-icons/io5";
import { IoCallSharp } from "react-icons/io5";
import { IoSettings } from "react-icons/io5";

function Header() {
  return (
    <div className="flex h-screen">
        <div className="text-[#420BA1] p-4 shadow-xl bg-white">
            <div className="py-4">
                <a href="#" className="text-[#420BA1] text-lg font-semibold uppercase">Logo</a>
            </div>
                
            <nav className="flex-1 flex flex-col items-center py-[5rem]">
                <div className="border-solid border-1 rounded-lg border-white bg-[#F4F4F4] p-3">
                    <RiMessage2Fill className="text-[#420BA1] text-2xl " />
                </div>
                <div className="mt-4 border-solid border-1 rounded-lg border-white bg-[#F4F4F4] p-3">
                    <IoVideocamSharp className="text-[#420BA1] text-2xl " />
                </div>
                <div className="mt-4 border-solid border-1 rounded-lg bg-[#F4F4F4] border-white p-3">
                    <IoCallSharp className="text-[#420BA1] text-2xl " />
                </div>
                <div className="mt-4 border-solid border-1 rounded-lg bg-[#F4F4F4] border-white p-3">
                    <IoSettings className="text-[#420BA1] text-2xl " />
                </div>
            </nav>
           
            <div className="absolute bottom-0 left-0 h-16 w-16">
                <img src="https://t3.ftcdn.net/jpg/02/43/12/34/360_F_243123463_zTooub557xEWABDLk0jJklDyLSGl2jrr.jpg" className='rounded-full'  alt="image" />
            </div>
        </div>
    </div>

  )
}

export default Header
