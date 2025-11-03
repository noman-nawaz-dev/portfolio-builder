'use client';

import { useState, useEffect } from 'react';
import { Button, Input, Textarea } from './ui';
import ImageUpload from './ImageUpload';
import { getSkillsByTemplate, searchSkills, type Skill } from '@/lib/skills-library';
import { getCategoryColors } from '@/lib/category-colors';

interface SectionContentEditorProps {
  sectionType: string;
  content: any;
  onSave: (content: any) => void;
  onCancel: () => void;
  templateCategory?: string;
}

const getPlaceholdersByTemplate = (templateCategory: string) => {
  const placeholders = {
    engineer: {
      name: 'John Doe',
      tagline: 'Full-Stack Software Engineer | Building Scalable Solutions',
      bio: 'Passionate software engineer with 5+ years of experience in building scalable web applications using modern technologies like React, Node.js, and cloud platforms...',
      projectTitle: 'E-commerce Platform',
      projectDesc: 'A scalable e-commerce solution built with microservices architecture...',
    },
    marketer: {
      name: 'Jane Smith',
      tagline: 'Digital Marketing Strategist | Growth & Brand Expert',
      bio: 'Results-driven marketing professional with expertise in digital strategy, content marketing, and brand development. Proven track record of driving 200%+ growth...',
      projectTitle: 'Brand Campaign 2024',
      projectDesc: 'Comprehensive digital marketing campaign that increased brand awareness by 150%...',
    },
    general: {
      name: 'Alex Johnson',
      tagline: 'Creative Professional | Designer & Consultant',
      bio: 'Versatile professional with diverse experience across multiple industries. Passionate about creative problem-solving and delivering exceptional results...',
      projectTitle: 'Featured Work',
      projectDesc: 'An innovative project showcasing creative solutions and strategic thinking...',
    },
  };

  return placeholders[templateCategory as keyof typeof placeholders] || placeholders.general;
};

