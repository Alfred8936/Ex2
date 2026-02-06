# Getting Started / 开始使用

## Welcome! / 欢迎！

Congratulations! Your AI Document Summarizer application has been successfully set up. This guide will help you get it running.

恭喜！您的AI文档摘要应用已成功设置。本指南将帮助您运行它。

---

## ⚡ Quick Start (5 minutes) / 快速开始（5分钟）

### Step 1: Install Dependencies / 步骤1：安装依赖

```bash
npm install
```

This will install all required packages (~370 packages).

这将安装所有必需的包（约370个包）。

### Step 2: Set Up Supabase / 步骤2：设置Supabase

1. Go to [supabase.com](https://supabase.com) and create a free account
   访问 [supabase.com](https://supabase.com) 并创建免费账户

2. Create a new project (choose a name, database password, and region)
   创建新项目（选择名称、数据库密码和区域）

3. Wait for the project to be ready (~2 minutes)
   等待项目准备就绪（约2分钟）

4. In your project, go to **SQL Editor** and run the following:
   在项目中，转到 **SQL编辑器** 并运行以下命令：

   - Copy the contents of `supabase-schema.sql` file
   - Paste into SQL Editor
   - Click "Run"

   复制 `supabase-schema.sql` 文件的内容
   粘贴到SQL编辑器
   点击"运行"

5. Go to **Storage** and verify the 'documents' bucket was created
   转到 **Storage** 并验证已创建 'documents' 存储桶

6. Go to **Settings > API** and copy:
   转到 **设置 > API** 并复制：
   - Project URL
   - anon/public key

### Step 3: Set Up GitHub Models API / 步骤3：设置GitHub Models API

1. Go to your GitHub Settings
   转到GitHub设置

2. Go to **Developer settings > Personal access tokens > Tokens (classic)**
   转到 **开发者设置 > Personal access tokens > Tokens (classic)**

3. Click "Generate new token (classic)"
   点击"Generate new token (classic)"

4. Give it a name (e.g., "AI Document Summarizer")
   命名（例如："AI Document Summarizer"）

5. Select scopes (at minimum, you need access to GitHub Models)
   选择范围（至少需要访问GitHub Models）

6. Click "Generate token" and copy it
   点击"Generate token"并复制

### Step 4: Configure Environment / 步骤4：配置环境

```bash
cp .env.example .env.local
```

Edit `.env.local` and fill in your values:

编辑 `.env.local` 并填入您的值：

```env
NEXT_PUBLIC_SUPABASE_URL=https://your-project.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=your-anon-key-here
GITHUB_TOKEN=your-github-token-here
GITHUB_MODEL_ENDPOINT=https://models.inference.ai.azure.com
NEXT_PUBLIC_APP_URL=http://localhost:3000
```

### Step 5: Run the App / 步骤5：运行应用

```bash
npm run dev
```

Open your browser to: **http://localhost:3000**

在浏览器中打开：**http://localhost:3000**

---

## 🎉 First Time Use / 首次使用

### 1. Create an Account / 创建账户

- Click "Don't have an account? Sign up"
  点击"Don't have an account? Sign up"

- Enter your email and password (min 6 characters)
  输入您的邮箱和密码（至少6个字符）

- Click "Sign Up"
  点击"Sign Up"

- Check your email for confirmation (if required)
  检查邮箱确认邮件（如果需要）

### 2. Sign In / 登录

- Enter your email and password
  输入您的邮箱和密码

- Click "Sign In"
  点击"Sign In"

- You'll be redirected to the dashboard
  您将被重定向到仪表板

### 3. Upload Your First Document / 上传您的第一个文档

- Click "Choose File" or drag and drop
  点击"选择文件"或拖放

- Select a PDF or TXT file (max 10MB)
  选择PDF或TXT文件（最大10MB）

- Click "Upload & Summarize"
  点击"Upload & Summarize"

- Wait for processing (~10-30 seconds)
  等待处理（约10-30秒）

- View your AI-generated summary!
  查看AI生成的摘要！

### 4. View History / 查看历史

- All your uploaded documents appear on the right
  所有上传的文档显示在右侧

- Click "View" to expand and see the summary
  点击"View"展开并查看摘要

- Click "Hide" to collapse
  点击"Hide"折叠

---

## 🔧 Troubleshooting / 故障排除

### Problem: "Unauthorized" error
### 问题："Unauthorized"错误

**Solution:** Make sure you're signed in. If the error persists, check your Supabase configuration.

**解决方案：** 确保已登录。如果错误仍然存在，检查Supabase配置。

### Problem: File upload fails
### 问题：文件上传失败

**Checklist:**
- File is PDF or TXT format
- File size is under 10MB
- Supabase Storage bucket 'documents' exists
- Storage policies are configured (check `supabase-schema.sql`)

**检查清单：**
- 文件是PDF或TXT格式
- 文件大小小于10MB
- Supabase Storage存储桶'documents'存在
- 存储策略已配置（检查 `supabase-schema.sql`）

### Problem: Summary generation fails
### 问题：摘要生成失败

**Checklist:**
- GitHub token is valid
- Token has access to GitHub Models API
- Check API rate limits
- Check the browser console for error messages

**检查清单：**
- GitHub令牌有效
- 令牌可以访问GitHub Models API
- 检查API速率限制
- 检查浏览器控制台的错误消息

### Problem: Build errors
### 问题：构建错误

**Solution:**
```bash
# Clear cache and reinstall
rm -rf node_modules .next
npm install
npm run build
```

**解决方案：**
```bash
# 清除缓存并重新安装
rm -rf node_modules .next
npm install
npm run build
```

---

## 📚 Learn More / 了解更多

- **SETUP.md** - Detailed setup instructions
  详细设置说明

- **IMPLEMENTATION.md** - Implementation guide (Chinese/English)
  实施指南（中英文）

- **QUICK_REFERENCE.md** - Quick reference for commands and APIs
  命令和API快速参考

- **PROJECT_SUMMARY.md** - Complete project overview
  完整项目概述

---

## 🚀 Deploy to Production / 部署到生产环境

### Deploy to Vercel

1. Push your code to GitHub
   推送代码到GitHub

2. Go to [vercel.com](https://vercel.com) and sign in
   访问 [vercel.com](https://vercel.com) 并登录

3. Click "Import Project"
   点击"Import Project"

4. Select your GitHub repository
   选择您的GitHub仓库

5. Configure environment variables (same as `.env.local`)
   配置环境变量（与 `.env.local` 相同）

6. Click "Deploy"
   点击"Deploy"

7. Done! Your app is now live 🎉
   完成！您的应用现已上线 🎉

---

## 💡 Tips / 提示

### For Best Results / 获得最佳结果

1. **Use clear, well-formatted documents**
   使用清晰、格式良好的文档

2. **PDF files work best when they contain selectable text (not scanned images)**
   PDF文件在包含可选文本时效果最佳（不是扫描图像）

3. **Keep files under 10MB for faster processing**
   保持文件小于10MB以加快处理速度

4. **The AI works best with documents in English**
   AI在处理英文文档时效果最佳

### Save Costs / 节省成本

- Summaries are cached, so re-viewing a document doesn't cost API calls
  摘要被缓存，因此重新查看文档不会产生API调用

- Text extraction is also cached to save processing time
  文本提取也被缓存以节省处理时间

---

## 🎯 What You Can Do / 您可以做什么

✅ Upload PDF and TXT files
✅ Get AI-powered summaries instantly
✅ View your document history
✅ Search through past summaries
✅ Secure file storage
✅ Private account (no one else can see your files)

✅ 上传PDF和TXT文件
✅ 立即获得AI驱动的摘要
✅ 查看文档历史
✅ 搜索过去的摘要
✅ 安全的文件存储
✅ 私人账户（其他人看不到您的文件）

---

## 📞 Need Help? / 需要帮助？

- 📖 Check the documentation files
  查看文档文件

- 🐛 Open an issue on GitHub
  在GitHub上提出issue

- 📧 Email: algernon607@163.com

---

## 🎊 Enjoy! / 享受使用！

You're all set! Start uploading documents and let AI do the summarization work for you.

您已准备就绪！开始上传文档，让AI为您进行摘要工作。

**Happy Summarizing! / 祝您使用愉快！** 🚀
