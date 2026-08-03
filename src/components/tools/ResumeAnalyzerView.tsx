import React, { useState } from 'react';
import { UploadCloud, FileText, CheckCircle2, AlertTriangle, Sparkles, ArrowRight, ShieldCheck } from 'lucide-react';
import { useApp } from '../../context/AppContext';

export const ResumeAnalyzerView: React.FC = () => {
  const { userProfile } = useApp();
  const [analyzed, setAnalyzed] = useState(false);
  const [fileName, setFileName] = useState('');

  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      setFileName(e.target.files[0].name);
      setTimeout(() => setAnalyzed(true), 800);
    }
  };

  const handleSimulate = () => {
    setFileName('Alex_Johnson_Resume_2026.pdf');
    setTimeout(() => setAnalyzed(true), 800);
  };

  return (
    <div className="p-6 max-w-5xl mx-auto space-y-6">
      
      {/* Header */}
      <div className="glass-card p-6 rounded-3xl border border-white/80 space-y-2">
        <div className="flex items-center space-x-2 text-brand-primary">
          <FileText className="w-5 h-5" />
          <span className="text-xs font-bold uppercase tracking-wider">AI Resume & ATS Matcher</span>
        </div>
        <h1 className="text-2xl font-extrabold text-slate-900">
          Target Role Resume Audit: <span className="gradient-text">{userProfile.dreamCareer}</span>
        </h1>
        <p className="text-xs text-slate-500">
          Simulate ATS screening parsers used by {userProfile.dreamCompany || 'tech leaders'} to check keyword density and bullet point impact.
        </p>
      </div>

      {/* Upload Zone */}
      {!analyzed ? (
        <div className="glass-card p-12 rounded-3xl border-2 border-dashed border-brand-primary/30 text-center space-y-4">
          <div className="w-16 h-16 rounded-3xl bg-brand-primary/10 mx-auto flex items-center justify-center text-brand-primary">
            <UploadCloud className="w-8 h-8" />
          </div>
          <div>
            <h3 className="font-bold text-slate-900 text-lg">Upload Your PDF / DOCX Resume</h3>
            <p className="text-xs text-slate-500 max-w-md mx-auto mt-1">
              Drag & drop your resume file here or use sample template simulation.
            </p>
          </div>

          <div className="flex items-center justify-center space-x-4">
            <label className="px-6 py-3 rounded-xl bg-brand-primary text-white text-xs font-bold cursor-pointer hover:bg-indigo-600 transition-all">
              <span>Choose Resume File</span>
              <input type="file" onChange={handleFileUpload} accept=".pdf,.docx" className="hidden" />
            </label>

            <button
              onClick={handleSimulate}
              className="px-6 py-3 rounded-xl border border-slate-300 text-slate-700 text-xs font-semibold hover:bg-slate-100 transition-all"
            >
              Simulate Sample Analysis
            </button>
          </div>
        </div>
      ) : (
        /* Results View */
        <div className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            
            {/* ATS Score Card */}
            <div className="glass-card p-6 rounded-3xl border border-white/80 text-center space-y-3">
              <span className="text-xs text-slate-400 font-bold uppercase tracking-wider">ATS Overall Match</span>
              <div className="text-5xl font-black text-brand-primary">82<span className="text-lg text-slate-400 font-normal">/100</span></div>
              <div className="inline-flex items-center space-x-1 px-3 py-1 rounded-full bg-emerald-100 text-emerald-700 text-xs font-bold">
                <CheckCircle2 className="w-3.5 h-3.5" />
                <span>Interview Ready</span>
              </div>
              <p className="text-xs text-slate-500">Target role fit for {userProfile.dreamCareer}</p>
            </div>

            {/* Keyword Density Audit */}
            <div className="md:col-span-2 glass-card p-6 rounded-3xl border border-white/80 space-y-4">
              <h3 className="font-bold text-slate-900 text-sm">Target Keyword Coverage Audit</h3>
              <div className="grid grid-cols-2 gap-3">
                {[
                  { name: 'Python & Data Structures', present: true },
                  { name: 'System Design Principles', present: true },
                  { name: 'PyTorch / Neural Nets', present: false },
                  { name: 'Docker / Containerization', present: true },
                  { name: 'CI/CD Automated Pipelines', present: false },
                  { name: 'SQL & Database Indexing', present: true },
                ].map((kw) => (
                  <div key={kw.name} className="p-3 rounded-xl bg-slate-50 border border-slate-200 flex items-center justify-between text-xs">
                    <span className="font-semibold text-slate-800">{kw.name}</span>
                    {kw.present ? (
                      <span className="text-emerald-600 font-bold flex items-center space-x-1">
                        <CheckCircle2 className="w-3.5 h-3.5" />
                        <span>Found</span>
                      </span>
                    ) : (
                      <span className="text-rose-500 font-bold flex items-center space-x-1">
                        <AlertTriangle className="w-3.5 h-3.5" />
                        <span>Missing</span>
                      </span>
                    )}
                  </div>
                ))}
              </div>
            </div>

          </div>

          <button
            onClick={() => setAnalyzed(false)}
            className="px-4 py-2 rounded-xl border border-slate-300 text-xs font-semibold hover:bg-slate-100"
          >
            Re-upload Different File
          </button>
        </div>
      )}

    </div>
  );
};
