import React from 'react';
import { Clock, AlertTriangle, CheckCircle2, RotateCcw, Sparkles, Calendar } from 'lucide-react';
import { SKILL_DECAY_DATA } from '../../data/careerData';
import { useApp } from '../../context/AppContext';

export const SkillDecayView: React.FC = () => {
  const { userProfile, setActiveTab } = useApp();

  return (
    <div className="p-6 md:p-8 space-y-8 max-w-7xl mx-auto">
      {/* Banner */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 bg-gradient-to-r from-slate-900 via-rose-950 to-slate-900 p-6 md:p-8 rounded-3xl text-white shadow-xl">
        <div className="space-y-2">
          <div className="inline-flex items-center space-x-2 bg-rose-500/20 text-rose-300 border border-rose-500/30 px-3 py-1 rounded-full text-xs font-semibold">
            <Sparkles className="w-3.5 h-3.5" />
            <span>Spaced Repetition Engine</span>
          </div>
          <h1 className="text-2xl md:text-3xl font-extrabold tracking-tight">Skill Decay Prediction</h1>
          <p className="text-slate-300 text-sm max-w-2xl">
            Anticipate skill atrophy based on retention algorithms. Maintain high placement readiness by completing micro-refresher drills before decay risks spike.
          </p>
        </div>
      </div>

      {/* Decay Items List */}
      <div className="space-y-4">
        {SKILL_DECAY_DATA.map((item) => (
          <div key={item.id} className="glass-card p-6 rounded-3xl space-y-4 hover:shadow-md transition-all border border-slate-200/80">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
              <div className="space-y-1">
                <div className="flex items-center space-x-3">
                  <span className={`px-2.5 py-1 rounded-md text-[10px] font-extrabold uppercase ${
                    item.decayRisk === 'High' ? 'bg-rose-100 text-rose-700' :
                    item.decayRisk === 'Medium' ? 'bg-amber-100 text-amber-700' : 'bg-emerald-100 text-emerald-700'
                  }`}>
                    {item.decayRisk} Risk ({item.decayPercentage}% Atrophy)
                  </span>
                  <h3 className="font-bold text-slate-900 text-base">{item.skill}</h3>
                </div>
                <span className="text-xs text-slate-500 flex items-center space-x-1.5 pt-1">
                  <Clock className="w-3.5 h-3.5 text-slate-400" />
                  <span>Last practiced {item.lastPracticedDaysAgo} days ago</span>
                </span>
              </div>

              <button
                onClick={() => setActiveTab('roadmap')}
                className="px-4 py-2.5 bg-brand-primary hover:bg-brand-primary/90 text-white font-bold text-xs rounded-xl shadow-md flex items-center space-x-2 transition-all self-start sm:self-center"
              >
                <RotateCcw className="w-3.5 h-3.5" />
                <span>Schedule Refresher Drill</span>
              </button>
            </div>

            {/* Decay Progress Meter */}
            <div className="space-y-1.5">
              <div className="flex justify-between text-[11px] font-semibold text-slate-500">
                <span>Memory Retention Score</span>
                <span>{100 - item.decayPercentage}% Retained</span>
              </div>
              <div className="w-full bg-slate-100 h-2.5 rounded-full overflow-hidden">
                <div
                  className={`h-full transition-all ${
                    item.decayRisk === 'High' ? 'bg-rose-500' :
                    item.decayRisk === 'Medium' ? 'bg-amber-500' : 'bg-emerald-500'
                  }`}
                  style={{ width: `${100 - item.decayPercentage}%` }}
                />
              </div>
            </div>

            <div className="p-3 bg-slate-50 rounded-2xl text-xs font-medium text-slate-700 border border-slate-100 flex items-center justify-between">
              <span className="flex items-center space-x-2">
                <Calendar className="w-4 h-4 text-brand-primary" />
                <span><strong>Recommended Action:</strong> {item.suggestedAction}</span>
              </span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
