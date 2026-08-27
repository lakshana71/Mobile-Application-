export type { GitHubAnalysisResult } from '../services/githubAnalyzerService';

export type ScreenState = 'splash' | 'login' | 'questionnaire' | 'app';


export type NavigationTab =
  | 'dashboard'
  | 'circular-workflow'
  | 'practical-assessment'
  | 'project-analysis'
  | 'skill-gap-engine'
  | 'skill-genome'
  | 'skill-evolution'
  | 'ai-shadow-mentor'
  | 'skill-gap'
  | 'roadmap'
  | 'projects'
  | 'analytics'
  | 'mentor'
  | 'career-goals'
  | 'settings'
  | 'profile'
  | 'resume-analyzer'
  | 'github-analyzer'
  | 'mock-interview'
  | 'digital-twin'
  | 'ai-mentor'
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

export interface SkillGenomeNode {
  id: string;
  label: string;
  score: number;
  intensity: number;
  base?: number;
}

export interface SkillEvolutionHistoryItem {
  id: string;
  skill: string;
  stage: SkillEvolutionStage;
  change: string;
  date: string;
  confidence: number;
}

export type SkillEvolutionStage = 'Emerging' | 'Growing' | 'Strong' | 'Declining' | 'Refresh Needed' | 'Evolved';

export interface LearningBehaviour {
  focus: string;
  pattern: string;
  risk: string;
  preferredStyle: string;
  consistency: number;
  confidence: number;
  lastActivity: string;
}

export interface ShadowMentorInsight {
  id: string;
  title: string;
  insight: string;
  recommendation: string;
  priority: 'High' | 'Medium' | 'Low';
}

export interface CareerPrediction {
  id: string;
  title: string;
  probability: number;
  rationale: string;
  nextAction: string;
}

export interface StudentDigitalTwin {
  overview: number;
  readiness: number;
  health: number;
  genome: SkillGenomeNode[];
  evolutionHistory: SkillEvolutionHistoryItem[];
  learningBehaviour: LearningBehaviour;
  mentorInsights: ShadowMentorInsight[];
  careerPredictions: CareerPrediction[];
}

export type AssessmentTaskType = 'coding' | 'debugging' | 'scenario' | 'simulation' | 'quiz';

export interface PracticalAssessmentTask {
  id: string;
  title: string;
  type: AssessmentTaskType;
  category: string;
  difficulty: DifficultyLevel;
  question: string;
  codeSnippet?: string;
  options?: string[];
  correctAnswer: string | number;
  explanation: string;
}

export interface PracticalAssessmentResult {
  completed: boolean;
  score: number; // 0-100
  totalQuestions: number;
  correctCount: number;
  skillWisePerformance: { skill: string; score: number }[];
  strengths: string[];
  weakAreas: string[];
  timestamp: string;
}

export interface ProjectSubmissionData {
  githubUrl?: string;
  zipFileName?: string;
  liveUrl?: string;
  evaluations: {
    codeQuality: number;
    folderStructure: number;
    technologiesUsed: string[];
    apiIntegration: number;
    databaseUsage: number;
    authentication: number;
    securityPractices: number;
    deploymentReadiness: number;
    documentation: number;
    projectComplexity: number;
    overallProjectScore: number;
  };
  scannedFiles: number;
  timestamp: string;
}

export type QuestionType =
  | 'Conceptual'
  | 'MCQ'
  | 'Short answer'
  | 'Scenario-based'
  | 'Debugging'
  | 'Code analysis'
  | 'Architecture/design'
  | 'Project-specific'
  | 'GitHub-specific'
  | 'Practical problem'
  | 'Interview-style'
  | 'Trade-off/decision question';

export interface SkillConfidenceItem {
  skill: string;
  level: number; // 0 - 100
  confidence: number; // 0 - 100%
  sources: {
    assessment: number;
    project: number;
    github: number;
    selfReported: number;
    coding: number;
    interview: number;
  };
  evidenceCount: number;
  trend: 'Rising' | 'Stable' | 'Critical';
  lastUpdated: string;
}

export interface SkillEvidenceSourceItem {
  name: string;
  score: number;
  weight: number;
  confidence: number;
  evidenceDetails: string;
}

export interface SkillEvidenceGraphNode {
  skill: string;
  overallScore: number;
  confidence: number;
  sources: SkillEvidenceSourceItem[];
}

export interface AssessmentBlueprintItem {
  skill: string;
  category: string;
  importance: number; // 1-10
  targetLevel: number; // 0-100
  isCore: boolean;
}

export interface AssessmentBlueprint {
  company: string;
  role: string;
  description: string;
  requiredSkills: AssessmentBlueprintItem[];
  priorities: string[];
}

export interface GeneratedQuestion {
  questionId: string;
  skill: string;
  subSkill: string;
  companyContext: string;
  roleContext: string;
  difficulty: DifficultyLevel;
  questionType: QuestionType;
  source: 'RoleBlueprint' | 'ProjectEvidence' | 'GitHubEvidence' | 'UncertaintyValidation';
  projectReference?: string;
  question: string;
  codeSnippet?: string;
  options?: string[];
  correctAnswer: string | number;
  explanation: string;
  expectedCompetency: string;
  generatedAt: string;
  fingerprint: string;
}

export interface QuestionHistoryEntry {
  userId: string;
  questionId: string;
  questionFingerprint: string;
  skill: string;
  difficulty: DifficultyLevel;
  questionType: QuestionType;
  answer: string | number;
  score: number;
  timestamp: string;
}

export interface AnswerEvaluationResult {
  score: number;
  correctness: number; // 0.0 - 1.0
  skillImpact: number;
  confidenceImpact: number;
  needsFollowUp: boolean;
  feedback: string;
  detectedFalseProficiency?: boolean;
  detectedHiddenSkill?: boolean;
  explanation: string;
}

export interface AdaptiveAssessmentSession {
  sessionId: string;
  company: string;
  role: string;
  startTime: string;
  questionsAnswered: number;
  targetConfidenceThreshold: number;
  isComplete: boolean;
  completionReason: string;
  history: QuestionHistoryEntry[];
  currentQuestion?: GeneratedQuestion;
  evaluatedSkills: Record<string, SkillConfidenceItem>;
  detectedFalseProficiencies: string[];
  detectedHiddenSkills: string[];
}

