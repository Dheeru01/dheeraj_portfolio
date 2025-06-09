
import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';

interface Project {
  id: number;
  title: string;
  description: string;
  tech: string;
  image?: string;
  github?: string;
  live?: string;
  featured?: boolean;
}

interface Skill {
  id: number;
  name: string;
  level: number;
}

interface Experience {
  id: number;
  title: string;
  company: string;
  period: string;
  description: string;
}

interface GalleryItem {
  id: number;
  src: string;
  title: string;
  category: string;
}

interface Highlight {
  id: number;
  icon: string;
  title: string;
  description: string;
}

interface Content {
  aboutText: string;
  contactEmail: string;
  contactPhone: string;
  profileImage: string;
  resumeFile: string;
  cvFile: string;
  technologies: string[];
  projectsCompleted: number;
  yearsExperience: number;
  technologiesCount: number;
  location: string;
  githubUrl: string;
  linkedinUrl: string;
  twitterUrl: string;
}

interface PortfolioData {
  projects: Project[];
  skills: Skill[];
  experiences: Experience[];
  gallery: GalleryItem[];
  highlights: Highlight[];
  content: Content;
}

interface PortfolioContextType {
  portfolioData: PortfolioData;
  updateProjects: (projects: Project[]) => void;
  updateSkills: (skills: Skill[]) => void;
  updateExperiences: (experiences: Experience[]) => void;
  updateGallery: (gallery: GalleryItem[]) => void;
  updateHighlights: (highlights: Highlight[]) => void;
  updateContent: (content: Content) => void;
  saveChanges: () => void;
}

const defaultData: PortfolioData = {
  projects: [
    { 
      id: 1, 
      title: 'AI-Powered Task Manager', 
      description: 'A smart task management app with ML-based priority suggestions', 
      tech: 'React, Node.js, AI',
      image: 'https://images.unsplash.com/photo-1611224923853-80b023f02d71?w=500&h=300&fit=crop',
      github: 'https://github.com',
      live: 'https://example.com',
      featured: true
    },
    { 
      id: 2, 
      title: 'E-commerce Platform', 
      description: 'Full-stack shopping platform with payment integration', 
      tech: 'Next.js, MongoDB',
      image: 'https://images.unsplash.com/photo-1552664730-d307ca884978?w=500&h=300&fit=crop',
      github: 'https://github.com',
      live: 'https://example.com',
      featured: true
    }
  ],
  skills: [
    { id: 1, name: 'JavaScript', level: 90 },
    { id: 2, name: 'React', level: 85 },
    { id: 3, name: 'Python', level: 80 }
  ],
  experiences: [
    { id: 1, title: 'Software Engineer Intern', company: 'Tech Corp', period: '2024 - Present', description: 'Working on React applications and backend services' }
  ],
  gallery: [
    {
      id: 1,
      src: "https://images.unsplash.com/photo-1517180102446-f3ece451e9d8?w=400&h=300&fit=crop",
      title: "Tech Conference 2023",
      category: "Events"
    },
    {
      id: 2,
      src: "https://images.unsplash.com/photo-1542744173-8e7e53415bb0?w=400&h=300&fit=crop",
      title: "Team Building Workshop",
      category: "Team"
    }
  ],
  highlights: [
    {
      id: 1,
      icon: '<svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><polyline points="16 18 22 12 16 6"/><polyline points="8 6 2 12 8 18"/></svg>',
      title: "Full Stack Development",
      description: "Expertise in modern web technologies and frameworks"
    },
    {
      id: 2,
      icon: '<svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="m15 14 5-5-5-5"/><path d="m9 9.5c-1 0-2.5-.8-2.5-2.5a4.5 4.5 0 0 1 5.5-4.4"/><path d="m9 14.5c1 0 2.5.8 2.5 2.5a4.5 4.5 0 0 1-5.5 4.4"/></svg>',
      title: "Innovation",
      description: "Always exploring cutting-edge technologies and solutions"
    },
    {
      id: 3,
      icon: '<svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2"/><circle cx="9" cy="7" r="4"/><path d="m22 21-3-3m0 0-3-3m3 3 3 3m-3-3-3 3"/></svg>',
      title: "Team Leadership",
      description: "Leading teams to deliver exceptional results"
    },
    {
      id: 4,
      icon: '<svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="8" r="7"/><polyline points="8.21 13.89 7 23 12 20 17 23 15.79 13.88"/></svg>',
      title: "Recognition",
      description: "Multiple hackathon wins and project accolades"
    }
  ],
  content: {
    aboutText: 'Passionate software developer with expertise in modern web technologies...',
    contactEmail: 'kanukuntladheeraj@gmail.com',
    contactPhone: '+1 (555) 123-4567',
    profileImage: '',
    resumeFile: '',
    cvFile: '',
    technologies: ['React', 'Vue.js', 'Angular', 'Node.js', 'Express', 'Python', 'Django', 'Flask', 'MongoDB', 'PostgreSQL', 'MySQL', 'Redis', 'AWS', 'Docker', 'Kubernetes', 'Git'],
    projectsCompleted: 50,
    yearsExperience: 5,
    technologiesCount: 20,
    location: 'San Francisco, CA',
    githubUrl: 'https://github.com',
    linkedinUrl: 'https://linkedin.com',
    twitterUrl: 'https://twitter.com'
  }
};

