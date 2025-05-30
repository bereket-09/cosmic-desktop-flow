
import React from 'react';
import { App } from '@/types/app';
import { Button } from '@/components/ui/button';

interface TaskbarProps {
  openApps: App[];
  activeAppId: string | null;
  onAppClick: (appId: string) => void;
  onAddApp: () => void;
}

const Taskbar: React.FC<TaskbarProps> = ({ openApps, activeAppId, onAppClick, onAddApp }) => {
  return (
    <div className="fixed bottom-0 left-0 right-0 bg-white/80 backdrop-blur-lg border-t border-gray-200 px-4 py-2 z-50">
      <div className="flex items-center justify-between max-w-7xl mx-auto">
        <div className="flex items-center space-x-2">
          {openApps.map((app) => (
            <Button
              key={app.id}
              variant={activeAppId === app.id ? "default" : "ghost"}
              size="sm"
              className={`flex items-center space-x-2 transition-all duration-200 ${
                activeAppId === app.id 
                  ? 'bg-blue-600 text-white shadow-lg' 
                  : 'hover:bg-gray-100'
              }`}
              onClick={() => onAppClick(app.id)}
            >
              <div 
                className="w-5 h-5 rounded flex items-center justify-center text-white text-xs font-bold"
                style={{ backgroundColor: app.color }}
              >
                {app.icon}
              </div>
              <span className="text-sm">{app.name}</span>
            </Button>
          ))}
        </div>
        
        <Button
          onClick={onAddApp}
          className="bg-gradient-to-r from-blue-600 to-purple-600 text-white hover:from-blue-700 hover:to-purple-700 transition-all duration-200"
        >
          + Add App
        </Button>
      </div>
    </div>
  );
};

export default Taskbar;
