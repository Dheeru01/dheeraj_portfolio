
import React, { useState } from 'react';
import { Plus, Trash2, Star } from 'lucide-react';
import { Button } from '../ui/button';
import { Input } from '../ui/input';
import { Label } from '../ui/label';
import { useToast } from '@/hooks/use-toast';

interface Project {
  id: number;
  title: string;
  description: string;
  tech: string;
  image?: string;
  github?: string;
  live?: string;
  featured?: boolean;
}

interface ProjectsTabProps {
  projects: Project[];
  setProjects: (projects: Project[]) => void;
}

export const ProjectsTab = ({ projects, setProjects }: ProjectsTabProps) => {
  const [newProject, setNewProject] = useState({ 
    title: '', 
    description: '', 
    tech: '', 
    image: '', 
    github: '', 
    live: '', 
    featured: false 
  });
  
  const { toast } = useToast();

  const addProject = () => {
    if (newProject.title && newProject.description) {
      const updatedProjects = [...projects, { ...newProject, id: Date.now() }];
      setProjects(updatedProjects);
      setNewProject({ title: '', description: '', tech: '', image: '', github: '', live: '', featured: false });
      toast({ title: "Success", description: "Project added successfully! Don't forget to save changes." });
    }
  };

  const removeProject = (id: number) => {
    const updatedProjects = projects.filter(p => p.id !== id);
    setProjects(updatedProjects);
    toast({ title: "Deleted", description: "Project removed successfully! Don't forget to save changes." });
  };

  const toggleProjectFeatured = (id: number) => {
    const updatedProjects = projects.map(p => p.id === id ? {...p, featured: !p.featured} : p);
    setProjects(updatedProjects);
  };

  return (
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

      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
        {projects.map((project) => (
          <div key={project.id} className="bg-gray-100 p-4 rounded-lg border border-gray-300">
            <div className="flex items-center justify-between mb-2">
              <div className="flex items-center gap-2">
                <h5 className="text-black font-medium">{project.title}</h5>
                {project.featured && <Star size={16} className="text-yellow-500 fill-current" />}
              </div>
              <div className="flex gap-2">
                <button
                  onClick={() => toggleProjectFeatured(project.id)}
                  className="text-gray-600 hover:text-yellow-500"
                >
                  <Star size={16} className={project.featured ? "text-yellow-500 fill-current" : ""} />
                </button>
                <button
                  onClick={() => removeProject(project.id)}
                  className="text-red-600 hover:text-red-800"
                >
                  <Trash2 size={16} />
                </button>
              </div>
            </div>
            <p className="text-gray-600 text-sm mb-2">{project.description}</p>
            <p className="text-gray-800 text-xs">Tech: {project.tech}</p>
          </div>
        ))}
      </div>
    </div>
  );
};
