import React from 'react';
import Link from 'next/link';
import { Card, Button } from '@/components/ui';

interface EmptyStateProps {
  icon?: string;
  title: string;
  description: string;
  actionText?: string;
  actionHref?: string;
  onAction?: () => void;
}

export const EmptyState: React.FC<EmptyStateProps> = ({
  icon = '🎨',
  title,
  description,
  actionText,
  actionHref,
  onAction,
}) => {
  const ActionComponent = actionHref ? (
    <Link href={actionHref}>
      <Button variant="primary" size="lg">
        {actionText}
      </Button>
    </Link>
  ) : onAction ? (
    <Button variant="primary" size="lg" onClick={onAction}>
      {actionText}
    </Button>
  ) : null;

  return (
    <Card className="text-center" padding="lg">
      <div className="w-20 h-20 bg-gradient-to-br from-indigo-500 to-purple-500 rounded-full flex items-center justify-center mx-auto mb-6">
        <span className="text-4xl">{icon}</span>
      </div>
      <h1 className="text-3xl sm:text-4xl font-bold text-gray-900 mb-4">
        {title}
      </h1>
      <p className="text-lg text-gray-600 mb-8">
        {description}
      </p>
      {ActionComponent}
    </Card>
  );
};
