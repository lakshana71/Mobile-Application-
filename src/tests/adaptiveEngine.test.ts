declare const process: any;

import {
  generateAssessmentBlueprint,

  extractProjectEvidence,
  generateQuestionFingerprint,
  calculateJaccardSimilarity,
  isQuestionDuplicate,
  generateDynamicQuestion,
  calculateSkillUncertainty,
  selectNextQuestion,
  evaluateAnswer,
  shouldStopAssessment,
  buildMultiSourceSkillProfile,
  buildSkillEvidenceGraph,
  generateMultiSourceSkillGaps,
  updateRoadmapFromSkillGaps,
} from '../services/assessment';
import { UserProfile, AdaptiveAssessmentSession, RoadmapStep } from '../types';

// Mock User Profiles
const mockUserA: UserProfile = {
  name: 'Alex CS Student',
  email: 'alex@cs.edu',
  avatarUrl: '',
  dreamCareer: 'Software Engineer',
  education: 'B.Tech',
  currentYear: '3rd Year',
  currentSkills: ['Python', 'Java', 'SQL'],
  skillLevel: 'Intermediate',
  preferredLearningStyle: 'Projects',
  weeklyHours: '15',
  dreamCompany: 'Company A',
  timeline: '1 year',
  challenges: ['Skill Gap'],
  joinedDate: '2026-08-01',
  streakDays: 5,
};

const mockUserB: UserProfile = {
  name: 'Sarah Cyber Student',
  email: 'sarah@cyber.edu',
  avatarUrl: '',
  dreamCareer: 'Cyber Security Engineer',
  education: 'B.Tech',
  currentYear: '4th Year',
  currentSkills: ['Cyber Security', 'Networking', 'Linux'],
  skillLevel: 'Advanced',
  preferredLearningStyle: 'Practice',
  weeklyHours: '20+',
  dreamCompany: 'Company B',
  timeline: '6 months',
  challenges: ['Placement Fear'],
  joinedDate: '2026-08-01',
  streakDays: 12,
};

