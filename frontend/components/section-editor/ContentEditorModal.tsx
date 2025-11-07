import { Box, Stack, Text } from '@/components/ui';
import SectionContentEditor from '@/components/SectionContentEditor';

interface ContentEditorModalProps {
  sectionId: string | null;
  sectionType: string;
  content: any;
  templateCategory?: string;
  loadingNewSection: boolean;
  onSave: (content: any) => void;
  onCancel: () => void;
}

export function ContentEditorModal({
  sectionId,
  sectionType,
  content,
  templateCategory,
  loadingNewSection,
  onSave,
  onCancel,
}: ContentEditorModalProps) {
  if (loadingNewSection) {
    return (
      <Box className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
        <Card className="bg-white rounded-xl shadow-2xl p-8">
          <Stack spacing="md" align="center">
            <div className="inline-block animate-spin rounded-full h-12 w-12 border-b-2 border-indigo-600"></div>
            <Text size="lg" weight="medium" className="text-gray-700">
              Loading section editor...
            </Text>
          </Stack>
        </Card>
      </Box>
    );
  }

  if (!sectionId || !content) {
    return null;
  }

  return (
    <Box className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
      <SectionContentEditor
        sectionType={sectionType}
        content={content}
        templateCategory={templateCategory}
        onSave={onSave}
        onCancel={onCancel}
      />
    </Box>
  );
}

import { Card } from '@/components/ui';
