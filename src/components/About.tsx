
import React from 'react';
import { Code, Lightbulb, Users, Award } from 'lucide-react';
import { usePortfolio } from '../contexts/PortfolioContext';

export const About = () => {
  const { portfolioData } = usePortfolio();

  const highlights = [
    {
      icon: <Code className="w-8 h-8" />,
      title: "Full Stack Development",
      description: "Expertise in modern web technologies and frameworks"
    },
    {
      icon: <Lightbulb className="w-8 h-8" />,
      title: "Innovation",
      description: "Always exploring cutting-edge technologies and solutions"
    },
    {
      icon: <Users className="w-8 h-8" />,
      title: "Team Leadership",
      description: "Leading teams to deliver exceptional results"
    },
    {
      icon: <Award className="w-8 h-8" />,
      title: "Recognition",
      description: "Multiple hackathon wins and project accolades"
    }
  ];

  return (
    <section id="about" className="py-20 px-6 bg-white">
      <div className="container mx-auto max-w-6xl">
        <h2 className="text-4xl md:text-5xl font-bold text-center mb-16 text-black">
          About <span className="bg-gradient-to-r from-gray-600 to-black bg-clip-text text-transparent">Kanukuntla Dheeraj</span>
        </h2>
        
        <div className="grid md:grid-cols-2 gap-12 items-center mb-16">
          <div className="space-y-6">
            <p className="text-lg text-gray-800 leading-relaxed">
              {portfolioData.content.aboutText}
            </p>
            <p className="text-lg text-gray-800 leading-relaxed">
              My journey in technology has been driven by curiosity and a constant desire to learn. 
              Whether it's building scalable web applications, exploring machine learning algorithms, 
              or leading development teams, I approach every challenge with enthusiasm and dedication.
            </p>
            <div className="flex gap-4">
              <div className="text-center">
                <div className="text-3xl font-bold text-black">{portfolioData.content.projectsCompleted}+</div>
                <div className="text-sm text-gray-600">Projects Completed</div>
              </div>
              <div className="text-center">
                <div className="text-3xl font-bold text-black">{portfolioData.content.yearsExperience}+</div>
                <div className="text-sm text-gray-600">Years Experience</div>
              </div>
              <div className="text-center">
                <div className="text-3xl font-bold text-black">{portfolioData.content.technologiesCount}+</div>
                <div className="text-sm text-gray-600">Technologies</div>
              </div>
            </div>
          </div>
          
          <div className="relative">
            <div className="w-80 h-80 mx-auto rounded-full bg-gradient-to-br from-gray-200 to-gray-400 flex items-center justify-center overflow-hidden border-4 border-black">
              {portfolioData.content.profileImage ? (
                <img 
                  src={portfolioData.content.profileImage} 
                  alt="Profile" 
                  className="w-full h-full object-cover"
                />
              ) : (
                <div className="w-72 h-72 rounded-full bg-gradient-to-br from-gray-600 to-black flex items-center justify-center text-6xl font-bold text-white">
                  DK
                </div>
              )}
            </div>
          </div>
        </div>
        
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
          {highlights.map((item, index) => (
            <div
              key={index}
              className="bg-gray-100 backdrop-blur-lg rounded-lg p-6 border border-gray-300 hover:bg-gray-200 transition-all duration-300 group"
            >
              <div className="text-black mb-4 group-hover:scale-110 transition-transform duration-300">
                {item.icon}
              </div>
              <h3 className="text-xl font-semibold mb-2 text-black">{item.title}</h3>
              <p className="text-gray-700">{item.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
