import React, { useState } from 'react';
import { Send, BrainCircuit, Sparkles, User, Bot, Lightbulb, Compass, ArrowRight } from 'lucide-react';
import { useApp } from '../../context/AppContext';

export const MentorChatView: React.FC = () => {
  const { mentorMessages, sendMentorMessage, userProfile } = useApp();
  const [inputText, setInputText] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!inputText.trim()) return;

    sendMentorMessage(inputText);
    setInputText('');
  };

  return (
    <div className="p-6 max-w-4xl mx-auto h-[calc(100vh-100px)] flex flex-col space-y-4">
      
      {/* Header */}
      <div className="glass-card p-4 rounded-2xl border border-white/80 flex items-center justify-between flex-shrink-0">
        <div className="flex items-center space-x-3">
          <div className="w-10 h-10 rounded-2xl bg-gradient-to-tr from-brand-primary via-brand-secondary to-brand-accent flex items-center justify-center shadow-glow-primary">
            <BrainCircuit className="w-6 h-6 text-white" />
          </div>
          <div>
            <h2 className="font-bold text-slate-900 text-base flex items-center space-x-2">
              <span>Agentic AI Mentor</span>
              <span className="px-2 py-0.5 rounded-full bg-brand-primary/10 text-brand-primary text-[10px] font-extrabold uppercase">
                Active context: {userProfile.dreamCareer}
              </span>
            </h2>
            <p className="text-xs text-slate-500">Intelligent career advisory tuned to your target company & skill gaps</p>
          </div>
        </div>
      </div>

      {/* Messages Stream */}
      <div className="flex-1 glass-card p-6 rounded-3xl border border-white/80 overflow-y-auto space-y-4">
        {mentorMessages.map((msg) => {
          const isUser = msg.sender === 'user';
          return (
            <div key={msg.id} className={`flex items-start space-x-3 ${isUser ? 'flex-row-reverse space-x-reverse' : ''}`}>
              <div
                className={`w-8 h-8 rounded-xl flex items-center justify-center flex-shrink-0 text-white shadow-sm ${
                  isUser ? 'bg-slate-800' : 'bg-gradient-to-tr from-brand-primary to-brand-accent'
                }`}
              >
                {isUser ? <User className="w-4 h-4" /> : <Bot className="w-4 h-4" />}
              </div>

              <div className={`max-w-lg space-y-2 ${isUser ? 'items-end text-right' : ''}`}>
                <div
                  className={`p-4 rounded-2xl text-xs leading-relaxed ${
                    isUser
                      ? 'bg-brand-primary text-white font-medium rounded-tr-none'
                      : 'bg-white/90 border border-slate-200 text-slate-800 rounded-tl-none shadow-sm'
                  }`}
                >
                  {msg.text}
                </div>

                <span className="text-[10px] text-slate-400 block px-1">{msg.timestamp}</span>

                {/* Suggested Action Pills from Mentor */}
                {msg.suggestedActions && (
                  <div className="pt-2 flex flex-wrap gap-2">
                    {msg.suggestedActions.map((action) => (
                      <button
                        key={action}
                        onClick={() => sendMentorMessage(action)}
                        className="px-3 py-1.5 rounded-xl bg-brand-primary/10 hover:bg-brand-primary hover:text-white text-brand-primary text-[11px] font-semibold transition-all border border-brand-primary/20 flex items-center space-x-1"
                      >
                        <Sparkles className="w-3 h-3 text-brand-accent" />
                        <span>{action}</span>
                      </button>
                    ))}
                  </div>
                )}
              </div>
            </div>
          );
        })}
      </div>

      {/* Input Form */}
      <form onSubmit={handleSubmit} className="flex-shrink-0 flex items-center space-x-3">
        <input
          type="text"
          value={inputText}
          onChange={(e) => setInputText(e.target.value)}
          placeholder={`Ask AI mentor about ${userProfile.dreamCareer} skills, interviews, or project ideas...`}
          className="flex-1 px-5 py-3.5 rounded-2xl glass-card border border-white/80 text-xs text-slate-900 focus:outline-none focus:ring-2 focus:ring-brand-primary/30 shadow-sm"
        />
        <button
          type="submit"
          className="p-3.5 rounded-2xl bg-gradient-to-r from-brand-primary to-indigo-600 text-white shadow-glow-primary hover:opacity-95 transition-all flex items-center justify-center"
        >
          <Send className="w-4 h-4" />
        </button>
      </form>

    </div>
  );
};
