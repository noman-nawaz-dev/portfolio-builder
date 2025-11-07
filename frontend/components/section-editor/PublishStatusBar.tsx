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
      <Box className="bg-green-50 border-b border-green-200 px-4 py-2">
        <Flex justify="between" align="center" className="max-w-7xl mx-auto flex-wrap gap-2">
          <Flex align="center" gap="sm" className="text-xs sm:text-sm flex-wrap">
            <Text className="text-green-600 font-bold">✓</Text>
            <Text weight="medium" className="text-green-800">
              Portfolio is live
            </Text>
            <Text className="text-green-600 hidden sm:inline">•</Text>
            <button
              onClick={handleCopyLink}
              className="text-green-700 hover:text-green-900 font-medium whitespace-nowrap transition-colors"
            >
              📋 Copy Link
            </button>
            <Text className="text-green-600 hidden sm:inline">•</Text>
            <button
              onClick={handleViewLive}
              className="text-green-700 hover:text-green-900 font-medium whitespace-nowrap transition-colors"
            >
              🌐 View Live
            </button>
          </Flex>
        </Flex>
      </Box>
    );
  }

  return (
    <Box className="bg-yellow-50 border-b border-yellow-200 px-4 py-2">
      <Flex justify="between" align="center" className="max-w-7xl mx-auto flex-wrap gap-2">
        <Flex align="center" gap="sm" className="text-xs sm:text-sm flex-wrap">
          <Text className="text-yellow-600">⚠️</Text>
          <Text weight="medium" className="text-yellow-800">
            This portfolio is not published yet
          </Text>
          <Text className="text-yellow-600 hidden sm:inline">•</Text>
          <Text className="text-yellow-700">
            Click "Publish" to make it live
          </Text>
        </Flex>
      </Flex>
    </Box>
  );
}
