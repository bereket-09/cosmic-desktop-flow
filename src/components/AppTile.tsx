
import React from 'react';
import { App } from '@/types/app';

interface AppTileProps {
  app: App;
  onLaunch: (app: App) => void;
}

const AppTile: React.FC<AppTileProps> = ({ app, onLaunch }) => {
  return (
    <div 
      className="group relative bg-white/70 backdrop-blur-sm rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-300 cursor-pointer transform hover:scale-105 hover:-translate-y-1 p-6 border border-white/50 hover:border-white/80"
      onClick={() => onLaunch(app)}
    >
      <div className="flex flex-col items-center space-y-4">
        <div className="relative">
          <div 
            className="w-16 h-16 rounded-2xl flex items-center justify-center text-white text-2xl font-bold shadow-xl group-hover:shadow-2xl transition-all duration-300 group-hover:scale-110"
            style={{ backgroundColor: app.color }}
          >
            {app.icon}
          </div>
          <div className="absolute inset-0 rounded-2xl bg-gradient-to-tr from-white/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
        </div>
        <div className="text-center">
          <h3 className="font-semibold text-gray-800 text-sm group-hover:text-indigo-600 transition-colors duration-300">
            {app.name}
          </h3>
        </div>
      </div>
      
      {/* Animated background gradient */}
      <div className="absolute inset-0 bg-gradient-to-br from-indigo-500/5 via-purple-500/5 to-blue-500/5 rounded-2xl opacity-0 group-hover:opacity-100 transition-all duration-300"></div>
      
      {/* Subtle glow effect */}
      <div className="absolute inset-0 rounded-2xl bg-gradient-to-r from-indigo-500/10 to-purple-500/10 opacity-0 group-hover:opacity-100 transition-opacity duration-300 blur-xl"></div>
    </div>
  );
};

export default AppTile;
