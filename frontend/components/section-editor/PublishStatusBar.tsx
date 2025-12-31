import { Box, Flex, Text } from '@/components/ui';

interface PublishStatusBarProps {
  isPublished: boolean;
  username: string;
  portfolioId: string;
}

export function PublishStatusBar({ isPublished, username, portfolioId }: PublishStatusBarProps) {
  const portfolioUrl = `${typeof window !== 'undefined' ? window.location.origin : ''}/${username}?p=${portfolioId}`;

  const handleCopyLink = () => {
    navigator.clipboard.writeText(portfolioUrl);
  };

  const handleViewLive = () => {
    window.open(portfolioUrl, '_blank', 'noopener,noreferrer');
  };

  if (isPublished) {
    return (
      <Box className="bg-emerald-50 border-b border-emerald-200 px-4 py-2">
        <Flex justify="between" align="center" className="max-w-7xl mx-auto flex-wrap gap-2">
          <Flex align="center" gap="sm" className="text-xs sm:text-sm flex-wrap">
            <Text className="text-emerald-600 font-bold">✓</Text>
            <Text weight="medium" className="text-emerald-800">
              Portfolio is live
            </Text>
            <Text className="text-emerald-600 hidden sm:inline">•</Text>
            <button
              onClick={handleCopyLink}
              className="text-emerald-700 hover:text-emerald-900 font-medium whitespace-nowrap transition-colors"
            >
              📋 Copy Link
            </button>
            <Text className="text-emerald-600 hidden sm:inline">•</Text>
            <button
              onClick={handleViewLive}
              className="text-emerald-700 hover:text-emerald-900 font-medium whitespace-nowrap transition-colors"
            >
              🌐 View Live
            </button>
          </Flex>
        </Flex>
      </Box>
    );
  }

  return (
    <Box className="bg-amber-50 border-b border-amber-200 px-4 py-2">
      <Flex justify="between" align="center" className="max-w-7xl mx-auto flex-wrap gap-2">
        <Flex align="center" gap="sm" className="text-xs sm:text-sm flex-wrap">
          <Text className="text-amber-600">⚠️</Text>
          <Text weight="medium" className="text-amber-800">
            This portfolio is not published yet
          </Text>
          <Text className="text-amber-600 hidden sm:inline">•</Text>
          <Text className="text-amber-700">
            Click "Publish" to make it live
          </Text>
        </Flex>
      </Flex>
    </Box>
  );
}
