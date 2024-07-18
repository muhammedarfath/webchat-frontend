import React from 'react'
import Logo from "../../Components/Logo/Logo";
import HeaderItems from './HeaderItems';
function Header() {

  return (
    <div className="fixed top-8 z-50 flex text-black  border-1 w-3/4 bg-opacity-35 shadow-md rounded-3xl border-gray-100 backdrop-blur-md p-4 list-none ">
      <div className="flex lg:w-1/4 items-center justify-center gap-3">
        <Logo height={50} width={50} />
        <span className="font-bold">𝖋𝖞𝖇𝖔𝖝</span>
      </div>
      <HeaderItems/>
    </div>
  )
}

export default Header

