import React, { useEffect, useState } from 'react'
import axios from "axios";
import { Card, CardHeader, CardBody, Image } from "@nextui-org/react";
import requests from '../../utils/urls'
import NewsHeader from '../../Components/newscards/NewsHeader';
import { showErrorToast } from '../../utils/Toaser';
import Carousel from '../../Components/newscards/Carousel'
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
        showErrorToast('Error fetching top headlines:', error)
      }
    };
    fetchNews();
  }, []);

  return (
    <div className='w-full font-serif overflow-auto'>
      <NewsHeader/>
      <hr className='w-full mt-1' />
      <div className='w-full border-b-2 overflow-auto'>
        <Carousel news={latesFiveNews} />
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
