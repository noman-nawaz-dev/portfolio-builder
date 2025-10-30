'use client';

import { useQuery } from '@apollo/client';
import { useParams } from 'next/navigation';
import { GET_PUBLIC_PORTFOLIO } from '@/lib/graphql/operations';
import EngineerTemplate from '@/components/portfolio/EngineerTemplate';
import MarketerTemplate from '@/components/portfolio/MarketerTemplate';
import GeneralTemplate from '@/components/portfolio/GeneralTemplate';

export default function PublicPortfolioPage() {
  const params = useParams();
  const username = params?.username as string;
  
  const { data, loading, error } = useQuery(GET_PUBLIC_PORTFOLIO, {
    variables: { username },
    skip: !username,
  });

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <div className="text-xl text-gray-600">Loading portfolio...</div>
      </div>
    );
  }

  if (error || !data?.publicPortfolio) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50 px-4">
        <div className="text-center max-w-md">
          <h1 className="text-3xl sm:text-4xl font-bold text-gray-900 mb-4">Portfolio Not Found</h1>
          <p className="text-gray-600 mb-6">This portfolio doesn&apos;t exist or hasn&apos;t been published yet.</p>
          <a
            href="/"
            className="inline-block bg-indigo-600 text-white px-6 py-3 rounded-lg font-semibold hover:bg-indigo-700 transition"
          >
            Go to Home
          </a>
        </div>
      </div>
    );
  }

  const portfolio = data.publicPortfolio;
  const category = portfolio.template.category;

  if (category === 'engineer') {
    return <EngineerTemplate portfolio={portfolio} />;
  }
  if (category === 'marketer') {
    return <MarketerTemplate portfolio={portfolio} />;
  }
  return <GeneralTemplate portfolio={portfolio} />;
}
