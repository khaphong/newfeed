import React from 'react';
import { useParams } from 'react-router-dom';
import ArticleHeader from '../components/ArticleHeader';
import ArticleContent from '../components/ArticleContent';
import RelatedArticles from '../components/RelatedArticles';
import Sidebar from '../components/Sidebar';
import type { ArticlePage as ArticlePageType } from '../types';

// Mock data - replace with real API calls later
const mockArticle = {
  id: 1,
  title: "Xu hướng công nghệ 2024: AI và Machine Learning đang thay đổi thế giới",
  slug: "xu-huong-cong-nghe-2024-ai-machine-learning",
  category: "Công nghệ",
  author: "Nguyễn Văn A",
  publishDate: "2024-01-15",
  readTime: "5 phút đọc",
  featuredImage: "https://images.unsplash.com/photo-1677442136019-21780ecad995?w=800&h=450&fit=crop",
  imageCaption: "Trí tuệ nhân tạo đang thay đổi cách chúng ta làm việc và sống",
  content: `Trí tuệ nhân tạo (AI) và Machine Learning đang trở thành những công nghệ then chốt định hình tương lai của chúng ta. Từ các ứng dụng đơn giản trong đời sống hàng ngày đến những breakthrough trong nghiên cứu khoa học, AI đang chứng minh sức mạnh to lớn của mình.

Theo báo cáo mới nhất từ các chuyên gia công nghệ, năm 2024 được dự đoán sẽ là năm bùng nổ của AI trong nhiều lĩnh vực. Từ y tế, giáo dục, đến giao thông và tài chính, AI đang được ứng dụng rộng rãi để tối ưu hóa quy trình và nâng cao hiệu quả.

Một trong những xu hướng nổi bật nhất là việc tích hợp AI vào các thiết bị IoT (Internet of Things). Smart homes, smart cities đang trở thành hiện thực nhờ vào sự kết hợp giữa AI và IoT. Các thiết bị thông minh có thể học hỏi từ thói quen của người dùng và tự động điều chỉnh để mang lại trải nghiệm tốt nhất.

Trong lĩnh vực y tế, AI đang giúp các bác sĩ chẩn đoán bệnh chính xác hơn và nhanh hơn. Các thuật toán machine learning có thể phân tích hàng nghìn hình ảnh y khoa trong vài giây, phát hiện ra những dấu hiệu bệnh lý mà mắt thường có thể bỏ qua.

Tuy nhiên, cùng với những cơ hội to lớn, AI cũng đặt ra nhiều thách thức về đạo đức, bảo mật và việc làm. Việc phát triển AI một cách có trách nhiệm đang trở thành ưu tiên hàng đầu của các công ty công nghệ lớn trên thế giới.`
};

