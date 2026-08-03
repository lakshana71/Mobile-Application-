export type ScreenState = 'splash' | 'login' | 'questionnaire' | 'app';

export type NavigationTab =
  | 'dashboard'
  | 'skill-gap'
  | 'roadmap'
  | 'projects'
  | 'project-analyzer'
  | 'analytics'
  | 'mentor'
  | 'career-goals'
  | 'settings'
  | 'profile'
  | 'resume-analyzer'
  | 'github-analyzer'
  | 'mock-interview'
  | 'industry-trends'
  | 'skill-decay'
  | 'internships'
  | 'community'
  | 'achievements';

export type SkillLevel = 'Beginner' | 'Intermediate' | 'Advanced';
export type LearningStyle = 'Videos' | 'Projects' | 'Reading' | 'Practice' | 'Mentor';
export type WeeklyHours = '2' | '5' | '10' | '15' | '20+';
export type CareerTimeline = '3 months' | '6 months' | '1 year' | '2 years';
export type CurrentYear = '1st Year' | '2nd Year' | '3rd Year' | '4th Year' | 'Graduate';
export type DifficultyLevel = 'Beginner' | 'Intermediate' | 'Advanced' | 'Expert';

export type RoadmapCategory =
  | 'Courses'
  | 'Mini Projects'
  | 'Major Projects'
  | 'Coding Practice'
  | 'Certifications'
  | 'Mock Interviews'
  | 'Resume Updates'
  | 'GitHub Tasks'
  | 'Foundation'
  | 'Core Skill'
  | 'Advanced'
  | 'Specialization'
  | 'Placement';

export interface UserProfile {
  name: string;
  email: string;
  avatarUrl: string;
  dreamCareer: string;
  education: string;
  currentYear: CurrentYear;
  currentSkills: string[];
  skillLevel: SkillLevel;
  preferredLearningStyle: LearningStyle;
  weeklyHours: WeeklyHours;
  dreamCompany: string;
  timeline: CareerTimeline;
  challenges: string[];
  certifications?: string[];
  projectsCompleted?: string;
  codingExperience?: string;
  githubUsername?: string;
  placementGoal?: string;
  joinedDate: string;
  streakDays: number;
}

export interface RoadmapStep {
  id: string;
  title: string;
  description: string;
  category: RoadmapCategory;
  difficulty: DifficultyLevel;
  estimatedHours: number;
  resources: { title: string; url: string; type: 'Video' | 'Article' | 'Course' | 'Practice' }[];
  completed: boolean;
  order: number;
  skillsAcquired: string[];
}

export interface Skill360Score {
  overallScore: number;
  technical: number;
  practical: number;
  communication: number;
  problemSolving: number;
  consistency: number;
  industryReadiness: number;
  confidence: number;
  projects: number;
}

export interface PlacementReadiness {
  overallScore: number;
  resumeScore: number;
  githubScore: number;
  codingScore: number;
  projectScore: number;
  interviewScore: number;
  communicationScore: number;
  readinessLabel: 'Unprepared' | 'Developing' | 'Placement Ready' | 'Top Tier';
}

export interface SkillGapItem {
  skill: string;
  category: string;
  userLevel: number; // 0 - 100
  requiredLevel: number; // 0 - 100
  priority: 'High' | 'Medium' | 'Low';
  trend: 'Rising' | 'Stable' | 'Critical';
  recommendedResource: string;
  estimatedLearningHours: number;
}

export interface SecurityVulnerability {
  id: string;
  type: 'SQL Injection' | 'XSS' | 'CSRF' | 'Hardcoded Secrets' | 'API Key Exposure' | 'Weak Authentication' | 'Authorization Issues' | 'Missing Validation' | 'Insecure Dependencies' | 'File Upload Vulnerability' | 'Path Traversal' | 'Sensitive Data Exposure';
  severity: 'Critical' | 'High' | 'Medium' | 'Low';
  filePath: string;
  lineNumber?: number;
  explanation: string;
  aiFixSnippet: string;
}

