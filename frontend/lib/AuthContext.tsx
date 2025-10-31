'use client';

import { createContext, useContext, useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { useApolloClient } from '@apollo/client';
import { getToken, removeToken, isAuthenticated } from './auth';

interface User {
  id: string;
  email: string;
  username: string;
  name: string;
}

interface AuthContextType {
  isAuthenticated: boolean;
  user: User | null;
  login: (token: string, user: User) => void;
  logout: () => void;
  loading: boolean;
  setUser: (user: User | null) => void;
}

const AuthContext = createContext<AuthContextType>({
  isAuthenticated: false,
  user: null,
  login: () => {},
  logout: () => {},
  loading: true,
  setUser: () => {},
});

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [authenticated, setAuthenticated] = useState(false);
  const [user, setUserState] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);
  const router = useRouter();
  const apolloClient = useApolloClient();

  useEffect(() => {
    // Check authentication on mount
    const isAuth = isAuthenticated();
    setAuthenticated(isAuth);
    
    // Load user from localStorage if authenticated
    if (isAuth && typeof window !== 'undefined') {
      const storedUser = localStorage.getItem('user');
      if (storedUser) {
        try {
          setUserState(JSON.parse(storedUser));
        } catch (error) {
          console.error('Failed to parse stored user:', error);
        }
      }
    }
    setLoading(false);
  }, []);

  const setUser = (userData: User | null) => {
    setUserState(userData);
    if (userData && typeof window !== 'undefined') {
      localStorage.setItem('user', JSON.stringify(userData));
    } else if (typeof window !== 'undefined') {
      localStorage.removeItem('user');
    }
  };

  const login = async (token: string, userData: User) => {
    if (typeof window !== 'undefined') {
      // Clear Apollo cache before logging in new user
      await apolloClient.clearStore();
      localStorage.setItem('token', token);
      localStorage.setItem('user', JSON.stringify(userData));
      setAuthenticated(true);
      setUserState(userData);
    }
  };

  const logout = async () => {
    removeToken();
    if (typeof window !== 'undefined') {
      localStorage.removeItem('user');
    }
    setAuthenticated(false);
    setUserState(null);
    // Clear Apollo cache on logout
    await apolloClient.clearStore();
    router.push('/');
  };

  return (
    <AuthContext.Provider value={{ isAuthenticated: authenticated, user, login, logout, loading, setUser }}>
      {children}
    </AuthContext.Provider>
  );
}

export const useAuth = () => useContext(AuthContext);
