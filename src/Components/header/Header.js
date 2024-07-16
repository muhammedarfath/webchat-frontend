import React from 'react'
import Logo from "../../Components/Logo/Logo";

function Header() {
  return (
    <div className="fixed top-8 z-50 flex text-black  border-1 w-3/4 bg-opacity-35 shadow-md rounded-3xl border-gray-100 backdrop-blur-md p-4 list-none ">
      <div className="flex w-1/4 items-center justify-center gap-3">
        <Logo />
        <span className="hidden lg:block font-bold">ONE TAP</span>
      </div>
      <div className="hidden lg:flex w-3/4 font-semibold justify-evenly items-center">
        <li className='cursor-pointer'>Chatify</li>
        <li className='cursor-pointer'>Newsify</li>
        <li className='cursor-pointer'>Reelsify</li>
        <li className='cursor-pointer'>Snapify</li>
        <li className='cursor-pointer'>Musify</li>
      </div>
    </div>
  )
}

export default Header
