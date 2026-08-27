import React, { useState } from 'react';
import {
  UserPlus,
  Target,
  FileCode,
  UploadCloud,
  Cpu,
  BarChart2,
  Dna,
  Workflow,
  BrainCircuit,
  Zap,
  RotateCw,
  Sparkles,
} from 'lucide-react';
import { useApp } from '../../context/AppContext';
import { NavigationTab } from '../../types';

interface StepItem {
  id: number;
  title: string;
  subtitle: string;
  icon: React.ReactNode;
  tab?: NavigationTab;
  color: string;
}

export const CircularWorkflowWidget: React.FC = () => {
  const { setActiveTab } = useApp();
  const [activeNode, setActiveNode] = useState<number>(3);

  const steps: StepItem[] = [
    {
      id: 1,
      title: 'Student Registration',
      subtitle: 'Profile setup & baseline signals',
      icon: <UserPlus className="w-4 h-4" />,
      tab: 'profile',
      color: 'from-blue-500 to-indigo-500',
    },
    {
      id: 2,
      title: 'Choose Career Goal',
      subtitle: 'Target role benchmark matching',
      icon: <Target className="w-4 h-4" />,
      tab: 'career-goals',
      color: 'from-indigo-500 to-purple-500',
    },
    {
      id: 3,
      title: 'Practical Assessment',
      subtitle: 'Coding, debugging, scenarios & quizzes',
      icon: <FileCode className="w-4 h-4" />,
      tab: 'practical-assessment',
      color: 'from-purple-500 to-pink-500',
    },
    {
      id: 4,
      title: 'Project Upload',
      subtitle: 'GitHub, ZIP, or Live URL submission',
      icon: <UploadCloud className="w-4 h-4" />,
      tab: 'project-analysis',
      color: 'from-pink-500 to-rose-500',
    },
    {
      id: 5,
      title: 'AI Project Analysis',
      subtitle: '10-point code & security audit',
      icon: <Cpu className="w-4 h-4" />,
      tab: 'project-analysis',
      color: 'from-rose-500 to-orange-500',
    },
    {
      id: 6,
      title: 'AI Skill Gap Engine',
      subtitle: '40% Assessment + 60% Project matrix',
      icon: <BarChart2 className="w-4 h-4" />,
      tab: 'skill-gap-engine',
      color: 'from-orange-500 to-amber-500',
    },
    {
      id: 7,
      title: 'Skill Genome AI',
      subtitle: 'DNA & neural trait map evolution',
      icon: <Dna className="w-4 h-4" />,
      tab: 'skill-genome',
      color: 'from-amber-500 to-emerald-500',
    },
    {
      id: 8,
      title: 'Skill Evolution Engine',
      subtitle: 'Timeline: Emerging → Advanced',
      icon: <Workflow className="w-4 h-4" />,
      tab: 'skill-evolution',
      color: 'from-emerald-500 to-teal-500',
    },
    {
      id: 9,
      title: 'AI Shadow Mentor',
      subtitle: 'Conversational insights & guidance',
      icon: <BrainCircuit className="w-4 h-4" />,
      tab: 'ai-shadow-mentor',
      color: 'from-teal-500 to-cyan-500',
    },
    {
      id: 10,
      title: 'Personalized Challenges',
      subtitle: 'Adaptive drills & continuous loop',
      icon: <Zap className="w-4 h-4" />,
      tab: 'roadmap',
      color: 'from-cyan-500 to-blue-500',
    },
  ];

  const total = steps.length;
  const radius = 160;

  return (
    <div className="glass-card rounded-3xl p-6 sm:p-8 border border-white/80 space-y-6 shadow-xl relative overflow-hidden">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <div className="inline-flex items-center space-x-2 px-3 py-1 rounded-full bg-brand-primary/10 text-brand-primary text-xs font-bold uppercase tracking-wider mb-2">
            <RotateCw className="w-3.5 h-3.5 animate-spin" style={{ animationDuration: '10s' }} />
            <span>360° Continuous Evolution Journey</span>
          </div>
          <h2 className="text-xl sm:text-2xl font-black text-slate-900 tracking-tight">
            SkillSphere AI Workflow
          </h2>
          <p className="text-xs text-slate-500 max-w-xl">
            Evidence-based evaluation loop: your Digital Skill Twin evolves with every assessment, project submission, and practice challenge.
          </p>
        </div>

        <div className="flex items-center space-x-2 bg-gradient-to-r from-brand-primary/10 to-brand-accent/10 px-4 py-2.5 rounded-2xl border border-brand-primary/20">
          <Sparkles className="w-4 h-4 text-brand-primary" />
          <span className="text-xs font-bold text-slate-800">Loop Active</span>
        </div>
      </div>

      {/* 360° Circular Infographic Visualization */}
      <div className="relative py-4 flex items-center justify-center min-h-[460px]">
        {/* SVG background loop circle */}
        <svg className="absolute w-[380px] h-[380px] sm:w-[440px] sm:h-[440px] pointer-events-none" viewBox="0 0 440 440">
          <defs>
            <linearGradient id="circleGrad" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#3B82F6" stopOpacity="0.4" />
              <stop offset="50%" stopColor="#8B5CF6" stopOpacity="0.6" />
              <stop offset="100%" stopColor="#06B6D4" stopOpacity="0.4" />
            </linearGradient>
          </defs>
          <circle
            cx="220"
            cy="220"
            r={radius}
            fill="none"
            stroke="url(#circleGrad)"
            strokeWidth="3"
            strokeDasharray="6 6"
            className="animate-pulse"
          />
        </svg>

        {/* Center Digital Skill Twin Avatar Hub */}
        <div className="relative z-10 w-36 h-36 sm:w-44 sm:h-44 rounded-full bg-gradient-to-br from-slate-900 via-indigo-950 to-slate-900 border-4 border-brand-accent/40 shadow-glow-primary p-4 text-center flex flex-col items-center justify-center text-white space-y-1">
          <div className="w-10 h-10 rounded-full bg-brand-accent/20 flex items-center justify-center border border-brand-accent/40">
            <BrainCircuit className="w-6 h-6 text-brand-accent animate-pulse" />
          </div>
          <span className="text-[11px] font-black tracking-wider uppercase text-brand-accent">Digital Skill Twin</span>
          <span className="text-[9px] text-slate-300 leading-tight">Continuous Evolution</span>
          <div className="mt-1 px-2 py-0.5 rounded-full bg-emerald-500/20 text-emerald-300 border border-emerald-500/30 text-[8px] font-extrabold uppercase">
            360° Synced
          </div>
        </div>

        {/* Outer Circular Nodes */}
        {steps.map((step, index) => {
          const angle = (index / total) * 2 * Math.PI - Math.PI / 2;
          const scaleRadius = 180;
          const x = scaleRadius * Math.cos(angle);
          const y = scaleRadius * Math.sin(angle);
          const isSelected = activeNode === step.id;

          return (
            <div
              key={step.id}
              style={{
                transform: `translate(${x}px, ${y}px)`,
              }}
              className="absolute z-20 transition-all duration-300"
            >
              <button
                onClick={() => {
                  setActiveNode(step.id);
                  if (step.tab) setActiveTab(step.tab);
                }}
                title={step.title}
                className={`group relative flex items-center justify-center w-11 h-11 sm:w-12 sm:h-12 rounded-full border-2 transition-all shadow-md ${
                  isSelected
                    ? 'bg-slate-900 border-brand-accent ring-4 ring-brand-accent/30 scale-110 text-white shadow-xl'
                    : 'bg-white border-slate-200 hover:border-brand-primary text-slate-700 hover:scale-105'
                }`}
              >
                <div className={`w-8 h-8 rounded-full bg-gradient-to-tr ${step.color} text-white flex items-center justify-center shadow-sm`}>
                  {step.icon}
                </div>

                {/* Node Label */}
                <div className={`absolute top-full mt-2 w-32 sm:w-36 text-center transition-all ${isSelected ? 'opacity-100 scale-100' : 'opacity-80 group-hover:opacity-100'}`}>
                  <span className="block text-[10px] sm:text-xs font-bold text-slate-900 leading-tight">
                    {step.id}. {step.title}
                  </span>
                  <span className="block text-[9px] text-slate-500 line-clamp-1">{step.subtitle}</span>
                </div>
              </button>
            </div>
          );
        })}
      </div>

      {/* Horizontal Step Cards Quick Launcher */}
      <div className="pt-4 border-t border-slate-200/80">
        <div className="grid grid-cols-2 sm:grid-cols-5 gap-3">
          {steps.map((step) => (
            <button
              key={step.id}
              onClick={() => {
                setActiveNode(step.id);
                if (step.tab) setActiveTab(step.tab);
              }}
              className={`p-3 rounded-2xl border text-left transition-all space-y-1 ${
                activeNode === step.id
                  ? 'bg-gradient-to-br from-brand-primary to-indigo-600 text-white border-brand-primary shadow-md'
                  : 'bg-slate-50 hover:bg-white border-slate-200 hover:border-brand-primary/40 text-slate-800'
              }`}
            >
              <div className="flex items-center justify-between text-[10px] font-bold opacity-80">
                <span>STEP {step.id}</span>
                {step.tab && <span className="uppercase text-[8px] tracking-wider px-1 py-0.2 bg-white/20 rounded">Go</span>}
              </div>
              <div className="font-bold text-xs line-clamp-1">{step.title}</div>
              <div className={`text-[10px] line-clamp-1 ${activeNode === step.id ? 'text-indigo-100' : 'text-slate-500'}`}>
                {step.subtitle}
              </div>
            </button>
          ))}
        </div>
      </div>
    </div>
  );
};
