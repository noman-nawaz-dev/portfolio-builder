import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import { Card, CardHeader, CardBody, Button, Badge, Heading, Text, Stack, Flex } from '@/components/ui';

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
    <Card padding="none" hoverable className="h-full flex flex-col shadow-lg">
      {/* Header */}
      <CardHeader gradient className="text-white flex-shrink-0 p-4 sm:p-6">
        <Flex justify="between" align="center" gap="sm" className="mb-1">
          <Flex align="center" gap="sm" className="flex-1 min-w-0">
            <Heading as="h3" size="lg" className="text-base sm:text-lg text-white m-0 truncate">
              {portfolio.name}
            </Heading>
            <button
              onClick={() => onEditName(portfolio.id, portfolio.name)}
              className="flex-shrink-0 p-1.5 hover:bg-white/20 rounded-lg transition"
              title="Edit portfolio name"
              aria-label="Edit portfolio name"
            >
              <svg className="w-3 h-3 sm:w-3.5 sm:h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15.232 5.232l3.536 3.536m-2.036-5.036a2.5 2.5 0 113.536 3.536L6.5 21.036H3v-3.572L16.732 3.732z" />
              </svg>
            </button>
          </Flex>
          <Badge variant={portfolio.isPublished ? 'success' : 'warning'} className="whitespace-nowrap text-xs">
            {portfolio.isPublished ? '✓ Live' : 'Draft'}
          </Badge>
        </Flex>
        <Text className="text-teal-100 text-xs sm:text-sm">{portfolio.template.name}</Text>
      </CardHeader>

      {/* Body */}
      <CardBody className="flex-1 flex flex-col p-4 sm:p-6">
        {/* Published/Unpublished Notice */}
        {portfolio.isPublished ? (
          <div className="mb-3 p-2.5 sm:p-3 bg-emerald-50 border border-emerald-200 rounded-lg flex-shrink-0">
            <Text className="text-xs sm:text-sm font-medium text-emerald-800 mb-1.5">Portfolio is live</Text>
            <Flex gap="sm" align="center" className="flex-wrap">
              <button
                onClick={handleCopyLink}
                className="text-xs sm:text-sm text-emerald-700 hover:text-emerald-900 font-medium whitespace-nowrap"
                aria-label="Copy portfolio link"
              >
                📋 Copy Link
              </button>
              <span className="text-emerald-300 hidden sm:inline">•</span>
              <button
                onClick={handleViewLive}
                className="text-xs sm:text-sm text-emerald-700 hover:text-emerald-900 font-medium whitespace-nowrap"
                aria-label="View live portfolio"
              >
                🌐 View Live
              </button>
            </Flex>
          </div>
        ) : (
          <div className="mb-3 p-2.5 sm:p-3 bg-amber-50 border border-amber-200 rounded-lg flex-shrink-0">
            <Text className="text-xs sm:text-sm font-medium text-amber-800 mb-1.5">Portfolio is not published</Text>
            <Text className="text-xs sm:text-sm text-amber-700">Click "Publish" to make it live</Text>
          </div>
        )}

        {/* Action Buttons */}
        <Stack spacing="sm" className="flex-1 justify-end">
          <Button onClick={handleEdit} variant="primary" fullWidth size="md" className="text-xs sm:text-sm">
            <span>✏️</span>
            <span>Edit Portfolio</span>
          </Button>
          <Button onClick={handlePreview} variant="secondary" fullWidth size="md" className="text-xs sm:text-sm">
            <span>👁️</span>
            <span>Preview</span>
          </Button>
          <Button
            onClick={() => onTogglePublish(portfolio.id)}
            variant="ghost"
            fullWidth
            size="md"
            disabled={publishing}
            className="!bg-sky-100 !text-sky-700 hover:!bg-sky-200 disabled:!bg-neutral-200 disabled:!text-neutral-500 text-xs sm:text-sm"
          >
            <span>{portfolio.isPublished ? '🔒' : '🚀'}</span>
            <span>{portfolio.isPublished ? 'Unpublish' : 'Publish'}</span>
          </Button>
          
          {/* Delete Button */}
          <Button
            onClick={() => onDelete(portfolio.id)}
            variant="ghost"
            fullWidth
            size="md"
            className="!bg-red-100 !text-red-600 hover:!bg-red-200 text-xs sm:text-sm"
            aria-label="Delete portfolio"
          >
            <span>🗑️ Delete</span>
          </Button>
        </Stack>
      </CardBody>
    </Card>
  );
};
