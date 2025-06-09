
import React, { useState } from 'react';
import { Lock, Eye, EyeOff } from 'lucide-react';
import { Button } from '../ui/button';
import { Input } from '../ui/input';
import { Label } from '../ui/label';
import { useToast } from '@/hooks/use-toast';

interface DashboardLoginProps {
  onLogin: () => void;
  onClose: () => void;
  adminPassword: string;
  setAdminPassword: (password: string) => void;
  contactEmail: string;
}

export const DashboardLogin = ({ onLogin, onClose, adminPassword, setAdminPassword, contactEmail }: DashboardLoginProps) => {
  const [loginData, setLoginData] = useState({ username: '', password: '' });
  const [showForgotPassword, setShowForgotPassword] = useState(false);
  const [showChangePassword, setShowChangePassword] = useState(false);
  const [currentPassword, setCurrentPassword] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [resetEmail, setResetEmail] = useState('');
  
  // Password visibility states
  const [showLoginPassword, setShowLoginPassword] = useState(false);
  const [showCurrentPassword, setShowCurrentPassword] = useState(false);
  const [showNewPassword, setShowNewPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  
  const { toast } = useToast();
  const ADMIN_USERNAME = 'Kanukuntla Dheeraj';

  const handleLogin = () => {
    if (loginData.username === ADMIN_USERNAME && loginData.password === adminPassword) {
      onLogin();
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
    if (resetEmail === contactEmail) {
      const tempPassword = 'TempPass123';
      setAdminPassword(tempPassword);
      localStorage.setItem('adminPassword', tempPassword);
      toast({
        title: "Password Reset",
        description: `Temporary password: ${tempPassword}. Please change it immediately.`,
      });
      setShowForgotPassword(false);
      setResetEmail('');
    } else {
      toast({
        title: "Error",
        description: "Email not found in our records",
        variant: "destructive",
      });
    }
  };

  const handleChangePassword = () => {
    if (currentPassword !== adminPassword) {
      toast({
        title: "Error",
        description: "Current password is incorrect",
        variant: "destructive",
      });
      return;
    }
    
    if (newPassword === confirmPassword && newPassword.length >= 6) {
      setAdminPassword(newPassword);
      localStorage.setItem('adminPassword', newPassword);
      toast({
        title: "Success",
        description: "Password changed successfully!",
      });
      setShowChangePassword(false);
      setCurrentPassword('');
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

  return (
    <div className="fixed inset-0 bg-black/80 backdrop-blur-sm z-50 flex items-center justify-center p-4">
      <div className="bg-white rounded-lg p-8 w-full max-w-md border border-gray-300">
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-2xl font-bold text-black flex items-center gap-2">
            <Lock size={24} />
            Admin Login
          </h2>
          <button
            onClick={onClose}
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
              <div className="relative">
                <Input
                  id="password"
                  type={showLoginPassword ? "text" : "password"}
                  value={loginData.password}
                  onChange={(e) => setLoginData({...loginData, password: e.target.value})}
                  className="mt-2 bg-gray-100 text-black border-gray-300 pr-10"
                  placeholder="Enter password"
                />
                <button
                  type="button"
                  onClick={() => setShowLoginPassword(!showLoginPassword)}
                  className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-500 hover:text-gray-700"
                >
                  {showLoginPassword ? <EyeOff size={20} /> : <Eye size={20} />}
                </button>
              </div>
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
              <Label htmlFor="currentPassword" className="text-black">Current Password</Label>
              <div className="relative">
                <Input
                  id="currentPassword"
                  type={showCurrentPassword ? "text" : "password"}
                  value={currentPassword}
                  onChange={(e) => setCurrentPassword(e.target.value)}
                  className="mt-2 bg-gray-100 text-black border-gray-300 pr-10"
                  placeholder="Enter current password"
                />
                <button
                  type="button"
                  onClick={() => setShowCurrentPassword(!showCurrentPassword)}
                  className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-500 hover:text-gray-700"
                >
                  {showCurrentPassword ? <EyeOff size={20} /> : <Eye size={20} />}
                </button>
              </div>
            </div>

            <div>
              <Label htmlFor="newPassword" className="text-black">New Password</Label>
              <div className="relative">
                <Input
                  id="newPassword"
                  type={showNewPassword ? "text" : "password"}
                  value={newPassword}
                  onChange={(e) => setNewPassword(e.target.value)}
                  className="mt-2 bg-gray-100 text-black border-gray-300 pr-10"
                  placeholder="Enter new password"
                />
                <button
                  type="button"
                  onClick={() => setShowNewPassword(!showNewPassword)}
                  className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-500 hover:text-gray-700"
                >
                  {showNewPassword ? <EyeOff size={20} /> : <Eye size={20} />}
                </button>
              </div>
            </div>

            <div>
              <Label htmlFor="confirmPassword" className="text-black">Confirm Password</Label>
              <div className="relative">
                <Input
                  id="confirmPassword"
                  type={showConfirmPassword ? "text" : "password"}
                  value={confirmPassword}
                  onChange={(e) => setConfirmPassword(e.target.value)}
                  className="mt-2 bg-gray-100 text-black border-gray-300 pr-10"
                  placeholder="Confirm new password"
                />
                <button
                  type="button"
                  onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                  className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-500 hover:text-gray-700"
                >
                  {showConfirmPassword ? <EyeOff size={20} /> : <Eye size={20} />}
                </button>
              </div>
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
};
