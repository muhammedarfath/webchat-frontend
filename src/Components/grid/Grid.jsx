"use client";
import { cn } from "../../utils/cn";
import React, { useEffect, useState } from "react";
import { BentoGrid, BentoGridItem } from "../../Components/ui/bento-grid";
import { useSelector } from "react-redux";
import axios from "axios";
import { showErrorToast } from "../../utils/Toaser";
import { items } from "./itmes";
import requests from "../../utils/urls";

export function BentoGridThirdDemo() {

  const [users, setUsers] = useState([]);
  const { user_id } = useSelector((state) => state.auth);
  const [isLoading, setIsLoading] = useState(true);
  const [latestNews, setLatestNews] = useState([])

  useEffect(() => {
    setIsLoading(true);
    const fetchUsersWithLastMessages = async () => {
      try {
        const response = await axios.get(
          `${requests.lastThreeMessges}${user_id}/`
        );
        if (response.status === 200) {
          setUsers(response.data);
        }
      } catch (error) {
        showErrorToast("Error fetching users with last messages:", error)
      }
      setIsLoading(false);
    };
    fetchUsersWithLastMessages();
  }, [user_id]);

  useEffect(() => {
    setIsLoading(true);
    const fetchLatestNews = async () => {
      try {
        const response = await axios.get("");
        const articles = response.data.articles.slice(0, 1);
        if (response) {
          setLatestNews(articles);
        } else {
          showErrorToast("Please verify your email to explore all Fybox features")
        }
      } catch (error) {
        showErrorToast('Error fetching top headlines:', error)
      }
      setIsLoading(false);
    };
    fetchLatestNews();
  }, [user_id]);

  return (
    <BentoGrid className="max-w-4xl mx-auto md:auto-rows-[20rem]">
      {items(users, latestNews, isLoading).map((item, i) => (
        <BentoGridItem
          key={i}
          title={item.title}
          description={item.description}
          header={item.header}
          className={cn("[&>p:text-lg]", item.className)}
          icon={item.icon}
        />
      ))}
    </BentoGrid>
  );
}
