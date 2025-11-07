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
import { Button, Modal, ModalFooter, Input, LoadingScreen, Alert, Grid, Stack, Flex, Icon } from '@/components/ui';
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
    onCompleted: (data) => {
      refetch();
      // If just published, redirect to live portfolio
      if (data?.togglePublish?.isPublished) {
        const portfolioUrl = `${window.location.origin}/${user?.username}?p=${data.togglePublish.id}`;
        window.open(portfolioUrl, '_blank', 'noopener,noreferrer');
      }
    },
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
      <PageContainer maxWidth="4xl" className="py-12 sm:py-16 md:py-20 lg:py-24 px-4 md:px-6">
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
      <PageContainer className="px-4 md:px-6">
        {/* Page Header */}
        <PageHeader
          title={`Welcome back, ${user.name}!`}
          icon="👋"
          subtitle={`${portfolios.length} of ${MAX_PORTFOLIOS} portfolios created`}
          action={
            canCreateMore ? (
              <Link href="/templates" className="w-full sm:w-auto md:w-auto">
                <Button variant="primary" size="md" className="w-full sm:w-auto md:w-auto whitespace-nowrap px-4 md:px-6 py-2 md:py-3">
                  <span>➕</span>
                  <span className="hidden sm:inline md:inline">Create New Portfolio</span>
                  <span className="sm:hidden md:hidden">New Portfolio</span>
                </Button>
              </Link>
            ) : (
              <Button
                variant="primary"
                size="md"
                disabled
                className="w-full sm:w-auto md:w-auto whitespace-nowrap px-4 md:px-6 py-2 md:py-3"
                onClick={(e) => {
                  e.preventDefault();
                  alert('You have reached the maximum limit of 3 portfolios');
                }}
              >
                <span>➕</span>
                <span className="hidden sm:inline md:inline">Create New Portfolio</span>
                <span className="sm:hidden md:hidden">New Portfolio</span>
              </Button>
            )
          }
        />

        {/* Portfolios Grid */}
        <Grid cols={1} smCols={2} mdCols={2} lgCols={3} gap="lg" className="md:gap-xl max-w-6xl mb-8 md:mb-12">
          {portfolios.map((portfolio: any) => {
            if (editingPortfolioId === portfolio.id) {
              // Show inline edit form
              return (
                <div key={portfolio.id} className="bg-white rounded-2xl shadow-xl p-4 md:p-6">
                  <Stack spacing="md">
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
                    <Flex gap="sm" className="md:gap-md">
                      <Button
                        onClick={handleSaveName}
                        variant="primary"
                        size="sm"
                        fullWidth
                        disabled={updatingName || !editedName.trim()}
                        loading={updatingName}
                        className="h-10 md:h-12"
                      >
                        Save
                      </Button>
                      <Button
                        onClick={() => setEditingPortfolioId(null)}
                        variant="secondary"
                        size="sm"
                        fullWidth
                        disabled={updatingName}
                        className="h-10 md:h-12"
                      >
                        Cancel
                      </Button>
                    </Flex>
                  </Stack>
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
        </Grid>
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
        size="md"
      >
        <Stack spacing="md" align="center" className="py-4 md:py-6">
          <Flex justify="center" align="center" className="w-16 h-16 md:w-20 md:h-20 bg-red-100 rounded-full">
            <Icon emoji="⚠️" size="xl" className="md:text-2xl" />
          </Flex>
        </Stack>
        
        <ModalFooter className="gap-3 md:gap-4">
          <Button
            onClick={() => {
              setShowDeleteModal(false);
              setPortfolioToDelete(null);
            }}
            variant="secondary"
            fullWidth
            disabled={deleting}
            className="h-12 md:h-14"
          >
            Cancel
          </Button>
          <Button
            onClick={confirmDelete}
            variant="danger"
            fullWidth
            loading={deleting}
            className="h-12 md:h-14"
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
