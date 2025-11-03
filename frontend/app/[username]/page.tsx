'use client';

import { useParams, useSearchParams } from 'next/navigation';
import { ThemeProvider } from '@/lib/ThemeContext';
import { PortfolioRenderer } from '@/components/PortfolioRenderer';

export default function PublicPortfolioPage() {
  const params = useParams();
  const searchParams = useSearchParams();
  const username = params?.username as string;
  const portfolioId = searchParams.get('p');

  return (
    <ThemeProvider>
      <PortfolioRenderer username={username} portfolioId={portfolioId} />
    </ThemeProvider>
  );
}
