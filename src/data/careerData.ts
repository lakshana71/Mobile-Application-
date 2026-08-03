import { IndustryTrend, ProjectFailureCase, AchievementBadge, MockInterviewQuestion, InternshipItem } from '../types';

export const DREAM_CAREERS = [
  'Software Engineer',
  'AI Engineer',
  'Cyber Security Engineer',
  'Data Scientist',
  'ML Engineer',
  'Cloud Engineer',
  'DevOps Engineer',
  'Full Stack Developer',
  'Game Developer',
  'UI UX Designer',
];

export const EDUCATION_LIST = ['Diploma', 'B.E', 'B.Tech', 'BCA', 'MCA', 'MSc', 'Other'];

export const YEAR_LIST = ['1st Year', '2nd Year', '3rd Year', '4th Year', 'Graduate'];

export const ALL_SKILLS_LIST = [
  'Python',
  'Java',
  'C++',
  'JavaScript',
  'TypeScript',
  'React',
  'Node.js',
  'Flutter',
  'AI & Prompting',
  'Machine Learning',
  'Deep Learning',
  'PyTorch',
  'TensorFlow',
  'Cyber Security',
  'Ethical Hacking',
  'Networking',
  'SQL',
  'MongoDB',
  'Docker',
  'Kubernetes',
  'AWS',
  'Git & GitHub',
  'Data Structures & Algorithms',
  'System Design',
  'Figma & UI/UX',
  'Communication',
  'Problem Solving',
  'Agile Workflow',
];

export const LEARNING_STYLES = ['Videos', 'Projects', 'Reading', 'Practice', 'Mentor'];

export const WEEKLY_HOURS_LIST = ['2', '5', '10', '15', '20+'];

export const DREAM_COMPANIES = ['Google', 'Microsoft', 'Amazon', 'Apple', 'Tesla', 'OpenAI', 'Startup', 'Meta', 'Netflix', 'NVIDIA'];

export const TIMELINES = ['3 months', '6 months', '1 year', '2 years'];

export const CHALLENGES_LIST = [
  'Low Confidence',
  'No Roadmap',
  'Skill Gap',
  'Lack of Practice',
  'Forget Skills',
  'No Mentor',
  'Industry Changes',
  'Placement Fear',
  'Time Management',
];

export const ROLE_SKILL_REQUIREMENTS: Record<string, { core: string[]; optional: string[]; description: string }> = {
  'Software Engineer': {
    core: ['Python', 'Java', 'Data Structures & Algorithms', 'SQL', 'Git & GitHub', 'System Design', 'Problem Solving'],
    optional: ['C++', 'TypeScript', 'Docker', 'AWS', 'Communication'],
    description: 'Build robust scalable backend/frontend software systems and master algorithms.',
  },
  'AI Engineer': {
    core: ['Python', 'Data Structures & Algorithms', 'Machine Learning', 'Deep Learning', 'PyTorch', 'SQL', 'AI & Prompting'],
    optional: ['TensorFlow', 'TypeScript', 'Docker', 'AWS', 'Problem Solving'],
    description: 'Develop intelligent systems, fine-tune LLMs, and deploy neural network models.',
  },
  'Cyber Security Engineer': {
    core: ['Cyber Security', 'Networking', 'Ethical Hacking', 'Python', 'Linux', 'SQL', 'Problem Solving'],
    optional: ['C++', 'Docker', 'AWS', 'Git & GitHub'],
    description: 'Defend systems, analyze attack vectors, conduct penetration testing and secure networks.',
  },
  'Data Scientist': {
    core: ['Python', 'SQL', 'Machine Learning', 'Data Structures & Algorithms', 'Statistics', 'Git & GitHub', 'Problem Solving'],
    optional: ['Deep Learning', 'PyTorch', 'AWS', 'Communication'],
    description: 'Transform complex raw data into actionable statistical insights and predictive AI models.',
  },
  'ML Engineer': {
    core: ['Python', 'Machine Learning', 'Deep Learning', 'PyTorch', 'TensorFlow', 'Data Structures & Algorithms', 'Docker'],
    optional: ['SQL', 'AWS', 'System Design'],
    description: 'Engineers machine learning pipelines, MLOps automation, and real-time inference engines.',
  },
  'Cloud Engineer': {
    core: ['AWS', 'Docker', 'Kubernetes', 'Networking', 'Linux', 'Python', 'System Design'],
    optional: ['Git & GitHub', 'SQL', 'Cyber Security'],
    description: 'Architect, deploy, and manage cloud infrastructures, serverless clusters, and VPCs.',
  },
  'DevOps Engineer': {
    core: ['Docker', 'Kubernetes', 'AWS', 'Git & GitHub', 'Python', 'Networking', 'System Design'],
    optional: ['Cyber Security', 'Linux', 'SQL'],
    description: 'Automate CI/CD infrastructure, monitor reliability, and orchestrate cloud containers.',
  },
  'Full Stack Developer': {
    core: ['React', 'TypeScript', 'Node.js', 'JavaScript', 'SQL', 'MongoDB', 'Git & GitHub', 'Data Structures & Algorithms'],
    optional: ['AWS', 'Docker', 'Figma & UI/UX'],
    description: 'Design end-to-end web applications, responsive UIs, API services, and databases.',
  },
  'Game Developer': {
    core: ['C++', 'Data Structures & Algorithms', 'Python', 'Mathematics', 'Git & GitHub', 'Problem Solving'],
    optional: ['Figma & UI/UX', 'System Design'],
    description: 'Craft immersive 2D/3D physics engines, game logic, shaders, and real-time graphics.',
  },
  'UI UX Designer': {
    core: ['Figma & UI/UX', 'Communication', 'JavaScript', 'React', 'Problem Solving'],
    optional: ['TypeScript', 'Git & GitHub'],
    description: 'Create user research, interactive wireframes, design systems, and aesthetic interfaces.',
  },
};

