import React, { useState, useEffect } from 'react';
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
  ShieldAlert,
  BrainCircuit,
  Target,
  FileSearch,
} from 'lucide-react';
import { useApp } from '../../context/AppContext';
import { DREAM_COMPANIES, DREAM_CAREERS } from '../../data/careerData';
import confetti from 'canvas-confetti';

export const PracticalAssessmentView: React.FC = () => {
  const {
    userProfile,
    activeSession,
    startAdaptiveSession,
    submitAdaptiveAnswer,
    resetAdaptiveSession,
    evaluatedSkills,
    setActiveTab,
  } = useApp();

  const [selectedCompany, setSelectedCompany] = useState<string>(userProfile.dreamCompany || 'Company A');
  const [selectedRole, setSelectedRole] = useState<string>(userProfile.dreamCareer || 'Software Engineer');
  const [selectedOption, setSelectedOption] = useState<number | string | null>(null);
  const [lastEvalResult, setLastEvalResult] = useState<any | null>(null);
  const [isEvaluating, setIsEvaluating] = useState<boolean>(false);

  // Initialize adaptive session if none active
  useEffect(() => {
    if (!activeSession) {
      startAdaptiveSession(selectedCompany, selectedRole);
    }
  }, [selectedCompany, selectedRole]);

  const handleSelectOption = (opt: number | string) => {
    setSelectedOption(opt);
  };

  const handleSubmitAnswer = () => {
    if (selectedOption === null || !activeSession || !activeSession.currentQuestion) return;

    setIsEvaluating(true);
    setTimeout(() => {
      const res = submitAdaptiveAnswer(selectedOption);
      setLastEvalResult(res);
      setSelectedOption(null);
      setIsEvaluating(false);
    }, 500);
  };

  const handleRetake = () => {
    setLastEvalResult(null);
    setSelectedOption(null);
    startAdaptiveSession(selectedCompany, selectedRole);
  };

  const currentQuestion = activeSession?.currentQuestion;
  const isComplete = activeSession?.isComplete;

  return (
    <div className="p-6 max-w-7xl mx-auto space-y-6">
      {/* Header Banner */}
      <div className="relative rounded-3xl bg-gradient-to-r from-purple-600 via-indigo-600 to-brand-primary p-8 text-white shadow-xl overflow-hidden">
        <div className="absolute top-0 right-0 w-80 h-80 bg-white/10 rounded-full blur-3xl" />
        <div className="relative z-10 space-y-3">
          <div className="inline-flex items-center space-x-2 px-3 py-1 rounded-full bg-white/20 backdrop-blur-md text-xs font-bold uppercase tracking-wider">
            <BrainCircuit className="w-3.5 h-3.5 text-pink-300" />
            <span>Module 1 – Adaptive Skill Intelligence Engine</span>
          </div>
          <h1 className="text-3xl sm:text-4xl font-black tracking-tight">
            Evidence-Driven Adaptive Assessment
          </h1>
          <p className="text-indigo-100 text-sm max-w-2xl leading-relaxed">
            Questions are generated dynamically based on your target company (<strong>{selectedCompany}</strong>), job role (<strong>{selectedRole}</strong>), project evidence, and real-time uncertainty. Questions never repeat.
          </p>
        </div>
      </div>

      {/* Target Selector Bar */}
      <div className="glass-card rounded-2xl p-4 border border-white/80 flex flex-col md:flex-row items-center justify-between gap-4">
        <div className="flex flex-wrap items-center gap-3">
          <span className="text-xs font-bold text-slate-700 uppercase tracking-wider">Target Company:</span>
          <select
            value={selectedCompany}
            onChange={(e) => {
              setSelectedCompany(e.target.value);
              resetAdaptiveSession();
            }}
            className="px-3 py-1.5 rounded-xl border border-slate-300 bg-white text-xs font-bold text-slate-800 shadow-sm focus:ring-2 focus:ring-brand-primary focus:outline-none"
          >
            {DREAM_COMPANIES.map((c) => (
              <option key={c} value={c}>
                {c}
              </option>
            ))}
          </select>

          <span className="text-xs font-bold text-slate-700 uppercase tracking-wider ml-2">Target Role:</span>
          <select
            value={selectedRole}
            onChange={(e) => {
              setSelectedRole(e.target.value);
              resetAdaptiveSession();
            }}
            className="px-3 py-1.5 rounded-xl border border-slate-300 bg-white text-xs font-bold text-slate-800 shadow-sm focus:ring-2 focus:ring-brand-primary focus:outline-none"
          >
            {DREAM_CAREERS.map((r) => (
              <option key={r} value={r}>
                {r}
              </option>
            ))}
          </select>
        </div>

        <button
          onClick={handleRetake}
          className="px-4 py-1.5 rounded-xl bg-purple-100 text-purple-700 hover:bg-purple-200 text-xs font-bold transition-all flex items-center space-x-1.5"
        >
          <RefreshCw className="w-3.5 h-3.5" />
          <span>New Adaptive Assessment</span>
        </button>
      </div>

      {/* Assessment Main Runner */}
      {!isComplete && currentQuestion ? (
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Active Question Box */}
          <div className="lg:col-span-2 glass-card rounded-3xl p-6 sm:p-8 border border-white/80 space-y-6">
            {/* Header badges */}
            <div className="flex items-center justify-between border-b border-slate-200 pb-4">
              <div className="flex items-center space-x-3">
                <div className="w-10 h-10 rounded-2xl bg-purple-500/10 text-purple-600 flex items-center justify-center font-bold">
                  {currentQuestion.questionType === 'Project-specific' ? (
                    <FileSearch className="w-5 h-5 text-indigo-600" />
                  ) : currentQuestion.questionType === 'Debugging' ? (
                    <Bug className="w-5 h-5" />
                  ) : (
                    <BrainCircuit className="w-5 h-5" />
                  )}
                </div>
                <div>
                  <div className="flex items-center space-x-2">
                    <span className="text-[10px] font-extrabold uppercase tracking-wider text-purple-600">
                      Question {(activeSession?.questionsAnswered || 0) + 1} of Dynamic Assessment
                    </span>
                    <span className="px-2 py-0.5 rounded bg-purple-100 text-purple-800 text-[10px] font-bold">
                      {currentQuestion.questionType}
                    </span>
                  </div>
                  <h3 className="text-base font-bold text-slate-900">{currentQuestion.subSkill}</h3>
                </div>
              </div>

              <div className="text-right">
                <span className="px-3 py-1 rounded-full bg-slate-100 text-slate-700 text-xs font-bold block">
                  {currentQuestion.difficulty}
                </span>
                {currentQuestion.projectReference && (
                  <span className="text-[10px] text-indigo-600 font-semibold mt-1 block">
                    Verified from: {currentQuestion.projectReference}
                  </span>
                )}
              </div>
            </div>

            {/* Question Prompt */}
            <p className="text-sm font-semibold text-slate-800 leading-relaxed">
              {currentQuestion.question}
            </p>

            {/* Optional Code Snippet */}
            {currentQuestion.codeSnippet && (
              <div className="rounded-2xl bg-slate-900 p-4 text-emerald-400 font-mono text-xs overflow-x-auto border border-slate-800 shadow-inner">
                <pre>{currentQuestion.codeSnippet}</pre>
              </div>
            )}

            {/* Answer Options */}
            <div className="space-y-3 pt-2">
              {currentQuestion.options ? (
                currentQuestion.options.map((opt: string, optIdx: number) => {
                  const isSelected = selectedOption === optIdx;
                  return (
                    <button
                      key={optIdx}
                      disabled={isEvaluating}
                      onClick={() => handleSelectOption(optIdx)}
                      className={`w-full p-4 rounded-2xl text-left text-xs sm:text-sm font-medium border transition-all flex items-center justify-between ${
                        isSelected
                          ? 'bg-purple-50 border-purple-500 text-purple-900 font-bold ring-2 ring-purple-500/20'
                          : 'bg-white/80 border-slate-200 hover:border-purple-300 text-slate-700'
                      }`}
                    >
                      <span>{opt}</span>
                      <div
                        className={`w-5 h-5 rounded-full border flex items-center justify-center transition-all ${
                          isSelected ? 'border-purple-600 bg-purple-600 text-white' : 'border-slate-300'
                        }`}
                      >
                        {isSelected && <CheckCircle2 className="w-3.5 h-3.5" />}
                      </div>
                    </button>
                  );
                })
              ) : (
                <textarea
                  rows={3}
                  placeholder="Type your explanation or answer..."
                  value={String(selectedOption || '')}
                  onChange={(e) => handleSelectOption(e.target.value)}
                  className="w-full p-4 rounded-2xl text-xs sm:text-sm border border-slate-200 focus:ring-2 focus:ring-purple-500 focus:outline-none"
                />
              )}
            </div>


            {/* Last Answer Feedback Banner */}
            {lastEvalResult && (
              <div
                className={`p-4 rounded-2xl text-xs font-semibold border ${
                  lastEvalResult.correctness > 0.5
                    ? 'bg-emerald-50 border-emerald-200 text-emerald-900'
                    : 'bg-amber-50 border-amber-200 text-amber-900'
                }`}
              >
                <div className="font-bold flex items-center space-x-1.5 mb-1">
                  <Sparkles className="w-4 h-4 text-brand-primary" />
                  <span>AI Real-Time Answer Analysis:</span>
                </div>
                <p>{lastEvalResult.feedback}</p>
              </div>
            )}

            {/* Action Bar */}
            <div className="pt-4 flex items-center justify-between border-t border-slate-200">
              <span className="text-xs font-semibold text-slate-500">
                Evaluating Skill: <strong>{currentQuestion.skill}</strong>
              </span>

              <button
                disabled={selectedOption === null || isEvaluating}
                onClick={handleSubmitAnswer}
                className="px-6 py-2.5 rounded-xl bg-gradient-to-r from-purple-600 to-indigo-600 hover:from-purple-700 hover:to-indigo-700 text-white text-xs font-bold shadow-lg disabled:opacity-40 flex items-center space-x-2 transition-all"
              >
                <span>{isEvaluating ? 'Analyzing Response...' : 'Submit & Determine Next Question'}</span>
                <ArrowRight className="w-4 h-4" />
              </button>
            </div>
          </div>

          {/* Assessment Tracker Side Panel */}
          <div className="glass-card rounded-3xl p-6 border border-white/80 space-y-5">
            <h3 className="font-bold text-slate-900 text-base flex items-center justify-between">
              <span>Dynamic Engine Status</span>
              <Sparkles className="w-4 h-4 text-purple-600" />
            </h3>

            <div className="space-y-3">
              <div className="p-3 rounded-2xl bg-purple-50/70 border border-purple-100 space-y-1">
                <span className="text-[10px] uppercase font-bold text-purple-700 block">Questions Answered</span>
                <span className="text-2xl font-black text-purple-900">{activeSession?.questionsAnswered || 0}</span>
                <span className="text-[11px] text-purple-600 block">Targeting {selectedCompany} standard</span>
              </div>

              <div className="p-3 rounded-2xl bg-indigo-50/70 border border-indigo-100 space-y-1">
                <span className="text-[10px] uppercase font-bold text-indigo-700 block font-sans">Target Confidence</span>
                <span className="text-2xl font-black text-indigo-900">{activeSession?.targetConfidenceThreshold}%</span>
                <span className="text-[11px] text-indigo-600 block">Stops dynamically when met</span>
              </div>
            </div>

            {/* Currently Evaluated Skills List */}
            <div className="space-y-2 pt-2 border-t border-slate-200">
              <span className="text-xs font-bold text-slate-700 uppercase tracking-wider block">Skill Confidence Matrix:</span>
              <div className="space-y-2 max-h-56 overflow-y-auto pr-1">
                {Object.values(activeSession?.evaluatedSkills || {}).map((item: any) => (
                  <div key={item.skill} className="p-2.5 rounded-xl bg-slate-50 border border-slate-200 text-xs space-y-1">
                    <div className="flex justify-between font-bold text-slate-800">
                      <span>{item.skill}</span>
                      <span className="text-purple-600">{item.confidence}% Conf.</span>
                    </div>
                    <div className="w-full bg-slate-200 h-1.5 rounded-full overflow-hidden">
                      <div className="bg-purple-600 h-full" style={{ width: `${item.confidence}%` }} />
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      ) : (
        /* Results Report Screen */
        <div className="glass-card rounded-3xl p-8 border border-white/80 space-y-8 animate-in fade-in zoom-in-95">
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 border-b border-slate-200 pb-6">
            <div>
              <div className="inline-flex items-center space-x-2 px-3 py-1 rounded-full bg-emerald-100 text-emerald-800 text-xs font-bold mb-2">
                <CheckCircle2 className="w-3.5 h-3.5" />
                <span>Assessment Completed</span>
              </div>
              <h2 className="text-2xl font-black text-slate-900">
                Evidence Profile for {selectedRole} @ {selectedCompany}
              </h2>
              <p className="text-xs text-slate-500 mt-1">{activeSession?.completionReason}</p>
            </div>

            <button
              onClick={handleRetake}
              className="px-6 py-3 rounded-2xl bg-gradient-to-r from-purple-600 to-indigo-600 text-white text-xs font-bold shadow-lg hover:shadow-xl flex items-center space-x-2"
            >
              <RefreshCw className="w-4 h-4" />
              <span>Retake Adaptive Assessment</span>
            </button>
          </div>

          {/* Detections & Verified Skills Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Confirmed Strengths vs Gaps */}
            <div className="p-6 rounded-2xl bg-white/90 border border-slate-200 space-y-4">
              <h3 className="font-bold text-slate-900 text-sm flex items-center space-x-2">
                <Award className="w-4 h-4 text-purple-600" />
                <span>Evidence-Based Skill Profile</span>
              </h3>

              <div className="space-y-3">
                {Object.values(evaluatedSkills).map((item: any) => (
                  <div key={item.skill} className="p-3 rounded-xl bg-slate-50 border border-slate-200 text-xs space-y-1">
                    <div className="flex justify-between font-bold text-slate-800">
                      <span>{item.skill}</span>
                      <span>Level: <strong className="text-brand-primary">{item.level}%</strong> | Conf: <strong className="text-purple-600">{item.confidence}%</strong></span>
                    </div>
                    <div className="w-full bg-slate-200 h-2 rounded-full overflow-hidden">
                      <div className="bg-gradient-to-r from-purple-500 to-indigo-600 h-full" style={{ width: `${item.level}%` }} />
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* False Proficiency & Hidden Skill Audit */}
            <div className="p-6 rounded-2xl bg-white/90 border border-slate-200 space-y-5">
              <h3 className="font-bold text-slate-900 text-sm flex items-center space-x-2">
                <BrainCircuit className="w-4 h-4 text-brand-primary" />
                <span>AI Proficiency Audit Highlights</span>
              </h3>

              <div className="space-y-4">
                <div>
                  <span className="text-xs font-bold text-rose-700 uppercase tracking-wider block mb-1.5 flex items-center space-x-1">
                    <ShieldAlert className="w-3.5 h-3.5" />
                    <span>False Proficiency Detections ({activeSession?.detectedFalseProficiencies.length || 0})</span>
                  </span>
                  {activeSession?.detectedFalseProficiencies && activeSession.detectedFalseProficiencies.length > 0 ? (
                    activeSession.detectedFalseProficiencies.map((fp: string) => (
                      <div key={fp} className="p-3 rounded-xl bg-rose-50 border border-rose-200 text-rose-800 text-xs font-semibold">
                        ⚠️ <strong>{fp}</strong>: Self-reported proficiency exceeds demonstrated assessment evidence.
                      </div>
                    ))
                  ) : (
                    <span className="text-xs text-slate-500 italic">No false proficiencies detected. Declarations matched performance!</span>
                  )}
                </div>

                <div>
                  <span className="text-xs font-bold text-emerald-700 uppercase tracking-wider block mb-1.5 flex items-center space-x-1">
                    <Sparkles className="w-3.5 h-3.5" />
                    <span>Discovered Hidden Skills ({activeSession?.detectedHiddenSkills.length || 0})</span>
                  </span>
                  {activeSession?.detectedHiddenSkills && activeSession.detectedHiddenSkills.length > 0 ? (
                    activeSession.detectedHiddenSkills.map((hs: string) => (
                      <div key={hs} className="p-3 rounded-xl bg-emerald-50 border border-emerald-200 text-emerald-800 text-xs font-semibold">
                        ✨ <strong>{hs}</strong>: Demonstrated capability exceeds initial self-reported expectations!
                      </div>
                    ))
                  ) : (
                    <span className="text-xs text-slate-500 italic">Self-reported skill declarations accurately reflected ability.</span>
                  )}
                </div>
              </div>
            </div>
          </div>


          {/* Action links */}
          <div className="flex items-center justify-between pt-4 border-t border-slate-200">
            <div className="text-xs font-semibold text-slate-500">
              Skill gaps and roadmap priorities updated automatically.
            </div>

            <button
              onClick={() => setActiveTab('roadmap')}
              className="px-6 py-2.5 rounded-xl bg-brand-primary text-white text-xs font-bold hover:bg-brand-primary/90 flex items-center space-x-1.5 shadow-md"
            >
              <span>View Updated Career Roadmap</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>
        </div>
      )}
    </div>
  );
};
