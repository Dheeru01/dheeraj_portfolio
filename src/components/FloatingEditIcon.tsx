
import React, { useState } from 'react';
import { Edit, Eye, EyeOff } from 'lucide-react';

interface FloatingEditIconProps {
  onDashboardOpen: () => void;
}

export const FloatingEditIcon = ({ onDashboardOpen }: FloatingEditIconProps) => {
  const [showOptions, setShowOptions] = useState(false);

  return (
    <>
      {/* Floating Edit Button */}
      <div className="fixed bottom-6 right-6 z-50">
        <button
          onClick={() => setShowOptions(!showOptions)}
          className="w-14 h-14 bg-black text-white rounded-full shadow-lg hover:bg-gray-800 transition-all duration-300 flex items-center justify-center hover:scale-110"
        >
          <Edit size={24} />
        </button>
        
        {/* Options Menu */}
        {showOptions && (
          <div className="absolute bottom-16 right-0 bg-white rounded-lg shadow-xl border border-gray-200 p-2 min-w-48">
            <button
              onClick={() => {
                onDashboardOpen();
                setShowOptions(false);
              }}
              className="w-full flex items-center gap-3 px-4 py-3 text-left hover:bg-gray-100 rounded-lg transition-colors duration-200 text-black"
            >
              <Eye size={20} />
              <span>View Dashboard</span>
            </button>
          </div>
        )}
      </div>

      {/* Backdrop */}
      {showOptions && (
        <div 
          className="fixed inset-0 z-40"
          onClick={() => setShowOptions(false)}
        />
      )}
    </>
  );
};
