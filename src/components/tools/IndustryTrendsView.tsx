import React from 'react';
import { TrendingUp, Building2, DollarSign, Award, ArrowUpRight, Sparkles } from 'lucide-react';
import { INDUSTRY_TRENDS_DATA } from '../../data/careerData';
import { useApp } from '../../context/AppContext';

export const IndustryTrendsView: React.FC = () => {
  const { userProfile } = useApp();

  return (
    <div className="p-6 md:p-8 space-y-8 max-w-7xl mx-auto">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 bg-gradient-to-r from-slate-900 via-indigo-950 to-slate-900 p-6 md:p-8 rounded-3xl text-white shadow-xl">
        <div className="space-y-2">
          <div className="inline-flex items-center space-x-2 bg-indigo-500/20 text-indigo-300 border border-indigo-500/30 px-3 py-1 rounded-full text-xs font-semibold">
            <Sparkles className="w-3.5 h-3.5" />
            <span>Market Intelligence Radar</span>
          </div>
          <h1 className="text-2xl md:text-3xl font-extrabold tracking-tight">Industry Trend Analyzer</h1>
          <p className="text-slate-300 text-sm max-w-2xl">
            Real-time market analytics on high-growth technologies, emerging frameworks, salary benchmarks, and hiring company demands for <span className="text-cyan-400 font-bold">{userProfile.dreamCareer}</span>.
          </p>
        </div>
      </div>

      {/* Trends Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {INDUSTRY_TRENDS_DATA.map((trend) => (
          <div key={trend.id} className="glass-card p-6 rounded-3xl space-y-5 hover:shadow-xl transition-all">
            <div className="flex items-start justify-between">
              <div className="space-y-1">
                <span className="text-[10px] font-bold uppercase tracking-wider text-brand-primary bg-brand-primary/10 px-2.5 py-1 rounded-md">
                  {trend.category}
                </span>
                <h3 className="text-lg font-bold text-slate-900 pt-1">{trend.title}</h3>
              </div>
              <div className="flex items-center space-x-1 text-emerald-600 bg-emerald-50 px-2.5 py-1 rounded-xl text-xs font-bold border border-emerald-100">
                <TrendingUp className="w-3.5 h-3.5" />
                <span>{trend.growthRate} YoY</span>
              </div>
            </div>

            <p className="text-xs text-slate-600 leading-relaxed">{trend.description}</p>

            <div className="grid grid-cols-2 gap-3 pt-2 text-xs">
              <div className="p-3 bg-slate-50 rounded-2xl border border-slate-100 flex items-center space-x-2.5">
                <DollarSign className="w-4 h-4 text-emerald-500" />
                <div>
                  <span className="text-[10px] text-slate-400 font-semibold block">Avg Compensation</span>
                  <span className="font-bold text-slate-900">{trend.avgSalary}</span>
                </div>
              </div>

              <div className="p-3 bg-slate-50 rounded-2xl border border-slate-100 flex items-center space-x-2.5">
                <Award className="w-4 h-4 text-indigo-500" />
                <div>
                  <span className="text-[10px] text-slate-400 font-semibold block">Demand Index</span>
                  <span className="font-bold text-indigo-600">{trend.demandScore} / 100</span>
                </div>
              </div>
            </div>

            {/* Hiring Companies */}
            <div className="space-y-2 pt-1">
              <span className="text-[10px] font-bold uppercase tracking-wider text-slate-400 flex items-center space-x-1">
                <Building2 className="w-3 h-3" />
                <span>Actively Hiring Employers</span>
              </span>
              <div className="flex flex-wrap gap-2">
                {trend.topCompanies.map((comp) => (
                  <span key={comp} className="px-2.5 py-1 bg-slate-100 text-slate-700 font-bold text-[11px] rounded-lg">
                    {comp}
                  </span>
                ))}
              </div>
            </div>

            {/* Skills */}
            <div className="space-y-2">
              <span className="text-[10px] font-bold uppercase tracking-wider text-slate-400 block">Required Skillset</span>
              <div className="flex flex-wrap gap-1.5">
                {trend.requiredSkills.map((sk) => (
                  <span key={sk} className="px-2.5 py-0.5 bg-indigo-50 text-indigo-700 font-medium text-[11px] rounded-md">
                    {sk}
                  </span>
                ))}
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
