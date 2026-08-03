import React from 'react';
import { Target, CheckCircle2, AlertOctagon, TrendingUp, BookOpen, ShieldAlert } from 'lucide-react';
import { useApp } from '../../context/AppContext';
import { generateSkillGaps } from '../../utils/skillAnalyzer';

export const SkillGapMatrixView: React.FC = () => {
  const { userProfile } = useApp();
  const gaps = generateSkillGaps(userProfile);

  return (
    <div className="p-6 max-w-6xl mx-auto space-y-6">
      
      <div className="glass-card p-6 rounded-3xl border border-white/80 space-y-2">
        <div className="flex items-center space-x-2 text-brand-primary">
          <Target className="w-5 h-5" />
          <span className="text-xs font-bold uppercase tracking-wider">Skill Gap Matrix & Priority Audit</span>
        </div>
        <h1 className="text-2xl font-extrabold text-slate-900">
          Target Role Gap Analysis: <span className="gradient-text">{userProfile.dreamCareer}</span>
        </h1>
        <p className="text-xs text-slate-500">
          Comparing acquired proficiencies against target benchmarks for {userProfile.dreamCompany || 'industry placement'}.
        </p>
      </div>

      <div className="glass-card p-6 rounded-3xl border border-white/80 space-y-4">
        <div className="grid grid-cols-1 gap-4">
          {gaps.map((item) => (
            <div
              key={item.skill}
              className="p-5 rounded-2xl bg-white border border-slate-200 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 shadow-sm hover:shadow-md transition-all"
            >
              <div className="space-y-1.5 flex-1">
                <div className="flex items-center space-x-3">
                  <span className="font-bold text-slate-900 text-sm">{item.skill}</span>
                  <span className="px-2.5 py-0.5 rounded-full bg-slate-100 text-slate-600 text-[10px] font-bold">
                    {item.category}
                  </span>
                  <span className={`px-2.5 py-0.5 rounded-full text-[10px] font-extrabold uppercase ${
                    item.priority === 'High' ? 'bg-rose-100 text-rose-700' : 'bg-emerald-100 text-emerald-700'
                  }`}>
                    {item.priority} Priority
                  </span>
                </div>

                <div className="flex items-center space-x-4 text-xs text-slate-500 pt-1">
                  <span>Current Level: <strong className="text-slate-900">{item.userLevel}%</strong></span>
                  <span>Required Target: <strong className="text-brand-primary">{item.requiredLevel}%</strong></span>
                </div>

                <div className="w-full max-w-md bg-slate-100 h-2 rounded-full overflow-hidden">
                  <div
                    className={`h-full ${item.userLevel >= item.requiredLevel ? 'bg-emerald-500' : 'bg-brand-primary'}`}
                    style={{ width: `${item.userLevel}%` }}
                  />
                </div>
              </div>

              <div className="text-right space-y-2 w-full sm:w-auto">
                <span className="text-[11px] text-slate-500 block">{item.recommendedResource}</span>
                <button className="w-full sm:w-auto px-4 py-2 rounded-xl bg-brand-primary/10 text-brand-primary text-xs font-bold hover:bg-brand-primary hover:text-white transition-all">
                  Launch Recommended Masterclass
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>

    </div>
  );
};
