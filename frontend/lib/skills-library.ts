// Comprehensive skills library organized by template category

export interface Skill {
  name: string;
  category: string;
  icon: string;
  level?: number;
}

// Developer/Engineer Skills
export const developerSkills: Skill[] = [
  // Frontend
  { name: 'React', category: 'Frontend', icon: '⚛️', level: 85 },
  { name: 'Vue.js', category: 'Frontend', icon: '💚', level: 80 },
  { name: 'Angular', category: 'Frontend', icon: '🅰️', level: 75 },
  { name: 'Next.js', category: 'Frontend', icon: '▲', level: 85 },
  { name: 'TypeScript', category: 'Frontend', icon: '📘', level: 90 },
  { name: 'JavaScript', category: 'Frontend', icon: '📜', level: 95 },
  { name: 'HTML5', category: 'Frontend', icon: '🌐', level: 95 },
  { name: 'CSS3', category: 'Frontend', icon: '🎨', level: 90 },
  { name: 'Tailwind CSS', category: 'Frontend', icon: '💨', level: 85 },
  { name: 'SASS/SCSS', category: 'Frontend', icon: '💅', level: 80 },
  { name: 'Redux', category: 'Frontend', icon: '🔄', level: 80 },
  { name: 'Webpack', category: 'Frontend', icon: '📦', level: 75 },
  
  // Backend
  { name: 'Node.js', category: 'Backend', icon: '🟢', level: 85 },
  { name: 'Express.js', category: 'Backend', icon: '🚂', level: 85 },
  { name: 'NestJS', category: 'Backend', icon: '🐱', level: 80 },
  { name: 'Python', category: 'Backend', icon: '🐍', level: 85 },
  { name: 'Django', category: 'Backend', icon: '🎸', level: 80 },
  { name: 'Flask', category: 'Backend', icon: '🧪', level: 75 },
  { name: 'Ruby on Rails', category: 'Backend', icon: '💎', level: 75 },
  { name: 'PHP', category: 'Backend', icon: '🐘', level: 80 },
  { name: 'Laravel', category: 'Backend', icon: '🔺', level: 80 },
  { name: 'Java', category: 'Backend', icon: '☕', level: 80 },
  { name: 'Spring Boot', category: 'Backend', icon: '🍃', level: 75 },
  { name: 'Go', category: 'Backend', icon: '🐹', level: 75 },
  { name: 'Rust', category: 'Backend', icon: '🦀', level: 70 },
  
  // Database
  { name: 'PostgreSQL', category: 'Database', icon: '🐘', level: 85 },
  { name: 'MongoDB', category: 'Database', icon: '🍃', level: 85 },
  { name: 'MySQL', category: 'Database', icon: '🐬', level: 85 },
  { name: 'Redis', category: 'Database', icon: '🔴', level: 80 },
  { name: 'Firebase', category: 'Database', icon: '🔥', level: 80 },
  { name: 'Prisma', category: 'Database', icon: '◭', level: 85 },
  { name: 'GraphQL', category: 'Database', icon: '◈', level: 85 },
  
  // DevOps
  { name: 'Docker', category: 'DevOps', icon: '🐳', level: 85 },
  { name: 'Kubernetes', category: 'DevOps', icon: '☸️', level: 75 },
  { name: 'AWS', category: 'DevOps', icon: '☁️', level: 80 },
  { name: 'Azure', category: 'DevOps', icon: '🔷', level: 75 },
  { name: 'Google Cloud', category: 'DevOps', icon: '☁️', level: 75 },
  { name: 'CI/CD', category: 'DevOps', icon: '🔄', level: 80 },
  { name: 'Git', category: 'DevOps', icon: '📚', level: 90 },
  { name: 'GitHub Actions', category: 'DevOps', icon: '⚡', level: 80 },
  { name: 'Jenkins', category: 'DevOps', icon: '🏗️', level: 75 },
  
  // Mobile
  { name: 'React Native', category: 'Mobile', icon: '📱', level: 80 },
  { name: 'Flutter', category: 'Mobile', icon: '🦋', level: 75 },
  { name: 'Swift', category: 'Mobile', icon: '🍎', level: 75 },
  { name: 'Kotlin', category: 'Mobile', icon: '🤖', level: 75 },
  
  // Testing
  { name: 'Jest', category: 'Testing', icon: '🃏', level: 85 },
  { name: 'Cypress', category: 'Testing', icon: '🌲', level: 80 },
  { name: 'Selenium', category: 'Testing', icon: '🧪', level: 75 },
  { name: 'Unit Testing', category: 'Testing', icon: '✅', level: 85 },
];

