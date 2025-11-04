'use client';

import { useQuery } from '@apollo/client';
import { useRouter, useSearchParams } from 'next/navigation';
import { ProtectedRoute } from '@/lib/ProtectedRoute';
import AuthLayout from '@/components/AuthLayout';
import { LoadingScreen } from '@/components/ui';
import {
  GET_PORTFOLIO,
} from '@/lib/graphql/operations';

// Force dynamic rendering
export const dynamic = 'force-dynamic';

type Tab = 'hero' | 'about' | 'skills' | 'projects' | 'contact';

function EditorContent() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const portfolioId = searchParams.get('portfolio');
  
  const { data, loading } = useQuery(GET_PORTFOLIO, {
    variables: { portfolioId },
    skip: !portfolioId,
  });

  if (loading) {
    return <LoadingScreen message="Loading portfolio..." />;
  }

  const portfolio = data?.getPortfolio;

  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-6 sm:py-8">
      <div className="bg-white rounded-2xl shadow-xl overflow-hidden">
        <div className="p-8 text-center">
          <h1 className="text-3xl font-bold text-gray-900 mb-4">
            Portfolio Editor
          </h1>
          <p className="text-lg text-gray-600 mb-6">
            The portfolio editor has been updated to use a new section-based system.
          </p>
          <div className="bg-blue-50 border border-blue-200 rounded-lg p-6 mb-6">
            <h2 className="text-xl font-semibold text-blue-900 mb-2">
              What's New
            </h2>
            <ul className="text-blue-800 space-y-1 text-left">
              <li>• Dynamic sections instead of fixed hero/about/skills/projects/contact</li>
              <li>• Drag-and-drop section reordering</li>
              <li>• Multiple section types (text, images, forms, etc.)</li>
              <li>• Customizable layouts and styling</li>
            </ul>
          </div>
          <div className="flex gap-4 justify-center">
            <button
              onClick={() => router.push(`/preview?portfolio=${portfolioId}`)}
              className="px-6 py-3 bg-blue-600 text-white rounded-lg font-semibold hover:bg-blue-700 transition-colors"
            >
              Preview Portfolio
            </button>
            <button
              onClick={() => router.push('/dashboard')}
              className="px-6 py-3 bg-gray-600 text-white rounded-lg font-semibold hover:bg-gray-700 transition-colors"
            >
              Back to Dashboard
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default function EditorPage() {
  return (
    <ProtectedRoute>
      <AuthLayout>
        <EditorContent />
      </AuthLayout>
    </ProtectedRoute>
  );
}
