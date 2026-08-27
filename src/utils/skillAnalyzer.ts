import { UserProfile, RoadmapStep, Skill360Score, SkillGapItem, SkillDecayItem } from '../types';
import { ROLE_SKILL_REQUIREMENTS } from '../data/careerData';

export function calculate360Score(profile: UserProfile, roadmap: RoadmapStep[]): Skill360Score {
  const totalSteps = roadmap.length;
  const completedSteps = roadmap.filter((s) => s.completed).length;
  const completionRatio = totalSteps > 0 ? completedSteps / totalSteps : 0.2;

  const targetRole = profile.dreamCareer || 'Software Engineer';
  const reqs = ROLE_SKILL_REQUIREMENTS[targetRole] || ROLE_SKILL_REQUIREMENTS['Software Engineer'];
  const userSkillCount = profile.currentSkills.length;

  const technical = Math.min(98, Math.round(35 + userSkillCount * 8 + completionRatio * 30));
  const practical = Math.min(95, Math.round(30 + completionRatio * 50 + (profile.skillLevel === 'Advanced' ? 20 : profile.skillLevel === 'Intermediate' ? 10 : 0)));
  const problemSolving = Math.min(96, Math.round(40 + (userSkillCount > 3 ? 25 : 10) + completionRatio * 25));
  const communication = profile.currentSkills.includes('Communication') ? 88 : 65;
  const consistency = Math.min(99, Math.round(50 + profile.streakDays * 5 + completionRatio * 20));
  const projects = Math.min(92, Math.round(25 + completedSteps * 15));
  const confidence = Math.round((technical + practical + communication + consistency) / 4);
  const industryReadiness = Math.round((technical * 0.35 + practical * 0.25 + problemSolving * 0.2 + projects * 0.2));

  const overallScore = Math.round(
    (technical + practical + communication + problemSolving + consistency + industryReadiness + confidence + projects) / 8
  );

  return {
    overallScore,
    technical,
    practical,
    communication,
    problemSolving,
    consistency,
    industryReadiness,
    confidence,
    projects,
  };
}

export function generateSkillGaps(profile: UserProfile): SkillGapItem[] {
  const targetRole = profile.dreamCareer || 'Software Engineer';
  const reqs = ROLE_SKILL_REQUIREMENTS[targetRole] || ROLE_SKILL_REQUIREMENTS['Software Engineer'];
  const userSkillSet = new Set(profile.currentSkills.map((s) => s.toLowerCase()));

  const items: SkillGapItem[] = [];

  // Evaluate core skills
  reqs.core.forEach((skill) => {
    const hasSkill = userSkillSet.has(skill.toLowerCase());
    items.push({
      skill,
      category: 'Core Skill',
      userLevel: hasSkill ? (profile.skillLevel === 'Advanced' ? 85 : profile.skillLevel === 'Intermediate' ? 65 : 45) : 15,
      requiredLevel: 85,
      priority: hasSkill ? 'Low' : 'High',
      trend: hasSkill ? 'Stable' : 'Critical',
      recommendedResource: `Masterclass: Advanced ${skill} Engineering`,
      estimatedLearningHours: hasSkill ? 4 : 8,
    });
  });

  // Evaluate optional skills
  reqs.optional.forEach((skill) => {
    const hasSkill = userSkillSet.has(skill.toLowerCase());
    items.push({
      skill,
      category: 'Secondary Skill',
      userLevel: hasSkill ? 70 : 10,
      requiredLevel: 75,
      priority: hasSkill ? 'Low' : 'Medium',
      trend: 'Rising',
      recommendedResource: `Industry Guide to ${skill}`,
      estimatedLearningHours: 6,
    });
  });

  return items;
}

export function generateSkillDecayItems(profile: UserProfile): SkillDecayItem[] {
  const skills = profile.currentSkills.length > 0 ? profile.currentSkills : ['Python', 'SQL', 'Data Structures & Algorithms'];
  
  return skills.slice(0, 4).map((skill, index) => {
    const daysAgo = (index + 1) * 6 + 3;
    const decayRisk = daysAgo > 18 ? 'High' : daysAgo > 10 ? 'Medium' : 'Low';
    const decayPercentage = Math.min(45, daysAgo * 2.1);

    return {
      id: `decay-${index}`,
      skill,
      lastPracticedDaysAgo: daysAgo,
      decayRisk,
      suggestedAction: `Practice 3 target coding challenges in ${skill} to restore memory retention.`,
      decayPercentage: Math.round(decayPercentage),
      practiceSchedule: `3 sessions / week for ${skill}`,
    };
  });
}