// Designer Skills
export const designerSkills: Skill[] = [
  // Design Tools
  { name: 'Figma', category: 'Design Tools', icon: '🎨', level: 90 },
  { name: 'Adobe XD', category: 'Design Tools', icon: '🅰️', level: 85 },
  { name: 'Sketch', category: 'Design Tools', icon: '💎', level: 85 },
  { name: 'Adobe Photoshop', category: 'Design Tools', icon: '🖼️', level: 90 },
  { name: 'Adobe Illustrator', category: 'Design Tools', icon: '✏️', level: 85 },
  { name: 'Adobe After Effects', category: 'Design Tools', icon: '🎬', level: 80 },
  { name: 'Canva', category: 'Design Tools', icon: '🎨', level: 85 },
  { name: 'InVision', category: 'Design Tools', icon: '💡', level: 80 },
  
  // UI/UX
  { name: 'UI Design', category: 'UI/UX', icon: '🖥️', level: 90 },
  { name: 'UX Design', category: 'UI/UX', icon: '👤', level: 90 },
  { name: 'User Research', category: 'UI/UX', icon: '🔍', level: 85 },
  { name: 'Wireframing', category: 'UI/UX', icon: '📐', level: 90 },
  { name: 'Prototyping', category: 'UI/UX', icon: '🔧', level: 90 },
  { name: 'Interaction Design', category: 'UI/UX', icon: '✨', level: 85 },
  { name: 'Design Systems', category: 'UI/UX', icon: '📚', level: 85 },
  { name: 'Accessibility', category: 'UI/UX', icon: '♿', level: 80 },
  
  // Visual Design
  { name: 'Typography', category: 'Visual Design', icon: '🔤', level: 90 },
  { name: 'Color Theory', category: 'Visual Design', icon: '🌈', level: 90 },
  { name: 'Branding', category: 'Visual Design', icon: '🏷️', level: 85 },
  { name: 'Logo Design', category: 'Visual Design', icon: '⭐', level: 85 },
  { name: 'Icon Design', category: 'Visual Design', icon: '🎯', level: 85 },
  { name: 'Illustration', category: 'Visual Design', icon: '🖌️', level: 80 },
  { name: 'Motion Graphics', category: 'Visual Design', icon: '🎞️', level: 75 },
  
  // Web Design
  { name: 'Responsive Design', category: 'Web Design', icon: '📱', level: 90 },
  { name: 'Mobile Design', category: 'Web Design', icon: '📲', level: 85 },
  { name: 'Web Animation', category: 'Web Design', icon: '✨', level: 80 },
  { name: 'HTML/CSS', category: 'Web Design', icon: '🌐', level: 80 },
];

// Marketer Skills
export const marketerSkills: Skill[] = [
  // Digital Marketing
  { name: 'SEO', category: 'Digital Marketing', icon: '🔍', level: 90 },
  { name: 'SEM', category: 'Digital Marketing', icon: '💰', level: 85 },
  { name: 'Google Ads', category: 'Digital Marketing', icon: '📢', level: 85 },
  { name: 'Facebook Ads', category: 'Digital Marketing', icon: '📘', level: 85 },
  { name: 'Email Marketing', category: 'Digital Marketing', icon: '📧', level: 90 },
  { name: 'Content Marketing', category: 'Digital Marketing', icon: '📝', level: 90 },
  { name: 'Influencer Marketing', category: 'Digital Marketing', icon: '👥', level: 80 },
  { name: 'Affiliate Marketing', category: 'Digital Marketing', icon: '🤝', level: 80 },
  
  // Social Media
  { name: 'Social Media Marketing', category: 'Social Media', icon: '📱', level: 90 },
  { name: 'Instagram Marketing', category: 'Social Media', icon: '📷', level: 85 },
  { name: 'LinkedIn Marketing', category: 'Social Media', icon: '💼', level: 85 },
  { name: 'Twitter Marketing', category: 'Social Media', icon: '🐦', level: 80 },
  { name: 'TikTok Marketing', category: 'Social Media', icon: '🎵', level: 80 },
  { name: 'YouTube Marketing', category: 'Social Media', icon: '📹', level: 85 },
  { name: 'Community Management', category: 'Social Media', icon: '👥', level: 85 },
  
  // Analytics
  { name: 'Google Analytics', category: 'Analytics', icon: '📊', level: 90 },
  { name: 'Data Analysis', category: 'Analytics', icon: '📈', level: 85 },
  { name: 'Marketing Analytics', category: 'Analytics', icon: '📉', level: 85 },
  { name: 'Conversion Optimization', category: 'Analytics', icon: '🎯', level: 85 },
  { name: 'A/B Testing', category: 'Analytics', icon: '🧪', level: 85 },
  
  // Tools
  { name: 'HubSpot', category: 'Marketing Tools', icon: '🔧', level: 85 },
  { name: 'Mailchimp', category: 'Marketing Tools', icon: '📬', level: 85 },
  { name: 'Hootsuite', category: 'Marketing Tools', icon: '🦉', level: 80 },
  { name: 'Buffer', category: 'Marketing Tools', icon: '📲', level: 80 },
  { name: 'Canva', category: 'Marketing Tools', icon: '🎨', level: 85 },
  { name: 'WordPress', category: 'Marketing Tools', icon: '📝', level: 85 },
  
  // Strategy
  { name: 'Marketing Strategy', category: 'Strategy', icon: '🎯', level: 90 },
  { name: 'Brand Strategy', category: 'Strategy', icon: '🏷️', level: 85 },
  { name: 'Growth Hacking', category: 'Strategy', icon: '🚀', level: 85 },
  { name: 'Customer Journey', category: 'Strategy', icon: '🗺️', level: 85 },
  { name: 'Market Research', category: 'Strategy', icon: '🔬', level: 85 },
  { name: 'Copywriting', category: 'Strategy', icon: '✍️', level: 90 },
];

