'use client';

import { useState } from 'react';
import { useQuery, useMutation } from '@apollo/client';
import { useAuth } from '@/lib/AuthContext';
import { ThemeProvider } from '@/lib/ThemeContext';
import {
  GET_ME,
  GET_SECTION_TYPES,
  GET_THEMES,
  ADD_PORTFOLIO_SECTION,
} from '@/lib/graphql/operations';
import { HeroMinimal, AboutText, SkillsCards, PortfolioGrid, ContactForm, ExperienceTimeline } from '@/components/sections';
import { LoadingScreen, Heading, Text, Button, Card, Container, Grid, Stack, Select, Box } from '@/components/ui';
import Link from 'next/link';

export default function SectionBuilderPage() {
  const { user, isAuthenticated } = useAuth();
  const [selectedPortfolioId, setSelectedPortfolioId] = useState('');
  const [selectedSectionType, setSelectedSectionType] = useState('');
  const [selectedTheme, setSelectedTheme] = useState<any>(null);
  const [previewContent, setPreviewContent] = useState<any>(null);

  const { data: userData, loading: userLoading } = useQuery(GET_ME, {
    skip: !isAuthenticated,
  });

  const { data: sectionTypesData, loading: sectionTypesLoading } = useQuery(GET_SECTION_TYPES);
  const { data: themesData, loading: themesLoading } = useQuery(GET_THEMES);

  const [addSection, { loading: addingSection }] = useMutation(ADD_PORTFOLIO_SECTION);

  if (!isAuthenticated) {
    return (
      <Box className="min-h-screen flex items-center justify-center bg-gray-50 px-4">
        <Card className="text-center max-w-md w-full">
          <Stack spacing="lg" align="center">
            <Heading as="h1" size="3xl">Please Login</Heading>
            <Link href="/login">
              <Button variant="primary" size="lg">
                Go to Login
              </Button>
            </Link>
          </Stack>
        </Card>
      </Box>
    );
  }

  if (userLoading || sectionTypesLoading || themesLoading) {
    return <LoadingScreen message="Loading section builder..." />;
  }

  const portfolios = userData?.me?.portfolios || [];
  const sectionTypes = sectionTypesData?.sectionTypes || [];
  const themes = themesData?.themes || [];

  // Sample content for each section type
  const getSampleContent = (sectionTypeName: string) => {
    switch (sectionTypeName) {
      case 'hero-minimal':
        return {
          name: user?.name || 'John Doe',
          tagline: 'Full Stack Developer & Designer',
          photoUrl: 'https://via.placeholder.com/200',
          cta: {
            primary: { text: 'View Work', link: '#portfolio' },
            secondary: { text: 'Contact Me', link: '#contact' },
          },
        };
      case 'about-text':
        return {
          title: 'About Me',
          bio: "I'm a passionate developer with 5 years of experience building web applications. I love creating beautiful, functional products that make a difference.",
          highlights: [
            '10+ successful projects delivered',
            'Expert in React and Node.js',
            'Passionate about clean code',
          ],
        };
      case 'skills-cards':
        return {
          title: 'My Skills',
          skills: [
            { name: 'React', level: 90, category: 'Frontend', icon: '⚛️' },
            { name: 'Node.js', level: 85, category: 'Backend', icon: '🟢' },
            { name: 'TypeScript', level: 88, category: 'Language', icon: '📘' },
            { name: 'GraphQL', level: 82, category: 'API', icon: '◼️' },
            { name: 'MongoDB', level: 80, category: 'Database', icon: '🍃' },
            { name: 'AWS', level: 75, category: 'Cloud', icon: '☁️' },
          ],
        };
      case 'portfolio-grid':
        return {
          title: 'Featured Projects',
          items: [
            {
              title: 'E-Commerce Platform',
              description: 'A full-featured e-commerce platform with payment integration',
              imageUrl: 'https://via.placeholder.com/400x300',
              tags: ['React', 'Node.js', 'MongoDB'],
              link: 'https://example.com',
              githubLink: 'https://github.com/example',
            },
            {
              title: 'Social Media Dashboard',
              description: 'Analytics dashboard for social media management',
              imageUrl: 'https://via.placeholder.com/400x300',
              tags: ['Vue.js', 'Python', 'PostgreSQL'],
              demoLink: 'https://demo.example.com',
            },
          ],
        };
      case 'contact-form':
        return {
          title: 'Get In Touch',
          subtitle: "Let's work together on your next project",
          email: user?.email || 'contact@example.com',
          phone: '+1 (555) 123-4567',
          showForm: true,
        };
      case 'experience-timeline':
        return {
          title: 'Experience',
          items: [
            {
              title: 'Senior Full Stack Developer',
              organization: 'Tech Corp',
              period: '2022 - Present',
              location: 'San Francisco, CA',
              type: 'work',
              description: 'Leading development of customer-facing applications',
              achievements: [
                'Increased performance by 40%',
                'Mentored 5 junior developers',
              ],
            },
            {
              title: 'Full Stack Developer',
              organization: 'Startup Inc',
              period: '2020 - 2022',
              location: 'Remote',
              type: 'work',
              description: 'Built MVP and scaled to 10k users',
            },
          ],
        };
      default:
        return {};
    }
  };

  const handlePreview = (sectionType: any) => {
    const content = getSampleContent(sectionType.name);
    setPreviewContent({ sectionType, content });
  };

  const handleAddSection = async () => {
    if (!selectedPortfolioId || !selectedSectionType) {
      alert('Please select a portfolio and section type');
      return;
    }

    const content = getSampleContent(selectedSectionType);

    try {
      await addSection({
        variables: {
          input: {
            portfolioId: selectedPortfolioId,
            sectionTypeId: selectedSectionType,
            content,
            layout: 'centered',
          },
        },
      });
      alert('Section added successfully! Visit your portfolio to see it.');
    } catch (error: any) {
      alert('Error: ' + error.message);
    }
  };

  const renderPreviewComponent = () => {
    if (!previewContent || !selectedTheme) return null;

    const { sectionType, content } = previewContent;
    const props = {
      id: 'preview',
      content,
      layout: 'centered',
      theme: selectedTheme,
      isEditing: false,
    };

    switch (sectionType.name) {
      case 'hero-minimal':
        return <HeroMinimal {...props} />;
      case 'about-text':
        return <AboutText {...props} />;
      case 'skills-cards':
        return <SkillsCards {...props} />;
      case 'portfolio-grid':
        return <PortfolioGrid {...props} />;
      case 'contact-form':
        return <ContactForm {...props} />;
      case 'experience-timeline':
        return <ExperienceTimeline {...props} />;
      default:
        return null;
    }
  };

  return (
    <Box className="min-h-screen bg-gray-50 py-6 sm:py-8">
      <Container maxWidth="7xl">
        <Stack spacing="md" className="mb-6 sm:mb-8 px-4 sm:px-0">
          <Heading as="h1" size="4xl" className="text-3xl sm:text-4xl">
            🎨 Section Builder (Test Page)
          </Heading>
          <Text className="text-sm sm:text-base">
            Test the new section-based system. Add sections to your portfolio and preview them with different themes.
          </Text>
        </Stack>

        <Grid cols={1} lgCols={2} gap="lg" className="px-4 sm:px-0">
          {/* Controls */}
          <Stack spacing="lg">
            {/* Portfolio Selector */}
            <Card>
              <Stack spacing="md">
                <Heading as="h2" size="xl" className="text-lg sm:text-xl">
                  1. Select Portfolio
                </Heading>
                <Select
                  value={selectedPortfolioId}
                  onChange={(value) => setSelectedPortfolioId(value)}
                  options={[
                    { value: '', label: 'Choose a portfolio...' },
                    ...portfolios.map((p: any) => ({
                      value: p.id,
                      label: `${p.name} (${p.template.name})`,
                    })),
                  ]}
                  placeholder="Choose a portfolio..."
                />
              </Stack>
            </Card>

            {/* Theme Selector */}
            <Card>
              <Stack spacing="md">
                <Heading as="h2" size="xl" className="text-lg sm:text-xl">
                  2. Select Theme
                </Heading>
                <Stack spacing="sm">
                  {themes.map((theme: any) => (
                    <button
                      key={theme.id}
                      onClick={() => setSelectedTheme(theme)}
                      className={`p-3 sm:p-4 rounded-lg border-2 text-left transition ${
                        selectedTheme?.id === theme.id
                          ? 'border-indigo-600 bg-indigo-50'
                          : 'border-gray-200 hover:border-gray-300'
                      }`}
                    >
                      <Heading as="h3" size="md" weight="semibold" className="text-sm sm:text-base">
                        {theme.name}
                      </Heading>
                      <Text size="sm" className="text-xs sm:text-sm text-gray-600 mt-1">
                        {theme.description}
                      </Text>
                      <div className="flex gap-2 mt-2">
                        <div
                          className="w-6 h-6 sm:w-8 sm:h-8 rounded"
                          style={{ backgroundColor: theme.colors.primary }}
                        />
                        <div
                          className="w-6 h-6 sm:w-8 sm:h-8 rounded"
                          style={{ backgroundColor: theme.colors.secondary }}
                        />
                        <div
                          className="w-6 h-6 sm:w-8 sm:h-8 rounded"
                          style={{ backgroundColor: theme.colors.accent }}
                        />
                      </div>
                    </button>
                  ))}
                </Stack>
              </Stack>
            </Card>

            {/* Section Types */}
            <Card>
              <Stack spacing="md">
                <Heading as="h2" size="xl" className="text-lg sm:text-xl">
                  3. Select Section Type
                </Heading>
                <Stack spacing="sm">
                  {sectionTypes.map((sectionType: any) => (
                    <button
                      key={sectionType.id}
                      onClick={() => {
                        setSelectedSectionType(sectionType.id);
                        handlePreview(sectionType);
                      }}
                      className={`flex-1 p-3 rounded-lg border-2 text-left transition ${
                        selectedSectionType === sectionType.id
                          ? 'border-indigo-600 bg-indigo-50'
                          : 'border-gray-200 hover:border-gray-300'
                      }`}
                    >
                      <Heading as="h3" size="md" weight="semibold" className="text-sm sm:text-base">
                        {sectionType.displayName}
                      </Heading>
                      <Text size="sm" className="text-xs sm:text-sm text-gray-600 mt-1">
                        {sectionType.description}
                      </Text>
                    </button>
                  ))}
                </Stack>
              </Stack>
            </Card>

            {/* Add Button */}
            <Button
              onClick={handleAddSection}
              disabled={addingSection || !selectedPortfolioId || !selectedSectionType}
              variant="primary"
              size="lg"
              fullWidth
              loading={addingSection}
              className="bg-gradient-to-r from-indigo-600 to-purple-600 hover:shadow-lg transform hover:scale-105 transition-all disabled:transform-none text-sm sm:text-base"
            >
              {addingSection ? 'Adding Section...' : '+ Add Section to Portfolio'}
            </Button>
          </Stack>

          {/* Preview */}
          <Card padding="none" className="overflow-hidden sticky top-4">
            <Box className="bg-gray-800 text-white px-4 sm:px-6 py-3 sm:py-4">
              <Heading as="h2" size="xl" className="text-white text-lg sm:text-xl mb-1">
                Live Preview
              </Heading>
              <Text size="sm" className="text-gray-300 text-xs sm:text-sm">
                {previewContent
                  ? `${previewContent.sectionType.displayName} with ${selectedTheme?.name || 'no theme'}`
                  : 'Select a section and theme to preview'}
              </Text>
            </Box>
            <Box className="max-h-[600px] sm:max-h-[800px] overflow-y-auto">
              {selectedTheme && previewContent ? (
                <ThemeProvider initialTheme={selectedTheme}>
                  {renderPreviewComponent()}
                </ThemeProvider>
              ) : (
                <Stack spacing="md" align="center" className="p-8 sm:p-12 text-center">
                  <Text className="text-base sm:text-lg text-gray-400">
                    Select a theme and section type to see preview
                  </Text>
                </Stack>
              )}
            </Box>
          </Card>
        </Grid>
      </Container>
    </Box>
  );
}
