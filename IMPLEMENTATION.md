# 实施指南 / Implementation Guide

## 中文说明 / Chinese Instructions

### 项目概述
这是一个基于Next.js的AI文档摘要应用，允许用户上传PDF或TXT文件，自动提取文本并使用GitHub Models API生成AI摘要。

### 主要功能
1. **用户认证** - 使用Supabase Auth的邮箱/密码认证
2. **文件上传** - 支持PDF和TXT文件（最大10MB）
3. **文本提取** - 自动从文件中提取文本内容
4. **AI摘要** - 使用GitHub Models API（GPT-4o-mini）生成摘要
5. **智能缓存** - 文本和摘要存储在数据库中避免重复处理
6. **历史记录** - 查看所有上传的文档和摘要

### 快速开始

#### 1. 安装依赖
```bash
npm install
```

#### 2. 配置Supabase
1. 访问 [supabase.com](https://supabase.com) 创建项目
2. 在SQL编辑器中运行 `supabase-schema.sql` 文件
3. 获取项目URL和anon key（设置 > API）

#### 3. 配置GitHub Models API
1. 访问 [GitHub Models](https://github.com/marketplace/models)
2. 获取GitHub Token
3. 记录端点: `https://models.inference.ai.azure.com`

#### 4. 设置环境变量
复制 `.env.example` 到 `.env.local` 并填入你的配置:
```bash
cp .env.example .env.local
```

编辑 `.env.local`:
```env
NEXT_PUBLIC_SUPABASE_URL=你的Supabase项目URL
NEXT_PUBLIC_SUPABASE_ANON_KEY=你的Supabase匿名密钥
GITHUB_TOKEN=你的GitHub令牌
GITHUB_MODEL_ENDPOINT=https://models.inference.ai.azure.com
NEXT_PUBLIC_APP_URL=http://localhost:3000
```

#### 5. 运行开发服务器
```bash
npm run dev
```

打开 [http://localhost:3000](http://localhost:3000)

### 用户流程
1. 注册/登录账户
2. 上传PDF或TXT文件
3. 系统自动：
   - 保存文件到Supabase Storage
   - 提取文本内容
   - 缓存文本到数据库
   - 发送到AI生成摘要
   - 返回并显示摘要
4. 查看历史文档和摘要

### 部署到Vercel
```bash
npm install -g vercel
vercel
```

或通过GitHub连接到Vercel自动部署。

### 技术栈
- **前端**: Next.js 14, React 18, TypeScript, Tailwind CSS
- **后端**: Next.js API Routes（无服务器函数）
- **数据库**: PostgreSQL（Supabase）
- **存储**: Supabase Storage
- **AI**: GitHub Models API (GPT-4o-mini)
- **部署**: Vercel

---

## English Instructions

### Project Overview
An AI-powered document summarization application built with Next.js that allows users to upload PDF or TXT files, automatically extract text, and generate AI summaries using GitHub Models API.

### Key Features
1. **User Authentication** - Email/password authentication with Supabase Auth
2. **File Upload** - Support for PDF and TXT files (max 10MB)
3. **Text Extraction** - Automatic text extraction from files
4. **AI Summarization** - Generate summaries using GitHub Models API (GPT-4o-mini)
5. **Smart Caching** - Text and summaries stored in database to avoid reprocessing
6. **History** - View all uploaded documents and their summaries

### Quick Start

#### 1. Install Dependencies
```bash
npm install
```

#### 2. Configure Supabase
1. Visit [supabase.com](https://supabase.com) and create a project
2. Run the `supabase-schema.sql` file in SQL Editor
3. Get your project URL and anon key (Settings > API)

#### 3. Configure GitHub Models API
1. Visit [GitHub Models](https://github.com/marketplace/models)
2. Get your GitHub Token
3. Note the endpoint: `https://models.inference.ai.azure.com`

#### 4. Set Environment Variables
Copy `.env.example` to `.env.local` and fill in your configuration:
```bash
cp .env.example .env.local
```

Edit `.env.local`:
```env
NEXT_PUBLIC_SUPABASE_URL=your-supabase-project-url
NEXT_PUBLIC_SUPABASE_ANON_KEY=your-supabase-anon-key
GITHUB_TOKEN=your-github-token
GITHUB_MODEL_ENDPOINT=https://models.inference.ai.azure.com
NEXT_PUBLIC_APP_URL=http://localhost:3000
```

#### 5. Run Development Server
```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000)

### User Flow
1. Sign up / Sign in to your account
2. Upload a PDF or TXT file
3. System automatically:
   - Saves file to Supabase Storage
   - Extracts text content
   - Caches text in database
   - Sends to AI for summary generation
   - Returns and displays summary
4. View document history and summaries

### Deploy to Vercel
```bash
npm install -g vercel
vercel
```

Or connect to Vercel via GitHub for automatic deployments.

### Tech Stack
- **Frontend**: Next.js 14, React 18, TypeScript, Tailwind CSS
- **Backend**: Next.js API Routes (Serverless Functions)
- **Database**: PostgreSQL (via Supabase)
- **Storage**: Supabase Storage
- **AI**: GitHub Models API (GPT-4o-mini)
- **Deployment**: Vercel

### Security Features
- ✅ Authentication required for all operations
- ✅ Row Level Security (RLS) on database
- ✅ Storage policies ensure users only access their files
- ✅ File type and size validation
- ✅ Secure API endpoints

### Performance
- ✅ Text caching (no re-extraction)
- ✅ Summary caching (no re-generation)
- ✅ Efficient database queries
- ✅ Serverless architecture for auto-scaling

## Support / 支持

For questions or issues, please open an issue on GitHub.

如有问题，请在GitHub上提出issue。
