import React, { useState } from 'react';
import { Edit3, Save, Plus, Trash2, Eye, EyeOff } from 'lucide-react';

export const Dashboard = () => {
  const [isVisible, setIsVisible] = useState(false);
  const [activeTab, setActiveTab] = useState('projects');

  // Simple state for managing content (in a real app, this would connect to a backend)
  const [projects, setProjects] = useState([
    { id: 1, title: 'AI-Powered Task Manager', description: 'A smart task management app', tech: 'React, Node.js, AI' },
    { id: 2, title: 'E-commerce Platform', description: 'Full-stack shopping platform', tech: 'Next.js, MongoDB' }
  ]);

  const [skills, setSkills] = useState([
    { id: 1, name: 'JavaScript', level: 90 },
    { id: 2, name: 'React', level: 85 },
    { id: 3, name: 'Python', level: 80 }
  ]);

  const [newProject, setNewProject] = useState({ title: '', description: '', tech: '' });
  const [newSkill, setNewSkill] = useState({ name: '', level: 50 });

  const addProject = () => {
    if (newProject.title) {
      setProjects([...projects, { ...newProject, id: Date.now() }]);
      setNewProject({ title: '', description: '', tech: '' });
    }
  };

  const addSkill = () => {
    if (newSkill.name) {
      setSkills([...skills, { ...newSkill, id: Date.now() }]);
      setNewSkill({ name: '', level: 50 });
    }
  };

  const removeProject = (id: number) => {
    setProjects(projects.filter(p => p.id !== id));
  };

  const removeSkill = (id: number) => {
    setSkills(skills.filter(s => s.id !== id));
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

  return (
    <div className="fixed inset-0 bg-black/80 backdrop-blur-sm z-50 flex items-center justify-center p-4">
      <div className="bg-slate-900 rounded-lg p-6 w-full max-w-4xl max-h-[90vh] overflow-y-auto">
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-2xl font-bold text-white">Portfolio Dashboard</h2>
          <button
            onClick={() => setIsVisible(false)}
            className="text-gray-400 hover:text-white"
          >
            <EyeOff size={24} />
          </button>
        </div>

        {/* Tabs */}
        <div className="flex space-x-4 mb-6">
          {['projects', 'skills', 'content'].map((tab) => (
            <button
              key={tab}
              onClick={() => setActiveTab(tab)}
              className={`px-4 py-2 rounded-lg capitalize transition-colors ${
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
            
            {/* Add New Project */}
            <div className="bg-gray-800 p-4 rounded-lg">
              <h4 className="text-lg font-medium text-white mb-4">Add New Project</h4>
              <div className="space-y-3">
                <input
                  type="text"
                  placeholder="Project Title"
                  value={newProject.title}
                  onChange={(e) => setNewProject({...newProject, title: e.target.value})}
                  className="w-full p-3 bg-gray-700 text-white rounded-lg"
                />
                <textarea
                  placeholder="Project Description"
                  value={newProject.description}
                  onChange={(e) => setNewProject({...newProject, description: e.target.value})}
                  className="w-full p-3 bg-gray-700 text-white rounded-lg"
                  rows={3}
                />
                <input
                  type="text"
                  placeholder="Technologies Used"
                  value={newProject.tech}
                  onChange={(e) => setNewProject({...newProject, tech: e.target.value})}
                  className="w-full p-3 bg-gray-700 text-white rounded-lg"
                />
                <button
                  onClick={addProject}
                  className="flex items-center gap-2 px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700"
                >
                  <Plus size={16} />
                  Add Project
                </button>
              </div>
            </div>

            {/* Existing Projects */}
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
            
            {/* Add New Skill */}
            <div className="bg-gray-800 p-4 rounded-lg">
              <h4 className="text-lg font-medium text-white mb-4">Add New Skill</h4>
              <div className="space-y-3">
                <input
                  type="text"
                  placeholder="Skill Name"
                  value={newSkill.name}
                  onChange={(e) => setNewSkill({...newSkill, name: e.target.value})}
                  className="w-full p-3 bg-gray-700 text-white rounded-lg"
                />
                <div>
                  <label className="text-gray-300 block mb-2">Proficiency Level: {newSkill.level}%</label>
                  <input
                    type="range"
                    min="0"
                    max="100"
                    value={newSkill.level}
                    onChange={(e) => setNewSkill({...newSkill, level: parseInt(e.target.value)})}
                    className="w-full"
                  />
                </div>
                <button
                  onClick={addSkill}
                  className="flex items-center gap-2 px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700"
                >
                  <Plus size={16} />
                  Add Skill
                </button>
              </div>
            </div>

            {/* Existing Skills */}
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

        {/* Content Tab */}
        {activeTab === 'content' && (
          <div className="space-y-6">
            <h3 className="text-xl font-semibold text-white">Manage Content</h3>
            <div className="bg-gray-800 p-4 rounded-lg">
              <p className="text-gray-300 mb-4">This is where you can update:</p>
              <ul className="list-disc list-inside text-gray-400 space-y-2">
                <li>About section content</li>
                <li>Contact information</li>
                <li>Resume file</li>
                <li>Gallery images</li>
                <li>Certifications</li>
              </ul>
              <p className="text-sm text-gray-500 mt-4">
                Note: This is a simple demo dashboard. In a production version, this would connect to a backend database.
              </p>
            </div>
          </div>
        )}

        {/* Save Button */}
        <div className="mt-6 pt-6 border-t border-gray-700">
          <button className="flex items-center gap-2 px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700">
            <Save size={20} />
            Save Changes
          </button>
        </div>
      </div>
    </div>
  );
};
