import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import { Card, CardHeader, CardBody, Button, Badge } from '@/components/ui';

interface PortfolioCardProps {
  portfolio: {
    id: string;
    name: string;
    isPublished: boolean;
    template: {
      name: string;
    };
  };
  portfolioUrl: string;
  onTogglePublish: (id: string) => void;
  onDelete: (id: string) => void;
  onEditName: (id: string, currentName: string) => void;
  publishing: boolean;
}

export const PortfolioCard: React.FC<PortfolioCardProps> = ({
  portfolio,
  portfolioUrl,
  onTogglePublish,
  onDelete,
  onEditName,
  publishing,
}) => {
  const router = useRouter();
  
  const handleEdit = () => {
    router.push(`/section-editor?portfolio=${portfolio.id}`);
  };

  const handlePreview = () => {
    router.push(`/preview?portfolio=${portfolio.id}`);
  };

  const handleCopyLink = () => {
    const url = `${portfolioUrl}?p=${portfolio.id}`;
    navigator.clipboard.writeText(url);
    alert('Link copied!');
  };

  const handleViewLive = () => {
    const url = `${portfolioUrl}?p=${portfolio.id}`;
    window.open(url, '_blank', 'noopener,noreferrer');
  };

  return (
    <Card padding="none" hoverable className="h-full flex flex-col">
      {/* Header */}
      <CardHeader gradient className="text-white flex-shrink-0">
        <div className="flex items-center justify-between gap-2">
          <div className="flex-1 flex items-center gap-2 min-w-0">
            <h3 className="text-lg font-bold truncate">{portfolio.name}</h3>
            <button
              onClick={() => onEditName(portfolio.id, portfolio.name)}
              className="flex-shrink-0 p-1.5 hover:bg-white/20 rounded-lg transition"
              title="Edit portfolio name"
            >
              <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15.232 5.232l3.536 3.536m-2.036-5.036a2.5 2.5 0 113.536 3.536L6.5 21.036H3v-3.572L16.732 3.732z" />
              </svg>
            </button>
          </div>
          <Badge variant={portfolio.isPublished ? 'success' : 'warning'}>
            {portfolio.isPublished ? '✓ Live' : 'Draft'}
          </Badge>
        </div>
        <p className="text-indigo-100 text-xs mt-1">{portfolio.template.name}</p>
      </CardHeader>

      {/* Body */}
      <CardBody className="flex-1 flex flex-col">
        {/* Published/Unpublished Notice */}
        {portfolio.isPublished ? (
          <div className="mb-3 p-2.5 bg-green-50 border border-green-200 rounded-lg flex-shrink-0">
            <p className="text-xs font-medium text-green-800 mb-1.5">Portfolio is live</p>
            <div className="flex items-center gap-2">
              <button
                onClick={handleCopyLink}
                className="text-xs text-green-700 hover:text-green-900 font-medium"
              >
                📋 Copy Link
              </button>
              <span className="text-green-300">•</span>
              <button
                onClick={handleViewLive}
                className="text-xs text-green-700 hover:text-green-900 font-medium"
              >
                🌐 View Live
              </button>
            </div>
          </div>
        ) : (
          <div className="mb-3 p-2.5 bg-yellow-50 border border-yellow-200 rounded-lg flex-shrink-0">
            <p className="text-xs font-medium text-yellow-800 mb-1.5">Portfolio is not published</p>
            <p className="text-xs text-yellow-700">Click "Publish" to make it live</p>
          </div>
        )}

        {/* Action Buttons */}
        <div className="space-y-2 flex-1 flex flex-col justify-end">
          <Button onClick={handleEdit} variant="primary" fullWidth size="sm">
            <span className="text-sm">✏️</span>
            <span className="text-sm">Edit Portfolio</span>
          </Button>
          <Button onClick={handlePreview} variant="secondary" fullWidth size="sm">
            <span className="text-sm">👁️</span>
            <span className="text-sm">Preview</span>
          </Button>
          <Button
            onClick={() => onTogglePublish(portfolio.id)}
            variant="ghost"
            fullWidth
            size="sm"
            disabled={publishing}
            className="!bg-blue-100 !text-blue-700 hover:!bg-blue-200 disabled:!bg-gray-200 disabled:!text-gray-500"
          >
            <span className="text-sm">{portfolio.isPublished ? '🔒' : '🚀'}</span>
            <span className="text-sm">{portfolio.isPublished ? 'Unpublish' : 'Publish'}</span>
          </Button>
          
          {/* Delete Button */}
          <Button
            onClick={() => onDelete(portfolio.id)}
            variant="ghost"
            fullWidth
            size="sm"
            className="!bg-red-100 !text-red-600 hover:!bg-red-200"
          >
            <span className="text-sm">🗑️ Delete</span>
          </Button>
        </div>
      </CardBody>
    </Card>
  );
};
