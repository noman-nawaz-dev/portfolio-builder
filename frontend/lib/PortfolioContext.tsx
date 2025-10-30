'use client';

import { createContext, useContext, useState, useEffect, ReactNode } from 'react';

interface PortfolioContextType {
  currentPortfolioId: string | null;
  setCurrentPortfolioId: (id: string | null) => void;
}

const PortfolioContext = createContext<PortfolioContextType>({
  currentPortfolioId: null,
  setCurrentPortfolioId: () => {},
});

export function PortfolioProvider({ children }: { children: ReactNode }) {
  const [currentPortfolioId, setCurrentPortfolioIdState] = useState<string | null>(null);

  // Load from localStorage on mount
  useEffect(() => {
    const savedId = localStorage.getItem('currentPortfolioId');
    if (savedId) {
      setCurrentPortfolioIdState(savedId);
    }
  }, []);

  const setCurrentPortfolioId = (id: string | null) => {
    setCurrentPortfolioIdState(id);
    if (id) {
      localStorage.setItem('currentPortfolioId', id);
    } else {
      localStorage.removeItem('currentPortfolioId');
    }
  };

  return (
    <PortfolioContext.Provider value={{ currentPortfolioId, setCurrentPortfolioId }}>
      {children}
    </PortfolioContext.Provider>
  );
}

export const usePortfolio = () => useContext(PortfolioContext);
