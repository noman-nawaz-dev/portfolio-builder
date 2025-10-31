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
    router.push(`/editor?portfolio=${portfolio.id}`);
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
    <Card padding="none" hoverable>
      {/* Header */}
      <CardHeader gradient className="text-white">
        <div className="flex items-center justify-between gap-2">
          <div className="flex-1 flex items-center gap-2 min-w-0">
            <h3 className="text-xl font-bold truncate">{portfolio.name}</h3>
            <button
              onClick={() => onEditName(portfolio.id, portfolio.name)}
              className="flex-shrink-0 p-1.5 hover:bg-white/20 rounded-lg transition"
              title="Edit portfolio name"
            >
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15.232 5.232l3.536 3.536m-2.036-5.036a2.5 2.5 0 113.536 3.536L6.5 21.036H3v-3.572L16.732 3.732z" />
              </svg>
            </button>
          </div>
          <Badge variant={portfolio.isPublished ? 'success' : 'warning'}>
            {portfolio.isPublished ? '✓ Live' : 'Draft'}
          </Badge>
        </div>
        <p className="text-indigo-100 text-sm mt-1">{portfolio.template.name}</p>
      </CardHeader>

      {/* Body */}
      <CardBody>
        {/* Public URL */}
        {portfolio.isPublished && (
          <div className="mb-4 p-3 bg-green-50 border border-green-200 rounded-lg">
            <p className="text-xs font-medium text-green-800 mb-2">Portfolio is live</p>
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
        )}

        {/* Action Buttons */}
        <div className="space-y-2">
          <Button onClick={handleEdit} variant="primary" fullWidth size="md">
            <span>✏️</span>
            Edit Portfolio
          </Button>
          <Button onClick={handlePreview} variant="secondary" fullWidth size="md">
            <span>👁️</span>
            Preview
          </Button>
          <Button
            onClick={() => onTogglePublish(portfolio.id)}
            variant="ghost"
            fullWidth
            size="md"
            disabled={publishing}
            className="bg-blue-50 text-blue-700 hover:bg-blue-100"
          >
            <span>{portfolio.isPublished ? '🔒' : '🚀'}</span>
            {portfolio.isPublished ? 'Unpublish' : 'Publish'}
          </Button>
        </div>

        {/* Delete Button */}
        <Button
          onClick={() => onDelete(portfolio.id)}
          variant="ghost"
          fullWidth
          size="sm"
          className="mt-4 bg-red-50 text-red-600 hover:bg-red-600 hover:text-white"
        >
          🗑️ Delete
        </Button>
      </CardBody>
    </Card>
  );
};
