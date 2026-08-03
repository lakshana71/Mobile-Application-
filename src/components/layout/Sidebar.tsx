import React from 'react';
import {
  BrainCircuit,
  LayoutDashboard,
  Target,
  MapPin,
  Briefcase,
  BarChart3,
  MessageSquare,
  Trophy,
  Settings,
  User,
  LogOut,
  FileText,
  Code2,
  Mic,
  Building,
  Users,
  Sparkles,
} from 'lucide-react';
import { useApp } from '../../context/AppContext';
import { NavigationTab } from '../../types';

export const Sidebar: React.FC = () => {
  const { activeTab, setActiveTab, logout, userProfile } = useApp();

  const mainNavItems: { id: NavigationTab; label: string; icon: React.ReactNode; badge?: string }[] = [
    { id: 'dashboard', label: 'Dashboard', icon: <LayoutDashboard className="w-4 h-4" /> },
    { id: 'skill-gap', label: 'Skill Gap Matrix', icon: <Target className="w-4 h-4" /> },
    { id: 'roadmap', label: 'Dynamic Roadmap', icon: <MapPin className="w-4 h-4" /> },
    { id: 'projects', label: 'Failure Analysis & Drills', icon: <Briefcase className="w-4 h-4" /> },
    { id: 'analytics', label: 'Weekly Analytics', icon: <BarChart3 className="w-4 h-4" /> },
    { id: 'mentor', label: 'Agentic AI Mentor', icon: <MessageSquare className="w-4 h-4" />, badge: 'AI' },
    { id: 'career-goals', label: 'Career Alignment', icon: <Target className="w-4 h-4" /> },
  ];

  const toolsNavItems: { id: NavigationTab; label: string; icon: React.ReactNode; badge?: string }[] = [
    { id: 'resume-analyzer', label: 'Resume Analyzer', icon: <FileText className="w-4 h-4" /> },
    { id: 'github-analyzer', label: 'GitHub Analyzer', icon: <Code2 className="w-4 h-4" /> },
    { id: 'mock-interview', label: 'AI Mock Interview', icon: <Mic className="w-4 h-4" />, badge: 'Live' },
    { id: 'internships', label: 'AI Internships', icon: <Building className="w-4 h-4" /> },
    { id: 'community', label: 'Peer Learning', icon: <Users className="w-4 h-4" /> },
    { id: 'achievements', label: 'Achievements', icon: <Trophy className="w-4 h-4" /> },
  ];

  const settingsNavItems: { id: NavigationTab; label: string; icon: React.ReactNode }[] = [
    { id: 'settings', label: 'Settings', icon: <Settings className="w-4 h-4" /> },
    { id: 'profile', label: 'User Profile', icon: <User className="w-4 h-4" /> },
  ];

  return (
    <aside className="w-64 bg-white/70 backdrop-blur-xl border-r border-slate-200/80 flex flex-col justify-between h-screen sticky top-0 z-30 select-none">
      
      {/* Brand Header */}
      <div>
        <div className="p-5 flex items-center space-x-3 border-b border-slate-200/60">
          <div className="w-9 h-9 rounded-xl bg-gradient-to-tr from-brand-primary via-brand-secondary to-brand-accent flex items-center justify-center shadow-glow-primary">
            <BrainCircuit className="w-5 h-5 text-white" />
          </div>
          <div>
            <span className="font-bold text-base text-slate-900 tracking-tight">SkillGap<span className="gradient-text">.AI</span></span>
            <span className="block text-[10px] text-slate-400 font-medium uppercase tracking-wider">360° Career Intelligence</span>
          </div>
        </div>

        {/* Navigation Sections */}
        <div className="px-3 py-4 space-y-6 max-h-[calc(100vh-180px)] overflow-y-auto">
          
          {/* Main Group */}
          <div>
            <div className="px-3 text-[10px] font-bold uppercase tracking-wider text-slate-400 mb-2">Main Dashboard</div>
            <div className="space-y-1">
              {mainNavItems.map((item) => {
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
                    <div className="flex items-center space-x-3">
                      {item.icon}
                      <span>{item.label}</span>
                    </div>
                    {item.badge && (
                      <span className={`px-1.5 py-0.5 rounded-md text-[9px] font-extrabold uppercase ${
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

          {/* AI Tools Group */}
          <div>
            <div className="px-3 text-[10px] font-bold uppercase tracking-wider text-slate-400 mb-2 flex items-center justify-between">
              <span>AI Skill Modules</span>
              <Sparkles className="w-3 h-3 text-brand-accent" />
            </div>
            <div className="space-y-1">
              {toolsNavItems.map((item) => {
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
                    <div className="flex items-center space-x-3">
                      {item.icon}
                      <span>{item.label}</span>
                    </div>
                    {item.badge && (
                      <span className={`px-1.5 py-0.5 rounded-md text-[9px] font-extrabold uppercase ${
                        isActive ? 'bg-white/20 text-white' : 'bg-brand-accent/20 text-cyan-600'
                      }`}>
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
                    className={`w-full px-3 py-2 rounded-xl text-xs font-semibold flex items-center space-x-3 transition-all ${
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
