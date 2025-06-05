
import React from 'react';
import { Code, Lightbulb, Users, Award } from 'lucide-react';

export const About = () => {
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
    <section id="about" className="py-20 px-6">
      <div className="container mx-auto max-w-6xl">
        <h2 className="text-4xl md:text-5xl font-bold text-center mb-16">
          About <span className="bg-gradient-to-r from-blue-400 to-purple-500 bg-clip-text text-transparent">Me</span>
        </h2>
        
        <div className="grid md:grid-cols-2 gap-12 items-center mb-16">
          <div className="space-y-6">
            <p className="text-lg text-gray-300 leading-relaxed">
              I'm a passionate Full Stack Developer with a deep love for creating innovative solutions 
              that make a real impact. With expertise spanning from frontend frameworks to AI/ML 
              implementations, I bring ideas to life through code.
            </p>
            <p className="text-lg text-gray-300 leading-relaxed">
              My journey in technology has been driven by curiosity and a constant desire to learn. 
              Whether it's building scalable web applications, exploring machine learning algorithms, 
              or leading development teams, I approach every challenge with enthusiasm and dedication.
            </p>
            <div className="flex gap-4">
              <div className="text-center">
                <div className="text-3xl font-bold text-blue-400">50+</div>
                <div className="text-sm text-gray-400">Projects Completed</div>
              </div>
              <div className="text-center">
                <div className="text-3xl font-bold text-purple-400">5+</div>
                <div className="text-sm text-gray-400">Years Experience</div>
              </div>
              <div className="text-center">
                <div className="text-3xl font-bold text-pink-400">20+</div>
                <div className="text-sm text-gray-400">Technologies</div>
              </div>
            </div>
          </div>
          
          <div className="relative">
            <div className="w-80 h-80 mx-auto rounded-full bg-gradient-to-br from-blue-500/20 to-purple-500/20 flex items-center justify-center">
              <div className="w-72 h-72 rounded-full bg-gradient-to-br from-blue-600 to-purple-600 flex items-center justify-center text-6xl font-bold">
                DK
              </div>
            </div>
          </div>
        </div>
        
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
          {highlights.map((item, index) => (
            <div
              key={index}
              className="bg-white/5 backdrop-blur-lg rounded-lg p-6 border border-white/10 hover:bg-white/10 transition-all duration-300 group"
            >
              <div className="text-blue-400 mb-4 group-hover:scale-110 transition-transform duration-300">
                {item.icon}
              </div>
              <h3 className="text-xl font-semibold mb-2">{item.title}</h3>
              <p className="text-gray-400">{item.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
