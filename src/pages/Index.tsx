
import React, { useState } from 'react';
import { App } from '@/types/app';
import Dashboard from '@/components/Dashboard';
import AppWindow from '@/components/AppWindow';
import Taskbar from '@/components/Taskbar';
import AppConfigModal from '@/components/AppConfigModal';

const Index = () => {
  const [apps, setApps] = useState<App[]>([
    {
      id: '1',
      name: 'Flow Builder',
      url: 'https://www.figma.com',
      icon: '🔧',
      color: '#3b82f6',
      isOpen: false,
      zIndex: 1
    },
    {
      id: '2',
      name: 'Portal',
      url: 'https://www.notion.so',
      icon: '🌐',
      color: '#10b981',
      isOpen: false,
      zIndex: 1
    },
    {
      id: '3',
      name: 'Analytics',
      url: 'https://www.google.com',
      icon: '📊',
      color: '#f59e0b',
      isOpen: false,
      zIndex: 1
    },
    {
      id: '4',
      name: 'Monitoring',
      url: 'https://www.github.com',
      icon: '📈',
      color: '#8b5cf6',
      isOpen: false,
      zIndex: 1
    }
  ]);
  
  const [activeAppId, setActiveAppId] = useState<string | null>(null);
  const [isConfigModalOpen, setIsConfigModalOpen] = useState(false);
  const [maxZIndex, setMaxZIndex] = useState(1);

  const openApps = apps.filter(app => app.isOpen);

  const handleLaunchApp = (app: App) => {
    const newZIndex = maxZIndex + 1;
    setMaxZIndex(newZIndex);
    
    setApps(prev => prev.map(a => 
      a.id === app.id 
        ? { ...a, isOpen: true, zIndex: newZIndex }
        : a
    ));
    setActiveAppId(app.id);
  };

  const handleCloseApp = (appId: string) => {
    setApps(prev => prev.map(app => 
      app.id === appId 
        ? { ...app, isOpen: false }
        : app
    ));
    
    if (activeAppId === appId) {
      const remainingOpenApps = apps.filter(app => app.isOpen && app.id !== appId);
      setActiveAppId(remainingOpenApps.length > 0 ? remainingOpenApps[remainingOpenApps.length - 1].id : null);
    }
  };

  const handleFocusApp = (appId: string) => {
    const newZIndex = maxZIndex + 1;
    setMaxZIndex(newZIndex);
    
    setApps(prev => prev.map(app => 
      app.id === appId 
        ? { ...app, zIndex: newZIndex }
        : app
    ));
    setActiveAppId(appId);
  };

  const handleAddApp = (appData: Omit<App, 'id' | 'isOpen' | 'zIndex'>) => {
    const newApp: App = {
      ...appData,
      id: Date.now().toString(),
      isOpen: false,
      zIndex: 1
    };
    setApps(prev => [...prev, newApp]);
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <Dashboard apps={apps} onLaunchApp={handleLaunchApp} />
      
      {openApps.map((app) => (
        <AppWindow
          key={app.id}
          app={app}
          onClose={handleCloseApp}
          onFocus={handleFocusApp}
          zIndex={app.zIndex}
        />
      ))}
      
      <Taskbar
        openApps={openApps}
        activeAppId={activeAppId}
        onAppClick={handleFocusApp}
        onAddApp={() => setIsConfigModalOpen(true)}
      />
      
      <AppConfigModal
        isOpen={isConfigModalOpen}
        onClose={() => setIsConfigModalOpen(false)}
        onSave={handleAddApp}
      />
    </div>
  );
};

export default Index;
