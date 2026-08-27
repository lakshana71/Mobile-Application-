import React, { useState } from 'react';
import { BrainCircuit, Sparkles, Send, MessageSquare, ArrowRight, Bot, Zap, CheckCircle2 } from 'lucide-react';
import { useApp } from '../../context/AppContext';
import { buildDigitalTwin } from '../../utils/digitalTwin';

export const AIShadowMentorView: React.FC = () => {
  const { userProfile, roadmap, score360, mentorMessages, sendMentorMessage } = useApp();
  const digitalTwin = buildDigitalTwin(userProfile, roadmap, score360);
  const [inputText, setInputText] = useState<string>('');

  const handleSend = () => {
    if (!inputText.trim()) return;
    sendMentorMessage(inputText);
    setInputText('');
  };

  const samplePrompts = [
    'Strengthen backend development through a REST API project.',
    'Your React skills have improved. Next, explore Next.js.',
    'Networking skills are declining—complete a refresher challenge.',
  ];

  return (
    <div className="p-6 max-w-7xl mx-auto space-y-6">
      {/* Holographic Header Banner */}
      <div className="relative rounded-3xl bg-gradient-to-r from-slate-900 via-indigo-950 to-slate-950 p-8 text-white shadow-xl overflow-hidden border border-brand-primary/30">
        <div className="absolute top-0 right-0 w-96 h-96 bg-brand-primary/20 rounded-full blur-3xl" />
        <div className="relative z-10 flex flex-col md:flex-row md:items-center justify-between gap-6">
          <div className="space-y-3">
            <div className="inline-flex items-center space-x-2 px-3 py-1 rounded-full bg-brand-accent/20 border border-brand-accent/40 text-brand-accent text-xs font-bold uppercase tracking-wider">
              <BrainCircuit className="w-3.5 h-3.5 animate-pulse" />
              <span>Module 6 – AI Shadow Mentor</span>
            </div>
            <h1 className="text-3xl sm:text-4xl font-black tracking-tight text-white">
              Holographic Career Shadow Assistant
            </h1>
            <p className="text-slate-300 text-sm max-w-2xl leading-relaxed">
              Continuously inspecting your Practical Assessments, Project Analysis Reports, Skill Genome, and Skill Evolution to synthesize personalized guidance cards.
            </p>
          </div>

          {/* Holographic AI Avatar Badge */}
          <div className="glass-card-dark p-6 rounded-3xl border border-brand-accent/40 text-center min-w-[220px] shadow-glow-primary">
            <div className="w-16 h-16 rounded-full bg-gradient-to-tr from-brand-primary via-brand-secondary to-brand-accent mx-auto flex items-center justify-center border-2 border-white/40 mb-2">
              <Bot className="w-9 h-9 text-white animate-bounce" style={{ animationDuration: '3s' }} />
            </div>
            <span className="text-xs font-extrabold text-brand-accent uppercase tracking-widest block">Shadow Mentor AI</span>
            <span className="text-[10px] text-emerald-400 font-semibold flex items-center justify-center space-x-1 mt-1">
              <span className="w-2 h-2 rounded-full bg-emerald-400 animate-ping" />
              <span>Monitoring Digital Twin</span>
            </span>
          </div>
        </div>
      </div>

      {/* Main Split View: Insight Cards & Chat Engine */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Left Column: Conversational Insight Cards */}
        <div className="space-y-4">
          <h3 className="font-bold text-slate-900 text-base flex items-center space-x-2">
            <Sparkles className="w-4 h-4 text-brand-primary" />
            <span>AI Shadow Insight Cards</span>
          </h3>

          <div className="space-y-3">
            {digitalTwin.mentorInsights.map((insight) => (
              <div key={insight.id} className="glass-card rounded-2xl p-5 border border-white/80 space-y-2 shadow-sm hover:shadow-md transition-all">
                <div className="flex items-center justify-between">
                  <span className="text-xs font-bold text-slate-900">{insight.title}</span>
                  <span className={`px-2 py-0.5 rounded text-[10px] font-extrabold uppercase ${
                    insight.priority === 'High' ? 'bg-rose-100 text-rose-700' : 'bg-brand-primary/10 text-brand-primary'
                  }`}>
                    {insight.priority} Priority
                  </span>
                </div>
                <p className="text-xs text-slate-600 leading-relaxed">{insight.insight}</p>
                <div className="pt-2 border-t border-slate-100 text-xs font-bold text-brand-primary flex items-center space-x-1">
                  <Zap className="w-3.5 h-3.5 text-amber-500" />
                  <span>{insight.recommendation}</span>
                </div>
              </div>
            ))}

            {/* Prompt Quick Starters */}
            <div className="pt-2 space-y-2">
              <span className="text-[11px] font-bold uppercase tracking-wider text-slate-400 block">Recommended Action Prompts</span>
              {samplePrompts.map((prompt) => (
                <button
                  key={prompt}
                  onClick={() => sendMentorMessage(prompt)}
                  className="w-full text-left p-3 rounded-xl bg-slate-50 border border-slate-200 text-xs font-semibold text-slate-700 hover:bg-brand-primary hover:text-white hover:border-brand-primary transition-all flex items-center justify-between"
                >
                  <span className="line-clamp-1">{prompt}</span>
                  <ArrowRight className="w-3.5 h-3.5 flex-shrink-0 ml-2" />
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* Right Column: Conversational AI Mentor Chat */}
        <div className="lg:col-span-2 glass-card rounded-3xl p-6 border border-white/80 flex flex-col justify-between min-h-[520px]">
          <div>
            <div className="flex items-center justify-between border-b border-slate-200 pb-4 mb-4">
              <div className="flex items-center space-x-3">
                <div className="w-9 h-9 rounded-xl bg-brand-primary text-white flex items-center justify-center font-bold">
                  <Bot className="w-5 h-5" />
                </div>
                <div>
                  <h3 className="font-bold text-slate-900 text-sm">Interactive Mentor Dialogue</h3>
                  <span className="text-[10px] text-slate-400">Contextual response based on your Digital Skill Twin</span>
                </div>
              </div>
            </div>

            {/* Message Stream */}
            <div className="space-y-4 max-h-[360px] overflow-y-auto pr-2">
              {mentorMessages.map((msg) => (
                <div
                  key={msg.id}
                  className={`flex ${msg.sender === 'user' ? 'justify-end' : 'justify-start'}`}
                >
                  <div
                    className={`max-w-xl p-4 rounded-2xl text-xs sm:text-sm leading-relaxed ${
                      msg.sender === 'user'
                        ? 'bg-brand-primary text-white font-medium rounded-br-none shadow-md'
                        : 'bg-white border border-slate-200 text-slate-800 rounded-bl-none shadow-sm space-y-2'
                    }`}
                  >
                    <p>{msg.text}</p>
                    {msg.suggestedActions && (
                      <div className="pt-2 flex flex-wrap gap-2">
                        {msg.suggestedActions.map((act) => (
                          <button
                            key={act}
                            onClick={() => sendMentorMessage(act)}
                            className="px-2.5 py-1 rounded-lg bg-brand-primary/10 text-brand-primary text-[10px] font-bold hover:bg-brand-primary hover:text-white transition-all"
                          >
                            {act}
                          </button>
                        ))}
                      </div>
                    )}
                    <span className={`block text-[9px] mt-1 ${msg.sender === 'user' ? 'text-indigo-200' : 'text-slate-400'}`}>
                      {msg.timestamp}
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Input Box */}
          <div className="pt-4 border-t border-slate-200 flex items-center space-x-3">
            <input
              type="text"
              value={inputText}
              onChange={(e) => setInputText(e.target.value)}
              onKeyDown={(e) => e.key === 'Enter' && handleSend()}
              placeholder="Ask your AI Shadow Mentor about skill gaps, project ideas, or career strategy..."
              className="flex-1 px-4 py-3 rounded-xl bg-slate-100 border border-transparent text-xs font-medium text-slate-900 focus:outline-none focus:bg-white focus:border-brand-primary"
            />
            <button
              onClick={handleSend}
              className="p-3 rounded-xl bg-brand-primary hover:bg-indigo-600 text-white shadow-md transition-all"
            >
              <Send className="w-4 h-4" />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
