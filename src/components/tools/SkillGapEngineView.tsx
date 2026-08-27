import React from 'react';
import {
  Target,
  BarChart2,
  Sparkles,
  PieChart,
  ShieldAlert,
  Flame,
  Award,
  ChevronRight,
  TrendingUp,
  Activity,
} from 'lucide-react';
import { useApp } from '../../context/AppContext';

export const SkillGapEngineView: React.FC = () => {
  const { userProfile, score360, setActiveTab } = useApp();

  const assessmentWeight = 40;
  const projectWeight = 60;

  const assessmentScore = Math.round(score360.technical * 0.9);
  const projectScore = Math.round(score360.practical);
  const combinedScore = Math.round((assessmentScore * 0.4) + (projectScore * 0.6));
  const skillGapPercent = 100 - combinedScore;
  const confidenceLevel = 92;

  const skillHeatmap = [
    { skill: 'Data Structures & Algorithms', userVal: 72, reqVal: 90, gap: 18, weight: 'High', category: 'Cognitive' },
    { skill: 'REST API & Microservices', userVal: 88, reqVal: 85, gap: 0, weight: 'Met', category: 'Execution' },
    { skill: 'Database Optimization & SQL', userVal: 65, reqVal: 85, gap: 20, weight: 'High', category: 'Execution' },
    { skill: 'Docker & Containerization', userVal: 60, reqVal: 80, gap: 20, weight: 'Medium', category: 'DevOps' },
    { skill: 'System Design & Scalability', userVal: 55, reqVal: 85, gap: 30, weight: 'High', category: 'Architecture' },
    { skill: 'Security & Auth (JWT/OAuth)', userVal: 84, reqVal: 80, gap: 0, weight: 'Met', category: 'Security' },
  ];

  return (
    <div className="p-6 max-w-7xl mx-auto space-y-6">
      {/* Header Banner */}
      <div className="relative rounded-3xl bg-gradient-to-r from-orange-500 via-amber-500 to-brand-primary p-8 text-white shadow-xl overflow-hidden">
        <div className="absolute top-0 right-0 w-80 h-80 bg-white/10 rounded-full blur-3xl" />
        <div className="relative z-10 space-y-3">
          <div className="inline-flex items-center space-x-2 px-3 py-1 rounded-full bg-white/20 backdrop-blur-md text-xs font-bold uppercase tracking-wider">
            <BarChart2 className="w-3.5 h-3.5 text-amber-200" />
            <span>Module 3 – AI Skill Gap Engine</span>
          </div>
          <h1 className="text-3xl sm:text-4xl font-black tracking-tight">
            Evidence-Based Skill Gap Matrix
          </h1>
          <p className="text-amber-100 text-sm max-w-2xl leading-relaxed">
            Combining <strong>Practical Assessment Results (40%)</strong> and <strong>Project Analysis (60%)</strong> to calculate true missing capabilities against target role benchmarks for <span className="font-extrabold underline">{userProfile.dreamCareer}</span>.
          </p>
        </div>
      </div>

      {/* Radial KPI Summary Dashboard */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        {/* Radial Skill Gap % */}
        <div className="glass-card rounded-3xl p-6 border border-white/80 text-center space-y-3">
          <span className="text-xs font-bold text-slate-500 uppercase tracking-wider block">Skill Gap Percentage</span>
          <div className="relative w-28 h-28 mx-auto flex items-center justify-center">
            <svg className="w-full h-full transform -rotate-90" viewBox="0 0 36 36">
              <path
                className="text-slate-100"
                strokeWidth="3.8"
                stroke="currentColor"
                fill="none"
                d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831"
              />
              <path
                className="text-rose-500 stroke-current"
                strokeWidth="3.8"
                strokeDasharray={`${skillGapPercent}, 100`}
                strokeLinecap="round"
                fill="none"
                d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831"
              />
            </svg>
            <span className="absolute text-2xl font-black text-slate-900">{skillGapPercent}%</span>
          </div>
          <span className="text-[11px] font-semibold text-rose-600">3 Priority Gaps Identified</span>
        </div>

        {/* Career Readiness Score */}
        <div className="glass-card rounded-3xl p-6 border border-white/80 text-center space-y-3">
          <span className="text-xs font-bold text-slate-500 uppercase tracking-wider block">Career Readiness Score</span>
          <div className="relative w-28 h-28 mx-auto flex items-center justify-center">
            <svg className="w-full h-full transform -rotate-90" viewBox="0 0 36 36">
              <path
                className="text-slate-100"
                strokeWidth="3.8"
                stroke="currentColor"
                fill="none"
                d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831"
              />
              <path
                className="text-brand-primary stroke-current"
                strokeWidth="3.8"
                strokeDasharray={`${combinedScore}, 100`}
                strokeLinecap="round"
                fill="none"
                d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831"
              />
            </svg>
            <span className="absolute text-2xl font-black text-brand-primary">{combinedScore}%</span>
          </div>
          <span className="text-[11px] font-semibold text-emerald-600">Placement Ready Range</span>
        </div>

        {/* Assessment (40%) vs Project (60%) split */}
        <div className="glass-card rounded-3xl p-6 border border-white/80 space-y-4 col-span-1 md:col-span-2">
          <div className="flex items-center justify-between">
            <span className="text-xs font-bold text-slate-900 uppercase tracking-wider">Weighted Evidence Blend</span>
            <span className="text-xs font-bold text-purple-600">AI Confidence: {confidenceLevel}%</span>
          </div>

          <div className="space-y-3 pt-1">
            <div>
              <div className="flex justify-between text-xs font-bold text-slate-700 mb-1">
                <span>Practical Assessment Result (40% Weight)</span>
                <span>{assessmentScore}% Score</span>
              </div>
              <div className="w-full bg-slate-100 h-2 rounded-full overflow-hidden">
                <div className="bg-purple-600 h-full" style={{ width: `${assessmentScore}%` }} />
              </div>
            </div>

            <div>
              <div className="flex justify-between text-xs font-bold text-slate-700 mb-1">
                <span>Project Code Analysis (60% Weight)</span>
                <span>{projectScore}% Score</span>
              </div>
              <div className="w-full bg-slate-100 h-2 rounded-full overflow-hidden">
                <div className="bg-amber-500 h-full" style={{ width: `${projectScore}%` }} />
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Heatmap & Gap Breakdown */}
      <div className="glass-card rounded-3xl p-6 sm:p-8 border border-white/80 space-y-6">
        <div className="flex items-center justify-between">
          <div>
            <h3 className="font-bold text-slate-900 text-lg">Skill Gap Radial Heatmap</h3>
            <p className="text-xs text-slate-500">Compare your evidence score vs market requirements for {userProfile.dreamCareer}</p>
          </div>
          <button
            onClick={() => setActiveTab('roadmap')}
            className="px-4 py-2 rounded-xl bg-brand-primary/10 text-brand-primary hover:bg-brand-primary hover:text-white text-xs font-bold transition-all flex items-center space-x-1"
          >
            <span>Resolve Gaps in Roadmap</span>
            <ChevronRight className="w-4 h-4" />
          </button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {skillHeatmap.map((item) => {
            const isGap = item.gap > 0;
            return (
              <div
                key={item.skill}
                className={`p-5 rounded-2xl border transition-all space-y-3 ${
                  isGap ? 'bg-rose-50/40 border-rose-200/80' : 'bg-emerald-50/40 border-emerald-200/80'
                }`}
              >
                <div className="flex items-center justify-between">
                  <span className="text-[10px] font-extrabold uppercase text-slate-400">{item.category}</span>
                  <span className={`px-2.5 py-0.5 rounded-full text-[10px] font-bold ${
                    isGap ? 'bg-rose-100 text-rose-700' : 'bg-emerald-100 text-emerald-700'
                  }`}>
                    {isGap ? `${item.gap}% Gap` : 'Requirement Met'}
                  </span>
                </div>

                <h4 className="font-bold text-slate-900 text-xs">{item.skill}</h4>

                <div className="space-y-1 text-xs">
                  <div className="flex justify-between text-slate-600">
                    <span>User Evidence: <strong>{item.userVal}%</strong></span>
                    <span>Required: <strong>{item.reqVal}%</strong></span>
                  </div>
                  <div className="w-full bg-slate-200 h-2 rounded-full overflow-hidden">
                    <div
                      className={`h-full ${isGap ? 'bg-rose-500' : 'bg-emerald-500'}`}
                      style={{ width: `${item.userVal}%` }}
                    />
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};
