import React, { createContext, useContext, useState, useEffect } from 'react';
import confetti from 'canvas-confetti';
import {
  ScreenState,
  NavigationTab,
  UserProfile,
  RoadmapStep,
  Skill360Score,
  MentorMessage,
  NotificationItem,
} from '../types';
import {
  loadAuth,
  saveAuth,
  loadInitialProfile,
  saveProfile,
  loadInitialRoadmap,
  saveRoadmap,
  loadNotifications,
  saveNotifications,
  loadQuestionHistory,
  saveQuestionHistory,
  loadSkillConfidenceProfile,
  saveSkillConfidenceProfile,
  DEFAULT_PROFILE,
} from '../utils/storage';
import { generateRoadmapForUser } from '../utils/roadmapGenerator';
import { calculate360Score } from '../utils/skillAnalyzer';
import {
  buildMultiSourceSkillProfile,
  selectNextQuestion,
  evaluateAnswer,
  shouldStopAssessment,
  generateMultiSourceSkillGaps,
  updateRoadmapFromSkillGaps,
} from '../services/assessment';
import { AdaptiveAssessmentSession, SkillConfidenceItem, QuestionHistoryEntry } from '../types';


interface AppContextType {
  screen: ScreenState;
  setScreen: (screen: ScreenState) => void;
  activeTab: NavigationTab;
  setActiveTab: (tab: NavigationTab) => void;
  isLoggedIn: boolean;
  userProfile: UserProfile;
  roadmap: RoadmapStep[];
  score360: Skill360Score;
  notifications: NotificationItem[];
  mentorMessages: MentorMessage[];
  login: (u: string, p: string) => boolean;
  logout: () => void;
  completeQuestionnaire: (profileData: Partial<UserProfile>) => void;
  updateProfile: (updatedProfile: UserProfile) => void;
  updateRoadmap: (updatedRoadmap: RoadmapStep[]) => void;
  toggleStepCompleted: (stepId: string) => void;
  addRoadmapStep: (step: Omit<RoadmapStep, 'id' | 'order'>) => void;
  deleteRoadmapStep: (stepId: string) => void;
  editRoadmapStep: (step: RoadmapStep) => void;
  sendMentorMessage: (text: string) => void;
  markNotificationRead: (id: string) => void;
  regenerateRoadmap: () => void;
  isMobileDrawerOpen: boolean;
  setIsMobileDrawerOpen: (open: boolean) => void;
  viewMode: 'web' | 'mobile' | 'simulator';
  setViewMode: (mode: 'web' | 'mobile' | 'simulator') => void;

  // Adaptive Assessment & Evidence Engine
  evaluatedSkills: Record<string, any>;
  questionHistory: any[];
  activeSession: any | null;
  startAdaptiveSession: (company?: string, role?: string) => void;
  submitAdaptiveAnswer: (answer: string | number) => any;
  resetAdaptiveSession: () => void;
}


const AppContext = createContext<AppContextType | undefined>(undefined);

