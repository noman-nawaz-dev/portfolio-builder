'use client';

import { useState, useEffect } from 'react';
import { useMutation } from '@apollo/client';
import { useRouter } from 'next/navigation';
import { LOGIN } from '@/lib/graphql/operations';
import { useAuth } from '@/lib/AuthContext';
import { AuthForm } from '@/components/AuthForm';
import { Input } from '@/components/ui';

export default function LoginPage() {
  const router = useRouter();
  const { login: authLogin, isAuthenticated } = useAuth();
  const [formData, setFormData] = useState({
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

  const [login, { loading }] = useMutation(LOGIN, {
    onCompleted: async (data) => {
      await authLogin(data.login.accessToken, data.login.user);
      router.push('/dashboard');
    },
    onError: (err) => {
      setError(err.message);
    },
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    await login({
      variables: formData,
    });
  };

  return (
    <AuthForm
      title="Welcome Back"
      subtitle="Log in to your account"
      onSubmit={handleSubmit}
      loading={loading}
      error={error}
      footerText="Don't have an account?"
      footerLinkText="Sign up"
      footerLinkHref="/register"
    >
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
        value={formData.password}
        onChange={(e) => setFormData({ ...formData, password: e.target.value })}
        placeholder="Enter your password"
      />
    </AuthForm>
  );
}
