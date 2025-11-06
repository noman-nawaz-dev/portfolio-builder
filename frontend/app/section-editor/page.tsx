'use client';

import { useState, useEffect } from 'react';
import { useQuery, useMutation } from '@apollo/client';
import { useRouter, useSearchParams } from 'next/navigation';
import { ProtectedRoute } from '@/lib/ProtectedRoute';
import AuthLayout from '@/components/AuthLayout';
import { LoadingScreen } from '@/components/ui';
import { ThemeProvider } from '@/lib/ThemeContext';
import {
  GET_PORTFOLIO,
  GET_SECTION_TYPES,
  GET_THEMES,
  ADD_PORTFOLIO_SECTION,
  UPDATE_PORTFOLIO_SECTION,
  DELETE_PORTFOLIO_SECTION,
  REORDER_PORTFOLIO_SECTIONS,
  UPDATE_PORTFOLIO,
  PUBLISH_PORTFOLIO,
} from '@/lib/graphql/operations';
import { getSectionComponent } from '@/components/sections';
import SectionContentEditor from '@/components/SectionContentEditor';
import { ResumeUpload } from '@/components/ResumeUpload';

function SectionEditorContent() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const portfolioId = searchParams.get('portfolio');

  const [selectedSectionId, setSelectedSectionId] = useState<string | null>(null);
  const [showAddSection, setShowAddSection] = useState(false);
  const [showThemeSelector, setShowThemeSelector] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState<'light' | 'dark' | null>(null);
  const [editingContent, setEditingContent] = useState<any>(null);
  const [deletingSectionId, setDeletingSectionId] = useState<string | null>(null);
  const [pendingOrder, setPendingOrder] = useState<string[]>([]);
  const [hasUnsavedOrder, setHasUnsavedOrder] = useState(false);
  const [changingTheme, setChangingTheme] = useState(false);
  const [loadingNewSection, setLoadingNewSection] = useState(false);
  const [showResumeUpload, setShowResumeUpload] = useState(false);

  const { data: portfolioData, loading: portfolioLoading, refetch } = useQuery(GET_PORTFOLIO, {
    variables: { portfolioId },
    skip: !portfolioId,
  });

  const { data: sectionTypesData } = useQuery(GET_SECTION_TYPES);
  const { data: themesData } = useQuery(GET_THEMES);

  const [addSection, { loading: addingSection }] = useMutation(ADD_PORTFOLIO_SECTION, {
    onCompleted: (data) => {
      refetch();
      setShowAddSection(false);
      setLoadingNewSection(false);
      // Automatically open the newly created section for editing
      if (data?.addPortfolioSection) {
        setSelectedSectionId(data.addPortfolioSection.id);
        setEditingContent(data.addPortfolioSection.content);
      }
    },
    onError: () => {
      setLoadingNewSection(false);
    },
  });

  const [updateSection, { loading: updatingSection }] = useMutation(UPDATE_PORTFOLIO_SECTION, {
    onCompleted: () => {
      refetch();
      setSelectedSectionId(null);
      setEditingContent(null);
    },
  });

  const [deleteSection, { loading: deletingSection }] = useMutation(DELETE_PORTFOLIO_SECTION, {
    onCompleted: () => {
      refetch();
      setDeletingSectionId(null);
    },
  });

  const [reorderSections, { loading: reorderingSection }] = useMutation(REORDER_PORTFOLIO_SECTIONS, {
    onCompleted: () => refetch(),
  });

  const [updatePortfolio, { loading: updatingPortfolio }] = useMutation(UPDATE_PORTFOLIO, {
    onCompleted: () => refetch(),
  });

  const [publishPortfolio, { loading: publishing }] = useMutation(PUBLISH_PORTFOLIO, {
    onCompleted: (data) => {
      refetch();
      // If just published, redirect to live portfolio
      if (data?.publishPortfolio?.isPublished && portfolio?.user?.username) {
        const portfolioUrl = `${window.location.origin}/${portfolio.user.username}?p=${data.publishPortfolio.id}`;
        window.open(portfolioUrl, '_blank', 'noopener,noreferrer');
      }
    },
  });

  // Close theme selector when clicking outside
  useEffect(() => {
    if (!showThemeSelector) return;

    const handleClickOutside = (event: MouseEvent) => {
      const target = event.target as HTMLElement;
      if (!target.closest('.theme-selector-popup') && !target.closest('.theme-button')) {
        setShowThemeSelector(false);
        setSelectedCategory(null);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, [showThemeSelector]);

  if (portfolioLoading) {
    return <LoadingScreen message="Loading editor..." />;
  }

  const portfolio = portfolioData?.getPortfolio;
  const sections = portfolio?.sections || [];
  const sortedSections = [...sections].sort((a, b) => a.order - b.order);
  const sectionTypes = sectionTypesData?.sectionTypes || [];
  const themes = themesData?.themes || [];
  const currentTheme = portfolio?.theme || themes[0];

  // Display sections in pending order if available
  const displaySections = hasUnsavedOrder 
    ? pendingOrder.map(id => sortedSections.find(s => s.id === id)!).filter(Boolean)
    : sortedSections;

  const handleAddSection = async (sectionTypeId: string) => {
    const sectionType = sectionTypes.find((st: any) => st.id === sectionTypeId);
    if (!sectionType) return;

    // Default content based on section type
    const defaultContent = getDefaultContent(sectionType.name);

    setLoadingNewSection(true);
    await addSection({
      variables: {
        input: {
          portfolioId,
          sectionTypeId,
          content: defaultContent,
          layout: sectionType.layoutVariants?.[0] || 'default',
        },
      },
    });
  };

  const handleUpdateSection = async () => {
    if (!selectedSectionId || !editingContent) return;

    await updateSection({
      variables: {
        input: {
          id: selectedSectionId,
          content: editingContent,
        },
      },
    });
  };

  const handleDeleteSection = async () => {
    if (!deletingSectionId) return;
    await deleteSection({ variables: { id: deletingSectionId } });
  };

  const handleMoveSection = (sectionId: string, direction: 'up' | 'down') => {
    const currentOrder = hasUnsavedOrder ? pendingOrder : sortedSections.map(s => s.id);
    const currentIndex = currentOrder.findIndex((id) => id === sectionId);
    if (currentIndex === -1) return;
    if (direction === 'up' && currentIndex === 0) return;
    if (direction === 'down' && currentIndex === currentOrder.length - 1) return;

    const newIndex = direction === 'up' ? currentIndex - 1 : currentIndex + 1;
    const newOrder = [...currentOrder];
    const [movedId] = newOrder.splice(currentIndex, 1);
    newOrder.splice(newIndex, 0, movedId);

    setPendingOrder(newOrder);
    setHasUnsavedOrder(true);
  };

  const handleSaveOrder = async () => {
    await reorderSections({
      variables: { 
        input: {
          portfolioId, 
          sectionIds: pendingOrder 
        }
      },
    });
    setHasUnsavedOrder(false);
    setPendingOrder([]);
  };

  const handleCancelOrder = () => {
    setPendingOrder([]);
    setHasUnsavedOrder(false);
  };

  const handleChangeTheme = async (themeId: string) => {
    setChangingTheme(true);
    try {
      await updatePortfolio({
        variables: { id: portfolioId, themeId },
      });
      setShowThemeSelector(false);
      setSelectedCategory(null);
    } finally {
      setChangingTheme(false);
    }
  };

  const handlePublish = async () => {
    await publishPortfolio({
      variables: { portfolioId, publish: !portfolio.isPublished },
    });
  };

  const getDefaultContent = (sectionTypeName: string) => {
    const user = portfolio?.user;
    switch (sectionTypeName) {
      case 'hero-minimal':
        return {
          name: user?.name || 'Your Name',
          tagline: 'Your Professional Tagline',
          photoUrl: '',
          cta: {
            primary: { text: 'View My Work', link: '#portfolio' },
            secondary: { text: 'Contact Me', link: '#contact' },
          },
        };
      case 'about-text':
        return {
          title: 'About Me',
          bio: 'Write your professional story here...',
          highlights: ['Key achievement 1', 'Key achievement 2', 'Key achievement 3'],
        };
      case 'skills-cards':
        return {
          title: 'My Skills',
          skills: [],
        };
      case 'portfolio-grid':
        return {
          title: 'My Projects',
          items: [
            {
              title: 'Project 1',
              description: 'Project description...',
              imageUrl: '',
              tags: ['tag1', 'tag2'],
              link: '',
            },
          ],
        };
      case 'contact-form':
        return {
          title: 'Get In Touch',
          subtitle: "Let's work together",
          email: user?.email || 'your@email.com',
          phone: '',
          showForm: true,
        };
      case 'experience-timeline':
        return {
          title: 'Experience',
          items: [
            {
              title: 'Position Title',
              organization: 'Company Name',
              period: '2020 - Present',
              location: 'Location',
              type: 'work',
              description: 'Description of your role...',
              achievements: ['Achievement 1', 'Achievement 2'],
            },
          ],
        };
      default:
        return {};
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Top Bar */}
      <div className="bg-white border-b sticky top-0 z-50">
        {/* Published/Unpublished Notice */}
        {portfolio?.isPublished ? (
          <div className="bg-green-50 border-b border-green-200 px-4 py-2">
            <div className="max-w-7xl mx-auto flex items-center justify-between">
              <div className="flex items-center gap-2 text-sm">
                <span className="text-green-600">✓</span>
                <span className="text-green-800 font-medium">
                  Portfolio is live
                </span>
                <span className="text-green-600">•</span>
                <button
                  onClick={() => {
                    const portfolioUrl = `${window.location.origin}/${portfolio.user.username}?p=${portfolio.id}`;
                    navigator.clipboard.writeText(portfolioUrl);
                    // You could add a toast notification here
                  }}
                  className="text-green-700 hover:text-green-900 font-medium"
                >
                  📋 Copy Link
                </button>
                <span className="text-green-600">•</span>
                <button
                  onClick={() => {
                    const portfolioUrl = `${window.location.origin}/${portfolio.user.username}?p=${portfolio.id}`;
                    window.open(portfolioUrl, '_blank', 'noopener,noreferrer');
                  }}
                  className="text-green-700 hover:text-green-900 font-medium"
                >
                  🌐 View Live
                </button>
              </div>
            </div>
          </div>
        ) : (
          <div className="bg-yellow-50 border-b border-yellow-200 px-4 py-2">
            <div className="max-w-7xl mx-auto flex items-center justify-between">
              <div className="flex items-center gap-2 text-sm">
                <span className="text-yellow-600">⚠️</span>
                <span className="text-yellow-800 font-medium">
                  This portfolio is not published yet
                </span>
                <span className="text-yellow-600">•</span>
                <span className="text-yellow-700">
                  Click "Publish" to make it live
                </span>
              </div>
            </div>
          </div>
        )}
        
        <div className="max-w-7xl mx-auto px-4 py-4 flex items-center justify-between">
          <div className="flex items-center gap-4">
            <button
              onClick={() => router.push('/dashboard')}
              className="text-gray-600 hover:text-gray-900"
            >
              ← Back
            </button>
            <div>
              <h1 className="text-xl font-bold">{portfolio?.name}</h1>
              <p className="text-sm text-gray-500">{sections.length} sections</p>
            </div>
          </div>
          <div className="flex items-center gap-3">
            <button
              onClick={() => setShowThemeSelector(!showThemeSelector)}
              disabled={changingTheme || addingSection || deletingSection || updatingSection}
              className="theme-button px-4 py-2 bg-white border rounded-lg hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {changingTheme ? (
                <span className="flex items-center gap-2">
                  <div className="inline-block animate-spin rounded-full h-4 w-4 border-b-2 border-indigo-600"></div>
                  Theme
                </span>
              ) : (
                <span>🎨 Theme</span>
              )}
            </button>
            <button
              onClick={() => router.push(`/preview?portfolio=${portfolioId}`)}
              className="px-4 py-2 bg-white border rounded-lg hover:bg-gray-50"
            >
              👁️ Preview
            </button>
            <button
              onClick={handlePublish}
              disabled={publishing || updatingSection || addingSection || deletingSection}
              className={`px-4 py-2 rounded-lg font-semibold disabled:opacity-70 disabled:cursor-not-allowed ${
                portfolio?.isPublished
                  ? 'bg-green-600 text-white hover:bg-green-700'
                  : 'bg-indigo-600 text-white hover:bg-indigo-700'
              }`}
            >
              {publishing ? (
                <span className="flex items-center gap-2">
                  <div className="inline-block animate-spin rounded-full h-4 w-4 border-b-2 border-white"></div>
                  Processing...
                </span>
              ) : portfolio?.isPublished ? '✓ Published' : 'Publish'}
            </button>
          </div>
        </div>

        {/* Theme Selector Dropdown */}
        {showThemeSelector && (
          <div className="theme-selector-popup absolute right-4 top-16 bg-white border rounded-lg shadow-xl p-4 w-96 z-50">
            {/* Loading Overlay */}
            {changingTheme && (
              <div className="absolute inset-0 bg-white/80 rounded-lg flex items-center justify-center z-10">
                <div className="flex flex-col items-center gap-2">
                  <div className="inline-block animate-spin rounded-full h-8 w-8 border-b-2 border-indigo-600"></div>
                  <span className="text-sm text-gray-600 font-medium">Changing theme...</span>
                </div>
              </div>
            )}
            
            <div className="flex items-center justify-between mb-4">
              <h3 className="font-bold text-lg">Choose Theme</h3>
              <button
                onClick={() => {
                  setShowThemeSelector(false);
                  setSelectedCategory(null);
                }}
                disabled={changingTheme}
                className="text-gray-400 hover:text-gray-600 disabled:opacity-50"
              >
                ✕
              </button>
            </div>

            {/* Category Selection */}
            {!selectedCategory && (
              <div className="space-y-3">
                <p className="text-sm text-gray-600 mb-4">Select a theme category:</p>
                <button
                  onClick={() => setSelectedCategory('light')}
                  disabled={changingTheme}
                  className="w-full p-4 rounded-lg border-2 border-gray-200 hover:border-indigo-300 hover:bg-indigo-50 transition-all text-left group disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      <span className="text-3xl">☀️</span>
                      <div>
                        <div className="font-semibold text-gray-900 group-hover:text-indigo-600">
                          Light Themes
                        </div>
                        <div className="text-sm text-gray-500">
                          {themes.filter((t: any) => t.category === 'light').length} themes available
                        </div>
                      </div>
                    </div>
                    <span className="text-gray-400 group-hover:text-indigo-600">→</span>
                  </div>
                </button>

                <button
                  onClick={() => setSelectedCategory('dark')}
                  disabled={changingTheme}
                  className="w-full p-4 rounded-lg border-2 border-gray-200 hover:border-indigo-300 hover:bg-indigo-50 transition-all text-left group disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      <span className="text-3xl">🌙</span>
                      <div>
                        <div className="font-semibold text-gray-900 group-hover:text-indigo-600">
                          Dark Themes
                        </div>
                        <div className="text-sm text-gray-500">
                          {themes.filter((t: any) => t.category === 'dark').length} themes available
                        </div>
                      </div>
                    </div>
                    <span className="text-gray-400 group-hover:text-indigo-600">→</span>
                  </div>
                </button>
              </div>
            )}

            {/* Theme List */}
            {selectedCategory && (
              <div className="space-y-3">
                <button
                  onClick={() => setSelectedCategory(null)}
                  className="flex items-center gap-2 text-sm text-gray-600 hover:text-gray-900 mb-3"
                >
                  ← Back to categories
                </button>

                <div className="flex items-center gap-2 mb-3 px-2">
                  <span className="text-2xl">{selectedCategory === 'light' ? '☀️' : '🌙'}</span>
                  <h4 className="font-semibold text-gray-700">
                    {selectedCategory === 'light' ? 'Light' : 'Dark'} Themes
                  </h4>
                </div>

                <div className="space-y-2 max-h-96 overflow-y-auto">
                  {themes
                    .filter((theme: any) => theme.category === selectedCategory)
                    .map((theme: any) => (
                      <button
                        key={theme.id}
                        onClick={() => handleChangeTheme(theme.id)}
                        disabled={changingTheme || updatingSection || addingSection || deletingSection}
                        className={`w-full p-3 rounded-lg border-2 text-left transition-all disabled:opacity-50 disabled:cursor-not-allowed ${
                          currentTheme?.id === theme.id
                            ? 'border-indigo-600 bg-indigo-50 shadow-md'
                            : 'border-gray-200 hover:border-indigo-300 hover:shadow-sm'
                        }`}
                      >
                        <div className="flex items-start justify-between">
                          <div className="flex-1">
                            <div className="font-semibold flex items-center gap-2">
                              {theme.name}
                              {theme.isPremium && (
                                <span className="text-xs bg-yellow-100 text-yellow-700 px-2 py-0.5 rounded-full">
                                  ⭐ Premium
                                </span>
                              )}
                            </div>
                            <div className="text-xs text-gray-600 mt-1">{theme.description}</div>
                          </div>
                          {currentTheme?.id === theme.id && (
                            <span className="text-indigo-600 text-xl">✓</span>
                          )}
                        </div>
                        <div className="flex gap-2 mt-2">
                          <div
                            className="w-8 h-8 rounded shadow-sm border border-gray-200"
                            style={{ backgroundColor: theme.colors.primary }}
                            title="Primary"
                          />
                          <div
                            className="w-8 h-8 rounded shadow-sm border border-gray-200"
                            style={{ backgroundColor: theme.colors.secondary }}
                            title="Secondary"
                          />
                          <div
                            className="w-8 h-8 rounded shadow-sm border border-gray-200"
                            style={{ backgroundColor: theme.colors.accent }}
                            title="Accent"
                          />
                        </div>
                      </button>
                    ))}
                </div>
              </div>
            )}
          </div>
        )}
      </div>

      <div className="max-w-7xl mx-auto px-4 py-8">
        <div className="grid lg:grid-cols-3 gap-8">
          {/* Sections List */}
          <div className="lg:col-span-1">
            <div className="bg-white rounded-xl shadow p-6 sticky top-24">
              {/* Resume Upload Section */}
              <div className="mb-6 pb-6 border-b">
                <div className="flex items-center justify-between mb-3">
                  <h2 className="text-lg font-bold">Resume</h2>
                  <button
                    onClick={() => setShowResumeUpload(!showResumeUpload)}
                    className="text-sm text-indigo-600 hover:text-indigo-700 font-medium"
                  >
                    {showResumeUpload ? 'Hide' : 'Manage'}
                  </button>
                </div>
                
                {showResumeUpload && (
                  <ResumeUpload
                    portfolioId={portfolioId!}
                    currentResumeUrl={portfolio?.resumeUrl}
                    onSuccess={() => {
                      refetch();
                      setShowResumeUpload(false);
                    }}
                  />
                )}
                
                {!showResumeUpload && portfolio?.resumeUrl && (
                  <div className="flex items-center gap-2 text-sm text-green-600">
                    <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                    </svg>
                    <span>Resume uploaded</span>
                  </div>
                )}
                
                {!showResumeUpload && !portfolio?.resumeUrl && (
                  <p className="text-sm text-gray-500">No resume uploaded yet</p>
                )}
              </div>

              <div className="flex items-center justify-between mb-4">
                <h2 className="text-lg font-bold">Sections</h2>
                <button
                  onClick={() => setShowAddSection(!showAddSection)}
                  className="px-3 py-1 bg-indigo-600 text-white rounded-lg text-sm hover:bg-indigo-700"
                >
                  + Add
                </button>
              </div>

              {/* Add Section Panel */}
              {showAddSection && (
                <div className="mb-4 p-4 bg-gray-50 rounded-lg">
                  <h3 className="font-semibold mb-3 text-sm">Choose Section Type:</h3>
                  {addingSection ? (
                    <div className="flex items-center justify-center py-8">
                      <div className="inline-block animate-spin rounded-full h-8 w-8 border-b-2 border-indigo-600"></div>
                      <span className="ml-3 text-gray-600">Creating section...</span>
                    </div>
                  ) : (
                    <div className="space-y-2">
                      {sectionTypes.map((st: any) => (
                        <button
                          key={st.id}
                          onClick={() => handleAddSection(st.id)}
                          disabled={addingSection}
                          className="w-full p-2 text-left text-sm bg-white border rounded hover:border-indigo-600 hover:bg-indigo-50 transition disabled:opacity-50 disabled:cursor-not-allowed"
                        >
                          <div className="font-medium">{st.displayName}</div>
                          <div className="text-xs text-gray-500">{st.category}</div>
                        </button>
                      ))}
                    </div>
                  )}
                </div>
              )}

              {/* Sections List */}
              <div className="space-y-2">
                {displaySections.length === 0 ? (
                  <p className="text-gray-500 text-sm text-center py-8">
                    No sections yet. Click "+ Add" to start building!
                  </p>
                ) : (
                  displaySections.map((section: any, index: number) => (
                    <div
                      key={section.id}
                      className={`p-3 border rounded-lg ${
                        selectedSectionId === section.id
                          ? 'border-indigo-600 bg-indigo-50'
                          : 'border-gray-200 hover:border-gray-300'
                      }`}
                    >
                      <div className="flex items-center justify-between">
                        <div className="flex-1">
                          <div className="font-medium text-sm">{section.sectionType.displayName}</div>
                          <div className="text-xs text-gray-500">{section.layout}</div>
                        </div>
                        <div className="flex items-center gap-1">
                          <button
                            onClick={() => handleMoveSection(section.id, 'up')}
                            disabled={index === 0 || addingSection || updatingSection || deletingSection}
                            className="p-1 hover:bg-gray-200 rounded disabled:opacity-30 disabled:cursor-not-allowed"
                            title="Move up"
                          >
                            ↑
                          </button>
                          <button
                            onClick={() => handleMoveSection(section.id, 'down')}
                            disabled={index === displaySections.length - 1 || addingSection || updatingSection || deletingSection}
                            className="p-1 hover:bg-gray-200 rounded disabled:opacity-30 disabled:cursor-not-allowed"
                            title="Move down"
                          >
                            ↓
                          </button>
                          <button
                            onClick={() => {
                              setSelectedSectionId(section.id);
                              setEditingContent(section.content);
                            }}
                            disabled={addingSection || updatingSection || deletingSection}
                            className="p-1 hover:bg-gray-200 rounded disabled:opacity-50 disabled:cursor-not-allowed"
                            title="Edit content"
                          >
                            ✏️
                          </button>
                          <button
                            onClick={() => setDeletingSectionId(section.id)}
                            disabled={addingSection || updatingSection || deletingSection}
                            className="p-1 hover:bg-red-100 rounded text-red-600 disabled:opacity-50 disabled:cursor-not-allowed"
                            title="Delete section"
                          >
                            🗑️
                          </button>
                        </div>
                      </div>
                    </div>
                  ))
                )}
              </div>

              {/* Save Order Button */}
              <div className="mt-4 pt-4 border-t text-right">
                <button
                  onClick={handleSaveOrder}
                  disabled={!hasUnsavedOrder || reorderingSection}
                  className={`w-32 px-3 py-1 rounded-lg text-sm font-medium transition ${
                    hasUnsavedOrder
                      ? 'bg-indigo-600 text-white hover:bg-indigo-700'
                      : 'bg-gray-300 text-gray-500 cursor-not-allowed'
                  } disabled:opacity-50`}
                >
                  {reorderingSection ? (
                    <span className="flex items-center justify-center gap-2">
                      <div className="inline-block animate-spin rounded-full h-3 w-3 border-b-2 border-white"></div>
                      Saving...
                    </span>
                  ) : (
                    'Save Changes'
                  )}
                </button>
              </div>
            </div>
          </div>

          {/* Preview */}
          <div className="lg:col-span-2">
            <div className="bg-white rounded-xl shadow overflow-hidden">
              <div className="bg-gray-800 text-white px-6 py-3 flex items-center justify-between">
                <span className="font-semibold">Live Preview</span>
                <span className="text-sm text-gray-400">
                  {currentTheme?.name || 'Default Theme'}
                </span>
              </div>
              <div className="max-h-[calc(100vh-200px)] overflow-y-auto">
                {currentTheme && (
                  <ThemeProvider initialTheme={currentTheme}>
                    {displaySections.map((section: any) => {
                      const SectionComponent = getSectionComponent(section.sectionType.name);
                      if (!SectionComponent) return null;

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
                    {displaySections.length === 0 && (
                      <div className="p-12 text-center text-gray-400">
                        <p className="text-lg">No sections yet</p>
                        <p className="text-sm">Add your first section to get started!</p>
                      </div>
                    )}
                  </ThemeProvider>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Content Editor Modal */}
      {(selectedSectionId && editingContent) || loadingNewSection ? (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
          {loadingNewSection ? (
            <div className="bg-white rounded-xl shadow-2xl p-8 flex flex-col items-center gap-4">
              <div className="inline-block animate-spin rounded-full h-12 w-12 border-b-2 border-indigo-600"></div>
              <span className="text-lg font-medium text-gray-700">Loading section editor...</span>
            </div>
          ) : (
            <SectionContentEditor
              sectionType={
                sortedSections.find((s: any) => s.id === selectedSectionId)?.sectionType.name || ''
              }
              content={editingContent}
              templateCategory={portfolio?.template?.category}
              onSave={async (newContent) => {
                setEditingContent(newContent);
                await updateSection({
                  variables: {
                    input: {
                      id: selectedSectionId,
                      content: newContent,
                    },
                  },
                });
              }}
              onCancel={() => {
                setSelectedSectionId(null);
                setEditingContent(null);
              }}
            />
          )}
        </div>
      ) : null}

      {/* Delete Confirmation Modal */}
      {deletingSectionId && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-xl max-w-md w-full shadow-2xl">
            <div className="p-6">
              <div className="flex items-center gap-4 mb-4">
                <div className="w-12 h-12 rounded-full bg-red-100 flex items-center justify-center flex-shrink-0">
                  <svg
                    className="w-6 h-6 text-red-600"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z"
                    />
                  </svg>
                </div>
                <div>
                  <h3 className="text-lg font-semibold text-gray-900">Delete Section</h3>
                  <p className="text-sm text-gray-500 mt-1">
                    {sortedSections.find((s: any) => s.id === deletingSectionId)?.sectionType
                      .displayName || 'This section'}
                  </p>
                </div>
              </div>
              <p className="text-gray-600 mb-6">
                Are you sure you want to delete this section? This action cannot be undone and all
                content will be permanently removed.
              </p>
              <div className="flex gap-3">
                <button
                  onClick={() => setDeletingSectionId(null)}
                  disabled={deletingSection}
                  className="flex-1 px-4 py-2.5 border border-gray-300 rounded-lg hover:bg-gray-50 font-medium transition disabled:opacity-50"
                >
                  Cancel
                </button>
                <button
                  onClick={handleDeleteSection}
                  disabled={deletingSection}
                  className="flex-1 px-4 py-2.5 bg-red-600 text-white rounded-lg hover:bg-red-700 font-medium transition disabled:opacity-50 flex items-center justify-center gap-2"
                >
                  {deletingSection ? (
                    <>
                      <svg
                        className="animate-spin h-4 w-4"
                        fill="none"
                        viewBox="0 0 24 24"
                      >
                        <circle
                          className="opacity-25"
                          cx="12"
                          cy="12"
                          r="10"
                          stroke="currentColor"
                          strokeWidth="4"
                        ></circle>
                        <path
                          className="opacity-75"
                          fill="currentColor"
                          d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                        ></path>
                      </svg>
                      Deleting...
                    </>
                  ) : (
                    'Delete Section'
                  )}
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default function NewEditorPage() {
  return (
    <ProtectedRoute>
      <SectionEditorContent />
    </ProtectedRoute>
  );
}
