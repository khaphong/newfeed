# React + TypeScript + Vite

This template provides a minimal setup to get React working in Vite with HMR and some ESLint rules.

Currently, two official plugins are available:

- [@vitejs/plugin-react](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react) uses [Babel](https://babeljs.io/) for Fast Refresh
- [@vitejs/plugin-react-swc](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react-swc) uses [SWC](https://swc.rs/) for Fast Refresh

# NewsHub - React News Website

Một website tin tức hiện đại được xây dựng với React.js, Vite, TailwindCSS và tích hợp với Wagtail CMS API. Thiết kế lấy cảm hứng từ Genk.vn với giao diện responsive và tối ưu SEO.

![NewsHub](https://via.placeholder.com/800x400/3B82F6/FFFFFF?text=NewsHub+React+News+Website)

## ✨ Tính năng

### 🚀 Công nghệ hiện đại
- **React 19.1.1** - Framework UI mới nhất
- **TypeScript** - Type safety cho dự án lớn
- **Vite** - Build tool nhanh chóng
- **TailwindCSS** - Utility-first CSS framework
- **React Router v6** - Client-side routing

### 📱 Responsive Design
- Thiết kế mobile-first
- Giao diện thích ứng tất cả thiết bị
- Menu hamburger cho mobile
- Grid layout linh hoạt

### 🔌 Tích hợp API
- Kết nối Wagtail CMS API v2
- TypeScript interfaces đầy đủ
- Error handling và loading states
- Axios HTTP client

### 🎨 UI/UX
- Màu sắc lấy cảm hứng từ Genk.vn (đỏ/xanh)
- Component library đầy đủ
- Hover effects và transitions
- Dark mode ready

### ⚡ Performance
- Lazy loading images
- Code splitting
- Infinite scroll pagination
- SEO optimization

## 🏗️ Cấu trúc dự án

```
src/
├── components/          # Reusable UI components
│   ├── Header.tsx      # Navigation header
│   ├── Footer.tsx      # Site footer
│   ├── HeroBanner.tsx  # Featured article banner
│   ├── ArticleCard.tsx # Article card variants
│   └── Sidebar.tsx     # Sidebar with widgets
├── pages/              # Page components
│   ├── HomePage.tsx    # Landing page
│   ├── CategoryPage.tsx # Category listings
│   ├── ArticlePage.tsx # Article detail
│   └── TagPage.tsx     # Tag listings
├── services/           # API services
│   └── api.ts          # Wagtail API integration
├── types/              # TypeScript definitions
│   └── index.ts        # API response types
├── hooks/              # Custom React hooks
├── assets/             # Static assets
└── styles.css          # Global styles
```

## 🚀 Cài đặt và chạy

### Yêu cầu hệ thống
- Node.js 18+ 
- npm 10+
- Wagtail CMS backend (optional)

### 1. Clone repository
```bash
git clone https://github.com/your-username/newshub-react.git
cd newshub-react
```

### 2. Cài đặt dependencies
```bash
npm install
```

### 3. Cấu hình environment
```bash
cp .env.example .env
```

Chỉnh sửa `.env`:
```env
VITE_API_BASE_URL=http://localhost:8000/api/v2
VITE_APP_NAME=NewsHub
VITE_APP_DESCRIPTION=Trang tin tức hàng đầu Việt Nam
```

### 4. Chạy development server
```bash
npm run dev
```

Website sẽ chạy tại: http://localhost:5173

### 5. Build production
```bash
npm run build
npm run preview
```

## 🐳 Docker Deployment

### Development với Docker
```bash
docker-compose up --build
```

### Production deployment
```bash
# Build image
docker build -t newshub-frontend .

# Run container
docker run -p 3000:80 newshub-frontend
```

## 📦 Components

### Header Component
- Responsive navigation
- Search functionality
- Category dropdown
- Mobile menu
- Social media links

```tsx
import Header from './components/Header';

<Header />
```

### ArticleCard Component
```tsx
import ArticleCard from './components/ArticleCard';

<ArticleCard 
  article={articleData} 
  variant="default" // "default" | "horizontal" | "small"
/>
```

### HeroBanner Component
```tsx
import HeroBanner from './components/HeroBanner';

<HeroBanner featuredArticle={article} />
```

### Sidebar Component
```tsx
import Sidebar from './components/Sidebar';

<Sidebar 
  recentArticles={recent}
  popularArticles={popular}
  categories={categories}
  tags={tags}
/>
```

## 🔌 API Integration

### Wagtail CMS Setup

Website được thiết kế để tích hợp với Wagtail CMS. Cấu trúc API mong đợi:

#### Article Page Model
```python
class ArticlePage(Page):
    intro = RichTextField(blank=True)
    body = RichTextField(blank=True)
    featured_image = models.ForeignKey('wagtailimages.Image')
    author = models.ForeignKey('Author')
    categories = models.ManyToManyField('Category')
    tags = TaggableManager()
    reading_time = models.IntegerField(default=5)
    publish_date = models.DateTimeField(default=timezone.now)
```

#### API Endpoints
- `GET /api/v2/pages/?type=news.ArticlePage` - Danh sách bài viết
- `GET /api/v2/pages/?slug=article-slug` - Chi tiết bài viết
- `GET /api/v2/snippets/news.Category/` - Danh mục
- `GET /api/v2/snippets/taggit.Tag/` - Tags

### Mock Data
Nếu chưa có Wagtail backend, có thể sử dụng mock data trong `services/api.ts`.

## 🎨 Customization

### Thay đổi màu sắc
Chỉnh sửa `tailwind.config.js`:
```js
module.exports = {
  theme: {
    extend: {
      colors: {
        'genk-red': '#dc2626',
        'genk-blue': '#2563eb',
        'custom-color': '#your-color'
      }
    }
  }
}
```

### Thêm component mới
1. Tạo file trong `src/components/`
2. Export component
3. Import và sử dụng

### Custom styling
Thêm styles vào `src/styles.css` hoặc tạo file CSS riêng.

## 📊 SEO Optimization

- Semantic HTML structure
- Meta tags động
- Open Graph tags
- Twitter Card tags
- Structured data (JSON-LD)
- Fast loading times
- Mobile-friendly design

Để thêm React Helmet cho SEO:
```bash
npm install react-helmet-async
```

## 🔧 Scripts

```bash
# Development
npm run dev          # Start dev server
npm run build        # Build for production
npm run preview      # Preview production build
npm run lint         # Run ESLint
npm run type-check   # TypeScript checking

# Testing (nếu cần thêm)
npm run test         # Run tests
npm run test:e2e     # End-to-end tests
```

## 📈 Performance Tips

### 1. Image Optimization
- Sử dụng WebP format
- Lazy loading với Intersection Observer
- Responsive images với srcset

### 2. Code Splitting
```tsx
import { lazy, Suspense } from 'react';

const ArticlePage = lazy(() => import('./pages/ArticlePage'));

<Suspense fallback={<div>Loading...</div>}>
  <ArticlePage />
</Suspense>
```

### 3. Caching
- Service Worker
- API response caching
- Static asset caching

## 🐛 Troubleshooting

### Build errors
```bash
# Clear cache
rm -rf node_modules dist
npm install

# Legacy peer deps (nếu cần)
npm install --legacy-peer-deps
```

### TypeScript errors
- Kiểm tra `tsconfig.json`
- Update `@types/*` packages
- Restart TypeScript server trong VS Code

### API connection issues
- Kiểm tra CORS settings
- Verify API endpoints
- Check environment variables

## 🤝 Contributing

1. Fork repository
2. Tạo feature branch: `git checkout -b feature/amazing-feature`
3. Commit changes: `git commit -m 'Add amazing feature'`
4. Push branch: `git push origin feature/amazing-feature`
5. Tạo Pull Request

### Development guidelines
- Sử dụng TypeScript cho tất cả components
- Follow ESLint rules
- Viết tests cho features mới
- Document API changes
- Responsive design cho tất cả components

## 📄 License

MIT License - xem [LICENSE](LICENSE) file chi tiết.

## 👥 Team

- **Frontend Developer** - React.js, TypeScript, TailwindCSS
- **Backend Developer** - Wagtail CMS, Django, PostgreSQL  
- **DevOps** - Docker, CI/CD, Deployment

## 🆘 Support

Nếu gặp vấn đề:
1. Kiểm tra [Issues](https://github.com/your-username/newshub-react/issues)
2. Tạo issue mới với template
3. Liên hệ team qua email: support@newshub.com

## 🔮 Roadmap

### v1.1 (Coming Soon)
- [ ] User authentication
- [ ] Comment system
- [ ] Social media sharing
- [ ] Newsletter subscription
- [ ] Advanced search

### v1.2 (Future)
- [ ] Multi-language support
- [ ] PWA features
- [ ] Push notifications
- [ ] Admin dashboard
- [ ] Analytics integration

---

**Built with ❤️ in Vietnam**

You can also install [eslint-plugin-react-x](https://github.com/Rel1cx/eslint-react/tree/main/packages/plugins/eslint-plugin-react-x) and [eslint-plugin-react-dom](https://github.com/Rel1cx/eslint-react/tree/main/packages/plugins/eslint-plugin-react-dom) for React-specific lint rules:

```js
// eslint.config.js
import reactX from 'eslint-plugin-react-x'
import reactDom from 'eslint-plugin-react-dom'

export default tseslint.config([
  globalIgnores(['dist']),
  {
    files: ['**/*.{ts,tsx}'],
    extends: [
      // Other configs...
      // Enable lint rules for React
      reactX.configs['recommended-typescript'],
      // Enable lint rules for React DOM
      reactDom.configs.recommended,
    ],
    languageOptions: {
      parserOptions: {
        project: ['./tsconfig.node.json', './tsconfig.app.json'],
        tsconfigRootDir: import.meta.dirname,
      },
      // other options...
    },
  },
])
```
