import { UserProfile, RoadmapStep, MentorMessage, NotificationItem } from '../types';
import { generateRoadmapForUser } from './roadmapGenerator';

const STORAGE_KEYS = {
  IS_LOGGED_IN: 'skillgap_is_logged_in',
  SCREEN: 'skillgap_screen',
  PROFILE: 'skillgap_user_profile',
  ROADMAP: 'skillgap_user_roadmap',
  MENTOR_CHAT: 'skillgap_mentor_chat',
  NOTIFICATIONS: 'skillgap_notifications',
};

export const DEFAULT_PROFILE: UserProfile = {
  name: 'Alex Johnson',
  email: 'alex.johnson@university.edu',
  avatarUrl: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150&auto=format&fit=crop&q=80',
  dreamCareer: 'AI Engineer',
  education: 'B.Tech',
  currentYear: '3rd Year',
  currentSkills: ['Python', 'SQL', 'Git & GitHub', 'Communication'],
  skillLevel: 'Intermediate',
  preferredLearningStyle: 'Projects',
  weeklyHours: '15',
  dreamCompany: 'Google',
  timeline: '1 year',
  challenges: ['No Roadmap', 'Skill Gap', 'Placement Fear'],
  joinedDate: 'July 2026',
  streakDays: 5,
};

export const DEFAULT_NOTIFICATIONS: NotificationItem[] = [
  {
    id: 'notif-1',
    title: 'Python Memory Retention Warning',
    message: 'Python not practiced for 15 days. Skill decay risk is High.',
    type: 'decay',
    timestamp: '10 mins ago',
    read: false,
    actionTab: 'dashboard',
  },
  {
    id: 'notif-2',
    title: 'Roadmap Milestone Unlocked',
    message: 'You completed Data Structures & Algorithms. Next: Deep Learning.',
    type: 'roadmap',
    timestamp: '2 hours ago',
    read: false,
    actionTab: 'roadmap',
  },
  {
    id: 'notif-3',
    title: 'Google Mock Interview Scheduled',
    message: 'AI Mock Interview session ready for Google AI Engineering track.',
    type: 'interview',
    timestamp: '1 day ago',
    read: true,
    actionTab: 'mock-interview',
  },
];

export const loadInitialProfile = (): UserProfile => {
  const data = localStorage.getItem(STORAGE_KEYS.PROFILE);
  if (data) {
    try {
      return JSON.parse(data);
    } catch {
      return DEFAULT_PROFILE;
    }
  }
  return DEFAULT_PROFILE;
};

export const saveProfile = (profile: UserProfile): void => {
  localStorage.setItem(STORAGE_KEYS.PROFILE, JSON.stringify(profile));
};

export const loadInitialRoadmap = (profile: UserProfile): RoadmapStep[] => {
  const data = localStorage.getItem(STORAGE_KEYS.ROADMAP);
  if (data) {
    try {
      return JSON.parse(data);
    } catch {
      return generateRoadmapForUser(profile);
    }
  }
  return generateRoadmapForUser(profile);
};

export const saveRoadmap = (roadmap: RoadmapStep[]): void => {
  localStorage.setItem(STORAGE_KEYS.ROADMAP, JSON.stringify(roadmap));
};

export const loadAuth = (): boolean => {
  return localStorage.getItem(STORAGE_KEYS.IS_LOGGED_IN) === 'true';
};

export const saveAuth = (isLoggedIn: boolean): void => {
  localStorage.setItem(STORAGE_KEYS.IS_LOGGED_IN, isLoggedIn ? 'true' : 'false');
};

export const loadNotifications = (): NotificationItem[] => {
  const data = localStorage.getItem(STORAGE_KEYS.NOTIFICATIONS);
  if (data) {
    try {
      return JSON.parse(data);
    } catch {
      return DEFAULT_NOTIFICATIONS;
    }
  }
  return DEFAULT_NOTIFICATIONS;
};

export const saveNotifications = (notifs: NotificationItem[]): void => {
  localStorage.setItem(STORAGE_KEYS.NOTIFICATIONS, JSON.stringify(notifs));
};
