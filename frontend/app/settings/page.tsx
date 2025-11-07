'use client';

import { useQuery, useMutation } from '@apollo/client';
import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { ProtectedRoute } from '@/lib/ProtectedRoute';
import AuthLayout from '@/components/AuthLayout';
import { GET_ME, UPDATE_PROFILE } from '@/lib/graphql/operations';
import { useAuth } from '@/lib/AuthContext';
import { PageContainer, PageHeader } from '@/components/layout';
import { Card, CardHeader, CardBody, Button, Input, Alert, LoadingScreen, Heading, Text, Stack, Flex } from '@/components/ui';

function SettingsContent() {
  const router = useRouter();
  const { user: contextUser, setUser } = useAuth();
  const { data, loading, refetch } = useQuery(GET_ME);
  const [updateProfile, { loading: updating }] = useMutation(UPDATE_PROFILE);

  const [formData, setFormData] = useState({
    name: '',
    username: '',
  });

  const [message, setMessage] = useState<{ type: 'success' | 'error'; text: string } | null>(null);

  useEffect(() => {
    if (data?.me) {
      setFormData({
        name: data.me.name || '',
        username: data.me.username || '',
      });
    }
  }, [data]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setMessage(null);

    try {
      const result = await updateProfile({
        variables: { data: formData },
      });
      
      // Update user in context
      if (result.data?.updateProfile) {
        setUser(result.data.updateProfile);
      }
      
      await refetch();
      setMessage({ type: 'success', text: 'Profile updated successfully!' });
      
      // Clear message after 3 seconds
      setTimeout(() => setMessage(null), 3000);
    } catch (error: any) {
      setMessage({ 
        type: 'error', 
        text: error.message || 'Failed to update profile. Please try again.' 
      });
    }
  };

  if (loading) {
    return <LoadingScreen message="Loading settings..." />;
  }

  const user = data?.me;

  return (
    <PageContainer maxWidth="4xl" className="px-4 md:px-6">
      {/* Page Header */}
      <PageHeader
        title="Profile Settings"
        icon="⚙️"
        subtitle="Manage your account information"
        className="mb-8 md:mb-12"
      />

      {/* Settings Card */}
      <Card padding="none" className="shadow-xl md:shadow-2xl">
        <CardHeader gradient className="text-white p-6 sm:p-8 md:p-10 lg:p-12">
          <Heading as="h2" size="2xl" className="text-white m-0 text-xl sm:text-2xl md:text-3xl">Account Information</Heading>
          <Text className="text-indigo-100 mt-1 text-sm sm:text-base md:text-lg">Update your profile details</Text>
        </CardHeader>

        {/* Form */}
        <form onSubmit={handleSubmit}>
          <CardBody className="p-6 sm:p-8 md:p-10 lg:p-12">
            <Stack spacing="lg" className="md:spacing-xl">
            {/* Success/Error Message */}
            {message && (
              <Alert
                variant={message.type}
                onClose={() => setMessage(null)}
                className="text-sm sm:text-base md:text-base"
              >
                {message.text}
              </Alert>
            )}

            {/* Email (Read-only) */}
            <Input
              type="email"
              label="Email Address"
              value={user?.email || ''}
              disabled
              helperText="Email cannot be changed"
              className="bg-gray-100 text-gray-600 cursor-not-allowed text-sm sm:text-base md:text-base"
            />

            {/* Name */}
            <Input
              type="text"
              label="Full Name"
              value={formData.name}
              onChange={(e) => setFormData({ ...formData, name: e.target.value })}
              placeholder="Enter your full name"
              required
              className="text-sm sm:text-base md:text-base"
            />

            {/* Username */}
            <Input
              type="text"
              label="Username"
              value={formData.username}
              onChange={(e) => setFormData({ ...formData, username: e.target.value.toLowerCase().replace(/[^a-z0-9_]/g, '') })}
              placeholder="username"
              required
              leftIcon={<span className="font-medium">@</span>}
              helperText={`Your portfolio will be available at: ${typeof window !== 'undefined' ? window.location.origin : ''}/${formData.username || 'username'}`}
              className="text-sm sm:text-base md:text-base"
            />

            {/* Action Buttons */}
            <Flex direction="col" gap="md" className="sm:flex-row md:gap-lg pt-4 md:pt-6">
              <Button
                type="submit"
                variant="primary"
                size="lg"
                fullWidth
                loading={updating}
                className="order-1 h-12 md:h-14 text-sm md:text-base"
              >
                Save Changes
              </Button>
              <Button
                type="button"
                variant="secondary"
                size="lg"
                fullWidth
                onClick={() => router.push('/dashboard')}
                className="order-2 h-12 md:h-14 text-sm md:text-base"
              >
                Cancel
              </Button>
            </Flex>
          </Stack>
          </CardBody>
        </form>
      </Card>

      {/* Additional Info Card */}
      <Alert variant="info" className="mt-6 md:mt-8 max-w-4xl">
        <Stack spacing="sm">
          <Heading as="h3" size="md" weight="semibold" className="m-0 text-base sm:text-lg md:text-xl">💡 Important Notes</Heading>
          <ul className="text-xs sm:text-sm md:text-base space-y-1 ml-4">
            <li>• Changing your username will update your portfolio URL</li>
            <li>• Username can only contain lowercase letters, numbers, and underscores</li>
            <li>• Your email address is used for authentication and cannot be changed</li>
          </ul>
        </Stack>
      </Alert>
    </PageContainer>
  );
}

export default function Settings() {
  return (
    <ProtectedRoute>
      <AuthLayout>
        <SettingsContent />
      </AuthLayout>
    </ProtectedRoute>
  );
}
