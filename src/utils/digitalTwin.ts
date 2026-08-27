import { RoadmapStep, Skill360Score, UserProfile, CareerPrediction, LearningBehaviour, ShadowMentorInsight, SkillEvolutionHistoryItem, SkillGenomeNode, StudentDigitalTwin, SkillEvolutionStage } from '../types';

const clamp = (value: number, min: number, max: number) => Math.min(max, Math.max(min, value));

const buildGenomeNodes = (userProfile: UserProfile, roadmap: RoadmapStep[], score360: Skill360Score): SkillGenomeNode[] => {
  const completed = roadmap.filter((step) => step.completed).length;
  const completionBoost = completed * 4;
  const confidenceBoost = Math.round(score360.confidence / 8);
  const consistencyBoost = Math.round(score360.consistency / 6);

  const baseTraits = [
    { id: 'analytical', label: 'Analytical Thinking', base: 74 + completionBoost + confidenceBoost },
    { id: 'problem', label: 'Problem Solving', base: 78 + completionBoost + consistencyBoost },
    { id: 'creativity', label: 'Creativity', base: 70 + completionBoost / 2 },
    { id: 'communication', label: 'Communication', base: 68 + confidenceBoost },
    { id: 'collaboration', label: 'Collaboration', base: 72 + consistencyBoost },
    { id: 'leadership', label: 'Leadership', base: 66 + completionBoost / 3 },
    { id: 'adaptability', label: 'Adaptability', base: 76 + confidenceBoost / 2 },
    { id: 'learning', label: 'Learning Speed', base: 80 + completionBoost / 2 + consistencyBoost / 2 },
  ];

  return baseTraits.map((trait) => ({
    ...trait,
    score: clamp(trait.base, 55, 98),
    intensity: clamp(trait.base - 35, 30, 92),
  }));
};

const buildEvolutionTimeline = (userProfile: UserProfile, roadmap: RoadmapStep[]): SkillEvolutionHistoryItem[] => {
  const completed = roadmap.filter((step) => step.completed).length;
  const stageFor = (value: number): SkillEvolutionStage => {
    if (value >= 9) return 'Evolved';
    if (value >= 7) return 'Strong';
    if (value >= 5) return 'Growing';
    if (value >= 3) return 'Emerging';
    return 'Refresh Needed';
  };

  const skills = [
    { skill: 'Problem Solving', value: Math.min(10, 3 + completed / 2), trend: '+18% from recent projects' },
    { skill: 'Systems Thinking', value: Math.min(10, 2 + completed / 3), trend: '+9% from architecture drills' },
    { skill: 'Communication', value: Math.min(10, 4 + (userProfile.streakDays > 5 ? 1 : 0)), trend: '+12% from mentor sessions' },
    { skill: 'Cloud Fluency', value: Math.min(10, 2 + (userProfile.currentSkills.includes('AWS') ? 2 : 0)), trend: 'Needs weekly refresh' },
  ];

  return skills.map((entry, index) => ({
    id: `evo-${index + 1}`,
    skill: entry.skill,
    stage: stageFor(entry.value),
    change: entry.trend,
    date: index === 0 ? 'Today' : `${index + 1}d ago`,
    confidence: clamp(70 + entry.value * 3 + index * 2, 60, 96),
  }));
};

const buildLearningBehaviour = (userProfile: UserProfile, roadmap: RoadmapStep[], score360: Skill360Score): LearningBehaviour => {
  const completed = roadmap.filter((step) => step.completed).length;
  const preferredStyle = userProfile.preferredLearningStyle || 'Projects';
  const consistency = clamp(score360.consistency, 40, 96);
  const confidence = clamp(score360.confidence, 45, 96);

  return {
    focus: completed >= 2 ? 'Practical systems build' : 'Concept grounding',
    pattern: completed > 4 ? 'High momentum, steady streak' : 'Rapid starter with spaced repetition needs',
    risk: completed < 3 ? 'Potential drift in applied practice' : 'Low risk',
    preferredStyle,
    consistency,
    confidence,
    lastActivity: userProfile.streakDays > 3 ? 'Active this week' : 'Needs a fresh sprint',
  };
};

const buildMentorInsights = (userProfile: UserProfile, roadmap: RoadmapStep[], score360: Skill360Score): ShadowMentorInsight[] => {
  const completed = roadmap.filter((step) => step.completed).length;
  const style = userProfile.preferredLearningStyle || 'Projects';

  return [
    {
      id: 'insight-1',
      title: 'Adaptive learning pattern',
      insight: `You understand concepts faster through ${style.toLowerCase()} and retain them better when challenges are tied to real delivery.` ,
      recommendation: 'Pair your next sprint with one practical build and one reflection note.',
      priority: 'High',
    },
    {
      id: 'insight-2',
      title: 'Momentum signal',
      insight: completed >= 3 ? 'Your recent activity suggests strong momentum and healthy recovery from earlier gaps.' : 'You have not practiced applied skills recently, so your next milestone should stay hands-on.',
      recommendation: 'Schedule a focused 45-minute challenge before the next week closes.',
      priority: 'Medium',
    },
    {
      id: 'insight-3',
      title: 'Career match',
      insight: score360.industryReadiness > 78 ? `Cloud Security matches your strengths more than generic web development.` : `Your profile aligns well with ${userProfile.dreamCareer} because your strongest signals are applied reasoning and growth speed.`,
      recommendation: 'Shift one recommendation toward a security or systems pathway this week.',
      priority: 'Medium',
    },
  ];
};

const buildCareerPrediction = (userProfile: UserProfile, score360: Skill360Score): CareerPrediction[] => {
  const role = userProfile.dreamCareer || 'AI Engineer';
  const readiness = score360.industryReadiness;

  return [
    {
      id: 'pred-1',
      title: `${role} readiness`,
      probability: clamp(readiness, 55, 94),
      rationale: 'Your strengths are rising through applied problem solving, consistency, and modern tool fluency.',
      nextAction: 'Keep one portfolio build and one assessment sprint active each week.',
    },
    {
      id: 'pred-2',
      title: 'Future skill spike',
      probability: clamp(readiness + 4, 60, 92),
      rationale: 'The next frontier for your profile is systems thinking, cloud fluency, and AI-driven product delivery.',
      nextAction: 'Introduce one advanced architecture challenge into the roadmap.',
    },
  ];
};

export const buildDigitalTwin = (userProfile: UserProfile, roadmap: RoadmapStep[], score360: Skill360Score): StudentDigitalTwin => {
  const genome = buildGenomeNodes(userProfile, roadmap, score360);
  const evolutionHistory = buildEvolutionTimeline(userProfile, roadmap);
  const learningBehaviour = buildLearningBehaviour(userProfile, roadmap, score360);
  const mentorInsights = buildMentorInsights(userProfile, roadmap, score360);
  const careerPredictions = buildCareerPrediction(userProfile, score360);
  const averageGenome = Math.round(genome.reduce((sum, item) => sum + item.score, 0) / genome.length);
  const readiness = clamp(Math.round((score360.industryReadiness * 0.6) + (averageGenome * 0.4)), 45, 98);
  const health = clamp(Math.round((score360.consistency * 0.6) + (score360.confidence * 0.4)), 42, 98);

  return {
    overview: clamp(Math.round((averageGenome + readiness + health) / 3), 48, 99),
    readiness,
    health,
    genome,
    evolutionHistory,
    learningBehaviour,
    mentorInsights,
    careerPredictions,
  };
};
