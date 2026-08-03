import React, { useState } from 'react';
import {
  FolderGit2,
  UploadCloud,
  FileCode,
  ShieldCheck,
  Zap,
  Layers,
  Sparkles,
  Download,
  AlertTriangle,
  CheckCircle2,
  ArrowRight,
  Code2,
  RefreshCw,
  FileText,
  Copy,
  Check,
} from 'lucide-react';
import { scanProjectFiles, generateMarkdownReport, FileItem } from '../../services/projectAnalyzerService';
import { ProjectAnalysisReport } from '../../types';

export const ProjectAnalyzerView: React.FC = () => {
  const [analyzing, setAnalyzing] = useState<boolean>(false);
  const [progress, setProgress] = useState<number>(0);
  const [report, setReport] = useState<ProjectAnalysisReport | null>(null);
  const [activeTab, setActiveTab] = useState<'overview' | 'security' | 'performance' | 'architecture' | 'refactoring' | 'innovation'>('overview');
  const [copiedFixId, setCopiedFixId] = useState<string | null>(null);

  // File upload handlers
  const handleFileUpload = async (event: React.ChangeEvent<HTMLInputElement>) => {
    const files = event.target.files;
    if (!files || files.length === 0) return;

    setAnalyzing(true);
    setProgress(20);

    const fileItems: FileItem[] = [];
    const readPromises: Promise<void>[] = [];

    // Process up to 30 files for deep scanning
    const targetFiles = Array.from(files).slice(0, 30);
    
    targetFiles.forEach((file) => {
      readPromises.push(
        new Promise((resolve) => {
          const reader = new FileReader();
          reader.onload = (e) => {
            fileItems.push({
              name: file.name,
              path: (file as any).webkitRelativePath || file.name,
              content: (e.target?.result as string) || '',
              size: file.size,
            });
            resolve();
          };
          reader.readAsText(file);
        })
      );
    });

    await Promise.all(readPromises);
    setProgress(60);

    const firstFolderName = fileItems[0]?.path ? fileItems[0].path.split('/')[0] : 'Uploaded Project';
    const result = await scanProjectFiles(fileItems, firstFolderName);

    setProgress(100);
    setTimeout(() => {
      setReport(result);
      setAnalyzing(false);
    }, 400);
  };

  const handleDemoScan = async () => {
    setAnalyzing(true);
    setProgress(30);

    const demoFiles: FileItem[] = [
      {
        name: 'App.tsx',
        path: 'src/App.tsx',
        content: `import React, { useState, useEffect } from 'react';\n\nexport const App = () => {\n  const [data, setData] = useState([]);\n  const API_KEY = "sk_live_994812348571029384";\n\n  useEffect(() => {\n    window.addEventListener('resize', () => console.log('resized'));\n    fetch('http://api.internal/users?query=' + window.location.search);\n  }, []);\n\n  return (\n    <div onClick={() => { setData([1,2,3]); }}>\n      <div dangerouslySetInnerHTML={{ __html: "<p>User Bio</p>" }} />\n    </div>\n  );\n};`,
      },
      {
        name: 'userController.js',
        path: 'src/controllers/userController.js',
        content: `const db = require('../db');\n\nexports.getUser = (req, res) => {\n  const query = "SELECT * FROM users WHERE id = " + req.query.id;\n  db.query(query, (err, result) => {\n    res.header('Access-Control-Allow-Origin', '*');\n    res.json(result);\n  });\n};`,
      },
    ];

    const result = await scanProjectFiles(demoFiles, 'SkillGap AI Scanner Demo Project');
    setReport(result);
    setAnalyzing(false);
  };

  const downloadMarkdown = () => {
    if (!report) return;
    const mdContent = generateMarkdownReport(report);
    const blob = new Blob([mdContent], { type: 'text/markdown' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `${report.projectName.replace(/\s+/g, '_')}_AI_Report.md`;
    a.click();
    URL.revokeObjectURL(url);
  };

  const handlePrintPDF = () => {
    window.print();
  };

  const copyCodeFix = (fixSnippet: string, id: string) => {
    navigator.clipboard.writeText(fixSnippet);
    setCopiedFixId(id);
    setTimeout(() => setCopiedFixId(null), 2000);
  };

  return (
    <div className="p-6 md:p-8 space-y-8 max-w-7xl mx-auto">
      {/* Header Banner */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 bg-gradient-to-r from-slate-900 via-slate-800 to-indigo-950 p-6 md:p-8 rounded-3xl text-white shadow-xl">
        <div className="space-y-2">
          <div className="inline-flex items-center space-x-2 bg-indigo-500/20 text-indigo-300 border border-indigo-500/30 px-3 py-1 rounded-full text-xs font-semibold">
            <Sparkles className="w-3.5 h-3.5" />
            <span>AI Code Auditor Engine</span>
          </div>
          <h1 className="text-2xl md:text-3xl font-extrabold tracking-tight">AI Project Analyzer</h1>
          <p className="text-slate-300 text-sm max-w-2xl">
            Upload project folders, ZIP archives, or source code files to run recursive vulnerability scanning, memory leak detection, architecture scoring, and AI refactoring.
          </p>
        </div>

        {report && (
          <div className="flex items-center space-x-3">
            <button
              onClick={downloadMarkdown}
              className="px-4 py-2.5 bg-white/10 hover:bg-white/20 border border-white/20 rounded-xl text-xs font-bold flex items-center space-x-2 transition-all"
            >
              <Download className="w-4 h-4 text-cyan-400" />
              <span>Export Markdown</span>
            </button>
            <button
              onClick={handlePrintPDF}
              className="px-4 py-2.5 bg-brand-primary hover:bg-brand-primary/90 rounded-xl text-xs font-bold text-white shadow-lg flex items-center space-x-2 transition-all"
            >
              <FileText className="w-4 h-4" />
              <span>Export PDF / Print</span>
            </button>
          </div>
        )}
      </div>

      {/* Upload Zone */}
      {!report && !analyzing && (
        <div className="glass-card p-10 rounded-3xl border-2 border-dashed border-slate-300/80 hover:border-brand-primary/60 transition-all text-center space-y-6 bg-white/50">
          <div className="w-16 h-16 rounded-2xl bg-indigo-50 flex items-center justify-center mx-auto text-brand-primary shadow-inner">
            <FolderGit2 className="w-8 h-8" />
          </div>

          <div className="space-y-2 max-w-md mx-auto">
            <h3 className="text-lg font-bold text-slate-900">Select Project Folder or Files</h3>
            <p className="text-xs text-slate-500">
              Supports React, React Native, Flutter, Java, Python, C++, Node.js, Express, Django, FastAPI, Spring Boot, .NET, Next.js, Vue
            </p>
          </div>

          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <label className="px-6 py-3 bg-brand-primary hover:bg-brand-primary/90 text-white font-bold text-xs rounded-xl shadow-lg cursor-pointer flex items-center space-x-2 transition-all">
              <UploadCloud className="w-4 h-4" />
              <span>Upload Folder / Files</span>
              <input
                type="file"
                multiple
                // @ts-ignore
                webkitdirectory=""
                directory=""
                className="hidden"
                onChange={handleFileUpload}
              />
            </label>

            <button
              onClick={handleDemoScan}
              className="px-6 py-3 bg-slate-100 hover:bg-slate-200 text-slate-700 font-bold text-xs rounded-xl flex items-center space-x-2 transition-all"
            >
              <RefreshCw className="w-4 h-4 text-slate-500" />
              <span>Run Sample Project Scan</span>
            </button>
          </div>
        </div>
      )}

      {/* Progress Spinner */}
      {analyzing && (
        <div className="glass-card p-12 rounded-3xl text-center space-y-6 max-w-md mx-auto">
          <div className="w-14 h-14 rounded-full border-4 border-brand-primary border-t-transparent animate-spin mx-auto" />
          <div className="space-y-2">
            <h3 className="text-base font-bold text-slate-900">Scanning Project Codebase...</h3>
            <p className="text-xs text-slate-500">Evaluating security AST, memory leaks, component depth & architecture scores.</p>
          </div>
          <div className="w-full bg-slate-100 h-2.5 rounded-full overflow-hidden">
            <div className="bg-brand-primary h-full transition-all duration-300" style={{ width: `${progress}%` }} />
          </div>
        </div>
      )}

      {/* Analysis Report Dashboard */}
      {report && !analyzing && (
        <div className="space-y-8">
          {/* Top Metric Cards */}
          <div className="grid grid-cols-2 md:grid-cols-6 gap-4">
            <div className="glass-card p-4 rounded-2xl text-center border-l-4 border-indigo-500">
              <span className="text-[10px] font-bold uppercase tracking-wider text-slate-400">AI Composite</span>
              <div className="text-2xl font-black text-slate-900 mt-1">{report.overallScores.compositeScore}<span className="text-xs text-slate-400">/100</span></div>
            </div>

            <div className="glass-card p-4 rounded-2xl text-center border-l-4 border-emerald-500">
              <span className="text-[10px] font-bold uppercase tracking-wider text-slate-400">Security Score</span>
              <div className="text-2xl font-black text-emerald-600 mt-1">{report.overallScores.security}%</div>
            </div>

            <div className="glass-card p-4 rounded-2xl text-center border-l-4 border-amber-500">
              <span className="text-[10px] font-bold uppercase tracking-wider text-slate-400">Performance</span>
              <div className="text-2xl font-black text-amber-600 mt-1">{report.overallScores.performance}%</div>
            </div>

            <div className="glass-card p-4 rounded-2xl text-center border-l-4 border-blue-500">
              <span className="text-[10px] font-bold uppercase tracking-wider text-slate-400">Code Quality</span>
              <div className="text-2xl font-black text-blue-600 mt-1">{report.overallScores.codeQuality}%</div>
            </div>

            <div className="glass-card p-4 rounded-2xl text-center border-l-4 border-purple-500">
              <span className="text-[10px] font-bold uppercase tracking-wider text-slate-400">Architecture</span>
              <div className="text-2xl font-black text-purple-600 mt-1">{report.overallScores.architecture}%</div>
            </div>

            <div className="glass-card p-4 rounded-2xl text-center border-l-4 border-pink-500">
              <span className="text-[10px] font-bold uppercase tracking-wider text-slate-400">Innovation</span>
              <div className="text-2xl font-black text-pink-600 mt-1">{report.overallScores.innovation}%</div>
            </div>
          </div>

          {/* Navigation Sub-Tabs */}
          <div className="flex border-b border-slate-200 space-x-4 overflow-x-auto pb-1">
            {[
              { id: 'overview', label: 'Overview', icon: <Layers className="w-4 h-4" /> },
              { id: 'security', label: `Security (${report.securityVulnerabilities.length})`, icon: <ShieldCheck className="w-4 h-4 text-emerald-500" /> },
              { id: 'performance', label: `Performance (${report.performanceIssues.length})`, icon: <Zap className="w-4 h-4 text-amber-500" /> },
              { id: 'architecture', label: 'Architecture', icon: <FolderGit2 className="w-4 h-4 text-purple-500" /> },
              { id: 'refactoring', label: `AI Refactoring (${report.refactoringSuggestions.length})`, icon: <Code2 className="w-4 h-4 text-blue-500" /> },
              { id: 'innovation', label: 'Innovation & UX', icon: <Sparkles className="w-4 h-4 text-pink-500" /> },
            ].map((tab) => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id as any)}
                className={`pb-3 text-xs font-bold flex items-center space-x-2 transition-all border-b-2 whitespace-nowrap px-1 ${
                  activeTab === tab.id
                    ? 'border-brand-primary text-brand-primary'
                    : 'border-transparent text-slate-500 hover:text-slate-900'
                }`}
              >
                {tab.icon}
                <span>{tab.label}</span>
              </button>
            ))}
          </div>

          {/* Tab 1: Overview */}
          {activeTab === 'overview' && (
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div className="glass-card p-6 rounded-3xl space-y-4 md:col-span-2">
                <h3 className="text-base font-bold text-slate-900 flex items-center space-x-2">
                  <FileCode className="w-5 h-5 text-brand-primary" />
                  <span>Project Metadata & Stacks</span>
                </h3>
                <div className="grid grid-cols-2 gap-4 text-xs">
                  <div className="bg-slate-50 p-4 rounded-2xl border border-slate-100">
                    <span className="text-slate-400 font-semibold block">Project Name</span>
                    <span className="font-bold text-slate-800 text-sm">{report.projectName}</span>
                  </div>
                  <div className="bg-slate-50 p-4 rounded-2xl border border-slate-100">
                    <span className="text-slate-400 font-semibold block">Scanned Files</span>
                    <span className="font-bold text-slate-800 text-sm">{report.scannedFilesCount} files</span>
                  </div>
                </div>

                <div className="space-y-3 pt-2">
                  <div>
                    <span className="text-xs font-bold text-slate-500 uppercase tracking-wider block mb-2">Detected Languages</span>
                    <div className="flex flex-wrap gap-2">
                      {report.detectedLanguages.map((lang) => (
                        <span key={lang} className="px-3 py-1 bg-indigo-50 text-indigo-700 font-bold text-xs rounded-lg border border-indigo-100">
                          {lang}
                        </span>
                      ))}
                    </div>
                  </div>

                  <div>
                    <span className="text-xs font-bold text-slate-500 uppercase tracking-wider block mb-2">Frameworks & Libraries</span>
                    <div className="flex flex-wrap gap-2">
                      {report.detectedFrameworks.map((fw) => (
                        <span key={fw} className="px-3 py-1 bg-purple-50 text-purple-700 font-bold text-xs rounded-lg border border-purple-100">
                          {fw}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>
              </div>

              <div className="glass-card p-6 rounded-3xl space-y-4">
                <h3 className="text-base font-bold text-slate-900">Code Quality Rating</h3>
                <div className="space-y-3 text-xs">
                  <div className="flex justify-between items-center p-3 bg-slate-50 rounded-xl">
                    <span className="font-medium text-slate-600">Maintainability</span>
                    <span className="font-bold text-emerald-600">{report.codeQualitySummary.maintainability}</span>
                  </div>
                  <div className="flex justify-between items-center p-3 bg-slate-50 rounded-xl">
                    <span className="font-medium text-slate-600">Readability</span>
                    <span className="font-bold text-blue-600">{report.codeQualitySummary.readability}</span>
                  </div>
                  <div className="flex justify-between items-center p-3 bg-slate-50 rounded-xl">
                    <span className="font-medium text-slate-600">Modularity</span>
                    <span className="font-bold text-indigo-600">{report.codeQualitySummary.modularity}</span>
                  </div>
                  <div className="flex justify-between items-center p-3 bg-slate-50 rounded-xl">
                    <span className="font-medium text-slate-600">Scalability</span>
                    <span className="font-bold text-purple-600">{report.codeQualitySummary.scalability}</span>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* Tab 2: Security */}
          {activeTab === 'security' && (
            <div className="space-y-4">
              {report.securityVulnerabilities.map((vuln) => (
                <div key={vuln.id} className="glass-card p-6 rounded-3xl border-l-4 border-rose-500 space-y-4">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-3">
                      <span className={`px-2.5 py-1 rounded-md text-[10px] font-extrabold uppercase ${
                        vuln.severity === 'Critical' ? 'bg-rose-100 text-rose-700' :
                        vuln.severity === 'High' ? 'bg-amber-100 text-amber-700' : 'bg-blue-100 text-blue-700'
                      }`}>
                        {vuln.severity}
                      </span>
                      <h4 className="font-bold text-slate-900 text-sm">{vuln.type}</h4>
                    </div>
                    <span className="text-xs font-mono text-slate-400 bg-slate-100 px-2.5 py-1 rounded-md">{vuln.filePath}</span>
                  </div>

                  <p className="text-xs text-slate-600">{vuln.explanation}</p>

                  <div className="bg-slate-900 text-slate-200 rounded-2xl p-4 font-mono text-xs space-y-2 relative">
                    <div className="flex justify-between items-center text-slate-400 text-[10px] uppercase font-bold border-b border-slate-800 pb-2">
                      <span>AI Fix Recommendation</span>
                      <button
                        onClick={() => copyCodeFix(vuln.aiFixSnippet, vuln.id)}
                        className="flex items-center space-x-1 hover:text-white transition-colors"
                      >
                        {copiedFixId === vuln.id ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Copy className="w-3.5 h-3.5" />}
                        <span>{copiedFixId === vuln.id ? 'Copied' : 'Copy Snippet'}</span>
                      </button>
                    </div>
                    <pre className="overflow-x-auto text-emerald-400 pt-1">{vuln.aiFixSnippet}</pre>
                  </div>
                </div>
              ))}
            </div>
          )}

          {/* Tab 3: Performance */}
          {activeTab === 'performance' && (
            <div className="space-y-4">
              {report.performanceIssues.map((perf) => (
                <div key={perf.id} className="glass-card p-6 rounded-3xl border-l-4 border-amber-500 space-y-3">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-3">
                      <Zap className="w-4 h-4 text-amber-500" />
                      <h4 className="font-bold text-slate-900 text-sm">{perf.category}</h4>
                    </div>
                    <span className="text-xs font-mono text-slate-400 bg-slate-100 px-2.5 py-1 rounded-md">{perf.filePath}</span>
                  </div>

                  <p className="text-xs text-slate-600">{perf.description}</p>
                  <div className="p-3 bg-amber-50 rounded-xl text-amber-900 text-xs font-medium border border-amber-100">
                    <strong>AI Recommendation:</strong> {perf.suggestion}
                  </div>
                </div>
              ))}
            </div>
          )}

          {/* Tab 4: Architecture */}
          {activeTab === 'architecture' && (
            <div className="glass-card p-6 rounded-3xl space-y-6">
              <div>
                <h3 className="text-base font-bold text-slate-900 mb-2">Architecture & Structure Summary</h3>
                <p className="text-xs text-slate-600 leading-relaxed">{report.architectureReview.summary}</p>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-3">
                  <h4 className="text-xs font-bold text-emerald-600 uppercase tracking-wider flex items-center space-x-1.5">
                    <CheckCircle2 className="w-4 h-4" />
                    <span>Architectural Positives</span>
                  </h4>
                  <div className="space-y-2">
                    {report.architectureReview.positives.map((pos, idx) => (
                      <div key={idx} className="p-3 bg-emerald-50 text-emerald-900 rounded-xl text-xs font-medium border border-emerald-100">
                        {pos}
                      </div>
                    ))}
                  </div>
                </div>

                <div className="space-y-3">
                  <h4 className="text-xs font-bold text-amber-600 uppercase tracking-wider flex items-center space-x-1.5">
                    <AlertTriangle className="w-4 h-4" />
                    <span>Recommended Structural Fixes</span>
                  </h4>
                  <div className="space-y-2">
                    {report.architectureReview.improvements.map((imp, idx) => (
                      <div key={idx} className="p-3 bg-amber-50 text-amber-900 rounded-xl text-xs font-medium border border-amber-100">
                        {imp}
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* Tab 5: AI Refactoring */}
          {activeTab === 'refactoring' && (
            <div className="space-y-4">
              {report.refactoringSuggestions.map((ref) => (
                <div key={ref.id} className="glass-card p-6 rounded-3xl space-y-3">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-2">
                      <Code2 className="w-4 h-4 text-blue-500" />
                      <h4 className="font-bold text-slate-900 text-sm">{ref.codeSmell}</h4>
                    </div>
                    <span className="text-xs font-mono text-slate-400 bg-slate-100 px-2.5 py-1 rounded-md">{ref.filePath}</span>
                  </div>

                  <p className="text-xs text-slate-600">{ref.explanation}</p>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-xs font-mono">
                    {ref.beforeSnippet && (
                      <div className="bg-rose-50 border border-rose-200 text-rose-900 p-3 rounded-xl space-y-1">
                        <span className="text-[10px] font-bold uppercase text-rose-600 block">Current Issue Pattern</span>
                        <p>{ref.beforeSnippet}</p>
                      </div>
                    )}

                    {ref.afterSnippet && (
                      <div className="bg-emerald-50 border border-emerald-200 text-emerald-900 p-3 rounded-xl space-y-1">
                        <span className="text-[10px] font-bold uppercase text-emerald-600 block">Refactored Pattern</span>
                        <p>{ref.afterSnippet}</p>
                      </div>
                    )}
                  </div>
                </div>
              ))}
            </div>
          )}

          {/* Tab 6: Innovation & UX */}
          {activeTab === 'innovation' && (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="glass-card p-6 rounded-3xl space-y-4">
                <h3 className="text-base font-bold text-slate-900 flex items-center space-x-2">
                  <Sparkles className="w-5 h-5 text-pink-500" />
                  <span>AI Upgrade Opportunities</span>
                </h3>
                <div className="space-y-2">
                  {report.innovationAnalysis.aiOpportunities.map((op, idx) => (
                    <div key={idx} className="p-3 bg-pink-50 text-pink-900 rounded-xl text-xs font-medium border border-pink-100 flex items-start space-x-2">
                      <ArrowRight className="w-4 h-4 text-pink-500 flex-shrink-0 mt-0.5" />
                      <span>{op}</span>
                    </div>
                  ))}
                </div>
              </div>

              <div className="glass-card p-6 rounded-3xl space-y-4">
                <h3 className="text-base font-bold text-slate-900 flex items-center space-x-2">
                  <Layers className="w-5 h-5 text-indigo-500" />
                  <span>Missing Features & UX Enhancements</span>
                </h3>
                <div className="space-y-2">
                  {report.innovationAnalysis.missingFeatures.map((feat, idx) => (
                    <div key={idx} className="p-3 bg-indigo-50 text-indigo-900 rounded-xl text-xs font-medium border border-indigo-100 flex items-start space-x-2">
                      <ArrowRight className="w-4 h-4 text-indigo-500 flex-shrink-0 mt-0.5" />
                      <span>{feat}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          )}

          {/* Reset Scan Button */}
          <div className="pt-4 text-center">
            <button
              onClick={() => setReport(null)}
              className="px-6 py-2.5 bg-slate-100 hover:bg-slate-200 text-slate-700 font-bold text-xs rounded-xl transition-all"
            >
              Scan Another Project
            </button>
          </div>
        </div>
      )}
    </div>
  );
};
