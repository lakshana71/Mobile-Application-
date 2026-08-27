import {
  GeneratedQuestion,
  DifficultyLevel,
  QuestionType,
  UserProfile,
  QuestionHistoryEntry,
} from '../../types';
import { ProjectSkillEvidence } from './projectEvidenceExtractor';
import { generateQuestionFingerprint, isQuestionDuplicate } from './questionDeduplicationService';

interface QuestionGeneratorParams {
  user: UserProfile;
  company: string;
  role: string;
  skill: string;
  currentLevel: number;
  confidence: number;
  evidence: ProjectSkillEvidence[];
  history: QuestionHistoryEntry[];
  targetDifficulty?: DifficultyLevel;
  preferredType?: QuestionType;
}

const QUESTION_TYPES: QuestionType[] = [
  'Conceptual',
  'MCQ',
  'Short answer',
  'Scenario-based',
  'Debugging',
  'Code analysis',
  'Architecture/design',
  'Project-specific',
  'GitHub-specific',
  'Practical problem',
  'Interview-style',
  'Trade-off/decision question',
];

/**
 * Dynamic Question Generation Engine.
 * Constructs unique, contextual, multi-type questions based on user evidence, target company/role, and skill state.
 */
export function generateDynamicQuestion(params: QuestionGeneratorParams): GeneratedQuestion {
  const { user, company, role, skill, currentLevel, confidence, evidence, history, targetDifficulty, preferredType } = params;

  // Determine difficulty based on level if not provided
  const difficulty: DifficultyLevel =
    targetDifficulty ||
    (currentLevel >= 80 ? 'Expert' : currentLevel >= 65 ? 'Advanced' : currentLevel >= 45 ? 'Intermediate' : 'Beginner');

  // Check if there is direct project evidence for this skill
  const matchingEvidence = evidence.find(
    (e) => e.technology.toLowerCase().includes(skill.toLowerCase()) || skill.toLowerCase().includes(e.technology.toLowerCase())
  );

  let questionType: QuestionType = preferredType || 'MCQ';
  if (matchingEvidence && (!preferredType || Math.random() > 0.4)) {
    questionType = 'Project-specific';
  }

  // Attempt question generation with variation seed based on history length and timestamp
  let question: GeneratedQuestion | null = null;
  let attempts = 0;

  while (!question && attempts < 10) {
    attempts++;
    const seed = Date.now() + attempts * 1000 + history.length;
    const candidate = buildQuestionInstance(user, company, role, skill, difficulty, questionType, matchingEvidence, seed);

    if (!isQuestionDuplicate(candidate, history)) {
      question = candidate;
    } else {
      // If duplicate, try a different question type or scenario seed
      questionType = QUESTION_TYPES[(attempts + history.length) % QUESTION_TYPES.length];
    }
  }

  // Fallback fallback if all attempts were deduplicated (should be rare)
  if (!question) {
    question = buildQuestionInstance(user, company, role, skill, difficulty, 'Conceptual', matchingEvidence, Date.now() + 999);
  }

  return question;
}

