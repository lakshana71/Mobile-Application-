import React from 'react';
import { Sparkles, Compass, ShieldCheck, ArrowRight, BrainCircuit, Activity, Cpu, CheckCircle2 } from 'lucide-react';
import { useApp } from '../../context/AppContext';

export const SplashScreen: React.FC = () => {
  const { setScreen, isLoggedIn } = useApp();

  const handleStart = () => {
    if (isLoggedIn) {
      setScreen('app');
    } else {
      setScreen('login');
    }
  };

  return (
    <div className="min-h-screen relative flex flex-col justify-between overflow-hidden bg-[#F7F9FC]">
      {/* Background Animated Glow Spheres */}
      <div className="absolute top-[-10%] left-[-10%] w-[500px] h-[500px] bg-brand-primary/15 rounded-full blur-[120px] pointer-events-none animate-pulse-glow" />
      <div className="absolute bottom-[-10%] right-[-10%] w-[600px] h-[600px] bg-brand-accent/15 rounded-full blur-[140px] pointer-events-none animate-pulse-glow" />
      <div className="absolute top-[40%] right-[20%] w-[350px] h-[350px] bg-brand-secondary/15 rounded-full blur-[100px] pointer-events-none" />

      {/* Top Navbar */}
      <header className="w-full max-w-7xl mx-auto px-6 py-6 flex items-center justify-between z-10">
        <div className="flex items-center space-x-3">
          <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-brand-primary via-brand-secondary to-brand-accent flex items-center justify-center shadow-glow-primary">
            <BrainCircuit className="w-6 h-6 text-white" />
          </div>
          <span className="text-xl font-bold font-sans tracking-tight text-slate-900">
            SkillGap<span className="gradient-text font-extrabold">.AI</span>
          </span>
        </div>

        <button
          onClick={handleStart}
          className="px-5 py-2.5 rounded-full glass-card hover:bg-white/90 text-slate-800 text-sm font-semibold transition-all shadow-sm border border-brand-primary/20 flex items-center space-x-2"
        >
          <span>{isLoggedIn ? 'Go to Dashboard' : 'Sign In'}</span>
          <ArrowRight className="w-4 h-4 text-brand-primary" />
        </button>
      </header>

      {/* Hero Body */}
      <main className="flex-1 flex flex-col items-center justify-center text-center px-6 py-12 max-w-5xl mx-auto z-10">
        <div className="inline-flex items-center space-x-2 px-4 py-2 rounded-full glass-card border border-brand-primary/20 text-brand-primary text-xs font-semibold uppercase tracking-wider mb-6 shadow-sm">
          <Sparkles className="w-4 h-4 text-brand-accent animate-spin" style={{ animationDuration: '6s' }} />
          <span>Next-Gen Career Intelligence Platform</span>
        </div>

        <h1 className="text-4xl sm:text-6xl md:text-7xl font-extrabold text-slate-900 tracking-tight leading-[1.1] mb-6">
          Architect Your Dream Career with <br className="hidden sm:inline" />
          <span className="gradient-text">360° Agentic AI Skill Analysis</span>
        </h1>

        <p className="text-lg sm:text-xl text-slate-600 max-w-3xl font-normal leading-relaxed mb-10">
          Close industry skill gaps with real-time dynamic roadmaps, 360° skill radar evaluation, decay predictions, project failure simulations, and personalized AI mentorship.
        </p>

        <div className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-16 w-full max-w-md">
          <button
            onClick={handleStart}
            className="w-full sm:w-auto px-8 py-4 rounded-2xl bg-gradient-to-r from-brand-primary via-brand-secondary to-brand-accent text-white font-bold text-base shadow-glow-primary hover:opacity-95 hover:scale-[1.02] active:scale-[0.98] transition-all flex items-center justify-center space-x-3 group"
          >
            <span>Launch Skill Analyzer</span>
            <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
          </button>
        </div>

        {/* Feature Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 w-full text-left">
          <div className="glass-card p-6 rounded-2xl border border-white/60 hover:shadow-glass-hover transition-all">
            <div className="w-12 h-12 rounded-xl bg-brand-primary/10 flex items-center justify-center mb-4 text-brand-primary">
              <Compass className="w-6 h-6" />
            </div>
            <h3 className="text-lg font-bold text-slate-900 mb-2">Dynamic AI Roadmap</h3>
            <p className="text-slate-600 text-sm leading-relaxed">
              Auto-generated career paths that dynamically adjust whenever you change target roles, learn skills, or modify your timeline.
            </p>
          </div>

          <div className="glass-card p-6 rounded-2xl border border-white/60 hover:shadow-glass-hover transition-all">
            <div className="w-12 h-12 rounded-xl bg-brand-secondary/10 flex items-center justify-center mb-4 text-brand-secondary">
              <Activity className="w-6 h-6" />
            </div>
            <h3 className="text-lg font-bold text-slate-900 mb-2">SkillSphere 360° Radar</h3>
            <p className="text-slate-600 text-sm leading-relaxed">
              Multi-dimensional evaluation across technical skills, practical projects, communication, problem solving, and placement readiness.
            </p>
          </div>

          <div className="glass-card p-6 rounded-2xl border border-white/60 hover:shadow-glass-hover transition-all">
            <div className="w-12 h-12 rounded-xl bg-brand-accent/10 flex items-center justify-center mb-4 text-cyan-600">
              <Cpu className="w-6 h-6" />
            </div>
            <h3 className="text-lg font-bold text-slate-900 mb-2">Project Failure Simulator</h3>
            <p className="text-slate-600 text-sm leading-relaxed">
              Real-world scenario diagnostics connecting code flaws directly to interview failure root causes and instant action steps.
            </p>
          </div>
        </div>
      </main>

      {/* Footer */}
      <footer className="w-full max-w-7xl mx-auto px-6 py-6 flex items-center justify-between text-xs text-slate-500 z-10 border-t border-slate-200/60">
        <div>© 2026 Skill Gap Analyzer AI. Designed with Linear & Apple HID Aesthetics.</div>
        <div className="flex items-center space-x-4">
          <span className="flex items-center space-x-1">
            <CheckCircle2 className="w-3.5 h-3.5 text-emerald-500" />
            <span>Zero Backend Dependency</span>
          </span>
          <span className="flex items-center space-x-1">
            <ShieldCheck className="w-3.5 h-3.5 text-brand-primary" />
            <span>LocalStorage Persistence</span>
          </span>
        </div>
      </footer>
    </div>
  );
};
