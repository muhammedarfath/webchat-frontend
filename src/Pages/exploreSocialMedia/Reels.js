import React from "react";
import { FaRegHeart } from "react-icons/fa";
import { FaRegComment } from "react-icons/fa";
import { IoMdShareAlt } from "react-icons/io";
import { HiOutlineSave } from "react-icons/hi";
import Follow_Card from "../../Components/follow_suggestions/Follow_Card.js";

export function Reels() {
  return (
    <div className="h-screen overflow-auto relative bg-white w-full">
      <div className="flex justify-center items-center mt-9 space-y-8">
        <div className="relative grid max-w-[28rem] w-full h-[40rem] flex-col items-center justify-center overflow-hidden rounded-xl bg-white text-center text-gray-700">
          <div className="absolute inset-0 overflow-hidden rounded-none bg-transparent bg-[url('https://images.unsplash.com/photo-1552960562-daf630e9278b?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=687&q=80')] bg-cover bg-clip-border bg-center text-gray-700 shadow-none">
            <div className="absolute inset-0 w-full h-full bg-gradient-to-t from-black/80 via-black/50"></div>
          </div>
          <div className="relative p-6 px-6 py-14 md:px-12">
            <h2 className="mb-6 block font-sans text-4xl font-medium leading-[1.5] tracking-normal text-white antialiased">
              How we design and code open-source projects?
            </h2>
            <h5 className="block mb-4 font-sans text-xl antialiased font-semibold leading-snug tracking-normal text-gray-400">
              Tania Andrew
            </h5>
            <img
              alt="Tania Andrew"
              src="https://images.unsplash.com/photo-1633332755192-727a05c4013d?ixlib=rb-1.2.1&amp;ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&amp;auto=format&amp;fit=crop&amp;w=1480&amp;q=80"
              className="relative inline-block h-[74px] w-[74px] !rounded-full border-2 border-white object-cover object-center"
            />
          </div>
          <div className="mb-[10rem] flex flex-col gap-7 items-end p-5 rounded-lg bg-white/30">
            <FaRegHeart className="text-[#fff] text-2xl transition-transform transform hover:scale-x-[-1]" />
            <FaRegComment className="text-[#fff] text-2xl transition-transform transform hover:scale-x-[-1]" />
            <IoMdShareAlt className="text-[#fff] text-2xl transition-transform transform hover:scale-x-[-1]" />
            <HiOutlineSave className="text-[#fff] text-2xl transition-transform transform hover:scale-x-[-1]" />
          </div>
        </div>
      </div>
      <div className="flex justify-center items-center mt-9 space-y-8">
        <div className="relative grid max-w-[28rem] w-full h-[40rem] flex-col items-center justify-center overflow-hidden rounded-xl bg-white text-center text-gray-700">
          <div className="absolute inset-0 overflow-hidden rounded-none bg-transparent bg-[url('https://images.unsplash.com/photo-1552960562-daf630e9278b?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=687&q=80')] bg-cover bg-clip-border bg-center text-gray-700 shadow-none">
            <div className="absolute inset-0 w-full h-full bg-gradient-to-t from-black/80 via-black/50"></div>
          </div>
          <div className="relative p-6 px-6 py-14 md:px-12">
            <h2 className="mb-6 block font-sans text-4xl font-medium leading-[1.5] tracking-normal text-white antialiased">
              How we design and code open-source projects?
            </h2>
            <h5 className="block mb-4 font-sans text-xl antialiased font-semibold leading-snug tracking-normal text-gray-400">
              Tania Andrew
            </h5>
            <img
              alt="Tania Andrew"
              src="https://images.unsplash.com/photo-1633332755192-727a05c4013d?ixlib=rb-1.2.1&amp;ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&amp;auto=format&amp;fit=crop&amp;w=1480&amp;q=80"
              className="relative inline-block h-[74px] w-[74px] !rounded-full border-2 border-white object-cover object-center"
            />
          </div>
          <div className="mb-[10rem] flex flex-col gap-7 items-end p-5 rounded-lg bg-white/30">
            <FaRegHeart className="text-[#fff] text-2xl transition-transform transform hover:scale-x-[-1]" />
            <FaRegComment className="text-[#fff] text-2xl transition-transform transform hover:scale-x-[-1]" />
            <IoMdShareAlt className="text-[#fff] text-2xl transition-transform transform hover:scale-x-[-1]" />
            <HiOutlineSave className="text-[#fff] text-2xl transition-transform transform hover:scale-x-[-1]" />
          </div>
        </div>
      </div>

      <div className="fixed right-10 top-9 hidden lg:block">
        <Follow_Card />
      </div>
    </div>
  );
}
