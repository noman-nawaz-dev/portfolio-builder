import React from 'react';
import { Heading, Text, Flex, Stack } from '@/components/ui';

interface PageHeaderProps {
  title: string;
  subtitle?: string;
  icon?: string;
  action?: React.ReactNode;
  className?: string;
}

export const PageHeader: React.FC<PageHeaderProps> = ({
  title,
  subtitle,
  icon,
  action,
  className = '',
}) => {
  return (
    <Flex justify="between" align="start" className={`mb-8 sm:mb-12 flex-col sm:flex-row gap-4 ${className}`}>
      <Stack spacing="sm" className="flex-1">
        <Heading as="h1" size="4xl" className="text-2xl sm:text-3xl lg:text-4xl flex items-center gap-2">
          {icon && <span className="text-2xl sm:text-3xl lg:text-4xl">{icon}</span>}
          {title}
        </Heading>
        {subtitle && <Text className="text-neutral-600 text-sm sm:text-base">{subtitle}</Text>}
      </Stack>
      {action && <div className="flex-shrink-0 w-full sm:w-auto">{action}</div>}
    </Flex>
  );
};
