'use client';

import { useQuery, useMutation } from '@apollo/client';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { useState } from 'react';
import { GET_ME, TOGGLE_PUBLISH, DELETE_PORTFOLIO, UPDATE_PORTFOLIO_NAME } from '@/lib/graphql/operations';
import { useAuth } from '@/lib/AuthContext';
import { ProtectedRoute } from '@/lib/ProtectedRoute';
import AuthLayout from '@/components/AuthLayout';
import { usePortfolio } from '@/lib/PortfolioContext';
import { PageContainer, PageHeader } from '@/components/layout';
import { Button, Modal, ModalFooter, Input, LoadingScreen, Alert } from '@/components/ui';
import { PortfolioCard } from '@/components/PortfolioCard';
import { EmptyState } from '@/components/EmptyState';

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
    return <LoadingScreen message="Loading dashboard..." />;
  }

  const user = data?.me;
  const portfolios = user?.portfolios || [];
  const canCreateMore = portfolios.length < MAX_PORTFOLIOS;

  if (portfolios.length === 0) {
    return (
      <PageContainer maxWidth="4xl" className="py-16 sm:py-24">
        <EmptyState
          icon="🎨"
          title={`Welcome, ${user?.name}!`}
          description="You haven't created a portfolio yet. Choose a template to get started!"
          actionText="Choose a Template"
          actionHref="/templates"
        />
      </PageContainer>
    );
  }

  const portfolioUrl = `${typeof window !== 'undefined' ? window.location.origin : ''}/${user.username}`;

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

  return (
    <>
      <PageContainer>
        {/* Page Header */}
        <PageHeader
          title={`Welcome back, ${user.name}!`}
          icon="👋"
          subtitle={`${portfolios.length} of ${MAX_PORTFOLIOS} portfolios created`}
          action={
            canCreateMore ? (
              <Link href="/templates">
                <Button variant="primary" size="md">
                  <span>➕</span>
                  Create New Portfolio
                </Button>
              </Link>
            ) : (
              <Button
                variant="primary"
                size="md"
                disabled
                onClick={(e) => {
                  e.preventDefault();
                  alert('You have reached the maximum limit of 3 portfolios');
                }}
              >
                <span>➕</span>
                Create New Portfolio
              </Button>
            )
          }
        />

        {/* Portfolios Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {portfolios.map((portfolio: any) => {
            if (editingPortfolioId === portfolio.id) {
              // Show inline edit form
              return (
                <div key={portfolio.id} className="bg-white rounded-2xl shadow-xl p-6">
                  <Input
                    value={editedName}
                    onChange={(e) => setEditedName(e.target.value)}
                    label="Portfolio Name"
                    autoFocus
                    onKeyDown={(e: any) => {
                      if (e.key === 'Enter') handleSaveName();
                      if (e.key === 'Escape') setEditingPortfolioId(null);
                    }}
                  />
                  <div className="flex gap-2 mt-4">
                    <Button
                      onClick={handleSaveName}
                      variant="primary"
                      size="sm"
                      fullWidth
                      disabled={updatingName || !editedName.trim()}
                      loading={updatingName}
                    >
                      Save
                    </Button>
                    <Button
                      onClick={() => setEditingPortfolioId(null)}
                      variant="secondary"
                      size="sm"
                      fullWidth
                      disabled={updatingName}
                    >
                      Cancel
                    </Button>
                  </div>
                </div>
              );
            }

            return (
              <PortfolioCard
                key={portfolio.id}
                portfolio={portfolio}
                portfolioUrl={portfolioUrl}
                onTogglePublish={() => togglePublish({ variables: { portfolioId: portfolio.id } })}
                onDelete={handleDeleteClick}
                onEditName={handleEditName}
                publishing={publishing}
              />
            );
          })}
        </div>
      </PageContainer>

      {/* Delete Modal */}
      <Modal
        isOpen={showDeleteModal}
        onClose={() => {
          setShowDeleteModal(false);
          setPortfolioToDelete(null);
        }}
        title="Delete Portfolio?"
        description="This action cannot be undone. All your portfolio data will be permanently deleted."
      >
        <div className="w-16 h-16 bg-red-100 rounded-full flex items-center justify-center mx-auto mb-4">
          <span className="text-3xl">⚠️</span>
        </div>
        
        <ModalFooter>
          <Button
            onClick={() => {
              setShowDeleteModal(false);
              setPortfolioToDelete(null);
            }}
            variant="secondary"
            fullWidth
            disabled={deleting}
          >
            Cancel
          </Button>
          <Button
            onClick={confirmDelete}
            variant="danger"
            fullWidth
            loading={deleting}
          >
            Delete
          </Button>
        </ModalFooter>
      </Modal>
    </>
  );
}

export default function DashboardPage() {
  return (
    <ProtectedRoute>
      <AuthLayout>
        <DashboardContent />
      </AuthLayout>
    </ProtectedRoute>
  );
}
