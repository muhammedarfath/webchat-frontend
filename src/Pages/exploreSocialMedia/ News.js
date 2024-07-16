import React, { useEffect, useState } from 'react'
import axios from "axios";
import DragCards from '../../Components/newscards/DragCards';
import { Card, CardHeader, CardBody, Image } from "@nextui-org/react";
import { SlEnvolopeLetter } from "react-icons/sl";
import { Autocomplete, AutocompleteItem } from "@nextui-org/react";

function News() {



  return (
    <div className='w-full font-serif '>
      <div className='w-full items-center flex border-b-2 h-44'>
        <div className='w-1/4 flex flex-col p-7 items-start'>
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
      <div className='cursor-pointer h-9 w-full border-b-2 flex gap-6 items-center justify-evenly overflow-auto' >
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
      <hr className='w-full mt-1'/>
      <div className='w-full border-b-2 h-96 overflow-auto'>
        <DragCards />
      </div>
      <div className='h-full flex gap-6 p-4'>
        <Card className="py-4 h-96">
          <CardHeader className="pb-0 pt-2 px-4 flex-col items-start">
            <p className="text-tiny uppercase font-bold">Daily Mix</p>
            <small className="text-default-500">12 Tracks</small>
            <h4 className="font-bold text-large">Frontend Radio</h4>
          </CardHeader>
          <CardBody className="overflow-visible py-2">
            <Image
              alt="Card background"
              className="object-cover rounded-xl"
              src="https://nextui.org/images/hero-card-complete.jpeg"
              width={270}
            />
          </CardBody>
        </Card>
        <Card className="py-4 h-96">
          <CardHeader className="pb-0 pt-2 px-4 flex-col items-start">
            <p className="text-tiny uppercase font-bold">Daily Mix</p>
            <small className="text-default-500">12 Tracks</small>
            <h4 className="font-bold text-large">Frontend Radio</h4>
          </CardHeader>
          <CardBody className="overflow-visible py-2">
            <Image
              alt="Card background"
              className="object-cover rounded-xl"
              src="https://nextui.org/images/hero-card-complete.jpeg"
              width={270}
            />
          </CardBody>
        </Card>
      </div>
    </div>
  )
}

export default News
