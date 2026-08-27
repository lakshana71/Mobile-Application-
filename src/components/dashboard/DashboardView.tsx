import React from 'react';
import {
  Sparkles,
  Flame,
  Clock,
  ArrowRight,
  BrainCircuit,
  FileCode,
  UploadCloud,
  BarChart2,
  Dna,
  Workflow,
  Bot,
  Award,
  ChevronRight,
  Activity,
  Target,
  Zap,
} from 'lucide-react';
import { useApp } from '../../context/AppContext';
import { CircularWorkflowWidget } from './CircularWorkflowWidget';
import { buildDigitalTwin } from '../../utils/digitalTwin';

export const DashboardView: React.FC = () => {
  const { userProfile, score360, roadmap, setActiveTab } = useApp();
  const digitalTwin = buildDigitalTwin(userProfile, roadmap, score360);

  return (
    <div className="p-6 max-w-7xl mx-auto space-y-8">
      {/* 1. Top Welcome Banner with Central Digital Skill Twin Avatar Overview */}
      <div className="relative rounded-3xl bg-gradient-to-r from-slate-900 via-indigo-950 to-slate-900 p-8 text-white shadow-2xl overflow-hidden border border-brand-primary/30">
        <div className="absolute top-0 right-0 w-96 h-96 bg-brand-primary/20 rounded-full blur-3xl pointer-events-none" />

        <div className="relative z-10 grid grid-cols-1 lg:grid-cols-3 gap-6 items-center">
          <div className="lg:col-span-2 space-y-3">
            <div className="inline-flex items-center space-x-2 px-3.5 py-1 rounded-full bg-white/10 backdrop-blur-md border border-white/20 text-xs font-bold text-white">
              <Sparkles className="w-3.5 h-3.5 text-brand-accent animate-spin" style={{ animationDuration: '6s' }} />
              <span>SkillSphere AI Digital Skill Twin Active</span>
            </div>

            <h1 className="text-3xl sm:text-4xl font-black tracking-tight">
              Welcome back, {userProfile.name}! 👋
            </h1>

            <p className="text-slate-300 text-sm max-w-xl leading-relaxed">
              Targeting <span className="font-bold text-brand-accent underline">{userProfile.dreamCareer}</span> at <span className="font-bold">{userProfile.dreamCompany || 'Top Tech'}</span>. Your Digital Skill Twin continuously evolves through practical assessments, code audits, and AI mentoring.
            </p>

            <div className="pt-2 flex flex-wrap items-center gap-3 text-xs">
              <div className="flex items-center space-x-1.5 bg-white/10 px-3 py-1.5 rounded-xl border border-white/10">
                <Flame className="w-4 h-4 text-amber-300" />
                <span>{userProfile.streakDays} Days Learning Streak</span>
              </div>
              <div className="flex items-center space-x-1.5 bg-white/10 px-3 py-1.5 rounded-xl border border-white/10">
                <Clock className="w-4 h-4 text-cyan-300" />
                <span>Weekly Goal: {userProfile.weeklyHours} hrs ({userProfile.timeline})</span>
              </div>
            </div>
          </div>

          {/* Central Interactive Digital Skill Twin Avatar Widget */}
          <div className="glass-card-dark p-6 rounded-3xl border border-brand-accent/40 text-center space-y-3 shadow-glow-primary">
            <div className="relative w-20 h-20 mx-auto rounded-full bg-gradient-to-tr from-brand-primary via-brand-secondary to-brand-accent p-1 shadow-lg">
              <img
                src={userProfile.avatarUrl}
                alt="Twin Avatar"
                className="w-full h-full rounded-full object-cover border-2 border-slate-900"
              />
              <div className="absolute -bottom-1 -right-1 w-6 h-6 rounded-full bg-emerald-500 border-2 border-slate-900 flex items-center justify-center">
                <BrainCircuit className="w-3.5 h-3.5 text-white" />
              </div>
            </div>

            <div>
              <span className="text-[10px] uppercase tracking-widest text-slate-400 font-bold block">Career Readiness Score</span>
              <div className="text-4xl font-black text-brand-accent">{digitalTwin.readiness}%</div>
            </div>

            <button
              onClick={() => setActiveTab('digital-twin')}
              className="w-full py-2.5 px-4 rounded-xl bg-gradient-to-r from-brand-primary to-brand-secondary text-white text-xs font-bold shadow-md hover:opacity-95 transition-all flex items-center justify-center space-x-1.5"
            >
              <span>Explore Digital Twin</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </button>
          </div>
        </div>
      </div>

      {/* 2. Main Workflow – 360° Circular Infographic */}
      <CircularWorkflowWidget />

      {/* 3. Grid of Core Skill Modules Overview Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        
        {/* Assessment Summary */}
        <div className="glass-card rounded-3xl p-6 border border-white/80 space-y-4 shadow-sm hover:shadow-md transition-all">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-3">
              <div className="w-10 h-10 rounded-2xl bg-purple-500/10 text-purple-600 flex items-center justify-center font-bold">
                <FileCode className="w-5 h-5" />
              </div>
              <div>
                <h3 className="font-bold text-slate-900 text-base">Module 1: Practical Assessment</h3>
                <span className="text-xs text-slate-400">Hands-on evaluation</span>
              </div>
            </div>
            <span className="text-lg font-black text-purple-600">88%</span>
          </div>
          <p className="text-xs text-slate-600 leading-relaxed">
            Evaluates coding, debugging, scenario simulations, and short quizzes.
          </p>
          <button
            onClick={() => setActiveTab('practical-assessment')}
            className="w-full py-2.5 rounded-xl bg-purple-50 hover:bg-purple-100 text-purple-700 text-xs font-bold transition-all flex items-center justify-center space-x-1"
          >
            <span>Take Practical Assessment</span>
            <ChevronRight className="w-4 h-4" />
          </button>
        </div>

        {/* Project Analysis Report */}
        <div className="glass-card rounded-3xl p-6 border border-white/80 space-y-4 shadow-sm hover:shadow-md transition-all">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-3">
              <div className="w-10 h-10 rounded-2xl bg-blue-500/10 text-blue-600 flex items-center justify-center font-bold">
                <UploadCloud className="w-5 h-5" />
              </div>
              <div>
                <h3 className="font-bold text-slate-900 text-base">Module 2: Project Analysis</h3>
                <span className="text-xs text-slate-400">10-Point code audit</span>
              </div>
            </div>
            <span className="text-lg font-black text-blue-600">89%</span>
          </div>
          <p className="text-xs text-slate-600 leading-relaxed">
            GitHub, ZIP, or Live URL code quality, security practices & structure audit.
          </p>
          <button
            onClick={() => setActiveTab('project-analysis')}
            className="w-full py-2.5 rounded-xl bg-blue-50 hover:bg-blue-100 text-blue-700 text-xs font-bold transition-all flex items-center justify-center space-x-1"
          >
            <span>Upload & Audit Project</span>
            <ChevronRight className="w-4 h-4" />
          </button>
        </div>

        {/* AI Skill Gap Overview */}
        <div className="glass-card rounded-3xl p-6 border border-white/80 space-y-4 shadow-sm hover:shadow-md transition-all">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-3">
              <div className="w-10 h-10 rounded-2xl bg-amber-500/10 text-amber-600 flex items-center justify-center font-bold">
                <BarChart2 className="w-5 h-5" />
              </div>
              <div>
                <h3 className="font-bold text-slate-900 text-base">Module 3: Skill Gap Engine</h3>
                <span className="text-xs text-slate-400">40% Assessment + 60% Project</span>
              </div>
            </div>
            <span className="text-lg font-black text-amber-600">18% Gap</span>
          </div>
          <p className="text-xs text-slate-600 leading-relaxed">
            Combines practical evidence to map gaps against target role standards.
          </p>
          <button
            onClick={() => setActiveTab('skill-gap-engine')}
            className="w-full py-2.5 rounded-xl bg-amber-50 hover:bg-amber-100 text-amber-700 text-xs font-bold transition-all flex items-center justify-center space-x-1"
          >
            <span>View Skill Gap Matrix</span>
            <ChevronRight className="w-4 h-4" />
          </button>
        </div>

        {/* Skill Genome Visualization */}
        <div className="glass-card rounded-3xl p-6 border border-white/80 space-y-4 shadow-sm hover:shadow-md transition-all">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-3">
              <div className="w-10 h-10 rounded-2xl bg-emerald-500/10 text-emerald-600 flex items-center justify-center font-bold">
                <Dna className="w-5 h-5" />
              </div>
              <div>
                <h3 className="font-bold text-slate-900 text-base">Module 4: Skill Genome AI</h3>
                <span className="text-xs text-slate-400">DNA & Neural trait map</span>
              </div>
            </div>
            <span className="text-lg font-black text-emerald-600">8 Strands</span>
          </div>
          <p className="text-xs text-slate-600 leading-relaxed">
            Analytical thinking, problem solving, adaptability, and learning traits.
          </p>
          <button
            onClick={() => setActiveTab('skill-genome')}
            className="w-full py-2.5 rounded-xl bg-emerald-50 hover:bg-emerald-100 text-emerald-700 text-xs font-bold transition-all flex items-center justify-center space-x-1"
          >
            <span>Open Skill Genome</span>
            <ChevronRight className="w-4 h-4" />
          </button>
        </div>

        {/* Skill Evolution Timeline */}
        <div className="glass-card rounded-3xl p-6 border border-white/80 space-y-4 shadow-sm hover:shadow-md transition-all">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-3">
              <div className="w-10 h-10 rounded-2xl bg-teal-500/10 text-teal-600 flex items-center justify-center font-bold">
                <Workflow className="w-5 h-5" />
              </div>
              <div>
                <h3 className="font-bold text-slate-900 text-base">Module 5: Skill Evolution</h3>
                <span className="text-xs text-slate-400">Lifecycle timeline</span>
              </div>
            </div>
            <span className="text-lg font-black text-teal-600">6 Stages</span>
          </div>
          <p className="text-xs text-slate-600 leading-relaxed">
            Tracks skills from Emerging to Evolved with memory decay alerts.
          </p>
          <button
            onClick={() => setActiveTab('skill-evolution')}
            className="w-full py-2.5 rounded-xl bg-teal-50 hover:bg-teal-100 text-teal-700 text-xs font-bold transition-all flex items-center justify-center space-x-1"
          >
            <span>Track Evolution Timeline</span>
            <ChevronRight className="w-4 h-4" />
          </button>
        </div>

        {/* AI Shadow Mentor */}
        <div className="glass-card rounded-3xl p-6 border border-white/80 space-y-4 shadow-sm hover:shadow-md transition-all">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-3">
              <div className="w-10 h-10 rounded-2xl bg-indigo-500/10 text-indigo-600 flex items-center justify-center font-bold">
                <Bot className="w-5 h-5" />
              </div>
              <div>
                <h3 className="font-bold text-slate-900 text-base">Module 6: AI Shadow Mentor</h3>
                <span className="text-xs text-slate-400">Conversational insights</span>
              </div>
            </div>
            <span className="text-xs font-extrabold px-2 py-0.5 rounded bg-emerald-100 text-emerald-700">Active</span>
          </div>
          <p className="text-xs text-slate-600 leading-relaxed">
            Proactive recommendations, project ideas, and refresher guidance.
          </p>
          <button
            onClick={() => setActiveTab('ai-shadow-mentor')}
            className="w-full py-2.5 rounded-xl bg-indigo-50 hover:bg-indigo-100 text-indigo-700 text-xs font-bold transition-all flex items-center justify-center space-x-1"
          >
            <span>Talk to Shadow Mentor</span>
            <ChevronRight className="w-4 h-4" />
          </button>
        </div>

      </div>
    </div>
  );
};
