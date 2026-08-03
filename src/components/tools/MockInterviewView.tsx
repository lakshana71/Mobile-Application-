import React, { useState } from 'react';
import { Mic, Volume2, Sparkles, CheckCircle2, Play, ChevronRight, Award, RefreshCcw } from 'lucide-react';
import { useApp } from '../../context/AppContext';
import { MOCK_INTERVIEW_QUESTIONS } from '../../data/careerData';

export const MockInterviewView: React.FC = () => {
  const { userProfile } = useApp();
  const [currentIdx, setCurrentIdx] = useState(0);
  const [userAnswer, setUserAnswer] = useState('');
  const [evaluated, setEvaluated] = useState(false);
  const [isRecording, setIsRecording] = useState(false);

  const q = MOCK_INTERVIEW_QUESTIONS[currentIdx] || MOCK_INTERVIEW_QUESTIONS[0];

  const handleEvaluate = () => {
    setEvaluated(true);
  };

  const handleNext = () => {
    setEvaluated(false);
    setUserAnswer('');
    setCurrentIdx((prev) => (prev + 1) % MOCK_INTERVIEW_QUESTIONS.length);
  };

  return (
    <div className="p-6 max-w-4xl mx-auto space-y-6">
      
      {/* Header */}
      <div className="glass-card p-6 rounded-3xl border border-white/80 space-y-2">
        <div className="flex items-center space-x-2 text-brand-primary">
          <Mic className="w-5 h-5" />
          <span className="text-xs font-bold uppercase tracking-wider">AI Voice & Technical Interview Simulator</span>
        </div>
        <h1 className="text-2xl font-extrabold text-slate-900">
          Target Role Mock Technical Interview: <span className="gradient-text">{userProfile.dreamCareer}</span>
        </h1>
        <p className="text-xs text-slate-500">
          Practice answering real technical questions asked by hiring managers at {userProfile.dreamCompany || 'top tech firms'}.
        </p>
      </div>

      {/* Question Card */}
      <div className="glass-card p-8 rounded-3xl border border-white/80 space-y-4">
        <div className="flex items-center justify-between">
          <span className="px-3 py-1 rounded-full bg-brand-primary/10 text-brand-primary text-xs font-extrabold uppercase">
            Question {currentIdx + 1} of {MOCK_INTERVIEW_QUESTIONS.length} • {q.category}
          </span>
          <span className="text-xs font-bold text-slate-400">{q.difficulty} Level</span>
        </div>

        <h2 className="text-xl font-bold text-slate-900 leading-snug">{q.question}</h2>

        {/* Answer Box */}
        <div className="space-y-3">
          <div className="flex items-center justify-between text-xs text-slate-500">
            <span>Type or speak your answer:</span>
            <button
              onClick={() => setIsRecording(!isRecording)}
              className={`px-3 py-1 rounded-full text-xs font-bold flex items-center space-x-1 transition-all ${
                isRecording ? 'bg-rose-500 text-white animate-pulse' : 'bg-slate-100 text-slate-700 hover:bg-slate-200'
              }`}
            >
              <Mic className="w-3.5 h-3.5" />
              <span>{isRecording ? 'Listening...' : 'Voice Record'}</span>
            </button>
          </div>

          <textarea
            value={userAnswer}
            onChange={(e) => setUserAnswer(e.target.value)}
            placeholder="Structure your answer using STAR framework (Situation, Task, Action, Result)..."
            className="w-full p-4 rounded-2xl bg-white border border-slate-200 text-xs text-slate-900 focus:outline-none focus:ring-2 focus:ring-brand-primary h-36"
          />
        </div>

        {!evaluated ? (
          <button
            onClick={handleEvaluate}
            disabled={!userAnswer.trim()}
            className="px-6 py-3 rounded-xl bg-brand-primary text-white text-xs font-bold shadow-md hover:bg-indigo-600 disabled:opacity-50 transition-all flex items-center space-x-2"
          >
            <Sparkles className="w-4 h-4 text-brand-accent" />
            <span>Evaluate Answer with AI</span>
          </button>
        ) : (
          /* Feedback Card */
          <div className="p-6 rounded-2xl bg-emerald-50/60 border border-emerald-200 space-y-4 animate-in fade-in duration-200">
            <div className="flex items-center justify-between">
              <span className="font-extrabold text-emerald-800 text-sm flex items-center space-x-1.5">
                <CheckCircle2 className="w-4 h-4 text-emerald-600" />
                <span>AI Feedback Score: 92/100</span>
              </span>
              <span className="text-xs text-emerald-700 font-semibold">Strong Technical Clarity</span>
            </div>

            <div className="space-y-2 text-xs text-slate-700">
              <div className="font-bold text-slate-900">Sample Ideal Answer benchmark:</div>
              <p className="p-3 rounded-xl bg-white/80 border border-emerald-200 italic">{q.sampleAnswer}</p>
            </div>

            <div className="pt-2 flex justify-end">
              <button
                onClick={handleNext}
                className="px-5 py-2.5 rounded-xl bg-brand-primary text-white text-xs font-bold hover:bg-indigo-600 flex items-center space-x-1"
              >
                <span>Next Question</span>
                <ChevronRight className="w-4 h-4" />
              </button>
            </div>
          </div>
        )}
      </div>

    </div>
  );
};
