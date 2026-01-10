"use client";

import React, { useState, useEffect } from "react";
import Parser from "rss-parser";
import NewsCard from "./NewsCard";

const NewsSection: React.FC = () => {
  const [news, setNews] = useState<{ [key: string]: any }[]>([]);

  useEffect(() => {
    const parser = new Parser();

    const fetchNews = async () => {
      try {
        const feed = await parser.parseURL(
          `https://www.cnbc.com/id/19854910/device/rss/rss.html`
        );
        setNews(feed.items);
        console.log("Fetched news:", feed.items);
      } catch (err) {
        console.error("Error fetching RSS feed:", err);
      }
    };

    // const fetchNews = async () => {
    //   try {
    //     const response = await fetch("/api/proxy-rss");
    //     const data = await response.json();
    //     // Process the RSS feed data
    //     console.log("Fetched RSS feed:", data);
    //   } catch (err) {
    //     console.error("Error fetching RSS feed:", err);
    //   }
    // };

    fetchNews();
  }, []);

  return (
    <section id="TechNews." className="hidden lg:block py-10">
      <div>
        <div className="flex flex-col justify-end text-2xl bold w-full text-center mb-10  sm:h-48">
          Tech News
        </div>

        <div className="relative w-full overflow-x-auto">
          <div className="flex group">
            <ul className="animate-loop-scroll flex group-hover:paused">
              {news.map((item, index) => (
                <li key={index}>
                  <NewsCard
                    title={item.title}
                    content={item.content}
                    newsUrl={item.link}
                  />
                </li>
              ))}
            </ul>

            <ul className="animate-loop-scroll flex group-hover:paused">
              {news.map((item, index) => (
                <li key={index}>
                  <NewsCard
                    title={item.title}
                    content={item.content}
                    newsUrl={item.link}
                  />
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </section>
  );
};

export default NewsSection;
