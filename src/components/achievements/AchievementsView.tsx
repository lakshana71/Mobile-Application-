import React from 'react';
import { Trophy, Award, Flame, Zap, CheckCircle2, ShieldAlert, Star } from 'lucide-react';
import { useApp } from '../../context/AppContext';
import { INITIAL_ACHIEVEMENTS } from '../../data/careerData';

export const AchievementsView: React.FC = () => {
  const { userProfile, score360 } = useApp();

  return (
    <div className="p-6 max-w-5xl mx-auto space-y-6">
      
      <div className="glass-card p-6 rounded-3xl border border-white/80 space-y-2">
        <div className="flex items-center space-x-2 text-brand-primary">
          <Trophy className="w-5 h-5 text-amber-500" />
          <span className="text-xs font-bold uppercase tracking-wider">Milestones & Certificates</span>
        </div>
        <h1 className="text-2xl font-extrabold text-slate-900">
          Achievements & Badges Showcase
        </h1>
        <p className="text-xs text-slate-500">
          Earn verified badges as you master technical topics and resolve project failure scenarios.
        </p>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
        {INITIAL_ACHIEVEMENTS.map((badge) => (
          <div
            key={badge.id}
            className={`glass-card p-6 rounded-3xl border transition-all space-y-3 ${
              badge.unlocked ? 'bg-white border-brand-primary/30 shadow-md' : 'bg-slate-100/60 border-slate-200 opacity-60'
            }`}
          >
            <div className="flex items-center justify-between">
              <div className={`w-12 h-12 rounded-2xl flex items-center justify-center text-white ${
                badge.unlocked ? 'bg-gradient-to-tr from-brand-primary to-brand-accent shadow-glow-primary' : 'bg-slate-400'
              }`}>
                <Award className="w-6 h-6" />
              </div>
              <span className={`px-2.5 py-0.5 rounded-full text-[10px] font-bold ${
                badge.unlocked ? 'bg-emerald-100 text-emerald-700' : 'bg-slate-200 text-slate-500'
              }`}>
                {badge.unlocked ? 'Unlocked' : 'Locked'}
              </span>
            </div>

            <h3 className="font-bold text-slate-900 text-sm">{badge.title}</h3>
            <p className="text-xs text-slate-500 leading-relaxed">{badge.description}</p>

            {badge.unlockedAt && (
              <span className="text-[10px] font-bold text-brand-primary block pt-2 border-t border-slate-100">
                Unlocked {badge.unlockedAt}
              </span>
            )}
          </div>
        ))}
      </div>

    </div>
  );
};
