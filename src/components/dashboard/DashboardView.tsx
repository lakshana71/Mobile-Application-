import React from 'react';
import {
  Sparkles,
  Target,
  Flame,
  CheckCircle2,
  TrendingUp,
  AlertOctagon,
  Clock,
  ArrowRight,
  ShieldAlert,
  Zap,
  Activity,
  Award,
  BookOpen,
  Briefcase,
  Layers,
  ChevronRight,
  Cpu,
  BrainCircuit,
  MessageSquare,
} from 'lucide-react';
import { useApp } from '../../context/AppContext';
import { generateSkillGaps, generateSkillDecayItems } from '../../utils/skillAnalyzer';
import { INITIAL_INDUSTRY_TRENDS, FAILURE_SIMULATIONS } from '../../data/careerData';

export const DashboardView: React.FC = () => {
  const { userProfile, score360, roadmap, toggleStepCompleted, setActiveTab, sendMentorMessage } = useApp();

  const skillGaps = generateSkillGaps(userProfile);
  const decayItems = generateSkillDecayItems(userProfile);
  const completedSteps = roadmap.filter((s) => s.completed).length;
  const progressPercent = roadmap.length > 0 ? Math.round((completedSteps / roadmap.length) * 100) : 0;

  return (
    <div className="p-6 max-w-7xl mx-auto space-y-6">
      
      {/* 1. Welcome Card */}
      <div className="relative rounded-3xl bg-gradient-to-r from-brand-primary via-indigo-600 to-brand-secondary p-8 text-white shadow-xl overflow-hidden">
        <div className="absolute top-0 right-0 w-96 h-96 bg-white/10 rounded-full blur-3xl pointer-events-none" />

        <div className="relative z-10 grid grid-cols-1 lg:grid-cols-3 gap-6 items-center">
          <div className="lg:col-span-2 space-y-3">
            <div className="inline-flex items-center space-x-2 px-3 py-1 rounded-full bg-white/20 backdrop-blur-md text-xs font-semibold text-white">
              <Sparkles className="w-3.5 h-3.5 text-brand-accent animate-spin" style={{ animationDuration: '6s' }} />
              <span>AI Career Readiness Sync Active</span>
            </div>

            <h1 className="text-3xl sm:text-4xl font-extrabold tracking-tight">
              Hello, {userProfile.name}! 👋
            </h1>

            <p className="text-indigo-100 text-sm max-w-xl leading-relaxed">
              Targeting <span className="font-bold underline decoration-brand-accent">{userProfile.dreamCareer}</span> at <span className="font-bold">{userProfile.dreamCompany || 'Top Tech'}</span>. You have completed {completedSteps} of {roadmap.length} roadmap milestones.
            </p>

            <div className="pt-2 flex flex-wrap items-center gap-4 text-xs">
              <div className="flex items-center space-x-1.5 bg-white/10 px-3 py-1.5 rounded-xl backdrop-blur-sm">
                <Flame className="w-4 h-4 text-amber-300" />
                <span>{userProfile.streakDays} Days Learning Streak</span>
              </div>
              <div className="flex items-center space-x-1.5 bg-white/10 px-3 py-1.5 rounded-xl backdrop-blur-sm">
                <Clock className="w-4 h-4 text-cyan-300" />
                <span>Goal: {userProfile.weeklyHours} hrs/week ({userProfile.timeline})</span>
              </div>
            </div>
          </div>

          {/* Quick Stats Pill */}
          <div className="glass-card-dark p-6 rounded-2xl border border-white/20 text-center space-y-3">
            <span className="text-xs text-indigo-200 font-medium uppercase tracking-wider block">Placement Readiness</span>
            <div className="text-4xl font-black text-brand-accent">{score360.industryReadiness}%</div>
            <div className="w-full bg-slate-700 h-2 rounded-full overflow-hidden">
              <div className="bg-gradient-to-r from-brand-secondary to-brand-accent h-full" style={{ width: `${score360.industryReadiness}%` }} />
            </div>
            <button
              onClick={() => setActiveTab('roadmap')}
              className="w-full py-2 px-4 rounded-xl bg-white text-slate-900 text-xs font-bold hover:bg-slate-100 transition-all flex items-center justify-center space-x-2"
            >
              <span>Continue Learning</span>
              <ArrowRight className="w-3.5 h-3.5 text-brand-primary" />
            </button>
          </div>
        </div>
      </div>

      {/* 2. SkillSphere 360° Score & Placement Readiness */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        
        {/* SkillSphere 360 radar scores */}
        <div className="glass-card p-6 rounded-3xl border border-white/80 space-y-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-2">
              <div className="w-8 h-8 rounded-xl bg-brand-primary/10 flex items-center justify-center text-brand-primary">
                <Activity className="w-4 h-4" />
              </div>
              <div>
                <h3 className="font-bold text-slate-900 text-sm">SkillSphere 360° Score</h3>
                <span className="text-[10px] text-slate-400">8 Dimension Radar Matrix</span>
              </div>
            </div>
            <div className="text-2xl font-black text-brand-primary">{score360.overallScore}<span className="text-xs text-slate-400 font-normal">/100</span></div>
          </div>

          {/* 8 Categories Progress */}
          <div className="space-y-2.5 pt-2">
            {[
              { label: 'Technical Mastery', val: score360.technical, color: 'bg-brand-primary' },
              { label: 'Practical Application', val: score360.practical, color: 'bg-brand-secondary' },
              { label: 'Problem Solving', val: score360.problemSolving, color: 'bg-brand-accent' },
              { label: 'Communication', val: score360.communication, color: 'bg-indigo-500' },
              { label: 'Consistency', val: score360.consistency, color: 'bg-amber-500' },
              { label: 'Industry Readiness', val: score360.industryReadiness, color: 'bg-emerald-500' },
              { label: 'Confidence Score', val: score360.confidence, color: 'bg-purple-500' },
              { label: 'Projects Completed', val: score360.projects, color: 'bg-rose-500' },
            ].map((cat) => (
              <div key={cat.label} className="space-y-1">
                <div className="flex justify-between text-xs font-semibold text-slate-700">
                  <span>{cat.label}</span>
                  <span>{cat.val}%</span>
                </div>
                <div className="w-full bg-slate-100 h-1.5 rounded-full overflow-hidden">
                  <div className={`h-full ${cat.color} transition-all duration-500`} style={{ width: `${cat.val}%` }} />
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Skill Gap Analysis Widget */}
        <div className="glass-card p-6 rounded-3xl border border-white/80 space-y-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-2">
              <div className="w-8 h-8 rounded-xl bg-brand-secondary/10 flex items-center justify-center text-brand-secondary">
                <Target className="w-4 h-4" />
              </div>
              <div>
                <h3 className="font-bold text-slate-900 text-sm">Skill Gap Analysis</h3>
                <span className="text-[10px] text-slate-400">Target Role: {userProfile.dreamCareer}</span>
              </div>
            </div>
            <button
              onClick={() => setActiveTab('skill-gap')}
              className="text-xs font-bold text-brand-primary hover:underline flex items-center"
            >
              <span>View Matrix</span>
              <ChevronRight className="w-3.5 h-3.5" />
            </button>
          </div>

          <div className="space-y-3">
            {skillGaps.slice(0, 4).map((item) => (
              <div key={item.skill} className="p-3 rounded-2xl bg-white/80 border border-slate-200/80 space-y-1.5">
                <div className="flex items-center justify-between text-xs">
                  <span className="font-bold text-slate-900">{item.skill}</span>
                  <span className={`px-2 py-0.5 rounded-md text-[10px] font-extrabold uppercase ${
                    item.priority === 'High' ? 'bg-rose-100 text-rose-700' : 'bg-slate-100 text-slate-700'
                  }`}>
                    {item.priority} Priority
                  </span>
                </div>
                <div className="flex justify-between text-[11px] text-slate-500">
                  <span>Current: {item.userLevel}%</span>
                  <span>Required: {item.requiredLevel}%</span>
                </div>
                <div className="w-full bg-slate-100 h-1.5 rounded-full overflow-hidden">
                  <div
                    className={`h-full ${item.userLevel >= item.requiredLevel ? 'bg-emerald-500' : 'bg-brand-primary'}`}
                    style={{ width: `${item.userLevel}%` }}
                  />
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Skill Decay & Reminders Widget */}
        <div className="glass-card p-6 rounded-3xl border border-white/80 space-y-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-2">
              <div className="w-8 h-8 rounded-xl bg-amber-500/10 flex items-center justify-center text-amber-600">
                <AlertOctagon className="w-4 h-4" />
              </div>
              <div>
                <h3 className="font-bold text-slate-900 text-sm">Skill Decay Prediction</h3>
                <span className="text-[10px] text-slate-400">Retention Memory Alerts</span>
              </div>
            </div>
            <span className="px-2 py-0.5 rounded-full bg-rose-100 text-rose-700 text-[10px] font-bold">
              {decayItems.filter((d) => d.decayRisk === 'High').length} High Risk
            </span>
          </div>

          <div className="space-y-3">
            {decayItems.map((item) => (
              <div key={item.id} className="p-3 rounded-2xl bg-amber-50/50 border border-amber-200/60 space-y-1">
                <div className="flex items-center justify-between text-xs">
                  <span className="font-bold text-slate-900">{item.skill}</span>
                  <span className="text-[10px] text-amber-700 font-semibold">
                    Last practiced {item.lastPracticedDaysAgo}d ago
                  </span>
                </div>
                <p className="text-[11px] text-slate-600 leading-snug">{item.suggestedAction}</p>
                <div className="pt-1 flex items-center justify-between">
                  <span className="text-[10px] font-bold text-rose-600">Memory Loss: ~{item.decayPercentage}%</span>
                  <button
                    onClick={() => setActiveTab('roadmap')}
                    className="px-2.5 py-1 rounded-lg bg-amber-500 text-white text-[10px] font-bold hover:bg-amber-600 transition-all"
                  >
                    Practice Today
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>

      </div>

      {/* 3. Dynamic Personalized Roadmap Preview & Agentic AI Mentor Snippet */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        
        {/* Dynamic Roadmap Timeline Preview */}
        <div className="lg:col-span-2 glass-card p-6 rounded-3xl border border-white/80 space-y-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-2">
              <div className="w-8 h-8 rounded-xl bg-brand-primary/10 flex items-center justify-center text-brand-primary">
                <Layers className="w-4 h-4" />
              </div>
              <div>
                <h3 className="font-bold text-slate-900 text-base">Personalized Learning Roadmap</h3>
                <span className="text-xs text-slate-400">Generated dynamically for {userProfile.dreamCareer}</span>
              </div>
            </div>

            <button
              onClick={() => setActiveTab('roadmap')}
              className="px-4 py-2 rounded-xl bg-brand-primary/10 text-brand-primary text-xs font-bold hover:bg-brand-primary hover:text-white transition-all flex items-center space-x-1"
            >
              <span>Full Roadmap</span>
              <ChevronRight className="w-4 h-4" />
            </button>
          </div>

          <div className="space-y-3">
            {roadmap.slice(0, 4).map((step, idx) => (
              <div
                key={step.id}
                className={`p-4 rounded-2xl border transition-all flex items-center justify-between ${
                  step.completed
                    ? 'bg-emerald-50/60 border-emerald-200/80 text-slate-700'
                    : 'bg-white/90 border-slate-200 hover:border-brand-primary/40'
                }`}
              >
                <div className="flex items-center space-x-3.5">
                  <button
                    onClick={() => toggleStepCompleted(step.id)}
                    className={`w-6 h-6 rounded-lg flex items-center justify-center transition-all ${
                      step.completed ? 'bg-emerald-500 text-white' : 'border-2 border-slate-300 hover:border-brand-primary'
                    }`}
                  >
                    {step.completed && <CheckCircle2 className="w-4 h-4" />}
                  </button>

                  <div>
                    <div className="flex items-center space-x-2">
                      <span className="text-xs font-extrabold text-slate-400">Step {step.order}</span>
                      <h4 className={`text-sm font-bold ${step.completed ? 'line-through text-slate-500' : 'text-slate-900'}`}>
                        {step.title}
                      </h4>
                    </div>
                    <p className="text-xs text-slate-500 line-clamp-1">{step.description}</p>
                  </div>
                </div>

                <div className="flex items-center space-x-2">
                  <span className="px-2.5 py-1 rounded-md bg-slate-100 text-slate-600 text-[10px] font-bold">
                    {step.difficulty}
                  </span>
                  <span className="text-xs font-semibold text-slate-400">{step.estimatedHours}h</span>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Agentic AI Mentor Launcher */}
        <div className="glass-card p-6 rounded-3xl border border-white/80 flex flex-col justify-between space-y-4">
          <div>
            <div className="flex items-center space-x-3 mb-3">
              <div className="w-10 h-10 rounded-2xl bg-gradient-to-tr from-brand-primary to-brand-accent flex items-center justify-center shadow-glow-primary">
                <BrainCircuit className="w-6 h-6 text-white" />
              </div>
              <div>
                <h3 className="font-bold text-slate-900 text-base">Agentic AI Mentor</h3>
                <span className="text-xs text-emerald-600 font-semibold flex items-center space-x-1">
                  <span className="w-2 h-2 rounded-full bg-emerald-500 animate-ping" />
                  <span>Online & Ready</span>
                </span>
              </div>
            </div>

            <p className="text-xs text-slate-600 leading-relaxed mb-4">
              Ask career questions, request custom coding projects, or analyze target company technical interviews with instant AI assistance.
            </p>

            <div className="space-y-2">
              {[
                `How to crack ${userProfile.dreamCompany || 'tech'} interview?`,
                `What project should I build for ${userProfile.dreamCareer}?`,
                `Explain my top skill gap in detail`,
              ].map((promptText) => (
                <button
                  key={promptText}
                  onClick={() => {
                    sendMentorMessage(promptText);
                    setActiveTab('mentor');
                  }}
                  className="w-full text-left p-2.5 rounded-xl bg-slate-50 border border-slate-200 text-xs text-slate-700 hover:bg-brand-primary/10 hover:border-brand-primary/30 transition-all flex items-center justify-between"
                >
                  <span className="truncate">{promptText}</span>
                  <ArrowRight className="w-3.5 h-3.5 text-brand-primary flex-shrink-0" />
                </button>
              ))}
            </div>
          </div>

          <button
            onClick={() => setActiveTab('mentor')}
            className="w-full py-3 rounded-xl bg-brand-primary text-white text-xs font-bold shadow-md hover:bg-indigo-600 transition-all flex items-center justify-center space-x-2"
          >
            <MessageSquare className="w-4 h-4" />
            <span>Open Agentic AI Chat</span>
          </button>
        </div>

      </div>

      {/* 4. Project Failure Analysis Simulator */}
      <div className="glass-card p-6 rounded-3xl border border-white/80 space-y-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-2">
            <div className="w-8 h-8 rounded-xl bg-rose-500/10 flex items-center justify-center text-rose-600">
              <ShieldAlert className="w-4 h-4" />
            </div>
            <div>
              <h3 className="font-bold text-slate-900 text-base">Project Failure Analysis Simulator</h3>
              <span className="text-xs text-slate-400">Connect production code bugs directly to interview failure causes</span>
            </div>
          </div>
          <button
            onClick={() => setActiveTab('projects')}
            className="text-xs font-bold text-brand-primary hover:underline"
          >
            Explore All Case Studies
          </button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {FAILURE_SIMULATIONS.map((sim) => (
            <div key={sim.id} className="p-4 rounded-2xl bg-white border border-slate-200 space-y-3 shadow-sm hover:shadow-md transition-all">
              <div className="flex items-center justify-between">
                <span className="px-2.5 py-0.5 rounded-full bg-slate-100 text-slate-700 text-[10px] font-bold">
                  {sim.category}
                </span>
                <span className="text-[10px] font-bold text-rose-600 uppercase">Simulated Risk</span>
              </div>

              <h4 className="font-bold text-slate-900 text-xs leading-snug">{sim.title}</h4>

              <div className="space-y-1.5 text-[11px] text-slate-600">
                <div className="flex items-start space-x-1.5">
                  <span className="font-bold text-rose-600 flex-shrink-0">Problem:</span>
                  <span>{sim.problem}</span>
                </div>
                <div className="flex items-start space-x-1.5">
                  <span className="font-bold text-amber-600 flex-shrink-0">Impact:</span>
                  <span>{sim.impact}</span>
                </div>
              </div>

              <div className="pt-2 border-t border-slate-100 flex items-center justify-between">
                <span className="text-[10px] font-semibold text-slate-500">{sim.remedyTask}</span>
                <button
                  onClick={() => setActiveTab('projects')}
                  className="px-2.5 py-1 rounded-lg bg-brand-primary text-white text-[10px] font-bold hover:bg-indigo-600"
                >
                  Solve Scenario
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* 5. Industry Trends & Demand Analyzer */}
      <div className="glass-card p-6 rounded-3xl border border-white/80 space-y-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-2">
            <div className="w-8 h-8 rounded-xl bg-brand-accent/10 flex items-center justify-center text-cyan-600">
              <TrendingUp className="w-4 h-4" />
            </div>
            <div>
              <h3 className="font-bold text-slate-900 text-base">Industry Trend & Skill Demand Analyzer</h3>
              <span className="text-xs text-slate-400">Real-time market growth indicators for tech roles</span>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          {INITIAL_INDUSTRY_TRENDS.map((trend) => (
            <div key={trend.id} className="p-4 rounded-2xl bg-white border border-slate-200/80 space-y-2.5 shadow-sm">
              <div className="flex items-center justify-between">
                <span className="text-xs font-bold text-slate-900 truncate">{trend.title}</span>
                <span className="px-2 py-0.5 rounded-full bg-emerald-100 text-emerald-700 text-[10px] font-extrabold">
                  {trend.growthRate}
                </span>
              </div>

              <div className="flex justify-between items-center text-xs text-slate-500">
                <span>Demand Score:</span>
                <span className="font-bold text-brand-primary">{trend.demandScore}/100</span>
              </div>

              <div className="w-full bg-slate-100 h-1.5 rounded-full overflow-hidden">
                <div className="bg-gradient-to-r from-brand-primary to-brand-accent h-full" style={{ width: `${trend.demandScore}%` }} />
              </div>

              <div className="text-[11px] text-slate-500">
                <span className="font-semibold text-slate-700">Top Employers: </span>
                {trend.topCompanies.join(', ')}
              </div>
            </div>
          ))}
        </div>
      </div>

    </div>
  );
};
