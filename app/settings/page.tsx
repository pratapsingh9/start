'use client';

import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Switch } from '@/components/ui/switch';
import SideBar from '@/components/sidebar';

export default function AppSettings() {
  // State management
  const [username, setUsername] = useState('JohnDoe');
  const [currentPassword, setCurrentPassword] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [notificationsEnabled, setNotificationsEnabled] = useState(true);

  // Handler functions
  const handleUsernameChange = () => {
    console.log('Username changed to:', username);
    // TODO: Implement logic to update username in the backend
  };

  const handlePasswordReset = () => {
    if (newPassword !== confirmPassword) {
      console.error('Passwords do not match');
      return;
    }
    console.log('Password reset successfully');
    // TODO: Implement logic to reset password in the backend
  };

  const handleNotificationToggle = () => {
    console.log('Notifications enabled:', !notificationsEnabled);
    setNotificationsEnabled((prev) => !prev);
  };

  return (
    <>
      <SideBar />
      <div className="flex-1 p-10 bg-gray-100 min-h-screen overflow-y-auto">
        <h1 className="text-4xl font-bold text-gray-800 mb-10 text-center">App Settings</h1>

        {/* Username Change Section */}
        <Card className="mb-8 shadow-md">
          <CardHeader>
            <CardTitle className="text-lg font-semibold">Change Username</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="mb-6">
              <label className="block text-sm font-medium text-gray-700">New Username</label>
              <Input
                type="text"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                className="mt-1"
              />
            </div>
            <Button onClick={handleUsernameChange} className="bg-blue-600 text-white hover:bg-blue-700 transition-colors">
              Change Username
            </Button>
          </CardContent>
        </Card>

        {/* Password Reset Section */}
        <Card className="mb-8 shadow-md">
          <CardHeader>
            <CardTitle className="text-lg font-semibold">Reset Password</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="mb-6">
              <label className="block text-sm font-medium text-gray-700">Current Password</label>
              <Input
                type="password"
                value={currentPassword}
                onChange={(e) => setCurrentPassword(e.target.value)}
                className="mt-1"
              />
            </div>
            <div className="mb-6">
              <label className="block text-sm font-medium text-gray-700">New Password</label>
              <Input
                type="password"
                value={newPassword}
                onChange={(e) => setNewPassword(e.target.value)}
                className="mt-1"
              />
            </div>
            <div className="mb-6">
              <label className="block text-sm font-medium text-gray-700">Confirm New Password</label>
              <Input
                type="password"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                className="mt-1"
              />
            </div>
            <Button onClick={handlePasswordReset} className="bg-blue-600 text-white hover:bg-blue-700 transition-colors">
              Reset Password
            </Button>
          </CardContent>
        </Card>

        {/* Notification Settings Section */}
        <Card className="mb-8 shadow-md">
          <CardHeader>
            <CardTitle className="text-lg font-semibold">Notification Settings</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="mb-6 flex items-center">
              <label className="block text-sm font-medium text-gray-700 mr-2">Enable Notifications</label>
              <Switch
                checked={notificationsEnabled}
                onCheckedChange={handleNotificationToggle}
                className="mt-1"
              />
            </div>
          </CardContent>
        </Card>
      </div>
    </>
  );
}
