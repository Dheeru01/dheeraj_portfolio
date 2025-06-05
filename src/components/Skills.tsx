
import React, { useEffect, useRef } from 'react';

export const Skills = () => {
  const skillsData = [
    { name: 'React', level: 95, color: 'from-blue-400 to-blue-600' },
    { name: 'Node.js', level: 90, color: 'from-green-400 to-green-600' },
    { name: 'Python', level: 88, color: 'from-yellow-400 to-yellow-600' },
    { name: 'TypeScript', level: 85, color: 'from-blue-500 to-blue-700' },
    { name: 'MongoDB', level: 82, color: 'from-green-500 to-green-700' },
    { name: 'AWS', level: 80, color: 'from-orange-400 to-orange-600' },
    { name: 'Machine Learning', level: 78, color: 'from-purple-400 to-purple-600' },
    { name: 'Docker', level: 75, color: 'from-blue-300 to-blue-500' }
  ];

  const floatingIconsRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const container = floatingIconsRef.current;
    if (!container) return;

    const icons = ['⚛️', '🐍', '☁️', '🤖', '⚡', '🚀', '💡', '🔥'];
    
    icons.forEach((icon, index) => {
      const iconElement = document.createElement('div');
      iconElement.textContent = icon;
      iconElement.className = 'absolute text-4xl opacity-20 animate-pulse';
      iconElement.style.left = `${Math.random() * 100}%`;
      iconElement.style.top = `${Math.random() * 100}%`;
      iconElement.style.animationDelay = `${index * 0.5}s`;
      iconElement.style.animationDuration = `${3 + Math.random() * 2}s`;
      container.appendChild(iconElement);
    });
  }, []);

  return (
    <section id="skills" className="py-20 px-6 relative">
      <div ref={floatingIconsRef} className="absolute inset-0 overflow-hidden pointer-events-none"></div>
      
      <div className="container mx-auto max-w-6xl relative z-10">
        <h2 className="text-4xl md:text-5xl font-bold text-center mb-16">
          My <span className="bg-gradient-to-r from-blue-400 to-purple-500 bg-clip-text text-transparent">Skills</span>
        </h2>
        
        <div className="grid md:grid-cols-2 gap-8">
          {skillsData.map((skill, index) => (
            <div
              key={skill.name}
              className="bg-white/5 backdrop-blur-lg rounded-lg p-6 border border-white/10 hover:bg-white/10 transition-all duration-300"
              style={{ animationDelay: `${index * 0.1}s` }}
            >
              <div className="flex justify-between items-center mb-3">
                <h3 className="text-lg font-semibold">{skill.name}</h3>
                <span className="text-sm text-gray-400">{skill.level}%</span>
              </div>
              <div className="w-full bg-gray-700 rounded-full h-3 overflow-hidden">
                <div
                  className={`h-full bg-gradient-to-r ${skill.color} rounded-full transition-all duration-1000 ease-out`}
                  style={{ 
                    width: `${skill.level}%`,
                    animation: `slideIn 1s ease-out ${index * 0.1}s both`
                  }}
                ></div>
              </div>
            </div>
          ))}
        </div>
        
        <div className="mt-16 text-center">
          <h3 className="text-2xl font-semibold mb-8">Technologies & Tools</h3>
          <div className="flex flex-wrap justify-center gap-4">
            {[
              'React', 'Vue.js', 'Angular', 'Node.js', 'Express', 'Python', 'Django', 'Flask',
              'MongoDB', 'PostgreSQL', 'MySQL', 'Redis', 'AWS', 'Docker', 'Kubernetes', 'Git'
            ].map((tech, index) => (
              <span
                key={tech}
                className="px-4 py-2 bg-gradient-to-r from-blue-500/20 to-purple-500/20 rounded-full text-sm border border-white/20 hover:bg-white/10 transition-all duration-300 cursor-default"
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
