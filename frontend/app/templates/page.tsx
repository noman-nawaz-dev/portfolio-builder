'use client';

import { useQuery, useMutation } from '@apollo/client';
import { useRouter } from 'next/navigation';
import { GET_TEMPLATES, GET_ME, CREATE_PORTFOLIO } from '@/lib/graphql/operations';
import { ProtectedRoute } from '@/lib/ProtectedRoute';
import AuthLayout from '@/components/AuthLayout';
import { useEffect, useState } from 'react';
import { usePortfolio } from '@/lib/PortfolioContext';

const MAX_PORTFOLIOS = 3;

function TemplatesContent() {
  const router = useRouter();
  const { data: userData, loading: userLoading } = useQuery(GET_ME);
  const { data, loading } = useQuery(GET_TEMPLATES);
  const { setCurrentPortfolioId } = usePortfolio();
  const [portfolioName, setPortfolioName] = useState('');
  const [showNameModal, setShowNameModal] = useState(false);
  const [selectedTemplateId, setSelectedTemplateId] = useState('');
  
  const [createPortfolio, { loading: creating }] = useMutation(CREATE_PORTFOLIO, {
    onCompleted: (data) => {
      const newPortfolioId = data.createPortfolio.id;
      setCurrentPortfolioId(newPortfolioId);
      router.push(`/editor?portfolio=${newPortfolioId}`);
    },
    onError: (error) => {
      alert(error.message);
    },
  });

  const portfolios = userData?.me?.portfolios || [];
  const canCreateMore = portfolios.length < MAX_PORTFOLIOS;

  useEffect(() => {
    // Auto-generate default name based on portfolio count
    if (portfolios.length > 0) {
      setPortfolioName(`Portfolio ${portfolios.length + 1}`);
    } else {
      setPortfolioName('My Portfolio');
    }
  }, [portfolios.length]);

  const handleSelectTemplate = (templateId: string) => {
    if (!canCreateMore) {
      alert(`You have reached the maximum limit of ${MAX_PORTFOLIOS} portfolios. Please delete an existing portfolio to create a new one.`);
      return;
    }
    setSelectedTemplateId(templateId);
    setShowNameModal(true);
  };

  const handleCreatePortfolio = () => {
    if (!portfolioName.trim()) {
      alert('Please enter a portfolio name');
      return;
    }
    createPortfolio({ 
      variables: { 
        templateId: selectedTemplateId,
        name: portfolioName.trim()
      } 
    });
    setShowNameModal(false);
  };

  if (loading || userLoading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-xl text-gray-600">Loading templates...</div>
      </div>
    );
  }

  return (
    <>
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-12">
        <div className="text-center mb-8 sm:mb-12">
          <h1 className="text-3xl sm:text-4xl font-bold text-gray-900 mb-4">
            Choose Your Template
          </h1>
          <p className="text-base sm:text-lg text-gray-600">
            Select a template that best represents your profession
          </p>
        </div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
          {data?.templates?.map((template: any) => (
            <div
              key={template.id}
              className="bg-white rounded-xl shadow-md overflow-hidden hover:shadow-xl transition"
            >
              <div className="h-48 bg-gradient-to-br from-blue-400 to-indigo-600 relative overflow-hidden">
                <img
                  src={template.previewImage}
                  alt={template.name}
                  className="w-full h-full object-cover"
                />
              </div>
              <div className="p-6">
                <h3 className="text-xl font-semibold text-gray-900 mb-2">
                  {template.name}
                </h3>
                <p className="text-gray-600 mb-6 min-h-[60px]">
                  {template.description}
                </p>
                <button
                  onClick={() => handleSelectTemplate(template.id)}
                  disabled={creating}
                  className="w-full bg-indigo-600 text-white py-3 rounded-lg font-semibold hover:bg-indigo-700 disabled:opacity-50"
                >
                  {creating ? 'Creating...' : 'Select Template'}
                </button>
              </div>
            </div>
          ))}
        </div>

        {/* Portfolio Count Warning */}
        {!canCreateMore && (
          <div className="mt-8 max-w-2xl mx-auto p-4 bg-yellow-50 border border-yellow-200 rounded-xl">
            <p className="text-center text-yellow-800 font-medium">
              ⚠️ You have reached the maximum limit of {MAX_PORTFOLIOS} portfolios.
              Please delete an existing portfolio to create a new one.
            </p>
          </div>
        )}
      </main>

      {/* Portfolio Name Modal */}
      {showNameModal && (
        <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center p-4 z-50">
          <div className="bg-white rounded-2xl shadow-2xl max-w-md w-full p-6 sm:p-8">
            <div className="mb-6">
              <h3 className="text-2xl font-bold text-gray-900 mb-2">Name Your Portfolio</h3>
              <p className="text-gray-600">Choose a memorable name for your new portfolio</p>
            </div>
            <div className="mb-6">
              <label className="block text-sm font-semibold text-gray-700 mb-2">
                Portfolio Name
              </label>
              <input
                type="text"
                value={portfolioName}
                onChange={(e) => setPortfolioName(e.target.value)}
                placeholder="e.g., My Design Portfolio"
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
                autoFocus
                onKeyDown={(e) => {
                  if (e.key === 'Enter') {
                    handleCreatePortfolio();
                  }
                }}
              />
              <p className="text-xs text-gray-500 mt-1">
                Portfolio {portfolios.length + 1} of {MAX_PORTFOLIOS}
              </p>
            </div>
            <div className="flex gap-3">
              <button
                onClick={() => {
                  setShowNameModal(false);
                  setSelectedTemplateId('');
                }}
                disabled={creating}
                className="flex-1 px-6 py-3 bg-gray-200 text-gray-800 rounded-lg font-semibold hover:bg-gray-300 transition disabled:opacity-50"
              >
                Cancel
              </button>
              <button
                onClick={handleCreatePortfolio}
                disabled={creating}
                className="flex-1 px-6 py-3 bg-gradient-to-r from-indigo-600 to-purple-600 text-white rounded-lg font-semibold hover:shadow-lg transition disabled:opacity-50"
              >
                {creating ? 'Creating...' : 'Create Portfolio'}
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
}

export default function TemplatesPage() {
  return (
    <ProtectedRoute>
      <AuthLayout>
        <TemplatesContent />
      </AuthLayout>
    </ProtectedRoute>
  );
}
