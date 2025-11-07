import React from 'react';
import { useQuery } from '@apollo/client';
import { GET_PORTFOLIO_BY_USERNAME, GET_PUBLIC_PORTFOLIO_BY_ID } from '@/lib/graphql/operations';
import { useTheme, ThemeConfig } from '@/lib/ThemeContext';
import { getSectionComponent } from './sections';
import { LoadingSpinner } from './ui/Loading';
import { PortfolioNavbar } from './portfolio/PortfolioNavbar';

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

      {/* Navigation Bar */}
      <PortfolioNavbar 
        sections={sortedSections}
        resumeUrl={portfolio.resumeUrl}
        theme={currentTheme}
      />

      {/* Main Content with padding for fixed navbar */}
      <div className="pt-16 md:pt-20">
        {/* Render Portfolio Sections */}
        {sortedSections.map((section) => {
          const SectionComponent = getSectionComponent(section.sectionType.name);
          
          if (!SectionComponent) {
            console.warn(`No component found for section type: ${section.sectionType.name}`);
            return null;
          }

          return (
            <div key={section.id} id={`section-${section.id}`}>
              <SectionComponent
                id={section.id}
                content={section.content}
                styles={section.styles}
                layout={section.layout}
                theme={currentTheme}
                isEditing={false}
              />
            </div>
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
    </div>
  );
};
