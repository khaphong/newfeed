import React from 'react';

interface BreakingNewsProps {
  news: string[];
}

const BreakingNews: React.FC<BreakingNewsProps> = ({ news }) => {
  return (
    <div className="breaking-news">
      <div className="container">
        <span className="breaking-news-label">
          TIN NÓNG
        </span>
        <span className="breaking-news-text">
          {news.join(' • ')}
        </span>
      </div>
    </div>
  );
};

export default BreakingNews;
