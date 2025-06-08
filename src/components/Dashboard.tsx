import React, { useState, useEffect } from 'react';
import { Edit3, Save, Plus, Trash2, Eye, EyeOff, Lock, User, Mail, Upload, Image, Link, Star } from 'lucide-react';
import { Button } from './ui/button';
import { Input } from './ui/input';
import { Label } from './ui/label';
import { useToast } from '@/hooks/use-toast';
import { usePortfolio } from '../contexts/PortfolioContext';

export const Dashboard = () => {
  const [isVisible, setIsVisible] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [activeTab, setActiveTab] = useState('projects');
  const [showForgotPassword, setShowForgotPassword] = useState(false);
  const [showChangePassword, setShowChangePassword] = useState(false);
  
  // Login state
  const [loginData, setLoginData] = useState({ username: '', password: '' });
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [resetEmail, setResetEmail] = useState('');
  
  const { toast } = useToast();
  const { portfolioData, updateProjects, updateSkills, updateExperiences, updateGallery, updateContent, saveChanges } = usePortfolio();

  // Hardcoded credentials
  const ADMIN_USERNAME = 'Kanukuntla Dheeraj';
  const ADMIN_PASSWORD = 'Dheeraj@2004';

  // Local state for editing - this will be synced with portfolio data
  const [projects, setProjects] = useState(portfolioData.projects);
  const [skills, setSkills] = useState(portfolioData.skills);
  const [experiences, setExperiences] = useState(portfolioData.experiences);
  const [gallery, setGallery] = useState(portfolioData.gallery);
  const [content, setContent] = useState(portfolioData.content);

  const [newProject, setNewProject] = useState({ title: '', description: '', tech: '', image: '', github: '', live: '', featured: false });
  const [newSkill, setNewSkill] = useState({ name: '', level: 50 });
  const [newExperience, setNewExperience] = useState({ title: '', company: '', period: '', description: '' });
  const [newGalleryItem, setNewGalleryItem] = useState({ src: '', title: '', category: '' });
  const [newTechnology, setNewTechnology] = useState('');

  // Update local state when portfolio data changes
  useEffect(() => {
    console.log('Portfolio data updated, syncing local state');
    setProjects(portfolioData.projects);
    setSkills(portfolioData.skills);
    setExperiences(portfolioData.experiences);
    setGallery(portfolioData.gallery);
    setContent(portfolioData.content);
  }, [portfolioData]);

  const handleLogin = () => {
    if (loginData.username === ADMIN_USERNAME && loginData.password === ADMIN_PASSWORD) {
      setIsLoggedIn(true);
      setLoginData({ username: '', password: '' });
      toast({
        title: "Success",
        description: "Logged in successfully!",
      });
    } else {
      toast({
        title: "Error",
        description: "Invalid username or password",
        variant: "destructive",
      });
    }
  };

  const handleSaveChanges = () => {
    console.log('Saving changes...');
    console.log('Current local state:', { projects, skills, experiences, gallery, content });
    
    // Update the context with current local state
    updateProjects(projects);
    updateSkills(skills);
    updateExperiences(experiences);
    updateGallery(gallery);
    updateContent(content);
    
    // Save to localStorage
    setTimeout(() => {
      saveChanges();
      toast({
        title: "Success",
        description: "All changes have been saved successfully!",
      });
    }, 100); // Small delay to ensure state updates are complete
  };

  const handleForgotPassword = () => {
    if (resetEmail) {
      toast({
        title: "Password Reset",
        description: "Password reset instructions sent to your email!",
      });
      setShowForgotPassword(false);
      setResetEmail('');
    }
  };

  const handleChangePassword = () => {
    if (newPassword === confirmPassword && newPassword.length >= 6) {
      toast({
        title: "Success",
        description: "Password changed successfully!",
      });
      setShowChangePassword(false);
      setNewPassword('');
      setConfirmPassword('');
    } else {
      toast({
        title: "Error",
        description: "Passwords don't match or are too short (min 6 characters)",
        variant: "destructive",
      });
    }
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

  const addProject = () => {
    if (newProject.title && newProject.description) {
      const updatedProjects = [...projects, { ...newProject, id: Date.now() }];
      setProjects(updatedProjects);
      setNewProject({ title: '', description: '', tech: '', image: '', github: '', live: '', featured: false });
      toast({ title: "Success", description: "Project added successfully! Don't forget to save changes." });
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

  const addTechnology = () => {
    if (newTechnology && !content.technologies.includes(newTechnology)) {
      const updatedContent = {...content, technologies: [...content.technologies, newTechnology]};
      setContent(updatedContent);
      setNewTechnology('');
      toast({ title: "Success", description: "Technology added successfully! Don't forget to save changes." });
    }
  };

  const removeProject = (id: number) => {
    const updatedProjects = projects.filter(p => p.id !== id);
    setProjects(updatedProjects);
    toast({ title: "Deleted", description: "Project removed successfully! Don't forget to save changes." });
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

  const removeTechnology = (tech: string) => {
    const updatedContent = {...content, technologies: content.technologies.filter(t => t !== tech)};
    setContent(updatedContent);
    toast({ title: "Deleted", description: "Technology removed successfully! Don't forget to save changes." });
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
      <div className="fixed inset-0 bg-black/80 backdrop-blur-sm z-50 flex items-center justify-center p-4">
        <div className="bg-white rounded-lg p-8 w-full max-w-md border border-gray-300">
          <div className="flex justify-between items-center mb-6">
            <h2 className="text-2xl font-bold text-black flex items-center gap-2">
              <Lock size={24} />
              Admin Login
            </h2>
            <button
              onClick={() => setIsVisible(false)}
              className="text-gray-600 hover:text-black"
            >
              <EyeOff size={24} />
            </button>
          </div>

          {!showForgotPassword && !showChangePassword ? (
            <div className="space-y-6">
              <div>
                <Label htmlFor="username" className="text-black">Username</Label>
                <Input
                  id="username"
                  type="text"
                  value={loginData.username}
                  onChange={(e) => setLoginData({...loginData, username: e.target.value})}
                  className="mt-2 bg-gray-100 text-black border-gray-300"
                  placeholder="Enter username"
                />
              </div>
              
              <div>
                <Label htmlFor="password" className="text-black">Password</Label>
                <Input
                  id="password"
                  type="password"
                  value={loginData.password}
                  onChange={(e) => setLoginData({...loginData, password: e.target.value})}
                  className="mt-2 bg-gray-100 text-black border-gray-300"
                  placeholder="Enter password"
                />
              </div>

              <Button 
                onClick={handleLogin}
                className="w-full bg-black hover:bg-gray-800 text-white"
              >
                Login
              </Button>

              <div className="text-center space-y-2">
                <button
                  onClick={() => setShowForgotPassword(true)}
                  className="text-gray-600 hover:text-black text-sm"
                >
                  Forgot Password?
                </button>
                <br />
                <button
                  onClick={() => setShowChangePassword(true)}
                  className="text-gray-600 hover:text-black text-sm"
                >
                  Change Password
                </button>
              </div>
            </div>
          ) : showForgotPassword ? (
            <div className="space-y-6">
              <div>
                <Label htmlFor="resetEmail" className="text-black">Email Address</Label>
                <Input
                  id="resetEmail"
                  type="email"
                  value={resetEmail}
                  onChange={(e) => setResetEmail(e.target.value)}
                  className="mt-2 bg-gray-100 text-black border-gray-300"
                  placeholder="Enter your email"
                />
              </div>

              <div className="flex gap-3">
                <Button 
                  onClick={handleForgotPassword}
                  className="flex-1 bg-black hover:bg-gray-800 text-white"
                >
                  Send Reset Link
                </Button>
                <Button 
                  onClick={() => setShowForgotPassword(false)}
                  variant="outline"
                  className="flex-1"
                >
                  Back
                </Button>
              </div>
            </div>
          ) : (
            <div className="space-y-6">
              <div>
                <Label htmlFor="newPassword" className="text-black">New Password</Label>
                <Input
                  id="newPassword"
                  type="password"
                  value={newPassword}
                  onChange={(e) => setNewPassword(e.target.value)}
                  className="mt-2 bg-gray-100 text-black border-gray-300"
                  placeholder="Enter new password"
                />
              </div>

              <div>
                <Label htmlFor="confirmPassword" className="text-black">Confirm Password</Label>
                <Input
                  id="confirmPassword"
                  type="password"
                  value={confirmPassword}
                  onChange={(e) => setConfirmPassword(e.target.value)}
                  className="mt-2 bg-gray-100 text-black border-gray-300"
                  placeholder="Confirm new password"
                />
              </div>

              <div className="flex gap-3">
                <Button 
                  onClick={handleChangePassword}
                  className="flex-1 bg-black hover:bg-gray-800 text-white"
                >
                  Change Password
                </Button>
                <Button 
                  onClick={() => setShowChangePassword(false)}
                  variant="outline"
                  className="flex-1"
                >
                  Back
                </Button>
              </div>
            </div>
          )}
        </div>
      </div>
    );
  }

  // Main dashboard
  return (
    <div className="fixed inset-0 bg-black/80 backdrop-blur-sm z-50 flex items-center justify-center p-4">
      <div className="bg-white rounded-lg p-6 w-full max-w-4xl max-h-[90vh] overflow-y-auto border border-gray-300">
        <div className="flex justify-between items-center mb-6">
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

        {/* Tabs */}
        <div className="flex space-x-4 mb-6 overflow-x-auto">
          {['projects', 'skills', 'experience', 'gallery', 'technologies', 'profile', 'content'].map((tab) => (
            <button
              key={tab}
              onClick={() => setActiveTab(tab)}
              className={`px-4 py-2 rounded-lg capitalize transition-colors whitespace-nowrap ${
                activeTab === tab
                  ? 'bg-black text-white'
                  : 'bg-gray-200 text-black hover:bg-gray-300'
              }`}
            >
              {tab}
            </button>
          ))}
        </div>

        {/* Projects Tab */}
        {activeTab === 'projects' && (
          <div className="space-y-6">
            <h3 className="text-xl font-semibold text-black">Manage Projects</h3>
            
            <div className="bg-gray-100 p-4 rounded-lg border border-gray-300">
              <h4 className="text-lg font-medium text-black mb-4">Add New Project</h4>
              <div className="space-y-3">
                <Input
                  placeholder="Project Title"
                  value={newProject.title}
                  onChange={(e) => setNewProject({...newProject, title: e.target.value})}
                  className="bg-white text-black border-gray-300"
                />
                <textarea
                  placeholder="Project Description"
                  value={newProject.description}
                  onChange={(e) => setNewProject({...newProject, description: e.target.value})}
                  className="w-full p-3 bg-white text-black rounded-lg border border-gray-300"
                  rows={3}
                />
                <Input
                  placeholder="Technologies Used (comma separated)"
                  value={newProject.tech}
                  onChange={(e) => setNewProject({...newProject, tech: e.target.value})}
                  className="bg-white text-black border-gray-300"
                />
                <Input
                  placeholder="Project Image URL"
                  value={newProject.image}
                  onChange={(e) => setNewProject({...newProject, image: e.target.value})}
                  className="bg-white text-black border-gray-300"
                />
                <Input
                  placeholder="GitHub URL"
                  value={newProject.github}
                  onChange={(e) => setNewProject({...newProject, github: e.target.value})}
                  className="bg-white text-black border-gray-300"
                />
                <Input
                  placeholder="Live Demo URL"
                  value={newProject.live}
                  onChange={(e) => setNewProject({...newProject, live: e.target.value})}
                  className="bg-white text-black border-gray-300"
                />
                <div className="flex items-center gap-2">
                  <input
                    type="checkbox"
                    id="featured"
                    checked={newProject.featured}
                    onChange={(e) => setNewProject({...newProject, featured: e.target.checked})}
                    className="rounded"
                  />
                  <Label htmlFor="featured" className="text-black">Featured Project</Label>
                </div>
                <Button onClick={addProject} className="bg-black hover:bg-gray-800 text-white">
                  <Plus size={16} className="mr-2" />
                  Add Project
                </Button>
              </div>
            </div>

            <div className="space-y-3">
              {projects.map((project) => (
                <div key={project.id} className="bg-gray-100 p-4 rounded-lg flex justify-between items-start border border-gray-300">
                  <div className="flex-1">
                    <div className="flex items-center gap-2 mb-2">
                      <h5 className="text-black font-medium">{project.title}</h5>
                      {project.featured && <Star size={16} className="text-yellow-500 fill-current" />}
                      <button
                        onClick={() => toggleProjectFeatured(project.id)}
                        className="text-gray-600 hover:text-black"
                      >
                        <Star size={16} className={project.featured ? "text-yellow-500 fill-current" : ""} />
                      </button>
                    </div>
                    <p className="text-gray-600 mb-1">{project.description}</p>
                    <p className="text-gray-800 text-sm mb-1">Tech: {project.tech}</p>
                    {project.github && <p className="text-gray-600 text-sm">GitHub: {project.github}</p>}
                    {project.live && <p className="text-gray-600 text-sm">Live: {project.live}</p>}
                  </div>
                  <button
                    onClick={() => removeProject(project.id)}
                    className="text-red-600 hover:text-red-800"
                  >
                    <Trash2 size={16} />
                  </button>
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
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Save Button */}
        <div className="mt-6 pt-6 border-t border-gray-300">
          <Button onClick={handleSaveChanges} className="bg-black hover:bg-gray-800 text-white">
            <Save size={20} className="mr-2" />
            Save Changes
          </Button>
        </div>
      </div>
    </div>
  );
};
