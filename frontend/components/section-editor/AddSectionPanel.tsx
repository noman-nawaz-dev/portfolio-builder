import { Button, Stack, Text } from '@/components/ui';

interface SectionType {
  id: string;
  name: string;
  displayName: string;
  category: string;
}

interface AddSectionPanelProps {
  sectionTypes: SectionType[];
  addingSection: boolean;
  onAddSection: (sectionTypeId: string) => void;
}

export function AddSectionPanel({
  sectionTypes,
  addingSection,
  onAddSection,
}: AddSectionPanelProps) {
  if (addingSection) {
    return (
      <Stack spacing="md" align="center" className="py-8">
        <div className="inline-block animate-spin rounded-full h-8 w-8 border-b-2 border-indigo-600"></div>
        <Text className="text-neutral-600">Creating section...</Text>
      </Stack>
    );
  }

  return (
    <Stack spacing="sm">
      <Text size="sm" weight="semibold" className="mb-1">
        Choose Section Type:
      </Text>
      {sectionTypes.map((st) => (
        <button
          key={st.id}
          onClick={() => onAddSection(st.id)}
          disabled={addingSection}
          className="w-full p-3 sm:p-2 text-left text-sm bg-white border rounded-lg hover:border-indigo-600 hover:bg-teal-50 transition-all disabled:opacity-50 disabled:cursor-not-allowed"
        >
          <Text weight="medium" className="mb-1">
            {st.displayName}
          </Text>
          <Text size="xs" className="text-neutral-500">
            {st.category}
          </Text>
        </button>
      ))}
    </Stack>
  );
}
