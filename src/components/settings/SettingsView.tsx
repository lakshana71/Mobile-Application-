import React, { useState } from 'react';
import { Settings, Save, Check, RefreshCw, Sparkles, User, Briefcase, Building2, Clock, Target, Layers } from 'lucide-react';
import { useApp } from '../../context/AppContext';
import {
  DREAM_CAREERS,
  ALL_SKILLS_LIST,
  LEARNING_STYLES,
  WEEKLY_HOURS_LIST,
  DREAM_COMPANIES,
  TIMELINES,
} from '../../data/careerData';
import { SkillLevel, LearningStyle, WeeklyHours, CareerTimeline } from '../../types';

export const SettingsView: React.FC = () => {
  const { userProfile, updateProfile } = useApp();

  const [dreamCareer, setDreamCareer] = useState(userProfile.dreamCareer);
  const [dreamCompany, setDreamCompany] = useState(userProfile.dreamCompany);
  const [skillLevel, setSkillLevel] = useState<SkillLevel>(userProfile.skillLevel);
  const [learningStyle, setLearningStyle] = useState<LearningStyle>(userProfile.preferredLearningStyle);
  const [weeklyHours, setWeeklyHours] = useState<WeeklyHours>(userProfile.weeklyHours);
  const [timeline, setTimeline] = useState<CareerTimeline>(userProfile.timeline);
  const [skills, setSkills] = useState<string[]>(userProfile.currentSkills);
  const [savedSuccess, setSavedSuccess] = useState(false);

  const toggleSkill = (skill: string) => {
    if (skills.includes(skill)) {
      setSkills(skills.filter((s) => s !== skill));
    } else {
      setSkills([...skills, skill]);
    }
  };

  const handleSave = (e: React.FormEvent) => {
    e.preventDefault();

    updateProfile({
      ...userProfile,
      dreamCareer,
      dreamCompany,
      skillLevel,
      preferredLearningStyle: learningStyle,
      weeklyHours,
      timeline,
      currentSkills: skills,
    });

    setSavedSuccess(true);
    setTimeout(() => setSavedSuccess(false), 2500);
  };

  return (
    <div className="p-6 max-w-4xl mx-auto space-y-6">
      
      {/* Header */}
      <div className="glass-card p-6 rounded-3xl border border-white/80 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
        <div>
          <div className="flex items-center space-x-2 text-brand-primary mb-1">
            <Settings className="w-5 h-5" />
            <span className="text-xs font-bold uppercase tracking-wider">Career & Skill Settings</span>
          </div>
          <h1 className="text-2xl font-extrabold text-slate-900">Configure Target Profile</h1>
          <p className="text-xs text-slate-500">
            Updating your dream career or skills automatically regenerates your dynamic learning roadmap & 360° metrics.
          </p>
        </div>

        {savedSuccess && (
          <div className="px-4 py-2 rounded-xl bg-emerald-500 text-white text-xs font-bold flex items-center space-x-1.5 shadow-md animate-in fade-in">
            <Check className="w-4 h-4" />
            <span>Profile Updated & Roadmap Regenerated!</span>
          </div>
        )}
      </div>

      <form onSubmit={handleSave} className="space-y-6">
        
        {/* Dream Career & Company */}
        <div className="glass-card p-6 rounded-3xl border border-white/80 space-y-4">
          <h3 className="font-bold text-slate-900 text-sm flex items-center space-x-2">
            <Briefcase className="w-4 h-4 text-brand-primary" />
            <span>Dream Career & Target Employer</span>
          </h3>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-bold text-slate-700 mb-1.5">Dream Career Role</label>
              <select
                value={dreamCareer}
                onChange={(e) => setDreamCareer(e.target.value)}
                className="w-full p-3 rounded-xl bg-slate-50 border border-slate-200 text-xs font-semibold focus:outline-none focus:ring-2 focus:ring-brand-primary"
              >
                {DREAM_CAREERS.map((c) => (
                  <option key={c} value={c}>{c}</option>
                ))}
              </select>
            </div>

            <div>
              <label className="block text-xs font-bold text-slate-700 mb-1.5">Dream Company</label>
              <select
                value={dreamCompany}
                onChange={(e) => setDreamCompany(e.target.value)}
                className="w-full p-3 rounded-xl bg-slate-50 border border-slate-200 text-xs font-semibold focus:outline-none focus:ring-2 focus:ring-brand-primary"
              >
                {DREAM_COMPANIES.map((dc) => (
                  <option key={dc} value={dc}>{dc}</option>
                ))}
              </select>
            </div>
          </div>
        </div>

        {/* Skill Inventory Multiselect */}
        <div className="glass-card p-6 rounded-3xl border border-white/80 space-y-4">
          <h3 className="font-bold text-slate-900 text-sm flex items-center space-x-2">
            <Layers className="w-4 h-4 text-brand-primary" />
            <span>Acquired Skills Inventory</span>
          </h3>

          <div className="flex flex-wrap gap-2 max-h-48 overflow-y-auto pr-2">
            {ALL_SKILLS_LIST.map((skill) => {
              const isSelected = skills.includes(skill);
              return (
                <button
                  key={skill}
                  type="button"
                  onClick={() => toggleSkill(skill)}
                  className={`px-3 py-1.5 rounded-full text-xs font-semibold border transition-all ${
                    isSelected
                      ? 'bg-brand-primary text-white border-brand-primary shadow-sm'
                      : 'bg-slate-50 text-slate-700 border-slate-200 hover:border-slate-300'
                  }`}
                >
                  {skill} {isSelected && '✓'}
                </button>
              );
            })}
          </div>
        </div>

        {/* Learning Parameters */}
        <div className="glass-card p-6 rounded-3xl border border-white/80 space-y-4">
          <h3 className="font-bold text-slate-900 text-sm flex items-center space-x-2">
            <Clock className="w-4 h-4 text-brand-primary" />
            <span>Learning Preferences & Timeline</span>
          </h3>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            <div>
              <label className="block text-xs font-bold text-slate-700 mb-1.5">Skill Level</label>
              <select
                value={skillLevel}
                onChange={(e) => setSkillLevel(e.target.value as SkillLevel)}
                className="w-full p-3 rounded-xl bg-slate-50 border border-slate-200 text-xs"
              >
                <option value="Beginner">Beginner</option>
                <option value="Intermediate">Intermediate</option>
                <option value="Advanced">Advanced</option>
              </select>
            </div>

            <div>
              <label className="block text-xs font-bold text-slate-700 mb-1.5">Weekly Hours</label>
              <select
                value={weeklyHours}
                onChange={(e) => setWeeklyHours(e.target.value as WeeklyHours)}
                className="w-full p-3 rounded-xl bg-slate-50 border border-slate-200 text-xs"
              >
                {WEEKLY_HOURS_LIST.map((h) => (
                  <option key={h} value={h}>{h} hrs/week</option>
                ))}
              </select>
            </div>

            <div>
              <label className="block text-xs font-bold text-slate-700 mb-1.5">Goal Timeline</label>
              <select
                value={timeline}
                onChange={(e) => setTimeline(e.target.value as CareerTimeline)}
                className="w-full p-3 rounded-xl bg-slate-50 border border-slate-200 text-xs"
              >
                {TIMELINES.map((t) => (
                  <option key={t} value={t}>{t}</option>
                ))}
              </select>
            </div>
          </div>
        </div>

        {/* Submit */}
        <div className="flex justify-end">
          <button
            type="submit"
            className="px-8 py-3 rounded-2xl bg-gradient-to-r from-brand-primary via-brand-secondary to-brand-accent text-white font-bold text-xs shadow-glow-primary hover:opacity-95 transition-all flex items-center space-x-2"
          >
            <Sparkles className="w-4 h-4 text-brand-accent" />
            <span>Save Settings & Auto-Regenerate Roadmap</span>
          </button>
        </div>

      </form>

    </div>
  );
};
