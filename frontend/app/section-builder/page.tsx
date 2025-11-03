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
import { LoadingSpinner } from '@/components/ui/Loading';
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
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <div className="text-center">
          <h1 className="text-3xl font-bold mb-4">Please Login</h1>
          <Link href="/login" className="text-indigo-600 hover:underline">
            Go to Login
          </Link>
        </div>
      </div>
    );
  }

  if (userLoading || sectionTypesLoading || themesLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <LoadingSpinner size="lg" />
      </div>
    );
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
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-7xl mx-auto px-4">
        <div className="mb-8">
          <h1 className="text-4xl font-bold mb-2">🎨 Section Builder (Test Page)</h1>
          <p className="text-gray-600">
            Test the new section-based system. Add sections to your portfolio and preview them with different themes.
          </p>
        </div>

        <div className="grid lg:grid-cols-2 gap-8">
          {/* Controls */}
          <div className="space-y-6">
            {/* Portfolio Selector */}
            <div className="bg-white p-6 rounded-xl shadow">
              <h2 className="text-xl font-bold mb-4">1. Select Portfolio</h2>
              <select
                value={selectedPortfolioId}
                onChange={(e) => setSelectedPortfolioId(e.target.value)}
                className="w-full px-4 py-2 border rounded-lg"
              >
                <option value="">Choose a portfolio...</option>
                {portfolios.map((p: any) => (
                  <option key={p.id} value={p.id}>
                    {p.name} ({p.template.name})
                  </option>
                ))}
              </select>
            </div>

            {/* Theme Selector */}
            <div className="bg-white p-6 rounded-xl shadow">
              <h2 className="text-xl font-bold mb-4">2. Select Theme</h2>
              <div className="grid grid-cols-1 gap-3">
                {themes.map((theme: any) => (
                  <button
                    key={theme.id}
                    onClick={() => setSelectedTheme(theme)}
                    className={`p-4 rounded-lg border-2 text-left transition ${
                      selectedTheme?.id === theme.id
                        ? 'border-indigo-600 bg-indigo-50'
                        : 'border-gray-200 hover:border-gray-300'
                    }`}
                  >
                    <div className="font-semibold">{theme.name}</div>
                    <div className="text-sm text-gray-600">{theme.description}</div>
                    <div className="flex gap-2 mt-2">
                      <div
                        className="w-8 h-8 rounded"
                        style={{ backgroundColor: theme.colors.primary }}
                      />
                      <div
                        className="w-8 h-8 rounded"
                        style={{ backgroundColor: theme.colors.secondary }}
                      />
                      <div
                        className="w-8 h-8 rounded"
                        style={{ backgroundColor: theme.colors.accent }}
                      />
                    </div>
                  </button>
                ))}
              </div>
            </div>

            {/* Section Types */}
            <div className="bg-white p-6 rounded-xl shadow">
              <h2 className="text-xl font-bold mb-4">3. Select Section Type</h2>
              <div className="space-y-2">
                {sectionTypes.map((sectionType: any) => (
                  <div key={sectionType.id} className="flex gap-2">
                    <button
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
                      <div className="font-semibold">{sectionType.displayName}</div>
                      <div className="text-sm text-gray-600">{sectionType.description}</div>
                    </button>
                  </div>
                ))}
              </div>
            </div>

            {/* Add Button */}
            <button
              onClick={handleAddSection}
              disabled={addingSection || !selectedPortfolioId || !selectedSectionType}
              className="w-full bg-gradient-to-r from-indigo-600 to-purple-600 text-white px-8 py-4 rounded-xl font-semibold hover:shadow-lg transform hover:scale-105 transition-all disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none"
            >
              {addingSection ? 'Adding Section...' : '+ Add Section to Portfolio'}
            </button>
          </div>

          {/* Preview */}
          <div className="bg-white rounded-xl shadow overflow-hidden">
            <div className="bg-gray-800 text-white px-6 py-4">
              <h2 className="text-xl font-bold">Live Preview</h2>
              <p className="text-sm text-gray-300">
                {previewContent
                  ? `${previewContent.sectionType.displayName} with ${selectedTheme?.name || 'no theme'}`
                  : 'Select a section and theme to preview'}
              </p>
            </div>
            <div className="max-h-[800px] overflow-y-auto">
              {selectedTheme && previewContent ? (
                <ThemeProvider initialTheme={selectedTheme}>
                  {renderPreviewComponent()}
                </ThemeProvider>
              ) : (
                <div className="p-12 text-center text-gray-400">
                  <p className="text-lg">Select a theme and section type to see preview</p>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
