
import React, { useState } from 'react';
import { Hero } from '../components/Hero';
import { About } from '../components/About';
import { Skills } from '../components/Skills';
import { Projects } from '../components/Projects';
import { Gallery } from '../components/Gallery';
import { Resume } from '../components/Resume';
import { Contact } from '../components/Contact';
import { Navigation } from '../components/Navigation';
import { Dashboard } from '../components/Dashboard';
import { FloatingEditIcon } from '../components/FloatingEditIcon';
import { JotFormChatbot } from '../components/JotFormChatbot';
import { PortfolioProvider } from '../contexts/PortfolioContext';

const Index = () => {
  const [isDashboardOpen, setIsDashboardOpen] = useState(false);

  return (
    <PortfolioProvider>
      <div className="bg-white text-black overflow-x-hidden">
        <Navigation />
        <Hero />
        <About />
        <Skills />
        <Projects />
        <Gallery />
        <Resume />
        <Contact />
        <Dashboard 
          isOpen={isDashboardOpen} 
          onClose={() => setIsDashboardOpen(false)} 
        />
        <FloatingEditIcon onDashboardOpen={() => setIsDashboardOpen(true)} />
        <JotFormChatbot />
      </div>
    </PortfolioProvider>
  );
};

export default Index;