// General/Creative Skills
export const generalSkills: Skill[] = [
  // Soft Skills
  { name: 'Communication', category: 'Soft Skills', icon: '💬', level: 90 },
  { name: 'Leadership', category: 'Soft Skills', icon: '👑', level: 85 },
  { name: 'Teamwork', category: 'Soft Skills', icon: '🤝', level: 90 },
  { name: 'Problem Solving', category: 'Soft Skills', icon: '🧩', level: 90 },
  { name: 'Critical Thinking', category: 'Soft Skills', icon: '🤔', level: 85 },
  { name: 'Time Management', category: 'Soft Skills', icon: '⏰', level: 85 },
  { name: 'Project Management', category: 'Soft Skills', icon: '📋', level: 85 },
  { name: 'Agile/Scrum', category: 'Soft Skills', icon: '🏃', level: 85 },
  
  // Creative
  { name: 'Creativity', category: 'Creative', icon: '💡', level: 90 },
  { name: 'Photography', category: 'Creative', icon: '📸', level: 80 },
  { name: 'Video Editing', category: 'Creative', icon: '🎬', level: 80 },
  { name: 'Writing', category: 'Creative', icon: '✍️', level: 85 },
  { name: 'Public Speaking', category: 'Creative', icon: '🎤', level: 80 },
  { name: 'Presentation', category: 'Creative', icon: '📊', level: 85 },
];

// Function to get skills by template category
export function getSkillsByTemplate(templateCategory: string): Skill[] {
  const category = templateCategory.toLowerCase();
  
  if (category.includes('engineer') || category.includes('developer') || category.includes('tech')) {
    return [...developerSkills, ...generalSkills];
  } else if (category.includes('design') || category.includes('creative')) {
    return [...designerSkills, ...generalSkills];
  } else if (category.includes('market') || category.includes('business')) {
    return [...marketerSkills, ...generalSkills];
  }
  
  // Default/General: return only general skills and a small mix of others
  return [
    ...generalSkills,
    // Add a few popular skills from each category for versatility
    ...developerSkills.filter(s => ['JavaScript', 'HTML5', 'CSS3', 'React'].includes(s.name)),
    ...designerSkills.filter(s => ['Figma', 'Adobe Photoshop', 'Canva'].includes(s.name)),
    ...marketerSkills.filter(s => ['SEO', 'Content Marketing', 'Social Media Marketing'].includes(s.name)),
  ];
}

// Function to search skills
export function searchSkills(query: string, templateCategory?: string): Skill[] {
  const allSkills = templateCategory 
    ? getSkillsByTemplate(templateCategory)
    : [...developerSkills, ...designerSkills, ...marketerSkills, ...generalSkills];
  
  if (!query) return allSkills;
  
  const lowerQuery = query.toLowerCase();
  return allSkills.filter(skill => 
    skill.name.toLowerCase().includes(lowerQuery) ||
    skill.category.toLowerCase().includes(lowerQuery)
  );
}
