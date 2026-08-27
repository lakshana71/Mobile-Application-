import React from 'react';
import {
  BrainCircuit,
  LayoutDashboard,
  RotateCw,
  FileCode,
  UploadCloud,
  BarChart3,
  Dna,
  Workflow,
  Bot,
  MapPin,
  Mic,
  FileText,
  Code2,
  Users,
  Trophy,
  Settings,
  User,
  LogOut,
  X,
} from 'lucide-react';
import { useApp } from '../../context/AppContext';
import { NavigationTab } from '../../types';

export const MobileDrawer: React.FC = () => {
  const {
    isMobileDrawerOpen,
    setIsMobileDrawerOpen,
    activeTab,
    setActiveTab,
    logout,
    userProfile,
  } = useApp();

  if (!isMobileDrawerOpen) return null;

  const twinModules: { id: NavigationTab; label: string; icon: React.ReactNode; badge?: string }[] = [
    { id: 'dashboard', label: 'Dashboard Overview', icon: <LayoutDashboard className="w-4 h-4" /> },
    { id: 'circular-workflow', label: '360° Circular Journey', icon: <RotateCw className="w-4 h-4" />, badge: '360°' },
    { id: 'practical-assessment', label: '1. Practical Assessment', icon: <FileCode className="w-4 h-4" />, badge: 'M1' },
    { id: 'project-analysis', label: '2. Project Analysis', icon: <UploadCloud className="w-4 h-4" />, badge: 'M2' },
    { id: 'skill-gap-engine', label: '3. Skill Gap Engine', icon: <BarChart3 className="w-4 h-4" />, badge: 'M3' },
    { id: 'skill-genome', label: '4. Skill Genome AI', icon: <Dna className="w-4 h-4" />, badge: 'M4' },
    { id: 'skill-evolution', label: '5. Skill Evolution', icon: <Workflow className="w-4 h-4" />, badge: 'M5' },
    { id: 'ai-shadow-mentor', label: '6. AI Shadow Mentor', icon: <Bot className="w-4 h-4" />, badge: 'M6' },
  ];

  const secondaryTools: { id: NavigationTab; label: string; icon: React.ReactNode; badge?: string }[] = [
    { id: 'roadmap', label: 'Personalized Roadmap', icon: <MapPin className="w-4 h-4" /> },
    { id: 'mock-interview', label: 'AI Mock Interview', icon: <Mic className="w-4 h-4" />, badge: 'Live' },
    { id: 'resume-analyzer', label: 'Resume Analyzer', icon: <FileText className="w-4 h-4" /> },
    { id: 'github-analyzer', label: 'GitHub Deep Audit', icon: <Code2 className="w-4 h-4" /> },
    { id: 'community', label: 'Peer Community', icon: <Users className="w-4 h-4" /> },
    { id: 'achievements', label: 'Achievements', icon: <Trophy className="w-4 h-4" /> },
  ];

  const settingsItems: { id: NavigationTab; label: string; icon: React.ReactNode }[] = [
    { id: 'settings', label: 'Settings', icon: <Settings className="w-4 h-4" /> },
    { id: 'profile', label: 'User Profile', icon: <User className="w-4 h-4" /> },
  ];

  const handleSelectTab = (tab: NavigationTab) => {
    setActiveTab(tab);
    setIsMobileDrawerOpen(false);
  };

  return (
    <div className="fixed inset-0 z-50 flex">
      {/* Backdrop overlay */}
      <div
        className="fixed inset-0 bg-slate-900/60 backdrop-blur-sm animate-in fade-in duration-200"
        onClick={() => setIsMobileDrawerOpen(false)}
      />

      {/* Slide-out Drawer Panel */}
      <div className="relative w-4/5 max-w-xs bg-slate-900 text-slate-100 h-full flex flex-col justify-between shadow-2xl z-10 animate-in slide-in-from-left duration-250 border-r border-slate-800">
        
        {/* Header */}
        <div className="p-4 border-b border-slate-800 flex items-center justify-between">
          <div className="flex items-center space-x-2.5">
            <div className="w-8 h-8 rounded-xl bg-gradient-to-tr from-brand-primary via-brand-secondary to-brand-accent flex items-center justify-center shadow-lg">
              <BrainCircuit className="w-4 h-4 text-white" />
            </div>
            <div>
              <span className="font-extrabold text-sm text-white">SkillSphere<span className="text-brand-accent">.AI</span></span>
              <span className="block text-[9px] text-slate-400 font-semibold uppercase">Mobile & Web App</span>
            </div>
          </div>

          <button
            onClick={() => setIsMobileDrawerOpen(false)}
            className="p-1.5 rounded-xl bg-slate-800 text-slate-400 hover:text-white"
          >
            <X className="w-5 h-5" />
          </button>
        </div>



        {/* Navigation items scrollable */}
        <div className="p-3 space-y-4 overflow-y-auto flex-1 text-xs">
          
          {/* Core Twin Modules */}
          <div>
            <div className="px-2 text-[10px] font-bold uppercase tracking-wider text-slate-500 mb-2">
              Digital Twin Core
            </div>
            <div className="space-y-1">
              {twinModules.map((item) => {
                const isActive = activeTab === item.id;
                return (
                  <button
                    key={item.id}
                    onClick={() => handleSelectTab(item.id)}
                    className={`w-full px-3 py-2.5 rounded-xl font-semibold flex items-center justify-between transition-all ${
                      isActive
                        ? 'bg-brand-primary text-white font-bold shadow-md shadow-brand-primary/30'
                        : 'text-slate-300 hover:bg-slate-800'
                    }`}
                  >
                    <div className="flex items-center space-x-2.5 truncate">
                      {item.icon}
                      <span className="truncate">{item.label}</span>
                    </div>
                    {item.badge && (
                      <span className="px-1.5 py-0.5 rounded text-[8px] font-extrabold uppercase bg-slate-800 text-brand-accent">
                        {item.badge}
                      </span>
                    )}
                  </button>
                );
              })}
            </div>
          </div>

          {/* Secondary Drills */}
          <div>
            <div className="px-2 text-[10px] font-bold uppercase tracking-wider text-slate-500 mb-2">
              Practice Tools
            </div>
            <div className="space-y-1">
              {secondaryTools.map((item) => {
                const isActive = activeTab === item.id;
                return (
                  <button
                    key={item.id}
                    onClick={() => handleSelectTab(item.id)}
                    className={`w-full px-3 py-2 rounded-xl font-semibold flex items-center justify-between transition-all ${
                      isActive
                        ? 'bg-brand-primary text-white font-bold'
                        : 'text-slate-300 hover:bg-slate-800'
                    }`}
                  >
                    <div className="flex items-center space-x-2.5 truncate">
                      {item.icon}
                      <span className="truncate">{item.label}</span>
                    </div>
                  </button>
                );
              })}
            </div>
          </div>

          {/* Settings */}
          <div>
            <div className="px-2 text-[10px] font-bold uppercase tracking-wider text-slate-500 mb-2">
              Account
            </div>
            <div className="space-y-1">
              {settingsItems.map((item) => {
                const isActive = activeTab === item.id;
                return (
                  <button
                    key={item.id}
                    onClick={() => handleSelectTab(item.id)}
                    className={`w-full px-3 py-2 rounded-xl font-semibold flex items-center space-x-2.5 transition-all ${
                      isActive
                        ? 'bg-brand-primary text-white font-bold'
                        : 'text-slate-300 hover:bg-slate-800'
                    }`}
                  >
                    {item.icon}
                    <span>{item.label}</span>
                  </button>
                );
              })}
            </div>
          </div>

        </div>

        {/* Footer User Info */}
        <div className="p-3 border-t border-slate-800 bg-slate-950/60">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-2.5 truncate">
              <img
                src={userProfile.avatarUrl}
                alt="Avatar"
                className="w-8 h-8 rounded-full border border-brand-primary object-cover flex-shrink-0"
              />
              <div className="truncate">
                <span className="block text-xs font-bold text-white truncate">{userProfile.name}</span>
                <span className="block text-[10px] text-slate-400 truncate">{userProfile.dreamCareer}</span>
              </div>
            </div>

            <button
              onClick={() => {
                setIsMobileDrawerOpen(false);
                logout();
              }}
              className="p-2 rounded-xl text-slate-400 hover:text-rose-400 hover:bg-rose-950/40"
              title="Sign Out"
            >
              <LogOut className="w-4 h-4" />
            </button>
          </div>
        </div>

      </div>
    </div>
  );
};
