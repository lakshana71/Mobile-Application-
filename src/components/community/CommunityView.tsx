import React from 'react';
import { Users, MessageCircle, Code, ShieldCheck, Flame } from 'lucide-react';
import { useApp } from '../../context/AppContext';

export const CommunityView: React.FC = () => {
  const { userProfile } = useApp();

  return (
    <div className="p-6 max-w-5xl mx-auto space-y-6">
      
      <div className="glass-card p-6 rounded-3xl border border-white/80 space-y-2">
        <div className="flex items-center space-x-2 text-brand-primary">
          <Users className="w-5 h-5" />
          <span className="text-xs font-bold uppercase tracking-wider">Peer Learning Hub</span>
        </div>
        <h1 className="text-2xl font-extrabold text-slate-900">
          Collaborative Study Rooms for <span className="gradient-text">{userProfile.dreamCareer}</span>
        </h1>
        <p className="text-xs text-slate-500">
          Connect with peers learning similar skills, exchange code reviews, and challenge each other.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        
        {/* Active Study Room 1 */}
        <div className="glass-card p-6 rounded-3xl border border-white/80 space-y-4">
          <div className="flex items-center justify-between">
            <span className="px-3 py-1 rounded-full bg-emerald-100 text-emerald-700 text-xs font-bold">
              ● 14 Active Members
            </span>
            <span className="text-xs text-slate-400 font-semibold">Study Room #4</span>
          </div>

          <h3 className="font-bold text-slate-900 text-base">PyTorch & LLM Fine-Tuning Guild</h3>
          <p className="text-xs text-slate-600">Daily 1-hour code review session and RAG architecture study group.</p>

          <div className="flex items-center justify-between pt-2 border-t border-slate-100">
            <div className="flex -space-x-2">
              {[1, 2, 3, 4].map((i) => (
                <div key={i} className="w-7 h-7 rounded-full bg-brand-primary text-white text-[10px] font-bold flex items-center justify-center border-2 border-white">
                  U{i}
                </div>
              ))}
            </div>
            <button className="px-4 py-2 rounded-xl bg-brand-primary text-white text-xs font-bold hover:bg-indigo-600">
              Join Study Room
            </button>
          </div>
        </div>

        {/* Active Study Room 2 */}
        <div className="glass-card p-6 rounded-3xl border border-white/80 space-y-4">
          <div className="flex items-center justify-between">
            <span className="px-3 py-1 rounded-full bg-amber-100 text-amber-700 text-xs font-bold flex items-center space-x-1">
              <Flame className="w-3.5 h-3.5" />
              <span>Streak Drill Room</span>
            </span>
            <span className="text-xs text-slate-400 font-semibold">Study Room #9</span>
          </div>

          <h3 className="font-bold text-slate-900 text-base">LeetCode Medium Daily Sprints</h3>
          <p className="text-xs text-slate-600">Solve 2 Array & Graph problems together before technical interviews.</p>

          <div className="flex items-center justify-between pt-2 border-t border-slate-100">
            <div className="flex -space-x-2">
              {[5, 6, 7].map((i) => (
                <div key={i} className="w-7 h-7 rounded-full bg-brand-secondary text-white text-[10px] font-bold flex items-center justify-center border-2 border-white">
                  U{i}
                </div>
              ))}
            </div>
            <button className="px-4 py-2 rounded-xl bg-brand-primary text-white text-xs font-bold hover:bg-indigo-600">
              Join Study Room
            </button>
          </div>
        </div>

      </div>

    </div>
  );
};
