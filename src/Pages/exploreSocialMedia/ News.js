import React, { useEffect, useState } from 'react'
import axios from "axios";
import DragCards from '../../Components/newscards/DragCards';
import { Card, CardHeader, CardBody, Image } from "@nextui-org/react";
import { SlEnvolopeLetter } from "react-icons/sl";
import { Autocomplete, AutocompleteItem } from "@nextui-org/react";
import requests from '../../Components/newscards/urls'
import { MdMenuBook } from "react-icons/md";

function News() {

  const [latesFiveNews, setLatestFiveNews] = useState([])
  const [news, setNews] = useState([])
  useEffect(() => {
    const fetchNews = async () => {
      try {
        const response = await axios.get(requests.world);
        const articles = response.data.articles.slice(0, 5);
        setLatestFiveNews(articles);
        setNews(response.data.articles)
      } catch (error) {
        console.error('Error fetching top headlines:', error);
      }
    };

    fetchNews();
  }, []);


  return (
    <div className='w-full font-serif overflow-auto'>
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
      <hr className='w-full mt-1' />
      <div className='w-full border-b-2 overflow-auto'>
        <DragCards latesFiveNews={latesFiveNews} />
      </div>
      <div className='h-full grid grid-cols-4 gap-4 p-3'>
        {news.map((article, index) => (
          <Card key={index} className="py-4 z-0 h-96">
            <CardHeader className="pb-0 pt-2 px-4 flex-col items-start">
              <p className="text-tiny uppercase font-bold">{article.title}</p>
              <small className="text-default-500">12 Tracks</small>
              <h4 className="font-bold text-large">Frontend Radio</h4>
            </CardHeader>
            <CardBody className="overflow-visible py-2">
              <Image
                alt="Card background"
                className="object-cover rounded-xl"
                src={article.image}
                width={270}
              />
            </CardBody>
          </Card>
        ))}


      </div>
    </div>
  )
}

export default News
