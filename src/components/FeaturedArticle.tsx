import React from 'react';
import { Link } from 'react-router-dom';

interface FeaturedArticleProps {
  title: string;
  excerpt: string;
  imageUrl: string;
  category: string;
  slug?: string;
}

const FeaturedArticle: React.FC<FeaturedArticleProps> = ({ 
  title, 
  excerpt, 
  imageUrl, 
  category,
  slug = 'xu-huong-cong-nghe-2024-ai-machine-learning'
}) => {
  return (
    <Link to={`/article/${slug}`} className="featured-article">
      <img 
        src={imageUrl}
        alt={title}
        className="featured-article-image"
      />
      <div className="featured-article-overlay">
        <div className="featured-article-content">
          <span className="featured-article-category">
            {category}
          </span>
          <h1 className="featured-article-title">
            {title}
          </h1>
          <p className="featured-article-excerpt">
            {excerpt}
          </p>
        </div>
      </div>
    </Link>
  );
};

export default FeaturedArticle;
