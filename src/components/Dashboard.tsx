
import React, { useState } from 'react';
import { X, Eye, EyeOff } from 'lucide-react';
import { DashboardLogin } from './dashboard/DashboardLogin';
import { DashboardTabs } from './dashboard/DashboardTabs';
import { usePortfolio } from '../contexts/PortfolioContext';

interface DashboardProps {
  isOpen: boolean;
  onClose: () => void;
}

export const Dashboard = ({ isOpen, onClose }: DashboardProps) => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [isMinimized, setIsMinimized] = useState(false);
  const { saveChanges } = usePortfolio();
  const [notification, setNotification] = useState<string | null>(null);

  const handleLogin = (password: string) => {
    if (password === 'admin123') {
      setIsLoggedIn(true);
      return true;
    }
    return false;
  };

  const handleLogout = () => {
    setIsLoggedIn(false);
    setIsMinimized(false);
  };

  const handleSaveChanges = () => {
    saveChanges();
    setNotification('Changes saved successfully!');
    setTimeout(() => setNotification(null), 3000);
  };

  if (!isOpen) return null;

  return (
    <>
      <div className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50">
        <div className={`fixed right-0 top-0 h-full bg-white shadow-2xl transition-all duration-300 ${
          isMinimized ? 'w-16' : 'w-full max-w-4xl'
        }`}>
          {!isMinimized ? (
            <>
              {/* Header */}
              <div className="flex items-center justify-between p-6 border-b border-gray-200 bg-gray-50">
                <h2 className="text-2xl font-bold text-gray-800">
                  Portfolio Dashboard
                </h2>
                <div className="flex items-center gap-2">
                  {isLoggedIn && (
                    <>
                      <button
                        onClick={() => setIsMinimized(true)}
                        className="p-2 text-gray-500 hover:text-gray-700 hover:bg-gray-200 rounded-lg transition-colors"
                        title="Minimize Dashboard"
                      >
                        <EyeOff size={20} />
                      </button>
                      <button
                        onClick={handleSaveChanges}
                        className="bg-green-500 text-white px-4 py-2 rounded-lg hover:bg-green-600 transition-colors"
                      >
                        Save Changes
                      </button>
                      <button
                        onClick={handleLogout}
                        className="bg-red-500 text-white px-4 py-2 rounded-lg hover:bg-red-600 transition-colors"
                      >
                        Logout
                      </button>
                    </>
                  )}
                  <button
                    onClick={onClose}
                    className="p-2 text-gray-500 hover:text-gray-700 hover:bg-gray-200 rounded-lg transition-colors"
                  >
                    <X size={24} />
                  </button>
                </div>
              </div>

              {/* Content */}
              <div className="p-6 h-full overflow-y-auto">
                {!isLoggedIn ? (
                  <DashboardLogin onLogin={handleLogin} />
                ) : (
                  <DashboardTabs />
                )}
              </div>
            </>
          ) : (
            /* Minimized View */
            <div className="p-4">
              <button
                onClick={() => setIsMinimized(false)}
                className="w-8 h-8 bg-gray-100 hover:bg-gray-200 rounded-lg flex items-center justify-center transition-colors"
                title="Restore Dashboard"
              >
                <Eye size={16} />
              </button>
            </div>
          )}
        </div>
      </div>

      {/* Bottom Notification */}
      {notification && (
        <div className="fixed bottom-6 left-1/2 transform -translate-x-1/2 z-60 bg-green-500 text-white px-6 py-3 rounded-lg shadow-lg animate-fade-in">
          {notification}
        </div>
      )}
    </>
  );
};
