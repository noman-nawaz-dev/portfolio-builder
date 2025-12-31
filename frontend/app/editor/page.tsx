'use client';

import { useQuery } from '@apollo/client';
import { useRouter, useSearchParams } from 'next/navigation';
import { ProtectedRoute } from '@/lib/ProtectedRoute';
import AuthLayout from '@/components/AuthLayout';
import { LoadingScreen, Card, Container, Stack, Heading, Text, Button, Flex } from '@/components/ui';
import {
  GET_PORTFOLIO,
} from '@/lib/graphql/operations';

// Force dynamic rendering
export const dynamic = 'force-dynamic';

type Tab = 'hero' | 'about' | 'skills' | 'projects' | 'contact';

function EditorContent() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const portfolioId = searchParams.get('portfolio');
  
  const { data, loading } = useQuery(GET_PORTFOLIO, {
    variables: { portfolioId },
    skip: !portfolioId,
  });

  if (loading) {
    return <LoadingScreen message="Loading portfolio..." />;
  }

  const portfolio = data?.getPortfolio;

  return (
    <Container maxWidth="4xl" padding="lg" className="px-4 py-8 sm:py-12 md:py-16 lg:py-20">
      <Card className="shadow-xl md:shadow-2xl">
        <Stack spacing="lg" align="center" className="p-4 sm:p-6 md:p-8 lg:p-10">
          <Heading as="h1" size="3xl" align="center" className="text-2xl sm:text-3xl md:text-4xl lg:text-4xl">
            Portfolio Editor
          </Heading>
          <Text size="lg" align="center" className="text-base sm:text-lg md:text-xl">
            The portfolio editor has been updated to use a new section-based system.
          </Text>
          
          <Card className="bg-sky-50 border border-sky-200 w-full p-4 sm:p-6 md:p-8">
            <Stack spacing="md">
              <Heading as="h2" size="xl" className="text-sky-900 text-lg sm:text-xl md:text-2xl">
                What&apos;s New
              </Heading>
              <ul className="text-sky-800 space-y-1 text-left text-sm sm:text-base md:text-base ml-4">
                <li>• Dynamic sections instead of fixed hero/about/skills/projects/contact</li>
                <li>• Drag-and-drop section reordering</li>
                <li>• Multiple section types (text, images, forms, etc.)</li>
                <li>• Customizable layouts and styling</li>
              </ul>
            </Stack>
          </Card>
          
          <Flex gap="md" justify="center" className="flex-col sm:flex-row w-full sm:w-auto md:gap-lg">
            <Button
              onClick={() => router.push(`/preview?portfolio=${portfolioId}`)}
              variant="primary"
              size="lg"
              className="w-full sm:w-auto md:w-auto h-12 md:h-14 px-6 md:px-8"
            >
              Preview Portfolio
            </Button>
            <Button
              onClick={() => router.push('/dashboard')}
              variant="secondary"
              size="lg"
              className="w-full sm:w-auto md:w-auto h-12 md:h-14 px-6 md:px-8"
            >
              Back to Dashboard
            </Button>
          </Flex>
        </Stack>
      </Card>
    </Container>
  );
}

export default function EditorPage() {
  return (
    <ProtectedRoute>
      <AuthLayout>
        <EditorContent />
      </AuthLayout>
    </ProtectedRoute>
  );
}