const PortfolioContext = createContext<PortfolioContextType | undefined>(undefined);

export const usePortfolio = () => {
  const context = useContext(PortfolioContext);
  if (!context) {
    throw new Error('usePortfolio must be used within a PortfolioProvider');
  }
  return context;
};

const ensureDataStructure = (data: any): PortfolioData => {
  return {
    projects: Array.isArray(data?.projects) ? data.projects : defaultData.projects,
    skills: Array.isArray(data?.skills) ? data.skills : defaultData.skills,
    experiences: Array.isArray(data?.experiences) ? data.experiences : defaultData.experiences,
    gallery: Array.isArray(data?.gallery) ? data.gallery : defaultData.gallery,
    highlights: Array.isArray(data?.highlights) ? data.highlights : defaultData.highlights,
    content: {
      aboutText: data?.content?.aboutText || defaultData.content.aboutText,
      contactEmail: data?.content?.contactEmail || defaultData.content.contactEmail,
      contactPhone: data?.content?.contactPhone || defaultData.content.contactPhone,
      profileImage: data?.content?.profileImage || defaultData.content.profileImage,
      resumeFile: data?.content?.resumeFile || defaultData.content.resumeFile,
      cvFile: data?.content?.cvFile || defaultData.content.cvFile,
      technologies: Array.isArray(data?.content?.technologies) ? data.content.technologies : defaultData.content.technologies,
      projectsCompleted: data?.content?.projectsCompleted || defaultData.content.projectsCompleted,
      yearsExperience: data?.content?.yearsExperience || defaultData.content.yearsExperience,
      technologiesCount: data?.content?.technologiesCount || defaultData.content.technologiesCount,
      location: data?.content?.location || defaultData.content.location,
      githubUrl: data?.content?.githubUrl || defaultData.content.githubUrl,
      linkedinUrl: data?.content?.linkedinUrl || defaultData.content.linkedinUrl,
      twitterUrl: data?.content?.twitterUrl || defaultData.content.twitterUrl
    }
  };
};

export const PortfolioProvider = ({ children }: { children: ReactNode }) => {
  const [portfolioData, setPortfolioData] = useState<PortfolioData>(defaultData);

  useEffect(() => {
    const savedData = localStorage.getItem('portfolioData');
    if (savedData) {
      try {
        const parsedData = JSON.parse(savedData);
        console.log('Loading saved portfolio data:', parsedData);
        const validatedData = ensureDataStructure(parsedData);
        setPortfolioData(validatedData);
      } catch (error) {
        console.error('Error parsing saved portfolio data:', error);
        setPortfolioData(defaultData);
      }
    }
  }, []);

  useEffect(() => {
    try {
      localStorage.setItem('portfolioData', JSON.stringify(portfolioData));
      console.log('Portfolio data auto-saved:', portfolioData);
    } catch (error) {
      console.error('Error auto-saving portfolio data:', error);
    }
  }, [portfolioData]);

  const updateProjects = (projects: Project[]) => {
    console.log('Updating projects:', projects);
    setPortfolioData(prev => ({ ...prev, projects }));
  };

  const updateSkills = (skills: Skill[]) => {
    console.log('Updating skills:', skills);
    setPortfolioData(prev => ({ ...prev, skills }));
  };

  const updateExperiences = (experiences: Experience[]) => {
    console.log('Updating experiences:', experiences);
    setPortfolioData(prev => ({ ...prev, experiences }));
  };

  const updateGallery = (gallery: GalleryItem[]) => {
    console.log('Updating gallery:', gallery);
    setPortfolioData(prev => ({ ...prev, gallery }));
  };

  const updateHighlights = (highlights: Highlight[]) => {
    console.log('Updating highlights:', highlights);
    setPortfolioData(prev => ({ ...prev, highlights }));
  };

  const updateContent = (content: Content) => {
    console.log('Updating content:', content);
    setPortfolioData(prev => ({ ...prev, content }));
  };

  const saveChanges = () => {
    try {
      localStorage.setItem('portfolioData', JSON.stringify(portfolioData));
      console.log('Portfolio data saved manually:', portfolioData);
    } catch (error) {
      console.error('Error saving portfolio data:', error);
    }
  };

  return (
    <PortfolioContext.Provider value={{
      portfolioData,
      updateProjects,
      updateSkills,
      updateExperiences,
      updateGallery,
      updateHighlights,
      updateContent,
      saveChanges
    }}>
      {children}
    </PortfolioContext.Provider>
  );
};
