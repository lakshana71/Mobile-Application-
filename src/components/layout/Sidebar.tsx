import React from 'react';
import {
  BrainCircuit,
  LayoutDashboard,
  Target,
  MapPin,
  BarChart3,
  MessageSquare,
  Trophy,
  Settings,
  User,
  LogOut,
  FileText,
  Code2,
  Mic,
  Users,
  Sparkles,
  Orbit,
  ScanSearch,
  Workflow,
  RotateCw,
  FileCode,
  UploadCloud,
  Dna,
  Bot,
} from 'lucide-react';
import { useApp } from '../../context/AppContext';
import { NavigationTab } from '../../types';

export const Sidebar: React.FC = () => {
  const { activeTab, setActiveTab, logout, userProfile } = useApp();

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
    { id: 'roadmap', label: 'Personalized Challenges', icon: <MapPin className="w-4 h-4" /> },
    { id: 'mock-interview', label: 'AI Mock Interview', icon: <Mic className="w-4 h-4" />, badge: 'Live' },
    { id: 'resume-analyzer', label: 'Resume Analyzer', icon: <FileText className="w-4 h-4" /> },
    { id: 'github-analyzer', label: 'GitHub Deep Audit', icon: <Code2 className="w-4 h-4" /> },
    { id: 'community', label: 'Peer Learning', icon: <Users className="w-4 h-4" /> },
    { id: 'achievements', label: 'Achievements', icon: <Trophy className="w-4 h-4" /> },
  ];

  const settingsNavItems: { id: NavigationTab; label: string; icon: React.ReactNode }[] = [
    { id: 'settings', label: 'Settings', icon: <Settings className="w-4 h-4" /> },
    { id: 'profile', label: 'User Profile', icon: <User className="w-4 h-4" /> },
  ];

  return (
    <aside className="hidden md:flex w-64 bg-white/70 backdrop-blur-xl border-r border-slate-200/80 flex-col justify-between h-screen sticky top-0 z-30 select-none">
      
      {/* Brand Header */}
      <div>
        <div className="p-5 flex items-center space-x-3 border-b border-slate-200/60">
          <div className="w-9 h-9 rounded-xl bg-gradient-to-tr from-brand-primary via-brand-secondary to-brand-accent flex items-center justify-center shadow-glow-primary flex-shrink-0">
            <BrainCircuit className="w-5 h-5 text-white" />
          </div>
          <div className="truncate">
            <span className="font-bold text-base text-slate-900 tracking-tight">SkillSphere<span className="gradient-text">.AI</span></span>
            <span className="block text-[9px] text-slate-400 font-semibold uppercase tracking-wider truncate">Digital Skill Twin</span>
          </div>
        </div>

        {/* Navigation Sections */}
        <div className="px-3 py-4 space-y-5 max-h-[calc(100vh-180px)] overflow-y-auto">
          
          {/* Digital Skill Twin Architecture Group */}
          <div>
            <div className="px-3 text-[10px] font-bold uppercase tracking-wider text-slate-400 mb-2 flex items-center justify-between">
              <span>Digital Skill Twin Core</span>
              <Sparkles className="w-3 h-3 text-brand-primary" />
            </div>
            <div className="space-y-1">
              {twinModules.map((item) => {
                const isActive = activeTab === item.id;
                return (
                  <button
                    key={item.id}
                    onClick={() => setActiveTab(item.id)}
                    className={`w-full px-3 py-2.5 rounded-xl text-xs font-semibold flex items-center justify-between transition-all ${
                      isActive
                        ? 'bg-brand-primary text-white shadow-md shadow-brand-primary/20 font-bold'
                        : 'text-slate-600 hover:bg-slate-100 hover:text-slate-900'
                    }`}
                  >
                    <div className="flex items-center space-x-2.5 truncate">
                      {item.icon}
                      <span className="truncate">{item.label}</span>
                    </div>
                    {item.badge && (
                      <span className={`px-1.5 py-0.5 rounded text-[9px] font-extrabold uppercase ${
                        isActive ? 'bg-white/20 text-white' : 'bg-brand-primary/10 text-brand-primary'
                      }`}>
                        {item.badge}
                      </span>
                    )}
                  </button>
                );
              })}
            </div>
          </div>

          {/* Secondary Tools */}
          <div>
            <div className="px-3 text-[10px] font-bold uppercase tracking-wider text-slate-400 mb-2">Practice & Drills</div>
            <div className="space-y-1">
              {secondaryTools.map((item) => {
                const isActive = activeTab === item.id;
                return (
                  <button
                    key={item.id}
                    onClick={() => setActiveTab(item.id)}
                    className={`w-full px-3 py-2 rounded-xl text-xs font-semibold flex items-center justify-between transition-all ${
                      isActive
                        ? 'bg-brand-primary text-white shadow-md font-bold'
                        : 'text-slate-600 hover:bg-slate-100 hover:text-slate-900'
                    }`}
                  >
                    <div className="flex items-center space-x-2.5 truncate">
                      {item.icon}
                      <span className="truncate">{item.label}</span>
                    </div>
                    {item.badge && (
                      <span className="px-1.5 py-0.5 rounded text-[8px] font-extrabold uppercase bg-slate-100 text-slate-600">
                        {item.badge}
                      </span>
                    )}
                  </button>
                );
              })}
            </div>
          </div>


          {/* Settings Group */}
          <div>
            <div className="px-3 text-[10px] font-bold uppercase tracking-wider text-slate-400 mb-2">Account</div>
            <div className="space-y-1">
              {settingsNavItems.map((item) => {
                const isActive = activeTab === item.id;
                return (
                  <button
                    key={item.id}
                    onClick={() => setActiveTab(item.id)}
                    className={`w-full px-3 py-2 rounded-xl text-xs font-semibold flex items-center space-x-2.5 transition-all ${
                      isActive
                        ? 'bg-brand-primary text-white shadow-md font-bold'
                        : 'text-slate-600 hover:bg-slate-100 hover:text-slate-900'
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
      </div>

      {/* User Footer Profile & Logout */}
      <div className="p-3 border-t border-slate-200/80 bg-slate-50/50">
        <div className="glass-card p-3 rounded-2xl border border-slate-200 flex items-center justify-between">
          <div className="flex items-center space-x-2.5 overflow-hidden">
            <img
              src={userProfile.avatarUrl}
              alt="Avatar"
              className="w-8 h-8 rounded-full object-cover border border-brand-primary/40 flex-shrink-0"
            />
            <div className="truncate">
              <span className="block text-xs font-bold text-slate-900 truncate">{userProfile.name}</span>
              <span className="block text-[10px] text-brand-primary font-semibold truncate">{userProfile.dreamCareer}</span>
            </div>
          </div>

          <button
            onClick={logout}
            title="Sign Out"
            className="p-1.5 rounded-lg hover:bg-rose-50 text-slate-400 hover:text-rose-600 transition-colors"
          >
            <LogOut className="w-4 h-4" />
          </button>
        </div>
      </div>

    </aside>
  );
};
