'use client';

import { useState, useEffect } from 'react';
import { useQuery, useMutation } from '@apollo/client';
import { useRouter, useSearchParams } from 'next/navigation';
import { ProtectedRoute } from '@/lib/ProtectedRoute';
import { LoadingScreen, Box } from '@/components/ui';
import {
  PublishStatusBar,
  EditorTopBar,
  ThemeSelector,
  SectionsSidebar,
  PreviewPanel,
  ContentEditorModal,
  DeleteConfirmationModal,
} from '@/components/section-editor';
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

function SectionEditorContent() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const portfolioId = searchParams.get('portfolio');

  const [selectedSectionId, setSelectedSectionId] = useState<string | null>(null);
  const [showAddSection, setShowAddSection] = useState(false);
  const [showThemeSelector, setShowThemeSelector] = useState(false);
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
    onCompleted: () => {
      refetch();
      setHasUnsavedOrder(false);
      setPendingOrder([]);
    },
  });

  const [updatePortfolio] = useMutation(UPDATE_PORTFOLIO, {
    onCompleted: () => refetch(),
  });

  const [publishPortfolio, { loading: publishing }] = useMutation(PUBLISH_PORTFOLIO, {
    onCompleted: (data) => {
      refetch();
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

  const displaySections = hasUnsavedOrder 
    ? pendingOrder.map(id => sortedSections.find(s => s.id === id)!).filter(Boolean)
    : sortedSections;

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
      case 'education-timeline':
        return {
          title: 'Education',
          items: [
            {
              degree: 'Bachelor of Science',
              field: 'Computer Science',
              institution: 'University Name',
              startDate: '2018',
              endDate: '2022',
              location: 'City, State',
              grade: '3.8 GPA',
              description: 'Brief description of your studies...',
              achievements: ['Dean\'s List', 'Scholarship'],
              current: false,
            },
          ],
        };
      default:
        return {};
    }
  };

  const handleAddSection = async (sectionTypeId: string) => {
    const sectionType = sectionTypes.find((st: any) => st.id === sectionTypeId);
    if (!sectionType) return;

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

  const handleUpdateSection = async (newContent: any) => {
    if (!selectedSectionId) return;

    setEditingContent(newContent);
    await updateSection({
      variables: {
        input: {
          id: selectedSectionId,
          content: newContent,
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
  };

  const handleChangeTheme = async (themeId: string) => {
    setChangingTheme(true);
    try {
      await updatePortfolio({
        variables: { id: portfolioId, themeId },
      });
      setShowThemeSelector(false);
    } finally {
      setChangingTheme(false);
    }
  };

  const handlePublish = async () => {
    await publishPortfolio({
      variables: { portfolioId, publish: !portfolio.isPublished },
    });
  };

  return (
    <Box className="min-h-screen bg-gray-50">
      <Box className="bg-white border-b sticky top-0 z-50">
        <PublishStatusBar
          isPublished={portfolio?.isPublished}
          username={portfolio?.user?.username}
          portfolioId={portfolioId!}
        />
        
        <EditorTopBar
          portfolioName={portfolio?.name}
          sectionsCount={sections.length}
          isPublished={portfolio?.isPublished}
          changingTheme={changingTheme}
          publishing={publishing}
          addingSection={addingSection}
          deletingSection={deletingSection}
          updatingSection={updatingSection}
          onBack={() => router.push('/dashboard')}
          onThemeClick={() => setShowThemeSelector(!showThemeSelector)}
          onPreviewClick={() => router.push(`/preview?portfolio=${portfolioId}`)}
          onPublishClick={handlePublish}
        />

        {showThemeSelector && (
          <ThemeSelector
            themes={themes}
            currentThemeId={currentTheme?.id}
            changingTheme={changingTheme}
            onThemeSelect={handleChangeTheme}
            onClose={() => setShowThemeSelector(false)}
          />
        )}
      </Box>

      <Box className="max-w-7xl mx-auto px-4 py-6 sm:py-8 md:py-10 lg:py-12">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 lg:gap-8 md:gap-10">
          <Box className="lg:col-span-1">
            <SectionsSidebar
              portfolioId={portfolioId!}
              currentResumeUrl={portfolio?.resumeUrl}
              sections={displaySections}
              sectionTypes={sectionTypes}
              showAddSection={showAddSection}
              showResumeUpload={showResumeUpload}
              addingSection={addingSection}
              updatingSection={updatingSection}
              deletingSection={deletingSection}
              reorderingSection={reorderingSection}
              hasUnsavedOrder={hasUnsavedOrder}
              selectedSectionId={selectedSectionId}
              onToggleAddSection={() => setShowAddSection(!showAddSection)}
              onToggleResumeUpload={() => setShowResumeUpload(!showResumeUpload)}
              onAddSection={handleAddSection}
              onEditSection={(section) => {
                setSelectedSectionId(section.id);
                setEditingContent(section.content);
              }}
              onDeleteSection={(sectionId) => setDeletingSectionId(sectionId)}
              onMoveSection={handleMoveSection}
              onSaveOrder={handleSaveOrder}
              onResumeSuccess={() => {
                refetch();
                setShowResumeUpload(false);
              }}
            />
          </Box>

          <Box className="lg:col-span-2">
            <PreviewPanel sections={displaySections} theme={currentTheme} />
          </Box>
        </div>
      </Box>

      <ContentEditorModal
        sectionId={selectedSectionId}
        sectionType={
          sortedSections.find((s: any) => s.id === selectedSectionId)?.sectionType.name || ''
        }
        content={editingContent}
        templateCategory={portfolio?.template?.category}
        loadingNewSection={loadingNewSection}
        onSave={handleUpdateSection}
        onCancel={() => {
          setSelectedSectionId(null);
          setEditingContent(null);
        }}
      />

      {deletingSectionId && (
        <DeleteConfirmationModal
          sectionName={
            sortedSections.find((s: any) => s.id === deletingSectionId)?.sectionType.displayName || 
            'This section'
          }
          deleting={deletingSection}
          onConfirm={handleDeleteSection}
          onCancel={() => setDeletingSectionId(null)}
        />
      )}
    </Box>
  );
}

export default function NewEditorPage() {
  return (
    <ProtectedRoute>
      <SectionEditorContent />
    </ProtectedRoute>
  );
}
