
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

const Index = () => {
  return (
    <div className="bg-gray-50 text-gray-900 overflow-x-hidden">
      <Navigation />
      <Hero />
      <About />
      <Skills />
      <Projects />
      <Gallery />
      <Resume />
      <Contact />
      <Dashboard />
    </div>
  );
};

export default Index;
