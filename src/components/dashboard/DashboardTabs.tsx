
import React, { useState } from 'react';
import { ProjectsTab } from './ProjectsTab';
import { EducationTab } from './EducationTab';

export const DashboardTabs = () => {
  const [activeTab, setActiveTab] = useState('projects');

  const tabs = [
    { id: 'projects', label: 'Projects', component: ProjectsTab },
    { id: 'education', label: 'Education', component: EducationTab },
    { id: 'skills', label: 'Skills', component: () => <div className="p-4">Skills management coming soon...</div> },
    { id: 'experience', label: 'Experience', component: () => <div className="p-4">Experience management coming soon...</div> },
    { id: 'gallery', label: 'Gallery', component: () => <div className="p-4">Gallery management coming soon...</div> },
    { id: 'content', label: 'Content', component: () => <div className="p-4">Content management coming soon...</div> },
  ];

  const ActiveComponent = tabs.find(tab => tab.id === activeTab)?.component || ProjectsTab;

  return (
    <div className="h-full flex flex-col">
      {/* Tab Navigation */}
      <div className="flex border-b border-gray-200 mb-6">
        {tabs.map((tab) => (
          <button
            key={tab.id}
            onClick={() => setActiveTab(tab.id)}
            className={`px-6 py-3 font-medium text-sm border-b-2 transition-colors ${
              activeTab === tab.id
                ? 'border-blue-500 text-blue-600'
                : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
            }`}
          >
            {tab.label}
          </button>
        ))}
      </div>

      {/* Tab Content */}
      <div className="flex-1 overflow-y-auto">
        <ActiveComponent />
      </div>
    </div>
  );
};
