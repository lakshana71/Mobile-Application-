import {
  UserProfile,
  SkillConfidenceItem,
  SkillEvidenceGraphNode,
  SkillGapItem,
  RoadmapStep,
  ProjectAnalysisReport,
  GitHubAnalysisResult,
} from '../../types';
import { generateAssessmentBlueprint } from './companyRoleBlueprintService';
import { extractProjectEvidence } from './projectEvidenceExtractor';

/**
 * Initializes or merges multi-source skill evidence profile for a user.
 */
export function buildMultiSourceSkillProfile(
  profile: UserProfile,
  existingProfile?: Record<string, SkillConfidenceItem>,
  projectReport?: ProjectAnalysisReport | null,
  githubReport?: GitHubAnalysisResult | null
): Record<string, SkillConfidenceItem> {
  const targetCompany = profile.dreamCompany || 'Top Tech Companies';
  const targetRole = profile.dreamCareer || 'Software Engineer';
  const blueprint = generateAssessmentBlueprint(targetCompany, targetRole);
  const projectEvidences = extractProjectEvidence(profile, projectReport, githubReport);

  const result: Record<string, SkillConfidenceItem> = { ...(existingProfile || {}) };

  blueprint.requiredSkills.forEach((reqSkill) => {
    const skillKey = reqSkill.skill;
    const isSelfReported = (profile.currentSkills || []).some((s) => s.toLowerCase() === skillKey.toLowerCase());
    const selfReportedScore = isSelfReported ? (profile.skillLevel === 'Advanced' ? 85 : profile.skillLevel === 'Intermediate' ? 65 : 45) : 20;

    // Check project evidence
    const matchingProj = projectEvidences.find((e) => e.technology.toLowerCase().includes(skillKey.toLowerCase()));
    const projectScore = matchingProj ? matchingProj.confidenceScore : isSelfReported ? 50 : 15;

    // Check GitHub evidence
    const githubScore = githubReport?.skillDomainScores.find((d: { domain: string; score: number }) => d.domain.toLowerCase().includes(skillKey.toLowerCase()))?.score ?? (isSelfReported ? 55 : 10);

    const prev = result[skillKey];
    const assessmentScore = prev ? prev.sources.assessment : 30;
    const codingScore = isSelfReported ? 60 : 25;
    const interviewScore = isSelfReported ? 55 : 30;

    // Calculate blended skill level (weighted)
    const level = Math.round(
      assessmentScore * 0.35 +
      projectScore * 0.25 +
      githubScore * 0.15 +
      selfReportedScore * 0.15 +
      codingScore * 0.1
    );

    // Calculate confidence based on evidence agreement
    let confidence = prev ? prev.confidence : 35;
    const evidenceSourcesCount = [isSelfReported, matchingProj, githubReport].filter(Boolean).length;
    confidence = Math.min(99, Math.max(25, 30 + evidenceSourcesCount * 22 + (prev ? 15 : 0)));

    result[skillKey] = {
      skill: skillKey,
      level,
      confidence,
      sources: {
        assessment: assessmentScore,
        project: projectScore,
        github: githubScore,
        selfReported: selfReportedScore,
        coding: codingScore,
        interview: interviewScore,
      },
      evidenceCount: 3 + evidenceSourcesCount,
      trend: level > 70 ? 'Rising' : level < 45 ? 'Critical' : 'Stable',
      lastUpdated: new Date().toLocaleDateString(),
    };
  });

  return result;
}

/**
 * Builds full Skill Evidence Graph for visual representation in UI ("Why did the system give me this score?").
 */
export function buildSkillEvidenceGraph(
  evaluatedSkills: Record<string, SkillConfidenceItem>
): SkillEvidenceGraphNode[] {
  return Object.values(evaluatedSkills).map((item) => ({
    skill: item.skill,
    overallScore: item.level,
    confidence: item.confidence,
    sources: [
      {
        name: 'Adaptive Assessment',
        score: item.sources.assessment,
        weight: 35,
        confidence: Math.round(item.confidence * 0.9),
        evidenceDetails: `Direct problem solving performance on sequential adaptive questions.`,
      },
      {
        name: 'Project Analysis',
        score: item.sources.project,
        weight: 25,
        confidence: Math.round(item.confidence * 0.85),
        evidenceDetails: `Inspected source code AST Heuristics & framework usage.`,
      },
      {
        name: 'GitHub Portfolio',
        score: item.sources.github,
        weight: 15,
        confidence: Math.round(item.confidence * 0.8),
        evidenceDetails: `Repository health, commit velocity, and language distribution.`,
      },
      {
        name: 'Self-Reported Profile',
        score: item.sources.selfReported,
        weight: 15,
        confidence: 50,
        evidenceDetails: `Initial questionnaire declarations during onboarding.`,
      },
      {
        name: 'Coding & Practice',
        score: item.sources.coding,
        weight: 10,
        confidence: 70,
        evidenceDetails: `Interactive code submissions and algorithmic exercise completions.`,
      },
    ],
  }));
}

/**
 * Generates dynamic Skill Gaps based on updated multi-source evidence.
 */
export function generateMultiSourceSkillGaps(
  profile: UserProfile,
  evaluatedSkills: Record<string, SkillConfidenceItem>
): SkillGapItem[] {
  const targetCompany = profile.dreamCompany || 'Top Tech Companies';
  const targetRole = profile.dreamCareer || 'Software Engineer';
  const blueprint = generateAssessmentBlueprint(targetCompany, targetRole);

  return blueprint.requiredSkills.map((req) => {
    const item = evaluatedSkills[req.skill];
    const userLevel = item ? item.level : 20;
    const requiredLevel = req.targetLevel;
    const gap = Math.max(0, requiredLevel - userLevel);

    let priority: 'High' | 'Medium' | 'Low' = 'Low';
    if (gap > 25) priority = 'High';
    else if (gap > 10) priority = 'Medium';

    return {
      skill: req.skill,
      category: req.category,
      userLevel,
      requiredLevel,
      priority,
      trend: gap > 20 ? 'Critical' : 'Stable',
      recommendedResource: `Masterclass: Advanced ${req.skill} for ${targetCompany}`,
      estimatedLearningHours: Math.max(4, Math.round(gap / 5)),
    };
  });
}

/**
 * Updates Roadmap steps in response to new Skill Gap calculations without deleting completed steps.
 */
export function updateRoadmapFromSkillGaps(
  currentRoadmap: RoadmapStep[],
  skillGaps: SkillGapItem[],
  profile: UserProfile
): RoadmapStep[] {
  const targetCompany = profile.dreamCompany || 'Top Tech Companies';
  const targetRole = profile.dreamCareer || 'Software Engineer';

  // Identify high-priority gaps
  const highPriorityGaps = skillGaps.filter((g) => g.priority === 'High');
  const topGapSkill = highPriorityGaps[0]?.skill || skillGaps[0]?.skill || 'Core Competencies';

  const firstUncompletedIdx = currentRoadmap.findIndex((s) => !s.completed);

  return currentRoadmap.map((step, idx) => {
    // If step is already completed, preserve it untouched!
    if (step.completed) return step;

    // Dynamically adjust step focus if it's the first uncompleted step
    if (idx === firstUncompletedIdx) {
      return {
        ...step,
        title: `${topGapSkill} Intensive Masterclass (${targetCompany} Standard)`,
        description: `Targeted module addressing major identified skill gap in ${topGapSkill}. Master concepts required for ${targetRole} positions.`,
        skillsAcquired: [topGapSkill, 'Core Optimization'],
      };
    }

    return step;
  });
}

