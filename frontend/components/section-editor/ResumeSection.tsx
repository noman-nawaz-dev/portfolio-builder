import { Button, Flex, Heading, Stack, Text } from '@/components/ui';
import { ResumeUpload } from '@/components/ResumeUpload';

interface ResumeSectionProps {
  portfolioId: string;
  currentResumeUrl?: string;
  showResumeUpload: boolean;
  onToggleResumeUpload: () => void;
  onSuccess: () => void;
}

export function ResumeSection({
  portfolioId,
  currentResumeUrl,
  showResumeUpload,
  onToggleResumeUpload,
  onSuccess,
}: ResumeSectionProps) {
  return (
    <Stack spacing="md" className="pb-6 border-b">
      <Flex justify="between" align="center">
        <Heading as="h2" size="lg" className="text-base sm:text-lg">
          Resume
        </Heading>
        <Button
          onClick={onToggleResumeUpload}
          variant="ghost"
          size="sm"
          className="text-xs sm:text-sm text-indigo-600 hover:text-indigo-700 p-0"
        >
          {showResumeUpload ? 'Hide' : 'Manage'}
        </Button>
      </Flex>

      {showResumeUpload && (
        <ResumeUpload
          portfolioId={portfolioId}
          currentResumeUrl={currentResumeUrl}
          onSuccess={onSuccess}
        />
      )}

      {!showResumeUpload && currentResumeUrl && (
        <Flex align="center" gap="sm" className="text-sm text-green-600">
          <svg className="w-4 h-4 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
            <path
              fillRule="evenodd"
              d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
              clipRule="evenodd"
            />
          </svg>
          <Text size="sm">Resume uploaded</Text>
        </Flex>
      )}

      {!showResumeUpload && !currentResumeUrl && (
        <Text size="sm" className="text-gray-500 text-xs sm:text-sm">
          No resume uploaded yet
        </Text>
      )}
    </Stack>
  );
}
