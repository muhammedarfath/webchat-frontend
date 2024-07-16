import React, { useEffect, useState, useRef } from 'react';
import NewsCard from './NewsCard';
import axios from 'axios';

function DragCards() {
  const containerRef = useRef(null);
  const [news, setNews] = useState([]);
  const apiKey = '6ddc9e9c7fd748098d59311d1bd5481e';
  const url = `https://newsapi.org/v2/top-headlines?country=us&apiKey=${apiKey}`;
  const [latestFiveNews, setLatestFiveNews] = useState([]);

  useEffect(() => {
    const fetchNews = async () => {
      try {
        const response = await axios.get(url);
        const articles = response.data.articles.slice(0, 5); 
        console.log(articles,"just nokaaam");
        setNews(response.data.articles);
        setLatestFiveNews(articles);
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
    <div className='w-full h-full' ref={containerRef}>
      {latestFiveNews.map((article, index) => (
        <NewsCard
          key={index}
          news={article}
          containerRef={containerRef}
          top={getRandomTop()}
          rotate={getRandomRotate()}
          left={getRandomLeft()}
          className="w-36 md:w-56"
        />
      ))}
    </div>
  );
}

export default DragCards;
