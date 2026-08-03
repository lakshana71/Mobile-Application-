import React from 'react';
import { User, Mail, GraduationCap, Calendar, Briefcase, Building2, Flame, Award, Layers } from 'lucide-react';
import { useApp } from '../../context/AppContext';

export const ProfileView: React.FC = () => {
  const { userProfile, score360 } = useApp();

  return (
    <div className="p-6 max-w-4xl mx-auto space-y-6">
      
      {/* Card */}
      <div className="glass-card p-8 rounded-3xl border border-white/80 space-y-6">
        <div className="flex flex-col sm:flex-row items-center space-y-4 sm:space-y-0 sm:space-x-6 pb-6 border-b border-slate-200">
          <img
            src={userProfile.avatarUrl}
            alt="Avatar"
            className="w-24 h-24 rounded-full object-cover border-4 border-white shadow-xl"
          />
          <div className="text-center sm:text-left space-y-1">
            <h1 className="text-2xl font-extrabold text-slate-900">{userProfile.name}</h1>
            <p className="text-xs text-slate-500">{userProfile.email}</p>
            <div className="pt-2 flex flex-wrap justify-center sm:justify-start gap-2">
              <span className="px-3 py-1 rounded-full bg-brand-primary text-white text-xs font-bold">
                {userProfile.dreamCareer}
              </span>
              <span className="px-3 py-1 rounded-full bg-amber-100 text-amber-700 text-xs font-bold flex items-center space-x-1">
                <Flame className="w-3.5 h-3.5" />
                <span>{userProfile.streakDays} Day Streak</span>
              </span>
            </div>
          </div>
        </div>

        {/* Profile Attributes */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs">
          <div className="p-4 rounded-2xl bg-slate-50 border border-slate-200 space-y-1">
            <span className="text-slate-400 font-semibold block">Education & Year</span>
            <span className="font-bold text-slate-900">{userProfile.education} • {userProfile.currentYear}</span>
          </div>

          <div className="p-4 rounded-2xl bg-slate-50 border border-slate-200 space-y-1">
            <span className="text-slate-400 font-semibold block">Dream Company</span>
            <span className="font-bold text-slate-900">{userProfile.dreamCompany}</span>
          </div>

          <div className="p-4 rounded-2xl bg-slate-50 border border-slate-200 space-y-1">
            <span className="text-slate-400 font-semibold block">Weekly Hours & Timeline</span>
            <span className="font-bold text-slate-900">{userProfile.weeklyHours} hrs/week • Goal: {userProfile.timeline}</span>
          </div>

          <div className="p-4 rounded-2xl bg-slate-50 border border-slate-200 space-y-1">
            <span className="text-slate-400 font-semibold block">360° Readiness Score</span>
            <span className="font-bold text-brand-primary text-sm">{score360.overallScore}/100</span>
          </div>
        </div>

        {/* Current Skills list */}
        <div className="space-y-2">
          <h3 className="font-bold text-slate-900 text-sm">Acquired Technical & Soft Skills</h3>
          <div className="flex flex-wrap gap-2">
            {userProfile.currentSkills.map((sk) => (
              <span key={sk} className="px-3 py-1 rounded-full bg-brand-primary/10 text-brand-primary text-xs font-semibold">
                {sk}
              </span>
            ))}
          </div>
        </div>

      </div>

    </div>
  );
};
