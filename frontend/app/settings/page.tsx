'use client';

import { useQuery, useMutation } from '@apollo/client';
import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { ProtectedRoute } from '@/lib/ProtectedRoute';
import AuthNavbar from '@/components/AuthNavbar';
import { GET_ME, UPDATE_PROFILE } from '@/lib/graphql/operations';

function SettingsContent() {
  const router = useRouter();
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
      await updateProfile({
        variables: { data: formData },
      });
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
    return (
      <div className="min-h-screen bg-gradient-to-br from-indigo-50 via-white to-purple-50 flex items-center justify-center">
        <div className="text-xl text-gray-600">Loading...</div>
      </div>
    );
  }

  const user = data?.me;

  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-50 via-white to-purple-50">
      <AuthNavbar userName={user?.name} />

      <main className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-12">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl sm:text-4xl font-bold text-gray-900 mb-2">
            Profile Settings ⚙️
          </h1>
          <p className="text-gray-600">Manage your account information</p>
        </div>

        {/* Settings Card */}
        <div className="bg-white rounded-2xl shadow-xl overflow-hidden">
          {/* Card Header */}
          <div className="bg-gradient-to-r from-indigo-600 to-purple-600 px-6 sm:px-8 py-6">
            <h2 className="text-2xl font-bold text-white">Account Information</h2>
            <p className="text-indigo-100 text-sm mt-1">Update your profile details</p>
          </div>

          {/* Form */}
          <form onSubmit={handleSubmit} className="p-6 sm:p-8 space-y-6">
            {/* Success/Error Message */}
            {message && (
              <div
                className={`p-4 rounded-lg border ${
                  message.type === 'success'
                    ? 'bg-green-50 border-green-200 text-green-800'
                    : 'bg-red-50 border-red-200 text-red-800'
                }`}
              >
                <div className="flex items-center gap-2">
                  <span>{message.type === 'success' ? '✓' : '⚠️'}</span>
                  <span className="font-medium">{message.text}</span>
                </div>
              </div>
            )}

            {/* Email (Read-only) */}
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">
                Email Address
              </label>
              <input
                type="email"
                value={user?.email || ''}
                disabled
                className="w-full px-4 py-3 border border-gray-300 rounded-lg bg-gray-100 text-gray-600 cursor-not-allowed"
              />
              <p className="text-xs text-gray-500 mt-1">Email cannot be changed</p>
            </div>

            {/* Name */}
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">
                Full Name
              </label>
              <input
                type="text"
                value={formData.name}
                onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition"
                placeholder="Enter your full name"
                required
              />
            </div>

            {/* Username */}
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">
                Username
              </label>
              <div className="relative">
                <span className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-500 font-medium">
                  @
                </span>
                <input
                  type="text"
                  value={formData.username}
                  onChange={(e) => setFormData({ ...formData, username: e.target.value.toLowerCase().replace(/[^a-z0-9_]/g, '') })}
                  className="w-full pl-8 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition"
                  placeholder="username"
                  required
                  pattern="[a-z0-9_]+"
                />
              </div>
              <p className="text-xs text-gray-500 mt-1">
                Your portfolio will be available at: {typeof window !== 'undefined' ? window.location.origin : ''}/{formData.username || 'username'}
              </p>
            </div>

            {/* Action Buttons */}
            <div className="flex flex-col sm:flex-row gap-3 pt-4">
              <button
                type="submit"
                disabled={updating}
                className="flex-1 bg-gradient-to-r from-indigo-600 to-purple-600 text-white px-6 py-3 rounded-xl font-semibold hover:shadow-lg transform hover:scale-105 transition-all disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none"
              >
                {updating ? 'Saving...' : 'Save Changes'}
              </button>
              <button
                type="button"
                onClick={() => router.push('/dashboard')}
                className="flex-1 sm:flex-none bg-gray-100 text-gray-700 px-6 py-3 rounded-xl font-semibold hover:bg-gray-200 transition-all"
              >
                Cancel
              </button>
            </div>
          </form>
        </div>

        {/* Additional Info Card */}
        <div className="mt-6 bg-blue-50 border border-blue-200 rounded-xl p-6">
          <div className="flex items-start gap-3">
            <span className="text-2xl">💡</span>
            <div>
              <h3 className="font-semibold text-blue-900 mb-1">Important Notes</h3>
              <ul className="text-sm text-blue-800 space-y-1">
                <li>• Changing your username will update your portfolio URL</li>
                <li>• Username can only contain lowercase letters, numbers, and underscores</li>
                <li>• Your email address is used for authentication and cannot be changed</li>
              </ul>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}

export default function Settings() {
  return (
    <ProtectedRoute>
      <SettingsContent />
    </ProtectedRoute>
  );
}
