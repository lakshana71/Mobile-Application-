import React, { useState } from 'react';
import { Workflow, Sparkles, AlertOctagon, TrendingUp, CheckCircle2, Clock, Zap, RefreshCw } from 'lucide-react';
import { useApp } from '../../context/AppContext';
import { SkillEvolutionStage } from '../../types';

interface SkillEvolutionCard {
  id: string;
  skill: string;
  category: string;
  stage: SkillEvolutionStage;
  confidence: number;
  lastUpdated: string;
  trajectory: string;
  nextMilestone: string;
}

const STAGES: { stage: SkillEvolutionStage; icon: string; badgeColor: string }[] = [
  { stage: 'Emerging', icon: '🌱', badgeColor: 'bg-blue-100 text-blue-800 border-blue-200' },
  { stage: 'Growing', icon: '📈', badgeColor: 'bg-teal-100 text-teal-800 border-teal-200' },
  { stage: 'Strong', icon: '💪', badgeColor: 'bg-emerald-100 text-emerald-800 border-emerald-200' },
  { stage: 'Declining', icon: '📉', badgeColor: 'bg-amber-100 text-amber-800 border-amber-200' },
  { stage: 'Refresh Needed', icon: '⚠', badgeColor: 'bg-rose-100 text-rose-800 border-rose-200' },
  { stage: 'Evolved', icon: '🚀', badgeColor: 'bg-purple-100 text-purple-800 border-purple-200' },
];