export const AppProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [isLoggedIn, setIsLoggedIn] = useState<boolean>(() => loadAuth());
  const [userProfile, setUserProfile] = useState<UserProfile>(() => loadInitialProfile());
  const [screen, setScreen] = useState<ScreenState>(() => {
    if (loadAuth()) return 'app';
    return 'splash';
  });
  const [activeTab, setActiveTab] = useState<NavigationTab>('dashboard');
  const [roadmap, setRoadmap] = useState<RoadmapStep[]>(() => loadInitialRoadmap(userProfile));
  const [notifications, setNotifications] = useState<NotificationItem[]>(() => loadNotifications());

  const [mentorMessages, setMentorMessages] = useState<MentorMessage[]>([
    {
      id: 'm1',
      sender: 'mentor',
      text: `Hello ${userProfile.name}! I'm your Agentic AI Career Mentor. I've analyzed your goal of becoming a top-tier ${userProfile.dreamCareer} at ${userProfile.dreamCompany || 'leading tech companies'}. How can I assist your learning plan today?`,
      timestamp: 'Just now',
      suggestedActions: [
        `Analyze my skill gaps for ${userProfile.dreamCareer}`,
        'Suggest best hands-on projects',
        'How do I prepare for technical interviews?',
      ],
    },
  ]);

  const [score360, setScore360] = useState<Skill360Score>(() => calculate360Score(userProfile, roadmap));

  // Recalculate score on profile or roadmap change
  useEffect(() => {
    setScore360(calculate360Score(userProfile, roadmap));
  }, [userProfile, roadmap]);

  const login = (u: string, p: string): boolean => {
    if (u === 'admin' && p === 'admin123') {
      setIsLoggedIn(true);
      saveAuth(true);
      setScreen('questionnaire');
      return true;
    }
    return false;
  };

  const logout = () => {
    setIsLoggedIn(false);
    saveAuth(false);
    setScreen('login');
  };

  const completeQuestionnaire = (profileData: Partial<UserProfile>) => {
    const updated: UserProfile = {
      ...userProfile,
      ...profileData,
    };
    setUserProfile(updated);
    saveProfile(updated);

    // Automatically generate new roadmap based on answers
    const newRoadmap = generateRoadmapForUser(updated);
    setRoadmap(newRoadmap);
    saveRoadmap(newRoadmap);

    setScreen('app');
    setActiveTab('dashboard');

    confetti({
      particleCount: 80,
      spread: 70,
      origin: { y: 0.6 },
    });
  };

  const updateProfile = (updatedProfile: UserProfile) => {
    setUserProfile(updatedProfile);
    saveProfile(updatedProfile);

    // Dynamic regeneration when career/skills are modified in Settings
    const newRoadmap = generateRoadmapForUser(updatedProfile);
    setRoadmap(newRoadmap);
    saveRoadmap(newRoadmap);

    setNotifications((prev) => [
      {
        id: `notif-${Date.now()}`,
        title: 'Career & Skills Profile Updated',
        message: `Roadmap regenerated for target role: ${updatedProfile.dreamCareer}.`,
        type: 'system',
        timestamp: 'Just now',
        read: false,
        actionTab: 'roadmap',
      },
      ...prev,
    ]);
  };

  const regenerateRoadmap = () => {
    const newRoadmap = generateRoadmapForUser(userProfile);
    setRoadmap(newRoadmap);
    saveRoadmap(newRoadmap);
  };

  const updateRoadmap = (updatedRoadmap: RoadmapStep[]) => {
    setRoadmap(updatedRoadmap);
    saveRoadmap(updatedRoadmap);
  };

  const toggleStepCompleted = (stepId: string) => {
    const updated = roadmap.map((s) => {
      if (s.id === stepId) {
        const nextState = !s.completed;
        if (nextState) {
          confetti({
            particleCount: 50,
            spread: 60,
            origin: { y: 0.7 },
          });
        }
        return { ...s, completed: nextState };
      }
      return s;
    });
    updateRoadmap(updated);
  };

  const addRoadmapStep = (step: Omit<RoadmapStep, 'id' | 'order'>) => {
    const newStep: RoadmapStep = {
      ...step,
      id: `custom-step-${Date.now()}`,
      order: roadmap.length + 1,
    };
    const updated = [...roadmap, newStep];
    updateRoadmap(updated);
  };

  const deleteRoadmapStep = (stepId: string) => {
    const updated = roadmap.filter((s) => s.id !== stepId);
    updateRoadmap(updated);
  };

  const editRoadmapStep = (step: RoadmapStep) => {
    const updated = roadmap.map((s) => (s.id === step.id ? step : s));
    updateRoadmap(updated);
  };

  const sendMentorMessage = (text: string) => {
    const userMsg: MentorMessage = {
      id: `msg-${Date.now()}`,
      sender: 'user',
      text,
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
    };

    setMentorMessages((prev) => [...prev, userMsg]);

    // Contextual AI Response logic
    setTimeout(() => {
      let aiText = '';
      const lower = text.toLowerCase();

      if (lower.includes('skill gap') || lower.includes('gap')) {
        aiText = `Based on your profile as a ${userProfile.dreamCareer}, your primary technical skill gap lies in advanced ${
          userProfile.currentSkills.includes('Data Structures & Algorithms') ? 'System Design & Scalability' : 'Data Structures & Algorithms'
        }. I recommend dedicating 5 hours weekly to practicing on LeetCode and completing 1 hands-on production repository.`;
      } else if (lower.includes('project') || lower.includes('capstone')) {
        aiText = `For a strong portfolio targetting ${userProfile.dreamCompany || 'tech giants'}, build a full capstone: "Distributed AI Analytics Pipeline" utilizing ${
          userProfile.currentSkills.slice(0, 2).join(' and ') || 'Python and SQL'
        } with Dockerized microservices and automated CI/CD pipelines.`;
      } else if (lower.includes('interview') || lower.includes('placement')) {
        aiText = `To ace interviews for ${userProfile.dreamCareer}, focus on 3 key pillars: 1) Whiteboard Algorithm Speed, 2) STAR Behavioral Stories, and 3) Mock Voice Interviews. Try out our built-in AI Mock Interview tool in the navigation menu!`;
      } else {
        aiText = `Great question! Based on your target career (${userProfile.dreamCareer}) and current roadmap progress (${
          roadmap.filter((s) => s.completed).length
        }/${roadmap.length} steps completed), continuing your weekly goal of ${userProfile.weeklyHours} hours will put you on track to achieve placement readiness within ${userProfile.timeline}.`;
      }

      const aiMsg: MentorMessage = {
        id: `ai-${Date.now()}`,
        sender: 'mentor',
        text: aiText,
        timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
        suggestedActions: ['Show my roadmap', 'Practice mock interview', 'View skill decay risks'],
      };

      setMentorMessages((prev) => [...prev, aiMsg]);
    }, 600);
  };

  const markNotificationRead = (id: string) => {
    const updated = notifications.map((n) => (n.id === id ? { ...n, read: true } : n));
    setNotifications(updated);
    saveNotifications(updated);
  };

  const [questionHistory, setQuestionHistory] = useState<QuestionHistoryEntry[]>(() => loadQuestionHistory());
  const [evaluatedSkills, setEvaluatedSkills] = useState<Record<string, SkillConfidenceItem>>(() => {
    const loaded = loadSkillConfidenceProfile();
    return Object.keys(loaded).length > 0 ? loaded : buildMultiSourceSkillProfile(userProfile);
  });
  const [activeSession, setActiveSession] = useState<AdaptiveAssessmentSession | null>(null);

  // Keep skill confidence profile synchronized on profile updates
  useEffect(() => {
    const updated = buildMultiSourceSkillProfile(userProfile, evaluatedSkills);
    setEvaluatedSkills(updated);
    saveSkillConfidenceProfile(updated);
  }, [userProfile.dreamCompany, userProfile.dreamCareer]);

  const startAdaptiveSession = (company?: string, role?: string) => {
    const targetCompany = company || userProfile.dreamCompany || 'Company A';
    const targetRole = role || userProfile.dreamCareer || 'Software Engineer';

    const newSession: AdaptiveAssessmentSession = {
      sessionId: `session_${Date.now()}`,
      company: targetCompany,
      role: targetRole,
      startTime: new Date().toISOString(),
      questionsAnswered: 0,
      targetConfidenceThreshold: 78,
      isComplete: false,
      completionReason: '',
      history: [...questionHistory],
      evaluatedSkills: { ...evaluatedSkills },
      detectedFalseProficiencies: [],
      detectedHiddenSkills: [],
    };

    const firstQuestion = selectNextQuestion(newSession, userProfile);
    newSession.currentQuestion = firstQuestion;

    setActiveSession(newSession);
  };

  const submitAdaptiveAnswer = (answer: string | number) => {
    if (!activeSession || !activeSession.currentQuestion) return null;

    const q = activeSession.currentQuestion;
    const currentSkillItem = activeSession.evaluatedSkills[q.skill];
    const evalResult = evaluateAnswer(q, answer, userProfile, currentSkillItem);

    // Create history entry
    const newHistoryEntry: QuestionHistoryEntry = {
      userId: userProfile.email || 'user_1',
      questionId: q.questionId,
      questionFingerprint: q.fingerprint,
      skill: q.skill,
      difficulty: q.difficulty,
      questionType: q.questionType,
      answer,
      score: evalResult.score,
      timestamp: new Date().toISOString(),
    };

    const updatedHistory = [newHistoryEntry, ...questionHistory];
    setQuestionHistory(updatedHistory);
    saveQuestionHistory(updatedHistory);

    // Update Skill Confidence & Level
    const prevItem = activeSession.evaluatedSkills[q.skill] || {
      skill: q.skill,
      level: 50,
      confidence: 30,
      sources: { assessment: 30, project: 40, github: 40, selfReported: 50, coding: 50, interview: 50 },
      evidenceCount: 1,
      trend: 'Stable',
      lastUpdated: new Date().toLocaleDateString(),
    };

    const newLevel = Math.min(99, Math.max(10, prevItem.level + evalResult.skillImpact));
    const newConfidence = Math.min(99, Math.max(20, prevItem.confidence + evalResult.confidenceImpact));
    const updatedSources = {
      ...prevItem.sources,
      assessment: Math.min(99, Math.max(10, Math.round((prevItem.sources.assessment + evalResult.score) / 2))),
    };

    const updatedSkillItem: SkillConfidenceItem = {
      ...prevItem,
      level: newLevel,
      confidence: newConfidence,
      sources: updatedSources,
      evidenceCount: prevItem.evidenceCount + 1,
      trend: evalResult.skillImpact > 0 ? 'Rising' : 'Critical',
      lastUpdated: new Date().toLocaleDateString(),
    };

    const updatedSkills = {
      ...activeSession.evaluatedSkills,
      [q.skill]: updatedSkillItem,
    };

    setEvaluatedSkills(updatedSkills);
    saveSkillConfidenceProfile(updatedSkills);

    // Update Roadmap priorities automatically based on new Skill Gaps!
    const newGaps = generateMultiSourceSkillGaps(userProfile, updatedSkills);
    const updatedRoadmap = updateRoadmapFromSkillGaps(roadmap, newGaps, userProfile);
    setRoadmap(updatedRoadmap);
    saveRoadmap(updatedRoadmap);

    const falseProfs = [...activeSession.detectedFalseProficiencies];
    if (evalResult.detectedFalseProficiency && !falseProfs.includes(q.skill)) {
      falseProfs.push(q.skill);
    }

    const hiddenSkills = [...activeSession.detectedHiddenSkills];
    if (evalResult.detectedHiddenSkill && !hiddenSkills.includes(q.skill)) {
      hiddenSkills.push(q.skill);
    }

    const questionsAnswered = activeSession.questionsAnswered + 1;

    const nextSessionState: AdaptiveAssessmentSession = {
      ...activeSession,
      questionsAnswered,
      evaluatedSkills: updatedSkills,
      history: [newHistoryEntry, ...activeSession.history],
      detectedFalseProficiencies: falseProfs,
      detectedHiddenSkills: hiddenSkills,
    };

    // Check dynamic stopping condition
    const stopCheck = shouldStopAssessment(nextSessionState);
    if (stopCheck.stop) {
      nextSessionState.isComplete = true;
      nextSessionState.completionReason = stopCheck.reason;
      nextSessionState.currentQuestion = undefined;
      confetti({ particleCount: 80, spread: 70, origin: { y: 0.6 } });
    } else {
      nextSessionState.currentQuestion = selectNextQuestion(nextSessionState, userProfile);
    }

    setActiveSession(nextSessionState);
    return evalResult;
  };

  const resetAdaptiveSession = () => {
    setActiveSession(null);
  };

  const [isMobileDrawerOpen, setIsMobileDrawerOpen] = useState<boolean>(false);
  const [viewMode, setViewMode] = useState<'web' | 'mobile' | 'simulator'>('web');

  return (
    <AppContext.Provider
      value={{
        screen,
        setScreen,
        activeTab,
        setActiveTab,
        isLoggedIn,
        userProfile,
        roadmap,
        score360,
        notifications,
        mentorMessages,
        login,
        logout,
        completeQuestionnaire,
        updateProfile,
        updateRoadmap,
        toggleStepCompleted,
        addRoadmapStep,
        deleteRoadmapStep,
        editRoadmapStep,
        sendMentorMessage,
        markNotificationRead,
        regenerateRoadmap,
        isMobileDrawerOpen,
        setIsMobileDrawerOpen,
        viewMode,
        setViewMode,
        evaluatedSkills,
        questionHistory,
        activeSession,
        startAdaptiveSession,
        submitAdaptiveAnswer,
        resetAdaptiveSession,
      }}
    >
      {children}
    </AppContext.Provider>
  );
};


export const useApp = () => {
  const context = useContext(AppContext);
  if (!context) throw new Error('useApp must be used within an AppProvider');
  return context;
};
