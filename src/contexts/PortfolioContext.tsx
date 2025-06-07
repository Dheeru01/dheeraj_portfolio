
import React, { createContext, useContext, useState, ReactNode } from 'react';

interface Project {
  id: number;
  title: string;
  description: string;
  tech: string;
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

interface Content {
  aboutText: string;
  contactEmail: string;
  contactPhone: string;
  profileImage: string;
}

interface PortfolioData {
  projects: Project[];
  skills: Skill[];
  experiences: Experience[];
  content: Content;
}

interface PortfolioContextType {
  portfolioData: PortfolioData;
  updateProjects: (projects: Project[]) => void;
  updateSkills: (skills: Skill[]) => void;
  updateExperiences: (experiences: Experience[]) => void;
  updateContent: (content: Content) => void;
  saveChanges: () => void;
}

const defaultData: PortfolioData = {
  projects: [
    { id: 1, title: 'AI-Powered Task Manager', description: 'A smart task management app', tech: 'React, Node.js, AI' },
    { id: 2, title: 'E-commerce Platform', description: 'Full-stack shopping platform', tech: 'Next.js, MongoDB' }
  ],
  skills: [
    { id: 1, name: 'JavaScript', level: 90 },
    { id: 2, name: 'React', level: 85 },
    { id: 3, name: 'Python', level: 80 }
  ],
  experiences: [
    { id: 1, title: 'Software Engineer Intern', company: 'Tech Corp', period: '2024 - Present', description: 'Working on React applications and backend services' }
  ],
  content: {
    aboutText: 'Passionate software developer with expertise in modern web technologies...',
    contactEmail: 'kanukuntladheeraj@gmail.com',
    contactPhone: '+1 (555) 123-4567',
    profileImage: ''
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

export const PortfolioProvider = ({ children }: { children: ReactNode }) => {
  const [portfolioData, setPortfolioData] = useState<PortfolioData>(defaultData);

  const updateProjects = (projects: Project[]) => {
    setPortfolioData(prev => ({ ...prev, projects }));
  };

  const updateSkills = (skills: Skill[]) => {
    setPortfolioData(prev => ({ ...prev, skills }));
  };

  const updateExperiences = (experiences: Experience[]) => {
    setPortfolioData(prev => ({ ...prev, experiences }));
  };

  const updateContent = (content: Content) => {
    setPortfolioData(prev => ({ ...prev, content }));
  };

  const saveChanges = () => {
    // In a real app, this would save to a backend
    localStorage.setItem('portfolioData', JSON.stringify(portfolioData));
    console.log('Portfolio data saved:', portfolioData);
  };

  return (
    <PortfolioContext.Provider value={{
      portfolioData,
      updateProjects,
      updateSkills,
      updateExperiences,
      updateContent,
      saveChanges
    }}>
      {children}
    </PortfolioContext.Provider>
  );
};
