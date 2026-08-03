export interface GitHubSkillDomain {
  domain: string;
  score: number; // 0 - 100
  level: 'Beginner' | 'Intermediate' | 'Advanced' | 'Expert';
  projectsCount: number;
}

export interface GitHubAnalysisResult {
  username: string;
  githubScore: number;
  repoHealth: number;
  codingConsistency: number;
  projectComplexity: number;
  placementReadiness: number;
  portfolioStrength: 'Starter' | 'Solid' | 'Standout' | 'Exceptional';
  totalStars: number;
  totalRepositories: number;
  contributionsThisYear: number;
  longestStreakDays: number;
  topLanguages: { name: string; percentage: number; color: string }[];
  skillDomainScores: GitHubSkillDomain[];
  aiRecommendations: {
    category: 'Projects' | 'Skills' | 'Resume' | 'Documentation' | 'Open Source';
    title: string;
    description: string;
    impact: 'High' | 'Medium';
  }[];
}

export const analyzeGitHubProfile = async (usernameInput: string): Promise<GitHubAnalysisResult> => {
  await new Promise((resolve) => setTimeout(resolve, 1200));

  const cleanUser = usernameInput.replace('https://github.com/', '').replace('/', '') || 'octocat';

  return {
    username: cleanUser,
    githubScore: 84,
    repoHealth: 88,
    codingConsistency: 82,
    projectComplexity: 85,
    placementReadiness: 86,
    portfolioStrength: 'Standout',
    totalStars: 42,
    totalRepositories: 18,
    contributionsThisYear: 384,
    longestStreakDays: 24,
    topLanguages: [
      { name: 'TypeScript', percentage: 48, color: '#3178c6' },
      { name: 'Python', percentage: 26, color: '#3572A5' },
      { name: 'JavaScript', percentage: 14, color: '#f1e05a' },
      { name: 'Dart / Flutter', percentage: 8, color: '#00B4AB' },
      { name: 'SQL', percentage: 4, color: '#e38c00' },
    ],
    skillDomainScores: [
      { domain: 'TypeScript', score: 88, level: 'Advanced', projectsCount: 9 },
      { domain: 'React & Web', score: 85, level: 'Advanced', projectsCount: 11 },
      { domain: 'Python & Data', score: 78, level: 'Intermediate', projectsCount: 5 },
      { domain: 'React Native / Mobile', score: 72, level: 'Intermediate', projectsCount: 3 },
      { domain: 'SQL & Databases', score: 68, level: 'Intermediate', projectsCount: 4 },
      { domain: 'Cloud & DevOps (Docker, CI/CD)', score: 64, level: 'Intermediate', projectsCount: 2 },
      { domain: 'AI / Machine Learning Integration', score: 70, level: 'Intermediate', projectsCount: 3 },
      { domain: 'Cybersecurity Best Practices', score: 60, level: 'Beginner', projectsCount: 1 },
      { domain: 'C++', score: 55, level: 'Beginner', projectsCount: 2 },
      { domain: 'Java & Spring', score: 50, level: 'Beginner', projectsCount: 1 },
      { domain: 'Flutter', score: 65, level: 'Intermediate', projectsCount: 2 },
      { domain: 'Open Source Contributions', score: 75, level: 'Intermediate', projectsCount: 4 },
    ],
    aiRecommendations: [
      {
        category: 'Documentation',
        title: 'Add Architecture Diagrams to Main Repositories',
        description: 'Your top 2 repositories lack Visual Architecture Diagrams in README.md. Adding Mermaid flowcharts increases recruiter engagement by 40%.',
        impact: 'High',
      },
      {
        category: 'Projects',
        title: 'Build a Full Microservice Capstone',
        description: 'Your GitHub showcases mostly single-tier frontend apps. Add a Dockerized backend with Redis caching and PostgreSQL.',
        impact: 'High',
      },
      {
        category: 'Open Source',
        title: 'Contribute to High-Star Tech Stacks',
        description: 'Submit 2 pull requests solving good-first-issues in popular open-source repos like Vite or Tailwind CSS.',
        impact: 'Medium',
      },
      {
        category: 'Skills',
        title: 'Implement Automated GitHub Actions CI/CD',
        description: 'Configure automated test execution and linting workflows on pull requests for your showcase repos.',
        impact: 'Medium',
      },
    ],
  };
};
