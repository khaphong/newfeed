import React from 'react';
import { Link } from 'react-router-dom';

interface NewsItemProps {
  title: string;
  excerpt: string;
  imageUrl: string;
  date?: string;
  readTime?: string;
  slug?: string;
}

const NewsItem: React.FC<NewsItemProps> = ({ 
  title, 
  excerpt, 
  imageUrl, 
  date, 
  readTime,
  slug = 'xu-huong-cong-nghe-2024-ai-machine-learning'
}) => {
  return (
    <Link to={`/article/${slug}`} className="latest-news-item">
      <img 
        src={imageUrl}
        alt={title}
        className="latest-news-image"
      />
      <div className="latest-news-content">
        <h3 className="latest-news-title">
          {title}
        </h3>
        <p className="latest-news-excerpt">
          {excerpt}
        </p>
        {(date || readTime) && (
          <div className="latest-news-meta">
            {date && <span>{date}</span>}
            {date && readTime && <span> • </span>}
            {readTime && <span>{readTime}</span>}
          </div>
        )}
      </div>
    </Link>
  );
};

export default NewsItem;
