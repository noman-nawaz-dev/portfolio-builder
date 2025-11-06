import React from 'react';
import { useQuery } from '@apollo/client';
import { GET_PORTFOLIO_BY_USERNAME, GET_PUBLIC_PORTFOLIO_BY_ID } from '@/lib/graphql/operations';
import { useTheme, ThemeConfig } from '@/lib/ThemeContext';
import { getSectionComponent } from './sections';
import { LoadingSpinner } from './ui/Loading';

interface PortfolioRendererProps {
  username: string;
  portfolioId?: string | null;
}

export const PortfolioRenderer: React.FC<PortfolioRendererProps> = ({ username, portfolioId }) => {
  // If portfolioId is provided, use GET_PUBLIC_PORTFOLIO_BY_ID, otherwise use GET_PORTFOLIO_BY_USERNAME
  const queryToUse = portfolioId ? GET_PUBLIC_PORTFOLIO_BY_ID : GET_PORTFOLIO_BY_USERNAME;
  const variables = portfolioId ? { portfolioId } : { username };
  
  const { loading, error, data } = useQuery(queryToUse, {
    variables,
    skip: !username && !portfolioId,
  });
  
  const { theme, setTheme } = useTheme();

  // Apply portfolio theme when loaded
  React.useEffect(() => {
    const loadedTheme = data?.portfolioByUsername?.theme || data?.publicPortfolioById?.theme;
    if (loadedTheme) {
      setTheme(loadedTheme);
    }
  }, [data, setTheme]);

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <LoadingSpinner size="lg" />
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="text-center">
          <h1 className="text-4xl font-bold mb-4">Portfolio Not Found</h1>
          <p className="text-gray-600">
            {error.message || 'Unable to load this portfolio'}
          </p>
        </div>
      </div>
    );
  }

  const portfolio = data?.portfolioByUsername || data?.publicPortfolioById;
  if (!portfolio) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="text-center">
          <h1 className="text-4xl font-bold mb-4">Portfolio Not Found</h1>
          <p className="text-gray-600">
            {portfolioId 
              ? `No portfolio found with ID: ${portfolioId}`
              : `No portfolio found for username: ${username}`
            }
          </p>
        </div>
      </div>
    );
  }

  // Sort sections by order
  const sortedSections = [...(portfolio.sections || [])].sort(
    (a, b) => a.order - b.order
  );

  // Use portfolio theme or context theme
  const currentTheme = portfolio.theme || theme;

  // If no theme available, show error
  if (!currentTheme) {
    return (
      <div className="flex items-center justify-center min-h-screen bg-gray-50">
        <div className="text-center">
          <h1 className="text-4xl font-bold mb-4 text-gray-900">Theme Not Found</h1>
          <p className="text-gray-600">
            This portfolio doesn't have a theme configured yet.
          </p>
        </div>
      </div>
    );
  }

  return (
    <div
      className="min-h-screen"
      style={{
        backgroundColor: currentTheme.colors.background.primary,
        color: currentTheme.colors.text.primary,
        fontFamily: currentTheme.fonts.body,
      }}
    >
      {/* SEO Meta Tags */}
      {portfolio.seo && (
        <head>
          <title>{portfolio.seo.title || portfolio.title}</title>
          <meta
            name="description"
            content={portfolio.seo.description || ''}
          />
          {portfolio.seo.keywords && (
            <meta name="keywords" content={portfolio.seo.keywords.join(', ')} />
          )}
          {portfolio.seo.ogImage && (
            <>
              <meta property="og:image" content={portfolio.seo.ogImage} />
              <meta name="twitter:image" content={portfolio.seo.ogImage} />
            </>
          )}
        </head>
      )}

      {/* Floating Resume Download Button */}
      {portfolio.resumeUrl && (
        <div className="fixed bottom-6 right-6 z-40">
          <a
            href={portfolio.resumeUrl}
            target="_blank"
            rel="noopener noreferrer"
            download
            className="flex items-center gap-2 bg-gradient-to-r from-indigo-600 to-purple-600 text-white px-5 py-3 rounded-full shadow-lg hover:shadow-xl transform hover:scale-105 transition-all font-semibold"
            style={{
              backgroundColor: currentTheme.colors.primary,
            }}
          >
            <svg
              className="w-5 h-5"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M12 10v6m0 0l-3-3m3 3l3-3m2 8H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"
              />
            </svg>
            <span>Download Resume</span>
          </a>
        </div>
      )}

      {/* Render Portfolio Sections */}
      {sortedSections.map((section) => {
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
        <div className="flex items-center justify-center min-h-screen">
          <div className="text-center">
            <h2 className="text-3xl font-bold mb-4">Portfolio Under Construction</h2>
            <p className="text-gray-600">
              This portfolio doesn't have any sections yet.
            </p>
          </div>
        </div>
      )}
    </div>
  );
};
