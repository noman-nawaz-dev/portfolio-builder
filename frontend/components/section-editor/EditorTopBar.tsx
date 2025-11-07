import { Button, Flex, Heading, Stack, Text } from '@/components/ui';

interface EditorTopBarProps {
  portfolioName: string;
  sectionsCount: number;
  isPublished: boolean;
  changingTheme: boolean;
  publishing: boolean;
  addingSection: boolean;
  deletingSection: boolean;
  updatingSection: boolean;
  onBack: () => void;
  onThemeClick: () => void;
  onPreviewClick: () => void;
  onPublishClick: () => void;
}

export function EditorTopBar({
  portfolioName,
  sectionsCount,
  isPublished,
  changingTheme,
  publishing,
  addingSection,
  deletingSection,
  updatingSection,
  onBack,
  onThemeClick,
  onPreviewClick,
  onPublishClick,
}: EditorTopBarProps) {
  const isDisabled = changingTheme || addingSection || deletingSection || updatingSection;

  return (
    <Flex 
      justify="between" 
      align="start" 
      className="max-w-7xl mx-auto px-4 py-3 sm:py-4 gap-3 sm:gap-4"
    >
      <Flex align="center" gap="sm" className="flex-1 min-w-0">
        <Button
          onClick={onBack}
          variant="ghost"
          size="sm"
          className="text-gray-600 hover:text-gray-900 p-0 hover:bg-transparent text-sm sm:text-base flex-shrink-0"
        >
          ← Back
        </Button>
        <Stack spacing="none" className="min-w-0 hidden sm:block">
          <Heading as="h1" size="xl" className="text-base sm:text-xl truncate">
            {portfolioName}
          </Heading>
          <Text size="sm" className="text-xs sm:text-sm text-gray-500">
            {sectionsCount} {sectionsCount === 1 ? 'section' : 'sections'}
          </Text>
        </Stack>
      </Flex>
      <Flex align="center" gap="xs" className="flex-shrink-0">
        <Button
          onClick={onThemeClick}
          disabled={isDisabled}
          variant="secondary"
          size="sm"
          className="theme-button text-xs whitespace-nowrap px-2 py-1.5"
          loading={changingTheme}
        >
          {!changingTheme && '🎨'} <span className="hidden sm:inline">Theme</span>
        </Button>
        <Button
          onClick={onPreviewClick}
          variant="secondary"
          size="sm"
          className="text-xs whitespace-nowrap px-2 py-1.5"
        >
          👁️ <span className="hidden sm:inline">Preview</span>
        </Button>
        <Button
          onClick={onPublishClick}
          disabled={publishing || updatingSection || addingSection || deletingSection}
          variant="primary"
          size="sm"
          loading={publishing}
          className={`text-xs whitespace-nowrap px-2 py-1.5 ${
            isPublished
              ? 'bg-green-600 hover:bg-green-700'
              : 'bg-indigo-600 hover:bg-indigo-700'
          }`}
        >
          {!publishing && (isPublished ? '✓' : '')} <span className="hidden sm:inline">{isPublished ? 'Published' : 'Publish'}</span><span className="sm:hidden">{isPublished ? 'Live' : 'Publish'}</span>
        </Button>
      </Flex>
    </Flex>
  );
}
