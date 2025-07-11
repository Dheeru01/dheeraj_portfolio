
import React from 'react';
import { ExternalLink, Github, Play } from 'lucide-react';
import { usePortfolio } from '../contexts/PortfolioContext';

export const Projects = () => {
  const { portfolioData } = usePortfolio();
  //const { projects } = portfolioData;
  const projects= [
    { 
      id: 1, 
      title: 'Course Bundler', 
      description: 'A responsive e-learning platform where students can access video lectures and learning resources. Implemented secure user authentication, role-based access for students and teachers, and video playlist management. Integrated Razorpay for payments and used Redux Toolkit for efficient state management. Focused on clean UI (Chakra UI) and robust backend architecture (Express + MongoDB)', 
      tech: 'ReactJS, Chakra UI, NodeJS, ExpressJS, MongoDB, Redux Toolkit, Razorpay',
      image: 'https://tse3.mm.bing.net/th/id/OIP.ESG0VzWTe6b7tIzBLHDG-AHaEX?rs=1&pid=ImgDetMain',
      github: 'https://github.com/Dheeru01/Course-Bundler-server',
      live: 'https://course-bundler-omega.vercel.app/',
      featured: true
    },
    { 
      id: 2, 
      title: 'Community Engagement – Community Safety Web Platform', 
      description: 'A full-stack web app to boost community safety through real-time incident reporting, alerts, chats, and a help desk. Integrated Firebase and MongoDB for efficient data handling, Razorpay for secure payments, and Cloudinary/Nodemailer for media and email services. Built an intuitive UI with ReactJS, Chakra UI, and ChartJS, and managed state seamlessly with Redux Toolkit.', 
      tech: 'ReactJS, Chakra UI, NodeJS, ExpressJS, MongoDB, Firebase, Razorpay, Redux Toolkit',
      image: 'https://www.ceo-review.com/wp-content/uploads/2021/05/The-power-of-community-engagement.jpg',
      //github: 'https://github.com',
      //live: 'https://example.com',
      featured: true
    }
  ]
  const featuredProjects = projects.filter(p => p.featured);
  const otherProjects = projects.filter(p => !p.featured);

  return (
    <section id="projects" className="py-20 px-6 bg-white">
      <div className="container mx-auto max-w-7xl">
        <h2 className="text-4xl md:text-5xl font-bold text-center mb-16 text-black animate-fade-in">
          Featured <span className="bg-gradient-to-r from-gray-600 to-black bg-clip-text text-transparent">Projects</span>
        </h2>
        
        {featuredProjects.length > 0 && (
          <div className="mb-16">
            <div className="grid lg:grid-cols-2 gap-8">
              {featuredProjects.map((project, index) => (
                <div
                  key={project.id}
                  className="group bg-gray-50 hover:bg-gray-100 rounded-2xl overflow-hidden border border-gray-200 hover:border-gray-300 transition-all duration-500 hover:scale-105 hover:shadow-2xl animate-fade-in flex flex-col h-full"
                  style={{ animationDelay: `${index * 0.2}s` }}
                >
                  <div className="relative overflow-hidden">
                    <img
                      src={project.image || "https://images.unsplash.com/photo-1518770660439-4636190af475?w=500&h=300&fit=crop"}
                      alt={project.title}
                      className="w-full h-64 object-cover group-hover:scale-110 transition-transform duration-500"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                    <div className="absolute top-4 right-4 flex gap-2 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                      {project.github && (
                        <a
                          href={project.github}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="p-2 bg-black/70 rounded-full hover:bg-black transition-colors duration-300 hover:scale-110 transform"
                        >
                          <Github size={20} className="text-white" />
                        </a>
                      )}
                      {project.live && (
                        <a
                          href={project.live}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="p-2 bg-black/70 rounded-full hover:bg-black transition-colors duration-300 hover:scale-110 transform"
                        >
                          <ExternalLink size={20} className="text-white" />
                        </a>
                      )}
                    </div>
                  </div>
                  
                  <div className="p-6 flex-grow flex flex-col">
                    <h3 className="text-2xl font-bold mb-3 text-black group-hover:text-gray-800 transition-colors duration-300">{project.title}</h3>
                    <p className="text-gray-700 mb-4 leading-relaxed flex-grow">{project.description}</p>
                    <div className="flex flex-wrap gap-2 mt-auto">
                      {project.tech.split(', ').map((tech, techIndex) => (
                        <span
                          key={techIndex}
                          className="px-3 py-1 bg-gradient-to-r from-gray-200 to-gray-300 text-black rounded-full text-sm border border-gray-300 hover:from-gray-300 hover:to-gray-400 transition-all duration-300"
                        >
                          {tech}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}
        
        {otherProjects.length > 0 && (
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {otherProjects.map((project, index) => (
              <div
                key={project.id}
                className="group bg-gray-50 hover:bg-gray-100 rounded-xl overflow-hidden border border-gray-200 hover:border-gray-300 transition-all duration-300 hover:shadow-lg animate-fade-in flex flex-col h-full"
                style={{ animationDelay: `${(featuredProjects.length + index) * 0.1}s` }}
              >
                <div className="relative overflow-hidden">
                  <img
                    src={project.image || "https://images.unsplash.com/photo-1518770660439-4636190af475?w=500&h=300&fit=crop"}
                    alt={project.title}
                    className="w-full h-48 object-cover group-hover:scale-110 transition-transform duration-300"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                </div>
                
                <div className="p-4 flex-grow flex flex-col">
                  <h3 className="text-xl font-bold mb-2 text-black">{project.title}</h3>
                  <p className="text-gray-700 text-sm mb-3 leading-relaxed flex-grow">{project.description}</p>
                  <div className="flex flex-wrap gap-1 mb-3">
                    {project.tech.split(', ').map((tech, techIndex) => (
                      <span
                        key={techIndex}
                        className="px-2 py-1 bg-gradient-to-r from-gray-200 to-gray-300 text-black rounded text-xs border border-gray-300"
                      >
                        {tech}
                      </span>
                    ))}
                  </div>
                  <div className="flex gap-2 mt-auto">
                    {project.github && (
                      <a
                        href={project.github}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex items-center gap-1 text-sm text-gray-700 hover:text-black transition-colors duration-300"
                      >
                        <Github size={16} /> Code
                      </a>
                    )}
                    {project.live && (
                      <a
                        href={project.live}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex items-center gap-1 text-sm text-gray-700 hover:text-black transition-colors duration-300"
                      >
                        <ExternalLink size={16} /> Live
                      </a>
                    )}
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}

        {projects.length === 0 && (
          <div className="text-center py-12">
            <p className="text-gray-600 text-lg">No projects added yet. Use the dashboard to add your projects!</p>
          </div>
        )}
      </div>
    </section>
  );
};
