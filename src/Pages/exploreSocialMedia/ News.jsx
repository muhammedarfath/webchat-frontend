import React, { useEffect, useState } from "react";
import axios from "axios";
import requests from "../../utils/urls";
import NewsHeader from "../../Components/newscards/NewsHeader";
import { showErrorToast } from "../../utils/Toaser";
import Carousel from "../../Components/newscards/Carousel";
import { useSelector } from "react-redux";
import { useSearchParams } from "react-router-dom";
import NewsCards from "../../Components/newscards/NewsCards";

function News() {
  const [latesFiveNews, setLatestFiveNews] = useState([]);
  const [news, setNews] = useState([]);
  const { is_email_verified } = useSelector((state) => state.auth);
  const [searchParams, setSearchParams] = useSearchParams();
  const [category, setCategory] = useState("busines");
  const content_id = searchParams.get("id");
  const newsreport = searchParams.get("source");

  useEffect(() => {
    const fetchNews = async (category) => {
      try {
        const response = await axios.get(`${requests.busines}`);
        const articles = response.data.articles.slice(0, 5);
        if (response && is_email_verified) {
          setLatestFiveNews(articles);
          setNews(response.data.articles);
        } else {
          showErrorToast(
            "Please verify your email to explore all Fybox features"
          );
        }
      } catch (error) {
        showErrorToast("Error fetching top headlines:", error);
      }
    };
    fetchNews();
  }, []);

  const selectedArticle = news[content_id];
  const handleCategoryChange = (newCategory) => {
    setCategory(newCategory);
  };
  return (
    <div className="w-full h-full overflow-auto mb-20">
      <NewsHeader onCategoryChange={handleCategoryChange}/>
      <hr className="w-full mt-1" />
      {!selectedArticle ? (
        <>
          <div className="w-full border-b-2 overflow-auto">
            <Carousel news={latesFiveNews} />
          </div>
          <NewsCards news={news} setSearchParams={setSearchParams} />
        </>
      ) : (
        <div className="flex w-full h-full justify-center p-4">
          <div className="flex flex-col w-3/4">
            <small>{selectedArticle.publishedAt}</small>
            <h1 className="text-4xl font-bold">{selectedArticle.title}</h1>
            <span className="text-2xl ">{selectedArticle.description}</span>
            <hr className="w-full mt-9 " />
            <img src={selectedArticle.image} className="w-full" alt="" />
            <div className="flex items-center m-4">
              <span>SOURCE : </span>
              <h4 className="font-bold text-large">
                {selectedArticle.source.name}
              </h4>
            </div>
            <h1 className="h-full">{selectedArticle.content}</h1>
          </div>
        </div>
      )}
    </div>
  );
}

export default News;
