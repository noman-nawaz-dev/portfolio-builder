'use client';

import { useState, useEffect } from 'react';
import { useQuery, useMutation } from '@apollo/client';
import { useRouter, useSearchParams } from 'next/navigation';
import { ProtectedRoute } from '@/lib/ProtectedRoute';
import AuthLayout from '@/components/AuthLayout';
import ImageUpload from '@/components/ImageUpload';
import { LoadingScreen } from '@/components/ui';
import {
  GET_PORTFOLIO,
  UPDATE_PORTFOLIO_HERO,
  UPDATE_PORTFOLIO_ABOUT,
  UPDATE_PORTFOLIO_SKILLS,
  UPDATE_PORTFOLIO_PROJECTS,
  UPDATE_PORTFOLIO_CONTACT,
} from '@/lib/graphql/operations';

type Tab = 'hero' | 'about' | 'skills' | 'projects' | 'contact';

function EditorContent() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const portfolioId = searchParams.get('portfolio');
  const [activeTab, setActiveTab] = useState<Tab>('hero');
  
  const { data, loading, refetch } = useQuery(GET_PORTFOLIO, {
    variables: { portfolioId },
    skip: !portfolioId,
  });

  const [updateHero, { loading: heroLoading }] = useMutation(UPDATE_PORTFOLIO_HERO, {
    onCompleted: () => refetch(),
  });
  const [updateAbout, { loading: aboutLoading }] = useMutation(UPDATE_PORTFOLIO_ABOUT, {
    onCompleted: () => refetch(),
  });
  const [updateSkills, { loading: skillsLoading }] = useMutation(UPDATE_PORTFOLIO_SKILLS, {
    onCompleted: () => refetch(),
  });
  const [updateProjects, { loading: projectsLoading }] = useMutation(UPDATE_PORTFOLIO_PROJECTS, {
    onCompleted: () => refetch(),
  });
  const [updateContact, { loading: contactLoading }] = useMutation(UPDATE_PORTFOLIO_CONTACT, {
    onCompleted: () => refetch(),
  });

  const [heroData, setHeroData] = useState({ name: '', tagline: '', photoUrl: '' });
  const [aboutData, setAboutData] = useState({ bio: '' });
  const [skillsData, setSkillsData] = useState({ skills: '' });
  const [projectsData, setProjectsData] = useState([
    { title: '', description: '', imageUrl: '', link: '' },
    { title: '', description: '', imageUrl: '', link: '' },
    { title: '', description: '', imageUrl: '', link: '' },
  ]);
  const [contactData, setContactData] = useState({
    email: '',
    phone: '',
    linkedin: '',
    github: '',
  });

  useEffect(() => {
    if (!loading && data?.getPortfolio) {
      const p = data.getPortfolio;
      if (p.heroData) setHeroData(p.heroData);
      if (p.aboutData) setAboutData(p.aboutData);
      if (p.skillsData) {
        setSkillsData({
          skills: Array.isArray(p.skillsData.skills)
            ? p.skillsData.skills.join(', ')
            : p.skillsData.skills || '',
        });
      }
      if (p.projectsData) setProjectsData(p.projectsData);
      if (p.contactData) setContactData(p.contactData);
    }
  }, [loading, data]);

  const handleSaveHero = () => {
    if (!portfolioId) {
      console.error('Portfolio ID not found');
      return;
    }
    updateHero({ 
      variables: { portfolioId, data: heroData },
      onCompleted: () => setActiveTab('about'),
    });
  };

  const handleSaveAbout = () => {
    if (!portfolioId) {
      console.error('Portfolio ID not found');
      return;
    }
    updateAbout({ 
      variables: { portfolioId, data: aboutData },
      onCompleted: () => setActiveTab('skills'),
    });
  };

  const handleSaveSkills = () => {
    if (!portfolioId) {
      console.error('Portfolio ID not found');
      return;
    }
    const skillsArray = skillsData.skills.split(',').map((s) => s.trim()).filter(Boolean);
    updateSkills({ 
      variables: { portfolioId, data: { skills: skillsArray } },
      onCompleted: () => setActiveTab('projects'),
    });
  };

  const handleSaveProjects = () => {
    if (!portfolioId) {
      console.error('Portfolio ID not found');
      return;
    }
    updateProjects({ 
      variables: { portfolioId, data: projectsData.filter((p) => p.title) },
      onCompleted: () => setActiveTab('contact'),
    });
  };

  const handleSaveContact = () => {
    if (!portfolioId) {
      console.error('Portfolio ID not found');
      return;
    }
    updateContact({ 
      variables: { portfolioId, data: contactData },
      onCompleted: () => {
        router.push('/dashboard');
      },
    });
  };

  if (loading) {
    return <LoadingScreen message="Loading editor..." />;
  }

  const tabs: Tab[] = ['hero', 'about', 'skills', 'projects', 'contact'];
  const currentIndex = tabs.indexOf(activeTab);
  const progress = ((currentIndex + 1) / tabs.length) * 100;

  const portfolio = data?.getPortfolio;
  const userName = portfolio?.user?.name;

  return (
    <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-6 sm:py-8">
        {/* Editor Actions Bar */}
        <div className="mb-6 flex justify-between items-center">
          <div className="flex items-center gap-4">
            <div className="bg-white px-4 py-2 rounded-lg shadow-sm border border-gray-200">
              <p className="text-sm font-medium text-gray-600">
                Step <span className="text-indigo-600 font-bold">{currentIndex + 1}</span> of {tabs.length}
              </p>
            </div>
          </div>
          <button
            onClick={() => router.push(`/preview?portfolio=${portfolioId}`)}
            className="flex items-center gap-2 px-5 py-2.5 bg-white text-indigo-600 border-2 border-indigo-200 rounded-xl font-semibold hover:bg-indigo-50 hover:border-indigo-300 transition-all shadow-sm"
          >
            <span>👁️</span>
            <span>Preview</span>
          </button>
        </div>

        {/* Progress Bar */}
        <div className="mb-6 bg-white rounded-full h-3 shadow-inner overflow-hidden">
          <div 
            className="h-full bg-gradient-to-r from-indigo-600 to-purple-600 transition-all duration-500 rounded-full shadow-lg"
            style={{ width: `${progress}%` }}
          />
        </div>

        {/* Tabs Navigation */}
        <div className="bg-white rounded-2xl shadow-xl overflow-hidden mb-6">
          <div className="border-b border-gray-200 px-6 py-4 bg-gradient-to-r from-indigo-50 to-purple-50">
            <div className="flex items-center gap-2 overflow-x-auto scrollbar-hide">
              {tabs.map((tab, index) => {
                const isActive = activeTab === tab;
                const isCompleted = index < currentIndex;
                
                return (
                  <button
                    key={tab}
                    onClick={() => setActiveTab(tab)}
                    className={`flex items-center gap-2 px-4 py-2 rounded-lg font-medium capitalize whitespace-nowrap transition-all ${
                      isActive
                        ? 'bg-gradient-to-r from-indigo-600 to-purple-600 text-white shadow-md'
                        : isCompleted
                        ? 'bg-green-100 text-green-700 hover:bg-green-200'
                        : 'bg-white text-gray-600 hover:bg-gray-100'
                    }`}
                  >
                    <span className={`w-6 h-6 rounded-full flex items-center justify-center text-xs font-bold ${
                      isActive 
                        ? 'bg-white text-indigo-600' 
                        : isCompleted
                        ? 'bg-green-600 text-white'
                        : 'bg-gray-200 text-gray-600'
                    }`}>
                      {isCompleted ? '✓' : index + 1}
                    </span>
                    <span className="hidden sm:inline text-sm">{tab}</span>
                  </button>
                );
              })}
            </div>
          </div>

          {/* Tab Content */}
          <div className="p-6 sm:p-8 lg:p-10">
            {activeTab === 'hero' && (
              <div className="space-y-6">
                <h2 className="text-2xl font-bold mb-6">Hero Section</h2>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Your Name
                  </label>
                  <input
                    type="text"
                    value={heroData.name}
                    onChange={(e) => setHeroData({ ...heroData, name: e.target.value })}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500"
                    placeholder="John Doe"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Tagline
                  </label>
                  <input
                    type="text"
                    value={heroData.tagline}
                    onChange={(e) => setHeroData({ ...heroData, tagline: e.target.value })}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500"
                    placeholder="Full Stack Developer | Problem Solver"
                  />
                </div>
                <ImageUpload
                  value={heroData.photoUrl}
                  onChange={(url) => setHeroData({ ...heroData, photoUrl: url })}
                  label="Profile Photo"
                  multiple={false}
                />
                <button
                  onClick={handleSaveHero}
                  disabled={heroLoading}
                  className="w-full sm:w-auto bg-gradient-to-r from-indigo-600 to-purple-600 text-white px-8 py-4 rounded-xl font-semibold hover:shadow-lg transform hover:scale-105 transition-all flex items-center justify-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none"
                >
                  {heroLoading ? (
                    <>
                      <svg className="animate-spin h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                        <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                        <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                      </svg>
                      <span>Saving...</span>
                    </>
                  ) : (
                    <>
                      Save & Continue to About
                      <span>→</span>
                    </>
                  )}
                </button>
              </div>
            )}

            {activeTab === 'about' && (
              <div className="space-y-6">
                <h2 className="text-2xl font-bold mb-6">About Section</h2>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    About Me / Bio
                  </label>
                  <textarea
                    value={aboutData.bio}
                    onChange={(e) => setAboutData({ bio: e.target.value })}
                    rows={10}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500"
                    placeholder="Tell your story..."
                  />
                </div>
                <button
                  onClick={handleSaveAbout}
                  disabled={aboutLoading}
                  className="w-full sm:w-auto bg-gradient-to-r from-indigo-600 to-purple-600 text-white px-8 py-4 rounded-xl font-semibold hover:shadow-lg transform hover:scale-105 transition-all flex items-center justify-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none"
                >
                  {aboutLoading ? (
                    <>
                      <svg className="animate-spin h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                        <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                        <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                      </svg>
                      <span>Saving...</span>
                    </>
                  ) : (
                    <>
                      Save & Continue to Skills
                      <span>→</span>
                    </>
                  )}
                </button>
              </div>
            )}

            {activeTab === 'skills' && (
              <div className="space-y-6">
                <h2 className="text-2xl font-bold mb-6">Skills / Services</h2>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Skills (comma-separated)
                  </label>
                  <textarea
                    value={skillsData.skills}
                    onChange={(e) => setSkillsData({ skills: e.target.value })}
                    rows={6}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500"
                    placeholder="JavaScript, React, Node.js, Python, AWS"
                  />
                  <p className="text-sm text-gray-500 mt-2">
                    Separate each skill with a comma
                  </p>
                </div>
                <button
                  onClick={handleSaveSkills}
                  disabled={skillsLoading}
                  className="w-full sm:w-auto bg-gradient-to-r from-indigo-600 to-purple-600 text-white px-8 py-4 rounded-xl font-semibold hover:shadow-lg transform hover:scale-105 transition-all flex items-center justify-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none"
                >
                  {skillsLoading ? (
                    <>
                      <svg className="animate-spin h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                        <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                        <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                      </svg>
                      <span>Saving...</span>
                    </>
                  ) : (
                    <>
                      Save & Continue to Projects
                      <span>→</span>
                    </>
                  )}
                </button>
              </div>
            )}

            {activeTab === 'projects' && (
              <div className="space-y-6">
                <h2 className="text-2xl font-bold mb-6">Projects / Case Studies</h2>
                {projectsData.map((project, index) => (
                  <div key={index} className="border border-gray-200 rounded-lg p-6 space-y-4">
                    <h3 className="font-semibold text-lg">Project {index + 1}</h3>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Title
                      </label>
                      <input
                        type="text"
                        value={project.title}
                        onChange={(e) => {
                          const newProjects = projectsData.map((p, i) => 
                            i === index ? { ...p, title: e.target.value } : p
                          );
                          setProjectsData(newProjects);
                        }}
                        className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500"
                        placeholder="Project Title"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Description
                      </label>
                      <textarea
                        value={project.description}
                        onChange={(e) => {
                          const newProjects = projectsData.map((p, i) => 
                            i === index ? { ...p, description: e.target.value } : p
                          );
                          setProjectsData(newProjects);
                        }}
                        rows={3}
                        className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500"
                        placeholder="Brief description..."
                      />
                    </div>
                    <ImageUpload
                      value={project.imageUrl}
                      onChange={(url) => {
                        const newProjects = projectsData.map((p, i) => 
                          i === index ? { ...p, imageUrl: url } : p
                        );
                        setProjectsData(newProjects);
                      }}
                      label={`Project Image ${index + 1}`}
                      multiple={false}
                    />
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Project Link
                      </label>
                      <input
                        type="url"
                        value={project.link}
                        onChange={(e) => {
                          const newProjects = projectsData.map((p, i) => 
                            i === index ? { ...p, link: e.target.value } : p
                          );
                          setProjectsData(newProjects);
                        }}
                        className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500"
                        placeholder="https://github.com/..."
                      />
                    </div>
                  </div>
                ))}
                <button
                  onClick={handleSaveProjects}
                  disabled={projectsLoading}
                  className="w-full sm:w-auto bg-gradient-to-r from-indigo-600 to-purple-600 text-white px-8 py-4 rounded-xl font-semibold hover:shadow-lg transform hover:scale-105 transition-all flex items-center justify-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none"
                >
                  {projectsLoading ? (
                    <>
                      <svg className="animate-spin h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                        <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                        <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                      </svg>
                      <span>Saving...</span>
                    </>
                  ) : (
                    <>
                      Save & Continue to Contact
                      <span>→</span>
                    </>
                  )}
                </button>
              </div>
            )}

            {activeTab === 'contact' && (
              <div className="space-y-6">
                <h2 className="text-2xl font-bold mb-6">Contact Information</h2>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Email
                  </label>
                  <input
                    type="email"
                    value={contactData.email}
                    onChange={(e) => setContactData({ ...contactData, email: e.target.value })}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500"
                    placeholder="your@email.com"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Phone
                  </label>
                  <input
                    type="tel"
                    value={contactData.phone}
                    onChange={(e) => setContactData({ ...contactData, phone: e.target.value })}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500"
                    placeholder="+1 (555) 123-4567"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    LinkedIn URL
                  </label>
                  <input
                    type="url"
                    value={contactData.linkedin}
                    onChange={(e) => setContactData({ ...contactData, linkedin: e.target.value })}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500"
                    placeholder="https://linkedin.com/in/yourprofile"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    GitHub URL
                  </label>
                  <input
                    type="url"
                    value={contactData.github}
                    onChange={(e) => setContactData({ ...contactData, github: e.target.value })}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500"
                    placeholder="https://github.com/yourusername"
                  />
                </div>
                <button
                  onClick={handleSaveContact}
                  disabled={contactLoading}
                  className="w-full sm:w-auto bg-gradient-to-r from-indigo-600 to-purple-600 text-white px-8 py-4 rounded-xl font-semibold hover:shadow-lg transform hover:scale-105 transition-all flex items-center justify-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none"
                >
                  {contactLoading ? (
                    <>
                      <svg className="animate-spin h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                        <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                        <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                      </svg>
                      <span>Saving...</span>
                    </>
                  ) : (
                    <>
                      Save & Finish
                      <span>✓</span>
                    </>
                  )}
                </button>
              </div>
            )}
          </div>
        </div>
      </div>
  );
}

export default function EditorPage() {
  return (
    <ProtectedRoute>
      <AuthLayout>
        <EditorContent />
      </AuthLayout>
    </ProtectedRoute>
  );
}
