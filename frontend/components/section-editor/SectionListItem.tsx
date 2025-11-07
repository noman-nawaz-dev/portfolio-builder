import { Flex, Stack, Text } from '@/components/ui';
import { ChevronUp, ChevronDown, Pencil, Trash2 } from 'lucide-react';

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

interface SectionListItemProps {
  section: PortfolioSection;
  index: number;
  totalSections: number;
  isSelected: boolean;
  disabled: boolean;
  onMoveUp: (sectionId: string) => void;
  onMoveDown: (sectionId: string) => void;
  onEdit: (section: PortfolioSection) => void;
  onDelete: (sectionId: string) => void;
}

export function SectionListItem({
  section,
  index,
  totalSections,
  isSelected,
  disabled,
  onMoveUp,
  onMoveDown,
  onEdit,
  onDelete,
}: SectionListItemProps) {
  return (
    <div
      className={`p-3 border rounded-lg transition-all ${
        isSelected
          ? 'border-indigo-600 bg-indigo-50 shadow-sm'
          : 'border-gray-200 hover:border-gray-300 hover:shadow-sm'
      }`}
    >
      <Flex justify="between" align="center" className="gap-2">
        <Stack spacing="xs" className="flex-1 min-w-0">
          <Text weight="medium" size="sm" className="truncate">
            {section.sectionType.displayName}
          </Text>
          <Text size="xs" className="text-gray-500">
            {section.layout}
          </Text>
        </Stack>
        
        <Flex align="center" gap="xs" className="flex-shrink-0">
          <button
            onClick={() => onMoveUp(section.id)}
            disabled={index === 0 || disabled}
            className="p-1.5 hover:bg-gray-200 rounded disabled:opacity-30 disabled:cursor-not-allowed transition-colors"
            title="Move up"
            aria-label="Move section up"
          >
            <ChevronUp className="w-4 h-4" />
          </button>
          
          <button
            onClick={() => onMoveDown(section.id)}
            disabled={index === totalSections - 1 || disabled}
            className="p-1.5 hover:bg-gray-200 rounded disabled:opacity-30 disabled:cursor-not-allowed transition-colors"
            title="Move down"
            aria-label="Move section down"
          >
            <ChevronDown className="w-4 h-4" />
          </button>
          
          <button
            onClick={() => onEdit(section)}
            disabled={disabled}
            className="p-1.5 hover:bg-indigo-100 rounded text-indigo-600 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
            title="Edit content"
            aria-label="Edit section content"
          >
            <Pencil className="w-4 h-4" />
          </button>
          
          <button
            onClick={() => onDelete(section.id)}
            disabled={disabled}
            className="p-1.5 hover:bg-red-100 rounded text-red-600 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
            title="Delete section"
            aria-label="Delete section"
          >
            <Trash2 className="w-4 h-4" />
          </button>
        </Flex>
      </Flex>
    </div>
  );
}
