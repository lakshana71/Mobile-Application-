import React from 'react';
import {
  LayoutDashboard,
  RotateCw,
  BarChart3,
  Bot,
  MapPin,
  User,
} from 'lucide-react';
import { useApp } from '../../context/AppContext';
import { NavigationTab } from '../../types';

export const MobileBottomNav: React.FC = () => {
  const { activeTab, setActiveTab } = useApp();

  const navItems: { id: NavigationTab; label: string; icon: React.ReactNode }[] = [
    { id: 'dashboard', label: 'Dashboard', icon: <LayoutDashboard className="w-5 h-5" /> },
    { id: 'circular-workflow', label: '360° Journey', icon: <RotateCw className="w-5 h-5" /> },
    { id: 'skill-gap-engine', label: 'Skill Engine', icon: <BarChart3 className="w-5 h-5" /> },
    { id: 'ai-shadow-mentor', label: 'AI Mentor', icon: <Bot className="w-5 h-5" /> },
    { id: 'roadmap', label: 'Roadmap', icon: <MapPin className="w-5 h-5" /> },
    { id: 'profile', label: 'Profile', icon: <User className="w-5 h-5" /> },
  ];

  return (
    <nav className="fixed bottom-0 left-0 right-0 z-40 bg-slate-900/95 backdrop-blur-lg border-t border-slate-800 px-2 py-2 flex items-center justify-around shadow-2xl">
      {navItems.map((item) => {
        const isActive = activeTab === item.id;
        return (
          <button
            key={item.id}
            onClick={() => setActiveTab(item.id)}
            className={`flex flex-col items-center justify-center flex-1 py-1 px-1 rounded-xl transition-all ${
              isActive
                ? 'text-brand-primary font-bold bg-brand-primary/10'
                : 'text-slate-400 hover:text-slate-200'
            }`}
          >
            <div className={`transition-transform ${isActive ? 'scale-110' : ''}`}>
              {item.icon}
            </div>
            <span className="text-[10px] font-semibold mt-1 truncate max-w-[64px]">
              {item.label}
            </span>
          </button>
        );
      })}
    </nav>
  );
};
