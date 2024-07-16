import React, { useEffect, useState } from 'react'
import axios from "axios";
import DragCards from '../../Components/newscards/DragCards';
import { Card, CardHeader, CardBody, Image } from "@nextui-org/react";

function News() {




  return (
    <div className='w-full'>
      <h1 className='font-serif lg:text-9xl md:text-7xl text-6xl w-full items-center flex justify-center border-b-2 h-48'>Newsify</h1>
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
