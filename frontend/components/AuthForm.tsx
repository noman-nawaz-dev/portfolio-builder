import React from 'react';
import Link from 'next/link';
import { Card } from '@/components/ui';
import { Input } from '@/components/ui';
import { Button } from '@/components/ui';
import { Alert } from '@/components/ui';

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
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 flex items-center justify-center px-4">
      <Card className="max-w-md w-full" padding="lg">
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold text-gray-900">{title}</h1>
          <p className="text-gray-600 mt-2">{subtitle}</p>
        </div>

        {error && (
          <Alert variant="error" className="mb-4">
            {error}
          </Alert>
        )}

        <form onSubmit={onSubmit} className="space-y-6">
          {children}
          
          <Button
            type="submit"
            variant="primary"
            size="lg"
            fullWidth
            loading={loading}
          >
            {loading ? 'Processing...' : title}
          </Button>
        </form>

        <p className="text-center mt-6 text-gray-600">
          {footerText}{' '}
          <Link href={footerLinkHref} className="text-indigo-600 hover:text-indigo-700 font-semibold">
            {footerLinkText}
          </Link>
        </p>
      </Card>
    </div>
  );
};
