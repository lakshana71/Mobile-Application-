import React from 'react';
import { Menu, Smartphone, Bell, Sparkles, Flame, Laptop } from 'lucide-react';
import { useApp } from '../../context/AppContext';

export const MobileHeaderBar: React.FC = () => {
  const {
    userProfile,
    score360,
    setIsMobileDrawerOpen,
    viewMode,
    setViewMode,
  } = useApp();

  return (
    <header className="bg-slate-900 text-white px-4 py-3 sticky top-0 z-40 flex items-center justify-between shadow-lg border-b border-slate-800">
      
      {/* Left: Drawer Menu Toggle & Brand */}
      <div className="flex items-center space-x-3">
        <button
          onClick={() => setIsMobileDrawerOpen(true)}
          className="p-2 rounded-xl bg-slate-800 text-slate-300 hover:text-white hover:bg-slate-700 transition-colors"
          aria-label="Open Navigation Menu"
        >
          <Menu className="w-5 h-5" />
        </button>

        <div className="flex items-center space-x-2">
          <div className="w-7 h-7 rounded-lg bg-gradient-to-tr from-brand-primary to-brand-accent flex items-center justify-center font-bold text-xs shadow-md">
            S
          </div>
          <span className="font-extrabold text-sm tracking-tight text-white">
            SkillSphere<span className="text-brand-accent">.AI</span>
          </span>
        </div>
      </div>

      {/* Right: Device Switcher + Streak + Score */}
      <div className="flex items-center space-x-2">
        
        {/* Device Switcher Pill */}
        <button
          onClick={() => {
            if (viewMode === 'simulator') setViewMode('web');
            else setViewMode('simulator');
          }}
          className={`p-1.5 px-2.5 rounded-full text-[11px] font-bold flex items-center space-x-1 border transition-all ${
            viewMode === 'simulator'
              ? 'bg-brand-primary text-white border-brand-accent'
              : 'bg-slate-800 text-slate-300 border-slate-700 hover:bg-slate-700'
          }`}
          title="Toggle Mobile Simulator Frame"
        >
          {viewMode === 'simulator' ? (
            <>
              <Laptop className="w-3.5 h-3.5 text-brand-accent" />
              <span className="hidden sm:inline">Web Mode</span>
            </>
          ) : (
            <>
              <Smartphone className="w-3.5 h-3.5 text-emerald-400" />
              <span className="hidden sm:inline">Phone Frame</span>
            </>
          )}
        </button>

        {/* Streak Pill */}
        <div className="flex items-center space-x-1 px-2.5 py-1 rounded-full bg-amber-500/20 text-amber-300 border border-amber-500/30 text-[10px] font-bold">
          <Flame className="w-3 h-3 text-amber-400 fill-amber-400" />
          <span>{userProfile.streakDays}d</span>
        </div>

        {/* Score Pill */}
        <div className="flex items-center space-x-1 px-2.5 py-1 rounded-full bg-brand-primary/30 text-brand-accent border border-brand-primary/40 text-[10px] font-bold">
          <Sparkles className="w-3 h-3 text-brand-accent" />
          <span>{score360.overallScore}</span>
        </div>

      </div>

    </header>
  );
};
