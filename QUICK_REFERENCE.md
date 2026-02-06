# Quick Reference Guide / 快速参考指南

## Application Screenshots / 应用截图

### Login Page / 登录页面
![Login Page](https://github.com/user-attachments/assets/59b4a098-b37c-4e73-9eb8-37a7cca73d60)

### Sign Up Page / 注册页面
![Sign Up Page](https://github.com/user-attachments/assets/0e13f771-fb51-4d23-8910-4dc20c166c20)

## Quick Commands / 快速命令

### Development / 开发
```bash
npm install          # Install dependencies / 安装依赖
npm run dev         # Start development server / 启动开发服务器
npm run build       # Build for production / 生产构建
npm start           # Start production server / 启动生产服务器
npm run lint        # Run linter / 运行代码检查
```

### Environment Setup / 环境设置
```bash
cp .env.example .env.local
# Edit .env.local with your credentials / 编辑 .env.local 填入你的凭证
```

## API Endpoints / API 端点

| Endpoint | Method | Description |
|----------|--------|-------------|
| `/api/upload` | POST | Upload file and generate summary / 上传文件并生成摘要 |
| `/api/documents` | GET | Get user's documents / 获取用户文档 |
| `/api/auth/callback` | GET | Auth callback / 认证回调 |

## File Structure / 文件结构

```
Ex2/
├── src/
│   ├── app/                    # Next.js App Router pages
│   │   ├── api/               # API routes
│   │   │   ├── upload/        # File upload endpoint
│   │   │   ├── documents/     # Documents list endpoint
│   │   │   └── auth/callback/ # Auth callback
│   │   ├── dashboard/         # Dashboard page
│   │   ├── page.tsx           # Login/signup page
│   │   ├── layout.tsx         # Root layout
│   │   └── globals.css        # Global styles
│   ├── components/            # React components
│   │   ├── FileUpload.tsx     # File upload component
│   │   └── DocumentList.tsx   # Document list component
│   ├── lib/                   # Utility libraries
│   │   ├── ai/                # AI integration
│   │   │   └── summarizer.ts  # GitHub Models API integration
│   │   ├── supabase/          # Supabase clients
│   │   │   ├── client.ts      # Browser client
│   │   │   └── server.ts      # Server client
│   │   └── text-extractor.ts  # PDF/TXT text extraction
│   ├── types/                 # TypeScript type definitions
│   │   └── database.types.ts  # Database schema types
│   └── middleware.ts          # Auth middleware
├── supabase-schema.sql        # Database schema
├── SETUP.md                   # Setup instructions
├── IMPLEMENTATION.md          # Implementation guide
└── README.md                  # Project overview

```

## Configuration Files / 配置文件

| File | Purpose |
|------|---------|
| `next.config.js` | Next.js configuration |
| `tsconfig.json` | TypeScript configuration |
| `tailwind.config.ts` | Tailwind CSS configuration |
| `postcss.config.mjs` | PostCSS configuration |
| `.eslintrc.json` | ESLint configuration |
| `vercel.json` | Vercel deployment config |

## Database Schema / 数据库架构

### Documents Table / 文档表
```sql
CREATE TABLE documents (
  id UUID PRIMARY KEY,
  user_id UUID NOT NULL,
  file_name TEXT NOT NULL,
  file_type TEXT NOT NULL,
  file_size INTEGER NOT NULL,
  storage_path TEXT NOT NULL,
  cached_text TEXT,
  summary TEXT,
  created_at TIMESTAMP,
  updated_at TIMESTAMP
);
```

## Environment Variables / 环境变量

| Variable | Description | Required |
|----------|-------------|----------|
| `NEXT_PUBLIC_SUPABASE_URL` | Supabase project URL / Supabase项目URL | ✅ |
| `NEXT_PUBLIC_SUPABASE_ANON_KEY` | Supabase anon key / Supabase匿名密钥 | ✅ |
| `GITHUB_TOKEN` | GitHub personal access token / GitHub令牌 | ✅ |
| `GITHUB_MODEL_ENDPOINT` | GitHub Models API endpoint | ✅ |
| `NEXT_PUBLIC_APP_URL` | Application URL / 应用URL | ✅ |

## Troubleshooting / 故障排除

### Common Issues / 常见问题

**Build Error: PostCSS**
```bash
npm install @tailwindcss/postcss --save-dev
```

**Supabase Connection Error**
- Check your `.env.local` file has correct credentials
- Verify Supabase project is active
- Run `supabase-schema.sql` in SQL Editor

**File Upload Error**
- Ensure Supabase Storage bucket 'documents' exists
- Verify storage policies are configured
- Check file size is under 10MB

**AI Summary Error**
- Verify GitHub token has correct permissions
- Check GitHub Models API quota/limits
- Ensure GITHUB_TOKEN environment variable is set

## Security Best Practices / 安全最佳实践

1. ✅ Never commit `.env.local` or `.env` files
2. ✅ Keep API keys and tokens secret
3. ✅ Use Row Level Security (RLS) in Supabase
4. ✅ Validate file types and sizes on server
5. ✅ Sanitize user inputs
6. ✅ Use HTTPS in production

## Performance Tips / 性能提示

1. ✅ Text and summaries are cached in database
2. ✅ Use Vercel Edge Network for global performance
3. ✅ Optimize images and assets
4. ✅ Enable compression in production
5. ✅ Monitor API usage and quotas

## Next Steps / 下一步

1. Set up Supabase project / 设置Supabase项目
2. Configure environment variables / 配置环境变量
3. Run database schema / 运行数据库架构
4. Test locally / 本地测试
5. Deploy to Vercel / 部署到Vercel

## Support / 支持

- 📖 [SETUP.md](./SETUP.md) - Detailed setup guide
- 📖 [IMPLEMENTATION.md](./IMPLEMENTATION.md) - Implementation details
- 🐛 [GitHub Issues](https://github.com/Alfred8936/Ex2/issues) - Report bugs
- 📧 Email: algernon607@163.com

---

**Built with ❤️ using Next.js, Supabase, and GitHub Models API**
