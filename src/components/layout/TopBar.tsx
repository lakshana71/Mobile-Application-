import React, { useState } from 'react';
import { Search, Bell, Flame, Target, Sparkles, CheckCircle2, ChevronRight, X } from 'lucide-react';
import { useApp } from '../../context/AppContext';

export const TopBar: React.FC = () => {
  const { userProfile, score360, notifications, markNotificationRead, setActiveTab } = useApp();
  const [showNotifMenu, setShowNotifMenu] = useState(false);

  const unreadCount = notifications.filter((n) => !n.read).length;

  return (
    <header className="sticky top-0 z-20 w-full bg-white/70 backdrop-blur-md border-b border-slate-200/80 px-6 py-3 flex items-center justify-between">
      
      {/* Search Input */}
      <div className="flex items-center space-x-3 w-72">
        <div className="relative w-full">
          <Search className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" />
          <input
            type="text"
            placeholder="Search skills, roadmap steps, tools..."
            className="w-full pl-9 pr-4 py-2 rounded-xl bg-slate-100/80 border border-transparent text-xs text-slate-900 focus:outline-none focus:bg-white focus:border-brand-primary/40 focus:ring-2 focus:ring-brand-primary/10 transition-all"
          />
        </div>
      </div>

      {/* Center Target Role Pill */}
      <div className="hidden lg:flex items-center space-x-2 px-3.5 py-1.5 rounded-full bg-gradient-to-r from-brand-primary/10 via-brand-secondary/10 to-brand-accent/10 border border-brand-primary/20 text-xs font-semibold text-slate-800">
        <Target className="w-3.5 h-3.5 text-brand-primary" />
        <span>Target: <span className="font-bold text-brand-primary">{userProfile.dreamCareer}</span></span>
        <span className="text-slate-300">•</span>
        <span className="text-slate-500">{userProfile.dreamCompany || 'Top Tech'}</span>
      </div>

      {/* Right Side Stats & Actions */}
      <div className="flex items-center space-x-4">
        
        {/* Streak Pill */}
        <div className="flex items-center space-x-1.5 px-3 py-1.5 rounded-full bg-amber-50 text-amber-700 border border-amber-200 text-xs font-bold shadow-sm">
          <Flame className="w-4 h-4 text-amber-500 fill-amber-500 animate-pulse" />
          <span>{userProfile.streakDays} Day Streak</span>
        </div>

        {/* 360 Score Badge */}
        <div className="flex items-center space-x-1.5 px-3.5 py-1.5 rounded-full bg-brand-primary/10 text-brand-primary border border-brand-primary/20 text-xs font-extrabold shadow-sm">
          <Sparkles className="w-3.5 h-3.5 text-brand-accent" />
          <span>Score: {score360.overallScore}/100</span>
        </div>

        {/* Notifications Bell Dropdown */}
        <div className="relative">
          <button
            onClick={() => setShowNotifMenu(!showNotifMenu)}
            className="relative p-2 rounded-xl hover:bg-slate-100 text-slate-600 transition-colors"
          >
            <Bell className="w-5 h-5" />
            {unreadCount > 0 && (
              <span className="absolute top-1 right-1 w-2.5 h-2.5 rounded-full bg-rose-500 ring-2 ring-white animate-ping" />
            )}
            {unreadCount > 0 && (
              <span className="absolute top-1 right-1 w-2.5 h-2.5 rounded-full bg-rose-500 ring-2 ring-white" />
            )}
          </button>

          {/* Notif Dropdown Popup */}
          {showNotifMenu && (
            <div className="absolute right-0 mt-2 w-80 sm:w-96 glass-card rounded-2xl shadow-2xl border border-white/80 p-4 z-50 animate-in fade-in zoom-in-95 duration-150">
              <div className="flex items-center justify-between mb-3 pb-2 border-b border-slate-200">
                <div className="flex items-center space-x-2">
                  <Bell className="w-4 h-4 text-brand-primary" />
                  <span className="font-bold text-sm text-slate-900">Notifications</span>
                  {unreadCount > 0 && (
                    <span className="px-2 py-0.5 rounded-full bg-brand-primary text-white text-[10px] font-bold">
                      {unreadCount} new
                    </span>
                  )}
                </div>
                <button
                  onClick={() => setShowNotifMenu(false)}
                  className="p-1 rounded-lg hover:bg-slate-100 text-slate-400"
                >
                  <X className="w-4 h-4" />
                </button>
              </div>

              <div className="space-y-2.5 max-h-80 overflow-y-auto pr-1">
                {notifications.map((n) => (
                  <div
                    key={n.id}
                    onClick={() => {
                      markNotificationRead(n.id);
                      if (n.actionTab) setActiveTab(n.actionTab);
                      setShowNotifMenu(false);
                    }}
                    className={`p-3 rounded-xl border text-xs cursor-pointer transition-all ${
                      n.read
                        ? 'bg-slate-50/50 border-slate-200 text-slate-600'
                        : 'bg-white border-brand-primary/30 shadow-sm text-slate-900 font-medium hover:border-brand-primary'
                    }`}
                  >
                    <div className="flex items-start justify-between mb-1">
                      <span className="font-bold text-slate-900">{n.title}</span>
                      <span className="text-[10px] text-slate-400">{n.timestamp}</span>
                    </div>
                    <p className="text-slate-600 leading-relaxed mb-1.5">{n.message}</p>
                    {n.actionTab && (
                      <span className="inline-flex items-center text-[10px] font-bold text-brand-primary">
                        <span>View Details</span>
                        <ChevronRight className="w-3 h-3 ml-0.5" />
                      </span>
                    )}
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>

      </div>

    </header>
  );
};
