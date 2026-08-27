import React from 'react';
import { Dna, Sparkles, BrainCircuit, Activity, Cpu, Network } from 'lucide-react';
import { useApp } from '../../context/AppContext';
import { buildDigitalTwin } from '../../utils/digitalTwin';

export const SkillGenomeView: React.FC = () => {
  const { userProfile, roadmap, score360 } = useApp();
  const digitalTwin = buildDigitalTwin(userProfile, roadmap, score360);

  const traits = digitalTwin.genome;

  return (
    <div className="p-6 max-w-7xl mx-auto space-y-6">
      {/* Header Banner */}
      <div className="relative rounded-3xl bg-gradient-to-r from-teal-600 via-emerald-600 to-indigo-600 p-8 text-white shadow-xl overflow-hidden">
        <div className="absolute top-0 right-0 w-80 h-80 bg-white/10 rounded-full blur-3xl" />
        <div className="relative z-10 space-y-3">
          <div className="inline-flex items-center space-x-2 px-3 py-1 rounded-full bg-white/20 backdrop-blur-md text-xs font-bold uppercase tracking-wider">
            <Dna className="w-3.5 h-3.5 text-emerald-200" />
            <span>Module 4 – Skill Genome AI</span>
          </div>
          <h1 className="text-3xl sm:text-4xl font-black tracking-tight">
            Cognitive & Behavioral Skill Genome
          </h1>
          <p className="text-emerald-100 text-sm max-w-2xl leading-relaxed">
            Replacing static skill resumes with an evolving DNA neural representation of your natural abilities, problem-solving speed, and learning traits.
          </p>
        </div>
      </div>

      {/* Mandatory Vision Quote Banner */}
      <div className="glass-card rounded-2xl p-6 border-l-4 border-emerald-500 bg-gradient-to-r from-emerald-500/10 via-teal-500/10 to-transparent flex items-center space-x-4">
        <div className="w-12 h-12 rounded-2xl bg-emerald-500/20 text-emerald-600 flex items-center justify-center flex-shrink-0">
          <Sparkles className="w-6 h-6 animate-pulse" />
        </div>
        <div>
          <blockquote className="text-base sm:text-lg font-black text-slate-900 tracking-tight italic">
            "Every student has a unique Skill Genome that evolves with experience."
          </blockquote>
          <span className="text-xs text-slate-500 mt-0.5 block font-medium">
            SkillSphere AI Neural Mapping Core
          </span>
        </div>
      </div>

      {/* DNA Helix & Interconnected Neural Network Visualization */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Futuristic DNA Neural Helix Interactive Visualizer */}
        <div className="lg:col-span-2 glass-card rounded-3xl p-6 sm:p-8 border border-white/80 space-y-6 relative overflow-hidden">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-2">
              <Network className="w-5 h-5 text-emerald-600" />
              <h3 className="font-bold text-slate-900 text-base">Neural DNA Helix Map</h3>
            </div>
            <span className="px-3 py-1 rounded-full bg-emerald-100 text-emerald-800 text-xs font-bold">
              8 Evolving Strands Active
            </span>
          </div>

          {/* DNA Strand Animation Graphic */}
          <div className="relative py-8 bg-slate-950 rounded-2xl p-6 overflow-hidden border border-slate-800 flex items-center justify-center min-h-[280px]">
            <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-teal-900/30 via-slate-950 to-slate-950" />

            <div className="relative z-10 w-full max-w-lg space-y-4">
              {traits.map((trait, idx) => (
                <div key={trait.id} className="flex items-center justify-between space-x-4">
                  <span className="w-36 text-xs font-bold text-slate-300 text-right">{trait.label}</span>
                  <div className="flex-1 relative h-3 bg-slate-800 rounded-full overflow-hidden border border-slate-700">
                    <div
                      className={`h-full rounded-full bg-gradient-to-r ${
                        idx % 2 === 0 ? 'from-emerald-400 via-teal-400 to-cyan-400' : 'from-indigo-400 via-purple-400 to-pink-400'
                      } animate-pulse`}
                      style={{ width: `${trait.score}%` }}
                    />
                  </div>
                  <span className="w-12 text-xs font-black text-emerald-400 font-mono">{trait.score}%</span>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Individual Trait Cards */}
        <div className="glass-card rounded-3xl p-6 border border-white/80 space-y-4">
          <h3 className="font-bold text-slate-900 text-base">Genome Traits Breakdown</h3>
          <div className="space-y-3 max-h-[440px] overflow-y-auto pr-1">
            {traits.map((trait) => (
              <div key={trait.id} className="p-3.5 rounded-2xl bg-white border border-slate-200 space-y-1.5 shadow-sm">
                <div className="flex items-center justify-between text-xs">
                  <span className="font-bold text-slate-900">{trait.label}</span>
                  <span className="font-black text-emerald-600">{trait.score}%</span>
                </div>
                <div className="w-full bg-slate-100 h-1.5 rounded-full overflow-hidden">
                  <div className="bg-gradient-to-r from-teal-500 to-emerald-500 h-full" style={{ width: `${trait.score}%` }} />
                </div>
                <div className="text-[10px] text-slate-400 flex justify-between pt-0.5">
                  <span>Intensity: {trait.intensity}</span>
                  <span>Evolving</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};
