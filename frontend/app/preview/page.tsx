'use client';

import { useQuery } from '@apollo/client';
import { useSearchParams } from 'next/navigation';
import { GET_PORTFOLIO } from '@/lib/graphql/operations';
import { ProtectedRoute } from '@/lib/ProtectedRoute';
import { usePortfolio } from '@/lib/PortfolioContext';
import EngineerTemplate from '@/components/portfolio/EngineerTemplate';
import MarketerTemplate from '@/components/portfolio/MarketerTemplate';
import GeneralTemplate from '@/components/portfolio/GeneralTemplate';
import AuthNavbar from '@/components/AuthNavbar';
import Link from 'next/link';

function PreviewContent() {
  const searchParams = useSearchParams();
  const urlPortfolioId = searchParams.get('portfolio');
  const { currentPortfolioId } = usePortfolio();
  
  // Use URL parameter first, then fall back to context
  const portfolioId = urlPortfolioId || currentPortfolioId;
  
  const { data, loading, error } = useQuery(GET_PORTFOLIO, {
    variables: { portfolioId },
    skip: !portfolioId,
  });

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <div className="text-xl text-gray-600">Loading preview...</div>
      </div>
    );
  }

  if (error || !data?.getPortfolio) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-indigo-50 via-white to-purple-50">
        <AuthNavbar />
        <div className="flex flex-col items-center justify-center min-h-[calc(100vh-4rem)]">
          <div className="text-center mb-8">
            <h1 className="text-4xl font-bold text-gray-900 mb-4">No Portfolio Found</h1>
            <p className="text-gray-600 mb-6">You haven&apos;t created a portfolio yet.</p>
            <Link
              href="/templates"
              className="inline-block bg-gradient-to-r from-indigo-600 to-purple-600 text-white px-8 py-3 rounded-xl font-semibold hover:shadow-lg transform hover:scale-105 transition-all"
            >
              Choose a Template
            </Link>
          </div>
        </div>
      </div>
    );
  }

  const portfolio = data.getPortfolio;
  const category = portfolio.template.category;

  return (
    <div className="relative">
      {/* Preview Banner */}
      <div className="fixed top-0 left-0 right-0 bg-yellow-500 text-white py-3 px-4 z-50 shadow-md">
        <div className="max-w-7xl mx-auto flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3">
          <div className="flex items-center gap-2 sm:gap-3">
            <span className="font-semibold text-sm sm:text-base whitespace-nowrap">
              {portfolio.isPublished ? '👁️ Preview Mode' : '📝 Draft Preview'}
            </span>
            <span className="text-xs sm:text-sm hidden sm:inline">
              {portfolio.isPublished 
                ? 'This is how your published portfolio looks'
                : 'Your portfolio is not published yet'}
            </span>
          </div>
          <div className="flex gap-2 sm:gap-3 w-full sm:w-auto">
            <Link
              href={`/editor?portfolio=${portfolioId}`}
              className="flex-1 sm:flex-none bg-white text-yellow-600 px-3 sm:px-4 py-2 rounded-lg text-xs sm:text-sm font-semibold hover:bg-yellow-50 text-center"
            >
              Edit
            </Link>
            <Link
              href="/dashboard"
              className="flex-1 sm:flex-none bg-yellow-600 text-white px-3 sm:px-4 py-2 rounded-lg text-xs sm:text-sm font-semibold hover:bg-yellow-700 text-center"
            >
              Dashboard
            </Link>
          </div>
        </div>
      </div>

      {/* Portfolio Content with top padding to account for banner */}
      <div className="pt-20 sm:pt-16">
        {category === 'engineer' && <EngineerTemplate portfolio={portfolio} />}
        {category === 'marketer' && <MarketerTemplate portfolio={portfolio} />}
        {category === 'general' && <GeneralTemplate portfolio={portfolio} />}
      </div>
    </div>
  );
}

export default function PreviewPage() {
  return (
    <ProtectedRoute>
      <PreviewContent />
    </ProtectedRoute>
  );
}