export const SkillEvolutionEngineView: React.FC = () => {
  const { userProfile, setActiveTab } = useApp();
  const [filterStage, setFilterStage] = useState<string>('All');

  const skills: SkillEvolutionCard[] = [
    {
      id: 'evo-1',
      skill: 'Full-Stack REST APIs',
      category: 'Backend Execution',
      stage: 'Evolved',
      confidence: 94,
      lastUpdated: 'Completed Practical Assessment #1',
      trajectory: '+22% growth after JWT & Express audit',
      nextMilestone: 'Next.js 15 Server Actions & App Router',
    },
    {
      id: 'evo-2',
      skill: 'React 19 & State Management',
      category: 'Frontend Execution',
      stage: 'Strong',
      confidence: 88,
      lastUpdated: 'Project Repository Analysis',
      trajectory: '+15% boost from component modularity',
      nextMilestone: 'Zustand & Micro-Frontend architecture',
    },
    {
      id: 'evo-3',
      skill: 'Data Structures & Algorithms',
      category: 'Cognitive Problem Solving',
      stage: 'Growing',
      confidence: 76,
      lastUpdated: '3 days ago',
      trajectory: '+9% steady progress',
      nextMilestone: 'Graph Traversal & Dynamic Programming',
    },
    {
      id: 'evo-4',
      skill: 'System Design & Distributed Caching',
      category: 'Architecture',
      stage: 'Emerging',
      confidence: 58,
      lastUpdated: 'Assessment Simulation',
      trajectory: 'Initial baseline recorded',
      nextMilestone: 'Build Redis Cache & Load Balancer Project',
    },
    {
      id: 'evo-5',
      skill: 'Cloud Security & IAM Policy',
      category: 'AppSec',
      stage: 'Refresh Needed',
      confidence: 48,
      lastUpdated: '14 days ago',
      trajectory: 'Memory loss detected (~18% decay)',
      nextMilestone: 'Complete 15-min Refresher Quiz',
    },
  ];

  const filteredSkills = filterStage === 'All' ? skills : skills.filter((s) => s.stage === filterStage);

  return (
    <div className="p-6 max-w-7xl mx-auto space-y-6">
      {/* Header Banner */}
      <div className="relative rounded-3xl bg-gradient-to-r from-emerald-600 via-teal-600 to-indigo-600 p-8 text-white shadow-xl overflow-hidden">
        <div className="absolute top-0 right-0 w-80 h-80 bg-white/10 rounded-full blur-3xl" />
        <div className="relative z-10 space-y-3">
          <div className="inline-flex items-center space-x-2 px-3 py-1 rounded-full bg-white/20 backdrop-blur-md text-xs font-bold uppercase tracking-wider">
            <Workflow className="w-3.5 h-3.5 text-emerald-200" />
            <span>Module 5 – Skill Evolution Engine</span>
          </div>
          <h1 className="text-3xl sm:text-4xl font-black tracking-tight">
            Interactive Skill Lifecycle Timeline
          </h1>
          <p className="text-emerald-100 text-sm max-w-2xl leading-relaxed">
            Skills are not static metrics. They evolve through 6 continuous stages automatically updated whenever you complete practical assessments or upload code improvements.
          </p>
        </div>
      </div>

      {/* 6 Stage Lifecycle Pipeline Diagram */}
      <div className="glass-card rounded-3xl p-6 border border-white/80 space-y-4">
        <h3 className="font-bold text-slate-900 text-base">The 6 Stages of Skill Evolution</h3>
        <div className="grid grid-cols-2 sm:grid-cols-6 gap-3">
          {STAGES.map((s) => (
            <button
              key={s.stage}
              onClick={() => setFilterStage(filterStage === s.stage ? 'All' : s.stage)}
              className={`p-3 rounded-2xl border text-center transition-all space-y-1 ${
                filterStage === s.stage
                  ? 'bg-slate-900 text-white border-slate-900 shadow-md scale-105'
                  : 'bg-white hover:bg-slate-50 border-slate-200 text-slate-700'
              }`}
            >
              <div className="text-2xl">{s.icon}</div>
              <div className="text-xs font-black">{s.stage}</div>
            </button>
          ))}
        </div>
      </div>

      {/* Interactive Evolution Timeline List */}
      <div className="glass-card rounded-3xl p-6 sm:p-8 border border-white/80 space-y-6">
        <div className="flex items-center justify-between">
          <h3 className="font-bold text-slate-900 text-lg">Skill Growth Trajectory</h3>
          <span className="text-xs text-slate-500 font-medium">Showing {filteredSkills.length} Skills</span>
        </div>

        <div className="space-y-4">
          {filteredSkills.map((item) => {
            const stageConfig = STAGES.find((s) => s.stage === item.stage) || STAGES[0];
            return (
              <div
                key={item.id}
                className="p-5 rounded-2xl bg-white border border-slate-200/80 shadow-sm hover:shadow-md transition-all flex flex-col md:flex-row md:items-center justify-between gap-4"
              >
                <div className="space-y-1.5 max-w-xl">
                  <div className="flex items-center space-x-3">
                    <span className={`px-3 py-1 rounded-full text-xs font-extrabold border ${stageConfig.badgeColor}`}>
                      {stageConfig.icon} {item.stage}
                    </span>
                    <span className="text-[10px] uppercase tracking-wider font-extrabold text-slate-400">
                      {item.category}
                    </span>
                  </div>

                  <h4 className="text-base font-black text-slate-900">{item.skill}</h4>

                  <p className="text-xs text-slate-600 flex items-center space-x-2">
                    <Clock className="w-3.5 h-3.5 text-slate-400" />
                    <span>{item.lastUpdated}</span>
                    <span className="text-slate-300">•</span>
                    <span className="text-emerald-600 font-bold">{item.trajectory}</span>
                  </p>

                  <p className="text-xs text-brand-primary font-semibold">
                    Target Milestone: {item.nextMilestone}
                  </p>
                </div>

                <div className="flex items-center space-x-6 min-w-[200px] justify-between md:justify-end">
                  <div>
                    <span className="text-[10px] uppercase font-bold text-slate-400 block text-right">Confidence</span>
                    <span className="text-2xl font-black text-slate-900">{item.confidence}%</span>
                  </div>

                  <button
                    onClick={() => setActiveTab('practical-assessment')}
                    className="px-4 py-2 rounded-xl bg-brand-primary text-white text-xs font-bold shadow hover:bg-indigo-600 transition-all flex items-center space-x-1"
                  >
                    <Zap className="w-3.5 h-3.5" />
                    <span>Evolve Skill</span>
                  </button>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};
