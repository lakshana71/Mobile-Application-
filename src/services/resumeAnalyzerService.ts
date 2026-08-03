export interface ResumeAnalysisResult {
  fileName: string;
  overallScore: number;
  atsScore: number;
  detectedSkills: string[];
  missingCriticalSkills: string[];
  grammarFormattingScore: number;
  experienceRating: 'Strong' | 'Moderate' | 'Entry Level';
  projectsScore: number;
  certificationsDetected: string[];
  aiSuggestions: {
    section: 'Summary' | 'Experience' | 'Skills' | 'Projects' | 'Formatting';
    issue: string;
    actionableFix: string;
    priority: 'High' | 'Medium' | 'Low';
  }[];
}

export const analyzeResumeContent = async (
  fileName: string,
  targetCareer: string = 'Software Engineer'
): Promise<ResumeAnalysisResult> => {
  await new Promise((resolve) => setTimeout(resolve, 1300));

  return {
    fileName,
    overallScore: 82,
    atsScore: 86,
    detectedSkills: [
      'React',
      'TypeScript',
      'JavaScript (ES6+)',
      'Node.js',
      'Tailwind CSS',
      'Git & GitHub',
      'REST APIs',
      'SQL',
    ],
    missingCriticalSkills: [
      'Docker & Containerization',
      'System Design Principles',
      'CI/CD Pipelines (GitHub Actions)',
      'Unit & Integration Testing (Jest / Vitest)',
    ],
    grammarFormattingScore: 92,
    experienceRating: 'Moderate',
    projectsScore: 84,
    certificationsDetected: ['AWS Certified Cloud Practitioner', 'Meta Front-End Developer'],
    aiSuggestions: [
      {
        section: 'Summary',
        issue: 'Professional summary is generic and missing quantifiable achievements.',
        actionableFix: `Rewrite summary to highlight target role "${targetCareer}": "Full-stack developer with hands-on experience in React & Node.js, specializing in building high-performance web applications with 99.9% uptime."`,
        priority: 'High',
      },
      {
        section: 'Projects',
        issue: 'Project bullet points describe tech stack but lack metrics (e.g. users, performance boost, latency reduction).',
        actionableFix: 'Quantify bullet points: "Optimized bundle size by 35% using code-splitting" or "Integrated Redis caching reducing response latency by 200ms."',
        priority: 'High',
      },
      {
        section: 'Skills',
        issue: `Missing target cloud & DevOps keywords for ${targetCareer}.`,
        actionableFix: 'Add keywords: Docker, CI/CD, Microservices, and GraphQL under a Dedicated "Tools & Infrastructure" section.',
        priority: 'Medium',
      },
      {
        section: 'Formatting',
        issue: 'Two-column layout may cause ATS parser confusion on legacy recruiter software.',
        actionableFix: 'Convert to single-column ATS-standard format with standard headers (Experience, Projects, Education, Skills).',
        priority: 'Low',
      },
    ],
  };
};
