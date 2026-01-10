import Link from "next/link";
import React from "react";

interface NewsCardProps {
  title: string;
  content: string;
  newsUrl: string;
}

const NewsCard: React.FC<NewsCardProps> = ({ title, content, newsUrl }) => {
  return (
    <div className="bg-white news-card relative overflow-hidden hover:scale-105 transform transition-all duration-300 pt-10 pb-20 px-10 shadow">
      <div className="h-48 w-48 sm:w-64 sm:h-56 rounded-t-xl relative group">
        <div className="overlay items-center justify-center absolute top-0 left-0 w-full h-full">
          <Link href={newsUrl} target="_blank">
            <div className="text-customGray">
              <h3 className="project-card__title font-bold text-lg">{title}</h3>
              <p className="project-card__description mt-3">{content}</p>
            </div>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default NewsCard;
