
import React from 'react';
import { Download, Calendar, MapPin, GraduationCap, Briefcase } from 'lucide-react';
import { usePortfolio } from '../contexts/PortfolioContext';

export const Resume = () => {
  const { portfolioData } = usePortfolio();
  
  const education = [
    {
      degree: "Master of Science in Computer Science",
      school: "Stanford University", 
      period: "2018 - 2020",
      location: "Stanford, CA"
    },
    {
      degree: "Bachelor of Technology in Computer Science",
      school: "Indian Institute of Technology",
      period: "2014 - 2018", 
      location: "Mumbai, India"
    }
  ];

  const experience = portfolioData.experiences || [];

  const handleDownloadResume = () => {
    if (portfolioData.content.resumeFile) {
      const link = document.createElement('a');
      link.href = portfolioData.content.resumeFile;
      link.download = 'Dheeraj_Kanukuntla_Resume.pdf';
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
    } else {
      alert('Resume file not uploaded yet. Please use the dashboard to upload your resume.');
    }
  };

  const handleDownloadCV = () => {
    if (portfolioData.content.cvFile) {
      const link = document.createElement('a');
      link.href = portfolioData.content.cvFile;
      link.download = 'Dheeraj_Kanukuntla_CV.pdf';
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
    } else {
      alert('CV file not uploaded yet. Please use the dashboard to upload your CV.');
    }
  };

  return (
    <section id="resume" className="py-20 px-6 bg-gray-50">
      <div className="container mx-auto max-w-6xl">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold mb-6 text-black">
            My <span className="bg-gradient-to-r from-gray-600 to-black bg-clip-text text-transparent">Resume</span>
          </h2>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <button 
              onClick={handleDownloadResume}
              className="inline-flex items-center gap-2 px-6 py-3 bg-black rounded-full text-white font-semibold hover:bg-gray-800 transition-colors duration-300"
            >
              <Download size={20} />
              Download Resume
            </button>
            <button 
              onClick={handleDownloadCV}
              className="inline-flex items-center gap-2 px-6 py-3 bg-gray-700 rounded-full text-white font-semibold hover:bg-gray-600 transition-colors duration-300"
            >
              <Download size={20} />
              Download CV
            </button>
          </div>
        </div>

        <div className="grid lg:grid-cols-2 gap-12">
          {/* Education */}
          <div>
            <h3 className="text-2xl font-bold mb-8 flex items-center gap-2 text-black">
              <GraduationCap size={24} className="text-gray-800" />
              Education
            </h3>
            
            <div className="space-y-8">
              {education.map((edu, index) => (
                <div key={index} className="relative pl-8 border-l-2 border-gray-600">
                  <div className="absolute -left-2 top-0 w-4 h-4 bg-gray-800 rounded-full"></div>
                  <div className="bg-white rounded-lg p-6 border border-gray-400 shadow-sm">
                    <h4 className="text-xl font-semibold text-gray-900 mb-2">{edu.degree}</h4>
                    <h5 className="text-lg font-medium mb-3 text-black">{edu.school}</h5>
                    <div className="flex flex-col sm:flex-row gap-2 sm:gap-4 text-sm text-gray-700">
                      <span className="flex items-center gap-1">
                        <Calendar size={16} />
                        {edu.period}
                      </span>
                      <span className="flex items-center gap-1">
                        <MapPin size={16} />
                        {edu.location}
                      </span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Experience & Certifications */}
          <div>
            {/* Experience Section */}
            <div className="mb-12">
              <h3 className="text-2xl font-bold mb-8 flex items-center gap-2 text-black">
                <Briefcase size={24} className="text-gray-800" />
                Experience
              </h3>
              
              {experience.length > 0 ? (
                <div className="space-y-8">
                  {experience.map((exp, index) => (
                    <div key={exp.id} className="relative pl-8 border-l-2 border-gray-600">
                      <div className="absolute -left-2 top-0 w-4 h-4 bg-gray-800 rounded-full"></div>
                      <div className="bg-white rounded-lg p-6 border border-gray-400 shadow-sm">
                        <h4 className="text-xl font-semibold text-gray-900 mb-2">{exp.title}</h4>
                        <h5 className="text-lg font-medium mb-3 text-black">{exp.company}</h5>
                        <div className="flex flex-col sm:flex-row gap-2 sm:gap-4 text-sm text-gray-700 mb-3">
                          <span className="flex items-center gap-1">
                            <Calendar size={16} />
                            {exp.period}
                          </span>
                        </div>
                        <p className="text-gray-800">{exp.description}</p>
                      </div>
                    </div>
                  ))}
                </div>
              ) : (
                <div className="bg-white rounded-lg p-8 border border-gray-400 text-center shadow-sm">
                  <p className="text-gray-700 mb-4">Ready to start my professional journey!</p>
                  <p className="text-sm text-gray-600">Experience will be added as I progress in my career.</p>
                </div>
              )}
            </div>

            {/* Certifications */}
            <div>
              <h3 className="text-2xl font-bold mb-8 flex items-center gap-2 text-black">
                <GraduationCap size={24} className="text-gray-800" />
                Certifications
              </h3>
              
              <div className="space-y-3">
                {[
                  "AWS Certified Solutions Architect",
                  "Google Cloud Professional Developer", 
                  "MongoDB Certified Developer",
                  "Kubernetes Application Developer"
                ].map((cert, index) => (
                  <div
                    key={index}
                    className="bg-white rounded-lg p-4 border border-gray-400 hover:bg-gray-50 transition-colors duration-300 shadow-sm"
                  >
                    <span className="text-gray-800 font-medium">{cert}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