export default function SectionContentEditor({
  sectionType,
  content,
  onSave,
  onCancel,
  templateCategory,
}: SectionContentEditorProps) {
  const [formData, setFormData] = useState(content || {});
  const [showSkillsPicker, setShowSkillsPicker] = useState(false);
  const [skillSearchQuery, setSkillSearchQuery] = useState('');
  const [isLoading, setIsLoading] = useState(true);
  const [isSaving, setIsSaving] = useState(false);
  
  const placeholders = getPlaceholdersByTemplate(templateCategory || 'general');

  useEffect(() => {
    setFormData(content || {});
  }, [content]);

  useEffect(() => {
    // Simulate form rendering delay and set loading to false
    setIsLoading(true);
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 100);
    return () => clearTimeout(timer);
  }, [sectionType]);

  const handleChange = (path: string, value: any) => {
    const keys = path.split('.');
    const newData = { ...formData };
    let current: any = newData;

    for (let i = 0; i < keys.length - 1; i++) {
      if (!current[keys[i]]) current[keys[i]] = {};
      current = current[keys[i]];
    }

    current[keys[keys.length - 1]] = value;
    setFormData(newData);
  };

  const handleArrayChange = (path: string, index: number, value: any) => {
    const keys = path.split('.');
    const newData = JSON.parse(JSON.stringify(formData)); // Deep clone
    let current: any = newData;

    for (let i = 0; i < keys.length - 1; i++) {
      if (!current[keys[i]]) current[keys[i]] = {};
      current = current[keys[i]];
    }

    if (!Array.isArray(current[keys[keys.length - 1]])) {
      current[keys[keys.length - 1]] = [];
    }

    current[keys[keys.length - 1]][index] = value;
    setFormData(newData);
  };

  const addArrayItem = (path: string, defaultValue: any) => {
    const keys = path.split('.');
    const newData = JSON.parse(JSON.stringify(formData)); // Deep clone
    let current: any = newData;

    for (let i = 0; i < keys.length - 1; i++) {
      if (!current[keys[i]]) current[keys[i]] = {};
      current = current[keys[i]];
    }

    if (!Array.isArray(current[keys[keys.length - 1]])) {
      current[keys[keys.length - 1]] = [];
    }

    current[keys[keys.length - 1]].push(defaultValue);
    setFormData(newData);
  };

  const removeArrayItem = (path: string, index: number) => {
    const keys = path.split('.');
    const newData = JSON.parse(JSON.stringify(formData)); // Deep clone
    let current: any = newData;

    for (let i = 0; i < keys.length - 1; i++) {
      if (!current[keys[i]]) current[keys[i]] = {};
      current = current[keys[i]];
    }

    if (Array.isArray(current[keys[keys.length - 1]])) {
      current[keys[keys.length - 1]].splice(index, 1);
    }

    setFormData(newData);
  };

  const renderHeroMinimalForm = () => (
    <div className="space-y-4">
      <div>
        <label className="block text-sm font-medium mb-2">Name</label>
        <Input
          value={formData.name || ''}
          onChange={(e) => handleChange('name', e.target.value)}
          placeholder={placeholders.name}
        />
      </div>
      <div>
        <label className="block text-sm font-medium mb-2">Tagline</label>
        <Input
          value={formData.tagline || ''}
          onChange={(e) => handleChange('tagline', e.target.value)}
          placeholder={placeholders.tagline}
        />
      </div>
      <ImageUpload
        value={formData.photoUrl || ''}
        onChange={(url) => handleChange('photoUrl', url)}
        label="Profile Photo"
      />
      <div className="border-t pt-4">
        <h4 className="font-medium mb-3">Call to Action Buttons</h4>
        <div className="space-y-3">
          <div>
            <label className="block text-sm font-medium mb-2">Primary Button Text</label>
            <Input
              value={formData.cta?.primary?.text || ''}
              onChange={(e) => handleChange('cta.primary.text', e.target.value)}
              placeholder="View My Work"
            />
          </div>
          <div>
            <label className="block text-sm font-medium mb-2">Primary Button Link</label>
            <Input
              value={formData.cta?.primary?.link || ''}
              onChange={(e) => handleChange('cta.primary.link', e.target.value)}
              placeholder="#portfolio"
            />
          </div>
          <div>
            <label className="block text-sm font-medium mb-2">Secondary Button Text</label>
            <Input
              value={formData.cta?.secondary?.text || ''}
              onChange={(e) => handleChange('cta.secondary.text', e.target.value)}
              placeholder="Contact Me"
            />
          </div>
          <div>
            <label className="block text-sm font-medium mb-2">Secondary Button Link</label>
            <Input
              value={formData.cta?.secondary?.link || ''}
              onChange={(e) => handleChange('cta.secondary.link', e.target.value)}
              placeholder="#contact"
            />
          </div>
        </div>
      </div>
    </div>
  );

  const renderAboutTextForm = () => (
    <div className="space-y-4">
      <div>
        <label className="block text-sm font-medium mb-2">Title</label>
        <Input
          value={formData.title || ''}
          onChange={(e) => handleChange('title', e.target.value)}
          placeholder="About Me"
        />
      </div>
      <div>
        <label className="block text-sm font-medium mb-2">Bio</label>
        <Textarea
          value={formData.bio || ''}
          onChange={(e) => handleChange('bio', e.target.value)}
          placeholder={placeholders.bio}
          rows={6}
        />
      </div>
      <div>
        <label className="block text-sm font-medium mb-2">Highlights</label>
        {(formData.highlights || []).map((highlight: string, index: number) => (
          <div key={index} className="flex gap-2 mb-2">
            <Input
              value={highlight}
              onChange={(e) => handleArrayChange('highlights', index, e.target.value)}
              placeholder="Achievement or highlight"
            />
            <Button
              variant="outline"
              onClick={() => removeArrayItem('highlights', index)}
            >
              Remove
            </Button>
          </div>
        ))}
        <Button
          variant="outline"
          onClick={() => addArrayItem('highlights', '')}
          className="w-full"
        >
          + Add Highlight
        </Button>
      </div>
    </div>
  );

  const renderSkillsCardsForm = () => (
    <div className="space-y-4">
      <div>
        <label className="block text-sm font-medium mb-2">Title</label>
        <Input
          value={formData.title || ''}
          onChange={(e) => handleChange('title', e.target.value)}
          placeholder="My Skills"
        />
      </div>
      <div>
        <label className="block text-sm font-medium mb-2">Skills</label>
        
        {/* Always show "Choose from Library" button at the top */}
        <div className="mb-3">
          <Button
            onClick={() => setShowSkillsPicker(true)}
            className="w-full bg-indigo-600 hover:bg-indigo-700 text-white font-semibold shadow-md"
          >
            📚 Choose from Library
          </Button>
        </div>

        {/* Show empty state if no skills */}
        {(!formData.skills || formData.skills.length === 0) ? (
          <div className="border-2 border-dashed border-gray-300 rounded-lg p-8 text-center">
            <div className="mb-4">
              <span className="text-4xl">💡</span>
            </div>
            <h4 className="font-semibold text-gray-700 mb-2">No Skills Added Yet</h4>
            <p className="text-sm text-gray-500 mb-6">
              Choose from the library above or add a custom skill below
            </p>
            <div className="max-w-md mx-auto">
              <Button
                variant="outline"
                onClick={() =>
                  addArrayItem('skills', { name: '', level: 80, category: '', icon: '⭐' })
                }
                className="w-full"
              >
                ➕ Add Custom Skill
              </Button>
            </div>
          </div>
        ) : (
          <>
            {/* Show existing skills */}
            {(formData.skills || []).map((skill: any, index: number) => (
              <div key={index} className="border rounded-lg p-4 mb-3 bg-white">
                <div className="space-y-3">
                  <div className="flex items-center gap-3 mb-2">
                    <span className="text-2xl">{skill.icon || '⭐'}</span>
                    <div className="flex-1">
                      <div className="font-semibold text-gray-900">{skill.name || 'Unnamed Skill'}</div>
                      <div className="text-sm text-gray-500">{skill.category || 'Uncategorized'}</div>
                    </div>
                    <div className="text-sm font-medium text-gray-700">{skill.level || 0}%</div>
                  </div>
                  <div>
                    <label className="block text-xs font-medium mb-1">Skill Name</label>
                    <Input
                      value={skill.name || ''}
                      onChange={(e) => {
                        const newSkill = { ...skill, name: e.target.value };
                        handleArrayChange('skills', index, newSkill);
                      }}
                      placeholder="JavaScript"
                    />
                  </div>
                  <div className="grid grid-cols-2 gap-2">
                    <div>
                      <label className="block text-xs font-medium mb-1">Category</label>
                      <Input
                        value={skill.category || ''}
                        onChange={(e) => {
                          const newSkill = { ...skill, category: e.target.value };
                          handleArrayChange('skills', index, newSkill);
                        }}
                        placeholder="Frontend"
                      />
                    </div>
                    <div>
                      <label className="block text-xs font-medium mb-1">Icon/Emoji</label>
                      <Input
                        value={skill.icon || ''}
                        onChange={(e) => {
                          const newSkill = { ...skill, icon: e.target.value };
                          handleArrayChange('skills', index, newSkill);
                        }}
                        placeholder="⭐"
                      />
                    </div>
                  </div>
                  <div>
                    <label className="block text-xs font-medium mb-1">Level (0-100)</label>
                    <input
                      type="range"
                      min="0"
                      max="100"
                      value={skill.level || 50}
                      onChange={(e) => {
                        const newSkill = { ...skill, level: parseInt(e.target.value) };
                        handleArrayChange('skills', index, newSkill);
                      }}
                      className="w-full"
                    />
                    <div className="text-center text-sm text-gray-600">{skill.level || 50}%</div>
                  </div>
                  <Button
                    variant="outline"
                    onClick={() => removeArrayItem('skills', index)}
                    className="w-full text-red-600 hover:bg-red-50"
                  >
                    Remove Skill
                  </Button>
                </div>
              </div>
            ))}
            {/* Add custom skill button after skills are added */}
            <Button
              variant="outline"
              onClick={() =>
                addArrayItem('skills', { name: '', level: 80, category: '', icon: '⭐' })
              }
              className="w-full"
            >
              ➕ Add Custom Skill
            </Button>
          </>
        )}
      </div>
    </div>
  );

  const renderPortfolioGridForm = () => (
    <div className="space-y-4">
      <div>
        <label className="block text-sm font-medium mb-2">Title</label>
        <Input
          value={formData.title || ''}
          onChange={(e) => handleChange('title', e.target.value)}
          placeholder="My Projects"
        />
      </div>
      <div>
        <label className="block text-sm font-medium mb-2">Projects</label>
        {(formData.items || []).map((item: any, index: number) => (
          <div key={index} className="border rounded-lg p-4 mb-3">
            <div className="space-y-3">
              <div>
                <label className="block text-xs font-medium mb-1">Project Title</label>
                <Input
                  value={item.title || ''}
                  onChange={(e) => {
                    const newItem = { ...item, title: e.target.value };
                    handleArrayChange('items', index, newItem);
                  }}
                  placeholder={placeholders.projectTitle}
                />
              </div>
              <div>
                <label className="block text-xs font-medium mb-1">Description</label>
                <Textarea
                  value={item.description || ''}
                  onChange={(e) => {
                    const newItem = { ...item, description: e.target.value };
                    handleArrayChange('items', index, newItem);
                  }}
                  placeholder={placeholders.projectDesc}
                  rows={3}
                />
              </div>
              <ImageUpload
                value={item.imageUrl || ''}
                onChange={(url) => {
                  const newItem = { ...item, imageUrl: url };
                  handleArrayChange('items', index, newItem);
                }}
                label={`Project Image ${index + 1}`}
              />
              <div>
                <label className="block text-xs font-medium mb-1">Project Link</label>
                <Input
                  value={item.link || ''}
                  onChange={(e) => {
                    const newItem = { ...item, link: e.target.value };
                    handleArrayChange('items', index, newItem);
                  }}
                  placeholder="https://project-url.com"
                />
              </div>
              <div>
                <label className="block text-xs font-medium mb-1">Tags (comma separated)</label>
                <Input
                  value={(item.tags || []).join(', ')}
                  onChange={(e) => {
                    const tags = e.target.value.split(',').map((t) => t.trim());
                    const newItem = { ...item, tags };
                    handleArrayChange('items', index, newItem);
                  }}
                  placeholder="React, TypeScript, Node.js"
                />
              </div>
              <Button
                variant="outline"
                onClick={() => removeArrayItem('items', index)}
                className="w-full"
              >
                Remove Project
              </Button>
            </div>
          </div>
        ))}
        <Button
          variant="outline"
          onClick={() =>
            addArrayItem('items', {
              title: '',
              description: '',
              imageUrl: '',
              tags: [],
              link: '',
            })
          }
          className="w-full"
        >
          + Add Project
        </Button>
      </div>
    </div>
  );

  const renderContactFormForm = () => (
    <div className="space-y-4">
      <div>
        <label className="block text-sm font-medium mb-2">Title</label>
        <Input
          value={formData.title || ''}
          onChange={(e) => handleChange('title', e.target.value)}
          placeholder="Get In Touch"
        />
      </div>
      <div>
        <label className="block text-sm font-medium mb-2">Subtitle</label>
        <Input
          value={formData.subtitle || ''}
          onChange={(e) => handleChange('subtitle', e.target.value)}
          placeholder="Let's work together"
        />
      </div>
      <div>
        <label className="block text-sm font-medium mb-2">Email</label>
        <Input
          type="email"
          value={formData.email || ''}
          onChange={(e) => handleChange('email', e.target.value)}
          placeholder="your@email.com"
        />
      </div>
      <div>
        <label className="block text-sm font-medium mb-2">Phone (optional)</label>
        <Input
          value={formData.phone || ''}
          onChange={(e) => handleChange('phone', e.target.value)}
          placeholder="+1 (555) 123-4567"
        />
      </div>
      <div className="flex items-center gap-2">
        <input
          type="checkbox"
          id="showForm"
          checked={formData.showForm !== false}
          onChange={(e) => handleChange('showForm', e.target.checked)}
          className="rounded"
        />
        <label htmlFor="showForm" className="text-sm font-medium">
          Show contact form
        </label>
      </div>
    </div>
  );

  const renderExperienceTimelineForm = () => (
    <div className="space-y-4">
      <div>
        <label className="block text-sm font-medium mb-2">Title</label>
        <Input
          value={formData.title || ''}
          onChange={(e) => handleChange('title', e.target.value)}
          placeholder="Experience"
        />
      </div>
      <div>
        <label className="block text-sm font-medium mb-2">Experience Items</label>
        {(formData.items || []).map((item: any, index: number) => (
          <div key={index} className="border rounded-lg p-4 mb-3">
            <div className="space-y-3">
              <div>
                <label className="block text-xs font-medium mb-1">Position/Title</label>
                <Input
                  value={item.title || ''}
                  onChange={(e) => {
                    const newItem = { ...item, title: e.target.value };
                    handleArrayChange('items', index, newItem);
                  }}
                  placeholder="Senior Developer"
                />
              </div>
              <div>
                <label className="block text-xs font-medium mb-1">Organization/Company</label>
                <Input
                  value={item.organization || ''}
                  onChange={(e) => {
                    const newItem = { ...item, organization: e.target.value };
                    handleArrayChange('items', index, newItem);
                  }}
                  placeholder="Company Name"
                />
              </div>
              <div className="grid grid-cols-2 gap-2">
                <div>
                  <label className="block text-xs font-medium mb-1">Period</label>
                  <Input
                    value={item.period || ''}
                    onChange={(e) => {
                      const newItem = { ...item, period: e.target.value };
                      handleArrayChange('items', index, newItem);
                    }}
                    placeholder="2020 - Present"
                  />
                </div>
                <div>
                  <label className="block text-xs font-medium mb-1">Location</label>
                  <Input
                    value={item.location || ''}
                    onChange={(e) => {
                      const newItem = { ...item, location: e.target.value };
                      handleArrayChange('items', index, newItem);
                    }}
                    placeholder="San Francisco, CA"
                  />
                </div>
              </div>
              <div>
                <label className="block text-xs font-medium mb-1">Type</label>
                <select
                  value={item.type || 'work'}
                  onChange={(e) => {
                    const newItem = { ...item, type: e.target.value };
                    handleArrayChange('items', index, newItem);
                  }}
                  className="w-full px-3 py-2 border rounded-lg"
                >
                  <option value="work">Work</option>
                  <option value="education">Education</option>
                  <option value="volunteer">Volunteer</option>
                </select>
              </div>
              <div>
                <label className="block text-xs font-medium mb-1">Description</label>
                <Textarea
                  value={item.description || ''}
                  onChange={(e) => {
                    const newItem = { ...item, description: e.target.value };
                    handleArrayChange('items', index, newItem);
                  }}
                  placeholder="Description of your role..."
                  rows={3}
                />
              </div>
              <div>
                <label className="block text-xs font-medium mb-1">Achievements</label>
                {(item.achievements || []).map((achievement: string, achIndex: number) => (
                  <div key={achIndex} className="flex gap-2 mb-2">
                    <Input
                      value={achievement}
                      onChange={(e) => {
                        const newAchievements = [...(item.achievements || [])];
                        newAchievements[achIndex] = e.target.value;
                        const newItem = { ...item, achievements: newAchievements };
                        handleArrayChange('items', index, newItem);
                      }}
                      placeholder="Key achievement"
                    />
                    <Button
                      variant="outline"
                      onClick={() => {
                        const newAchievements = [...(item.achievements || [])];
                        newAchievements.splice(achIndex, 1);
                        const newItem = { ...item, achievements: newAchievements };
                        handleArrayChange('items', index, newItem);
                      }}
                    >
                      ✕
                    </Button>
                  </div>
                ))}
                <Button
                  variant="outline"
                  onClick={() => {
                    const newAchievements = [...(item.achievements || []), ''];
                    const newItem = { ...item, achievements: newAchievements };
                    handleArrayChange('items', index, newItem);
                  }}
                  className="w-full mt-2"
                >
                  + Add Achievement
                </Button>
              </div>
              <Button
                variant="outline"
                onClick={() => removeArrayItem('items', index)}
                className="w-full"
              >
                Remove Experience
              </Button>
            </div>
          </div>
        ))}
        <Button
          variant="outline"
          onClick={() =>
            addArrayItem('items', {
              title: '',
              organization: '',
              period: '',
              location: '',
              type: 'work',
              description: '',
              achievements: [],
            })
          }
          className="w-full"
        >
          + Add Experience
        </Button>
      </div>
    </div>
  );

  const renderForm = () => {
    if (isLoading) {
      return (
        <div className="text-center py-12">
          <div className="inline-block animate-spin rounded-full h-12 w-12 border-b-2 border-indigo-600"></div>
          <p className="mt-4 text-gray-600">Loading form...</p>
        </div>
      );
    }

    switch (sectionType) {
      case 'hero-minimal':
        return renderHeroMinimalForm();
      case 'about-text':
        return renderAboutTextForm();
      case 'skills-cards':
        return renderSkillsCardsForm();
      case 'portfolio-grid':
        return renderPortfolioGridForm();
      case 'contact-form':
        return renderContactFormForm();
      case 'experience-timeline':
        return renderExperienceTimelineForm();
      default:
        return (
          <div className="text-center py-8 text-gray-500">
            <p>No form editor available for this section type.</p>
            <p className="text-sm mt-2">Please edit the JSON directly.</p>
          </div>
        );
    }
  };

  const availableSkills = templateCategory 
    ? searchSkills(skillSearchQuery, templateCategory)
    : searchSkills(skillSearchQuery);

  // Group skills by category
  const groupedSkills = availableSkills.reduce((acc, skill) => {
    const category = skill.category;
    if (!acc[category]) {
      acc[category] = [];
    }
    acc[category].push(skill);
    return acc;
  }, {} as Record<string, Skill[]>);

  const isSkillSelected = (skillName: string): boolean => {
    const currentSkills = formData.skills || [];
    return currentSkills.some((s: any) => s.name === skillName);
  };

  const toggleSkillFromLibrary = (skill: Skill) => {
    const currentSkills = formData.skills || [];
    const skillIndex = currentSkills.findIndex((s: any) => s.name === skill.name);
    
    if (skillIndex !== -1) {
      // Skill exists, remove it
      removeArrayItem('skills', skillIndex);
    } else {
      // Skill doesn't exist, add it
      addArrayItem('skills', skill);
    }
  };

  const handleSave = async () => {
    setIsSaving(true);
    try {
      await onSave(formData);
    } finally {
      setIsSaving(false);
    }
  };

  // Function to get color scheme based on category
  return (
    <>
      <div className="bg-white rounded-lg shadow-lg max-w-2xl w-full max-h-[80vh] overflow-hidden flex flex-col">
        <div className="p-4 border-b flex items-center justify-between">
          <h3 className="text-lg font-semibold">Edit Section Content</h3>
          <button
            onClick={onCancel}
            className="text-gray-500 hover:text-gray-700"
          >
            ✕
          </button>
        </div>
        <div className="flex-1 overflow-y-auto p-6">
          {renderForm()}
        </div>
        <div className="p-4 border-t flex justify-end gap-2">
          <Button variant="outline" onClick={onCancel} disabled={isSaving}>
            Cancel
          </Button>
          <Button onClick={handleSave} disabled={isSaving}>
            {isSaving ? (
              <>
                <div className="inline-block animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2"></div>
                Saving...
              </>
            ) : (
              'Save Changes'
            )}
          </Button>
        </div>
      </div>

      {/* Skills Library Picker Modal */}
      {showSkillsPicker && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-[60] p-4">
          <div className="bg-white rounded-xl max-w-4xl w-full max-h-[85vh] overflow-hidden flex flex-col shadow-2xl">
            <div className="p-6 border-b">
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-xl font-bold">Choose Skills from Library</h3>
                <button
                  onClick={() => {
                    setShowSkillsPicker(false);
                    setSkillSearchQuery('');
                  }}
                  className="text-gray-500 hover:text-gray-700"
                >
                  ✕
                </button>
              </div>
              <Input
                value={skillSearchQuery}
                onChange={(e) => setSkillSearchQuery(e.target.value)}
                placeholder="Search skills..."
                className="w-full"
              />
              {templateCategory && (
                <p className="text-sm text-gray-500 mt-2">
                  Showing skills relevant for: <strong>{templateCategory}</strong> portfolios
                </p>
              )}
            </div>
            <div className="flex-1 overflow-y-auto p-6">
              {Object.keys(groupedSkills).length > 0 ? (
                <div className="space-y-6">
                  {Object.entries(groupedSkills).map(([category, skills]) => {
                    const categoryColors = getCategoryColors(category);
                    return (
                      <div key={category}>
                        {/* Category Header */}
                        <div className="flex items-center gap-3 mb-3">
                          <h4 className={`text-lg font-bold ${categoryColors.text}`}>
                            {category}
                          </h4>
                          <div className="flex-1 h-px bg-gray-200"></div>
                          <span className="text-sm text-gray-500">
                            {skills.length} {skills.length === 1 ? 'skill' : 'skills'}
                          </span>
                        </div>
                        
                        {/* Skills Grid */}
                        <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
                          {skills.map((skill) => {
                            const isSelected = isSkillSelected(skill.name);
                            // Get the user's selected skill to show their custom level
                            const selectedSkill = (formData.skills || []).find((s: any) => s.name === skill.name);
                            const displayLevel = selectedSkill?.level ?? skill.level ?? 80;
                            const colors = getCategoryColors(skill.category);
                            return (
                              <button
                                key={`${skill.name}-${skill.category}`}
                                onClick={() => toggleSkillFromLibrary(skill)}
                                className="p-4 border-2 rounded-lg transition text-left group relative hover:shadow-md"
                                style={{
                                  borderColor: isSelected ? colors.borderHex : '#E5E7EB',
                                  backgroundColor: isSelected ? colors.bgHex : '#FFFFFF',
                                }}
                              >
                                {/* Selected Checkmark */}
                                {isSelected && (
                                  <div 
                                    className="absolute top-2 right-2 w-6 h-6 rounded-full flex items-center justify-center"
                                    style={{ backgroundColor: colors.progressHex }}
                                  >
                                    <svg
                                      className="w-4 h-4 text-white"
                                      fill="none"
                                      stroke="currentColor"
                                      viewBox="0 0 24 24"
                                    >
                                      <path
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                        strokeWidth={3}
                                        d="M5 13l4 4L19 7"
                                      />
                                    </svg>
                                  </div>
                                )}
                                <div className="flex items-center gap-2 mb-2">
                                  <span className="text-2xl">{skill.icon}</span>
                                  <span
                                    className={`font-semibold text-sm ${
                                      isSelected ? colors.text : `group-hover:${colors.text}`
                                    }`}
                                  >
                                    {skill.name}
                                  </span>
                                </div>
                                <div className="mt-2">
                                  <div className="flex items-center justify-between mb-1">
                                    <span className="text-xs text-gray-500">Proficiency</span>
                                    <span 
                                      className="text-xs font-semibold"
                                      style={{ color: isSelected ? colors.textHex : '#6B7280' }}
                                    >
                                      {displayLevel}%
                                    </span>
                                  </div>
                                  <div className="w-full bg-gray-200 rounded-full h-1.5">
                                    <div
                                      className="h-1.5 rounded-full transition-all"
                                      style={{ 
                                        width: `${displayLevel}%`,
                                        backgroundColor: colors.progressHex
                                      }}
                                    />
                                  </div>
                                </div>
                              </button>
                            );
                          })}
                        </div>
                      </div>
                    );
                  })}
                </div>
              ) : (
                <div className="text-center py-12 text-gray-400">
                  <p>No skills found matching "{skillSearchQuery}"</p>
                </div>
              )}
            </div>
            <div className="p-4 border-t flex justify-end">
              <Button
                variant="outline"
                onClick={() => {
                  setShowSkillsPicker(false);
                  setSkillSearchQuery('');
                }}
              >
                Done
              </Button>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
