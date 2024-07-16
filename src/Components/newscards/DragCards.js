import React, { useEffect, useState, useRef } from 'react';
import NewsCard from './NewsCard';
import axios from 'axios';

function DragCards({ latesFiveNews }) {
  const containerRef = useRef(null);
  const getRandomValue = (min, max) => Math.random() * (max - min) + min;
  const getRandomTop = () => `${getRandomValue(10, 90)}%`;
  const getRandomRotate = () => `${getRandomValue(-15, 15)}deg`;
  const getRandomLeft = () => `${getRandomValue(10, 90)}%`;

  return (
    <div className='w-full h-96 flex justify-evenly items-center' ref={containerRef}>
      {latesFiveNews.map((news, index) => ( 
        <NewsCard
          key={index} 
          news={news}
          containerRef={containerRef}
          top={getRandomTop()}
          rotate={getRandomRotate()}
          left={getRandomLeft()}
        />
      ))}
    </div>
  );
}

export default DragCards;
