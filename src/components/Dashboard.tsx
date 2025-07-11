
import React, { useState, useEffect } from 'react';
import { Edit3, Save, EyeOff, Plus, Trash2, User, Upload } from 'lucide-react';
import { Button } from './ui/button';
import { Input } from './ui/input';
import { Label } from './ui/label';
import { useToast } from '@/hooks/use-toast';
import { usePortfolio } from '../contexts/PortfolioContext';
import { DashboardLogin } from './dashboard/DashboardLogin';
import { DashboardTabs } from './dashboard/DashboardTabs';
import { ProjectsTab } from './dashboard/ProjectsTab';

export const Dashboard = () => {
  const [isVisible, setIsVisible] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [activeTab, setActiveTab] = useState('projects');
  
  const { toast } = useToast();
  const { portfolioData, updateProjects, updateSkills, updateExperiences, updateGallery, updateHighlights, updateCertifications, updateContent, saveChanges } = usePortfolio();

  // Store password in localStorage for persistence
  const [adminPassword, setAdminPassword] = useState(() => {
    return localStorage.getItem('adminPassword') || 'Dheeraj@2004';
  });

  // Local state for editing
  const [projects, setProjects] = useState(portfolioData.projects);
  const [skills, setSkills] = useState(portfolioData.skills);
  const [experiences, setExperiences] = useState(portfolioData.experiences);
  const [gallery, setGallery] = useState(portfolioData.gallery);
  const [highlights, setHighlights] = useState(portfolioData.highlights);
  const [certifications, setCertifications] = useState(portfolioData.certifications);
  const [content, setContent] = useState(portfolioData.content);

  const [newProject, setNewProject] = useState({ title: '', description: '', tech: '', image: '', github: '', live: '', featured: false });
  const [newSkill, setNewSkill] = useState({ name: '', level: 50 });
  const [newExperience, setNewExperience] = useState({ title: '', company: '', period: '', description: '' });
  const [newGalleryItem, setNewGalleryItem] = useState({ src: '', title: '', category: '' });
  const [newHighlight, setNewHighlight] = useState({ icon: '', title: '', description: '' });
  const [newCertification, setNewCertification] = useState({ name: '', issuer: '', date: '', description: '' });
  const [newTechnology, setNewTechnology] = useState('');
  const [newSocialLink, setNewSocialLink] = useState({ name: '', url: '' });

  // Update local state when portfolio data changes
  useEffect(() => {
    console.log('Portfolio data updated, syncing local state');
    setProjects(portfolioData.projects);
    setSkills(portfolioData.skills);
    setExperiences(portfolioData.experiences);
    setGallery(portfolioData.gallery);
    setHighlights(portfolioData.highlights);
    setCertifications(portfolioData.certifications);
    setContent(portfolioData.content);
  }, [portfolioData]);

  const handleLogin = () => {
    setIsLoggedIn(true);
  };

  const handleSaveChanges = () => {
    console.log('Saving changes...');
    
    updateProjects(projects);
    updateSkills(skills);
    updateExperiences(experiences);
    updateGallery(gallery);
    updateHighlights(highlights);
    updateCertifications(certifications);
    updateContent(content);
    
    setTimeout(() => {
      toast({
        title: "Success",
        description: "All changes have been saved successfully!",
      });
    }, 100);
  };

  const handleLogout = () => {
    setIsLoggedIn(false);
    setIsVisible(false);
    toast({
      title: "Logged out",
      description: "You have been logged out successfully",
    });
  };

  const handleImageUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        const updatedContent = {...content, profileImage: reader.result as string};
        setContent(updatedContent);
        toast({
          title: "Success",
          description: "Profile image updated successfully! Don't forget to save changes.",
        });
      };
      reader.readAsDataURL(file);
    }
  };

  const handleResumeUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        const updatedContent = {...content, resumeFile: reader.result as string};
        setContent(updatedContent);
        toast({
          title: "Success",
          description: "Resume uploaded successfully! Don't forget to save changes.",
        });
      };
      reader.readAsDataURL(file);
    }
  };

  const handleCVUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        const updatedContent = {...content, cvFile: reader.result as string};
        setContent(updatedContent);
        toast({
          title: "Success",
          description: "CV uploaded successfully! Don't forget to save changes.",
        });
      };
      reader.readAsDataURL(file);
    }
  };

  const addProject = () => {
    if (newProject.title && newProject.description) {
      const updatedProjects = [...projects, { ...newProject, id: Date.now() }];
      setProjects(updatedProjects);
      setNewProject({ title: '', description: '', tech: '', image: '', github: '', live: '', featured: false });
      toast({ title: "Success", description: "Project added successfully! Don't forget to save changes." });
    }
  };

  const addHighlight = () => {
    if (newHighlight.title && newHighlight.description) {
      const updatedHighlights = [...highlights, { ...newHighlight, id: Date.now() }];
      setHighlights(updatedHighlights);
      setNewHighlight({ icon: '', title: '', description: '' });
      toast({ title: "Success", description: "Highlight card added successfully! Don't forget to save changes." });
    }
  };

  const addSkill = () => {
    if (newSkill.name) {
      const updatedSkills = [...skills, { ...newSkill, id: Date.now() }];
      setSkills(updatedSkills);
      setNewSkill({ name: '', level: 50 });
      toast({ title: "Success", description: "Skill added successfully! Don't forget to save changes." });
    }
  };

  const addExperience = () => {
    if (newExperience.title && newExperience.company) {
      const updatedExperiences = [...experiences, { ...newExperience, id: Date.now() }];
      setExperiences(updatedExperiences);
      setNewExperience({ title: '', company: '', period: '', description: '' });
      toast({ title: "Success", description: "Experience added successfully! Don't forget to save changes." });
    }
  };

  const addGalleryItem = () => {
    if (newGalleryItem.src && newGalleryItem.title) {
      const updatedGallery = [...gallery, { ...newGalleryItem, id: Date.now() }];
      setGallery(updatedGallery);
      setNewGalleryItem({ src: '', title: '', category: '' });
      toast({ title: "Success", description: "Gallery item added successfully! Don't forget to save changes." });
    }
  };

  const addCertification = () => {
    if (newCertification.name) {
      const updatedCertifications = [...certifications, { ...newCertification, id: Date.now() }];
      setCertifications(updatedCertifications);
      setNewCertification({ name: '', issuer: '', date: '', description: '' });
      toast({ title: "Success", description: "Certification added successfully! Don't forget to save changes." });
    }
  };

  const addTechnology = () => {
    if (newTechnology && !content.technologies.includes(newTechnology)) {
      const updatedContent = {...content, technologies: [...content.technologies, newTechnology]};
      setContent(updatedContent);
      setNewTechnology('');
      toast({ title: "Success", description: "Technology added successfully! Don't forget to save changes." });
    }
  };

  const addSocialLink = () => {
    if (newSocialLink.name && newSocialLink.url) {
      const updatedContent = {
        ...content, 
        socialLinks: [...(content.socialLinks || []), { ...newSocialLink, id: Date.now() }]
      };
      setContent(updatedContent);
      setNewSocialLink({ name: '', url: '' });
      toast({ title: "Success", description: "Social link added successfully! Don't forget to save changes." });
    }
  };

  const removeProject = (id: number) => {
    const updatedProjects = projects.filter(p => p.id !== id);
    setProjects(updatedProjects);
    toast({ title: "Deleted", description: "Project removed successfully! Don't forget to save changes." });
  };

  const removeHighlight = (id: number) => {
    const updatedHighlights = highlights.filter(h => h.id !== id);
    setHighlights(updatedHighlights);
    toast({ title: "Deleted", description: "Highlight card removed successfully! Don't forget to save changes." });
  };

  const removeSkill = (id: number) => {
    const updatedSkills = skills.filter(s => s.id !== id);
    setSkills(updatedSkills);
    toast({ title: "Deleted", description: "Skill removed successfully! Don't forget to save changes." });
  };

  const removeExperience = (id: number) => {
    const updatedExperiences = experiences.filter(e => e.id !== id);
    setExperiences(updatedExperiences);
    toast({ title: "Deleted", description: "Experience removed successfully! Don't forget to save changes." });
  };

  const removeGalleryItem = (id: number) => {
    const updatedGallery = gallery.filter(g => g.id !== id);
    setGallery(updatedGallery);
    toast({ title: "Deleted", description: "Gallery item removed successfully! Don't forget to save changes." });
  };

  const removeCertification = (id: number) => {
    const updatedCertifications = certifications.filter(c => c.id !== id);
    setCertifications(updatedCertifications);
    toast({ title: "Deleted", description: "Certification removed successfully! Don't forget to save changes." });
  };

  const removeTechnology = (tech: string) => {
    const updatedContent = {...content, technologies: content.technologies.filter(t => t !== tech)};
    setContent(updatedContent);
    toast({ title: "Deleted", description: "Technology removed successfully! Don't forget to save changes." });
  };

  const removeSocialLink = (id: number) => {
    const updatedContent = {
      ...content, 
      socialLinks: (content.socialLinks || []).filter(link => link.id !== id)
    };
    setContent(updatedContent);
    toast({ title: "Deleted", description: "Social link removed successfully! Don't forget to save changes." });
  };

  const toggleProjectFeatured = (id: number) => {
    const updatedProjects = projects.map(p => p.id === id ? {...p, featured: !p.featured} : p);
    setProjects(updatedProjects);
  };

  if (!isVisible) {
    return (
      <button
        onClick={() => setIsVisible(true)}
        className="fixed bottom-4 right-4 bg-black text-white p-3 rounded-full shadow-lg hover:bg-gray-800 transition-colors duration-300 z-50"
      >
        <Edit3 size={20} />
      </button>
    );
  }

  // Login screen
  if (!isLoggedIn) {
    return (
      <DashboardLogin
        onLogin={handleLogin}
        onClose={() => setIsVisible(false)}
        adminPassword={adminPassword}
        setAdminPassword={setAdminPassword}
        contactEmail={content.contactEmail}
      />
    );
  }

  // Main dashboard
  return (
    <div className="fixed inset-0 bg-black/80 backdrop-blur-sm z-50 flex items-center justify-center p-4">
      <div className="bg-white rounded-lg p-6 w-full max-w-6xl h-[90vh] border border-gray-300 flex flex-col overflow-hidden">
        <div className="flex justify-between items-center mb-6 flex-shrink-0">
          <h2 className="text-2xl font-bold text-black">Portfolio Dashboard</h2>
          <div className="flex gap-2">
            <Button onClick={handleLogout} variant="outline" size="sm">
              Logout
            </Button>
            <button
              onClick={() => setIsVisible(false)}
              className="text-gray-600 hover:text-black"
            >
              <EyeOff size={24} />
            </button>
          </div>
        </div>

        <div className="flex-shrink-0">
          <DashboardTabs activeTab={activeTab} setActiveTab={setActiveTab} />
        </div>

        <div className="flex-1 overflow-hidden">
          <div 
            className="h-full overflow-y-auto pr-2"
            style={{
              scrollbarWidth: 'thin',
              scrollbarColor: '#cbd5e0 #f7fafc'
            }}
          >
            
            {activeTab === 'projects' && (
              <ProjectsTab projects={projects} setProjects={setProjects} />
            )}

            {/* Highlights Tab */}
            {activeTab === 'highlights' && (
              <div className="space-y-6">
                <h3 className="text-xl font-semibold text-black">Manage Highlight Cards</h3>
                
                <div className="bg-gray-100 p-4 rounded-lg border border-gray-300">
                  <h4 className="text-lg font-medium text-black mb-4">Add New Highlight Card</h4>
                  <div className="space-y-3">
                    <Input
                      placeholder="Card Title"
                      value={newHighlight.title}
                      onChange={(e) => setNewHighlight({...newHighlight, title: e.target.value})}
                      className="bg-white text-black border-gray-300"
                    />
                    <textarea
                      placeholder="Card Description"
                      value={newHighlight.description}
                      onChange={(e) => setNewHighlight({...newHighlight, description: e.target.value})}
                      className="w-full p-3 bg-white text-black rounded-lg border border-gray-300"
                      rows={3}
                    />
                    <Input
                      placeholder="SVG Icon Code (optional)"
                      value={newHighlight.icon}
                      onChange={(e) => setNewHighlight({...newHighlight, icon: e.target.value})}
                      className="bg-white text-black border-gray-300"
                    />
                    <Button onClick={addHighlight} className="bg-black hover:bg-gray-800 text-white">
                      <Plus size={16} className="mr-2" />
                      Add Highlight Card
                    </Button>
                  </div>
                </div>

                <div className="grid gap-4 md:grid-cols-2">
                  {highlights.map((highlight) => (
                    <div key={highlight.id} className="bg-gray-100 p-4 rounded-lg border border-gray-300">
                      <div className="flex justify-between items-start mb-2">
                        <h5 className="text-black font-medium">{highlight.title}</h5>
                        <button
                          onClick={() => removeHighlight(highlight.id)}
                          className="text-red-600 hover:text-red-800"
                        >
                          <Trash2 size={16} />
                        </button>
                      </div>
                      <p className="text-gray-600 text-sm">{highlight.description}</p>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Gallery Tab */}
            {activeTab === 'gallery' && (
              <div className="space-y-6">
                <h3 className="text-xl font-semibold text-black">Manage Gallery</h3>
                
                <div className="bg-gray-100 p-4 rounded-lg border border-gray-300">
                  <h4 className="text-lg font-medium text-black mb-4">Add New Gallery Item</h4>
                  <div className="space-y-3">
                    <Input
                      placeholder="Image URL"
                      value={newGalleryItem.src}
                      onChange={(e) => setNewGalleryItem({...newGalleryItem, src: e.target.value})}
                      className="bg-white text-black border-gray-300"
                    />
                    <Input
                      placeholder="Image Title"
                      value={newGalleryItem.title}
                      onChange={(e) => setNewGalleryItem({...newGalleryItem, title: e.target.value})}
                      className="bg-white text-black border-gray-300"
                    />
                    <Input
                      placeholder="Category"
                      value={newGalleryItem.category}
                      onChange={(e) => setNewGalleryItem({...newGalleryItem, category: e.target.value})}
                      className="bg-white text-black border-gray-300"
                    />
                    <Button onClick={addGalleryItem} className="bg-black hover:bg-gray-800 text-white">
                      <Plus size={16} className="mr-2" />
                      Add Gallery Item
                    </Button>
                  </div>
                </div>

                <div className="space-y-3">
                  {gallery.map((item) => (
                    <div key={item.id} className="bg-gray-100 p-4 rounded-lg flex justify-between items-start border border-gray-300">
                      <div className="flex gap-4">
                        <img src={item.src} alt={item.title} className="w-16 h-16 object-cover rounded" />
                        <div>
                          <h5 className="text-black font-medium">{item.title}</h5>
                          <p className="text-gray-600">{item.category}</p>
                        </div>
                      </div>
                      <button
                        onClick={() => removeGalleryItem(item.id)}
                        className="text-red-600 hover:text-red-800"
                      >
                        <Trash2 size={16} />
                      </button>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Certifications Tab */}
            {activeTab === 'certifications' && (
              <div className="space-y-6">
                <h3 className="text-xl font-semibold text-black">Manage Certifications</h3>
                
                <div className="bg-gray-100 p-4 rounded-lg border border-gray-300">
                  <h4 className="text-lg font-medium text-black mb-4">Add New Certification</h4>
                  <div className="space-y-3">
                    <Input
                      placeholder="Certification Name"
                      value={newCertification.name}
                      onChange={(e) => setNewCertification({...newCertification, name: e.target.value})}
                      className="bg-white text-black border-gray-300"
                    />
                    <Input
                      placeholder="Issuing Organization (optional)"
                      value={newCertification.issuer}
                      onChange={(e) => setNewCertification({...newCertification, issuer: e.target.value})}
                      className="bg-white text-black border-gray-300"
                    />
                    <Input
                      placeholder="Date (optional)"
                      value={newCertification.date}
                      onChange={(e) => setNewCertification({...newCertification, date: e.target.value})}
                      className="bg-white text-black border-gray-300"
                    />
                    <textarea
                      placeholder="Description (optional)"
                      value={newCertification.description}
                      onChange={(e) => setNewCertification({...newCertification, description: e.target.value})}
                      className="w-full p-3 bg-white text-black rounded-lg border border-gray-300"
                      rows={3}
                    />
                    <Button onClick={addCertification} className="bg-black hover:bg-gray-800 text-white">
                      <Plus size={16} className="mr-2" />
                      Add Certification
                    </Button>
                  </div>
                </div>

                <div className="space-y-3">
                  {certifications.map((cert) => (
                    <div key={cert.id} className="bg-gray-100 p-4 rounded-lg flex justify-between items-start border border-gray-300">
                      <div>
                        <h5 className="text-black font-medium">{cert.name}</h5>
                        {cert.issuer && <p className="text-gray-600">{cert.issuer}</p>}
                        {cert.date && <p className="text-gray-500 text-sm">{cert.date}</p>}
                        {cert.description && <p className="text-gray-700 text-sm mt-2">{cert.description}</p>}
                      </div>
                      <button
                        onClick={() => removeCertification(cert.id)}
                        className="text-red-600 hover:text-red-800"
                      >
                        <Trash2 size={16} />
                      </button>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Technologies Tab */}
            {activeTab === 'technologies' && (
              <div className="space-y-6">
                <h3 className="text-xl font-semibold text-black">Manage Technologies</h3>
                
                <div className="bg-gray-100 p-4 rounded-lg border border-gray-300">
                  <h4 className="text-lg font-medium text-black mb-4">Add New Technology</h4>
                  <div className="flex gap-3">
                    <Input
                      placeholder="Technology Name"
                      value={newTechnology}
                      onChange={(e) => setNewTechnology(e.target.value)}
                      className="bg-white text-black border-gray-300"
                    />
                    <Button onClick={addTechnology} className="bg-black hover:bg-gray-800 text-white">
                      <Plus size={16} className="mr-2" />
                      Add
                    </Button>
                  </div>
                </div>

                <div className="flex flex-wrap gap-2">
                  {content.technologies.map((tech) => (
                    <div key={tech} className="flex items-center gap-2 bg-gray-200 px-3 py-1 rounded-full">
                      <span className="text-black">{tech}</span>
                      <button
                        onClick={() => removeTechnology(tech)}
                        className="text-red-600 hover:text-red-800"
                      >
                        <Trash2 size={14} />
                      </button>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Profile Tab */}
            {activeTab === 'profile' && (
              <div className="space-y-6">
                <h3 className="text-xl font-semibold text-black">Profile Management</h3>
                
                <div className="bg-gray-100 p-6 rounded-lg border border-gray-300">
                  <h4 className="text-lg font-medium text-black mb-4">Profile Picture</h4>
                  <div className="flex items-center gap-6">
                    <div className="w-24 h-24 rounded-full bg-black flex items-center justify-center overflow-hidden">
                      {content.profileImage ? (
                        <img 
                          src={content.profileImage} 
                          alt="Profile" 
                          className="w-full h-full object-cover"
                        />
                      ) : (
                        <User size={40} className="text-white" />
                      )}
                    </div>
                    <div className="flex-1">
                      <input
                        type="file"
                        accept="image/*"
                        onChange={handleImageUpload}
                        className="hidden"
                        id="profileImageInput"
                      />
                      <Label htmlFor="profileImageInput" className="cursor-pointer">
                        <div className="flex items-center gap-2 px-4 py-2 bg-black hover:bg-gray-800 rounded-lg text-white transition-colors">
                          <Upload size={16} />
                          Upload New Photo
                        </div>
                      </Label>
                      <p className="text-gray-600 text-sm mt-2">
                        Recommended: Square image, at least 200x200px
                      </p>
                    </div>
                  </div>
                </div>

                <div className="bg-gray-100 p-6 rounded-lg border border-gray-300">
                  <h4 className="text-lg font-medium text-black mb-4">Resume & CV Upload</h4>
                  <div className="space-y-4">
                    <div className="flex items-center gap-6">
                      <div className="flex-1">
                        <input
                          type="file"
                          accept=".pdf,.doc,.docx"
                          onChange={handleResumeUpload}
                          className="hidden"
                          id="resumeInput"
                        />
                        <Label htmlFor="resumeInput" className="cursor-pointer">
                          <div className="flex items-center gap-2 px-4 py-2 bg-black hover:bg-gray-800 rounded-lg text-white transition-colors">
                            <Upload size={16} />
                            Upload Resume
                          </div>
                        </Label>
                        {content.resumeFile && (
                          <p className="text-green-600 text-sm mt-2">✓ Resume uploaded successfully</p>
                        )}
                      </div>
                    </div>
                    
                    <div className="flex items-center gap-6">
                      <div className="flex-1">
                        <input
                          type="file"
                          accept=".pdf,.doc,.docx"
                          onChange={handleCVUpload}
                          className="hidden"
                          id="cvInput"
                        />
                        <Label htmlFor="cvInput" className="cursor-pointer">
                          <div className="flex items-center gap-2 px-4 py-2 bg-gray-700 hover:bg-gray-600 rounded-lg text-white transition-colors">
                            <Upload size={16} />
                            Upload CV
                          </div>
                        </Label>
                        {content.cvFile && (
                          <p className="text-green-600 text-sm mt-2">✓ CV uploaded successfully</p>
                        )}
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            )}

            {/* Skills Tab */}
            {activeTab === 'skills' && (
              <div className="space-y-6">
                <h3 className="text-xl font-semibold text-black">Manage Skills</h3>
                
                <div className="bg-gray-100 p-4 rounded-lg border border-gray-300">
                  <h4 className="text-lg font-medium text-black mb-4">Add New Skill</h4>
                  <div className="space-y-3">
                    <Input
                      placeholder="Skill Name"
                      value={newSkill.name}
                      onChange={(e) => setNewSkill({...newSkill, name: e.target.value})}
                      className="bg-white text-black border-gray-300"
                    />
                    <div>
                      <Label className="text-gray-700 block mb-2">Proficiency Level: {newSkill.level}%</Label>
                      <input
                        type="range"
                        min="0"
                        max="100"
                        value={newSkill.level}
                        onChange={(e) => setNewSkill({...newSkill, level: parseInt(e.target.value)})}
                        className="w-full"
                      />
                    </div>
                    <Button onClick={addSkill} className="bg-black hover:bg-gray-800 text-white">
                      <Plus size={16} className="mr-2" />
                      Add Skill
                    </Button>
                  </div>
                </div>

                <div className="space-y-3">
                  {skills.map((skill) => (
                    <div key={skill.id} className="bg-gray-100 p-4 rounded-lg flex justify-between items-center border border-gray-300">
                      <div className="flex-1">
                        <div className="flex justify-between items-center mb-2">
                          <span className="text-black font-medium">{skill.name}</span>
                          <span className="text-gray-600">{skill.level}%</span>
                        </div>
                        <div className="w-full bg-gray-300 rounded-full h-2">
                          <div
                            className="bg-black h-2 rounded-full"
                            style={{ width: `${skill.level}%` }}
                          />
                        </div>
                      </div>
                      <button
                        onClick={() => removeSkill(skill.id)}
                        className="text-red-600 hover:text-red-800 ml-4"
                      >
                        <Trash2 size={16} />
                      </button>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Experience Tab */}
            {activeTab === 'experience' && (
              <div className="space-y-6">
                <h3 className="text-xl font-semibold text-black">Manage Experience</h3>
                
                <div className="bg-gray-100 p-4 rounded-lg border border-gray-300">
                  <h4 className="text-lg font-medium text-black mb-4">Add New Experience</h4>
                  <div className="space-y-3">
                    <Input
                      placeholder="Job Title"
                      value={newExperience.title}
                      onChange={(e) => setNewExperience({...newExperience, title: e.target.value})}
                      className="bg-white text-black border-gray-300"
                    />
                    <Input
                      placeholder="Company Name"
                      value={newExperience.company}
                      onChange={(e) => setNewExperience({...newExperience, company: e.target.value})}
                      className="bg-white text-black border-gray-300"
                    />
                    <Input
                      placeholder="Period (e.g., 2023 - Present)"
                      value={newExperience.period}
                      onChange={(e) => setNewExperience({...newExperience, period: e.target.value})}
                      className="bg-white text-black border-gray-300"
                    />
                    <textarea
                      placeholder="Job Description"
                      value={newExperience.description}
                      onChange={(e) => setNewExperience({...newExperience, description: e.target.value})}
                      className="w-full p-3 bg-white text-black rounded-lg border border-gray-300"
                      rows={3}
                    />
                    <Button onClick={addExperience} className="bg-black hover:bg-gray-800 text-white">
                      <Plus size={16} className="mr-2" />
                      Add Experience
                    </Button>
                  </div>
                </div>

                <div className="space-y-3">
                  {experiences.map((exp) => (
                    <div key={exp.id} className="bg-gray-100 p-4 rounded-lg flex justify-between items-start border border-gray-300">
                      <div>
                        <h5 className="text-black font-medium">{exp.title}</h5>
                        <p className="text-gray-800">{exp.company}</p>
                        <p className="text-gray-600 text-sm">{exp.period}</p>
                        <p className="text-gray-700 text-sm mt-2">{exp.description}</p>
                      </div>
                      <button
                        onClick={() => removeExperience(exp.id)}
                        className="text-red-600 hover:text-red-800"
                      >
                        <Trash2 size={16} />
                      </button>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Content Tab */}
            {activeTab === 'content' && (
              <div className="space-y-6">
                <h3 className="text-xl font-semibold text-black">Manage Content</h3>
                
                <div className="space-y-4">
                  <div className="bg-gray-100 p-4 rounded-lg border border-gray-300">
                    <Label className="text-black text-lg block mb-3">About Section</Label>
                    <textarea
                      value={content.aboutText}
                      onChange={(e) => setContent({...content, aboutText: e.target.value})}
                      className="w-full p-3 bg-white text-black rounded-lg border border-gray-300"
                      rows={4}
                      placeholder="Update about section content..."
                    />
                  </div>

                  <div className="bg-gray-100 p-4 rounded-lg border border-gray-300">
                    <Label className="text-black text-lg block mb-3">About Section Stats</Label>
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
                      <div>
                        <Label className="text-gray-700 block mb-1">Projects Completed</Label>
                        <Input
                          type="number"
                          value={content.projectsCompleted}
                          onChange={(e) => setContent({...content, projectsCompleted: parseInt(e.target.value) || 0})}
                          className="bg-white text-black border-gray-300"
                        />
                      </div>
                      <div>
                        <Label className="text-gray-700 block mb-1">Years Experience</Label>
                        <Input
                          type="number"
                          value={content.yearsExperience}
                          onChange={(e) => setContent({...content, yearsExperience: parseInt(e.target.value) || 0})}
                          className="bg-white text-black border-gray-300"
                        />
                      </div>
                      <div>
                        <Label className="text-gray-700 block mb-1">Technologies Count</Label>
                        <Input
                          type="number"
                          value={content.technologiesCount}
                          onChange={(e) => setContent({...content, technologiesCount: parseInt(e.target.value) || 0})}
                          className="bg-white text-black border-gray-300"
                        />
                      </div>
                    </div>
                  </div>

                  <div className="bg-gray-100 p-4 rounded-lg border border-gray-300">
                    <Label className="text-black text-lg block mb-3">Contact Information</Label>
                    <div className="space-y-3">
                      <Input
                        placeholder="Email Address"
                        value={content.contactEmail}
                        onChange={(e) => setContent({...content, contactEmail: e.target.value})}
                        className="bg-white text-black border-gray-300"
                      />
                      <Input
                        placeholder="Phone Number"
                        value={content.contactPhone}
                        onChange={(e) => setContent({...content, contactPhone: e.target.value})}
                        className="bg-white text-black border-gray-300"
                      />
                      <Input
                        placeholder="Location"
                        value={content.location}
                        onChange={(e) => setContent({...content, location: e.target.value})}
                        className="bg-white text-black border-gray-300"
                      />
                    </div>
                  </div>

                  <div className="bg-gray-100 p-4 rounded-lg border border-gray-300">
                    <Label className="text-black text-lg block mb-3">Social Media Links</Label>
                    <div className="space-y-3 mb-4">
                      <Input
                        placeholder="GitHub URL"
                        value={content.githubUrl}
                        onChange={(e) => setContent({...content, githubUrl: e.target.value})}
                        className="bg-white text-black border-gray-300"
                      />
                      <Input
                        placeholder="LinkedIn URL"
                        value={content.linkedinUrl}
                        onChange={(e) => setContent({...content, linkedinUrl: e.target.value})}
                        className="bg-white text-black border-gray-300"
                      />
                      <Input
                        placeholder="Twitter URL"
                        value={content.twitterUrl}
                        onChange={(e) => setContent({...content, twitterUrl: e.target.value})}
                        className="bg-white text-black border-gray-300"
                      />
                    </div>
                    
                    <div className="border-t border-gray-300 pt-4">
                      <h4 className="text-lg font-medium text-black mb-4">Add Custom Social Links</h4>
                      <div className="space-y-3 mb-4">
                        <Input
                          placeholder="Platform Name (e.g., Instagram, YouTube)"
                          value={newSocialLink.name}
                          onChange={(e) => setNewSocialLink({...newSocialLink, name: e.target.value})}
                          className="bg-white text-black border-gray-300"
                        />
                        <Input
                          placeholder="URL"
                          value={newSocialLink.url}
                          onChange={(e) => setNewSocialLink({...newSocialLink, url: e.target.value})}
                          className="bg-white text-black border-gray-300"
                        />
                        <Button onClick={addSocialLink} className="bg-black hover:bg-gray-800 text-white">
                          <Plus size={16} className="mr-2" />
                          Add Social Link
                        </Button>
                      </div>
                      
                      {content.socialLinks && content.socialLinks.length > 0 && (
                        <div className="space-y-2">
                          <h5 className="font-medium text-black">Custom Social Links:</h5>
                          {content.socialLinks.map((link) => (
                            <div key={link.id} className="flex justify-between items-center bg-white p-3 rounded border border-gray-300">
                              <div>
                                <span className="font-medium text-black">{link.name}</span>
                                <span className="text-gray-600 text-sm block">{link.url}</span>
                              </div>
                              <button
                                onClick={() => removeSocialLink(link.id)}
                                className="text-red-600 hover:text-red-800"
                              >
                                <Trash2 size={16} />
                              </button>
                            </div>
                          ))}
                        </div>
                      )}
                    </div>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>

        {/* Save Button */}
        <div className="mt-6 pt-6 border-t border-gray-300 flex-shrink-0">
          <Button onClick={handleSaveChanges} className="bg-black hover:bg-gray-800 text-white">
            <Save size={20} className="mr-2" />
            Save Changes
          </Button>
        </div>
      </div>
      
      <style>{`
        .custom-scrollbar {
          scrollbar-width: thin;
          scrollbar-color: #cbd5e0 #f7fafc;
        }
        .custom-scrollbar::-webkit-scrollbar {
          width: 6px;
        }
        .custom-scrollbar::-webkit-scrollbar-track {
          background: #f7fafc;
          border-radius: 3px;
        }
        .custom-scrollbar::-webkit-scrollbar-thumb {
          background: #cbd5e0;
          border-radius: 3px;
        }
        .custom-scrollbar::-webkit-scrollbar-thumb:hover {
          background: #a0aec0;
        }
      `}</style>
    </div>
  );
};
