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

interface Content {
  aboutText: string;
  contactEmail: string;
  contactPhone: string;
  profileImage: string;
  technologies: string[];
}

interface PortfolioData {
  projects: Project[];
  skills: Skill[];
  experiences: Experience[];
  gallery: GalleryItem[];
  content: Content;
}

interface PortfolioContextType {
  portfolioData: PortfolioData;
  updateProjects: (projects: Project[]) => void;
  updateSkills: (skills: Skill[]) => void;
  updateExperiences: (experiences: Experience[]) => void;
  updateGallery: (gallery: GalleryItem[]) => void;
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
  content: {
    aboutText: 'Passionate software developer with expertise in modern web technologies...',
    contactEmail: 'kanukuntladheeraj@gmail.com',
    contactPhone: '+1 (555) 123-4567',
    profileImage: '',
    technologies: ['React', 'Vue.js', 'Angular', 'Node.js', 'Express', 'Python', 'Django', 'Flask', 'MongoDB', 'PostgreSQL', 'MySQL', 'Redis', 'AWS', 'Docker', 'Kubernetes', 'Git']
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

// Helper function to ensure data structure integrity
const ensureDataStructure = (data: any): PortfolioData => {
  return {
    projects: Array.isArray(data?.projects) ? data.projects : defaultData.projects,
    skills: Array.isArray(data?.skills) ? data.skills : defaultData.skills,
    experiences: Array.isArray(data?.experiences) ? data.experiences : defaultData.experiences,
    gallery: Array.isArray(data?.gallery) ? data.gallery : defaultData.gallery,
    content: {
      aboutText: data?.content?.aboutText || defaultData.content.aboutText,
      contactEmail: data?.content?.contactEmail || defaultData.content.contactEmail,
      contactPhone: data?.content?.contactPhone || defaultData.content.contactPhone,
      profileImage: data?.content?.profileImage || defaultData.content.profileImage,
      technologies: Array.isArray(data?.content?.technologies) ? data.content.technologies : defaultData.content.technologies
    }
  };
};

export const PortfolioProvider = ({ children }: { children: ReactNode }) => {
  const [portfolioData, setPortfolioData] = useState<PortfolioData>(defaultData);

  // Load saved data from localStorage on component mount
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
        // If there's an error, keep the default data
        setPortfolioData(defaultData);
      }
    }
  }, []);

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

  const updateContent = (content: Content) => {
    console.log('Updating content:', content);
    setPortfolioData(prev => ({ ...prev, content }));
  };

  const saveChanges = () => {
    try {
      localStorage.setItem('portfolioData', JSON.stringify(portfolioData));
      console.log('Portfolio data saved successfully:', portfolioData);
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
      updateContent,
      saveChanges
    }}>
      {children}
    </PortfolioContext.Provider>
  );
};
