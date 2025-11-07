'use client';

import { useQuery } from '@apollo/client';
import { useSearchParams } from 'next/navigation';
import { GET_PORTFOLIO } from '@/lib/graphql/operations';
import { ProtectedRoute } from '@/lib/ProtectedRoute';
import { usePortfolio } from '@/lib/PortfolioContext';
import { getSectionComponent } from '@/components/sections';
import AuthLayout from '@/components/AuthLayout';
import { LoadingScreen, Heading, Text, Link, Button, Container, Stack, Flex, Box, Badge } from '@/components/ui';

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
      <Box className="fixed top-0 left-0 right-0 bg-yellow-500 text-white z-50 shadow-md py-2 sm:py-3 px-4">
        <Container maxWidth="7xl" padding="none">
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
              {portfolio.resumeUrl && (
                <a
                  href={portfolio.resumeUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  download
                >
                  <Button variant="outline" size="sm" className="bg-white text-yellow-600 hover:bg-yellow-50 text-xs sm:text-sm whitespace-nowrap h-8">
                    📄 <span className="hidden sm:inline ml-1">Resume</span>
                  </Button>
                </a>
              )}
              <Link href={`/section-editor?portfolio=${portfolioId}`}>
                <Button variant="outline" size="sm" className="bg-white text-yellow-600 hover:bg-yellow-50 text-xs sm:text-sm whitespace-nowrap h-8">
                  ✏️ Edit
                </Button>
              </Link>
              <Link href="/dashboard">
                <Button variant="primary" size="sm" className="bg-yellow-600 text-white hover:bg-yellow-700 text-xs sm:text-sm whitespace-nowrap h-8">
                  🏠 <span className="hidden sm:inline ml-1">Dashboard</span>
                </Button>
              </Link>
            </Flex>
          </Flex>
        </Container>
      </Box>

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
      <AuthLayout>
        <PreviewContent />
      </AuthLayout>
    </ProtectedRoute>
  );
}