export interface PerformanceIssue {
  id: string;
  category: 'Memory Leak' | 'Heavy Component' | 'Duplicate API Calls' | 'Slow Algorithm' | 'Large Bundle Size' | 'Unoptimized Rendering' | 'Database Inefficiency' | 'Large Images' | 'Infinite Loop Risk' | 'Expensive Operation';
  impact: 'High' | 'Medium' | 'Low';
  filePath: string;
  description: string;
  suggestion: string;
}

export interface ArchitectureReview {
  folderStructureScore: number;
  namingConventionScore: number;
  stateManagementScore: number;
  componentDesignScore: number;
  apiLayerScore: number;
  dependencyManagementScore: number;
  reusabilityScore: number;
  summary: string;
  positives: string[];
  improvements: string[];
}

export interface InnovationAnalysis {
  innovationScore: number;
  productOriginalityScore: number;
  marketPotentialScore: number;
  missingFeatures: string[];
  aiOpportunities: string[];
  uxImprovements: string[];
}

export interface RefactoringSuggestion {
  id: string;
  codeSmell: string;
  filePath: string;
  impact: string;
  beforeSnippet?: string;
  afterSnippet?: string;
  explanation: string;
}

export interface ProjectAnalysisReport {
  projectName: string;
  scannedFilesCount: number;
  detectedLanguages: string[];
  detectedFrameworks: string[];
  overallScores: {
    security: number;
    performance: number;
    codeQuality: number;
    architecture: number;
    innovation: number;
    compositeScore: number;
  };
  securityVulnerabilities: SecurityVulnerability[];
  performanceIssues: PerformanceIssue[];
  architectureReview: ArchitectureReview;
  innovationAnalysis: InnovationAnalysis;
  refactoringSuggestions: RefactoringSuggestion[];
  codeQualitySummary: {
    maintainability: 'Excellent' | 'Good' | 'Fair' | 'Needs Work';
    readability: 'High' | 'Medium' | 'Low';
    modularity: 'High' | 'Medium' | 'Low';
    scalability: 'Production Ready' | 'Scalable with Refactoring' | 'Monolithic';
  };
  timestamp: string;
}

export interface IndustryTrend {
  id: string;
  title: string;
  category: string;
  demandScore: number; // 0 - 100
  growthRate: string; // e.g. "+34%"
  topCompanies: string[];
  requiredSkills: string[];
  avgSalary: string;
  description: string;
}

export interface SkillDecayItem {
  id: string;
  skill: string;
  lastPracticedDaysAgo: number;
  decayRisk: 'High' | 'Medium' | 'Low';
  suggestedAction: string;
  decayPercentage: number;
  practiceSchedule: string;
}

export interface ProjectFailureCase {
  id: string;
  title: string;
  problem: string;
  impact: string;
  recommendation: string;
  remedyTask: string;
  category: string;
  solved: boolean;
}

export interface MentorMessage {
  id: string;
  sender: 'user' | 'mentor';
  text: string;
  timestamp: string;
  suggestedActions?: string[];
  referencedStepId?: string;
}

export interface NotificationItem {
  id: string;
  title: string;
  message: string;
  type: 'decay' | 'roadmap' | 'interview' | 'achievement' | 'system';
  timestamp: string;
  read: boolean;
  actionTab?: NavigationTab;
}

export interface AchievementBadge {
  id: string;
  title: string;
  description: string;
  iconName: string;
  unlocked: boolean;
  unlockedAt?: string;
  category: 'Milestone' | 'Skill' | 'Streak' | 'Community';
}

export interface MockInterviewQuestion {
  id: string;
  question: string;
  category: string;
  difficulty: DifficultyLevel;
  sampleAnswer: string;
  tips: string[];
}

export interface InternshipItem {
  id: string;
  role: string;
  company: string;
  location: string;
  matchScore: number;
  stipend: string;
  missingSkills: string[];
  postedDaysAgo: number;
}