export const INITIAL_INDUSTRY_TRENDS: IndustryTrend[] = [
  {
    id: 'trend-1',
    title: 'Generative AI & LLM Engineering',
    category: 'AI & Machine Learning',
    demandScore: 98,
    growthRate: '+42% YoY',
    topCompanies: ['OpenAI', 'Google', 'Microsoft', 'Anthropic'],
    requiredSkills: ['Python', 'PyTorch', 'Deep Learning', 'AI & Prompting'],
    avgSalary: '$145,000 / yr',
    description: 'Surging market demand for engineers capable of fine-tuning foundational models and RAG architectures.',
  },
  {
    id: 'trend-2',
    title: 'Cloud-Native & Kubernetes Infrastructure',
    category: 'DevOps & Cloud',
    demandScore: 92,
    growthRate: '+28% YoY',
    topCompanies: ['Amazon', 'Tesla', 'Uber', 'Apple'],
    requiredSkills: ['AWS', 'Docker', 'Kubernetes', 'System Design'],
    avgSalary: '$135,000 / yr',
    description: 'High-volume hiring for multi-cloud automation and zero-downtime microservices orchestration.',
  },
  {
    id: 'trend-3',
    title: 'Zero Trust Cyber Defense',
    category: 'Cyber Security',
    demandScore: 89,
    growthRate: '+31% YoY',
    topCompanies: ['CrowdStrike', 'Palo Alto Networks', 'Microsoft', 'Cisco'],
    requiredSkills: ['Cyber Security', 'Ethical Hacking', 'Networking'],
    avgSalary: '$130,000 / yr',
    description: 'Critical demand for threat prevention specialists and cloud infrastructure vulnerability auditors.',
  },
  {
    id: 'trend-4',
    title: 'Modern Full-Stack TypeScript Ecosystems',
    category: 'Software Engineering',
    demandScore: 88,
    growthRate: '+24% YoY',
    topCompanies: ['Stripe', 'Vercel', 'Meta', 'Airbnb'],
    requiredSkills: ['React', 'TypeScript', 'Node.js', 'SQL'],
    avgSalary: '$120,000 / yr',
    description: 'Widespread adoption of server-side rendering, React Server Components, and edge databases.',
  },
];

export const FAILURE_SIMULATIONS: ProjectFailureCase[] = [
  {
    id: 'fail-1',
    title: 'Unoptimized Data Structure in Production Search',
    problem: 'O(N^2) Nested Array Lookup under heavy user concurrency',
    impact: 'API response latency spiked to 4.2 seconds -> 38% Interview test failure rate in live code rounds',
    recommendation: 'Refactor algorithm using HashMap indexing O(1) and practice 30 LeetCode Medium array problems.',
    remedyTask: 'Solve 30 Hash Map & Array problems',
    category: 'Data Structures & Algorithms',
    solved: false,
  },
  {
    id: 'fail-2',
    title: 'State Sync Lag in React Architecture',
    problem: 'Mutating deep state directly instead of immutable state handlers',
    impact: 'UI rendered stale components -> Failed technical round live coding evaluation',
    recommendation: 'Implement strict immutable patterns or state managers (Zustand/Redux) and practice clean React state architecture.',
    remedyTask: 'Build 1 Mini React Application using custom hooks',
    category: 'Practical Frontend',
    solved: false,
  },
  {
    id: 'fail-3',
    title: 'Unsecured API Endpoint & Memory Leak in Python',
    problem: 'Unclosed database cursors & missing token validation middleware',
    impact: 'System crash during stress testing -> Project rejection by hiring managers',
    recommendation: 'Incorporate context managers (`with` statement) and JWT security authorization headers.',
    remedyTask: 'Audited 2 backend projects for memory leaks & security checks',
    category: 'System Design & Backend',
    solved: false,
  },
];

