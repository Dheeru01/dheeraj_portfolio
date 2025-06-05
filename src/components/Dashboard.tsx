
import React, { useState } from 'react';
import { Edit3, Save, Plus, Trash2, Eye, EyeOff, Lock, User, Mail } from 'lucide-react';
import { Button } from './ui/button';
import { Input } from './ui/input';
import { Label } from './ui/label';
import { useToast } from '@/hooks/use-toast';

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

  // Hardcoded credentials
  const ADMIN_USERNAME = 'Kanukuntla Dheeraj';
  const ADMIN_PASSWORD = 'Dheeraj@2004';

  // State for managing content
  const [projects, setProjects] = useState([
    { id: 1, title: 'AI-Powered Task Manager', description: 'A smart task management app', tech: 'React, Node.js, AI' },
    { id: 2, title: 'E-commerce Platform', description: 'Full-stack shopping platform', tech: 'Next.js, MongoDB' }
  ]);

  const [skills, setSkills] = useState([
    { id: 1, name: 'JavaScript', level: 90 },
    { id: 2, name: 'React', level: 85 },
    { id: 3, name: 'Python', level: 80 }
  ]);

  const [experiences, setExperiences] = useState([
    { id: 1, title: 'Software Engineer Intern', company: 'Tech Corp', period: '2024 - Present', description: 'Working on React applications and backend services' }
  ]);

  const [content, setContent] = useState({
    aboutText: 'Passionate software developer with expertise in modern web technologies...',
    contactEmail: 'dheeraj@example.com',
    contactPhone: '+1234567890'
  });

  const [newProject, setNewProject] = useState({ title: '', description: '', tech: '' });
  const [newSkill, setNewSkill] = useState({ name: '', level: 50 });
  const [newExperience, setNewExperience] = useState({ title: '', company: '', period: '', description: '' });

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

  const addProject = () => {
    if (newProject.title) {
      setProjects([...projects, { ...newProject, id: Date.now() }]);
      setNewProject({ title: '', description: '', tech: '' });
      toast({ title: "Success", description: "Project added successfully!" });
    }
  };

  const addSkill = () => {
    if (newSkill.name) {
      setSkills([...skills, { ...newSkill, id: Date.now() }]);
      setNewSkill({ name: '', level: 50 });
      toast({ title: "Success", description: "Skill added successfully!" });
    }
  };

  const addExperience = () => {
    if (newExperience.title && newExperience.company) {
      setExperiences([...experiences, { ...newExperience, id: Date.now() }]);
      setNewExperience({ title: '', company: '', period: '', description: '' });
      toast({ title: "Success", description: "Experience added successfully!" });
    }
  };

  const removeProject = (id: number) => {
    setProjects(projects.filter(p => p.id !== id));
    toast({ title: "Deleted", description: "Project removed successfully!" });
  };

  const removeSkill = (id: number) => {
    setSkills(skills.filter(s => s.id !== id));
    toast({ title: "Deleted", description: "Skill removed successfully!" });
  };

  const removeExperience = (id: number) => {
    setExperiences(experiences.filter(e => e.id !== id));
    toast({ title: "Deleted", description: "Experience removed successfully!" });
  };

  if (!isVisible) {
    return (
      <button
        onClick={() => setIsVisible(true)}
        className="fixed bottom-4 right-4 bg-gradient-to-r from-blue-500 to-purple-600 text-white p-3 rounded-full shadow-lg hover:scale-110 transition-transform duration-300 z-50"
      >
        <Edit3 size={20} />
      </button>
    );
  }

  // Login screen
  if (!isLoggedIn) {
    return (
      <div className="fixed inset-0 bg-black/80 backdrop-blur-sm z-50 flex items-center justify-center p-4">
        <div className="bg-slate-900 rounded-lg p-8 w-full max-w-md">
          <div className="flex justify-between items-center mb-6">
            <h2 className="text-2xl font-bold text-white flex items-center gap-2">
              <Lock size={24} />
              Admin Login
            </h2>
            <button
              onClick={() => setIsVisible(false)}
              className="text-gray-400 hover:text-white"
            >
              <EyeOff size={24} />
            </button>
          </div>

          {!showForgotPassword && !showChangePassword ? (
            <div className="space-y-6">
              <div>
                <Label htmlFor="username" className="text-white">Username</Label>
                <Input
                  id="username"
                  type="text"
                  value={loginData.username}
                  onChange={(e) => setLoginData({...loginData, username: e.target.value})}
                  className="mt-2 bg-gray-700 text-white border-gray-600"
                  placeholder="Enter username"
                />
              </div>
              
              <div>
                <Label htmlFor="password" className="text-white">Password</Label>
                <Input
                  id="password"
                  type="password"
                  value={loginData.password}
                  onChange={(e) => setLoginData({...loginData, password: e.target.value})}
                  className="mt-2 bg-gray-700 text-white border-gray-600"
                  placeholder="Enter password"
                />
              </div>

              <Button 
                onClick={handleLogin}
                className="w-full bg-blue-600 hover:bg-blue-700"
              >
                Login
              </Button>

              <div className="text-center space-y-2">
                <button
                  onClick={() => setShowForgotPassword(true)}
                  className="text-blue-400 hover:text-blue-300 text-sm"
                >
                  Forgot Password?
                </button>
                <br />
                <button
                  onClick={() => setShowChangePassword(true)}
                  className="text-purple-400 hover:text-purple-300 text-sm"
                >
                  Change Password
                </button>
              </div>
            </div>
          ) : showForgotPassword ? (
            <div className="space-y-6">
              <div>
                <Label htmlFor="resetEmail" className="text-white">Email Address</Label>
                <Input
                  id="resetEmail"
                  type="email"
                  value={resetEmail}
                  onChange={(e) => setResetEmail(e.target.value)}
                  className="mt-2 bg-gray-700 text-white border-gray-600"
                  placeholder="Enter your email"
                />
              </div>

              <div className="flex gap-3">
                <Button 
                  onClick={handleForgotPassword}
                  className="flex-1 bg-green-600 hover:bg-green-700"
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
                <Label htmlFor="newPassword" className="text-white">New Password</Label>
                <Input
                  id="newPassword"
                  type="password"
                  value={newPassword}
                  onChange={(e) => setNewPassword(e.target.value)}
                  className="mt-2 bg-gray-700 text-white border-gray-600"
                  placeholder="Enter new password"
                />
              </div>

              <div>
                <Label htmlFor="confirmPassword" className="text-white">Confirm Password</Label>
                <Input
                  id="confirmPassword"
                  type="password"
                  value={confirmPassword}
                  onChange={(e) => setConfirmPassword(e.target.value)}
                  className="mt-2 bg-gray-700 text-white border-gray-600"
                  placeholder="Confirm new password"
                />
              </div>

              <div className="flex gap-3">
                <Button 
                  onClick={handleChangePassword}
                  className="flex-1 bg-green-600 hover:bg-green-700"
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
      <div className="bg-slate-900 rounded-lg p-6 w-full max-w-4xl max-h-[90vh] overflow-y-auto">
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-2xl font-bold text-white">Portfolio Dashboard</h2>
          <div className="flex gap-2">
            <Button onClick={handleLogout} variant="outline" size="sm">
              Logout
            </Button>
            <button
              onClick={() => setIsVisible(false)}
              className="text-gray-400 hover:text-white"
            >
              <EyeOff size={24} />
            </button>
          </div>
        </div>

        {/* Tabs */}
        <div className="flex space-x-4 mb-6 overflow-x-auto">
          {['projects', 'skills', 'experience', 'content'].map((tab) => (
            <button
              key={tab}
              onClick={() => setActiveTab(tab)}
              className={`px-4 py-2 rounded-lg capitalize transition-colors whitespace-nowrap ${
                activeTab === tab
                  ? 'bg-blue-600 text-white'
                  : 'bg-gray-700 text-gray-300 hover:bg-gray-600'
              }`}
            >
              {tab}
            </button>
          ))}
        </div>

        {/* Projects Tab */}
        {activeTab === 'projects' && (
          <div className="space-y-6">
            <h3 className="text-xl font-semibold text-white">Manage Projects</h3>
            
            <div className="bg-gray-800 p-4 rounded-lg">
              <h4 className="text-lg font-medium text-white mb-4">Add New Project</h4>
              <div className="space-y-3">
                <Input
                  placeholder="Project Title"
                  value={newProject.title}
                  onChange={(e) => setNewProject({...newProject, title: e.target.value})}
                  className="bg-gray-700 text-white border-gray-600"
                />
                <textarea
                  placeholder="Project Description"
                  value={newProject.description}
                  onChange={(e) => setNewProject({...newProject, description: e.target.value})}
                  className="w-full p-3 bg-gray-700 text-white rounded-lg border border-gray-600"
                  rows={3}
                />
                <Input
                  placeholder="Technologies Used"
                  value={newProject.tech}
                  onChange={(e) => setNewProject({...newProject, tech: e.target.value})}
                  className="bg-gray-700 text-white border-gray-600"
                />
                <Button onClick={addProject} className="bg-green-600 hover:bg-green-700">
                  <Plus size={16} className="mr-2" />
                  Add Project
                </Button>
              </div>
            </div>

            <div className="space-y-3">
              {projects.map((project) => (
                <div key={project.id} className="bg-gray-800 p-4 rounded-lg flex justify-between items-start">
                  <div>
                    <h5 className="text-white font-medium">{project.title}</h5>
                    <p className="text-gray-400">{project.description}</p>
                    <p className="text-blue-400 text-sm">{project.tech}</p>
                  </div>
                  <button
                    onClick={() => removeProject(project.id)}
                    className="text-red-400 hover:text-red-300"
                  >
                    <Trash2 size={16} />
                  </button>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Skills Tab */}
        {activeTab === 'skills' && (
          <div className="space-y-6">
            <h3 className="text-xl font-semibold text-white">Manage Skills</h3>
            
            <div className="bg-gray-800 p-4 rounded-lg">
              <h4 className="text-lg font-medium text-white mb-4">Add New Skill</h4>
              <div className="space-y-3">
                <Input
                  placeholder="Skill Name"
                  value={newSkill.name}
                  onChange={(e) => setNewSkill({...newSkill, name: e.target.value})}
                  className="bg-gray-700 text-white border-gray-600"
                />
                <div>
                  <Label className="text-gray-300 block mb-2">Proficiency Level: {newSkill.level}%</Label>
                  <input
                    type="range"
                    min="0"
                    max="100"
                    value={newSkill.level}
                    onChange={(e) => setNewSkill({...newSkill, level: parseInt(e.target.value)})}
                    className="w-full"
                  />
                </div>
                <Button onClick={addSkill} className="bg-green-600 hover:bg-green-700">
                  <Plus size={16} className="mr-2" />
                  Add Skill
                </Button>
              </div>
            </div>

            <div className="space-y-3">
              {skills.map((skill) => (
                <div key={skill.id} className="bg-gray-800 p-4 rounded-lg flex justify-between items-center">
                  <div className="flex-1">
                    <div className="flex justify-between items-center mb-2">
                      <span className="text-white font-medium">{skill.name}</span>
                      <span className="text-gray-400">{skill.level}%</span>
                    </div>
                    <div className="w-full bg-gray-700 rounded-full h-2">
                      <div
                        className="bg-blue-500 h-2 rounded-full"
                        style={{ width: `${skill.level}%` }}
                      />
                    </div>
                  </div>
                  <button
                    onClick={() => removeSkill(skill.id)}
                    className="text-red-400 hover:text-red-300 ml-4"
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
            <h3 className="text-xl font-semibold text-white">Manage Experience</h3>
            
            <div className="bg-gray-800 p-4 rounded-lg">
              <h4 className="text-lg font-medium text-white mb-4">Add New Experience</h4>
              <div className="space-y-3">
                <Input
                  placeholder="Job Title"
                  value={newExperience.title}
                  onChange={(e) => setNewExperience({...newExperience, title: e.target.value})}
                  className="bg-gray-700 text-white border-gray-600"
                />
                <Input
                  placeholder="Company Name"
                  value={newExperience.company}
                  onChange={(e) => setNewExperience({...newExperience, company: e.target.value})}
                  className="bg-gray-700 text-white border-gray-600"
                />
                <Input
                  placeholder="Period (e.g., 2023 - Present)"
                  value={newExperience.period}
                  onChange={(e) => setNewExperience({...newExperience, period: e.target.value})}
                  className="bg-gray-700 text-white border-gray-600"
                />
                <textarea
                  placeholder="Job Description"
                  value={newExperience.description}
                  onChange={(e) => setNewExperience({...newExperience, description: e.target.value})}
                  className="w-full p-3 bg-gray-700 text-white rounded-lg border border-gray-600"
                  rows={3}
                />
                <Button onClick={addExperience} className="bg-green-600 hover:bg-green-700">
                  <Plus size={16} className="mr-2" />
                  Add Experience
                </Button>
              </div>
            </div>

            <div className="space-y-3">
              {experiences.map((exp) => (
                <div key={exp.id} className="bg-gray-800 p-4 rounded-lg flex justify-between items-start">
                  <div>
                    <h5 className="text-white font-medium">{exp.title}</h5>
                    <p className="text-purple-400">{exp.company}</p>
                    <p className="text-gray-400 text-sm">{exp.period}</p>
                    <p className="text-gray-300 text-sm mt-2">{exp.description}</p>
                  </div>
                  <button
                    onClick={() => removeExperience(exp.id)}
                    className="text-red-400 hover:text-red-300"
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
            <h3 className="text-xl font-semibold text-white">Manage Content</h3>
            
            <div className="space-y-4">
              <div className="bg-gray-800 p-4 rounded-lg">
                <Label className="text-white text-lg block mb-3">About Section</Label>
                <textarea
                  value={content.aboutText}
                  onChange={(e) => setContent({...content, aboutText: e.target.value})}
                  className="w-full p-3 bg-gray-700 text-white rounded-lg border border-gray-600"
                  rows={4}
                  placeholder="Update about section content..."
                />
              </div>

              <div className="bg-gray-800 p-4 rounded-lg">
                <Label className="text-white text-lg block mb-3">Contact Information</Label>
                <div className="space-y-3">
                  <Input
                    placeholder="Email Address"
                    value={content.contactEmail}
                    onChange={(e) => setContent({...content, contactEmail: e.target.value})}
                    className="bg-gray-700 text-white border-gray-600"
                  />
                  <Input
                    placeholder="Phone Number"
                    value={content.contactPhone}
                    onChange={(e) => setContent({...content, contactPhone: e.target.value})}
                    className="bg-gray-700 text-white border-gray-600"
                  />
                </div>
              </div>

              <div className="bg-gray-800 p-4 rounded-lg">
                <h4 className="text-lg font-medium text-white mb-4">Other Content Areas</h4>
                <div className="space-y-2 text-gray-300">
                  <p>• Resume file upload</p>
                  <p>• Gallery images management</p>
                  <p>• Certifications editing</p>
                  <p>• Social media links</p>
                </div>
                <p className="text-sm text-gray-500 mt-4">
                  These features can be implemented as needed for full content management.
                </p>
              </div>
            </div>
          </div>
        )}

        {/* Save Button */}
        <div className="mt-6 pt-6 border-t border-gray-700">
          <Button className="bg-blue-600 hover:bg-blue-700">
            <Save size={20} className="mr-2" />
            Save Changes
          </Button>
        </div>
      </div>
    </div>
  );
};
