import React, { useState } from 'react';
import { User, Lock, ArrowRight, Shield, BrainCircuit, KeyRound, AlertCircle } from 'lucide-react';
import { useApp } from '../../context/AppContext';

export const LoginScreen: React.FC = () => {
  const { login } = useApp();
  const [username, setUsername] = useState('admin');
  const [password, setPassword] = useState('admin123');
  const [rememberMe, setRememberMe] = useState(true);
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setIsLoading(true);

    setTimeout(() => {
      const success = login(username, password);
      setIsLoading(false);
      if (!success) {
        setError('Invalid credentials! Please use admin / admin123');
      }
    }, 500);
  };

  const fillDemo = () => {
    setUsername('admin');
    setPassword('admin123');
    setError('');
  };

  return (
    <div className="min-h-screen relative flex items-center justify-center p-6 bg-[#F7F9FC] overflow-hidden">
      {/* Dynamic Ambient Background Blur */}
      <div className="absolute top-[10%] left-[20%] w-[450px] h-[450px] bg-brand-primary/20 rounded-full blur-[130px] pointer-events-none animate-pulse-glow" />
      <div className="absolute bottom-[10%] right-[20%] w-[500px] h-[500px] bg-brand-accent/20 rounded-full blur-[140px] pointer-events-none" />

      <div className="w-full max-w-4xl grid grid-cols-1 md:grid-cols-2 glass-card rounded-3xl overflow-hidden shadow-2xl border border-white/70 relative z-10">
        
        {/* Left Side Illustration & Branding */}
        <div className="p-8 md:p-12 bg-gradient-to-br from-brand-primary via-indigo-600 to-brand-secondary text-white flex flex-col justify-between relative overflow-hidden">
          <div className="absolute -bottom-16 -left-16 w-64 h-64 bg-white/10 rounded-full blur-2xl pointer-events-none" />

          <div>
            <div className="flex items-center space-x-3 mb-8">
              <div className="w-10 h-10 rounded-xl bg-white/20 backdrop-blur-md flex items-center justify-center border border-white/30">
                <BrainCircuit className="w-6 h-6 text-white" />
              </div>
              <span className="text-xl font-bold tracking-tight">SkillGap.AI</span>
            </div>

            <h2 className="text-3xl font-extrabold leading-tight mb-4">
              Unlock Your Dynamic Career Roadmap
            </h2>
            <p className="text-indigo-100 text-sm leading-relaxed mb-6">
              Empower your professional journey with precision skill gap diagnostics, real-world failure simulations, and AI-driven growth tracking.
            </p>
          </div>

          {/* SVG Illustration Graphic */}
          <div className="my-6 flex justify-center">
            <svg className="w-48 h-48 drop-shadow-xl" viewBox="0 0 200 200" fill="none" xmlns="http://www.w3.org/2000/svg">
              <circle cx="100" cy="100" r="80" fill="white" fillOpacity="0.1" />
              <circle cx="100" cy="100" r="60" stroke="white" strokeWidth="2" strokeDasharray="6 6" strokeOpacity="0.6" />
              <path d="M100 40L140 80L100 120L60 80L100 40Z" fill="white" fillOpacity="0.25" />
              <circle cx="100" cy="100" r="16" fill="#00D2FF" />
              <circle cx="60" cy="80" r="10" fill="#4DA8FF" />
              <circle cx="140" cy="80" r="10" fill="#8B5CF6" />
              <circle cx="100" cy="160" r="10" fill="#5B5CEB" />
              <line x1="100" y1="100" x2="60" y2="80" stroke="white" strokeWidth="2" />
              <line x1="100" y1="100" x2="140" y2="80" stroke="white" strokeWidth="2" />
              <line x1="100" y1="100" x2="100" y2="160" stroke="white" strokeWidth="2" />
            </svg>
          </div>

          <div className="flex items-center space-x-2 text-xs text-indigo-200">
            <Shield className="w-4 h-4 text-brand-accent" />
            <span>Secure Local Authorization Guard</span>
          </div>
        </div>

        {/* Right Side Form */}
        <div className="p-8 md:p-12 flex flex-col justify-center bg-white/60 backdrop-blur-md">
          <div className="mb-8">
            <h3 className="text-2xl font-bold text-slate-900 mb-2">Welcome Back</h3>
            <p className="text-sm text-slate-500">Sign in to access your personalized 360° AI dashboard</p>
          </div>

          {error && (
            <div className="mb-6 p-4 rounded-xl bg-rose-50 border border-rose-200 text-rose-700 text-sm flex items-center space-x-3">
              <AlertCircle className="w-5 h-5 flex-shrink-0" />
              <span>{error}</span>
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-5">
            <div>
              <label className="block text-xs font-semibold uppercase tracking-wider text-slate-700 mb-2">
                Username
              </label>
              <div className="relative">
                <User className="w-5 h-5 absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400" />
                <input
                  type="text"
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                  placeholder="Enter username"
                  required
                  className="w-full pl-11 pr-4 py-3 rounded-xl bg-slate-50/80 border border-slate-200 text-slate-900 text-sm focus:outline-none focus:ring-2 focus:ring-brand-primary/40 focus:border-brand-primary transition-all"
                />
              </div>
            </div>

            <div>
              <label className="block text-xs font-semibold uppercase tracking-wider text-slate-700 mb-2">
                Password
              </label>
              <div className="relative">
                <Lock className="w-5 h-5 absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400" />
                <input
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="Enter password"
                  required
                  className="w-full pl-11 pr-4 py-3 rounded-xl bg-slate-50/80 border border-slate-200 text-slate-900 text-sm focus:outline-none focus:ring-2 focus:ring-brand-primary/40 focus:border-brand-primary transition-all"
                />
              </div>
            </div>

            <div className="flex items-center justify-between text-xs text-slate-600">
              <label className="flex items-center space-x-2 cursor-pointer select-none">
                <input
                  type="checkbox"
                  checked={rememberMe}
                  onChange={(e) => setRememberMe(e.target.checked)}
                  className="w-4 h-4 rounded text-brand-primary focus:ring-brand-primary/30 border-slate-300"
                />
                <span>Remember Me</span>
              </label>

              <button
                type="button"
                onClick={fillDemo}
                className="text-brand-primary hover:underline font-semibold flex items-center space-x-1"
              >
                <KeyRound className="w-3.5 h-3.5" />
                <span>Fill Demo (admin/admin123)</span>
              </button>
            </div>

            <button
              type="submit"
              disabled={isLoading}
              className="w-full py-3.5 px-6 rounded-xl bg-gradient-to-r from-brand-primary via-brand-secondary to-brand-accent text-white font-bold text-sm shadow-glow-primary hover:opacity-95 active:scale-[0.99] transition-all flex items-center justify-center space-x-2"
            >
              {isLoading ? (
                <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin" />
              ) : (
                <>
                  <span>Authenticate & Continue</span>
                  <ArrowRight className="w-4 h-4" />
                </>
              )}
            </button>
          </form>

          <div className="mt-8 text-center text-xs text-slate-400">
            Static authentication verification mode. No database required.
          </div>
        </div>

      </div>
    </div>
  );
};
