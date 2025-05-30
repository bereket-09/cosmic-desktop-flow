
import React, { useState } from 'react';
import { App } from '@/types/app';
import { Button } from '@/components/ui/button';
import { X, Minus, Square } from 'lucide-react';

interface AppWindowProps {
  app: App;
  onClose: (appId: string) => void;
  onFocus: (appId: string) => void;
  onMinimize: (appId: string) => void;
  zIndex: number;
  isMinimized: boolean;
}

const AppWindow: React.FC<AppWindowProps> = ({ 
  app, 
  onClose, 
  onFocus, 
  onMinimize, 
  zIndex, 
  isMinimized 
}) => {
  if (isMinimized) return null;

  return (
    <div 
      className="fixed inset-4 bg-white rounded-lg shadow-2xl border border-gray-200 flex flex-col animate-scale-in"
      style={{ zIndex }}
      onClick={() => onFocus(app.id)}
    >
      {/* Title Bar */}
      <div 
        className="flex items-center justify-between px-4 py-3 bg-gradient-to-r from-gray-50 to-gray-100 rounded-t-lg border-b border-gray-200"
      >
        <div className="flex items-center space-x-3">
          <div 
            className="w-6 h-6 rounded-md flex items-center justify-center text-white text-xs font-bold"
            style={{ backgroundColor: app.color }}
          >
            {app.icon}
          </div>
          <h3 className="font-semibold text-gray-800">{app.name}</h3>
        </div>
        <div className="flex items-center space-x-2">
          <Button
            variant="ghost"
            size="sm"
            className="h-8 w-8 p-0 hover:bg-yellow-100"
            onClick={(e) => {
              e.stopPropagation();
              onMinimize(app.id);
            }}
          >
            <Minus className="h-4 w-4 text-yellow-600" />
          </Button>
          <Button
            variant="ghost"
            size="sm"
            className="h-8 w-8 p-0 hover:bg-green-100"
          >
            <Square className="h-3 w-3 text-green-600" />
          </Button>
          <Button
            variant="ghost"
            size="sm"
            className="h-8 w-8 p-0 hover:bg-red-100"
            onClick={(e) => {
              e.stopPropagation();
              onClose(app.id);
            }}
          >
            <X className="h-4 w-4 text-red-600" />
          </Button>
        </div>
      </div>
      
      {/* Content Area */}
      <div className="flex-1 bg-white rounded-b-lg overflow-hidden">
        <iframe
          src={app.url}
          className="w-full h-full border-0"
          title={app.name}
        />
      </div>
    </div>
  );
};

export default AppWindow;
