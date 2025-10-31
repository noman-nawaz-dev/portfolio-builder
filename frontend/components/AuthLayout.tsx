'use client';

import AuthNavbar from '@/components/AuthNavbar';
import { ReactNode } from 'react';

interface AuthLayoutProps {
  children: ReactNode;
}

export default function AuthLayout({ children }: AuthLayoutProps) {
  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-50 via-white to-purple-50">
      <AuthNavbar />
      {children}
    </div>
  );
}
