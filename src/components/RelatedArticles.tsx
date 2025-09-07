import React from 'react';
import ArticleCard from './ArticleCard';
import type { ArticlePage } from '../types';

interface RelatedArticlesProps {
  articles: ArticlePage[];
}

const RelatedArticles: React.FC<RelatedArticlesProps> = ({ articles }) => {
  return (
    <div className="related-articles">
      <h3 className="related-title">Bài viết liên quan</h3>
      <div className="related-grid">
        {articles.map((article) => (
          <ArticleCard
            key={article.id}
            article={article}
            variant="small"
          />
        ))}
      </div>
    </div>
  );
};

export default RelatedArticles;
