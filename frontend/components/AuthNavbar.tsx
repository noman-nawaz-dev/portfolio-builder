'use client';

import Link from 'next/link';
import { usePathname, useRouter } from 'next/navigation';
import { useAuth } from '@/lib/AuthContext';
import { useState, useEffect, useRef } from 'react';

export default function AuthNavbar() {
  const pathname = usePathname();
  const router = useRouter();
  const { logout, isAuthenticated, user } = useAuth();
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsDropdownOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const navLinks = [
    { href: '/dashboard', label: 'Dashboard', icon: '📊' },
    { href: '/templates', label: 'Templates', icon: '🎨' },
  ];

  return (
    <header className="bg-white/80 backdrop-blur-md shadow-sm sticky top-0 z-50 border-b border-neutral-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Logo */}
          <Link 
            href="/" 
            className="text-xl sm:text-2xl font-bold bg-gradient-to-r from-teal-700 to-emerald-600 bg-clip-text text-transparent hover:scale-105 transition-transform"
          >
            Portfolio Builder
          </Link>

          {/* Navigation Links - Hidden on mobile */}
          <nav className="hidden md:flex items-center space-x-1">
            {navLinks.map((link) => {
              const isActive = pathname === link.href;
              return (
                <Link
                  key={link.href}
                  href={link.href}
                  className={`px-4 py-2 rounded-lg font-medium transition-all ${
                    isActive
                      ? 'bg-gradient-to-r from-teal-700 to-emerald-600 text-white shadow-md'
                      : 'text-neutral-700 hover:bg-neutral-100'
                  }`}
                >
                  <span className="mr-2">{link.icon}</span>
                  {link.label}
                </Link>
              );
            })}
          </nav>

          {/* User Menu */}
          <div className="flex items-center gap-3 sm:gap-4">
            {isAuthenticated && (
              <div className="relative" ref={dropdownRef}>
                <button
                  onClick={() => setIsDropdownOpen(!isDropdownOpen)}
                  className="flex items-center gap-2 px-3 py-1.5 bg-gradient-to-r from-indigo-50 to-purple-50 rounded-full border border-indigo-200 hover:border-indigo-300 transition-all"
                >
                  <span className="text-xl">👤</span>
                  <span className="text-sm font-medium text-neutral-700 hidden sm:inline">
                    {user?.name || 'User'}
                  </span>
                  <svg 
                    className={`w-4 h-4 text-neutral-600 transition-transform ${isDropdownOpen ? 'rotate-180' : ''}`}
                    fill="none" 
                    stroke="currentColor" 
                    viewBox="0 0 24 24"
                  >
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                  </svg>
                </button>

                {/* Dropdown Menu */}
                {isDropdownOpen && (
                  <div className="absolute right-0 mt-2 w-56 bg-white rounded-xl shadow-xl border border-neutral-200 py-2 z-50">
                    <div className="px-4 py-3 border-b border-neutral-100">
                      <p className="text-sm font-semibold text-neutral-900">{user?.name || 'User'}</p>
                      <p className="text-xs text-neutral-500 mt-0.5">Manage your account</p>
                    </div>
                    
                    <button
                      onClick={() => {
                        setIsDropdownOpen(false);
                        router.push('/settings');
                      }}
                      className="w-full px-4 py-2.5 text-left text-sm text-neutral-700 hover:bg-indigo-50 transition-colors flex items-center gap-3"
                    >
                      <span className="text-lg">⚙️</span>
                      <span className="font-medium">Settings</span>
                    </button>
                    
                    <div className="border-t border-neutral-100 mt-1 pt-1">
                      <button
                        onClick={() => {
                          setIsDropdownOpen(false);
                          logout();
                        }}
                        className="w-full px-4 py-2.5 text-left text-sm text-red-600 hover:bg-red-50 transition-colors flex items-center gap-3"
                      >
                        <span className="text-lg">🚪</span>
                        <span className="font-medium">Logout</span>
                      </button>
                    </div>
                  </div>
                )}
              </div>
            )}
          </div>
        </div>

        {/* Mobile Navigation */}
        <nav className="md:hidden flex items-center gap-2 pb-3 overflow-x-auto">
          {navLinks.map((link) => {
            const isActive = pathname === link.href;
            return (
              <Link
                key={link.href}
                href={link.href}
                className={`px-4 py-2 rounded-lg font-medium whitespace-nowrap text-sm transition-all ${
                  isActive
                    ? 'bg-gradient-to-r from-teal-700 to-emerald-600 text-white shadow-md'
                    : 'text-neutral-700 hover:bg-neutral-100'
                }`}
              >
                <span className="mr-1.5">{link.icon}</span>
                {link.label}
              </Link>
            );
          })}
        </nav>
      </div>
    </header>
  );
}
