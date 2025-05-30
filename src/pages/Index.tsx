
import React, { useState } from 'react';
import { App, Group } from '@/types/app';
import Dashboard from '@/components/Dashboard';
import AppWindow from '@/components/AppWindow';
import Taskbar from '@/components/Taskbar';
import Settings from '@/components/Settings';

const Index = () => {
  const [apps, setApps] = useState<App[]>([
    {
      id: '1',
      name: 'Flow Builder',
      url: 'https://www.figma.com',
      icon: '🔧',
      color: '#3b82f6',
      isOpen: false,
      zIndex: 1,
      groups: ['work']
    },
    {
      id: '2',
      name: 'Portal',
      url: 'https://www.notion.so',
      icon: '🌐',
      color: '#10b981',
      isOpen: false,
      zIndex: 1,
      groups: ['work', 'productivity']
    },
    {
      id: '3',
      name: 'Analytics',
      url: 'https://www.google.com',
      icon: '📊',
      color: '#f59e0b',
      isOpen: false,
      zIndex: 1,
      groups: ['work']
    },
    {
      id: '4',
      name: 'Monitoring',
      url: 'https://www.github.com',
      icon: '📈',
      color: '#8b5cf6',
      isOpen: false,
      zIndex: 1,
      groups: ['development']
    }
  ]);

  const [groups, setGroups] = useState<Group[]>([
    { id: 'work', name: 'Work', color: '#3b82f6' },
    { id: 'productivity', name: 'Productivity', color: '#10b981' },
    { id: 'development', name: 'Development', color: '#8b5cf6' }
  ]);
  
  const [activeAppId, setActiveAppId] = useState<string | null>(null);
  const [isSettingsOpen, setIsSettingsOpen] = useState(false);
  const [maxZIndex, setMaxZIndex] = useState(1);
  const [minimizedApps, setMinimizedApps] = useState<string[]>([]);

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
    setMinimizedApps(prev => prev.filter(id => id !== app.id));
  };

  const handleCloseApp = (appId: string) => {
    setApps(prev => prev.map(app => 
      app.id === appId 
        ? { ...app, isOpen: false }
        : app
    ));
    
    setMinimizedApps(prev => prev.filter(id => id !== appId));
    
    if (activeAppId === appId) {
      const remainingOpenApps = apps.filter(app => app.isOpen && app.id !== appId && !minimizedApps.includes(app.id));
      setActiveAppId(remainingOpenApps.length > 0 ? remainingOpenApps[remainingOpenApps.length - 1].id : null);
    }
  };

  const handleFocusApp = (appId: string) => {
    const isMinimized = minimizedApps.includes(appId);
    
    if (isMinimized) {
      setMinimizedApps(prev => prev.filter(id => id !== appId));
    }
    
    const newZIndex = maxZIndex + 1;
    setMaxZIndex(newZIndex);
    
    setApps(prev => prev.map(app => 
      app.id === appId 
        ? { ...app, zIndex: newZIndex }
        : app
    ));
    setActiveAppId(appId);
  };

  const handleMinimizeApp = (appId: string) => {
    setMinimizedApps(prev => [...prev, appId]);
    
    if (activeAppId === appId) {
      const remainingOpenApps = apps.filter(app => app.isOpen && app.id !== appId && !minimizedApps.includes(app.id));
      setActiveAppId(remainingOpenApps.length > 0 ? remainingOpenApps[remainingOpenApps.length - 1].id : null);
    }
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

  const handleAddGroup = (groupData: Omit<Group, 'id'>) => {
    const newGroup: Group = {
      ...groupData,
      id: Date.now().toString()
    };
    setGroups(prev => [...prev, newGroup]);
  };

  const handleDeleteGroup = (groupId: string) => {
    setGroups(prev => prev.filter(group => group.id !== groupId));
    setApps(prev => prev.map(app => ({
      ...app,
      groups: app.groups.filter(g => g !== groupId)
    })));
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
          onMinimize={handleMinimizeApp}
          zIndex={app.zIndex}
          isMinimized={minimizedApps.includes(app.id)}
        />
      ))}
      
      <Taskbar
        openApps={openApps}
        activeAppId={activeAppId}
        onAppClick={handleFocusApp}
        onOpenSettings={() => setIsSettingsOpen(true)}
        minimizedApps={minimizedApps}
      />
      
      <Settings
        isOpen={isSettingsOpen}
        onClose={() => setIsSettingsOpen(false)}
        apps={apps}
        groups={groups}
        onAddApp={handleAddApp}
        onAddGroup={handleAddGroup}
        onDeleteGroup={handleDeleteGroup}
      />
    </div>
  );
};

export default Index;
