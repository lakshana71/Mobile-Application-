import React, { useState } from 'react';
import {
  UploadCloud,
  Code2,
  Globe,
  FolderArchive,
  CheckCircle2,
  Sparkles,
  ShieldCheck,
  Zap,
  Layers,
  FileText,
  Lock,
  Database,
  Terminal,
  Activity,
  Award,
  RefreshCw,
} from 'lucide-react';
import { useApp } from '../../context/AppContext';
import { ProjectSubmissionData } from '../../types';
import confetti from 'canvas-confetti';

export const ProjectAnalysisView: React.FC = () => {
  const { userProfile } = useApp();
  const [githubUrl, setGithubUrl] = useState<string>('https://github.com/student/ecommerce-microservices');
  const [liveUrl, setLiveUrl] = useState<string>('https://shop-demo.vercel.app');
  const [zipFileName, setZipFileName] = useState<string>('');
  const [isAnalyzing, setIsAnalyzing] = useState<boolean>(false);
  const [report, setReport] = useState<ProjectSubmissionData | null>(null);

  const handleSimulateAnalysis = () => {
    setIsAnalyzing(true);
    setReport(null);

    setTimeout(() => {
      const evaluationData: ProjectSubmissionData = {
        githubUrl: githubUrl || undefined,
        liveUrl: liveUrl || undefined,
        zipFileName: zipFileName || undefined,
        scannedFiles: 48,
        evaluations: {
          codeQuality: 88,
          folderStructure: 92,
          technologiesUsed: ['React', 'TypeScript', 'Node.js', 'Express', 'PostgreSQL', 'Docker', 'JWT', 'Redis'],
          apiIntegration: 90,
          databaseUsage: 85,
          authentication: 94,
          securityPractices: 86,
          deploymentReadiness: 91,
          documentation: 82,
          projectComplexity: 89,
          overallProjectScore: 89,
        },
        timestamp: new Date().toLocaleDateString(),
      };

      setReport(evaluationData);
      setIsAnalyzing(false);
      confetti({ particleCount: 80, spread: 70, origin: { y: 0.6 } });
    }, 2200);
  };

  return (
    <div className="p-6 max-w-7xl mx-auto space-y-6">
      {/* Header Banner */}
      <div className="relative rounded-3xl bg-gradient-to-r from-blue-600 via-indigo-600 to-purple-600 p-8 text-white shadow-xl overflow-hidden">
        <div className="absolute top-0 right-0 w-80 h-80 bg-white/10 rounded-full blur-3xl" />
        <div className="relative z-10 space-y-3">
          <div className="inline-flex items-center space-x-2 px-3 py-1 rounded-full bg-white/20 backdrop-blur-md text-xs font-bold uppercase tracking-wider">
            <UploadCloud className="w-3.5 h-3.5 text-cyan-300" />
            <span>Module 2 – AI Project Analysis</span>
          </div>
          <h1 className="text-3xl sm:text-4xl font-black tracking-tight">
            Real-World Project & Repository Audit
          </h1>
          <p className="text-indigo-100 text-sm max-w-2xl leading-relaxed">
            Submit your GitHub repository, ZIP archive, or live URL. SkillSphere AI parses production code quality, security architecture, and system complexity to feed evidence into your Digital Skill Twin (60% weight).
          </p>
        </div>
      </div>

      {/* Submission Inputs Form */}
      <div className="glass-card rounded-3xl p-6 sm:p-8 border border-white/80 space-y-6">
        <h2 className="text-lg font-black text-slate-900 flex items-center space-x-2">
          <Code2 className="w-5 h-5 text-brand-primary" />
          <span>Project Submission Sources</span>
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {/* GitHub Repo Input */}
          <div className="p-5 rounded-2xl bg-white border border-slate-200 space-y-2 shadow-sm">
            <div className="flex items-center space-x-2 text-slate-900 font-bold text-xs">
              <Code2 className="w-4 h-4 text-brand-primary" />
              <span>GitHub Repository URL</span>
            </div>
            <input
              type="text"
              value={githubUrl}
              onChange={(e) => setGithubUrl(e.target.value)}
              placeholder="https://github.com/username/repo"
              className="w-full px-3.5 py-2.5 rounded-xl bg-slate-50 border border-slate-200 text-xs font-medium text-slate-900 focus:outline-none focus:border-brand-primary"
            />
            <span className="text-[10px] text-slate-400 block">Parses directory tree, commits, & syntax</span>
          </div>

          {/* ZIP File Dropzone */}
          <div className="p-5 rounded-2xl bg-white border border-slate-200 space-y-2 shadow-sm">
            <div className="flex items-center space-x-2 text-slate-900 font-bold text-xs">
              <FolderArchive className="w-4 h-4 text-purple-600" />
              <span>ZIP File Archive Upload</span>
            </div>
            <label className="flex flex-col items-center justify-center border-2 border-dashed border-slate-200 hover:border-purple-400 rounded-xl p-2 cursor-pointer bg-slate-50 transition-all">
              <UploadCloud className="w-5 h-5 text-purple-500 mb-1" />
              <span className="text-[11px] font-bold text-slate-700">
                {zipFileName || 'Drop .zip or Click to Select'}
              </span>
              <input
                type="file"
                accept=".zip"
                className="hidden"
                onChange={(e) => setZipFileName(e.target.files?.[0]?.name || '')}
              />
            </label>
            <span className="text-[10px] text-slate-400 block">Supports Node, Python, Java, Go ZIPs</span>
          </div>

          {/* Live Link Input */}
          <div className="p-5 rounded-2xl bg-white border border-slate-200 space-y-2 shadow-sm">
            <div className="flex items-center space-x-2 text-slate-900 font-bold text-xs">
              <Globe className="w-4 h-4 text-emerald-600" />
              <span>Live Project Deployment URL</span>
            </div>
            <input
              type="text"
              value={liveUrl}
              onChange={(e) => setLiveUrl(e.target.value)}
              placeholder="https://my-app.vercel.app"
              className="w-full px-3.5 py-2.5 rounded-xl bg-slate-50 border border-slate-200 text-xs font-medium text-slate-900 focus:outline-none focus:border-emerald-500"
            />
            <span className="text-[10px] text-slate-400 block">Verifies SSL, lighthouse, & API endpoints</span>
          </div>
        </div>

        <div className="pt-2 flex items-center justify-between">
          <div className="text-xs text-slate-500">
            Target Role: <strong>{userProfile.dreamCareer}</strong>
          </div>

          <button
            disabled={isAnalyzing}
            onClick={handleSimulateAnalysis}
            className="px-6 py-3 rounded-2xl bg-gradient-to-r from-brand-primary via-indigo-600 to-purple-600 hover:opacity-95 text-white text-xs font-black shadow-lg shadow-brand-primary/20 flex items-center space-x-2 disabled:opacity-50"
          >
            {isAnalyzing ? (
              <>
                <RefreshCw className="w-4 h-4 animate-spin" />
                <span>Running AI Code & Architecture Audit...</span>
              </>
            ) : (
              <>
                <Sparkles className="w-4 h-4" />
                <span>Analyze Project & Generate Scorecards</span>
              </>
            )}
          </button>
        </div>
      </div>

      {/* Analysis Report View */}
      {report && (
        <div className="glass-card rounded-3xl p-8 border border-white/80 space-y-8 animate-in fade-in zoom-in-95">
          {/* Header Score summary */}
          <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-6 border-b border-slate-200 pb-6">
            <div>
              <div className="inline-flex items-center space-x-2 px-3 py-1 rounded-full bg-blue-100 text-blue-800 text-xs font-bold mb-2">
                <CheckCircle2 className="w-3.5 h-3.5" />
                <span>10-Point AI Audit Complete</span>
              </div>
              <h2 className="text-2xl font-black text-slate-900">Project Quality & Complexity Report</h2>
              <p className="text-xs text-slate-500 mt-1">Scanned {report.scannedFiles} source files across frontend, backend, security, and deployment</p>
            </div>

            <div className="flex items-center space-x-4 bg-slate-900 text-white px-6 py-4 rounded-3xl shadow-xl">
              <div>
                <span className="text-xs uppercase tracking-widest text-slate-400 block font-semibold">Overall Project Score</span>
                <span className="text-4xl font-black text-brand-accent">{report.evaluations.overallProjectScore}%</span>
              </div>
              <Award className="w-10 h-10 text-brand-accent" />
            </div>
          </div>

          {/* 10 Evaluated Parameters Scorecards */}
          <div className="space-y-4">
            <h3 className="font-bold text-slate-900 text-base">10 Evaluation Dimensions</h3>
            <div className="grid grid-cols-2 sm:grid-cols-5 gap-4">
              {[
                { label: 'Code Quality', score: report.evaluations.codeQuality, icon: <Code2 className="w-4 h-4 text-blue-500" /> },
                { label: 'Folder Structure', score: report.evaluations.folderStructure, icon: <Layers className="w-4 h-4 text-indigo-500" /> },
                { label: 'API Integration', score: report.evaluations.apiIntegration, icon: <Zap className="w-4 h-4 text-amber-500" /> },
                { label: 'Database Usage', score: report.evaluations.databaseUsage, icon: <Database className="w-4 h-4 text-emerald-500" /> },
                { label: 'Authentication', score: report.evaluations.authentication, icon: <Lock className="w-4 h-4 text-rose-500" /> },
                { label: 'Security Practices', score: report.evaluations.securityPractices, icon: <ShieldCheck className="w-4 h-4 text-purple-500" /> },
                { label: 'Deployment Readiness', score: report.evaluations.deploymentReadiness, icon: <Globe className="w-4 h-4 text-cyan-500" /> },
                { label: 'Documentation', score: report.evaluations.documentation, icon: <FileText className="w-4 h-4 text-pink-500" /> },
                { label: 'Project Complexity', score: report.evaluations.projectComplexity, icon: <Terminal className="w-4 h-4 text-orange-500" /> },
                { label: 'Production Scale', score: 90, icon: <Activity className="w-4 h-4 text-teal-500" /> },
              ].map((dim) => (
                <div key={dim.label} className="p-4 rounded-2xl bg-white border border-slate-200/80 space-y-2 shadow-sm">
                  <div className="flex items-center justify-between">
                    <span className="text-[10px] font-extrabold uppercase text-slate-400">{dim.label}</span>
                    {dim.icon}
                  </div>
                  <div className="text-2xl font-black text-slate-900">{dim.score}%</div>
                  <div className="w-full bg-slate-100 h-1.5 rounded-full overflow-hidden">
                    <div className="bg-gradient-to-r from-brand-primary to-brand-accent h-full" style={{ width: `${dim.score}%` }} />
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Detected Tech Stack Tags */}
          <div className="p-6 rounded-2xl bg-white/90 border border-slate-200 space-y-3">
            <h3 className="font-bold text-slate-900 text-sm">Detected Technologies & Stack Dependencies</h3>
            <div className="flex flex-wrap gap-2">
              {report.evaluations.technologiesUsed.map((tech) => (
                <span key={tech} className="px-3.5 py-1.5 rounded-xl bg-slate-100 text-slate-800 text-xs font-bold border border-slate-200">
                  ⚡ {tech}
                </span>
              ))}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
