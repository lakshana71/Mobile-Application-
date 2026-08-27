import React from 'react';
import { Activity, BrainCircuit, Orbit, Sparkles, TrendingUp, Workflow, Zap } from 'lucide-react';
import { useApp } from '../../context/AppContext';
import { buildDigitalTwin } from '../../utils/digitalTwin';

export const DigitalTwinView: React.FC = () => {
  const { userProfile, roadmap, score360 } = useApp();
  const digitalTwin = buildDigitalTwin(userProfile, roadmap, score360);

  return (
    <div className="p-6 max-w-7xl mx-auto space-y-6">
      <div className="relative rounded-3xl bg-gradient-to-r from-brand-primary via-indigo-600 to-brand-secondary p-8 text-white shadow-xl overflow-hidden">
        <div className="absolute top-0 right-0 w-80 h-80 bg-white/10 rounded-full blur-3xl" />
        <div className="relative z-10 flex flex-col lg:flex-row lg:items-end lg:justify-between gap-4">
          <div>
            <div className="inline-flex items-center space-x-2 px-3 py-1 rounded-full bg-white/20 backdrop-blur-sm text-xs font-semibold uppercase tracking-[0.25em]">
              <Orbit className="w-3.5 h-3.5" />
              <span>AI Digital Skill Twin</span>
            </div>
            <h1 className="mt-3 text-3xl font-black tracking-tight">Your living profile is now adaptive, predictive, and mentor-led.</h1>
            <p className="mt-3 max-w-2xl text-sm text-indigo-100 leading-relaxed">
              The platform now interprets learning signals as a dynamic twin: genome strength, evolution history, mentor insights, and career projections are continuously updated as you learn.
            </p>
          </div>
          <div className="glass-card-dark rounded-2xl px-5 py-4 min-w-[220px]">
            <div className="text-3xl font-black text-brand-accent">{digitalTwin.overview}%</div>
            <div className="text-xs uppercase tracking-[0.2em] text-slate-200">Twin Overview</div>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 xl:grid-cols-[1.2fr_0.8fr] gap-6">
        <div className="glass-card rounded-3xl border border-white/80 p-6 space-y-5">
          <div className="flex items-center justify-between">
            <div>
              <h2 className="text-lg font-black text-slate-900">Skill Genome AI</h2>
              <p className="text-sm text-slate-500">DNA-inspired node map of natural abilities and learned strengths</p>
            </div>
            <div className="rounded-full bg-brand-primary/10 px-3 py-1 text-xs font-semibold text-brand-primary">Dynamic</div>
          </div>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
            {digitalTwin.genome.map((node) => (
              <div key={node.id} className="rounded-2xl border border-slate-200 bg-white/80 p-3">
                <div className="flex items-center justify-between">
                  <span className="text-[11px] font-semibold text-slate-700">{node.label}</span>
                  <span className="text-[10px] font-bold text-brand-primary">{node.score}%</span>
                </div>
                <div className="mt-3 h-2 rounded-full bg-slate-100 overflow-hidden">
                  <div className="h-full rounded-full bg-gradient-to-r from-brand-primary via-brand-secondary to-brand-accent" style={{ width: `${node.score}%` }} />
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="glass-card rounded-3xl border border-white/80 p-6 space-y-4">
          <div className="flex items-center space-x-2">
            <div className="w-9 h-9 rounded-xl bg-brand-secondary/10 flex items-center justify-center text-brand-secondary">
              <BrainCircuit className="w-4 h-4" />
            </div>
            <div>
              <h3 className="font-bold text-slate-900">Career Readiness Score</h3>
              <p className="text-xs text-slate-500">Adaptive signal for your next move</p>
            </div>
          </div>
          <div className="rounded-2xl bg-slate-900/95 p-5 text-white">
            <div className="text-4xl font-black">{digitalTwin.readiness}%</div>
            <div className="mt-2 text-xs uppercase tracking-[0.25em] text-slate-400">Prediction confidence</div>
            <div className="mt-4 h-2 rounded-full bg-white/10 overflow-hidden">
              <div className="h-full rounded-full bg-gradient-to-r from-brand-secondary to-brand-accent" style={{ width: `${digitalTwin.readiness}%` }} />
            </div>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="glass-card rounded-3xl border border-white/80 p-6">
          <div className="flex items-center justify-between">
            <div>
              <h3 className="font-bold text-slate-900">Skill Evolution Timeline</h3>
              <p className="text-xs text-slate-500">Lifecycle from emerging to evolved</p>
            </div>
            <Workflow className="w-5 h-5 text-brand-primary" />
          </div>
          <div className="mt-4 space-y-3">
            {digitalTwin.evolutionHistory.map((item) => (
              <div key={item.id} className="rounded-2xl border border-slate-200 bg-white/80 p-3">
                <div className="flex items-center justify-between text-sm font-semibold text-slate-800">
                  <span>{item.skill}</span>
                  <span className="text-[10px] uppercase tracking-[0.2em] text-brand-primary">{item.stage}</span>
                </div>
                <p className="mt-2 text-xs text-slate-500">{item.change}</p>
                <div className="mt-2 h-1.5 rounded-full bg-slate-100 overflow-hidden">
                  <div className="h-full rounded-full bg-gradient-to-r from-brand-primary to-brand-accent" style={{ width: `${item.confidence}%` }} />
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="glass-card rounded-3xl border border-white/80 p-6">
          <div className="flex items-center justify-between">
            <div>
              <h3 className="font-bold text-slate-900">Learning Behaviour</h3>
              <p className="text-xs text-slate-500">Signals that shape your mentor’s advice</p>
            </div>
            <Sparkles className="w-5 h-5 text-brand-accent" />
          </div>
          <div className="mt-4 space-y-3 text-sm text-slate-600">
            <div className="rounded-2xl bg-slate-50 p-3"><strong>Focus:</strong> {digitalTwin.learningBehaviour.focus}</div>
            <div className="rounded-2xl bg-slate-50 p-3"><strong>Pattern:</strong> {digitalTwin.learningBehaviour.pattern}</div>
            <div className="rounded-2xl bg-slate-50 p-3"><strong>Preferred style:</strong> {digitalTwin.learningBehaviour.preferredStyle}</div>
            <div className="rounded-2xl bg-slate-50 p-3"><strong>Risk:</strong> {digitalTwin.learningBehaviour.risk}</div>
          </div>
        </div>

        <div className="glass-card rounded-3xl border border-white/80 p-6">
          <div className="flex items-center justify-between">
            <div>
              <h3 className="font-bold text-slate-900">AI Shadow Mentor</h3>
              <p className="text-xs text-slate-500">Adaptive recommendations that learn with you</p>
            </div>
            <Zap className="w-5 h-5 text-amber-500" />
          </div>
          <div className="mt-4 space-y-3">
            {digitalTwin.mentorInsights.map((insight) => (
              <div key={insight.id} className="rounded-2xl border border-slate-200 bg-white/80 p-3">
                <div className="flex items-center justify-between">
                  <span className="text-sm font-semibold text-slate-800">{insight.title}</span>
                  <span className="text-[10px] uppercase tracking-[0.2em] text-brand-accent">{insight.priority}</span>
                </div>
                <p className="mt-2 text-xs text-slate-600">{insight.insight}</p>
                <p className="mt-2 text-[11px] font-medium text-brand-primary">{insight.recommendation}</p>
              </div>
            ))}
          </div>
        </div>
      </div>

      <div className="glass-card rounded-3xl border border-white/80 p-6">
        <div className="flex items-center justify-between">
          <div>
            <h3 className="font-bold text-slate-900">Future Skill Prediction</h3>
            <p className="text-xs text-slate-500">Signals that point to your next high-leverage capability</p>
          </div>
          <TrendingUp className="w-5 h-5 text-emerald-500" />
        </div>
        <div className="mt-4 grid grid-cols-1 md:grid-cols-2 gap-3">
          {digitalTwin.careerPredictions.map((prediction) => (
            <div key={prediction.id} className="rounded-2xl bg-slate-50 p-4">
              <div className="flex items-center justify-between">
                <span className="text-sm font-semibold text-slate-800">{prediction.title}</span>
                <span className="text-sm font-black text-brand-primary">{prediction.probability}%</span>
              </div>
              <p className="mt-2 text-xs text-slate-600">{prediction.rationale}</p>
              <p className="mt-3 text-[11px] font-medium text-brand-primary">Next move: {prediction.nextAction}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
