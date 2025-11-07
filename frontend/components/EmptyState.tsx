import React from 'react';
import Link from 'next/link';
import { Card, Button, Heading, Text, Stack, Box } from '@/components/ui';

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
    <Link href={actionHref} className="w-full sm:w-auto">
      <Button variant="primary" size="lg" className="w-full sm:w-auto">
        {actionText}
      </Button>
    </Link>
  ) : onAction ? (
    <Button variant="primary" size="lg" onClick={onAction} className="w-full sm:w-auto">
      {actionText}
    </Button>
  ) : null;

  return (
    <Card className="text-center" padding="lg">
      <Stack spacing="lg" align="center" className="px-4 sm:px-6 py-6 sm:py-8">
        <Box className="w-16 h-16 sm:w-20 sm:h-20 bg-gradient-to-br from-indigo-500 to-purple-500 rounded-full flex items-center justify-center">
          <span className="text-3xl sm:text-4xl">{icon}</span>
        </Box>
        <Heading as="h1" size="4xl" align="center" className="text-2xl sm:text-3xl lg:text-4xl">
          {title}
        </Heading>
        <Text size="lg" className="text-base sm:text-lg max-w-2xl">
          {description}
        </Text>
        {ActionComponent}
      </Stack>
    </Card>
  );
};
