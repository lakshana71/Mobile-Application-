import { AssessmentBlueprint, AssessmentBlueprintItem } from '../../types';
import { ROLE_SKILL_REQUIREMENTS } from '../../data/careerData';

/**
 * Generates an Assessment Blueprint dynamically tailored to target company and role.
 */
export function generateAssessmentBlueprint(company: string, role: string): AssessmentBlueprint {
  const targetCompany = company || 'Top Tech Companies';
  const targetRole = role || 'Software Engineer';
  const roleReqs = ROLE_SKILL_REQUIREMENTS[targetRole] || ROLE_SKILL_REQUIREMENTS['Software Engineer'];

  const requiredSkills: AssessmentBlueprintItem[] = [];

  // Core skills get high importance
  roleReqs.core.forEach((skillName, index) => {
    let importance = 9 - Math.min(index, 3);
    let targetLevel = 85;

    // Company specific nuances
    if (targetCompany.toLowerCase().includes('google') || targetCompany.toLowerCase().includes('microsoft') || targetCompany.toLowerCase().includes('company a')) {
      if (skillName.includes('Data Structures') || skillName.includes('System Design')) {
        importance = 10;
        targetLevel = 90;
      }
    } else if (targetCompany.toLowerCase().includes('startup')) {
      if (skillName.includes('React') || skillName.includes('Node') || skillName.includes('Python') || skillName.includes('Docker')) {
        importance = 10;
        targetLevel = 88;
      }
    }

    requiredSkills.push({
      skill: skillName,
      category: 'Core Competency',
      importance,
      targetLevel,
      isCore: true,
    });
  });

  // Optional skills get secondary importance
  roleReqs.optional.forEach((skillName, index) => {
    requiredSkills.push({
      skill: skillName,
      category: 'Specialization & Tooling',
      importance: Math.max(5, 7 - index),
      targetLevel: 75,
      isCore: false,
    });
  });

  // Ensure security & architecture skills are represented if missing
  if (!requiredSkills.some((s) => s.skill.toLowerCase().includes('security') || s.skill.toLowerCase().includes('jwt'))) {
    requiredSkills.push({
      skill: 'JWT & Security',
      category: 'Security & Auth',
      importance: 7,
      targetLevel: 80,
      isCore: false,
    });
  }

  if (!requiredSkills.some((s) => s.skill.toLowerCase().includes('docker') || s.skill.toLowerCase().includes('cloud'))) {
    requiredSkills.push({
      skill: 'Docker & DevOps',
      category: 'Infrastructure',
      importance: 6,
      targetLevel: 75,
      isCore: false,
    });
  }

  // Sort by importance descending
  requiredSkills.sort((a, b) => b.importance - a.importance);

  const priorities = requiredSkills.slice(0, 4).map((s) => s.skill);

  return {
    company: targetCompany,
    role: targetRole,
    description: `Targeted ${targetRole} assessment blueprint for ${targetCompany}. Emphasizes ${priorities.slice(0, 2).join(', ')}.`,
    requiredSkills,
    priorities,
  };
}
