'use client';

import { useQuery, useMutation } from '@apollo/client';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { useState } from 'react';
import { GET_ME, TOGGLE_PUBLISH, DELETE_PORTFOLIO, UPDATE_PORTFOLIO_NAME } from '@/lib/graphql/operations';
import { useAuth } from '@/lib/AuthContext';
import { ProtectedRoute } from '@/lib/ProtectedRoute';
import AuthNavbar from '@/components/AuthNavbar';
import { usePortfolio } from '@/lib/PortfolioContext';

const MAX_PORTFOLIOS = 3;

function DashboardContent() {
  const router = useRouter();
  const { logout } = useAuth();
  const { data, loading, refetch } = useQuery(GET_ME);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [portfolioToDelete, setPortfolioToDelete] = useState<string | null>(null);
  const [editingPortfolioId, setEditingPortfolioId] = useState<string | null>(null);
  const [editedName, setEditedName] = useState('');
  const { setCurrentPortfolioId } = usePortfolio();
  
  const [togglePublish, { loading: publishing }] = useMutation(TOGGLE_PUBLISH, {
    onCompleted: () => refetch(),
  });

  const [deletePortfolio, { loading: deleting }] = useMutation(DELETE_PORTFOLIO, {
    onCompleted: () => {
      setShowDeleteModal(false);
      setPortfolioToDelete(null);
      refetch();
    },
  });

  const [updatePortfolioName, { loading: updatingName }] = useMutation(UPDATE_PORTFOLIO_NAME, {
    onCompleted: () => {
      setEditingPortfolioId(null);
      setEditedName('');
      refetch();
    },
  });

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-xl text-gray-600">Loading...</div>
      </div>
    );
  }

  const user = data?.me;
  const portfolios = user?.portfolios || [];
  const canCreateMore = portfolios.length < MAX_PORTFOLIOS;

  if (portfolios.length === 0) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-indigo-50 via-white to-purple-50">
        <AuthNavbar userName={user?.name} />
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-16 sm:py-24 text-center">
          <div className="bg-white rounded-2xl shadow-xl p-8 sm:p-12">
            <div className="w-20 h-20 bg-gradient-to-br from-indigo-500 to-purple-500 rounded-full flex items-center justify-center mx-auto mb-6">
              <span className="text-4xl">🎨</span>
            </div>
            <h1 className="text-3xl sm:text-4xl font-bold text-gray-900 mb-4">
              Welcome, {user?.name}!
            </h1>
            <p className="text-lg text-gray-600 mb-8">
              You haven&apos;t created a portfolio yet. Choose a template to get started!
            </p>
            <Link
              href="/templates"
              className="inline-block bg-gradient-to-r from-indigo-600 to-purple-600 text-white px-8 py-4 rounded-xl font-semibold hover:shadow-lg transform hover:scale-105 transition-all"
            >
              Choose a Template
            </Link>
          </div>
        </div>
      </div>
    );
  }

  const portfolioUrl = `${typeof window !== 'undefined' ? window.location.origin : ''}/${user.username}`;

  const handleEditPortfolio = (portfolioId: string) => {
    setCurrentPortfolioId(portfolioId);
    router.push(`/editor?portfolio=${portfolioId}`);
  };

  const handlePreviewPortfolio = (portfolioId: string) => {
    setCurrentPortfolioId(portfolioId);
    router.push(`/preview?portfolio=${portfolioId}`);
  };

  const handleDeleteClick = (portfolioId: string) => {
    setPortfolioToDelete(portfolioId);
    setShowDeleteModal(true);
  };

  const confirmDelete = () => {
    if (portfolioToDelete) {
      deletePortfolio({ variables: { portfolioId: portfolioToDelete } });
    }
  };

  const handleEditName = (portfolioId: string, currentName: string) => {
    setEditingPortfolioId(portfolioId);
    setEditedName(currentName);
  };

  const handleSaveName = () => {
    if (editingPortfolioId && editedName.trim()) {
      updatePortfolioName({
        variables: {
          portfolioId: editingPortfolioId,
          name: editedName.trim(),
        },
      });
    }
  };

  const handleCancelEdit = () => {
    setEditingPortfolioId(null);
    setEditedName('');
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-50 via-white to-purple-50">
      <AuthNavbar userName={user?.name} />

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-12">
        {/* Welcome Banner */}
        <div className="mb-8 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
          <div>
            <h1 className="text-3xl sm:text-4xl font-bold text-gray-900 mb-2">
              Welcome back, {user.name}! 👋
            </h1>
            <p className="text-gray-600">
              {portfolios.length} of {MAX_PORTFOLIOS} portfolios created
            </p>
          </div>
          <Link
            href="/templates"
            className={`inline-flex items-center gap-2 px-6 py-3 rounded-xl font-semibold transition-all ${
              canCreateMore
                ? 'bg-gradient-to-r from-indigo-600 to-purple-600 text-white hover:shadow-lg transform hover:scale-105'
                : 'bg-gray-300 text-gray-500 cursor-not-allowed'
            }`}
            onClick={(e) => {
              if (!canCreateMore) {
                e.preventDefault();
                alert('You have reached the maximum limit of 3 portfolios');
              }
            }}
          >
            <span>➕</span>
            Create New Portfolio
          </Link>
        </div>

        {/* Portfolios Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {portfolios.map((portfolio: any) => (
            <div key={portfolio.id} className="bg-white rounded-2xl shadow-xl overflow-hidden hover:shadow-2xl transition-all">
              {/* Portfolio Header */}
              <div className="bg-gradient-to-r from-indigo-600 to-purple-600 px-6 py-4">
                <div className="flex items-center justify-between gap-2">
                  {editingPortfolioId === portfolio.id ? (
                    <div className="flex-1 flex items-center gap-2">
                      <input
                        type="text"
                        value={editedName}
                        onChange={(e) => setEditedName(e.target.value)}
                        className="flex-1 px-3 py-1.5 text-gray-900 rounded-lg text-lg font-semibold focus:outline-none focus:ring-2 focus:ring-white"
                        autoFocus
                        onKeyDown={(e) => {
                          if (e.key === 'Enter') handleSaveName();
                          if (e.key === 'Escape') handleCancelEdit();
                        }}
                      />
                      <button
                        onClick={handleSaveName}
                        disabled={updatingName || !editedName.trim()}
                        className="px-3 py-1.5 bg-white text-indigo-600 rounded-lg text-sm font-semibold hover:bg-indigo-50 transition disabled:opacity-50"
                      >
                        ✓
                      </button>
                      <button
                        onClick={handleCancelEdit}
                        disabled={updatingName}
                        className="px-3 py-1.5 bg-white/20 text-white rounded-lg text-sm font-semibold hover:bg-white/30 transition disabled:opacity-50"
                      >
                        ✕
                      </button>
                    </div>
                  ) : (
                    <>
                      <div className="flex-1 flex items-center gap-2 min-w-0">
                        <h3 className="text-xl font-bold text-white truncate">{portfolio.name}</h3>
                        <button
                          onClick={() => handleEditName(portfolio.id, portfolio.name)}
                          className="flex-shrink-0 p-1.5 hover:bg-white/20 rounded-lg transition"
                          title="Edit portfolio name"
                        >
                          <svg className="w-4 h-4 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15.232 5.232l3.536 3.536m-2.036-5.036a2.5 2.5 0 113.536 3.536L6.5 21.036H3v-3.572L16.732 3.732z" />
                          </svg>
                        </button>
                      </div>
                      <span
                        className={`flex-shrink-0 px-3 py-1 rounded-full text-xs font-semibold ${
                          portfolio.isPublished
                            ? 'bg-green-500 text-white'
                            : 'bg-yellow-500 text-white'
                        }`}
                      >
                        {portfolio.isPublished ? '✓ Live' : 'Draft'}
                      </span>
                    </>
                  )}
                </div>
                <p className="text-indigo-100 text-sm mt-1">{portfolio.template.name}</p>
              </div>

              {/* Portfolio Content */}
              <div className="p-6">
                {/* Public URL */}
                {portfolio.isPublished && (
                  <div className="mb-4 p-3 bg-green-50 border border-green-200 rounded-lg">
                    <p className="text-xs font-medium text-green-800 mb-2">Portfolio is live</p>
                    <div className="flex items-center gap-2">
                      <button
                        onClick={() => {
                          const url = `${portfolioUrl}?p=${portfolio.id}`;
                          navigator.clipboard.writeText(url);
                          alert('Link copied!');
                        }}
                        className="text-xs text-green-700 hover:text-green-900 font-medium"
                      >
                        📋 Copy Link
                      </button>
                      <span className="text-green-300">•</span>
                      <a
                        href={`${portfolioUrl}?p=${portfolio.id}`}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-xs text-green-700 hover:text-green-900 font-medium"
                      >
                        🌐 View Live
                      </a>
                    </div>
                  </div>
                )}

                {/* Action Buttons */}
                <div className="space-y-2">
                  <button
                    onClick={() => handleEditPortfolio(portfolio.id)}
                    className="w-full px-4 py-2.5 bg-indigo-600 text-white rounded-lg font-medium hover:bg-indigo-700 transition flex items-center justify-center gap-2"
                  >
                    <span>✏️</span>
                    Edit Portfolio
                  </button>
                  <button
                    onClick={() => handlePreviewPortfolio(portfolio.id)}
                    className="w-full px-4 py-2.5 bg-gray-100 text-gray-700 rounded-lg font-medium hover:bg-gray-200 transition flex items-center justify-center gap-2"
                  >
                    <span>👁️</span>
                    Preview
                  </button>
                  <button
                    onClick={() => togglePublish({ variables: { portfolioId: portfolio.id } })}
                    disabled={publishing}
                    className="w-full px-4 py-2.5 bg-blue-50 text-blue-700 rounded-lg font-medium hover:bg-blue-100 transition flex items-center justify-center gap-2 disabled:opacity-50"
                  >
                    <span>{portfolio.isPublished ? '🔒' : '🚀'}</span>
                    {portfolio.isPublished ? 'Unpublish' : 'Publish'}
                  </button>
                </div>

                {/* Delete Button */}
                <button
                  onClick={() => handleDeleteClick(portfolio.id)}
                  className="w-full mt-4 px-4 py-2 bg-red-50 text-red-600 rounded-lg text-sm font-medium hover:bg-red-600 hover:text-white transition"
                >
                  🗑️ Delete
                </button>
              </div>
            </div>
          ))}
        </div>
      </main>

      {/* Delete Modal */}
      {showDeleteModal && (
        <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center p-4 z-50">
          <div className="bg-white rounded-2xl shadow-2xl max-w-md w-full p-6 sm:p-8">
            <div className="text-center mb-6">
              <div className="w-16 h-16 bg-red-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <span className="text-3xl">⚠️</span>
              </div>
              <h3 className="text-2xl font-bold text-gray-900 mb-2">Delete Portfolio?</h3>
              <p className="text-gray-600">
                This action cannot be undone. All your portfolio data will be permanently deleted.
              </p>
            </div>
            <div className="flex gap-3">
              <button
                onClick={() => {
                  setShowDeleteModal(false);
                  setPortfolioToDelete(null);
                }}
                disabled={deleting}
                className="flex-1 px-6 py-3 bg-gray-200 text-gray-800 rounded-lg font-semibold hover:bg-gray-300 transition disabled:opacity-50"
              >
                Cancel
              </button>
              <button
                onClick={confirmDelete}
                disabled={deleting}
                className="flex-1 px-6 py-3 bg-red-600 text-white rounded-lg font-semibold hover:bg-red-700 transition disabled:opacity-50"
              >
                {deleting ? 'Deleting...' : 'Delete'}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default function DashboardPage() {
  return (
    <ProtectedRoute>
      <DashboardContent />
    </ProtectedRoute>
  );
}
