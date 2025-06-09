import React, { useState } from 'react';
import { DashboardLogin } from './dashboard/DashboardLogin';
import { DashboardTabs } from './dashboard/DashboardTabs';
import { ProjectsTab } from './dashboard/ProjectsTab';
import { usePortfolio } from '../contexts/PortfolioContext';

export const Dashboard = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [activeTab, setActiveTab] = useState('projects');
  const [adminPassword, setAdminPassword] = useState(
    localStorage.getItem('adminPassword') || 'admin123'
  );
  const { portfolioData, updateSkills, updateExperiences, updateGallery, updateHighlights, updateContent, updateProjects } = usePortfolio();

  const [skills, setSkills] = useState(portfolioData.skills);
  const [experiences, setExperiences] = useState(portfolioData.experiences);
  const [gallery, setGallery] = useState(portfolioData.gallery);
  const [highlights, setHighlights] = useState(portfolioData.highlights);
  const [content, setContent] = useState(portfolioData.content);
  const [projects, setProjects] = useState(portfolioData.projects);

  if (!isLoggedIn) {
    return (
      <DashboardLogin 
        onLogin={() => setIsLoggedIn(true)} 
        onClose={() => {}} 
        adminPassword={adminPassword}
        setAdminPassword={setAdminPassword}
        contactEmail={content.contactEmail}
      />
    );
  }

  const handleSave = () => {
    updateSkills(skills);
    updateExperiences(experiences);
    updateGallery(gallery);
    updateHighlights(highlights);
    updateContent(content);
    updateProjects(projects);
    alert('Changes saved successfully!');
  };

  const addSkill = () => {
    const newSkill = {
      id: Date.now(),
      name: 'New Skill',
      level: 50
    };
    setSkills([...skills, newSkill]);
  };

  const updateSkill = (id: number, field: string, value: string | number) => {
    setSkills(skills.map(skill => 
      skill.id === id ? { ...skill, [field]: value } : skill
    ));
  };

  const deleteSkill = (id: number) => {
    setSkills(skills.filter(skill => skill.id !== id));
  };

  const addExperience = () => {
    const newExperience = {
      id: Date.now(),
      title: 'New Position',
      company: 'Company Name',
      period: '2024 - Present',
      description: 'Job description...'
    };
    setExperiences([...experiences, newExperience]);
  };

  const updateExperience = (id: number, field: string, value: string) => {
    setExperiences(experiences.map(exp => 
      exp.id === id ? { ...exp, [field]: value } : exp
    ));
  };

  const deleteExperience = (id: number) => {
    setExperiences(experiences.filter(exp => exp.id !== id));
  };

  const addGalleryItem = () => {
    const newItem = {
      id: Date.now(),
      src: 'https://images.unsplash.com/photo-1517180102446-f3ece451e9d8?w=400&h=300&fit=crop',
      title: 'New Image',
      category: 'General'
    };
    setGallery([...gallery, newItem]);
  };

  const updateGalleryItem = (id: number, field: string, value: string) => {
    setGallery(gallery.map(item => 
      item.id === id ? { ...item, [field]: value } : item
    ));
  };

  const deleteGalleryItem = (id: number) => {
    setGallery(gallery.filter(item => item.id !== id));
  };

  const addHighlight = () => {
    const newHighlight = {
      id: Date.now(),
      icon: '<svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="8" r="7"/><polyline points="8.21 13.89 7 23 12 20 17 23 15.79 13.88"/></svg>',
      title: 'New Highlight',
      description: 'Description of the highlight...'
    };
    setHighlights([...highlights, newHighlight]);
  };

  const updateHighlight = (id: number, field: string, value: string) => {
    setHighlights(highlights.map(highlight => 
      highlight.id === id ? { ...highlight, [field]: value } : highlight
    ));
  };

  const deleteHighlight = (id: number) => {
    setHighlights(highlights.filter(highlight => highlight.id !== id));
  };

  const handleFileUpload = (event: React.ChangeEvent<HTMLInputElement>, field: string) => {
    const file = event.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (e) => {
        const result = e.target?.result as string;
        setContent(prev => ({ ...prev, [field]: result }));
      };
      reader.readAsDataURL(file);
    }
  };

  const renderContent = () => {
    switch (activeTab) {
      case 'projects':
        return <ProjectsTab projects={projects} setProjects={setProjects} />;
      
      case 'highlights':
        return (
          <div className="space-y-4">
            <div className="flex justify-between items-center">
              <h3 className="text-xl font-semibold">Manage Highlights</h3>
              <button
                onClick={addHighlight}
                className="px-4 py-2 bg-black text-white rounded-lg hover:bg-gray-800"
              >
                Add Highlight
              </button>
            </div>
            <div className="space-y-4">
              {highlights.map((highlight) => (
                <div key={highlight.id} className="p-4 border border-gray-300 rounded-lg">
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    <div>
                      <label className="block text-sm font-medium mb-1">Title</label>
                      <input
                        type="text"
                        value={highlight.title}
                        onChange={(e) => updateHighlight(highlight.id, 'title', e.target.value)}
                        className="w-full px-3 py-2 border border-gray-300 rounded-lg"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium mb-1">Description</label>
                      <textarea
                        value={highlight.description}
                        onChange={(e) => updateHighlight(highlight.id, 'description', e.target.value)}
                        className="w-full px-3 py-2 border border-gray-300 rounded-lg"
                        rows={2}
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium mb-1">Icon SVG</label>
                      <textarea
                        value={highlight.icon}
                        onChange={(e) => updateHighlight(highlight.id, 'icon', e.target.value)}
                        className="w-full px-3 py-2 border border-gray-300 rounded-lg"
                        rows={2}
                      />
                    </div>
                  </div>
                  <button
                    onClick={() => deleteHighlight(highlight.id)}
                    className="mt-2 px-3 py-1 bg-red-500 text-white rounded hover:bg-red-600"
                  >
                    Delete
                  </button>
                </div>
              ))}
            </div>
          </div>
        );

      case 'skills':
        return (
          <div className="space-y-4">
            <div className="flex justify-between items-center">
              <h3 className="text-xl font-semibold">Manage Skills</h3>
              <button
                onClick={addSkill}
                className="px-4 py-2 bg-black text-white rounded-lg hover:bg-gray-800"
              >
                Add Skill
              </button>
            </div>
            <div className="space-y-4">
              {skills.map((skill) => (
                <div key={skill.id} className="flex items-center gap-4 p-4 border border-gray-300 rounded-lg">
                  <input
                    type="text"
                    value={skill.name}
                    onChange={(e) => updateSkill(skill.id, 'name', e.target.value)}
                    className="flex-1 px-3 py-2 border border-gray-300 rounded-lg"
                    placeholder="Skill name"
                  />
                  <input
                    type="number"
                    value={skill.level}
                    onChange={(e) => updateSkill(skill.id, 'level', parseInt(e.target.value))}
                    className="w-20 px-3 py-2 border border-gray-300 rounded-lg"
                    min="0"
                    max="100"
                  />
                  <button
                    onClick={() => deleteSkill(skill.id)}
                    className="px-3 py-1 bg-red-500 text-white rounded hover:bg-red-600"
                  >
                    Delete
                  </button>
                </div>
              ))}
            </div>
          </div>
        );

      case 'experience':
        return (
          <div className="space-y-4">
            <div className="flex justify-between items-center">
              <h3 className="text-xl font-semibold">Manage Experience</h3>
              <button
                onClick={addExperience}
                className="px-4 py-2 bg-black text-white rounded-lg hover:bg-gray-800"
              >
                Add Experience
              </button>
            </div>
            <div className="space-y-4">
              {experiences.map((exp) => (
                <div key={exp.id} className="p-4 border border-gray-300 rounded-lg">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                    <div>
                      <label className="block text-sm font-medium mb-1">Title</label>
                      <input
                        type="text"
                        value={exp.title}
                        onChange={(e) => updateExperience(exp.id, 'title', e.target.value)}
                        className="w-full px-3 py-2 border border-gray-300 rounded-lg"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium mb-1">Company</label>
                      <input
                        type="text"
                        value={exp.company}
                        onChange={(e) => updateExperience(exp.id, 'company', e.target.value)}
                        className="w-full px-3 py-2 border border-gray-300 rounded-lg"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium mb-1">Period</label>
                      <input
                        type="text"
                        value={exp.period}
                        onChange={(e) => updateExperience(exp.id, 'period', e.target.value)}
                        className="w-full px-3 py-2 border border-gray-300 rounded-lg"
                      />
                    </div>
                  </div>
                  <div>
                    <label className="block text-sm font-medium mb-1">Description</label>
                    <textarea
                      value={exp.description}
                      onChange={(e) => updateExperience(exp.id, 'description', e.target.value)}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg"
                      rows={3}
                    />
                  </div>
                  <button
                    onClick={() => deleteExperience(exp.id)}
                    className="mt-2 px-3 py-1 bg-red-500 text-white rounded hover:bg-red-600"
                  >
                    Delete
                  </button>
                </div>
              ))}
            </div>
          </div>
        );

      case 'gallery':
        return (
          <div className="space-y-4">
            <div className="flex justify-between items-center">
              <h3 className="text-xl font-semibold">Manage Gallery</h3>
              <button
                onClick={addGalleryItem}
                className="px-4 py-2 bg-black text-white rounded-lg hover:bg-gray-800"
              >
                Add Image
              </button>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {gallery.map((item) => (
                <div key={item.id} className="p-4 border border-gray-300 rounded-lg">
                  <img src={item.src} alt={item.title} className="w-full h-32 object-cover rounded mb-2" />
                  <input
                    type="text"
                    value={item.title}
                    onChange={(e) => updateGalleryItem(item.id, 'title', e.target.value)}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg mb-2"
                    placeholder="Title"
                  />
                  <input
                    type="text"
                    value={item.category}
                    onChange={(e) => updateGalleryItem(item.id, 'category', e.target.value)}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg mb-2"
                    placeholder="Category"
                  />
                  <input
                    type="text"
                    value={item.src}
                    onChange={(e) => updateGalleryItem(item.id, 'src', e.target.value)}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg mb-2"
                    placeholder="Image URL"
                  />
                  <button
                    onClick={() => deleteGalleryItem(item.id)}
                    className="w-full px-3 py-1 bg-red-500 text-white rounded hover:bg-red-600"
                  >
                    Delete
                  </button>
                </div>
              ))}
            </div>
          </div>
        );

      case 'technologies':
        return (
          <div className="space-y-4">
            <h3 className="text-xl font-semibold">Manage Technologies</h3>
            <div>
              <label className="block text-sm font-medium mb-1">Technologies (comma-separated)</label>
              <textarea
                value={content.technologies.join(', ')}
                onChange={(e) => setContent(prev => ({ 
                  ...prev, 
                  technologies: e.target.value.split(',').map(tech => tech.trim()).filter(tech => tech)
                }))}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg"
                rows={4}
                placeholder="React, Vue.js, Angular, Node.js..."
              />
            </div>
          </div>
        );

      case 'profile':
        return (
          <div className="space-y-4">
            <h3 className="text-xl font-semibold">Profile Settings</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium mb-1">Profile Image</label>
                <input
                  type="file"
                  accept="image/*"
                  onChange={(e) => handleFileUpload(e, 'profileImage')}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg"
                />
                {content.profileImage && (
                  <img src={content.profileImage} alt="Profile" className="mt-2 w-20 h-20 object-cover rounded-full" />
                )}
              </div>
              <div>
                <label className="block text-sm font-medium mb-1">Resume File</label>
                <input
                  type="file"
                  accept=".pdf,.doc,.docx"
                  onChange={(e) => handleFileUpload(e, 'resumeFile')}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg"
                />
                {content.resumeFile && (
                  <div className="mt-2">
                    <span className="text-sm text-green-600">Resume uploaded successfully!</span>
                  </div>
                )}
              </div>
            </div>
          </div>
        );

      case 'content':
        return (
          <div className="space-y-4">
            <h3 className="text-xl font-semibold">Content Management</h3>
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium mb-1">About Text</label>
                <textarea
                  value={content.aboutText}
                  onChange={(e) => setContent(prev => ({ ...prev, aboutText: e.target.value }))}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg"
                  rows={4}
                />
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div>
                  <label className="block text-sm font-medium mb-1">Projects Completed</label>
                  <input
                    type="number"
                    value={content.projectsCompleted}
                    onChange={(e) => setContent(prev => ({ ...prev, projectsCompleted: parseInt(e.target.value) || 0 }))}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium mb-1">Years Experience</label>
                  <input
                    type="number"
                    value={content.yearsExperience}
                    onChange={(e) => setContent(prev => ({ ...prev, yearsExperience: parseInt(e.target.value) || 0 }))}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium mb-1">Technologies Count</label>
                  <input
                    type="number"
                    value={content.technologiesCount}
                    onChange={(e) => setContent(prev => ({ ...prev, technologiesCount: parseInt(e.target.value) || 0 }))}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium mb-1">Email</label>
                  <input
                    type="email"
                    value={content.contactEmail}
                    onChange={(e) => setContent(prev => ({ ...prev, contactEmail: e.target.value }))}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium mb-1">Phone</label>
                  <input
                    type="text"
                    value={content.contactPhone}
                    onChange={(e) => setContent(prev => ({ ...prev, contactPhone: e.target.value }))}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium mb-1">Location</label>
                  <input
                    type="text"
                    value={content.location}
                    onChange={(e) => setContent(prev => ({ ...prev, location: e.target.value }))}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div>
                  <label className="block text-sm font-medium mb-1">GitHub URL</label>
                  <input
                    type="url"
                    value={content.githubUrl}
                    onChange={(e) => setContent(prev => ({ ...prev, githubUrl: e.target.value }))}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium mb-1">LinkedIn URL</label>
                  <input
                    type="url"
                    value={content.linkedinUrl}
                    onChange={(e) => setContent(prev => ({ ...prev, linkedinUrl: e.target.value }))}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium mb-1">Twitter URL</label>
                  <input
                    type="url"
                    value={content.twitterUrl}
                    onChange={(e) => setContent(prev => ({ ...prev, twitterUrl: e.target.value }))}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg"
                  />
                </div>
              </div>
            </div>
          </div>
        );

      default:
        return <div>Select a tab to edit content</div>;
    }
  };

  return (
    <section id="dashboard" className="py-20 px-6 bg-gray-50 min-h-screen overflow-hidden">
      <div className="container mx-auto max-w-6xl">
        <h2 className="text-3xl font-bold mb-8 text-center">Portfolio Dashboard</h2>
        
        <DashboardTabs activeTab={activeTab} setActiveTab={setActiveTab} />
        
        <div className="bg-white rounded-lg shadow-lg p-6 overflow-auto max-h-[70vh]">
          {renderContent()}
        </div>
        
        <div className="mt-6 text-center">
          <button
            onClick={handleSave}
            className="px-8 py-3 bg-black text-white rounded-lg hover:bg-gray-800 font-semibold"
          >
            Save All Changes
          </button>
        </div>
      </div>
    </section>
  );
};
