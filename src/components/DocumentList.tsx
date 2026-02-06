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
      <div className="text-center py-8 text-gray-500">
        No documents yet. Upload your first document!
      </div>
    )
  }

  return (
    <div className="space-y-3 max-h-[600px] overflow-y-auto">
      {documents.map((doc) => (
        <div
          key={doc.id}
          className="border border-gray-200 rounded-lg p-4 hover:shadow-md transition"
        >
          <div className="flex justify-between items-start">
            <div className="flex-1">
              <h3 className="font-medium text-gray-900 break-words">
                {doc.file_name}
              </h3>
              <div className="text-xs text-gray-500 mt-1 space-y-1">
                <div>Size: {formatFileSize(doc.file_size)}</div>
                <div>Uploaded: {formatDate(doc.created_at)}</div>
              </div>
            </div>
            {doc.summary && (
              <button
                onClick={() => toggleExpand(doc.id)}
                className="ml-2 text-blue-600 hover:text-blue-800 text-sm font-medium"
              >
                {expandedId === doc.id ? 'Hide' : 'View'}
              </button>
            )}
          </div>

          {expandedId === doc.id && doc.summary && (
            <div className="mt-3 pt-3 border-t border-gray-200">
              <h4 className="text-sm font-semibold text-gray-700 mb-2">
                Summary:
              </h4>
              <p className="text-sm text-gray-600 whitespace-pre-wrap">
                {doc.summary}
              </p>
            </div>
          )}
        </div>
      ))}
    </div>
  )
}
