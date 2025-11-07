import { Button, Flex, Heading, Stack, Text } from '@/components/ui';

interface DeleteConfirmationModalProps {
  sectionName: string;
  deleting: boolean;
  onConfirm: () => void;
  onCancel: () => void;
}

export function DeleteConfirmationModal({
  sectionName,
  deleting,
  onConfirm,
  onCancel,
}: DeleteConfirmationModalProps) {
  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-xl max-w-md w-full shadow-2xl">
        <div className="p-6">
          <Flex align="start" gap="md" className="mb-4">
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
            <Stack spacing="xs" className="flex-1">
              <Heading as="h3" size="lg" className="text-gray-900">
                Delete Section
              </Heading>
              <Text size="sm" className="text-gray-500">
                {sectionName}
              </Text>
            </Stack>
          </Flex>
          
          <Text className="text-gray-600 mb-6">
            Are you sure you want to delete this section? This action cannot be undone and all
            content will be permanently removed.
          </Text>
          
          <Flex gap="sm">
            <Button
              onClick={onCancel}
              disabled={deleting}
              variant="secondary"
              size="md"
              className="flex-1"
            >
              Cancel
            </Button>
            <Button
              onClick={onConfirm}
              disabled={deleting}
              loading={deleting}
              variant="primary"
              size="md"
              className="flex-1 bg-red-600 hover:bg-red-700"
            >
              {!deleting && 'Delete Section'}
            </Button>
          </Flex>
        </div>
      </div>
    </div>
  );
}
