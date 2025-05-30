
import React, { useState } from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { App, Group } from '@/types/app';
import { Plus, Edit, Trash2 } from 'lucide-react';

interface SettingsProps {
  isOpen: boolean;
  onClose: () => void;
  apps: App[];
  groups: Group[];
  onAddApp: (app: Omit<App, 'id' | 'isOpen' | 'zIndex'>) => void;
  onAddGroup: (group: Omit<Group, 'id'>) => void;
  onDeleteGroup: (groupId: string) => void;
  onEditApp: (appId: string, app: Omit<App, 'id' | 'isOpen' | 'zIndex'>) => void;
  onEditGroup: (groupId: string, group: Omit<Group, 'id'>) => void;
  onDeleteApp: (appId: string) => void;
}

const Settings: React.FC<SettingsProps> = ({ 
  isOpen, 
  onClose, 
  apps, 
  groups, 
  onAddApp, 
  onAddGroup, 
  onDeleteGroup,
  onEditApp,
  onEditGroup,
  onDeleteApp
}) => {
  const [activeTab, setActiveTab] = useState<'apps' | 'groups'>('apps');
  const [showAddApp, setShowAddApp] = useState(false);
  const [showAddGroup, setShowAddGroup] = useState(false);
  const [editingApp, setEditingApp] = useState<App | null>(null);
  const [editingGroup, setEditingGroup] = useState<Group | null>(null);
  
  const [appFormData, setAppFormData] = useState({
    name: '',
    url: '',
    icon: '🚀',
    color: '#3b82f6',
    groups: [] as string[]
  });

  const [groupFormData, setGroupFormData] = useState({
    name: '',
    color: '#3b82f6'
  });

  const iconOptions = ['🚀', '📊', '💻', '🌐', '📱', '⚙️', '📈', '🔧', '📋', '🏠', '📅', '💼'];
  const colorOptions = ['#3b82f6', '#ef4444', '#10b981', '#f59e0b', '#8b5cf6', '#ec4899', '#06b6d4', '#84cc16'];

  const resetAppForm = () => {
    setAppFormData({ name: '', url: '', icon: '🚀', color: '#3b82f6', groups: [] });
    setEditingApp(null);
    setShowAddApp(false);
  };

  const resetGroupForm = () => {
    setGroupFormData({ name: '', color: '#3b82f6' });
    setEditingGroup(null);
    setShowAddGroup(false);
  };

  const handleEditApp = (app: App) => {
    setAppFormData({
      name: app.name,
      url: app.url,
      icon: app.icon,
      color: app.color,
      groups: app.groups
    });
    setEditingApp(app);
    setShowAddApp(true);
  };

  const handleEditGroup = (group: Group) => {
    setGroupFormData({
      name: group.name,
      color: group.color
    });
    setEditingGroup(group);
    setShowAddGroup(true);
  };

  const handleAppSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (appFormData.name && appFormData.url) {
      if (editingApp) {
        onEditApp(editingApp.id, appFormData);
      } else {
        onAddApp(appFormData);
      }
      resetAppForm();
    }
  };

  const handleGroupSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (groupFormData.name) {
      if (editingGroup) {
        onEditGroup(editingGroup.id, groupFormData);
      } else {
        onAddGroup(groupFormData);
      }
      resetGroupForm();
    }
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-2xl max-h-[80vh] overflow-hidden flex flex-col">
        <DialogHeader>
          <DialogTitle className="text-xl font-semibold text-gray-800">Settings</DialogTitle>
        </DialogHeader>
        
        <div className="flex space-x-1 mb-4">
          <Button
            variant={activeTab === 'apps' ? 'default' : 'outline'}
            onClick={() => setActiveTab('apps')}
            size="sm"
          >
            Apps
          </Button>
          <Button
            variant={activeTab === 'groups' ? 'default' : 'outline'}
            onClick={() => setActiveTab('groups')}
            size="sm"
          >
            Groups
          </Button>
        </div>

        <div className="flex-1 overflow-y-auto">
          {activeTab === 'apps' && (
            <div className="space-y-4">
              <div className="flex justify-between items-center">
                <h3 className="text-lg font-medium">Apps</h3>
                <Button onClick={() => setShowAddApp(true)} size="sm">
                  <Plus className="w-4 h-4 mr-1" />
                  Add App
                </Button>
              </div>
              
              {showAddApp && (
                <form onSubmit={handleAppSubmit} className="space-y-4 border rounded-lg p-4 bg-gray-50">
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <Label htmlFor="app-name">App Name</Label>
                      <Input
                        id="app-name"
                        value={appFormData.name}
                        onChange={(e) => setAppFormData(prev => ({ ...prev, name: e.target.value }))}
                        placeholder="Enter app name"
                        required
                      />
                    </div>
                    <div>
                      <Label htmlFor="app-url">App URL</Label>
                      <Input
                        id="app-url"
                        type="url"
                        value={appFormData.url}
                        onChange={(e) => setAppFormData(prev => ({ ...prev, url: e.target.value }))}
                        placeholder="https://example.com"
                        required
                      />
                    </div>
                  </div>
                  
                  <div>
                    <Label>Icon</Label>
                    <div className="grid grid-cols-6 gap-2 mt-2">
                      {iconOptions.map((icon) => (
                        <button
                          key={icon}
                          type="button"
                          className={`p-2 text-lg rounded border-2 transition-all ${
                            appFormData.icon === icon 
                              ? 'border-blue-500 bg-blue-50' 
                              : 'border-gray-200 hover:border-gray-300'
                          }`}
                          onClick={() => setAppFormData(prev => ({ ...prev, icon }))}
                        >
                          {icon}
                        </button>
                      ))}
                    </div>
                  </div>
                  
                  <div>
                    <Label>Color</Label>
                    <div className="grid grid-cols-8 gap-2 mt-2">
                      {colorOptions.map((color) => (
                        <button
                          key={color}
                          type="button"
                          className={`w-6 h-6 rounded border-2 transition-all ${
                            appFormData.color === color 
                              ? 'border-gray-800 scale-110' 
                              : 'border-gray-300'
                          }`}
                          style={{ backgroundColor: color }}
                          onClick={() => setAppFormData(prev => ({ ...prev, color }))}
                        />
                      ))}
                    </div>
                  </div>

                  <div>
                    <Label>Groups</Label>
                    <div className="grid grid-cols-3 gap-2 mt-2">
                      {groups.map((group) => (
                        <label key={group.id} className="flex items-center space-x-2 text-sm">
                          <input
                            type="checkbox"
                            checked={appFormData.groups.includes(group.id)}
                            onChange={(e) => {
                              if (e.target.checked) {
                                setAppFormData(prev => ({ 
                                  ...prev, 
                                  groups: [...prev.groups, group.id] 
                                }));
                              } else {
                                setAppFormData(prev => ({ 
                                  ...prev, 
                                  groups: prev.groups.filter(g => g !== group.id) 
                                }));
                              }
                            }}
                          />
                          <span>{group.name}</span>
                        </label>
                      ))}
                    </div>
                  </div>
                  
                  <div className="flex space-x-2">
                    <Button type="submit" size="sm">
                      {editingApp ? 'Update App' : 'Add App'}
                    </Button>
                    <Button type="button" variant="outline" size="sm" onClick={resetAppForm}>
                      Cancel
                    </Button>
                  </div>
                </form>
              )}
              
              <div className="space-y-2">
                {apps.map((app) => (
                  <div key={app.id} className="flex items-center justify-between p-3 border rounded-lg">
                    <div className="flex items-center space-x-3">
                      <div 
                        className="w-8 h-8 rounded flex items-center justify-center text-white text-sm font-bold"
                        style={{ backgroundColor: app.color }}
                      >
                        {app.icon}
                      </div>
                      <div>
                        <div className="font-medium">{app.name}</div>
                        <div className="text-xs text-gray-500">{app.url}</div>
                      </div>
                    </div>
                    <div className="flex space-x-1">
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={() => handleEditApp(app)}
                        className="text-blue-600 hover:text-blue-700"
                      >
                        <Edit className="w-4 h-4" />
                      </Button>
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={() => onDeleteApp(app.id)}
                        className="text-red-600 hover:text-red-700"
                      >
                        <Trash2 className="w-4 h-4" />
                      </Button>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {activeTab === 'groups' && (
            <div className="space-y-4">
              <div className="flex justify-between items-center">
                <h3 className="text-lg font-medium">Groups</h3>
                <Button onClick={() => setShowAddGroup(true)} size="sm">
                  <Plus className="w-4 h-4 mr-1" />
                  Add Group
                </Button>
              </div>
              
              {showAddGroup && (
                <form onSubmit={handleGroupSubmit} className="space-y-4 border rounded-lg p-4 bg-gray-50">
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <Label htmlFor="group-name">Group Name</Label>
                      <Input
                        id="group-name"
                        value={groupFormData.name}
                        onChange={(e) => setGroupFormData(prev => ({ ...prev, name: e.target.value }))}
                        placeholder="Enter group name"
                        required
                      />
                    </div>
                    <div>
                      <Label>Color</Label>
                      <div className="grid grid-cols-4 gap-2 mt-2">
                        {colorOptions.slice(0, 4).map((color) => (
                          <button
                            key={color}
                            type="button"
                            className={`w-6 h-6 rounded border-2 transition-all ${
                              groupFormData.color === color 
                                ? 'border-gray-800 scale-110' 
                                : 'border-gray-300'
                            }`}
                            style={{ backgroundColor: color }}
                            onClick={() => setGroupFormData(prev => ({ ...prev, color }))}
                          />
                        ))}
                      </div>
                    </div>
                  </div>
                  
                  <div className="flex space-x-2">
                    <Button type="submit" size="sm">
                      {editingGroup ? 'Update Group' : 'Add Group'}
                    </Button>
                    <Button type="button" variant="outline" size="sm" onClick={resetGroupForm}>
                      Cancel
                    </Button>
                  </div>
                </form>
              )}
              
              <div className="space-y-2">
                {groups.map((group) => (
                  <div key={group.id} className="flex items-center justify-between p-3 border rounded-lg">
                    <div className="flex items-center space-x-3">
                      <div 
                        className="w-6 h-6 rounded"
                        style={{ backgroundColor: group.color }}
                      />
                      <span className="font-medium">{group.name}</span>
                    </div>
                    <div className="flex space-x-1">
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={() => handleEditGroup(group)}
                        className="text-blue-600 hover:text-blue-700"
                      >
                        <Edit className="w-4 h-4" />
                      </Button>
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={() => onDeleteGroup(group.id)}
                        className="text-red-600 hover:text-red-700"
                      >
                        <Trash2 className="w-4 h-4" />
                      </Button>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default Settings;
