
import React from 'react';
import { App } from '@/types/app';

interface AppTileProps {
  app: App;
  onLaunch: (app: App) => void;
}

const AppTile: React.FC<AppTileProps> = ({ app, onLaunch }) => {
  return (
    <div 
      className="group relative bg-white rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 cursor-pointer transform hover:scale-105 p-6 border border-gray-100"
      onClick={() => onLaunch(app)}
    >
      <div className="flex flex-col items-center space-y-3">
        <div 
          className="w-16 h-16 rounded-xl flex items-center justify-center text-white text-2xl font-bold shadow-lg"
          style={{ backgroundColor: app.color }}
        >
          {app.icon}
        </div>
        <div className="text-center">
          <h3 className="font-semibold text-gray-800 text-sm group-hover:text-blue-600 transition-colors">
            {app.name}
          </h3>
        </div>
      </div>
      <div className="absolute inset-0 bg-gradient-to-r from-blue-500/10 to-purple-500/10 rounded-xl opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
    </div>
  );
};

export default AppTile;
