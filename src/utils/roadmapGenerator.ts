import { UserProfile, RoadmapStep } from '../types';
import { ROLE_SKILL_REQUIREMENTS } from '../data/careerData';

export function generateRoadmapForUser(profile: UserProfile): RoadmapStep[] {
  const targetRole = profile.dreamCareer || 'Software Engineer';
  const targetCompany = profile.dreamCompany || 'Top Tech Companies';
  const requirements = ROLE_SKILL_REQUIREMENTS[targetRole] || ROLE_SKILL_REQUIREMENTS['Software Engineer'];
  const userSkillSet = new Set((profile.currentSkills || []).map((s) => s.toLowerCase()));

  const steps: RoadmapStep[] = [];
  let order = 1;

  // 1. Courses Step
  const missingCore = requirements.core.filter((s) => !userSkillSet.has(s.toLowerCase()));
  const focusSkill = missingCore[0] || requirements.core[0] || 'Core Technologies';
  
  steps.push({
    id: `step-${order}`,
    title: `${focusSkill} Production Masterclass`,
    description: `Complete comprehensive online curriculum covering ${focusSkill} concepts, syntax, architecture, and real-world deployment paradigms.`,
    category: 'Courses',
    difficulty: 'Intermediate',
    estimatedHours: profile.weeklyHours === '20+' ? 15 : 25,
    resources: [
      { title: `Complete ${focusSkill} Video Course & Certificate`, url: 'https://coursera.org', type: 'Course' },
      { title: 'Interactive Code Walkthroughs', url: 'https://developer.mozilla.org', type: 'Article' },
    ],
    completed: userSkillSet.has(focusSkill.toLowerCase()),
    order: order++,
    skillsAcquired: [focusSkill, 'Core Fundamentals'],
  });

  // 2. Coding Practice Step
  steps.push({
    id: `step-${order}`,
    title: `Data Structures & Problem Solving Drills`,
    description: `Solve 40 targeted LeetCode / HackerRank problems focusing on arrays, dynamic programming, trees, and system efficiency.`,
    category: 'Coding Practice',
    difficulty: 'Intermediate',
    estimatedHours: 20,
    resources: [
      { title: 'Top 75 Interview Algorithms Deck', url: 'https://leetcode.com', type: 'Practice' },
      { title: 'Algorithm Complexity Cheatsheet', url: 'https://bigocheatsheet.com', type: 'Article' },
    ],
    completed: userSkillSet.has('data structures & algorithms'),
    order: order++,
    skillsAcquired: ['Data Structures & Algorithms', 'Problem Solving'],
  });

  // 3. Mini Project Step
  steps.push({
    id: `step-${order}`,
    title: `Build Lightweight Utility API & Microservice`,
    description: `Design and publish a modular microservice utilizing ${requirements.core.slice(0, 2).join(' & ')} with REST/GraphQL endpoints.`,
    category: 'Mini Projects',
    difficulty: 'Intermediate',
    estimatedHours: 15,
    resources: [
      { title: 'RESTful API Design Standards & Boilerplate', url: 'https://expressjs.com', type: 'Practice' },
    ],
    completed: false,
    order: order++,
    skillsAcquired: ['REST APIs', 'Backend Architecture'],
  });

  // 4. GitHub Tasks Step
  steps.push({
    id: `step-${order}`,
    title: `GitHub Showcase Optimization & CI/CD Pipeline`,
    description: `Setup automated GitHub Actions test workflows, enforce branch protection, write a rich README with Mermaid diagrams, and release a v1.0.0 package.`,
    category: 'GitHub Tasks',
    difficulty: 'Intermediate',
    estimatedHours: 10,
    resources: [
      { title: 'GitHub Actions CI/CD Complete Guide', url: 'https://docs.github.com/actions', type: 'Article' },
    ],
    completed: false,
    order: order++,
    skillsAcquired: ['Git & GitHub', 'CI/CD Pipelines'],
  });

  // 5. Major Project Step
  steps.push({
    id: `step-${order}`,
    title: `Full-Stack ${targetRole} Capstone Platform`,
    description: `Construct an end-to-end cloud-deployed product incorporating real-time database indexing, authentication, state management, and Docker containers.`,
    category: 'Major Projects',
    difficulty: 'Advanced',
    estimatedHours: 40,
    resources: [
      { title: 'System Architecture Blueprint & Production Checklist', url: 'https://systemdesignprimer.com', type: 'Article' },
      { title: 'Fullstack Capstone Starter Template', url: 'https://github.com', type: 'Practice' },
    ],
    completed: false,
    order: order++,
    skillsAcquired: ['System Design', 'Full-Stack Architecture', 'Docker'],
  });

  // 6. Certifications Step
  steps.push({
    id: `step-${order}`,
    title: `Industry Certification (${targetRole} Domain)`,
    description: `Prepare and clear an accredited industry certification (e.g. AWS Cloud Practitioner, Meta Developer, or GCP Engineer) to validate your resume.`,
    category: 'Certifications',
    difficulty: 'Advanced',
    estimatedHours: 30,
    resources: [
      { title: 'Official Certification Exam Prep & Practice Tests', url: 'https://aws.amazon.com/certification', type: 'Course' },
    ],
    completed: false,
    order: order++,
    skillsAcquired: ['Industry Certifications', 'Cloud Infrastructure'],
  });

  // 7. Resume Updates Step
  steps.push({
    id: `step-${order}`,
    title: `ATS Resume Polish for ${targetCompany}`,
    description: `Revise resume using action verbs and quantified impact metrics. Run ATS compatibility scan with SkillGap AI Resume Analyzer.`,
    category: 'Resume Updates',
    difficulty: 'Beginner',
    estimatedHours: 5,
    resources: [
      { title: 'SkillGap ATS Resume Scanner Tool', url: '#', type: 'Article' },
    ],
    completed: false,
    order: order++,
    skillsAcquired: ['Resume Optimization', 'ATS Keywords'],
  });

  // 8. Mock Interviews Step
  steps.push({
    id: `step-${order}`,
    title: `AI Mock Interview & Behavioral STAR Simulation`,
    description: `Conduct 3 full mock interviews covering technical live-coding, system design whiteboarding, and STAR behavioral scenarios for ${targetCompany}.`,
    category: 'Mock Interviews',
    difficulty: 'Expert',
    estimatedHours: 15,
    resources: [
      { title: 'SkillGap AI Live Mock Simulator', url: '#', type: 'Practice' },
    ],
    completed: false,
    order: order++,
    skillsAcquired: ['Interview Readiness', 'STAR Method', 'Communication'],
  });

  return steps;
}
