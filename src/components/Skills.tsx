
import React, { useEffect, useRef } from 'react';
import { usePortfolio } from '../contexts/PortfolioContext';

export const Skills = () => {
  const { portfolioData } = usePortfolio();
  const { skills, content } = portfolioData;
  
  const floatingIconsRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const container = floatingIconsRef.current;
    if (!container) return;

    const icons = ['⚛️', '🐍', '☁️', '🤖', '⚡', '🚀', '💡', '🔥'];
    
    icons.forEach((icon, index) => {
      const iconElement = document.createElement('div');
      iconElement.textContent = icon;
      iconElement.className = 'absolute text-4xl opacity-10 animate-pulse pointer-events-none';
      iconElement.style.left = `${Math.random() * 100}%`;
      iconElement.style.top = `${Math.random() * 100}%`;
      iconElement.style.animationDelay = `${index * 0.5}s`;
      iconElement.style.animationDuration = `${3 + Math.random() * 2}s`;
      container.appendChild(iconElement);
    });

    return () => {
      if (container) {
        container.innerHTML = '';
      }
    };
  }, []);

  // Add null checking for content and skills
  if (!content || !skills) {
    return (
      <section id="skills" className="py-20 px-6 relative bg-white">
        <div className="container mx-auto max-w-6xl relative z-10">
          <h2 className="text-4xl md:text-5xl font-bold text-center mb-16 text-black animate-fade-in">
            My <span className="bg-gradient-to-r from-gray-600 to-black bg-clip-text text-transparent">Skills</span>
          </h2>
          <div className="text-center py-12">
            <p className="text-gray-600 text-lg">Loading skills...</p>
          </div>
        </div>
      </section>
    );
  }

  return (
    <section id="skills" className="py-20 px-6 relative bg-white">
      <div ref={floatingIconsRef} className="absolute inset-0 overflow-hidden pointer-events-none"></div>
      
      <div className="container mx-auto max-w-6xl relative z-10">
        <h2 className="text-4xl md:text-5xl font-bold text-center mb-16 text-black animate-fade-in">
          My <span className="bg-gradient-to-r from-gray-600 to-black bg-clip-text text-transparent">Skills</span>
        </h2>
        
        {skills.length > 0 ? (
          <div className="grid md:grid-cols-2 gap-8">
            {skills.map((skill, index) => (
              <div
                key={skill.id}
                className="bg-gray-50 hover:bg-gray-100 rounded-lg p-6 border border-gray-200 hover:border-gray-300 transition-all duration-300 hover:shadow-lg hover:scale-105 animate-fade-in"
                style={{ animationDelay: `${index * 0.1}s` }}
              >
                <div className="flex justify-between items-center mb-3">
                  <h3 className="text-lg font-semibold text-black">{skill.name}</h3>
                  <span className="text-sm text-gray-600 font-medium">{skill.level}%</span>
                </div>
                <div className="w-full bg-gray-300 rounded-full h-3 overflow-hidden">
                  <div
                    className="h-full bg-gradient-to-r from-gray-700 to-black rounded-full transition-all duration-1000 ease-out"
                    style={{ 
                      width: `${skill.level}%`,
                      animation: `slideIn 1s ease-out ${index * 0.1}s both`
                    }}
                  ></div>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="text-center py-12">
            <p className="text-gray-600 text-lg">No skills added yet. Use the dashboard to add your skills!</p>
          </div>
        )}
        
        <div className="mt-16 text-center">
          <h3 className="text-2xl font-semibold mb-8 text-black animate-fade-in">Technologies & Tools</h3>
          <div className="flex flex-wrap justify-center gap-4">
            {content.technologies && content.technologies.map((tech, index) => (
              <span
                key={tech}
                className="px-4 py-2 bg-gradient-to-r from-gray-200 to-gray-300 hover:from-gray-300 hover:to-gray-400 rounded-full text-sm border border-gray-300 hover:border-gray-400 transition-all duration-300 cursor-default hover:scale-105 text-black animate-fade-in"
                style={{ animationDelay: `${index * 0.05}s` }}
              >
                {tech}
              </span>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};
