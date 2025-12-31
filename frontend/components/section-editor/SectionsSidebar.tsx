import { Button, Card, Flex, Heading, Stack, Text } from '@/components/ui';
import { ResumeSection } from './ResumeSection';
import { AddSectionPanel } from './AddSectionPanel';
import { SectionListItem } from './SectionListItem';

interface SectionType {
  id: string;
  name: string;
  displayName: string;
  category: string;
}

interface PortfolioSection {
  id: string;
  order: number;
  layout: string;
  content: any;
  sectionType: {
    displayName: string;
    name: string;
  };
}

interface SectionsSidebarProps {
  portfolioId: string;
  currentResumeUrl?: string;
  sections: PortfolioSection[];
  sectionTypes: SectionType[];
  showAddSection: boolean;
  showResumeUpload: boolean;
  addingSection: boolean;
  updatingSection: boolean;
  deletingSection: boolean;
  reorderingSection: boolean;
  hasUnsavedOrder: boolean;
  selectedSectionId: string | null;
  onToggleAddSection: () => void;
  onToggleResumeUpload: () => void;
  onAddSection: (sectionTypeId: string) => void;
  onEditSection: (section: PortfolioSection) => void;
  onDeleteSection: (sectionId: string) => void;
  onMoveSection: (sectionId: string, direction: 'up' | 'down') => void;
  onSaveOrder: () => void;
  onResumeSuccess: () => void;
}

export function SectionsSidebar({
  portfolioId,
  currentResumeUrl,
  sections,
  sectionTypes,
  showAddSection,
  showResumeUpload,
  addingSection,
  updatingSection,
  deletingSection,
  reorderingSection,
  hasUnsavedOrder,
  selectedSectionId,
  onToggleAddSection,
  onToggleResumeUpload,
  onAddSection,
  onEditSection,
  onDeleteSection,
  onMoveSection,
  onSaveOrder,
  onResumeSuccess,
}: SectionsSidebarProps) {
  const isDisabled = addingSection || updatingSection || deletingSection;

  return (
    <Card className="sticky top-24 p-4 sm:p-6">
      {/* Resume Section */}
      <ResumeSection
        portfolioId={portfolioId}
        currentResumeUrl={currentResumeUrl}
        showResumeUpload={showResumeUpload}
        onToggleResumeUpload={onToggleResumeUpload}
        onSuccess={onResumeSuccess}
      />

      {/* Sections Header */}
      <Flex justify="between" align="center" className="mb-4 mt-6">
        <Heading as="h2" size="lg" className="text-base sm:text-lg">
          Sections
        </Heading>
        <Button
          onClick={onToggleAddSection}
          variant="primary"
          size="sm"
          className="text-xs sm:text-sm"
        >
          {showAddSection ? '✕ Close' : '+ Add'}
        </Button>
      </Flex>

      {/* Add Section Panel */}
      {showAddSection && (
        <div className="mb-4 p-4 bg-neutral-50 rounded-lg">
          <AddSectionPanel
            sectionTypes={sectionTypes}
            addingSection={addingSection}
            onAddSection={onAddSection}
          />
        </div>
      )}

      {/* Sections List */}
      <Stack spacing="sm">
        {sections.length === 0 ? (
          <Stack spacing="md" align="center" className="py-8 text-center">
            <Text size="sm" className="text-neutral-500">
              No sections yet. Click "+ Add" to start building!
            </Text>
          </Stack>
        ) : (
          sections.map((section, index) => (
            <SectionListItem
              key={section.id}
              section={section}
              index={index}
              totalSections={sections.length}
              isSelected={selectedSectionId === section.id}
              disabled={isDisabled}
              onMoveUp={(id) => onMoveSection(id, 'up')}
              onMoveDown={(id) => onMoveSection(id, 'down')}
              onEdit={onEditSection}
              onDelete={onDeleteSection}
            />
          ))
        )}
      </Stack>

      {/* Save Order Button */}
      {sections.length > 0 && (
        <div className="mt-4 pt-4 border-t">
          <Button
            onClick={onSaveOrder}
            disabled={!hasUnsavedOrder || reorderingSection}
            variant={hasUnsavedOrder ? 'primary' : 'secondary'}
            size="sm"
            loading={reorderingSection}
            fullWidth
            className="text-sm"
          >
            {reorderingSection ? 'Saving...' : 'Save Changes'}
          </Button>
        </div>
      )}
    </Card>
  );
}
