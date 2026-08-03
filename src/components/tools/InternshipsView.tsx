import React from 'react';
import { Building, MapPin, DollarSign, Sparkles, AlertCircle, CheckCircle2 } from 'lucide-react';
import { useApp } from '../../context/AppContext';
import { INITIAL_INTERNSHIPS } from '../../data/careerData';

export const InternshipsView: React.FC = () => {
  const { userProfile } = useApp();

  return (
    <div className="p-6 max-w-5xl mx-auto space-y-6">
      
      <div className="glass-card p-6 rounded-3xl border border-white/80 space-y-2">
        <div className="flex items-center space-x-2 text-brand-primary">
          <Building className="w-5 h-5" />
          <span className="text-xs font-bold uppercase tracking-wider">AI Internship & Job Placement Matcher</span>
        </div>
        <h1 className="text-2xl font-extrabold text-slate-900">
          Matched Opportunities for <span className="gradient-text">{userProfile.dreamCareer}</span>
        </h1>
        <p className="text-xs text-slate-500">
          Opportunities calculated based on your 360° SkillSphere score and completed roadmap nodes.
        </p>
      </div>

      <div className="space-y-4">
        {INITIAL_INTERNSHIPS.map((item) => (
          <div key={item.id} className="glass-card p-6 rounded-3xl border border-white/80 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
            
            <div className="space-y-2">
              <div className="flex items-center space-x-3">
                <span className="px-3 py-1 rounded-full bg-emerald-100 text-emerald-700 text-xs font-extrabold flex items-center space-x-1">
                  <Sparkles className="w-3.5 h-3.5" />
                  <span>{item.matchScore}% Skill Match</span>
                </span>
                <span className="text-xs text-slate-400">Posted {item.postedDaysAgo}d ago</span>
              </div>

              <h3 className="font-bold text-slate-900 text-base">{item.role}</h3>
              
              <div className="flex flex-wrap items-center gap-3 text-xs text-slate-600">
                <span className="font-semibold text-slate-800">{item.company}</span>
                <span className="text-slate-300">•</span>
                <span>{item.location}</span>
                <span className="text-slate-300">•</span>
                <span className="font-bold text-brand-primary">{item.stipend}</span>
              </div>

              {item.missingSkills.length > 0 && (
                <div className="text-[11px] text-amber-700 font-medium flex items-center space-x-1 pt-1">
                  <AlertCircle className="w-3.5 h-3.5 text-amber-600 flex-shrink-0" />
                  <span>Missing skill to reach 100% match: {item.missingSkills.join(', ')}</span>
                </div>
              )}
            </div>

            <button className="w-full sm:w-auto px-6 py-3 rounded-xl bg-brand-primary text-white text-xs font-bold hover:bg-indigo-600 shadow-md transition-all">
              Apply via AI Profile
            </button>

          </div>
        ))}
      </div>

    </div>
  );
};
