'use client';

import { useQuery, useMutation } from '@apollo/client';
import { useRouter } from 'next/navigation';
import { GET_TEMPLATES, GET_ME, CREATE_PORTFOLIO } from '@/lib/graphql/operations';
import { ProtectedRoute } from '@/lib/ProtectedRoute';
import AuthLayout from '@/components/AuthLayout';
import { useEffect, useState } from 'react';
import { usePortfolio } from '@/lib/PortfolioContext';
import { PageContainer } from '@/components/layout';
import { Card, CardHeader, CardBody, Button, Modal, ModalFooter, Input, LoadingScreen, Alert, Heading, Text, Container, Grid, Stack } from '@/components/ui';

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
      <PageContainer className="px-4 md:px-6">
        {/* Header */}
        <Container maxWidth="4xl" padding="none" className="mb-8 sm:mb-12 md:mb-16">
          <Stack spacing="md" align="center">
            <Heading as="h1" size="4xl" align="center" className="text-3xl sm:text-4xl md:text-5xl lg:text-5xl">
              Choose Your Template
            </Heading>
            <Text size="lg" align="center" className="text-base sm:text-lg md:text-xl lg:text-xl px-4 md:px-0">
              Select a template that best represents your profession
            </Text>
          </Stack>
        </Container>

        {/* Templates Grid */}
        <Grid cols={1} smCols={2} mdCols={2} lgCols={3} gap="lg" className="md:gap-xl mb-8 md:mb-12">
          {data?.templates?.map((template: any) => (
            <Card key={template.id} padding="none" hoverable className="shadow-lg md:shadow-xl">
              <div className="h-40 sm:h-48 md:h-52 bg-gradient-to-br from-blue-400 to-indigo-600 relative overflow-hidden">
                <img
                  src={template.previewImage}
                  alt={template.name}
                  className="w-full h-full object-cover"
                />
              </div>
              <CardBody className="p-4 sm:p-6 md:p-8">
                <Stack spacing="md">
                  <Heading as="h3" size="xl" className="text-lg sm:text-xl md:text-2xl">
                    {template.name}
                  </Heading>
                  <Text className="min-h-[60px] text-sm sm:text-base md:text-base leading-relaxed">
                    {template.description}
                  </Text>
                  <Button
                    onClick={() => handleSelectTemplate(template.id)}
                    variant="primary"
                    fullWidth
                    size="lg"
                    loading={creating}
                    className="text-sm sm:text-base md:text-base h-12 md:h-14 mt-2 md:mt-4"
                  >
                    Select Template
                  </Button>
                </Stack>
              </CardBody>
            </Card>
          ))}
        </Grid>

        {/* Portfolio Count Warning */}
        {!canCreateMore && (
          <Alert variant="warning" className="mt-8 max-w-2xl mx-auto text-center text-sm sm:text-base md:text-base px-4 md:px-6 py-4 md:py-6">
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
          className="mb-4 md:mb-6"
          onKeyDown={(e: any) => {
            if (e.key === 'Enter') {
              handleCreatePortfolio();
            }
          }}
        />
        
        <ModalFooter className="gap-3 md:gap-4">
          <Button
            onClick={() => {
              setShowNameModal(false);
              setSelectedTemplateId('');
            }}
            variant="secondary"
            fullWidth
            disabled={creating}
            className="h-12 md:h-14"
          >
            Cancel
          </Button>
          <Button
            onClick={handleCreatePortfolio}
            variant="primary"
            fullWidth
            loading={creating}
            className="h-12 md:h-14"
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
