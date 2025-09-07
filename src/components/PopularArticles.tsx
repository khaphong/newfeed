import React from 'react';

interface PopularArticlesProps {
  articles?: Array<{
    id: number;
    title: string;
    views: number;
  }>;
}

const PopularArticles: React.FC<PopularArticlesProps> = ({ articles }) => {
  // Default mock data if no articles provided
  const defaultArticles = Array.from({length: 5}, (_, i) => ({
    id: i + 1,
    title: `Bài viết được quan tâm số ${i + 1}`,
    views: Math.floor(Math.random() * 1000 + 100)
  }));

  const displayArticles = articles || defaultArticles;

  return (
    <div className="sidebar-widget">
      <h3 className="sidebar-title">
        ĐƯỢC QUAN TÂM NHẤT
      </h3>
      <div className="sidebar-list">
        {displayArticles.map((article, index) => (
          <div key={article.id} className="sidebar-item">
            <span className="sidebar-number">
              {index + 1}
            </span>
            <div className="sidebar-item-content">
              <h4 className="sidebar-item-title">
                {article.title}
              </h4>
              <div className="sidebar-item-meta">
                {article.views} lượt xem
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default PopularArticles;
