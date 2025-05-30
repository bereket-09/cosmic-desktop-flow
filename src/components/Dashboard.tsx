
import React from 'react';
import { App } from '@/types/app';
import AppTile from './AppTile';

interface DashboardProps {
  apps: App[];
  onLaunchApp: (app: App) => void;
}

const Dashboard: React.FC<DashboardProps> = ({ apps, onLaunchApp }) => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-100 pt-16 pb-20">
      <div className="max-w-7xl mx-auto px-6">
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-gray-800 mb-4">
            Welcome to Your Workspace
          </h1>
          <p className="text-xl text-gray-600">
            Launch your applications from the dashboard below
          </p>
        </div>
        
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-6">
          {apps.map((app) => (
            <AppTile
              key={app.id}
              app={app}
              onLaunch={onLaunchApp}
            />
          ))}
        </div>
        
        {apps.length === 0 && (
          <div className="text-center py-20">
            <div className="text-6xl mb-4">🚀</div>
            <h3 className="text-2xl font-semibold text-gray-700 mb-2">No apps yet</h3>
            <p className="text-gray-500">Click "Add App" in the taskbar to get started</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default Dashboard;
