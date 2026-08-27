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
  DEFAULT_PROFILE,
} from '../utils/storage';
import { generateRoadmapForUser } from '../utils/roadmapGenerator';
import { calculate360Score } from '../utils/skillAnalyzer';

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
