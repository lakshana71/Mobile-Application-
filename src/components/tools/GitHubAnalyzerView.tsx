import React, { useState } from 'react';
import { Code2, RefreshCw } from 'lucide-react';
import { useApp } from '../../context/AppContext';

export const GitHubAnalyzerView: React.FC = () => {
  const { userProfile } = useApp();
  const [username, setUsername] = useState('alex-dev-2026');

  return (
    <div className="p-6 max-w-5xl mx-auto space-y-6">
      
      {/* Header */}
      <div className="glass-card p-6 rounded-3xl border border-white/80 space-y-2">
        <div className="flex items-center space-x-2 text-brand-primary">
          <Code2 className="w-5 h-5" />
          <span className="text-xs font-bold uppercase tracking-wider">GitHub Code Intelligence</span>
        </div>
        <h1 className="text-2xl font-extrabold text-slate-900">
          Open Source & Code Quality Analyzer for {userProfile.dreamCareer}
        </h1>
        <p className="text-xs text-slate-500">
          Analyze public repositories for code cleanliness, test coverage, and commit velocity.
        </p>
      </div>

      {/* Profile Bar */}
      <div className="glass-card p-4 rounded-2xl border border-white/80 flex flex-col sm:flex-row items-center justify-between gap-4">
        <div className="flex items-center space-x-3">
          <div className="w-10 h-10 rounded-full bg-slate-900 text-white flex items-center justify-center font-bold">
            <Code2 className="w-6 h-6 text-brand-accent" />
          </div>
          <div>
            <span className="text-xs text-slate-400 font-medium block">Connected Account</span>
            <input
              type="text"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              className="font-bold text-slate-900 text-sm bg-transparent border-b border-slate-300 focus:outline-none focus:border-brand-primary"
            />
          </div>
        </div>

        <button
          className="px-4 py-2 rounded-xl bg-brand-primary text-white text-xs font-bold hover:bg-indigo-600 flex items-center space-x-1"
        >
          <RefreshCw className="w-3.5 h-3.5" />
          <span>Rescan Repositories</span>
        </button>
      </div>

      {/* Grid Overview */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        
        <div className="glass-card p-6 rounded-3xl border border-white/80 space-y-3">
          <span className="text-xs text-slate-400 font-bold uppercase tracking-wider">Code Quality Score</span>
          <div className="text-4xl font-black text-brand-primary">89/100</div>
          <p className="text-xs text-slate-500">Clean modular structure with low cyclomatic complexity.</p>
        </div>

        <div className="glass-card p-6 rounded-3xl border border-white/80 space-y-3">
          <span className="text-xs text-slate-400 font-bold uppercase tracking-wider">Commit Velocity</span>
          <div className="text-4xl font-black text-emerald-600">142</div>
          <p className="text-xs text-slate-500">Commits over the last 90 days across 8 active repositories.</p>
        </div>

        <div className="glass-card p-6 rounded-3xl border border-white/80 space-y-3">
          <span className="text-xs text-slate-400 font-bold uppercase tracking-wider">Starred Repos</span>
          <div className="text-4xl font-black text-amber-500">24</div>
          <p className="text-xs text-slate-500">Includes full-stack capstone and open-source contributions.</p>
        </div>

      </div>

      {/* Simulated Commit Heatmap Grid */}
      <div className="glass-card p-6 rounded-3xl border border-white/80 space-y-4">
        <h3 className="font-bold text-slate-900 text-sm">Commit Activity Grid (Last 12 Weeks)</h3>
        <div className="grid grid-cols-12 gap-1.5 pt-2">
          {Array.from({ length: 84 }).map((_, idx) => {
            const intensity = idx % 7 === 0 ? 0 : (idx * 17) % 4;
            return (
              <div
                key={idx}
                className={`h-4 rounded-sm transition-all ${
                  intensity === 0
                    ? 'bg-slate-100'
                    : intensity === 1
                    ? 'bg-emerald-200'
                    : intensity === 2
                    ? 'bg-emerald-400'
                    : 'bg-emerald-600'
                }`}
                title={`Day ${idx + 1}: ${intensity * 3} commits`}
              />
            );
          })}
        </div>
      </div>

    </div>
  );
};
