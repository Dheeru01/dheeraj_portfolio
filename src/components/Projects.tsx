
import React from 'react';
import { ExternalLink, Github, Play } from 'lucide-react';

export const Projects = () => {
  const projects = [
    {
      title: "AI-Powered Task Manager",
      description: "Smart task management app with ML-based priority suggestions and automated scheduling",
      image: "https://images.unsplash.com/photo-1611224923853-80b023f02d71?w=500&h=300&fit=crop",
      tags: ["React", "Python", "TensorFlow", "MongoDB"],
      github: "#",
      live: "#",
      featured: true
    },
    {
      title: "Real-time Collaboration Platform",
      description: "Full-stack web application enabling real-time document collaboration and video conferencing",
      image: "https://images.unsplash.com/photo-1552664730-d307ca884978?w=500&h=300&fit=crop",
      tags: ["Vue.js", "Node.js", "Socket.io", "WebRTC"],
      github: "#",
      live: "#",
      featured: true
    },
    {
      title: "Blockchain Voting System",
      description: "Secure and transparent voting platform built on Ethereum blockchain",
      image: "https://images.unsplash.com/photo-1639762681485-074b7f938ba0?w=500&h=300&fit=crop",
      tags: ["Solidity", "React", "Web3.js", "IPFS"],
      github: "#",
      live: "#",
      featured: false
    },
    {
      title: "Smart IoT Dashboard",
      description: "Comprehensive dashboard for monitoring and controlling IoT devices with predictive analytics",
      image: "https://images.unsplash.com/photo-1518709268805-4e9042af2176?w=500&h=300&fit=crop",
      tags: ["Angular", "Python", "AWS IoT", "InfluxDB"],
      github: "#",
      live: "#",
      featured: false
    }
  ];

  return (
    <section id="projects" className="py-20 px-6">
      <div className="container mx-auto max-w-7xl">
        <h2 className="text-4xl md:text-5xl font-bold text-center mb-16">
          Featured <span className="bg-gradient-to-r from-blue-400 to-purple-500 bg-clip-text text-transparent">Projects</span>
        </h2>
        
        <div className="grid lg:grid-cols-2 gap-8 mb-12">
          {projects.filter(p => p.featured).map((project, index) => (
            <div
              key={project.title}
              className="group bg-white/5 backdrop-blur-lg rounded-2xl overflow-hidden border border-white/10 hover:bg-white/10 transition-all duration-300 hover:scale-105"
            >
              <div className="relative overflow-hidden">
                <img
                  src={project.image}
                  alt={project.title}
                  className="w-full h-64 object-cover group-hover:scale-110 transition-transform duration-300"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent"></div>
                <div className="absolute top-4 right-4 flex gap-2">
                  <a
                    href={project.github}
                    className="p-2 bg-black/50 rounded-full hover:bg-black/70 transition-colors duration-300"
                  >
                    <Github size={20} />
                  </a>
                  <a
                    href={project.live}
                    className="p-2 bg-black/50 rounded-full hover:bg-black/70 transition-colors duration-300"
                  >
                    <ExternalLink size={20} />
                  </a>
                </div>
              </div>
              
              <div className="p-6">
                <h3 className="text-2xl font-bold mb-3">{project.title}</h3>
                <p className="text-gray-300 mb-4">{project.description}</p>
                <div className="flex flex-wrap gap-2">
                  {project.tags.map((tag) => (
                    <span
                      key={tag}
                      className="px-3 py-1 bg-gradient-to-r from-blue-500/20 to-purple-500/20 rounded-full text-sm border border-white/20"
                    >
                      {tag}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          ))}
        </div>
        
        <div className="grid md:grid-cols-2 gap-6">
          {projects.filter(p => !p.featured).map((project, index) => (
            <div
              key={project.title}
              className="group bg-white/5 backdrop-blur-lg rounded-xl overflow-hidden border border-white/10 hover:bg-white/10 transition-all duration-300"
            >
              <div className="relative overflow-hidden">
                <img
                  src={project.image}
                  alt={project.title}
                  className="w-full h-48 object-cover group-hover:scale-110 transition-transform duration-300"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent"></div>
              </div>
              
              <div className="p-4">
                <h3 className="text-xl font-bold mb-2">{project.title}</h3>
                <p className="text-gray-300 text-sm mb-3">{project.description}</p>
                <div className="flex flex-wrap gap-1 mb-3">
                  {project.tags.map((tag) => (
                    <span
                      key={tag}
                      className="px-2 py-1 bg-gradient-to-r from-blue-500/20 to-purple-500/20 rounded text-xs border border-white/20"
                    >
                      {tag}
                    </span>
                  ))}
                </div>
                <div className="flex gap-2">
                  <a
                    href={project.github}
                    className="flex items-center gap-1 text-sm text-blue-400 hover:text-blue-300"
                  >
                    <Github size={16} /> Code
                  </a>
                  <a
                    href={project.live}
                    className="flex items-center gap-1 text-sm text-purple-400 hover:text-purple-300"
                  >
                    <ExternalLink size={16} /> Live
                  </a>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
