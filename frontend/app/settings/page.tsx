'use client';

import { useQuery, useMutation } from '@apollo/client';
import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { ProtectedRoute } from '@/lib/ProtectedRoute';
import AuthLayout from '@/components/AuthLayout';
import { GET_ME, UPDATE_PROFILE } from '@/lib/graphql/operations';
import { useAuth } from '@/lib/AuthContext';
import { PageContainer, PageHeader } from '@/components/layout';
import { Card, CardHeader, CardBody, Button, Input, Alert, LoadingScreen } from '@/components/ui';

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
    <PageContainer maxWidth="4xl">
      {/* Page Header */}
      <PageHeader
        title="Profile Settings"
        icon="⚙️"
        subtitle="Manage your account information"
      />

      {/* Settings Card */}
      <Card padding="none">
        <CardHeader gradient className="text-white">
          <h2 className="text-2xl font-bold">Account Information</h2>
          <p className="text-indigo-100 text-sm mt-1">Update your profile details</p>
        </CardHeader>

        {/* Form */}
        <form onSubmit={handleSubmit}>
          <CardBody className="space-y-6">
            {/* Success/Error Message */}
            {message && (
              <Alert
                variant={message.type}
                onClose={() => setMessage(null)}
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
              className="bg-gray-100 text-gray-600 cursor-not-allowed"
            />

            {/* Name */}
            <Input
              type="text"
              label="Full Name"
              value={formData.name}
              onChange={(e) => setFormData({ ...formData, name: e.target.value })}
              placeholder="Enter your full name"
              required
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
            />

            {/* Action Buttons */}
            <div className="flex flex-col sm:flex-row gap-3 pt-4">
              <Button
                type="submit"
                variant="primary"
                size="lg"
                fullWidth
                loading={updating}
              >
                Save Changes
              </Button>
              <Button
                type="button"
                variant="secondary"
                size="lg"
                fullWidth
                onClick={() => router.push('/dashboard')}
              >
                Cancel
              </Button>
            </div>
          </CardBody>
        </form>
      </Card>

      {/* Additional Info Card */}
      <Alert variant="info" className="mt-6">
        <div>
          <h3 className="font-semibold mb-2">💡 Important Notes</h3>
          <ul className="text-sm space-y-1">
            <li>• Changing your username will update your portfolio URL</li>
            <li>• Username can only contain lowercase letters, numbers, and underscores</li>
            <li>• Your email address is used for authentication and cannot be changed</li>
          </ul>
        </div>
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
