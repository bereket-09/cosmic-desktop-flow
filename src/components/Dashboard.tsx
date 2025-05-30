
import React from 'react';
import { App } from '@/types/app';
import AppTile from './AppTile';

interface DashboardProps {
  apps: App[];
  onLaunchApp: (app: App) => void;
}

const Dashboard: React.FC<DashboardProps> = ({ apps, onLaunchApp }) => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-50 via-white to-purple-50 relative overflow-hidden">
      {/* Background decorative elements */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute -top-40 -right-40 w-96 h-96 bg-gradient-to-br from-blue-400/20 to-purple-400/20 rounded-full blur-3xl"></div>
        <div className="absolute -bottom-40 -left-40 w-96 h-96 bg-gradient-to-tr from-indigo-400/20 to-pink-400/20 rounded-full blur-3xl"></div>
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-64 h-64 bg-gradient-to-r from-cyan-400/10 to-blue-400/10 rounded-full blur-3xl"></div>
      </div>
      
      <div className="relative z-10 pt-20 pb-24 px-8">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h1 className="text-6xl font-bold bg-gradient-to-r from-indigo-600 via-purple-600 to-blue-600 bg-clip-text text-transparent mb-6 leading-tight">
              Your Digital Workspace
            </h1>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto leading-relaxed">
              Seamlessly access all your favorite applications in one beautiful, unified environment
            </p>
            <div className="mt-8 flex justify-center">
              <div className="w-24 h-1 bg-gradient-to-r from-indigo-500 to-purple-500 rounded-full"></div>
            </div>
          </div>
          
          {apps.length > 0 ? (
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 2xl:grid-cols-8 gap-8">
              {apps.map((app) => (
                <AppTile
                  key={app.id}
                  app={app}
                  onLaunch={onLaunchApp}
                />
              ))}
            </div>
          ) : (
            <div className="text-center py-32">
              <div className="relative inline-block mb-8">
                <div className="absolute inset-0 bg-gradient-to-r from-indigo-500 to-purple-500 rounded-full blur-2xl opacity-20 scale-150"></div>
                <div className="relative text-8xl bg-gradient-to-r from-indigo-500 to-purple-500 bg-clip-text text-transparent">
                  🚀
                </div>
              </div>
              <h3 className="text-3xl font-bold text-gray-800 mb-4">Ready to Launch</h3>
              <p className="text-xl text-gray-600 mb-8 max-w-md mx-auto">
                Your workspace is ready. Add your first application to get started on your productivity journey.
              </p>
              <div className="inline-flex items-center px-6 py-3 bg-gradient-to-r from-indigo-500 to-purple-500 text-white rounded-full font-medium shadow-lg hover:shadow-xl transition-all duration-300 cursor-pointer">
                <Settings className="w-5 h-5 mr-2" />
                Open Settings to Add Apps
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
