
import React, { useEffect, useRef } from 'react';
import { Hero } from '../components/Hero';
import { About } from '../components/About';
import { Skills } from '../components/Skills';
import { Projects } from '../components/Projects';
import { Gallery } from '../components/Gallery';
import { Resume } from '../components/Resume';
import { Contact } from '../components/Contact';
import { Navigation } from '../components/Navigation';
import { Dashboard } from '../components/Dashboard';
import { JotFormChatbot } from '../components/JotFormChatbot';

const Index = () => {
  return (
    <div className="bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900 text-white overflow-x-hidden">
      <Navigation />
      <Hero />
      <About />
      <Skills />
      <Projects />
      <Gallery />
      <Resume />
      <Contact />
      <Dashboard />
      <JotFormChatbot />
    </div>
  );
};

export default Index;
