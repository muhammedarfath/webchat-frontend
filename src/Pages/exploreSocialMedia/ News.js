import React, { useEffect, useState } from 'react'
import axios from "axios";
import DragCards from '../../Components/newscards/DragCards';

function  News() {




  return (
    <div className='w-full'>
      <h1 className='font-serif lg:text-9xl md:text-7xl text-6xl w-full items-center flex justify-center border-b-2 h-48'>Newsify</h1>
      <div className='w-full h-full overflow-auto'>
        <DragCards/>
      </div>
    </div>
  )
}

export default  News
