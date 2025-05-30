
import React from 'react';
import { App } from '@/types/app';
import { Button } from '@/components/ui/button';
import { Settings } from 'lucide-react';
import {
  ContextMenu,
  ContextMenuContent,
  ContextMenuItem,
  ContextMenuTrigger,
} from '@/components/ui/context-menu';

interface TaskbarProps {
  openApps: App[];
  activeAppId: string | null;
  onAppClick: (appId: string) => void;
  onOpenSettings: () => void;
  onCloseApp: (appId: string) => void;
  minimizedApps: string[];
}

const Taskbar: React.FC<TaskbarProps> = ({ 
  openApps, 
  activeAppId, 
  onAppClick, 
  onOpenSettings,
  onCloseApp,
  minimizedApps 
}) => {
  return (
    <div className="fixed bottom-0 left-0 right-0 bg-white/90 backdrop-blur-lg border-t border-gray-200 px-2 py-1 z-50">
      <div className="flex items-center justify-between max-w-7xl mx-auto">
        <div className="flex items-center space-x-1">
          {openApps.map((app) => {
            const isMinimized = minimizedApps.includes(app.id);
            return (
              <ContextMenu key={app.id}>
                <ContextMenuTrigger>
                  <Button
                    variant={activeAppId === app.id && !isMinimized ? "default" : "ghost"}
                    size="sm"
                    className={`flex items-center space-x-1 transition-all duration-200 h-6 px-2 text-xs ${
                      activeAppId === app.id && !isMinimized
                        ? 'bg-blue-600 text-white shadow-lg' 
                        : isMinimized
                        ? 'bg-gray-200 text-gray-600'
                        : 'hover:bg-gray-100'
                    }`}
                    onClick={() => onAppClick(app.id)}
                  >
                    <div 
                      className="w-3 h-3 rounded flex items-center justify-center text-white text-xs font-bold"
                      style={{ backgroundColor: app.color }}
                    >
                      {app.icon}
                    </div>
                    <span className="text-xs">{app.name}</span>
                  </Button>
                </ContextMenuTrigger>
                <ContextMenuContent>
                  <ContextMenuItem onClick={() => onCloseApp(app.id)}>
                    Close
                  </ContextMenuItem>
                </ContextMenuContent>
              </ContextMenu>
            );
          })}
        </div>
        
        <Button
          onClick={onOpenSettings}
          size="sm"
          className="bg-gradient-to-r from-blue-600 to-purple-600 text-white hover:from-blue-700 hover:to-purple-700 transition-all duration-200 h-6 px-2 text-xs"
        >
          <Settings className="w-3 h-3 mr-1" />
          Settings
        </Button>
      </div>
    </div>
  );
};

export default Taskbar;