const mockRelatedArticles: ArticlePageType[] = [
  {
    id: 2,
    title: "Blockchain và tương lai của tài chính số",
    slug: "blockchain-tuong-lai-tai-chinh-so",
    intro: "Công nghệ blockchain đang revolutionize ngành tài chính...",
    publish_date: "2024-01-10T10:00:00Z",
    meta: {
      type: "blog.ArticlePage",
      detail_url: "/api/v2/pages/2/",
      html_url: "/article/blockchain-tuong-lai-tai-chinh-so/",
      slug: "blockchain-tuong-lai-tai-chinh-so",
      first_published_at: "2024-01-10T10:00:00Z",
      last_published_at: "2024-01-10T10:00:00Z",
      seo_title: "Blockchain và tương lai của tài chính số",
      search_description: ""
    },
    featured_image: {
      id: 2,
      title: "Blockchain image",
      width: 800,
      height: 450,
      download_url: "https://images.unsplash.com/photo-1639762681485-074b7f938ba0?w=400&h=250&fit=crop"
    },
    categories: [{ id: 1, name: "Công nghệ", slug: "cong-nghe" }],
    tags: [{ id: 1, name: "blockchain", slug: "blockchain" }]
  },
  {
    id: 3,
    title: "5G và sự thay đổi trong kết nối Internet",
    slug: "5g-thay-doi-ket-noi-internet",
    intro: "Mạng 5G mang đến tốc độ kết nối chưa từng có...",
    publish_date: "2024-01-08T14:30:00Z",
    meta: {
      type: "blog.ArticlePage",
      detail_url: "/api/v2/pages/3/",
      html_url: "/article/5g-thay-doi-ket-noi-internet/",
      slug: "5g-thay-doi-ket-noi-internet",
      first_published_at: "2024-01-08T14:30:00Z",
      last_published_at: "2024-01-08T14:30:00Z",
      seo_title: "5G và sự thay đổi trong kết nối Internet",
      search_description: ""
    },
    featured_image: {
      id: 3,
      title: "5G image",
      width: 800,
      height: 450,
      download_url: "https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=400&h=250&fit=crop"
    },
    categories: [{ id: 1, name: "Công nghệ", slug: "cong-nghe" }],
    tags: [{ id: 2, name: "5g", slug: "5g" }]
  },
  {
    id: 4,
    title: "Cybersecurity trong thời đại số",
    slug: "cybersecurity-thoi-dai-so",
    intro: "Bảo mật thông tin trở thành ưu tiên hàng đầu...",
    publish_date: "2024-01-05T09:15:00Z",
    meta: {
      type: "blog.ArticlePage",
      detail_url: "/api/v2/pages/4/",
      html_url: "/article/cybersecurity-thoi-dai-so/",
      slug: "cybersecurity-thoi-dai-so",
      first_published_at: "2024-01-05T09:15:00Z",
      last_published_at: "2024-01-05T09:15:00Z",
      seo_title: "Cybersecurity trong thời đại số",
      search_description: ""
    },
    featured_image: {
      id: 4,
      title: "Cybersecurity image",
      width: 800,
      height: 450,
      download_url: "https://images.unsplash.com/photo-1550751827-4bd374c3f58b?w=400&h=250&fit=crop"
    },
    categories: [{ id: 2, name: "Bảo mật", slug: "bao-mat" }],
    tags: [{ id: 3, name: "cybersecurity", slug: "cybersecurity" }]
  }
];

// Mock sidebar data
const mockSidebarData = {
  recentArticles: mockRelatedArticles.slice(0, 5),
  popularArticles: mockRelatedArticles.slice(0, 5),
  categories: [
    { id: 1, name: "Công nghệ", slug: "cong-nghe" },
    { id: 2, name: "Bảo mật", slug: "bao-mat" },
    { id: 3, name: "Khoa học", slug: "khoa-hoc" }
  ],
  tags: [
    { id: 1, name: "AI", slug: "ai" },
    { id: 2, name: "blockchain", slug: "blockchain" },
    { id: 3, name: "5g", slug: "5g" }
  ]
};

const ArticlePage: React.FC = () => {
  const { slug } = useParams<{ slug: string }>();

  // In a real app, you would fetch the article based on slug
  console.log('Article slug:', slug);

  return (
    <div className="article-page">
      <main className="article-main">
        <div className="container">
          <div className="article-layout">
            <article className="article-content-wrapper">
              <ArticleHeader
                title={mockArticle.title}
                category={mockArticle.category}
                publishDate={mockArticle.publishDate}
                author={mockArticle.author}
                readTime={mockArticle.readTime}
              />
              
              <ArticleContent
                content={mockArticle.content}
                featuredImage={mockArticle.featuredImage}
                imageCaption={mockArticle.imageCaption}
              />
              
              <RelatedArticles articles={mockRelatedArticles} />
            </article>
            
            <aside className="article-sidebar">
              <Sidebar 
                recentArticles={mockSidebarData.recentArticles}
                popularArticles={mockSidebarData.popularArticles}
                categories={mockSidebarData.categories}
                tags={mockSidebarData.tags}
              />
            </aside>
          </div>
        </div>
      </main>
    </div>
  );
};

export default ArticlePage;
