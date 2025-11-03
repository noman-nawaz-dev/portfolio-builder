'use client';

import { useQuery, useMutation } from '@apollo/client';
import { useRouter } from 'next/navigation';
import { GET_TEMPLATES, GET_ME, CREATE_PORTFOLIO } from '@/lib/graphql/operations';
import { ProtectedRoute } from '@/lib/ProtectedRoute';
import AuthLayout from '@/components/AuthLayout';
import { useEffect, useState } from 'react';
import { usePortfolio } from '@/lib/PortfolioContext';
import { PageContainer } from '@/components/layout';
import { Card, CardHeader, CardBody, Button, Modal, ModalFooter, Input, LoadingScreen, Alert } from '@/components/ui';

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
      router.push(`/section-editor?portfolio=${newPortfolioId}`);
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
    return <LoadingScreen message="Loading templates..." />;
  }

  return (
    <>
      <PageContainer>
        {/* Header */}
        <div className="text-center mb-8 sm:mb-12">
          <h1 className="text-3xl sm:text-4xl font-bold text-gray-900 mb-4">
            Choose Your Template
          </h1>
          <p className="text-base sm:text-lg text-gray-600">
            Select a template that best represents your profession
          </p>
        </div>

        {/* Templates Grid */}
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
          {data?.templates?.map((template: any) => (
            <Card key={template.id} padding="none" hoverable>
              <div className="h-48 bg-gradient-to-br from-blue-400 to-indigo-600 relative overflow-hidden">
                <img
                  src={template.previewImage}
                  alt={template.name}
                  className="w-full h-full object-cover"
                />
              </div>
              <CardBody>
                <h3 className="text-xl font-semibold text-gray-900 mb-2">
                  {template.name}
                </h3>
                <p className="text-gray-600 mb-6 min-h-[60px]">
                  {template.description}
                </p>
                <Button
                  onClick={() => handleSelectTemplate(template.id)}
                  variant="primary"
                  fullWidth
                  size="lg"
                  loading={creating}
                >
                  Select Template
                </Button>
              </CardBody>
            </Card>
          ))}
        </div>

        {/* Portfolio Count Warning */}
        {!canCreateMore && (
          <Alert variant="warning" className="mt-8 max-w-2xl mx-auto text-center">
            You have reached the maximum limit of {MAX_PORTFOLIOS} portfolios.
            Please delete an existing portfolio to create a new one.
          </Alert>
        )}
      </PageContainer>

      {/* Portfolio Name Modal */}
      <Modal
        isOpen={showNameModal}
        onClose={() => {
          setShowNameModal(false);
          setSelectedTemplateId('');
        }}
        title="Name Your Portfolio"
        description="Choose a memorable name for your new portfolio"
        size="md"
      >
        <Input
          type="text"
          label="Portfolio Name"
          value={portfolioName}
          onChange={(e) => setPortfolioName(e.target.value)}
          placeholder="e.g., My Design Portfolio"
          helperText={`Portfolio ${portfolios.length + 1} of ${MAX_PORTFOLIOS}`}
          autoFocus
          onKeyDown={(e: any) => {
            if (e.key === 'Enter') {
              handleCreatePortfolio();
            }
          }}
        />
        
        <ModalFooter>
          <Button
            onClick={() => {
              setShowNameModal(false);
              setSelectedTemplateId('');
            }}
            variant="secondary"
            fullWidth
            disabled={creating}
          >
            Cancel
          </Button>
          <Button
            onClick={handleCreatePortfolio}
            variant="primary"
            fullWidth
            loading={creating}
          >
            Create Portfolio
          </Button>
        </ModalFooter>
      </Modal>
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
