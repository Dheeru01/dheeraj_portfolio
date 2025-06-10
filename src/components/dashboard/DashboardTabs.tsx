
import React from 'react';

interface DashboardTabsProps {
  activeTab: string;
  setActiveTab: (tab: string) => void;
}

export const DashboardTabs = ({ activeTab, setActiveTab }: DashboardTabsProps) => {
  const tabs = [
    { id: 'projects', label: 'Projects' },
    { id: 'skills', label: 'Skills' },
    { id: 'experience', label: 'Experience' },
    { id: 'gallery', label: 'Gallery' },
    { id: 'highlights', label: 'Highlights' },
    { id: 'technologies', label: 'Technologies' },
    { id: 'profile', label: 'Profile' },
    { id: 'content', label: 'Content' },
  ];

  return (
    <div className="flex border-b border-gray-200 mb-6 overflow-x-auto">
      {tabs.map((tab) => (
        <button
          key={tab.id}
          onClick={() => setActiveTab(tab.id)}
          className={`px-6 py-3 font-medium text-sm border-b-2 transition-colors whitespace-nowrap ${
            activeTab === tab.id
              ? 'border-blue-500 text-blue-600'
              : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
          }`}
        >
          {tab.label}
        </button>
      ))}
    </div>
  );
};
