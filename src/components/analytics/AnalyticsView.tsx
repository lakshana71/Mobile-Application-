import React from 'react';
import { BarChart3, TrendingUp, Clock, CheckCircle2, Award, Zap } from 'lucide-react';
import { useApp } from '../../context/AppContext';

export const AnalyticsView: React.FC = () => {
  const { userProfile, score360, roadmap } = useApp();

  const days = ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'];
  const hoursData = [2.5, 3.0, 1.5, 4.0, 2.0, 5.5, 3.5];

  return (
    <div className="p-6 max-w-5xl mx-auto space-y-6">
      
      <div className="glass-card p-6 rounded-3xl border border-white/80 space-y-2">
        <div className="flex items-center space-x-2 text-brand-primary">
          <BarChart3 className="w-5 h-5" />
          <span className="text-xs font-bold uppercase tracking-wider">Weekly Learning Performance</span>
        </div>
        <h1 className="text-2xl font-extrabold text-slate-900">
          Analytics Dashboard for <span className="gradient-text">{userProfile.name}</span>
        </h1>
        <p className="text-xs text-slate-500">
          Track learning velocity, skill acquisition trends, and benchmark comparisons.
        </p>
      </div>

      {/* Grid Stats */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4">
        <div className="glass-card p-5 rounded-2xl border border-white/80 space-y-1">
          <span className="text-[10px] text-slate-400 font-bold uppercase">Total Hours Spent</span>
          <div className="text-3xl font-black text-brand-primary">22.0 hrs</div>
          <span className="text-[10px] font-semibold text-emerald-600">+14% vs last week</span>
        </div>

        <div className="glass-card p-5 rounded-2xl border border-white/80 space-y-1">
          <span className="text-[10px] text-slate-400 font-bold uppercase">Milestones Completed</span>
          <div className="text-3xl font-black text-brand-secondary">
            {roadmap.filter((s) => s.completed).length} / {roadmap.length}
          </div>
          <span className="text-[10px] font-semibold text-slate-500">Roadmap Progress</span>
        </div>

        <div className="glass-card p-5 rounded-2xl border border-white/80 space-y-1">
          <span className="text-[10px] text-slate-400 font-bold uppercase">Current Readiness</span>
          <div className="text-3xl font-black text-brand-accent">{score360.industryReadiness}%</div>
          <span className="text-[10px] font-semibold text-emerald-600">Top 15% benchmark</span>
        </div>

        <div className="glass-card p-5 rounded-2xl border border-white/80 space-y-1">
          <span className="text-[10px] text-slate-400 font-bold uppercase">Streak Days</span>
          <div className="text-3xl font-black text-amber-500">{userProfile.streakDays} Days</div>
          <span className="text-[10px] font-semibold text-amber-600">Active Learning</span>
        </div>
      </div>

      {/* Learning Hours Visual Bar Chart */}
      <div className="glass-card p-6 rounded-3xl border border-white/80 space-y-4">
        <div className="flex items-center justify-between">
          <h3 className="font-bold text-slate-900 text-sm">Weekly Learning Hours Distribution</h3>
          <span className="text-xs text-brand-primary font-bold">Goal: {userProfile.weeklyHours} hrs/week</span>
        </div>

        <div className="h-48 flex items-end justify-between gap-3 pt-6 px-4">
          {days.map((day, idx) => {
            const h = hoursData[idx];
            const maxH = 6;
            const pct = Math.round((h / maxH) * 100);
            return (
              <div key={day} className="flex-1 flex flex-col items-center gap-2">
                <span className="text-[10px] font-bold text-slate-500">{h}h</span>
                <div className="w-full bg-slate-100 rounded-t-xl overflow-hidden flex items-end h-36">
                  <div
                    className="w-full bg-gradient-to-t from-brand-primary via-brand-secondary to-brand-accent rounded-t-xl transition-all duration-500"
                    style={{ height: `${pct}%` }}
                  />
                </div>
                <span className="text-xs font-semibold text-slate-700">{day}</span>
              </div>
            );
          })}
        </div>
      </div>

    </div>
  );
};
