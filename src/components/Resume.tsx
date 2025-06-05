
import React from 'react';
import { Download, Calendar, MapPin, GraduationCap } from 'lucide-react';

export const Resume = () => {
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

  return (
    <section id="resume" className="py-20 px-6">
      <div className="container mx-auto max-w-6xl">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold mb-6">
            My <span className="bg-gradient-to-r from-blue-400 to-purple-500 bg-clip-text text-transparent">Resume</span>
          </h2>
          <button className="inline-flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-blue-500 to-purple-600 rounded-full text-white font-semibold hover:scale-105 transition-transform duration-300">
            <Download size={20} />
            Download Resume
          </button>
        </div>

        <div className="grid lg:grid-cols-2 gap-12">
          {/* Education */}
          <div>
            <h3 className="text-2xl font-bold mb-8 flex items-center gap-2">
              <GraduationCap size={24} className="text-purple-400" />
              Education
            </h3>
            
            <div className="space-y-8">
              {education.map((edu, index) => (
                <div key={index} className="relative pl-8 border-l-2 border-purple-400/30">
                  <div className="absolute -left-2 top-0 w-4 h-4 bg-purple-400 rounded-full"></div>
                  <div className="bg-white/5 backdrop-blur-lg rounded-lg p-6 border border-white/10">
                    <h4 className="text-xl font-semibold text-purple-400 mb-2">{edu.degree}</h4>
                    <h5 className="text-lg font-medium mb-3">{edu.school}</h5>
                    <div className="flex flex-col sm:flex-row gap-2 sm:gap-4 text-sm text-gray-400">
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

          {/* Certifications */}
          <div>
            <h3 className="text-2xl font-bold mb-8 flex items-center gap-2">
              <GraduationCap size={24} className="text-blue-400" />
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
                  className="bg-white/5 backdrop-blur-lg rounded-lg p-4 border border-white/10 hover:bg-white/10 transition-colors duration-300"
                >
                  <span className="text-gray-300">{cert}</span>
                </div>
              ))}
            </div>

            {/* Future Experience Section */}
            <div className="mt-12">
              <h4 className="text-xl font-semibold mb-6 text-blue-400">Experience</h4>
              <div className="bg-white/5 backdrop-blur-lg rounded-lg p-8 border border-white/10 text-center">
                <p className="text-gray-400 mb-4">Ready to start my professional journey!</p>
                <p className="text-sm text-gray-500">Experience will be added as I progress in my career.</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
