import React, { useState } from 'react';
import {
  FileCode,
  CheckCircle2,
  AlertCircle,
  Sparkles,
  Award,
  BarChart2,
  RefreshCw,
  ArrowRight,
  Code2,
  Bug,
  HelpCircle,
  Activity,
  Layers,
} from 'lucide-react';
import { useApp } from '../../context/AppContext';
import { PracticalAssessmentTask, AssessmentTaskType, PracticalAssessmentResult } from '../../types';
import confetti from 'canvas-confetti';

const CAREER_PATHS = [
  'Full Stack Developer',
  'AI Engineer',
  'Cybersecurity Analyst',
  'Data Scientist',
];

const MOCK_TASKS: Record<string, PracticalAssessmentTask[]> = {
  'Full Stack Developer': [
    {
      id: 'fs-1',
      title: 'REST API Authentication Debugging',
      type: 'debugging',
      category: 'Backend Security',
      difficulty: 'Intermediate',
      question: 'Identify the security vulnerability in this JWT token validation middleware function:',
      codeSnippet: `app.use((req, res, next) => {\n  const token = req.headers['authorization'];\n  if (!token) return res.sendStatus(401);\n  const payload = jwt.decode(token); // Decoding without verifying signature!\n  req.user = payload;\n  next();\n});`,
      options: [
        'The middleware missing CORS headers',
        'Decoding the token using jwt.decode() instead of verifying signature with jwt.verify()',
        'Using authorization headers instead of query parameters',
        'Not converting payload to JSON string',
      ],
      correctAnswer: 1,
      explanation: 'jwt.decode() only decodes payload without verifying signature, allowing attackers to forge arbitrary user claims.',
    },
    {
      id: 'fs-2',
      title: 'React State Synchronization Simulation',
      type: 'coding',
      category: 'Frontend Performance',
      difficulty: 'Intermediate',
      question: 'Which Hook pattern prevents unnecessary re-renders when passing callbacks to child components?',
      options: [
        'useMemo() wrapping component',
        'useCallback() wrapping event handler functions',
        'useEffect() with empty dependency array',
        'useRef() for storing state',
      ],
      correctAnswer: 1,
      explanation: 'useCallback returns a memoized version of the callback that only changes if one of the dependencies has changed.',
    },
    {
      id: 'fs-3',
      title: 'Database Indexing & Query Optimization',
      type: 'scenario',
      category: 'Database Management',
      difficulty: 'Advanced',
      question: 'Your SQL query selecting users by email takes 4.2 seconds on 2M rows. What is the immediate recommended action?',
      options: [
        'Upgrade database instance RAM',
        'Create a B-Tree index on the email column',
        'Convert table to NoSQL MongoDB',
        'Split database into 4 shards',
      ],
      correctAnswer: 1,
      explanation: 'Creating a B-Tree index on frequently queried filter columns reduces lookup time from O(N) full table scan to O(log N).',
    },
    {
      id: 'fs-4',
      title: 'Microservice API Gateway Resilience',
      type: 'simulation',
      category: 'System Architecture',
      difficulty: 'Advanced',
      question: 'To prevent cascading failures when a downstream payment service slows down, which pattern should be applied?',
      options: [
        'Retry Loop without backoff',
        'Circuit Breaker Pattern',
        'Round-Robin load balancing',
        'Synchronous HTTP Polling',
      ],
      correctAnswer: 1,
      explanation: 'The Circuit Breaker pattern trips open under high failure/latency rates to return fallbacks instantly without overwhelming downstream services.',
    },
  ],
  'AI Engineer': [
    {
      id: 'ai-1',
      title: 'LLM Prompt Injection Mitigation',
      type: 'debugging',
      category: 'AI Security',
      difficulty: 'Intermediate',
      question: 'How do you safeguard RAG applications against prompt injection attacks via untrusted user inputs?',
      options: [
        'Use longer system prompts',
        'Sanitize inputs, implement strict system instruction boundaries, and use secondary guardrail evaluators',
        'Store embeddings in MySQL instead of Vector DB',
        'Disable context window logging',
      ],
      correctAnswer: 1,
      explanation: 'Strict input sanitization, delimiter isolation, and guardrail models catch malicious prompt overrides effectively.',
    },
    {
      id: 'ai-2',
      title: 'Vector Search Cosine Similarity',
      type: 'coding',
      category: 'Vector Embeddings',
      difficulty: 'Advanced',
      question: 'What mathematical property makes Normalized Vector Dot Product equivalent to Cosine Similarity?',
      options: [
        'Vectors have unit length (magnitude = 1.0)',
        'Vectors are orthogonal to each other',
        'Vectors are zero-centered',
        'Vectors have positive eigenvalues',
      ],
      correctAnswer: 0,
      explanation: 'When vectors are L2 normalized to magnitude 1.0, their dot product directly equals their cosine similarity.',
    },
  ],
  'Cybersecurity Analyst': [
    {
      id: 'sec-1',
      title: 'SQL Injection Remediation',
      type: 'debugging',
      category: 'AppSec',
      difficulty: 'Intermediate',
      question: 'Which code implementation completely eliminates SQL Injection risks?',
      codeSnippet: `// Option A: db.query("SELECT * FROM users WHERE name = '" + input + "'");\n// Option B: db.query("SELECT * FROM users WHERE name = ?", [input]);`,
      options: [
        'Option A (String Concatenation)',
        'Option B (Parameterized Statements / Prepared Queries)',
        'Escaping single quotes manually with regex',
        'Encoding inputs with Base64',
      ],
      correctAnswer: 1,
      explanation: 'Prepared statements separate SQL code logic from data inputs, rendering injected SQL instructions inert.',
    },
  ],
  'Data Scientist': [
    {
      id: 'ds-1',
      title: 'Machine Learning Overfitting Diagnosis',
      type: 'quiz',
      category: 'ML Fundamentals',
      difficulty: 'Intermediate',
      question: 'Your Decision Tree model achieves 99.8% accuracy on training data but 62.1% on test data. What is happening?',
      options: [
        'Underfitting due to low model capacity',
        'Overfitting due to high variance; regularize tree depth or cross-validate',
        'Data drift in test set',
        'Imbalanced target labels',
      ],
      correctAnswer: 1,
      explanation: 'High training accuracy combined with low test accuracy indicates high variance and overfitting.',
    },
  ],
};

