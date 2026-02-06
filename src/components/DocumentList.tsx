'use client'

import { useState } from 'react'

interface Document {
  id: string
  file_name: string
  file_type: string
  file_size: number
  summary: string | null
  created_at: string
}

interface DocumentListProps {
  documents: Document[]
}

export default function DocumentList({ documents }: DocumentListProps) {
  const [expandedId, setExpandedId] = useState<string | null>(null)

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleString()
  }

  const formatFileSize = (bytes: number) => {
    if (bytes < 1024) return `${bytes} B`
    if (bytes < 1024 * 1024) return `${(bytes / 1024).toFixed(2)} KB`
    return `${(bytes / (1024 * 1024)).toFixed(2)} MB`
  }

  const toggleExpand = (id: string) => {
    setExpandedId(expandedId === id ? null : id)
  }

  if (documents.length === 0) {
    return (
      <div className="text-center py-12">
        <div className="inline-flex items-center justify-center w-16 h-16 bg-slate-100 rounded-2xl mb-4">
          <svg className="w-8 h-8 text-slate-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 21h10a2 2 0 002-2V9.414a1 1 0 00-.293-.707l-5.414-5.414A1 1 0 0012.586 3H7a2 2 0 00-2 2v14a2 2 0 002 2z" />
          </svg>
        </div>
        <p className="text-slate-500 font-medium">No documents yet</p>
        <p className="text-slate-400 text-sm mt-1">Upload your first document to get started</p>
      </div>
    )
  }

  return (
    <div className="space-y-3 max-h-[600px] overflow-y-auto pr-2">
      {documents.map((doc, index) => (
        <div
          key={doc.id}
          className="group border-2 border-slate-200 rounded-xl p-4 hover:border-indigo-300 hover:shadow-lg transition-all bg-white animate-slide-up"
          style={{ animationDelay: `${index * 0.05}s` }}
        >
          <div className="flex justify-between items-start">
            <div className="flex-1 min-w-0">
              <div className="flex items-start space-x-3">
                <div className="flex-shrink-0 mt-1">
                  {doc.file_type === 'application/pdf' ? (
                    <svg className="w-8 h-8 text-red-500" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M4 4a2 2 0 012-2h4.586A2 2 0 0112 2.586L15.414 6A2 2 0 0116 7.414V16a2 2 0 01-2 2H6a2 2 0 01-2-2V4z" clipRule="evenodd" />
                    </svg>
                  ) : (
                    <svg className="w-8 h-8 text-blue-500" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M4 4a2 2 0 012-2h4.586A2 2 0 0112 2.586L15.414 6A2 2 0 0116 7.414V16a2 2 0 01-2 2H6a2 2 0 01-2-2V4zm2 6a1 1 0 011-1h6a1 1 0 110 2H7a1 1 0 01-1-1zm1 3a1 1 0 100 2h6a1 1 0 100-2H7z" clipRule="evenodd" />
                    </svg>
                  )}
                </div>
                <div className="flex-1 min-w-0">
                  <h3 className="font-semibold text-slate-800 break-words group-hover:text-indigo-600 transition-colors">
                    {doc.file_name}
                  </h3>
                  <div className="flex flex-wrap gap-3 mt-2">
                    <span className="inline-flex items-center text-xs text-slate-600 bg-slate-100 px-2.5 py-1 rounded-lg">
                      <svg className="w-3 h-3 mr-1.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 21h10a2 2 0 002-2V9.414a1 1 0 00-.293-.707l-5.414-5.414A1 1 0 0012.586 3H7a2 2 0 00-2 2v14a2 2 0 002 2z" />
                      </svg>
                      {formatFileSize(doc.file_size)}
                    </span>
                    <span className="inline-flex items-center text-xs text-slate-600 bg-slate-100 px-2.5 py-1 rounded-lg">
                      <svg className="w-3 h-3 mr-1.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                      </svg>
                      {formatDate(doc.created_at)}
                    </span>
                  </div>
                </div>
              </div>
            </div>
            {doc.summary && (
              <button
                onClick={() => toggleExpand(doc.id)}
                className="ml-3 flex-shrink-0 flex items-center space-x-1 px-4 py-2 bg-indigo-50 hover:bg-indigo-100 text-indigo-600 rounded-lg text-sm font-semibold transition-all hover:shadow-md"
              >
                {expandedId === doc.id ? (
                  <>
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 15l7-7 7 7" />
                    </svg>
                    <span>Hide</span>
                  </>
                ) : (
                  <>
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
                    </svg>
                    <span>View</span>
                  </>
                )}
              </button>
            )}
          </div>

          {expandedId === doc.id && doc.summary && (
            <div className="mt-4 pt-4 border-t-2 border-slate-100 animate-slide-up">
              <div className="bg-gradient-to-br from-slate-50 to-indigo-50 rounded-xl p-4 border border-indigo-100">
                <div className="flex items-center space-x-2 mb-3">
                  <div className="w-6 h-6 bg-gradient-to-br from-indigo-500 to-purple-600 rounded-lg flex items-center justify-center">
                    <svg className="w-3.5 h-3.5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z" />
                    </svg>
                  </div>
                  <h4 className="text-sm font-bold text-indigo-900">
                    AI Summary
                  </h4>
                </div>
                <p className="text-sm text-slate-700 leading-relaxed whitespace-pre-wrap">
                  {doc.summary}
                </p>
              </div>
            </div>
          )}
        </div>
      ))}
    </div>
  )
}
