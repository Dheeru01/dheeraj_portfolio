
import React from 'react';
import { Download, Calendar, MapPin, GraduationCap, Briefcase, Award } from 'lucide-react';
import { usePortfolio } from '../contexts/PortfolioContext';

export const Resume = () => {
  const { portfolioData } = usePortfolio();
  
  //const experience = portfolioData.experiences || [];
  const experience = [];
  //const certifications = portfolioData.certifications || [];
  const certifications = [
  {
    id: 1,
    name: "Certificate of Training on Web Development",
    issuer: "Internshala",
    date: "16 Dec 2023"
  },
  {
    id: 2,
    name: "Certificate of Participation at CBIT Hackathon SUDHEE",
    issuer: "CBIT",
    date: "24 Feb 2024"
  },
  {
    id: 3,
    name: "Certificate of Completion of AI-ML Virtual Internship",
    issuer: "AICTE-EDUSKILLS",
    date: "Sep 2024"
  },
  {
    id: 4,
    name: "Deloitte Australia Technology Job Simulation",
    issuer: "Forage",
    date: "31 Dec 2024"
  }
];


  const handleDownloadResume = () => {
    //if (portfolioData.content.resumeFile) {
      const link = document.createElement('a');
      link.href = "/Resume_Dheeraj.pdf";
      link.download = 'Dheeraj_Kanukuntla_Resume.pdf';
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
    //} 
    //else {
      //alert('Resume file not uploaded yet');
   // }
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
      alert('CV file not uploaded yet');
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
              <div className="relative pl-8 border-l-2 border-gray-600">
                <div className="absolute -left-2 top-0 w-4 h-4 bg-gray-800 rounded-full"></div>
                <div className="bg-white rounded-lg p-6 border border-gray-400 shadow-sm">
                  <h4 className="text-xl font-semibold text-gray-900 mb-2">Bachelor of Engineering, IT</h4>
                  <h5 className="text-lg font-medium mb-3 text-black">Chaitanya Bharathi Institute of Technology</h5>
                  <div className="flex flex-col sm:flex-row gap-2 sm:gap-4 text-sm text-gray-700">
                    <span className="flex items-center gap-1">
                      <Calendar size={16} />
                      2022-2026
                    
                    <MapPin size={16} />
                      Hyderabad, TS
                    </span>
                  </div>
                  <p className="text-gray-800 mt-2">CGPA: 8.54/10</p>
                </div>
              </div>

              <div className="relative pl-8 border-l-2 border-gray-600">
                <div className="absolute -left-2 top-0 w-4 h-4 bg-gray-800 rounded-full"></div>
                <div className="bg-white rounded-lg p-6 border border-gray-400 shadow-sm">
                  <h4 className="text-xl font-semibold text-gray-900 mb-2">Board of Intermediate, MPC</h4>
                  <h5 className="text-lg font-medium mb-3 text-black">Sai Sri Junior College</h5>
                  <div className="flex flex-col sm:flex-row gap-2 sm:gap-4 text-sm text-gray-700">
                    <span className="flex items-center gap-1">
                      <Calendar size={16} />
                      2019-2021
                   
                      <MapPin size={16} />
                      Sircilla, TS
                    </span>
                  </div>
                  <p className="text-gray-800 mt-2">Percentage: 95.4% </p>
                </div>
              </div>

              <div className="relative pl-8 border-l-2 border-gray-600">
                <div className="absolute -left-2 top-0 w-4 h-4 bg-gray-800 rounded-full"></div>
                <div className="bg-white rounded-lg p-6 border border-gray-400 shadow-sm">
                  <h4 className="text-xl font-semibold text-gray-900 mb-2">Board Of Secondary Education</h4>
                  <div className="flex flex-col sm:flex-row gap-2 sm:gap-4 text-sm text-gray-700">
                    <span className="flex items-center gap-1">
                      <Calendar size={16} />
                      2019
                    
                      <MapPin size={16} />
                      Hanamkonda, TS
                    </span>
                  </div>
                  <p className="text-gray-800 mt-2">Percentage: 80.4% </p>
                </div>
              </div>
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
                <Award size={24} className="text-gray-800" />
                Certifications
              </h3>
              
              <div className="space-y-3">
                {certifications.map((cert) => (
                  <div
                    key={cert.id}
                    className="bg-white rounded-lg p-4 border border-gray-400 hover:bg-gray-50 transition-colors duration-300 shadow-sm"
                  >
                    <div className="flex justify-between items-start">
                      <div>
                        <span className="text-gray-800 font-medium block">{cert.name}</span>
                        {cert.issuer && (
                          <span className="text-gray-600 text-sm">{cert.issuer}</span>
                        )}
                      </div>
                      {cert.date && (
                        <span className="text-gray-500 text-sm">{cert.date}</span>
                      )}
                    </div>
                    {cert.description && (
                      <p className="text-gray-600 text-sm mt-2">{cert.description}</p>
                    )}
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
