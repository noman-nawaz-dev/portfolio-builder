'use client';

import { useState, useEffect } from 'react';
import { useMutation } from '@apollo/client';
import { useRouter } from 'next/navigation';
import { REGISTER } from '@/lib/graphql/operations';
import { useAuth } from '@/lib/AuthContext';
import { AuthForm } from '@/components/AuthForm';
import { Input } from '@/components/ui';

export default function RegisterPage() {
  const router = useRouter();
  const { login: authLogin, isAuthenticated } = useAuth();
  const [formData, setFormData] = useState({
    name: '',
    username: '',
    email: '',
    password: '',
  });
  const [error, setError] = useState('');

  // Redirect if already authenticated
  useEffect(() => {
    if (isAuthenticated) {
      router.push('/dashboard');
    }
  }, [isAuthenticated, router]);

  const [register, { loading }] = useMutation(REGISTER, {
    onCompleted: async (data) => {
      await authLogin(data.register.accessToken, data.register.user);
      router.push('/templates');
    },
    onError: (err) => {
      setError(err.message);
    },
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    await register({
      variables: formData,
    });
  };

  return (
    <AuthForm
      title="Create Account"
      subtitle="Start building your portfolio today"
      onSubmit={handleSubmit}
      loading={loading}
      error={error}
      footerText="Already have an account?"
      footerLinkText="Log in"
      footerLinkHref="/login"
    >
      <Input
        type="text"
        id="name"
        label="Full Name"
        required
        value={formData.name}
        onChange={(e) => setFormData({ ...formData, name: e.target.value })}
        placeholder="John Doe"
      />

      <Input
        type="text"
        id="username"
        label="Username"
        required
        value={formData.username}
        onChange={(e) => setFormData({ ...formData, username: e.target.value })}
        placeholder="yourportfolio"
        helperText={`Your portfolio will be at: yourapp.com/${formData.username || 'username'}`}
      />

      <Input
        type="email"
        id="email"
        label="Email"
        required
        value={formData.email}
        onChange={(e) => setFormData({ ...formData, email: e.target.value })}
        placeholder="your@email.com"
      />

      <Input
        type="password"
        id="password"
        label="Password"
        required
        minLength={6}
        value={formData.password}
        onChange={(e) => setFormData({ ...formData, password: e.target.value })}
        placeholder="Minimum 6 characters"
      />
    </AuthForm>
  );
}
