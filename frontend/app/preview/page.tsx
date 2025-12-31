'use client';

import { useQuery, useMutation } from '@apollo/client';
import { useSearchParams } from 'next/navigation';
import { useState, useEffect, useRef } from 'react';
import { GET_PORTFOLIO, GET_THEMES, UPDATE_PORTFOLIO } from '@/lib/graphql/operations';
import { ProtectedRoute } from '@/lib/ProtectedRoute';
import { usePortfolio } from '@/lib/PortfolioContext';
import { getSectionComponent } from '@/components/sections';
import { LoadingScreen, Heading, Text, Link, Button, Container, Stack, Flex, Box, Badge, Alert } from '@/components/ui';
import { ThemeSelector } from '@/components/section-editor/ThemeSelector';

function PreviewContent() {
  const searchParams = useSearchParams();
  const urlPortfolioId = searchParams.get('portfolio');
  const { currentPortfolioId } = usePortfolio();
  
  // Use URL parameter first, then fall back to context
  const portfolioId = urlPortfolioId || currentPortfolioId;
  
  const [showThemeSelector, setShowThemeSelector] = useState(false);
  const [changingTheme, setChangingTheme] = useState(false);
  const [themeError, setThemeError] = useState<string | null>(null);
  const themeSelectorRef = useRef<HTMLDivElement>(null);
  
  const { data, loading, error, refetch } = useQuery(GET_PORTFOLIO, {
    variables: { portfolioId },
    skip: !portfolioId,
  });

  const { data: themesData, loading: themesLoading } = useQuery(GET_THEMES);

  const [updatePortfolio] = useMutation(UPDATE_PORTFOLIO);

  // Close theme selector when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (themeSelectorRef.current && !themeSelectorRef.current.contains(event.target as Node)) {
        setShowThemeSelector(false);
      }
    };

    if (showThemeSelector) {
      document.addEventListener('mousedown', handleClickOutside);
    }

    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [showThemeSelector]);

  const handleThemeChange = async (themeId: string) => {
    if (!portfolioId) return;
    
    setChangingTheme(true);
    setThemeError(null);
    
    try {
      await updatePortfolio({
        variables: {
          id: portfolioId,
          themeId,
        },
      });
      
      // Refetch portfolio to get updated theme
      await refetch();
      setShowThemeSelector(false);
    } catch (err: any) {
      console.error('Error changing theme:', err);
      setThemeError(err.message || 'Failed to change theme');
    } finally {
      setChangingTheme(false);
    }
  };

  if (loading) {
    return <LoadingScreen message="Loading preview..." />;
  }

  if (error || !data?.getPortfolio) {
    return (
      <Container maxWidth="4xl" className="py-16 sm:py-20 lg:py-24 px-4">
        <Stack spacing="lg" align="center">
          <Heading as="h1" size="4xl" align="center" className="text-3xl sm:text-4xl">No Portfolio Found</Heading>
          <Text size="lg" align="center" className="text-base sm:text-lg">You haven&apos;t created a portfolio yet.</Text>
          <Link href="/templates" className="w-full sm:w-auto">
            <Button variant="primary" size="lg" className="w-full sm:w-auto">
              Choose a Template
            </Button>
          </Link>
        </Stack>
      </Container>
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
      <Box className="fixed top-0 left-0 right-0 bg-amber-500 text-white z-50 shadow-md py-2 sm:py-3 px-4">
        <Container padding="none">
          <Flex direction="col" align="start" justify="between" gap="sm" className="sm:flex-row sm:items-center">
            <Stack direction="horizontal" spacing="sm" align="center" className="flex-wrap sm:flex-nowrap">
              <Badge className="bg-transparent border-0 p-0">
                <Text as="span" weight="semibold" className="text-white whitespace-nowrap text-sm sm:text-base">
                  {portfolio.isPublished ? '👁️ Preview Mode' : '📝 Draft Preview'}
                </Text>
              </Badge>
              <Text size="sm" className="text-white hidden lg:inline text-xs sm:text-sm">
                {portfolio.isPublished 
                  ? 'This is how your published portfolio looks'
                  : 'Your portfolio is not published yet'}
              </Text>
            </Stack>
            
            <Flex gap="xs" className="w-full sm:w-auto flex-shrink-0">
              <Link href="/dashboard">
                <Button variant="primary" size="sm" className="bg-amber-600 text-white hover:bg-amber-700 text-xs sm:text-sm whitespace-nowrap h-8">
                  🏠 <span className=" ml-1">Dashboard</span>
                </Button>
              </Link>
              <Link href={`/section-editor?portfolio=${portfolioId}`}>
                <Button variant="outline" size="sm" className="bg-white text-amber-600 hover:bg-amber-50 text-xs sm:text-sm whitespace-nowrap h-8">
                  ✏️ Edit
                </Button>
              </Link>
              <div ref={themeSelectorRef} className="relative">
                <Button 
                  variant="outline" 
                  size="sm" 
                  onClick={() => setShowThemeSelector(!showThemeSelector)}
                  disabled={themesLoading}
                  className="bg-white text-amber-600 hover:bg-amber-50 text-xs sm:text-sm whitespace-nowrap h-8"
                >
                  🎨 <span className="ml-1">Theme</span>
                </Button>
                
                {/* Theme Selector Popup */}
                {showThemeSelector && themesData?.themes && (
                  <ThemeSelector
                    themes={themesData.themes}
                    currentThemeId={portfolio.theme?.id || ''}
                    changingTheme={changingTheme}
                    onThemeSelect={handleThemeChange}
                    onClose={() => setShowThemeSelector(false)}
                  />
                )}
              </div>
            </Flex>
          </Flex>
        </Container>
      </Box>

      {/* Error Alert */}
      {themeError && (
        <Box className="fixed top-20 left-1/2 transform -translate-x-1/2 z-40 w-11/12 max-w-md">
          <Alert variant="error" onClose={() => setThemeError(null)}>
            {themeError}
          </Alert>
        </Box>
      )}

      {/* Portfolio Content with top padding to account for banner */}
      <div 
        className="pt-24 sm:pt-20 lg:pt-16 min-h-screen"
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
          <Container maxWidth="4xl" className="py-20 sm:py-28 lg:py-32 px-4">
            <Stack spacing="lg" align="center">
              <Heading as="h2" size="3xl" align="center" className="text-2xl sm:text-3xl lg:text-4xl">Portfolio Under Construction</Heading>
              <Text size="lg" align="center" className="text-base sm:text-lg">
                Your portfolio doesn&apos;t have any sections yet.
              </Text>
              <Link href={`/section-editor?portfolio=${portfolioId}`} className="w-full sm:w-auto">
                <Button variant="primary" size="lg" className="w-full sm:w-auto">
                  Add Sections
                </Button>
              </Link>
            </Stack>
          </Container>
        )}
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
