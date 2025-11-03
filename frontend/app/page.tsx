'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';
import { useAuth } from '@/lib/AuthContext';
import AuthNavbar from '@/components/AuthNavbar';

export default function Home() {
  const { isAuthenticated, loading: authLoading } = useAuth();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  // Show loading while checking auth or during initial mount
  if (!mounted || authLoading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-indigo-50 via-white to-purple-50 flex items-center justify-center">
        <div className="text-xl text-gray-600">Loading...</div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-white">
      {/* Header - Show AuthNavbar if logged in, otherwise show public nav */}
      {isAuthenticated ? (
        <AuthNavbar />
      ) : (
        <header className="sticky top-0 z-50 bg-white/95 backdrop-blur-sm border-b border-gray-200">
          <nav className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
            <div className="flex justify-between items-center">
              <div className="flex items-center space-x-2">
                <div className="text-3xl font-bold bg-gradient-to-r from-indigo-600 to-purple-600 bg-clip-text text-transparent">
                  Portfolio Builder
                </div>
              </div>
              <div className="hidden md:flex items-center space-x-8">
                <Link href="#features" className="text-gray-700 hover:text-indigo-600 font-medium transition">
                  Features
                </Link>
                <Link href="#templates" className="text-gray-700 hover:text-indigo-600 font-medium transition">
                  Templates
                </Link>
                <Link href="#how-it-works" className="text-gray-700 hover:text-indigo-600 font-medium transition">
                  How It Works
                </Link>
              </div>
              <div className="flex items-center space-x-4">
                <Link href="/login" className="text-gray-700 hover:text-indigo-600 font-medium transition">
                  Login
                </Link>
                <Link
                  href="/register"
                  className="bg-gradient-to-r from-indigo-600 to-purple-600 text-white px-6 py-2.5 rounded-lg font-semibold hover:shadow-lg transform hover:scale-105 transition"
                >
                  Get Started
                </Link>
              </div>
            </div>
          </nav>
        </header>
      )}

      {/* Hero Section */}
      <main>
        <section className="relative overflow-hidden bg-gradient-to-br from-indigo-50 via-white to-purple-50">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-24 md:py-32">
            <div className="text-center">
              <div className="inline-block mb-4">
                <span className="bg-indigo-100 text-indigo-800 text-sm font-semibold px-4 py-2 rounded-full">
                  ✨ No coding required
                </span>
              </div>
              <h1 className="text-5xl md:text-6xl lg:text-7xl font-extrabold text-gray-900 leading-tight">
                Build Your Dream
                <br />
                <span className="bg-gradient-to-r from-indigo-600 to-purple-600 bg-clip-text text-transparent">
                  Portfolio in Minutes
                </span>
              </h1>
              <p className="mt-8 text-xl md:text-2xl text-gray-600 max-w-3xl mx-auto leading-relaxed">
                Create a stunning, professional portfolio website without any coding. Choose from beautiful templates, 
                customize with ease, and share your work with the world.
              </p>
              <div className="mt-12 flex flex-col sm:flex-row gap-4 justify-center items-center">
                {isAuthenticated ? (
                  <>
                    <Link
                      href="/dashboard"
                      className="w-full sm:w-auto bg-gradient-to-r from-indigo-600 to-purple-600 text-white px-10 py-4 rounded-xl text-lg font-semibold hover:shadow-2xl transform hover:scale-105 transition-all"
                    >
                      Go to Dashboard
                    </Link>
                    <Link
                      href="/templates"
                      className="w-full sm:w-auto bg-white text-gray-800 px-10 py-4 rounded-xl text-lg font-semibold border-2 border-gray-200 hover:border-indigo-600 hover:shadow-lg transition-all"
                    >
                      Create New Portfolio
                    </Link>
                  </>
                ) : (
                  <>
                    <Link
                      href="/register"
                      className="w-full sm:w-auto bg-gradient-to-r from-indigo-600 to-purple-600 text-white px-10 py-4 rounded-xl text-lg font-semibold hover:shadow-2xl transform hover:scale-105 transition-all"
                    >
                      Create Your Portfolio Free
                    </Link>
                    <Link
                      href="/templates"
                      className="w-full sm:w-auto bg-white text-gray-800 px-10 py-4 rounded-xl text-lg font-semibold border-2 border-gray-200 hover:border-indigo-600 hover:shadow-lg transition-all"
                    >
                      View Templates
                    </Link>
                  </>
                )}
              </div>
              <p className="mt-6 text-sm text-gray-500">
                🎉 Join hundreds of professionals showcasing their work
              </p>
            </div>
          </div>
          {/* Decorative elements */}
          <div className="absolute top-0 right-0 -mt-20 -mr-20 w-80 h-80 bg-purple-200 rounded-full mix-blend-multiply filter blur-3xl opacity-30 animate-blob"></div>
          <div className="absolute bottom-0 left-0 -mb-20 -ml-20 w-80 h-80 bg-indigo-200 rounded-full mix-blend-multiply filter blur-3xl opacity-30 animate-blob animation-delay-2000"></div>
        </section>

        {/* Features Section */}
        <section id="features" className="py-24 bg-white">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-16">
              <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
                Everything You Need to Shine
              </h2>
              <p className="text-xl text-gray-600 max-w-2xl mx-auto">
                Powerful features designed to make portfolio creation effortless
              </p>
            </div>
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
              <div className="group p-8 rounded-2xl bg-gradient-to-br from-indigo-50 to-white border border-indigo-100 hover:shadow-xl transition-all">
                <div className="w-14 h-14 bg-gradient-to-br from-indigo-600 to-purple-600 rounded-xl flex items-center justify-center text-3xl mb-6 group-hover:scale-110 transition-transform">
                  ⚡
                </div>
                <h3 className="text-2xl font-bold mb-3 text-gray-900">Lightning Fast</h3>
                <p className="text-gray-600 leading-relaxed">
                  Get your portfolio up and running in just 5 minutes with our intuitive form-based editor.
                </p>
              </div>
              <div className="group p-8 rounded-2xl bg-gradient-to-br from-purple-50 to-white border border-purple-100 hover:shadow-xl transition-all">
                <div className="w-14 h-14 bg-gradient-to-br from-purple-600 to-pink-600 rounded-xl flex items-center justify-center text-3xl mb-6 group-hover:scale-110 transition-transform">
                  🎨
                </div>
                <h3 className="text-2xl font-bold mb-3 text-gray-900">Beautiful Templates</h3>
                <p className="text-gray-600 leading-relaxed">
                  Choose from professionally designed templates crafted for different professions and industries.
                </p>
              </div>
              <div className="group p-8 rounded-2xl bg-gradient-to-br from-blue-50 to-white border border-blue-100 hover:shadow-xl transition-all">
                <div className="w-14 h-14 bg-gradient-to-br from-blue-600 to-cyan-600 rounded-xl flex items-center justify-center text-3xl mb-6 group-hover:scale-110 transition-transform">
                  🚀
                </div>
                <h3 className="text-2xl font-bold mb-3 text-gray-900">Instant Publishing</h3>
                <p className="text-gray-600 leading-relaxed">
                  Publish your portfolio with one click and get a shareable link to showcase your work.
                </p>
              </div>
              <div className="group p-8 rounded-2xl bg-gradient-to-br from-green-50 to-white border border-green-100 hover:shadow-xl transition-all">
                <div className="w-14 h-14 bg-gradient-to-br from-green-600 to-emerald-600 rounded-xl flex items-center justify-center text-3xl mb-6 group-hover:scale-110 transition-transform">
                  📱
                </div>
                <h3 className="text-2xl font-bold mb-3 text-gray-900">Mobile Responsive</h3>
                <p className="text-gray-600 leading-relaxed">
                  Your portfolio looks perfect on all devices - desktop, tablet, and mobile phones.
                </p>
              </div>
              <div className="group p-8 rounded-2xl bg-gradient-to-br from-orange-50 to-white border border-orange-100 hover:shadow-xl transition-all">
                <div className="w-14 h-14 bg-gradient-to-br from-orange-600 to-red-600 rounded-xl flex items-center justify-center text-3xl mb-6 group-hover:scale-110 transition-transform">
                  ✏️
                </div>
                <h3 className="text-2xl font-bold mb-3 text-gray-900">Easy Customization</h3>
                <p className="text-gray-600 leading-relaxed">
                  Update your portfolio anytime with our simple editor. No technical skills required.
                </p>
              </div>
              <div className="group p-8 rounded-2xl bg-gradient-to-br from-pink-50 to-white border border-pink-100 hover:shadow-xl transition-all">
                <div className="w-14 h-14 bg-gradient-to-br from-pink-600 to-rose-600 rounded-xl flex items-center justify-center text-3xl mb-6 group-hover:scale-110 transition-transform">
                  🔒
                </div>
                <h3 className="text-2xl font-bold mb-3 text-gray-900">Secure & Private</h3>
                <p className="text-gray-600 leading-relaxed">
                  Your data is safe with us. Control who sees your portfolio with publish/unpublish options.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* Templates Preview Section */}
        <section id="templates" className="py-24 bg-gradient-to-br from-gray-50 to-white">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-16">
              <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
                Choose Your Perfect Template
              </h2>
              <p className="text-xl text-gray-600 max-w-2xl mx-auto">
                Select from our collection of professionally designed templates
              </p>
            </div>
            <div className="grid md:grid-cols-3 gap-8">
              <div className="bg-white rounded-2xl overflow-hidden shadow-lg hover:shadow-2xl transition-all transform hover:-translate-y-2">
                <div className="h-48 bg-gradient-to-br from-blue-500 to-cyan-500 flex items-center justify-center">
                  <span className="text-white text-6xl">👨‍💻</span>
                </div>
                <div className="p-6">
                  <h3 className="text-2xl font-bold mb-2">Software Engineer</h3>
                  <p className="text-gray-600 mb-4">Perfect for developers and tech professionals</p>
                  <Link href="/templates" className="text-indigo-600 font-semibold hover:text-indigo-700">
                    View Template →
                  </Link>
                </div>
              </div>
              <div className="bg-white rounded-2xl overflow-hidden shadow-lg hover:shadow-2xl transition-all transform hover:-translate-y-2">
                <div className="h-48 bg-gradient-to-br from-purple-500 to-pink-500 flex items-center justify-center">
                  <span className="text-white text-6xl">📱</span>
                </div>
                <div className="p-6">
                  <h3 className="text-2xl font-bold mb-2">Marketing Professional</h3>
                  <p className="text-gray-600 mb-4">Showcase campaigns and creative work</p>
                  <Link href="/templates" className="text-indigo-600 font-semibold hover:text-indigo-700">
                    View Template →
                  </Link>
                </div>
              </div>
              <div className="bg-white rounded-2xl overflow-hidden shadow-lg hover:shadow-2xl transition-all transform hover:-translate-y-2">
                <div className="h-48 bg-gradient-to-br from-green-500 to-emerald-500 flex items-center justify-center">
                  <span className="text-white text-6xl">�</span>
                </div>
                <div className="p-6">
                  <h3 className="text-2xl font-bold mb-2">General Professional</h3>
                  <p className="text-gray-600 mb-4">Versatile template for any profession</p>
                  <Link href="/templates" className="text-indigo-600 font-semibold hover:text-indigo-700">
                    View Template →
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* How It Works Section */}
        <section id="how-it-works" className="py-24 bg-white">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-16">
              <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
                Get Started in 3 Simple Steps
              </h2>
              <p className="text-xl text-gray-600 max-w-2xl mx-auto">
                Your professional portfolio is just minutes away
              </p>
            </div>
            <div className="grid md:grid-cols-3 gap-12">
              <div className="text-center">
                <div className="w-20 h-20 bg-gradient-to-br from-indigo-600 to-purple-600 rounded-full flex items-center justify-center text-white text-3xl font-bold mx-auto mb-6 shadow-lg">
                  1
                </div>
                <h3 className="text-2xl font-bold mb-4">Choose a Template</h3>
                <p className="text-gray-600 leading-relaxed">
                  Browse our collection and select the template that best fits your professional style.
                </p>
              </div>
              <div className="text-center">
                <div className="w-20 h-20 bg-gradient-to-br from-purple-600 to-pink-600 rounded-full flex items-center justify-center text-white text-3xl font-bold mx-auto mb-6 shadow-lg">
                  2
                </div>
                <h3 className="text-2xl font-bold mb-4">Customize Your Content</h3>
                <p className="text-gray-600 leading-relaxed">
                  Fill in your information using our simple form editor. Add your projects, skills, and more.
                </p>
              </div>
              <div className="text-center">
                <div className="w-20 h-20 bg-gradient-to-br from-pink-600 to-red-600 rounded-full flex items-center justify-center text-white text-3xl font-bold mx-auto mb-6 shadow-lg">
                  3
                </div>
                <h3 className="text-2xl font-bold mb-4">Publish & Share</h3>
                <p className="text-gray-600 leading-relaxed">
                  Hit publish and share your unique portfolio link with employers, clients, and your network.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="py-24 bg-gradient-to-r from-indigo-600 to-purple-600">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
            <h2 className="text-4xl md:text-5xl font-bold text-white mb-6">
              {isAuthenticated ? 'Manage Your Portfolios' : 'Ready to Build Your Portfolio?'}
            </h2>
            <p className="text-xl text-indigo-100 mb-10">
              {isAuthenticated 
                ? 'Access your dashboard to view, edit, and manage all your portfolios'
                : 'Join professionals worldwide who are showcasing their work beautifully'
              }
            </p>
            <Link
              href={isAuthenticated ? '/dashboard' : '/register'}
              className="inline-block bg-white text-indigo-600 px-10 py-4 rounded-xl text-lg font-semibold hover:shadow-2xl transform hover:scale-105 transition-all"
            >
              {isAuthenticated ? 'Go to Dashboard' : 'Get Started for Free'}
            </Link>
          </div>
        </section>
      </main>

      {/* Footer */}
      <footer className="bg-gray-900 text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          <div className="grid md:grid-cols-4 gap-8 mb-8">
            <div>
              <h3 className="text-2xl font-bold bg-gradient-to-r from-indigo-400 to-purple-400 bg-clip-text text-transparent mb-4">
                Portfolio Builder
              </h3>
              <p className="text-gray-400">
                Create stunning portfolios in minutes without any coding.
              </p>
            </div>
            <div>
              <h4 className="font-semibold mb-4">Product</h4>
              <ul className="space-y-2 text-gray-400">
                <li><Link href="/templates" className="hover:text-white transition">Templates</Link></li>
                <li><Link href="#features" className="hover:text-white transition">Features</Link></li>
                <li><Link href="#how-it-works" className="hover:text-white transition">How It Works</Link></li>
              </ul>
            </div>
            <div>
              <h4 className="font-semibold mb-4">Company</h4>
              <ul className="space-y-2 text-gray-400">
                <li><a href="#" className="hover:text-white transition">About</a></li>
                <li><a href="#" className="hover:text-white transition">Blog</a></li>
                <li><a href="#" className="hover:text-white transition">Contact</a></li>
              </ul>
            </div>
            <div>
              <h4 className="font-semibold mb-4">Legal</h4>
              <ul className="space-y-2 text-gray-400">
                <li><a href="#" className="hover:text-white transition">Privacy</a></li>
                <li><a href="#" className="hover:text-white transition">Terms</a></li>
              </ul>
            </div>
          </div>
          <div className="border-t border-gray-800 pt-8 flex flex-col md:flex-row justify-between items-center">
            <p className="text-gray-400 text-sm">
              &copy; 2025 Portfolio Builder. All rights reserved.
            </p>
            <div className="flex space-x-6 mt-4 md:mt-0">
              <a href="#" className="text-gray-400 hover:text-white transition">Twitter</a>
              <a href="#" className="text-gray-400 hover:text-white transition">GitHub</a>
              <a href="#" className="text-gray-400 hover:text-white transition">LinkedIn</a>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}
