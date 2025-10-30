'use client';

import { useQuery } from '@apollo/client';
import { GET_ME } from '@/lib/graphql/operations';
import AuthNavbar from '@/components/AuthNavbar';
import { ReactNode } from 'react';

interface AuthLayoutProps {
  children: ReactNode;
}

export default function AuthLayout({ children }: AuthLayoutProps) {
  const { data, loading } = useQuery(GET_ME);

  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-50 via-white to-purple-50">
      <AuthNavbar userName={data?.me?.name} />
      {children}
    </div>
  );
}
