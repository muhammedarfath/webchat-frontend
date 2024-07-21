import React from "react";
import { AiOutlineMenu } from "react-icons/ai";
import Logo from "../Logo/Logo";
import { FaQuestion } from "react-icons/fa6";
import { Outlet } from "react-router-dom";
import Navbar from "./Navbar";
import MobileLayout from "./MobileLayout";

function Layout() {

  return (
    <div className="flex flex-col md:flex-row w-full h-full fixed ">
      <div className="w-full lg:w-1/6 md:w-24">
        <div className="hidden md:block border-2 lg:flex h-screen">
          <div className="text-[#000000] w-full p-2 bg-white md:justify-center md:flex md:flex-col md:items-center">
            <div className="py-4 flex w-full justify-between">
              <div class=" hover:bg-gray-100 px-2 py-2 rounded-lg">
                <AiOutlineMenu className="text-[#000000] text-2xl transition-transform transform hover:scale-x-[-1] " />
              </div>
              <a
                href="#"
                className="text-[#000000] italic text-2xl text font-semibold uppercase"
              >
                <span className="">
                  <Logo />
                </span>
              </a>
            </div>
            <Navbar/>
          </div>
        </div>
       <MobileLayout/>
      </div>
      <div className="hidden lg:block fixed bottom-0 right-0 border rounded-full p-4 m-6 bg-white shadow-2xl">
        <FaQuestion className="text-2xl font-bold" />
      </div>
      <Outlet />
    </div>
  );
}

export default Layout;