function buildQuestionInstance(
  user: UserProfile,
  company: string,
  role: string,
  skill: string,
  difficulty: DifficultyLevel,
  type: QuestionType,
  evidence?: ProjectSkillEvidence,
  seed: number = Date.now()
): GeneratedQuestion {
  const skillLower = skill.toLowerCase();
  const qId = `gen_q_${skillLower.replace(/[^a-z0-9]/g, '')}_${seed}`;

  // 1. Project-Aware Question Generation
  if (type === 'Project-specific' || (evidence && (skillLower.includes('jwt') || skillLower.includes('docker') || skillLower.includes('react') || skillLower.includes('node') || skillLower.includes('mongo')))) {
    if (skillLower.includes('jwt') || skillLower.includes('security')) {
      const scenarios = [
        {
          question: `Your project (${evidence?.projectName || 'Full-Stack App'}) utilizes JWT authentication. Explain how your application handles token expiration and what security vulnerability arises if JWT secrets are exposed in client-side bundles?`,
          codeSnippet: `// Authentication Handler\nconst token = jwt.sign({ userId: user.id }, "secret_key_123");\nres.cookie('token', token);`,
          options: [
            'Attaches signature verification on the client side only',
            'Exposed secrets allow attackers to forge arbitrary valid tokens and elevate privileges',
            'JWT tokens automatically re-encrypt every 5 minutes on localStorage',
            'Causes CORS preflight headers to fail on GET requests',
          ],
          correctAnswer: 1,
          explanation: 'Exposing JWT signing secrets client-side allows any attacker to sign forged tokens, completely bypassing server authorization.',
        },
        {
          question: `In your repository, authentication tokens are sent via API headers. What is the key difference between storing JWT tokens in localStorage versus HTTP-only Secure Cookies?`,
          options: [
            'localStorage is vulnerable to XSS attacks; HTTP-only cookies prevent JavaScript access to tokens',
            'HTTP-only cookies are vulnerable to SQL injection',
            'localStorage automatically attaches to cross-origin fetch requests',
            'HTTP-only cookies double the size of payload data',
          ],
          correctAnswer: 0,
          explanation: 'HTTP-only cookies cannot be read by browser JavaScript, protecting tokens from XSS exfiltration.',
        },
      ];
      const selected = scenarios[seed % scenarios.length];

      return {
        questionId: qId,
        skill: 'JWT & Security',
        subSkill: 'Authentication & Token Security',
        companyContext: company,
        roleContext: role,
        difficulty,
        questionType: 'Project-specific',
        source: 'ProjectEvidence',
        projectReference: evidence?.projectName || 'Scanned Repository',
        question: selected.question,
        codeSnippet: selected.codeSnippet,
        options: selected.options,
        correctAnswer: selected.correctAnswer,
        explanation: selected.explanation,
        expectedCompetency: 'JWT Token Hygiene & Auth Defense',
        generatedAt: new Date().toISOString(),
        fingerprint: generateQuestionFingerprint(selected.question, skill, difficulty),
      };
    }

    if (skillLower.includes('docker')) {
      const scenarios = [
        {
          question: `You have Docker configuration in your repository (${evidence?.projectName || 'Capstone'}). Explain how the containerized backend service communicates with the database container in docker-compose.`,
          codeSnippet: `version: '3.8'\nservices:\n  web:\n    build: .\n    ports: ["3000:3000"]\n  db:\n    image: postgres:15`,
          options: [
            'Using hardcoded host IP 127.0.0.1 directly',
            'Containers communicate over docker-compose automatic internal DNS network using service names (e.g. db:5432)',
            'Web containers cannot connect to database containers without public domain names',
            'Database queries require HTTP REST calls',
          ],
          correctAnswer: 1,
          explanation: 'Docker Compose creates a default network where service names serve as hostname DNS targets.',
        },
        {
          question: `Why would multi-stage Docker builds be recommended for your production Node.js deployment?`,
          options: [
            'To run multiple database engines in one container',
            'To strip devDependencies and build tools, drastically reducing final image size and security surface',
            'To bypass Linux root permissions automatically',
            'To speed up CPU clock cycles',
          ],
          correctAnswer: 1,
          explanation: 'Multi-stage builds separate compilation environments from slim production execution containers.',
        },
      ];
      const selected = scenarios[seed % scenarios.length];

      return {
        questionId: qId,
        skill: 'Docker',
        subSkill: 'Container Orchestration',
        companyContext: company,
        roleContext: role,
        difficulty,
        questionType: 'Project-specific',
        source: 'ProjectEvidence',
        projectReference: evidence?.projectName || 'Dockerized Repository',
        question: selected.question,
        codeSnippet: selected.codeSnippet,
        options: selected.options,
        correctAnswer: selected.correctAnswer,
        explanation: selected.explanation,
        expectedCompetency: 'Container Networking & Production Isolation',
        generatedAt: new Date().toISOString(),
        fingerprint: generateQuestionFingerprint(selected.question, skill, difficulty),
      };
    }
  }

  // 2. DSA / Algorithmic Questions
  if (skillLower.includes('data structures') || skillLower.includes('dsa') || skillLower.includes('algorithm')) {
    const contexts = ['timestamped financial logs', 'integer array thresholds', 'social network user connections', 'flight route nodes'];
    const selectedContext = contexts[seed % contexts.length];

    if (difficulty === 'Advanced' || difficulty === 'Expert') {
      const qText = `At ${company}, you need to find the optimal search threshold across ${selectedContext}. Which algorithmic approach yields O(Log N) time complexity with O(1) auxiliary space?`;
      return {
        questionId: qId,
        skill: 'Data Structures & Algorithms',
        subSkill: 'Binary Search & Boundary Optimization',
        companyContext: company,
        roleContext: role,
        difficulty,
        questionType: 'Scenario-based',
        source: 'RoleBlueprint',
        question: qText,
        options: [
          'Linear Scan with Breadth First Search',
          'Binary Search on monotonically ordered boundaries',
          'Hash Table lookup with chaining',
          'Depth First Search with recursion stack',
        ],
        correctAnswer: 1,
        explanation: 'Binary search repeatedly halves the search space on ordered datasets in O(log N) time and O(1) space.',
        expectedCompetency: 'Logarithmic Search & Space Efficiency',
        generatedAt: new Date().toISOString(),
        fingerprint: generateQuestionFingerprint(qText, skill, difficulty),
      };
    } else {
      const qText = `You are evaluating search performance over ${selectedContext}. If the input size increases from 1,000 to 1,000,000 items, how many comparisons does Binary Search require in the worst case?`;
      return {
        questionId: qId,
        skill: 'Data Structures & Algorithms',
        subSkill: 'Algorithmic Complexity & Big-O',
        companyContext: company,
        roleContext: role,
        difficulty,
        questionType: 'Conceptual',
        source: 'RoleBlueprint',
        question: qText,
        options: ['1,000 comparisons', '100,000 comparisons', 'Approximately 20 comparisons (log2(1,000,000))', '1,000,000 comparisons'],
        correctAnswer: 2,
        explanation: 'log2(1,000,000) is approximately 19.93, meaning at most 20 step divisions.',
        expectedCompetency: 'Big-O Growth Analysis',
        generatedAt: new Date().toISOString(),
        fingerprint: generateQuestionFingerprint(qText, skill, difficulty),
      };
    }
  }

  // 3. System Design Questions
  if (skillLower.includes('system design') || skillLower.includes('architecture')) {
    const qText = `Designing backend services for ${company}'s ${role} infrastructure: How do you protect core API services from being degraded by sudden burst traffic spikes?`;
    return {
      questionId: qId,
      skill: 'System Design',
      subSkill: 'Traffic Management & Rate Limiting',
      companyContext: company,
      roleContext: role,
      difficulty,
      questionType: 'Architecture/design',
      source: 'RoleBlueprint',
      question: qText,
      options: [
        'Increase HTTP request timeout limit to 60 seconds',
        'Implement Token Bucket / Leaky Bucket Rate Limiting at the API Gateway level',
        'Disable CORS headers during peak hours',
        'Convert all database tables to unindexed text files',
      ],
      correctAnswer: 1,
      explanation: 'Rate limiting via Token Bucket algorithms throttles incoming request rates, preserving downstream service availability.',
      expectedCompetency: 'Resilient Microservice Design',
      generatedAt: new Date().toISOString(),
      fingerprint: generateQuestionFingerprint(qText, skill, difficulty),
    };
  }

  // 4. Default / Generic fallback tailored to skill & company
  const qText = `As a ${role} at ${company}, when working with ${skill}, what primary engineering principle ensures code maintainability and testability?`;
  return {
    questionId: qId,
    skill,
    subSkill: `${skill} Execution`,
    companyContext: company,
    roleContext: role,
    difficulty,
    questionType: type,
    source: 'RoleBlueprint',
    question: qText,
    options: [
      'Single Responsibility Principle and clear modular decoupling',
      'Combining all logic into single top-level files',
      'Ignoring error boundary exceptions',
      'Hardcoding configuration constants directly in component loops',
    ],
    correctAnswer: 0,
    explanation: 'Modular decoupling and Single Responsibility Principle maximize maintainability and test coverage.',
    expectedCompetency: `${skill} Best Practices`,
    generatedAt: new Date().toISOString(),
    fingerprint: generateQuestionFingerprint(qText, skill, difficulty),
  };
}
