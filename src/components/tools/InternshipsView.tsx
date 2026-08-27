import React from 'react';
import { Orbit, Sparkles } from 'lucide-react';
import { useApp } from '../../context/AppContext';

export const InternshipsView: React.FC = () => {
  const { userProfile } = useApp();

  return (
    <div className="p-6 max-w-5xl mx-auto space-y-6">
      <div className="glass-card p-6 rounded-3xl border border-white/80 space-y-2">
        <div className="flex items-center space-x-2 text-brand-primary">
          <Orbit className="w-5 h-5" />
          <span className="text-xs font-bold uppercase tracking-wider">Digital Skill Twin</span>
        </div>
        <h1 className="text-2xl font-extrabold text-slate-900">
          Replaced with <span className="gradient-text">{userProfile.dreamCareer}</span> twin intelligence
        </h1>
        <p className="text-xs text-slate-500">
          This module now lives in the Digital Twin experience with genome, evolution, and shadow mentor insights.
        </p>
      </div>

      <div className="glass-card p-6 rounded-3xl border border-white/80">
        <div className="flex items-center space-x-2 text-brand-accent">
          <Sparkles className="w-5 h-5" />
          <span className="text-sm font-semibold">The internship experience has been replaced with an AI-native digital twin architecture.</span>
        </div>
      </div>
    </div>
  );
};
