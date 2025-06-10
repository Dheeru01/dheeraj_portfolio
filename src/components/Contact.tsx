
import React, { useState } from 'react';
import { Mail, Phone, MapPin, Send, Github, Linkedin, Twitter, ExternalLink } from 'lucide-react';
import { usePortfolio } from '../contexts/PortfolioContext';

export const Contact = () => {
  const { portfolioData } = usePortfolio();
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    message: ''
  });

  const MY_EMAIL = 'kanukuntladheeraj@gmail.com';

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    // Create a form element and submit to FormSubmit
    const form = document.createElement('form');
    form.action = `https://formsubmit.co/${MY_EMAIL}`;
    form.method = 'POST';
    form.target = '_blank';

    // Add form data
    const nameInput = document.createElement('input');
    nameInput.type = 'hidden';
    nameInput.name = 'name';
    nameInput.value = formData.name;
    form.appendChild(nameInput);

    const emailInput = document.createElement('input');
    emailInput.type = 'hidden';
    emailInput.name = 'email';
    emailInput.value = formData.email;
    form.appendChild(emailInput);

    const messageInput = document.createElement('input');
    messageInput.type = 'hidden';
    messageInput.name = 'message';
    messageInput.value = formData.message;
    form.appendChild(messageInput);

    // Add FormSubmit configuration
    const subjectInput = document.createElement('input');
    subjectInput.type = 'hidden';
    subjectInput.name = '_subject';
    subjectInput.value = `Portfolio Contact from ${formData.name}`;
    form.appendChild(subjectInput);

    const nextInput = document.createElement('input');
    nextInput.type = 'hidden';
    nextInput.name = '_next';
    nextInput.value = window.location.href;
    form.appendChild(nextInput);

    document.body.appendChild(form);
    form.submit();
    document.body.removeChild(form);

    // Reset form
    setFormData({ name: '', email: '', message: '' });
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const scrollToProjects = () => {
    const projectsSection = document.getElementById('projects');
    if (projectsSection) {
      projectsSection.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <section id="contact" className="py-20 px-6 bg-white">
      <div className="container mx-auto max-w-6xl">
        <h2 className="text-4xl md:text-5xl font-bold text-center mb-16 text-black">
          Get In <span className="text-gray-700">Touch</span>
        </h2>
        
        <div className="grid lg:grid-cols-2 gap-12">
          {/* Contact Info */}
          <div className="space-y-8">
            <div>
              <h3 className="text-2xl font-semibold mb-6 text-black">Let's Connect</h3>
              <p className="text-gray-700 text-lg leading-relaxed">
                I'm always open to discussing new opportunities, interesting projects, 
                or just having a great conversation about technology. Feel free to reach out!
              </p>
            </div>
            
            <div className="space-y-4">
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 bg-black rounded-full flex items-center justify-center">
                  <Mail size={20} className="text-white" />
                </div>
                <div>
                  <h4 className="font-semibold text-black">Email</h4>
                  <p className="text-gray-700">{MY_EMAIL}</p>
                </div>
              </div>
              
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 bg-black rounded-full flex items-center justify-center">
                  <Phone size={20} className="text-white" />
                </div>
                <div>
                  <h4 className="font-semibold text-black">Phone</h4>
                  <p className="text-gray-700">{portfolioData.content.contactPhone}</p>
                </div>
              </div>
              
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 bg-black rounded-full flex items-center justify-center">
                  <MapPin size={20} className="text-white" />
                </div>
                <div>
                  <h4 className="font-semibold text-black">Location</h4>
                  <p className="text-gray-700">{portfolioData.content.location}</p>
                </div>
              </div>
            </div>
            
            {/* Social Links */}
            <div>
              <h4 className="font-semibold mb-4 text-black">Follow Me</h4>
              <div className="flex gap-4 flex-wrap">
                <a
                  href={portfolioData.content.githubUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-12 h-12 bg-gray-200 rounded-full flex items-center justify-center hover:bg-gray-300 transition-colors duration-300"
                >
                  <Github size={20} className="text-black" />
                </a>
                <a
                  href={portfolioData.content.linkedinUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-12 h-12 bg-gray-200 rounded-full flex items-center justify-center hover:bg-gray-300 transition-colors duration-300"
                >
                  <Linkedin size={20} className="text-black" />
                </a>
                <a
                  href={portfolioData.content.twitterUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-12 h-12 bg-gray-200 rounded-full flex items-center justify-center hover:bg-gray-300 transition-colors duration-300"
                >
                  <Twitter size={20} className="text-black" />
                </a>
                
                {/* Dynamic Social Links */}
                {portfolioData.content.socialLinks && portfolioData.content.socialLinks.map((link) => (
                  <a
                    key={link.id}
                    href={link.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="w-12 h-12 bg-gray-200 rounded-full flex items-center justify-center hover:bg-gray-300 transition-colors duration-300"
                    title={link.name}
                  >
                    <ExternalLink size={20} className="text-black" />
                  </a>
                ))}
              </div>
              
              {/* Custom Social Links List */}
              {portfolioData.content.socialLinks && portfolioData.content.socialLinks.length > 0 && (
                <div className="mt-4 space-y-2">
                  {portfolioData.content.socialLinks.map((link) => (
                    <div key={link.id} className="flex items-center gap-2">
                      <ExternalLink size={16} className="text-gray-600" />
                      <a 
                        href={link.url}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-gray-700 hover:text-black transition-colors"
                      >
                        {link.name}
                      </a>
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>
          
          {/* Contact Form */}
          <div className="bg-gray-100 rounded-2xl p-8 border border-gray-300">
            <form onSubmit={handleSubmit} className="space-y-6">
              <div>
                <label htmlFor="name" className="block text-sm font-medium mb-2 text-black">
                  Full Name
                </label>
                <input
                  type="text"
                  id="name"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  required
                  className="w-full px-4 py-3 bg-white rounded-lg border border-gray-300 focus:border-black focus:outline-none transition-colors duration-300 text-black"
                  placeholder="Your full name"
                />
              </div>
              
              <div>
                <label htmlFor="email" className="block text-sm font-medium mb-2 text-black">
                  Email Address
                </label>
                <input
                  type="email"
                  id="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  required
                  className="w-full px-4 py-3 bg-white rounded-lg border border-gray-300 focus:border-black focus:outline-none transition-colors duration-300 text-black"
                  placeholder="your.email@example.com"
                />
              </div>
              
              <div>
                <label htmlFor="message" className="block text-sm font-medium mb-2 text-black">
                  Message
                </label>
                <textarea
                  id="message"
                  name="message"
                  value={formData.message}
                  onChange={handleChange}
                  required
                  rows={5}
                  className="w-full px-4 py-3 bg-white rounded-lg border border-gray-300 focus:border-black focus:outline-none transition-colors duration-300 resize-none text-black"
                  placeholder="Tell me about your project or just say hello!"
                ></textarea>
              </div>
              
              <button
                type="submit"
                className="w-full flex items-center justify-center gap-2 px-6 py-3 bg-black rounded-lg text-white font-semibold hover:bg-gray-800 transition-colors duration-300"
              >
                <Send size={20} />
                Send Message
              </button>
            </form>
          </div>
        </div>
      </div>
      
      {/* Make sure View My Work button scrolls to projects */}
      <script
        dangerouslySetInnerHTML={{
          __html: `
            window.scrollToProjects = function() {
              const projectsSection = document.getElementById('projects');
              if (projectsSection) {
                projectsSection.scrollIntoView({ behavior: 'smooth' });
              }
            };
          `
        }}
      />
    </section>
  );
};
