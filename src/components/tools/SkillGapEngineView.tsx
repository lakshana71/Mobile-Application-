import React, { useState } from 'react';
import {
  Target,
  BarChart2,
  Sparkles,
  Award,
  ChevronRight,
  HelpCircle,
  X,
  Layers,
  BrainCircuit,
  FileCode,
  CheckCircle2,
} from 'lucide-react';

import { useApp } from '../../context/AppContext';
import { buildSkillEvidenceGraph } from '../../services/assessment';
import { SkillEvidenceGraphNode } from '../../types';

export const SkillGapEngineView: React.FC = () => {
  const { userProfile, score360, setActiveTab, evaluatedSkills } = useApp();
  const [selectedGraphNode, setSelectedGraphNode] = useState<SkillEvidenceGraphNode | null>(null);

  const evidenceGraph = buildSkillEvidenceGraph(evaluatedSkills);

  const avgConfidence = Math.round(
    Object.values(evaluatedSkills).reduce((acc, curr) => acc + curr.confidence, 0) /
      Math.max(1, Object.keys(evaluatedSkills).length)
  );

  const gapItems = Object.values(evaluatedSkills).map((item) => {
    const reqVal = 85;
    const gap = Math.max(0, reqVal - item.level);
    return {
      skill: item.skill,
      userVal: item.level,
      reqVal,
      gap,
      confidence: item.confidence,
      category: item.level >= 75 ? 'Strong Capability' : item.level >= 50 ? 'Developing' : 'Priority Gap',
    };
  });

  const overallScore = Math.round(
    Object.values(evaluatedSkills).reduce((acc, curr) => acc + curr.level, 0) /
      Math.max(1, Object.keys(evaluatedSkills).length)
  );

  const skillGapPercent = 100 - overallScore;

  return (
    <div className="p-6 max-w-7xl mx-auto space-y-6">
      {/* Header Banner */}
      <div className="relative rounded-3xl bg-gradient-to-r from-orange-500 via-amber-500 to-brand-primary p-8 text-white shadow-xl overflow-hidden">
        <div className="absolute top-0 right-0 w-80 h-80 bg-white/10 rounded-full blur-3xl" />
        <div className="relative z-10 space-y-3">
          <div className="inline-flex items-center space-x-2 px-3 py-1 rounded-full bg-white/20 backdrop-blur-md text-xs font-bold uppercase tracking-wider">
            <BarChart2 className="w-3.5 h-3.5 text-amber-200" />
            <span>Module 3 – Multi-Source Skill Intelligence Engine</span>
          </div>
          <h1 className="text-3xl sm:text-4xl font-black tracking-tight">
            Evidence-Based Skill Gap Matrix
          </h1>
          <p className="text-amber-100 text-sm max-w-2xl leading-relaxed">
            Combining direct <strong>Adaptive Assessment Evidence</strong>, <strong>Project Analysis</strong>, <strong>GitHub Activity</strong>, and <strong>Coding Benchmarks</strong> for <span className="font-extrabold underline">{userProfile.dreamCareer}</span> at <span className="font-extrabold underline">{userProfile.dreamCompany || 'Company A'}</span>.
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
          <span className="text-[11px] font-semibold text-rose-600">
            {gapItems.filter((g) => g.gap > 15).length} Priority Gaps Identified
          </span>
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
                strokeDasharray={`${overallScore}, 100`}
                strokeLinecap="round"
                fill="none"
                d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831"
              />
            </svg>
            <span className="absolute text-2xl font-black text-brand-primary">{overallScore}%</span>
          </div>
          <span className="text-[11px] font-semibold text-emerald-600">Verified Evidence Index</span>
        </div>

        {/* Evidence Weight Split */}
        <div className="glass-card rounded-3xl p-6 border border-white/80 space-y-4 col-span-1 md:col-span-2">
          <div className="flex items-center justify-between">
            <span className="text-xs font-bold text-slate-900 uppercase tracking-wider">Multi-Source Intelligence Weighting</span>
            <span className="text-xs font-bold text-purple-600">AI Average Confidence: {avgConfidence}%</span>
          </div>

          <div className="grid grid-cols-2 gap-3 text-xs pt-1">
            <div className="p-3 rounded-2xl bg-purple-50 border border-purple-100">
              <span className="text-[10px] font-bold text-purple-700 uppercase block">Adaptive Assessment (35%)</span>
              <span className="text-sm font-black text-purple-900">Direct Question Evaluation</span>
            </div>
            <div className="p-3 rounded-2xl bg-amber-50 border border-amber-100">
              <span className="text-[10px] font-bold text-amber-700 uppercase block">Project Code Scans (25%)</span>
              <span className="text-sm font-black text-amber-900">AST & Vulnerability Audit</span>
            </div>
            <div className="p-3 rounded-2xl bg-indigo-50 border border-indigo-100">
              <span className="text-[10px] font-bold text-indigo-700 uppercase block">GitHub Portfolio (15%)</span>
              <span className="text-sm font-black text-indigo-900">Commit & Repo Velocity</span>
            </div>
            <div className="p-3 rounded-2xl bg-emerald-50 border border-emerald-100">
              <span className="text-[10px] font-bold text-emerald-700 uppercase block">Self-Reported (15%)</span>
              <span className="text-sm font-black text-emerald-900">Onboarding Declarations</span>
            </div>
          </div>
        </div>
      </div>

      {/* Heatmap & Interactive Evidence Graph Cards */}
      <div className="glass-card rounded-3xl p-6 sm:p-8 border border-white/80 space-y-6">
        <div className="flex items-center justify-between">
          <div>
            <h3 className="font-bold text-slate-900 text-lg">Multi-Source Skill Matrix</h3>
            <p className="text-xs text-slate-500">Click "Why this score?" on any skill to view its underlying Evidence Graph.</p>
          </div>
          <button
            onClick={() => setActiveTab('practical-assessment')}
            className="px-4 py-2 rounded-xl bg-purple-600 text-white hover:bg-purple-700 text-xs font-bold transition-all flex items-center space-x-1 shadow-md"
          >
            <span>Take Adaptive Assessment</span>
            <ChevronRight className="w-4 h-4" />
          </button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {gapItems.map((item) => {
            const isGap = item.gap > 0;
            const node = evidenceGraph.find((n) => n.skill === item.skill);

            return (
              <div
                key={item.skill}
                className={`p-5 rounded-2xl border transition-all space-y-3 ${
                  isGap ? 'bg-rose-50/40 border-rose-200/80' : 'bg-emerald-50/40 border-emerald-200/80'
                }`}
              >
                <div className="flex items-center justify-between">
                  <span className="text-[10px] font-extrabold uppercase text-slate-500">{item.category}</span>
                  <span className="text-[10px] font-bold text-purple-600 bg-purple-100 px-2 py-0.5 rounded-full">
                    {item.confidence}% Conf.
                  </span>
                </div>

                <h4 className="font-bold text-slate-900 text-sm">{item.skill}</h4>

                <div className="space-y-1 text-xs">
                  <div className="flex justify-between text-slate-600">
                    <span>Evidence Score: <strong className="text-slate-900">{item.userVal}%</strong></span>
                    <span>Target: <strong>{item.reqVal}%</strong></span>
                  </div>
                  <div className="w-full bg-slate-200 h-2 rounded-full overflow-hidden">
                    <div
                      className={`h-full ${isGap ? 'bg-rose-500' : 'bg-emerald-500'}`}
                      style={{ width: `${item.userVal}%` }}
                    />
                  </div>
                </div>

                {node && (
                  <button
                    onClick={() => setSelectedGraphNode(node)}
                    className="w-full pt-2 text-[11px] font-bold text-brand-primary hover:underline flex items-center justify-center space-x-1 border-t border-slate-200/60"
                  >
                    <HelpCircle className="w-3.5 h-3.5" />
                    <span>Why did the system give me this score?</span>
                  </button>
                )}
              </div>
            );
          })}
        </div>
      </div>

      {/* Interactive Evidence Graph Modal */}
      {selectedGraphNode && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-900/60 backdrop-blur-sm p-4 animate-in fade-in">
          <div className="glass-card bg-white rounded-3xl p-6 sm:p-8 max-w-2xl w-full border border-slate-200 shadow-2xl space-y-6">
            <div className="flex items-center justify-between border-b border-slate-200 pb-4">
              <div>
                <span className="text-[10px] font-extrabold uppercase text-purple-600 tracking-wider">Skill Evidence Graph</span>
                <h3 className="text-xl font-black text-slate-900">{selectedGraphNode.skill} Breakdown</h3>
              </div>
              <button
                onClick={() => setSelectedGraphNode(null)}
                className="p-2 rounded-full hover:bg-slate-100 text-slate-500"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <div className="flex items-center justify-between p-4 rounded-2xl bg-purple-50 border border-purple-100">
              <div>
                <span className="text-xs text-purple-700 font-bold block">Composite Evidence Score</span>
                <span className="text-3xl font-black text-purple-900">{selectedGraphNode.overallScore}%</span>
              </div>
              <div>
                <span className="text-xs text-indigo-700 font-bold block">AI Evidence Confidence</span>
                <span className="text-3xl font-black text-indigo-900">{selectedGraphNode.confidence}%</span>
              </div>
            </div>

            <div className="space-y-3">
              <span className="text-xs font-bold text-slate-700 uppercase tracking-wider block">Evidence Sources Audit:</span>
              <div className="space-y-2.5 max-h-64 overflow-y-auto pr-1">
                {selectedGraphNode.sources.map((src) => (
                  <div key={src.name} className="p-3 rounded-2xl bg-slate-50 border border-slate-200 space-y-1 text-xs">
                    <div className="flex justify-between font-bold text-slate-900">
                      <span>{src.name} ({src.weight}% Weight)</span>
                      <span className="text-brand-primary">{src.score}% Score</span>
                    </div>
                    <p className="text-slate-500 text-[11px]">{src.evidenceDetails}</p>
                  </div>
                ))}
              </div>
            </div>

            <div className="pt-2 flex justify-end">
              <button
                onClick={() => setSelectedGraphNode(null)}
                className="px-5 py-2.5 rounded-xl bg-slate-900 text-white text-xs font-bold hover:bg-slate-800"
              >
                Close Audit View
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
