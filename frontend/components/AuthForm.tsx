import React from 'react';
import Link from 'next/link';
import { Card, Button, Alert, Heading, Text, Stack } from '@/components/ui';

interface AuthFormProps {
  title: string;
  subtitle: string;
  onSubmit: (e: React.FormEvent) => void;
  loading?: boolean;
  error?: string;
  children: React.ReactNode;
  footerText: string;
  footerLinkText: string;
  footerLinkHref: string;
}

export const AuthForm: React.FC<AuthFormProps> = ({
  title,
  subtitle,
  onSubmit,
  loading = false,
  error,
  children,
  footerText,
  footerLinkText,
  footerLinkHref,
}) => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 flex items-center justify-center px-4 py-8 sm:py-12 md:py-16">
      <Card className="max-w-md w-full shadow-2xl md:max-w-lg" padding="md">
        <Stack spacing="lg" align="center" className="mb-6 sm:mb-8">
          <Heading as="h1" size="3xl" align="center" className="text-2xl sm:text-3xl md:text-4xl">
            {title}
          </Heading>
          <Text align="center" className="text-sm sm:text-base">
            {subtitle}
          </Text>
        </Stack>

        {error && (
          <Alert variant="error" className="mb-4 text-sm sm:text-base">
            {error}
          </Alert>
        )}

        <form onSubmit={onSubmit}>
          <Stack spacing="lg">
            {children}
            
            <Button
              type="submit"
              variant="primary"
              size="lg"
              fullWidth
              loading={loading}
              className="mt-2"
            >
              {loading ? 'Processing...' : title}
            </Button>
          </Stack>
        </form>

        <Text align="center" className="mt-6 md:mt-8 text-sm sm:text-base">
          {footerText}{' '}
          <Link href={footerLinkHref} className="text-indigo-600 hover:text-indigo-700 font-semibold">
            {footerLinkText}
          </Link>
        </Text>
      </Card>
    </div>
  );
};
