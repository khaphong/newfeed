import React from 'react';

interface ArticleContentProps {
  content: string;
  featuredImage?: string;
  imageCaption?: string;
}

const ArticleContent: React.FC<ArticleContentProps> = ({
  content,
  featuredImage,
  imageCaption
}) => {
  return (
    <div className="article-content">
      {featuredImage && (
        <div className="article-featured-image">
          <img src={featuredImage} alt="" className="featured-image" />
          {imageCaption && (
            <div className="image-caption">{imageCaption}</div>
          )}
        </div>
      )}
      
      <div className="article-body">
        {/* Split content into paragraphs */}
        {content.split('\n\n').map((paragraph, index) => (
          <p key={index} className="article-paragraph">
            {paragraph}
          </p>
        ))}
      </div>
      
      <div className="article-share">
        <h4>Chia sẻ bài viết</h4>
        <div className="share-buttons">
          <button className="share-btn facebook">Facebook</button>
          <button className="share-btn twitter">Twitter</button>
          <button className="share-btn linkedin">LinkedIn</button>
          <button className="share-btn copy">Copy link</button>
        </div>
      </div>
    </div>
  );
};

export default ArticleContent;