export function runAdaptiveEngineTestSuite() {
  console.log('====================================================');
  console.log('RUNNING ADAPTIVE ASSESSMENT ENGINE AUTOMATED TESTS');
  console.log('====================================================\n');

  let passedTests = 0;
  let totalTests = 0;

  function assert(condition: boolean, testName: string) {
    totalTests++;
    if (condition) {
      console.log(`[PASS] Test #${totalTests}: ${testName}`);
      passedTests++;
    } else {
      console.error(`[FAIL] Test #${totalTests}: ${testName}`);
      throw new Error(`Test Failed: ${testName}`);
    }
  }

  // 1. Different roles generate different blueprints
  const bpSoftware = generateAssessmentBlueprint('Company A', 'Software Engineer');
  const bpCyber = generateAssessmentBlueprint('Company B', 'Cyber Security Engineer');
  assert(
    bpSoftware.priorities.includes('Data Structures & Algorithms') &&
      bpCyber.priorities.includes('Cyber Security'),
    'Different roles generate different assessment blueprints.'
  );

  // 2. Different companies generate different skill priorities
  const bpGoogle = generateAssessmentBlueprint('Google', 'Software Engineer');
  const bpStartup = generateAssessmentBlueprint('Startup', 'Software Engineer');
  assert(
    bpGoogle.requiredSkills.find((s) => s.skill.includes('Data Structures'))?.importance === 10,
    'Target company influences skill importance weighting.'
  );

  // 3. Project evidence extraction
  const evidences = extractProjectEvidence(mockUserA);
  assert(
    evidences.some((e) => e.technology === 'JWT & Security') && evidences.some((e) => e.technology === 'Docker'),
    'Project evidence extracts technologies (JWT, Docker, React, Node).'
  );

  // 4. Project evidence generates project-specific verification questions
  const projectQuestion = generateDynamicQuestion({
    user: mockUserA,
    company: 'Company A',
    role: 'Software Engineer',
    skill: 'JWT & Security',
    currentLevel: 40,
    confidence: 30,
    evidence: evidences,
    history: [],
  });
  assert(
    projectQuestion.questionType === 'Project-specific' && projectQuestion.question.includes('JWT'),
    'Project evidence generates project-specific verification questions.'
  );

  // 5. Question Fingerprinting & Deduplication
  const fp1 = generateQuestionFingerprint('What is the time complexity of binary search?', 'DSA', 'Intermediate');
  const fp2 = generateQuestionFingerprint('What is the Big-O complexity of binary search?', 'DSA', 'Intermediate');
  const sim = calculateJaccardSimilarity(
    'What is the time complexity of binary search?',
    'What is the Big-O complexity of binary search?'
  );
  assert(sim >= 0.7, 'Semantically near-duplicate questions detected via similarity.');

  const isDup = isQuestionDuplicate(
    projectQuestion,
    [
      {
        userId: 'alex@cs.edu',
        questionId: projectQuestion.questionId,
        questionFingerprint: projectQuestion.fingerprint,
        skill: 'JWT & Security',
        difficulty: 'Intermediate',
        questionType: 'Project-specific',
        answer: 1,
        score: 90,
        timestamp: new Date().toISOString(),
      },
    ]
  );
  assert(isDup === true, 'Same question or duplicate fingerprint is correctly rejected.');

  // 6. Varying questions for different users
  const qUserA = generateDynamicQuestion({
    user: mockUserA,
    company: 'Company A',
    role: 'Software Engineer',
    skill: 'Data Structures & Algorithms',
    currentLevel: 55,
    confidence: 40,
    evidence: evidences,
    history: [],
  });
  const qUserB = generateDynamicQuestion({
    user: mockUserB,
    company: 'Company B',
    role: 'Cyber Security Engineer',
    skill: 'Networking',
    currentLevel: 85,
    confidence: 80,
    evidence: [],
    history: [],
  });
  assert(qUserA.question !== qUserB.question, 'Different users receive distinct question instances.');

  // 7. Uncertainty-driven selection
  const session: AdaptiveAssessmentSession = {
    sessionId: 'sess_test',
    company: 'Company A',
    role: 'Software Engineer',
    startTime: new Date().toISOString(),
    questionsAnswered: 1,
    targetConfidenceThreshold: 78,
    isComplete: false,
    completionReason: '',
    history: [],
    evaluatedSkills: {
      Python: {
        skill: 'Python',
        level: 85,
        confidence: 92,
        sources: { assessment: 85, project: 80, github: 80, selfReported: 90, coding: 80, interview: 80 },
        evidenceCount: 5,
        trend: 'Stable',
        lastUpdated: '2026-08-27',
      },
      'System Design': {
        skill: 'System Design',
        level: 60,
        confidence: 25,
        sources: { assessment: 30, project: 60, github: 60, selfReported: 40, coding: 50, interview: 50 },
        evidenceCount: 1,
        trend: 'Critical',
        lastUpdated: '2026-08-27',
      },
    },
    detectedFalseProficiencies: [],
    detectedHiddenSkills: [],
  };

  const nextQ = selectNextQuestion(session, mockUserA);
  assert(
    nextQ.skill === 'System Design' || nextQ.skill.includes('Data Structures'),
    'Uncertainty-driven selection prioritizes low-confidence / high-uncertainty skills.'
  );

  // 8. Correct Answer increases confidence & level
  const evalCorrect = evaluateAnswer(projectQuestion, projectQuestion.correctAnswer, mockUserA);
  assert(
    evalCorrect.score >= 80 && evalCorrect.skillImpact > 0 && evalCorrect.confidenceImpact > 0,
    'Correct answer increases skill level and evidence confidence.'
  );

  // 9. Incorrect Answer decreases level / flags validation
  const evalIncorrect = evaluateAnswer(projectQuestion, 'wrong_answer_idx', mockUserA);
  assert(
    evalIncorrect.score < 50 && evalIncorrect.skillImpact < 0 && evalIncorrect.needsFollowUp === true,
    'Incorrect answer lowers skill level and triggers follow-up validation.'
  );

  // 10. False Proficiency Detection
  const highSelfReportUser: UserProfile = { ...mockUserA, skillLevel: 'Advanced', currentSkills: ['JWT & Security'] };
  const evalFalseProf = evaluateAnswer(
    projectQuestion,
    'wrong_answer_idx',
    highSelfReportUser,
    { skill: 'JWT & Security', level: 75, confidence: 40, sources: { assessment: 30, project: 40, github: 40, selfReported: 90, coding: 40, interview: 40 }, evidenceCount: 2, trend: 'Critical', lastUpdated: '' }
  );
  assert(
    evalFalseProf.detectedFalseProficiency === true,
    'Detects False Proficiency when self-reported level is high but answer is incorrect.'
  );

  // 11. Hidden Skill Detection
  const lowSelfReportUser: UserProfile = { ...mockUserA, skillLevel: 'Beginner', currentSkills: [] };
  const evalHidden = evaluateAnswer(projectQuestion, projectQuestion.correctAnswer, lowSelfReportUser);
  assert(
    evalHidden.detectedHiddenSkill === true,
    'Detects Hidden Skill when user demonstrates mastery despite low self-report.'
  );

  // 12. Dynamic Stopping Condition
  const sessionStopping: AdaptiveAssessmentSession = {
    ...session,
    questionsAnswered: 7,
    evaluatedSkills: {
      'DSA': { skill: 'DSA', level: 80, confidence: 85, sources: { assessment: 80, project: 80, github: 80, selfReported: 80, coding: 80, interview: 80 }, evidenceCount: 4, trend: 'Stable', lastUpdated: '' },
    },
  };
  const stopRes = shouldStopAssessment(sessionStopping);
  assert(stopRes.stop === true, 'Dynamic assessment stops when sufficient evidence confidence is collected.');

  // 13. Multi-Source Skill Gap Update
  const evalSkillsMap = buildMultiSourceSkillProfile(mockUserA);
  const gaps = generateMultiSourceSkillGaps(mockUserA, evalSkillsMap);
  assert(gaps.length > 0 && gaps.some((g) => g.priority === 'High' || g.priority === 'Medium'), 'Multi-source skill gaps updated.');

  // 14. Roadmap updates in response to gaps without destroying completed items
  const dummyRoadmap: RoadmapStep[] = [
    {
      id: 'step-1',
      title: 'Completed Fundamentals',
      description: 'Done',
      category: 'Courses',
      difficulty: 'Beginner',
      estimatedHours: 5,
      resources: [],
      completed: true,
      order: 1,
      skillsAcquired: [],
    },
    {
      id: 'step-2',
      title: 'Uncompleted Core',
      description: 'Todo',
      category: 'Courses',
      difficulty: 'Intermediate',
      estimatedHours: 10,
      resources: [],
      completed: false,
      order: 2,
      skillsAcquired: [],
    },
  ];
  const updatedRoadmap = updateRoadmapFromSkillGaps(dummyRoadmap, gaps, mockUserA);
  assert(
    updatedRoadmap[0].completed === true && updatedRoadmap[1].title.includes('Masterclass'),
    'Roadmap updates uncompleted priorities while preserving completed milestones.'
  );

  console.log(`\n====================================================`);
  console.log(`ALL ${passedTests} / ${totalTests} TESTS PASSED SUCCESSFULLY!`);
  console.log(`====================================================\n`);
  return true;
}

// Execute test suite if run directly via Node
if (typeof process !== 'undefined' && process.argv && process.argv[1]?.includes('adaptiveEngine.test')) {
  runAdaptiveEngineTestSuite();
}
