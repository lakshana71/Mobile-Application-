import React, { useState } from 'react';
import {
  Sparkles,
  ArrowRight,
  ArrowLeft,
  Check,
  BrainCircuit,
  Briefcase,
  GraduationCap,
  Calendar,
  Layers,
  Award,
  BookOpen,
  Clock,
  Building2,
  Target,
  AlertTriangle,
  CheckCircle2,
} from 'lucide-react';
import { useApp } from '../../context/AppContext';
import {
  DREAM_CAREERS,
  EDUCATION_LIST,
  YEAR_LIST,
  ALL_SKILLS_LIST,
  LEARNING_STYLES,
  WEEKLY_HOURS_LIST,
  DREAM_COMPANIES,
  TIMELINES,
  CHALLENGES_LIST,
} from '../../data/careerData';
import { SkillLevel, LearningStyle, WeeklyHours, CareerTimeline, CurrentYear } from '../../types';

export const QuestionnaireWizard: React.FC = () => {
  const { userProfile, completeQuestionnaire } = useApp();

  const [step, setStep] = useState(1);
  const totalSteps = 10;

  const [dreamCareer, setDreamCareer] = useState(userProfile.dreamCareer);
  const [customCareer, setCustomCareer] = useState('');
  const [education, setEducation] = useState(userProfile.education);
  const [currentYear, setCurrentYear] = useState<CurrentYear>(userProfile.currentYear);
  const [selectedSkills, setSelectedSkills] = useState<string[]>(userProfile.currentSkills);
  const [skillLevel, setSkillLevel] = useState<SkillLevel>(userProfile.skillLevel);
  const [learningStyle, setLearningStyle] = useState<LearningStyle>(userProfile.preferredLearningStyle);
  const [weeklyHours, setWeeklyHours] = useState<WeeklyHours>(userProfile.weeklyHours);
  const [dreamCompany, setDreamCompany] = useState(userProfile.dreamCompany);
  const [timeline, setTimeline] = useState<CareerTimeline>(userProfile.timeline);
  const [challenges, setChallenges] = useState<string[]>(userProfile.challenges);

  const [isAnalyzing, setIsAnalyzing] = useState(false);

  const toggleSkill = (skill: string) => {
    if (selectedSkills.includes(skill)) {
      setSelectedSkills(selectedSkills.filter((s) => s !== skill));
    } else {
      setSelectedSkills([...selectedSkills, skill]);
    }
  };

  const toggleChallenge = (ch: string) => {
    if (challenges.includes(ch)) {
      setChallenges(challenges.filter((c) => c !== ch));
    } else {
      setChallenges([...challenges, ch]);
    }
  };

  const handleFinish = () => {
    setIsAnalyzing(true);

    setTimeout(() => {
      completeQuestionnaire({
        dreamCareer: dreamCareer === 'Other' && customCareer ? customCareer : dreamCareer,
        education,
        currentYear,
        currentSkills: selectedSkills,
        skillLevel,
        preferredLearningStyle: learningStyle,
        weeklyHours,
        dreamCompany,
        timeline,
        challenges,
      });
      setIsAnalyzing(false);
    }, 1800);
  };

  if (isAnalyzing) {
    return (
      <div className="min-h-screen bg-[#F7F9FC] flex flex-col items-center justify-center p-6 text-center">
        <div className="w-20 h-20 rounded-3xl bg-gradient-to-tr from-brand-primary via-brand-secondary to-brand-accent flex items-center justify-center shadow-glow-primary animate-pulse-glow mb-8">
          <BrainCircuit className="w-10 h-10 text-white animate-spin" style={{ animationDuration: '4s' }} />
        </div>
        <h2 className="text-3xl font-extrabold text-slate-900 mb-3">
          AI Analyzing Your Profile & Skill Gaps...
        </h2>
        <p className="text-slate-600 text-sm max-w-md mb-8">
          Generating personalized learning roadmap, calculating 360° SkillSphere score, and mapping target skills for <span className="font-bold text-brand-primary">{dreamCareer}</span>.
        </p>

        <div className="w-64 h-2 bg-slate-200 rounded-full overflow-hidden">
          <div className="h-full bg-gradient-to-r from-brand-primary to-brand-accent animate-shimmer" style={{ backgroundSize: '200% 100%' }} />
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#F7F9FC] flex flex-col justify-between p-4 sm:p-8 relative overflow-hidden">
      {/* Background ambient light */}
      <div className="absolute top-[-5%] right-[-5%] w-[450px] h-[450px] bg-brand-primary/10 rounded-full blur-[120px] pointer-events-none" />
      <div className="absolute bottom-[-5%] left-[-5%] w-[450px] h-[450px] bg-brand-accent/10 rounded-full blur-[120px] pointer-events-none" />

      {/* Header Bar */}
      <header className="max-w-4xl mx-auto w-full flex items-center justify-between z-10 mb-6">
        <div className="flex items-center space-x-2">
          <div className="w-8 h-8 rounded-lg bg-gradient-to-tr from-brand-primary to-brand-accent flex items-center justify-center">
            <BrainCircuit className="w-5 h-5 text-white" />
          </div>
          <span className="font-bold text-slate-900">Career Discovery Wizard</span>
        </div>

        <div className="flex items-center space-x-3 text-xs font-semibold text-slate-600">
          <span>Step {step} of {totalSteps}</span>
          <div className="w-32 h-2 bg-slate-200 rounded-full overflow-hidden">
            <div
              className="h-full bg-gradient-to-r from-brand-primary to-brand-accent transition-all duration-300"
              style={{ width: `${(step / totalSteps) * 100}%` }}
            />
          </div>
        </div>
      </header>

      {/* Main Form Box */}
      <main className="max-w-3xl mx-auto w-full flex-1 flex flex-col justify-center z-10 py-4">
        <div className="glass-card p-6 sm:p-10 rounded-3xl shadow-xl border border-white/80">
          
          {/* Step 1: Dream Career */}
          {step === 1 && (
            <div>
              <div className="flex items-center space-x-3 text-brand-primary mb-3">
                <Briefcase className="w-6 h-6" />
                <span className="text-xs font-bold uppercase tracking-wider">Goal Selection</span>
              </div>
              <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900 mb-2">What is your Dream Career?</h2>
              <p className="text-sm text-slate-500 mb-6">Your personalized roadmap and skill gap matrix will be generated specifically for this role.</p>

              <div className="grid grid-cols-2 sm:grid-cols-3 gap-3 mb-4">
                {DREAM_CAREERS.map((career) => (
                  <button
                    key={career}
                    onClick={() => setDreamCareer(career)}
                    className={`p-4 rounded-2xl text-left text-sm font-semibold border transition-all flex items-center justify-between ${
                      dreamCareer === career
                        ? 'bg-gradient-to-r from-brand-primary to-indigo-600 text-white border-transparent shadow-md'
                        : 'bg-white/80 text-slate-800 border-slate-200 hover:border-brand-primary/40 hover:bg-slate-50'
                    }`}
                  >
                    <span>{career}</span>
                    {dreamCareer === career && <Check className="w-4 h-4 text-white" />}
                  </button>
                ))}
              </div>

              {dreamCareer === 'Other' && (
                <input
                  type="text"
                  placeholder="Specify custom career..."
                  value={customCareer}
                  onChange={(e) => setCustomCareer(e.target.value)}
                  className="w-full mt-2 p-3.5 rounded-xl border border-slate-200 text-sm focus:outline-none focus:ring-2 focus:ring-brand-primary"
                />
              )}
            </div>
          )}

          {/* Step 2: Current Education */}
          {step === 2 && (
            <div>
              <div className="flex items-center space-x-3 text-brand-primary mb-3">
                <GraduationCap className="w-6 h-6" />
                <span className="text-xs font-bold uppercase tracking-wider">Academic Background</span>
              </div>
              <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900 mb-2">What is your Current Education?</h2>
              <p className="text-sm text-slate-500 mb-6">Helps tailor foundation level topics.</p>

              <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
                {EDUCATION_LIST.map((edu) => (
                  <button
                    key={edu}
                    onClick={() => setEducation(edu)}
                    className={`p-4 rounded-2xl text-left text-sm font-semibold border transition-all flex items-center justify-between ${
                      education === edu
                        ? 'bg-gradient-to-r from-brand-primary to-indigo-600 text-white border-transparent shadow-md'
                        : 'bg-white/80 text-slate-800 border-slate-200 hover:border-brand-primary/40'
                    }`}
                  >
                    <span>{edu}</span>
                    {education === edu && <Check className="w-4 h-4 text-white" />}
                  </button>
                ))}
              </div>
            </div>
          )}

          {/* Step 3: Current Year */}
          {step === 3 && (
            <div>
              <div className="flex items-center space-x-3 text-brand-primary mb-3">
                <Calendar className="w-6 h-6" />
                <span className="text-xs font-bold uppercase tracking-wider">Timeline Context</span>
              </div>
              <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900 mb-2">Which Year of Study are you in?</h2>
              <p className="text-sm text-slate-500 mb-6">Determines priority placement velocity.</p>

              <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
                {YEAR_LIST.map((y) => (
                  <button
                    key={y}
                    onClick={() => setCurrentYear(y as CurrentYear)}
                    className={`p-4 rounded-2xl text-left text-sm font-semibold border transition-all flex items-center justify-between ${
                      currentYear === y
                        ? 'bg-gradient-to-r from-brand-primary to-indigo-600 text-white border-transparent shadow-md'
                        : 'bg-white/80 text-slate-800 border-slate-200 hover:border-brand-primary/40'
                    }`}
                  >
                    <span>{y}</span>
                    {currentYear === y && <Check className="w-4 h-4 text-white" />}
                  </button>
                ))}
              </div>
            </div>
          )}

          {/* Step 4: Current Skills (Multiselect) */}
          {step === 4 && (
            <div>
              <div className="flex items-center space-x-3 text-brand-primary mb-3">
                <Layers className="w-6 h-6" />
                <span className="text-xs font-bold uppercase tracking-wider">Skill Inventory</span>
              </div>
              <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900 mb-2">Select Your Current Skills</h2>
              <p className="text-sm text-slate-500 mb-6">Choose all technologies and soft skills you are familiar with.</p>

              <div className="flex flex-wrap gap-2.5 max-h-64 overflow-y-auto pr-2 mb-4">
                {ALL_SKILLS_LIST.map((skill) => {
                  const isSelected = selectedSkills.includes(skill);
                  return (
                    <button
                      key={skill}
                      onClick={() => toggleSkill(skill)}
                      className={`px-4 py-2.5 rounded-full text-xs font-semibold border transition-all flex items-center space-x-2 ${
                        isSelected
                          ? 'bg-brand-primary text-white border-brand-primary shadow-sm'
                          : 'bg-white/80 text-slate-700 border-slate-200 hover:border-slate-400'
                      }`}
                    >
                      <span>{skill}</span>
                      {isSelected && <Check className="w-3.5 h-3.5" />}
                    </button>
                  );
                })}
              </div>
              <div className="text-xs text-slate-400">Selected: {selectedSkills.length} skills</div>
            </div>
          )}

          {/* Step 5: Skill Level */}
          {step === 5 && (
            <div>
              <div className="flex items-center space-x-3 text-brand-primary mb-3">
                <Award className="w-6 h-6" />
                <span className="text-xs font-bold uppercase tracking-wider">Proficiency Level</span>
              </div>
              <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900 mb-2">What is your Overall Skill Level?</h2>
              <p className="text-sm text-slate-500 mb-6">Sets the starting depth for your roadmap steps.</p>

              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                {(['Beginner', 'Intermediate', 'Advanced'] as SkillLevel[]).map((lvl) => (
                  <button
                    key={lvl}
                    onClick={() => setSkillLevel(lvl)}
                    className={`p-5 rounded-2xl text-left border transition-all ${
                      skillLevel === lvl
                        ? 'bg-gradient-to-r from-brand-primary to-indigo-600 text-white border-transparent shadow-lg'
                        : 'bg-white/80 text-slate-800 border-slate-200 hover:border-brand-primary/40'
                    }`}
                  >
                    <div className="font-bold text-base mb-1">{lvl}</div>
                    <div className={`text-xs ${skillLevel === lvl ? 'text-indigo-100' : 'text-slate-500'}`}>
                      {lvl === 'Beginner' && 'Starting core fundamentals'}
                      {lvl === 'Intermediate' && 'Built 2-3 mini projects'}
                      {lvl === 'Advanced' && 'Production-level code & systems'}
                    </div>
                  </button>
                ))}
              </div>
            </div>
          )}

          {/* Step 6: Preferred Learning Style */}
          {step === 6 && (
            <div>
              <div className="flex items-center space-x-3 text-brand-primary mb-3">
                <BookOpen className="w-6 h-6" />
                <span className="text-xs font-bold uppercase tracking-wider">Methodology</span>
              </div>
              <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900 mb-2">Preferred Learning Style</h2>
              <p className="text-sm text-slate-500 mb-6">Tailors resource recommendations in your roadmap.</p>

              <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
                {LEARNING_STYLES.map((style) => (
                  <button
                    key={style}
                    onClick={() => setLearningStyle(style as LearningStyle)}
                    className={`p-4 rounded-2xl text-left text-sm font-semibold border transition-all flex items-center justify-between ${
                      learningStyle === style
                        ? 'bg-gradient-to-r from-brand-primary to-indigo-600 text-white border-transparent shadow-md'
                        : 'bg-white/80 text-slate-800 border-slate-200 hover:border-brand-primary/40'
                    }`}
                  >
                    <span>{style}</span>
                    {learningStyle === style && <Check className="w-4 h-4 text-white" />}
                  </button>
                ))}
              </div>
            </div>
          )}

          {/* Step 7: Weekly Learning Hours */}
          {step === 7 && (
            <div>
              <div className="flex items-center space-x-3 text-brand-primary mb-3">
                <Clock className="w-6 h-6" />
                <span className="text-xs font-bold uppercase tracking-wider">Time Commitment</span>
              </div>
              <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900 mb-2">Weekly Learning Hours</h2>
              <p className="text-sm text-slate-500 mb-6">Calculates estimated completion timeline velocity.</p>

              <div className="grid grid-cols-3 sm:grid-cols-5 gap-3">
                {WEEKLY_HOURS_LIST.map((hr) => (
                  <button
                    key={hr}
                    onClick={() => setWeeklyHours(hr as WeeklyHours)}
                    className={`p-4 rounded-2xl text-center font-bold border transition-all ${
                      weeklyHours === hr
                        ? 'bg-gradient-to-r from-brand-primary to-indigo-600 text-white border-transparent shadow-md'
                        : 'bg-white/80 text-slate-800 border-slate-200 hover:border-brand-primary/40'
                    }`}
                  >
                    <div className="text-xl">{hr}</div>
                    <div className={`text-[10px] uppercase tracking-wider ${weeklyHours === hr ? 'text-indigo-100' : 'text-slate-400'}`}>
                      hrs/wk
                    </div>
                  </button>
                ))}
              </div>
            </div>
          )}

          {/* Step 8: Dream Company */}
          {step === 8 && (
            <div>
              <div className="flex items-center space-x-3 text-brand-primary mb-3">
                <Building2 className="w-6 h-6" />
                <span className="text-xs font-bold uppercase tracking-wider">Target Organization</span>
              </div>
              <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900 mb-2">What is your Dream Company?</h2>
              <p className="text-sm text-slate-500 mb-6">Aligns placement interview benchmarks.</p>

              <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
                {DREAM_COMPANIES.map((company) => (
                  <button
                    key={company}
                    onClick={() => setDreamCompany(company)}
                    className={`p-4 rounded-2xl text-left text-sm font-semibold border transition-all flex items-center justify-between ${
                      dreamCompany === company
                        ? 'bg-gradient-to-r from-brand-primary to-indigo-600 text-white border-transparent shadow-md'
                        : 'bg-white/80 text-slate-800 border-slate-200 hover:border-brand-primary/40'
                    }`}
                  >
                    <span>{company}</span>
                    {dreamCompany === company && <Check className="w-4 h-4 text-white" />}
                  </button>
                ))}
              </div>
            </div>
          )}

          {/* Step 9: Career Goal Timeline */}
          {step === 9 && (
            <div>
              <div className="flex items-center space-x-3 text-brand-primary mb-3">
                <Target className="w-6 h-6" />
                <span className="text-xs font-bold uppercase tracking-wider">Target Horizon</span>
              </div>
              <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900 mb-2">Career Goal Timeline</h2>
              <p className="text-sm text-slate-500 mb-6">When do you plan to land your target role?</p>

              <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
                {TIMELINES.map((t) => (
                  <button
                    key={t}
                    onClick={() => setTimeline(t as CareerTimeline)}
                    className={`p-4 rounded-2xl text-center font-bold border transition-all ${
                      timeline === t
                        ? 'bg-gradient-to-r from-brand-primary to-indigo-600 text-white border-transparent shadow-md'
                        : 'bg-white/80 text-slate-800 border-slate-200 hover:border-brand-primary/40'
                    }`}
                  >
                    <span className="text-base">{t}</span>
                  </button>
                ))}
              </div>
            </div>
          )}

          {/* Step 10: Biggest Challenges */}
          {step === 10 && (
            <div>
              <div className="flex items-center space-x-3 text-brand-primary mb-3">
                <AlertTriangle className="w-6 h-6" />
                <span className="text-xs font-bold uppercase tracking-wider">Obstacle Identification</span>
              </div>
              <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900 mb-2">What are your Biggest Challenges?</h2>
              <p className="text-sm text-slate-500 mb-6">Select all obstacles you encounter so AI Mentor can prioritize guidance.</p>

              <div className="grid grid-cols-2 sm:grid-cols-3 gap-3 mb-4">
                {CHALLENGES_LIST.map((ch) => {
                  const isChecked = challenges.includes(ch);
                  return (
                    <button
                      key={ch}
                      onClick={() => toggleChallenge(ch)}
                      className={`p-4 rounded-2xl text-left text-xs font-semibold border transition-all flex items-center justify-between ${
                        isChecked
                          ? 'bg-brand-primary text-white border-brand-primary shadow-sm'
                          : 'bg-white/80 text-slate-800 border-slate-200 hover:border-slate-300'
                      }`}
                    >
                      <span>{ch}</span>
                      {isChecked && <Check className="w-4 h-4 text-white" />}
                    </button>
                  );
                })}
              </div>
            </div>
          )}

          {/* Wizard Controls */}
          <div className="flex items-center justify-between mt-8 pt-6 border-t border-slate-200/60">
            {step > 1 ? (
              <button
                onClick={() => setStep(step - 1)}
                className="px-5 py-2.5 rounded-xl border border-slate-300 text-slate-700 text-sm font-semibold hover:bg-slate-100 flex items-center space-x-2 transition-all"
              >
                <ArrowLeft className="w-4 h-4" />
                <span>Previous</span>
              </button>
            ) : <div />}

            {step < totalSteps ? (
              <button
                onClick={() => setStep(step + 1)}
                className="px-6 py-2.5 rounded-xl bg-brand-primary text-white text-sm font-bold shadow-md hover:bg-indigo-600 flex items-center space-x-2 transition-all"
              >
                <span>Next Question</span>
                <ArrowRight className="w-4 h-4" />
              </button>
            ) : (
              <button
                onClick={handleFinish}
                className="px-8 py-3 rounded-xl bg-gradient-to-r from-brand-primary via-brand-secondary to-brand-accent text-white text-sm font-bold shadow-glow-primary hover:opacity-95 flex items-center space-x-2 transition-all"
              >
                <Sparkles className="w-4 h-4 text-brand-accent" />
                <span>Generate AI Roadmap</span>
              </button>
            )}
          </div>

        </div>
      </main>

      {/* Footer */}
      <footer className="text-center text-xs text-slate-400 z-10">
        AI Heuristic Roadmap Engine v2.0 • Custom dynamic matrix builder
      </footer>
    </div>
  );
};
