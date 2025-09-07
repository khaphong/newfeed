import React from 'react';

interface ArticleHeaderProps {
  title: string;
  category: string;
  publishDate: string;
  author: string;
  readTime?: string;
}

const ArticleHeader: React.FC<ArticleHeaderProps> = ({
  title,
  category,
  publishDate,
  author,
  readTime
}) => {
  return (
    <div className="article-header">
      <div className="article-breadcrumb">
        <a href="/" className="breadcrumb-link">Trang chủ</a>
        <span className="breadcrumb-separator">›</span>
        <a href={`/category/${category.toLowerCase()}`} className="breadcrumb-link">
          {category}
        </a>
      </div>
      
      <h1 className="article-title">{title}</h1>
      
      <div className="article-meta">
        <span className="article-category">{category}</span>
        <span className="article-date">{publishDate}</span>
        <span className="article-author">Tác giả: {author}</span>
        {readTime && <span className="article-read-time">{readTime}</span>}
      </div>
    </div>
  );
};

export default ArticleHeader;
