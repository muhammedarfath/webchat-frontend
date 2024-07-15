import React, { useEffect, useState, useRef } from 'react';
import NewsCard from './NewsCard';
import axios from 'axios';

function DragCards() {
  const containerRef = useRef(null);
  const [news, setNews] = useState([]);
  const apiKey = '6ddc9e9c7fd748098d59311d1bd5481e';
  const url = `https://newsapi.org/v2/top-headlines?country=in&apiKey=${apiKey}`;

  useEffect(() => {
    const fetchNews = async () => {
      try {
        const response = await axios.get(url);
        setNews(response.data.articles);
      } catch (error) {
        console.error('Error fetching top headlines:', error);
      }
    };

    fetchNews();
  }, []); 
  const getRandomValue = (min, max) => Math.random() * (max - min) + min;
  
  const getRandomTop = () => `${getRandomValue(10, 90)}%`;
  const getRandomRotate = () => `${getRandomValue(-15, 15)}deg`;
  const getRandomLeft = () => `${getRandomValue(10, 90)}%`;

  return (
    <div className='w-full h-full flex flex-col justify-start items-center' ref={containerRef}>
      {news.map((article, index) => (
        <NewsCard
          key={index} 
          url={article.urlToImage}
          containerRef={containerRef}
          top={getRandomTop()}
          rotate={getRandomRotate()}
          left={getRandomLeft()}
          className="w-[35rem]"
        />
      ))}
    </div>
  );
}

export default DragCards;