export const INITIAL_ACHIEVEMENTS: AchievementBadge[] = [
  {
    id: 'badge-1',
    title: 'First Step Master',
    description: 'Completed your first roadmap learning module',
    iconName: 'Zap',
    unlocked: true,
    unlockedAt: '2 days ago',
    category: 'Milestone',
  },
  {
    id: 'badge-2',
    title: 'SkillSphere Pioneer',
    description: 'Achieved an overall SkillSphere 360° score above 70',
    iconName: 'Award',
    unlocked: false,
    category: 'Skill',
  },
  {
    id: 'badge-3',
    title: 'Consistency Champion',
    description: 'Maintained a 7-day learning streak',
    iconName: 'Flame',
    unlocked: true,
    unlockedAt: 'Today',
    category: 'Streak',
  },
  {
    id: 'badge-4',
    title: 'Failure Analyst',
    description: 'Analyzed & resolved a real-world project failure case',
    iconName: 'ShieldAlert',
    unlocked: false,
    category: 'Skill',
  },
  {
    id: 'badge-5',
    title: 'Placement Ready',
    description: 'Reached 85%+ Industry Placement Readiness score',
    iconName: 'CheckCircle2',
    unlocked: false,
    category: 'Milestone',
  },
];

export const MOCK_INTERVIEW_QUESTIONS: MockInterviewQuestion[] = [
  {
    id: 'q1',
    question: 'How do you analyze and optimize the time complexity of a recursive algorithm with overlapping subproblems?',
    category: 'DSA & Optimization',
    difficulty: 'Intermediate',
    sampleAnswer: 'Identify overlapping subproblems, use Memoization (top-down) or Tabulation (bottom-up) to store state results, reducing exponential O(2^N) complexity to linear O(N) or polynomial O(N*K).',
    tips: ['Mention space complexity trade-off', 'Draw a recursion tree in visual explanation'],
  },
  {
    id: 'q2',
    question: 'Explain the difference between SQL indexing (B-Trees) and NoSQL document indexing, and when to use each.',
    category: 'Databases & System Design',
    difficulty: 'Advanced',
    sampleAnswer: 'B-Tree indexes maintain sorted order for range queries and strict ACID compliance, while NoSQL inverted indexes offer fast horizontal key-value lookups ideal for unstructured telemetry data.',
    tips: ['Discuss index maintenance write overhead', 'Mention composite index ordering'],
  },
  {
    id: 'q3',
    question: 'Describe a situation where a software project had a critical flaw and how you identified the root cause.',
    category: 'Behavioral & System Debugging',
    difficulty: 'Intermediate',
    sampleAnswer: 'Used log tracing, reproduced the crash scenario in isolated unit tests, pinpointed asynchronous race conditions, and resolved it using atomic locks.',
    tips: ['Use STAR framework (Situation, Task, Action, Result)', 'Quantify impact metrics'],
  },
];

export const INITIAL_INTERNSHIPS: InternshipItem[] = [
  {
    id: 'int-1',
    role: 'Associate AI Engineer Intern',
    company: 'OpenAI Partner Labs',
    location: 'Remote / San Francisco',
    matchScore: 94,
    stipend: '$4,500 / mo',
    missingSkills: ['PyTorch'],
    postedDaysAgo: 1,
  },
  {
    id: 'int-2',
    role: 'Junior Software Development Engineer',
    company: 'Stripe Development Hub',
    location: 'Remote',
    matchScore: 88,
    stipend: '$3,800 / mo',
    missingSkills: ['System Design'],
    postedDaysAgo: 3,
  },
  {
    id: 'int-3',
    role: 'Cloud & Infrastructure Analyst',
    company: 'Amazon Web Services',
    location: 'Hybrid',
    matchScore: 82,
    stipend: '$3,500 / mo',
    missingSkills: ['Kubernetes'],
    postedDaysAgo: 2,
  },
];
