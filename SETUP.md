# AI Document Summarizer

A full-stack web application that allows users to upload PDF or TXT files, extract text, and generate AI-powered summaries using GitHub Models API. Built with Next.js, React, Supabase, and deployed on Vercel.

## Features

- 🔐 **Secure Authentication**: User authentication with Supabase Auth
- 📁 **File Upload**: Support for PDF and TXT files (up to 10MB)
- 🤖 **AI Summarization**: Automatic text summarization using GitHub Models API (GPT-4o-mini)
- 💾 **Smart Caching**: Extracted text and summaries stored in PostgreSQL database
- 📦 **Object Storage**: Files stored in Supabase Storage
- 📜 **Document History**: View all past uploads and summaries
- ⚡ **Serverless Architecture**: Built on Next.js serverless functions
- 🚀 **Vercel Deployment**: Easy deployment to Vercel

## Architecture

### Frontend
- **Next.js 14+** with App Router
- **React** for UI components
- **TypeScript** for type safety
- **Tailwind CSS** for styling

### Backend
- **Next.js API Routes** (serverless functions)
- **Supabase** for PostgreSQL database and authentication
- **Supabase Storage** for file storage
- **GitHub Models API** for AI summarization

### Database Schema

```sql
-- documents table
CREATE TABLE documents (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID NOT NULL REFERENCES auth.users(id),
  file_name TEXT NOT NULL,
  file_type TEXT NOT NULL,
  file_size INTEGER NOT NULL,
  storage_path TEXT NOT NULL,
  cached_text TEXT,
  summary TEXT,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Create storage bucket
INSERT INTO storage.buckets (id, name, public)
VALUES ('documents', 'documents', false);

-- Storage policies
CREATE POLICY "Users can upload their own documents"
ON storage.objects FOR INSERT
TO authenticated
WITH CHECK (bucket_id = 'documents' AND auth.uid()::text = (storage.foldername(name))[1]);

CREATE POLICY "Users can view their own documents"
ON storage.objects FOR SELECT
TO authenticated
USING (bucket_id = 'documents' AND auth.uid()::text = (storage.foldername(name))[1]);
```

## Setup Instructions

### Prerequisites
- Node.js 18+ installed
- A Supabase account
- A GitHub account with access to GitHub Models API
- Vercel account (for deployment)

### 1. Clone the Repository

```bash
git clone https://github.com/Alfred8936/Ex2.git
cd Ex2
npm install
```

### 2. Set Up Supabase

1. Create a new project at [supabase.com](https://supabase.com)
2. Go to SQL Editor and run the database schema (see above)
3. Go to Storage and ensure the 'documents' bucket is created
4. Get your project URL and anon key from Settings > API

### 3. Configure GitHub Models API

1. Go to [GitHub Models](https://github.com/marketplace/models)
2. Get your GitHub token with appropriate permissions
3. Note the endpoint: `https://models.inference.ai.azure.com`

### 4. Environment Variables

Create a `.env.local` file in the root directory:

```bash
# Copy from .env.example
cp .env.example .env.local
```

Update with your values:

```env
# Supabase Configuration
NEXT_PUBLIC_SUPABASE_URL=your-supabase-project-url
NEXT_PUBLIC_SUPABASE_ANON_KEY=your-supabase-anon-key

# GitHub Models API Configuration
GITHUB_TOKEN=your-github-token
GITHUB_MODEL_ENDPOINT=https://models.inference.ai.azure.com

# Application Configuration
NEXT_PUBLIC_APP_URL=http://localhost:3000
```

### 5. Run Development Server

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser.

## Usage

### User Flow

1. **Sign Up/Sign In**: Create an account or sign in with email and password
2. **Upload File**: Select a PDF or TXT file (max 10MB)
3. **Processing**: 
   - File is uploaded to Supabase Storage
   - Text is extracted from the file
   - Text is cached in the database
   - AI generates a summary
4. **View Summary**: Summary is displayed immediately
5. **History**: View all past documents and summaries

## Deployment to Vercel

### Option 1: Deploy with Vercel CLI

```bash
npm install -g vercel
vercel
```

### Option 2: Deploy via GitHub

1. Push your code to GitHub
2. Go to [vercel.com](https://vercel.com)
3. Import your repository
4. Add environment variables
5. Deploy

### Environment Variables on Vercel

Add these in Project Settings > Environment Variables:
- `NEXT_PUBLIC_SUPABASE_URL`
- `NEXT_PUBLIC_SUPABASE_ANON_KEY`
- `GITHUB_TOKEN`
- `GITHUB_MODEL_ENDPOINT`

## Development in GitHub Codespaces

1. Open the repository in GitHub
2. Click "Code" > "Codespaces" > "Create codespace on main"
3. Wait for the environment to set up
4. Run `npm install`
5. Create `.env.local` with your configuration
6. Run `npm run dev`
7. Open the forwarded port in your browser

## API Endpoints

### POST /api/upload
Upload a document and get AI summary

**Request**: `multipart/form-data` with file
**Response**: 
```json
{
  "success": true,
  "document": { ... },
  "summary": "AI-generated summary..."
}
```

### GET /api/documents
Get all user's documents

**Response**:
```json
{
  "documents": [
    {
      "id": "uuid",
      "file_name": "document.pdf",
      "summary": "...",
      ...
    }
  ]
}
```

## Security Features

- ✅ Authentication required for all operations
- ✅ Row Level Security (RLS) on database
- ✅ Storage policies ensure users can only access their own files
- ✅ File type validation (PDF/TXT only)
- ✅ File size limits (10MB max)
- ✅ Secure API endpoints with authentication checks

## Performance Optimizations

- ✅ Text caching in database (no re-extraction needed)
- ✅ Summary caching (no re-generation needed)
- ✅ Efficient database queries with indexing
- ✅ Serverless architecture for automatic scaling
- ✅ Edge middleware for fast authentication checks

## Troubleshooting

### Issue: "Unauthorized" error
**Solution**: Ensure user is signed in and session is valid

### Issue: PDF text extraction fails
**Solution**: PDF might be image-based (scanned). Consider adding OCR support

### Issue: GitHub Models API error
**Solution**: Check your GITHUB_TOKEN is valid and has correct permissions

### Issue: File upload fails
**Solution**: 
- Check file size is under 10MB
- Ensure Supabase Storage bucket exists
- Verify storage policies are set correctly

## Future Enhancements

- [ ] Support for more file types (DOCX, PPTX)
- [ ] OCR for scanned PDFs
- [ ] Multiple AI model options
- [ ] Collaborative document sharing
- [ ] Full-text search across documents
- [ ] Export summaries to various formats
- [ ] Mobile app version

## Tech Stack

- **Frontend**: Next.js 14, React 18, TypeScript, Tailwind CSS
- **Backend**: Next.js API Routes (Serverless)
- **Database**: PostgreSQL (via Supabase)
- **Authentication**: Supabase Auth
- **Storage**: Supabase Storage
- **AI**: GitHub Models API (GPT-4o-mini)
- **Deployment**: Vercel
- **Development**: GitHub Codespaces

## License

ISC

## Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

## Support

For issues and questions, please open an issue on GitHub.
