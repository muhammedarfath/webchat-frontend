import React from 'react'
import { MdMenuBook } from "react-icons/md";
import { SlEnvolopeLetter } from "react-icons/sl";
import { Autocomplete, AutocompleteItem } from "@nextui-org/react";

function NewsHeader() {
    return (
        <>
            <div className='w-full items-center justify-evenly flex border-b-2 h-44'>
                <div className='hidden md:block lg:w-1/4 lg:flex flex-col p-7 items-start'>
                    <Autocomplete
                        label="Select Your Category"
                        defaultItems="arfath"
                        placeholder="Section"
                        defaultSelectedKey="cat"
                        color='dark'
                        size='sm'
                        variant="bordered"
                    >
                        <AutocompleteItem>"aarf"</AutocompleteItem>
                    </Autocomplete>
                    <h1 className='p-3 font-bold'>Tuesday, Jul 16, 2024 <br /> <small> TODAY'S PAPER</small></h1>
                </div>
                <div className='lg:hidden md:hidden text-7xl p-5'>
                    <MdMenuBook />
                </div>
                <div className='flex items-center w-3/4 justify-evenly'>
                    <div className='flex items-center  flex-col'>
                        <small className='pt-6'>English | हिंदी| मराठी| മലയാളം| 中国人</small>
                        <hr className='w-full' />
                        <span className='lg:text-9xl md:text-7xl text-6xl'>Newsify</span>
                    </div>
                    <div className='flex flex-col p-4'>
                        <button className='bg-[#1D9BF0] p-3 flex justify-center items-center gap-3 text-white rounded-md'>
                            Newsletter
                            <SlEnvolopeLetter />
                        </button>
                        <h1 className='p-6'>EDITION INDIA</h1>
                    </div>
                </div>
            </div>
            <div className='cursor-pointer sticky top-0 bg-white z-10  h-9 w-full border-b-2 flex gap-6 items-center justify-evenly overflow-auto' >
                <h1 className='text-[#1D9BF0]'>Home</h1>
                <h1>My Express</h1>
                <h1>India</h1>
                <h1>Sports</h1>
                <h1>Entertainment</h1>
                <h1>Education</h1>
                <h1>Research</h1>
                <h1>Tech</h1>
                <h1>Politics</h1>
                <h1>Business</h1>
            </div>
        </>
    )
}

export default NewsHeader
