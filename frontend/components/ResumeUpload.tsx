'use client';

import { useState, useRef } from 'react';
import { useMutation } from '@apollo/client';
import { UPDATE_PORTFOLIO_RESUME } from '@/lib/graphql/operations';

const API_URL = process.env.NEXT_PUBLIC_GRAPHQL_URL?.replace('/graphql', '') || 'http://localhost:4000';

interface ResumeUploadProps {
  portfolioId: string;
  currentResumeUrl?: string | null;
  onSuccess?: () => void;
}



export const ResumeUpload: React.FC<ResumeUploadProps> = ({
  portfolioId,
  currentResumeUrl,
  onSuccess,
}) => {
  const [uploading, setUploading] = useState(false);
  const [deleting, setDeleting] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const [updatePortfolioResume] = useMutation(UPDATE_PORTFOLIO_RESUME);

  const handleFileSelect = async (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (!file) return;

    // Validate file type
    if (file.type !== 'application/pdf') {
      setError('Only PDF files are allowed');
      return;
    }

    // Validate file size (10MB max)
    const maxSize = 10 * 1024 * 1024;
    if (file.size > maxSize) {
      setError('File size must be less than 10MB');
      return;
    }

    setError(null);
    setUploading(true);

    try {
      // Upload to backend
      const formData = new FormData();
      formData.append('resume', file);
      // Send old resume URL so backend can delete it before uploading new one
      if (currentResumeUrl) {
        formData.append('oldResumeUrl', currentResumeUrl);
      }

      const token = localStorage.getItem('token');
      const response = await fetch(`${API_URL}/upload/resume`, {
        method: 'POST',
        headers: {
          Authorization: `Bearer ${token}`,
        },
        body: formData,
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || 'Upload failed');
      }

      const data = await response.json();

      // Update portfolio with resume URL
      await updatePortfolioResume({
        variables: {
          portfolioId,
          resumeUrl: data.url,
        },
      });

      onSuccess?.();
    } catch (err: any) {
      setError(err.message || 'Failed to upload resume');
      console.error('Resume upload error:', err);
    } finally {
      setUploading(false);
      // Reset file input
      if (fileInputRef.current) {
        fileInputRef.current.value = '';
      }
    }
  };

  const handleDelete = async () => {
    if (!currentResumeUrl) return;

    setDeleting(true);
    setError(null);

    try {
      // Delete from Cloudinary
      const token = localStorage.getItem('token');
      await fetch(`${API_URL}/upload/delete-resume`, {
        method: 'DELETE',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({ resumeUrl: currentResumeUrl }),
      });

      // Update portfolio to remove resume URL
      await updatePortfolioResume({
        variables: {
          portfolioId,
          resumeUrl: null,
        },
      });

      onSuccess?.();
    } catch (err: any) {
      setError(err.message || 'Failed to delete resume');
      console.error('Resume delete error:', err);
    } finally {
      setDeleting(false);
    }
  };

  return (
    <div className="space-y-4">
      <div>
        <label className="block text-sm font-semibold text-gray-700 mb-2">
          Resume (PDF)
        </label>
        <p className="text-xs text-gray-500 mb-3">
          Upload your resume so visitors can download it. Maximum file size: 10MB
        </p>

        {currentResumeUrl ? (
          <div className="flex items-center gap-3 p-4 bg-green-50 border border-green-200 rounded-lg">
            <div className="flex-shrink-0">
              <svg
                className="w-8 h-8 text-green-600"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"
                />
              </svg>
            </div>
            <div className="flex-1 min-w-0">
              <p className="text-sm font-medium text-gray-900">Resume uploaded</p>
              <p className="text-xs text-gray-500 truncate">{currentResumeUrl}</p>
            </div>
            <div className="flex gap-2">
              <a
                href={currentResumeUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="px-3 py-1.5 text-sm bg-white border border-green-300 text-green-700 rounded-lg hover:bg-green-50 font-medium"
              >
                View
              </a>
              <button
                onClick={handleDelete}
                disabled={deleting}
                className="px-3 py-1.5 text-sm bg-red-600 text-white rounded-lg hover:bg-red-700 font-medium disabled:opacity-50"
              >
                {deleting ? 'Deleting...' : 'Delete'}
              </button>
            </div>
          </div>
        ) : (
          <div className="relative">
            <input
              ref={fileInputRef}
              type="file"
              accept=".pdf"
              onChange={handleFileSelect}
              disabled={uploading}
              className="hidden"
              id="resume-upload"
            />
            <label
              htmlFor="resume-upload"
              className={`flex flex-col items-center justify-center w-full h-32 border-2 border-dashed rounded-lg cursor-pointer transition-colors ${
                uploading
                  ? 'border-gray-300 bg-gray-50 cursor-not-allowed'
                  : 'border-gray-300 hover:border-indigo-400 bg-gray-50 hover:bg-indigo-50'
              }`}
            >
              {uploading ? (
                <div className="flex flex-col items-center gap-2">
                  <div className="inline-block animate-spin rounded-full h-8 w-8 border-b-2 border-indigo-600"></div>
                  <span className="text-sm text-gray-600 font-medium">Uploading resume...</span>
                </div>
              ) : (
                <div className="flex flex-col items-center gap-2">
                  <svg
                    className="w-10 h-10 text-gray-400"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12"
                    />
                  </svg>
                  <div className="text-center">
                    <p className="text-sm text-gray-700 font-medium">
                      Click to upload resume
                    </p>
                    <p className="text-xs text-gray-500 mt-1">PDF only, up to 10MB</p>
                  </div>
                </div>
              )}
            </label>
          </div>
        )}

        {error && (
          <div className="mt-2 p-3 bg-red-50 border border-red-200 rounded-lg">
            <p className="text-sm text-red-600">{error}</p>
          </div>
        )}
      </div>
    </div>
  );
};