export const PracticalAssessmentView: React.FC = () => {
  const { userProfile } = useApp();
  const [selectedCareer, setSelectedCareer] = useState<string>(userProfile.dreamCareer || 'Full Stack Developer');
  const [currentTaskIdx, setCurrentTaskIdx] = useState<number>(0);
  const [selectedAnswers, setSelectedAnswers] = useState<Record<string, number>>({});
  const [isSubmitted, setIsSubmitted] = useState<boolean>(false);
  const [assessmentResult, setAssessmentResult] = useState<PracticalAssessmentResult | null>(null);

  const tasks = MOCK_TASKS[selectedCareer] || MOCK_TASKS['Full Stack Developer'];
  const currentTask = tasks[currentTaskIdx];

  const handleSelectOption = (taskIdx: number, optionIdx: number) => {
    if (isSubmitted) return;
    setSelectedAnswers((prev) => ({ ...prev, [taskIdx]: optionIdx }));
  };

  const handleCalculateResults = () => {
    let correct = 0;
    tasks.forEach((t, idx) => {
      if (selectedAnswers[idx] === t.correctAnswer) {
        correct++;
      }
    });

    const score = Math.round((correct / tasks.length) * 100);

    const result: PracticalAssessmentResult = {
      completed: true,
      score,
      totalQuestions: tasks.length,
      correctCount: correct,
      skillWisePerformance: [
        { skill: 'Practical Coding', score: Math.min(100, score + 5) },
        { skill: 'Debugging & Remediation', score: Math.max(40, score - 5) },
        { skill: 'System Architecture', score: Math.min(95, score + 2) },
        { skill: 'Security Best Practices', score: Math.max(50, score - 8) },
      ],
      strengths: score > 70 ? ['Algorithmic Reasoning', 'State Management', 'Architecture Patterns'] : ['Core Logic Syntax', 'Concept Awareness'],
      weakAreas: score > 70 ? ['Edge-case Sanitization', 'Deep Memory Optimization'] : ['JWT Security Verification', 'B-Tree Indexing'],
      timestamp: new Date().toLocaleDateString(),
    };

    setAssessmentResult(result);
    setIsSubmitted(true);

    if (score >= 70) {
      confetti({ particleCount: 70, spread: 70, origin: { y: 0.6 } });
    }
  };

  const handleReset = () => {
    setCurrentTaskIdx(0);
    setSelectedAnswers({});
    setIsSubmitted(false);
    setAssessmentResult(null);
  };

  return (
    <div className="p-6 max-w-7xl mx-auto space-y-6">
      {/* Header Banner */}
      <div className="relative rounded-3xl bg-gradient-to-r from-purple-600 via-indigo-600 to-brand-primary p-8 text-white shadow-xl overflow-hidden">
        <div className="absolute top-0 right-0 w-80 h-80 bg-white/10 rounded-full blur-3xl" />
        <div className="relative z-10 space-y-3">
          <div className="inline-flex items-center space-x-2 px-3 py-1 rounded-full bg-white/20 backdrop-blur-md text-xs font-bold uppercase tracking-wider">
            <FileCode className="w-3.5 h-3.5 text-pink-300" />
            <span>Module 1 – Practical Assessment</span>
          </div>
          <h1 className="text-3xl sm:text-4xl font-black tracking-tight">
            Hands-On Skills Evaluation
          </h1>
          <p className="text-indigo-100 text-sm max-w-2xl leading-relaxed">
            SkillSphere AI discovers what you can actually build and debug through hands-on challenges, scenario simulations, and code audits rather than static self-declarations.
          </p>
        </div>
      </div>

      {/* Career Path Selection Pills */}
      <div className="glass-card rounded-2xl p-4 border border-white/80 flex flex-wrap items-center gap-3">
        <span className="text-xs font-bold text-slate-700 uppercase tracking-wider mr-2">Select Career Path:</span>
        {CAREER_PATHS.map((path) => (
          <button
            key={path}
            onClick={() => {
              setSelectedCareer(path);
              handleReset();
            }}
            className={`px-4 py-2 rounded-xl text-xs font-bold transition-all ${
              selectedCareer === path
                ? 'bg-brand-primary text-white shadow-md shadow-brand-primary/20 scale-105'
                : 'bg-slate-100 hover:bg-slate-200 text-slate-700'
            }`}
          >
            {path}
          </button>
        ))}
      </div>

      {/* Assessment Body */}
      {!isSubmitted ? (
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Main Task Runner */}
          <div className="lg:col-span-2 glass-card rounded-3xl p-6 sm:p-8 border border-white/80 space-y-6">
            {/* Task Header & Types */}
            <div className="flex items-center justify-between border-b border-slate-200 pb-4">
              <div className="flex items-center space-x-3">
                <div className="w-10 h-10 rounded-2xl bg-purple-500/10 text-purple-600 flex items-center justify-center font-bold">
                  {currentTask.type === 'coding' && <Code2 className="w-5 h-5" />}
                  {currentTask.type === 'debugging' && <Bug className="w-5 h-5" />}
                  {currentTask.type === 'scenario' && <Layers className="w-5 h-5" />}
                  {currentTask.type === 'simulation' && <Activity className="w-5 h-5" />}
                  {currentTask.type === 'quiz' && <HelpCircle className="w-5 h-5" />}
                </div>
                <div>
                  <span className="text-[10px] font-extrabold uppercase tracking-wider text-purple-600">
                    Task {currentTaskIdx + 1} of {tasks.length} • {currentTask.type.toUpperCase()}
                  </span>
                  <h3 className="text-base font-bold text-slate-900">{currentTask.title}</h3>
                </div>
              </div>

              <span className="px-3 py-1 rounded-full bg-slate-100 text-slate-700 text-xs font-semibold">
                {currentTask.difficulty}
              </span>
            </div>

            {/* Question Text */}
            <p className="text-sm font-semibold text-slate-800 leading-relaxed">
              {currentTask.question}
            </p>

            {/* Code Snippet Box if available */}
            {currentTask.codeSnippet && (
              <div className="rounded-2xl bg-slate-900 p-4 text-emerald-400 font-mono text-xs overflow-x-auto border border-slate-800 shadow-inner">
                <pre>{currentTask.codeSnippet}</pre>
              </div>
            )}

            {/* Multiple Choice Options */}
            <div className="space-y-3 pt-2">
              {currentTask.options?.map((opt, optIdx) => {
                const isSelected = selectedAnswers[currentTaskIdx] === optIdx;
                return (
                  <button
                    key={optIdx}
                    onClick={() => handleSelectOption(currentTaskIdx, optIdx)}
                    className={`w-full p-4 rounded-2xl text-left text-xs sm:text-sm font-medium border transition-all flex items-center justify-between ${
                      isSelected
                        ? 'bg-purple-50 border-purple-500 text-purple-900 font-bold shadow-sm ring-2 ring-purple-500/20'
                        : 'bg-white/80 border-slate-200 hover:border-purple-300 text-slate-700'
                    }`}
                  >
                    <span>{opt}</span>
                    <div className={`w-5 h-5 rounded-full border flex items-center justify-center transition-all ${
                      isSelected ? 'border-purple-600 bg-purple-600 text-white' : 'border-slate-300'
                    }`}>
                      {isSelected && <CheckCircle2 className="w-3.5 h-3.5" />}
                    </div>
                  </button>
                );
              })}
            </div>

            {/* Step Navigation Controls */}
            <div className="pt-4 flex items-center justify-between border-t border-slate-200">
              <button
                disabled={currentTaskIdx === 0}
                onClick={() => setCurrentTaskIdx((prev) => Math.max(0, prev - 1))}
                className="px-4 py-2 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-700 text-xs font-bold disabled:opacity-40"
              >
                Previous Task
              </button>

              {currentTaskIdx < tasks.length - 1 ? (
                <button
                  onClick={() => setCurrentTaskIdx((prev) => Math.min(tasks.length - 1, prev + 1))}
                  className="px-5 py-2.5 rounded-xl bg-purple-600 hover:bg-purple-700 text-white text-xs font-bold shadow-md flex items-center space-x-1.5"
                >
                  <span>Next Challenge</span>
                  <ArrowRight className="w-4 h-4" />
                </button>
              ) : (
                <button
                  onClick={handleCalculateResults}
                  className="px-6 py-2.5 rounded-xl bg-gradient-to-r from-emerald-600 to-teal-600 hover:from-emerald-700 hover:to-teal-700 text-white text-xs font-bold shadow-lg flex items-center space-x-2"
                >
                  <Sparkles className="w-4 h-4" />
                  <span>Generate AI Assessment Score</span>
                </button>
              )}
            </div>
          </div>

          {/* Assessment Side Drawer */}
          <div className="glass-card rounded-3xl p-6 border border-white/80 space-y-5">
            <h3 className="font-bold text-slate-900 text-base">Assessment Tracker</h3>
            <p className="text-xs text-slate-500">
              Completing this practical evaluation updates your <strong>Digital Skill Twin</strong> score and feeds directly into the AI Skill Gap Engine.
            </p>

            <div className="space-y-2.5">
              {tasks.map((t, idx) => {
                const isAnswered = selectedAnswers[idx] !== undefined;
                const isCurrent = currentTaskIdx === idx;
                return (
                  <button
                    key={t.id}
                    onClick={() => setCurrentTaskIdx(idx)}
                    className={`w-full p-3 rounded-2xl border text-left text-xs font-semibold transition-all flex items-center justify-between ${
                      isCurrent
                        ? 'bg-purple-600 text-white border-purple-600 shadow-md'
                        : isAnswered
                        ? 'bg-emerald-50 border-emerald-200 text-emerald-800'
                        : 'bg-slate-50 border-slate-200 text-slate-600 hover:bg-slate-100'
                    }`}
                  >
                    <span>{idx + 1}. {t.title}</span>
                    <span className="text-[10px] uppercase font-bold px-2 py-0.5 rounded bg-white/20">
                      {isAnswered ? 'Done' : 'Pending'}
                    </span>
                  </button>
                );
              })}
            </div>
          </div>
        </div>
      ) : (
        /* Results Report Screen */
        assessmentResult && (
          <div className="glass-card rounded-3xl p-8 border border-white/80 space-y-8 animate-in fade-in zoom-in-95">
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 border-b border-slate-200 pb-6">
              <div>
                <div className="inline-flex items-center space-x-2 px-3 py-1 rounded-full bg-emerald-100 text-emerald-800 text-xs font-bold mb-2">
                  <CheckCircle2 className="w-3.5 h-3.5" />
                  <span>Evaluation Completed</span>
                </div>
                <h2 className="text-2xl font-black text-slate-900">AI Assessment Report for {selectedCareer}</h2>
                <p className="text-xs text-slate-500 mt-1">Generated based on evidence-based practical execution</p>
              </div>

              <div className="flex items-center space-x-4 bg-slate-900 text-white px-6 py-4 rounded-3xl shadow-xl">
                <div>
                  <span className="text-xs uppercase tracking-widest text-slate-400 block font-semibold">Overall Score</span>
                  <span className="text-4xl font-black text-brand-accent">{assessmentResult.score}%</span>
                </div>
                <Award className="w-10 h-10 text-brand-accent" />
              </div>
            </div>

            {/* Performance Breakdown Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {/* Skill Wise Performance */}
              <div className="p-6 rounded-2xl bg-white/90 border border-slate-200 space-y-4">
                <h3 className="font-bold text-slate-900 text-sm flex items-center space-x-2">
                  <BarChart2 className="w-4 h-4 text-purple-600" />
                  <span>Skill-Wise Performance Breakdown</span>
                </h3>
                <div className="space-y-3">
                  {assessmentResult.skillWisePerformance.map((item) => (
                    <div key={item.skill} className="space-y-1">
                      <div className="flex justify-between text-xs font-semibold text-slate-700">
                        <span>{item.skill}</span>
                        <span className="font-bold text-purple-600">{item.score}%</span>
                      </div>
                      <div className="w-full bg-slate-100 h-2 rounded-full overflow-hidden">
                        <div className="bg-gradient-to-r from-purple-500 to-indigo-600 h-full" style={{ width: `${item.score}%` }} />
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Strengths & Weak Areas */}
              <div className="p-6 rounded-2xl bg-white/90 border border-slate-200 space-y-4">
                <h3 className="font-bold text-slate-900 text-sm flex items-center space-x-2">
                  <Sparkles className="w-4 h-4 text-brand-primary" />
                  <span>AI Discovered Strengths & Weak Areas</span>
                </h3>

                <div className="space-y-3">
                  <div>
                    <span className="text-xs font-bold text-emerald-700 uppercase tracking-wider block mb-1.5">Key Strengths</span>
                    <div className="flex flex-wrap gap-2">
                      {assessmentResult.strengths.map((str) => (
                        <span key={str} className="px-3 py-1 rounded-xl bg-emerald-50 text-emerald-800 border border-emerald-200 text-xs font-bold">
                          ✓ {str}
                        </span>
                      ))}
                    </div>
                  </div>

                  <div className="pt-2">
                    <span className="text-xs font-bold text-rose-700 uppercase tracking-wider block mb-1.5">Weak Areas for Growth</span>
                    <div className="flex flex-wrap gap-2">
                      {assessmentResult.weakAreas.map((w) => (
                        <span key={w} className="px-3 py-1 rounded-xl bg-rose-50 text-rose-800 border border-rose-200 text-xs font-bold">
                          ⚠ {w}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Action buttons */}
            <div className="flex items-center justify-between pt-4 border-t border-slate-200">
              <button
                onClick={handleReset}
                className="px-5 py-2.5 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-700 text-xs font-bold flex items-center space-x-2"
              >
                <RefreshCw className="w-4 h-4" />
                <span>Retake Practical Assessment</span>
              </button>

              <div className="text-xs font-semibold text-slate-500">
                Synced into <strong>Skill Gap Engine (40% Weight)</strong>
              </div>
            </div>
          </div>
        )
      )}
    </div>
  );
};
