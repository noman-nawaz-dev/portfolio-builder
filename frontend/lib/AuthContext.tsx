'use client';

import { createContext, useContext, useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { useApolloClient } from '@apollo/client';
import { getToken, removeToken, isAuthenticated } from './auth';

interface AuthContextType {
  isAuthenticated: boolean;
  login: (token: string) => void;
  logout: () => void;
  loading: boolean;
}

const AuthContext = createContext<AuthContextType>({
  isAuthenticated: false,
  login: () => {},
  logout: () => {},
  loading: true,
});

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [authenticated, setAuthenticated] = useState(false);
  const [loading, setLoading] = useState(true);
  const router = useRouter();
  const apolloClient = useApolloClient();

  useEffect(() => {
    // Check authentication on mount
    setAuthenticated(isAuthenticated());
    setLoading(false);
  }, []);

  const login = async (token: string) => {
    if (typeof window !== 'undefined') {
      // Clear Apollo cache before logging in new user
      await apolloClient.clearStore();
      localStorage.setItem('token', token);
      setAuthenticated(true);
    }
  };

  const logout = async () => {
    removeToken();
    setAuthenticated(false);
    // Clear Apollo cache on logout
    await apolloClient.clearStore();
    router.push('/');
  };

  return (
    <AuthContext.Provider value={{ isAuthenticated: authenticated, login, logout, loading }}>
      {children}
    </AuthContext.Provider>
  );
}

export const useAuth = () => useContext(AuthContext);
