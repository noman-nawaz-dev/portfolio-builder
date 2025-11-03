'use client';

import { useQuery } from '@apollo/client';
import { useSearchParams } from 'next/navigation';
import { GET_PORTFOLIO } from '@/lib/graphql/operations';
import { ProtectedRoute } from '@/lib/ProtectedRoute';
import { usePortfolio } from '@/lib/PortfolioContext';
import { getSectionComponent } from '@/components/sections';
import AuthLayout from '@/components/AuthLayout';
import Link from 'next/link';
import { LoadingScreen } from '@/components/ui';

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
    return <LoadingScreen message="Loading preview..." />;
  }

  if (error || !data?.getPortfolio) {
    return (
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
    );
  }

  const portfolio = data.getPortfolio;
  
  // Sort sections by order
  const sortedSections = [...(portfolio.sections || [])].sort(
    (a: any, b: any) => a.order - b.order
  );

  // Use portfolio theme or default theme
  const currentTheme = portfolio.theme || {
    colors: {
      primary: '#3B82F6',
      secondary: '#8B5CF6',
      background: { primary: '#FFFFFF', secondary: '#F9FAFB' },
      text: { primary: '#111827', secondary: '#6B7280' },
    },
    fonts: { heading: 'Inter, sans-serif', body: 'Inter, sans-serif' },
    fontSizes: { xl: '1.25rem', lg: '1.125rem', md: '1rem' },
    lineHeights: { normal: 1.5, relaxed: 1.75 },
    spacing: { md: '1.5rem', lg: '2rem' },
  };

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
              href={`/section-editor?portfolio=${portfolioId}`}
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
      <div 
        className="pt-20 sm:pt-16 min-h-screen"
        style={{
          backgroundColor: currentTheme.colors.background.primary,
          color: currentTheme.colors.text.primary,
          fontFamily: currentTheme.fonts.body,
        }}
      >
        {/* Render Portfolio Sections */}
        {sortedSections.map((section: any) => {
          const SectionComponent = getSectionComponent(section.sectionType.name);
          
          if (!SectionComponent) {
            console.warn(`No component found for section type: ${section.sectionType.name}`);
            return null;
          }

          return (
            <SectionComponent
              key={section.id}
              id={section.id}
              content={section.content}
              styles={section.styles}
              layout={section.layout}
              theme={currentTheme}
              isEditing={false}
            />
          );
        })}

        {/* Empty State */}
        {sortedSections.length === 0 && (
          <div className="flex items-center justify-center min-h-[calc(100vh-5rem)]">
            <div className="text-center">
              <h2 className="text-3xl font-bold mb-4">Portfolio Under Construction</h2>
              <p className="text-gray-600 mb-6">
                Your portfolio doesn&apos;t have any sections yet.
              </p>
              <Link
                href={`/section-editor?portfolio=${portfolioId}`}
                className="inline-block bg-gradient-to-r from-indigo-600 to-purple-600 text-white px-8 py-3 rounded-xl font-semibold hover:shadow-lg transform hover:scale-105 transition-all"
              >
                Add Sections
              </Link>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

export default function PreviewPage() {
  return (
    <ProtectedRoute>
      <AuthLayout>
        <PreviewContent />
      </AuthLayout>
    </ProtectedRoute>
  );
}
