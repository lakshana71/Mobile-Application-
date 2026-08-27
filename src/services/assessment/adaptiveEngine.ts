import {
  AdaptiveAssessmentSession,
  GeneratedQuestion,
  AnswerEvaluationResult,
  QuestionHistoryEntry,
  UserProfile,
  SkillConfidenceItem,
  DifficultyLevel,
} from '../../types';
import { generateAssessmentBlueprint } from './companyRoleBlueprintService';
import { extractProjectEvidence } from './projectEvidenceExtractor';
import { generateDynamicQuestion } from './dynamicQuestionGenerator';

/**
 * Calculates Uncertainty for a skill.
 * Uncertainty is high when confidence is low or evidence sources conflict.
 */
export function calculateSkillUncertainty(skillItem?: SkillConfidenceItem): number {
  if (!skillItem) return 100; // 100% uncertain if no data yet

  const confidenceGap = 100 - skillItem.confidence;

  // Check evidence source conflicts (e.g., self-reported vs project)
  const selfVsProjConflict = Math.abs(skillItem.sources.selfReported - skillItem.sources.project);
  const selfVsAssessConflict = Math.abs(skillItem.sources.selfReported - skillItem.sources.assessment);
  const conflictBonus = Math.max(selfVsProjConflict, selfVsAssessConflict) * 0.4;

  return Math.min(100, Math.round(confidenceGap + conflictBonus));
}

/**
 * Core Adaptive Question Selection Algorithm.
 * Returns the next optimal question based on target company, role, skill uncertainty, and question history.
 */
export function selectNextQuestion(
  session: AdaptiveAssessmentSession,
  userProfile: UserProfile
): GeneratedQuestion {
  const blueprint = generateAssessmentBlueprint(session.company, session.role);
  const evidence = extractProjectEvidence(userProfile);

  // 1. Evaluate uncertainty for each required skill in blueprint
  const skillUncertainties = blueprint.requiredSkills.map((req) => {
    const evaluated = session.evaluatedSkills[req.skill];
    const uncertainty = calculateSkillUncertainty(evaluated);
    return {
      skill: req.skill,
      importance: req.importance,
      uncertainty,
      priorityScore: uncertainty * 1.5 + req.importance * 2,
    };
  });

  // Sort by priorityScore descending to find most uncertain high-importance skill
  skillUncertainties.sort((a, b) => b.priorityScore - a.priorityScore);

  const targetSkill = skillUncertainties[0]?.skill || blueprint.requiredSkills[0].skill;
  const currentSkillData = session.evaluatedSkills[targetSkill];
  const currentLevel = currentSkillData?.level ?? 50;
  const currentConfidence = currentSkillData?.confidence ?? 30;

  // 2. Determine target difficulty based on recent history in this session
  let difficulty: DifficultyLevel = 'Intermediate';
  const recentSkillHistory = session.history.filter((h) => h.skill === targetSkill);
  if (recentSkillHistory.length > 0) {
    const lastAnswer = recentSkillHistory[recentSkillHistory.length - 1];
    if (lastAnswer.score >= 80) {
      difficulty = lastAnswer.difficulty === 'Intermediate' ? 'Advanced' : 'Expert';
    } else if (lastAnswer.score < 50) {
      difficulty = lastAnswer.difficulty === 'Advanced' ? 'Intermediate' : 'Beginner';
    } else {
      difficulty = lastAnswer.difficulty;
    }
  } else {
    difficulty = currentLevel >= 75 ? 'Advanced' : currentLevel >= 45 ? 'Intermediate' : 'Beginner';
  }

  // 3. Generate Question instance
  return generateDynamicQuestion({
    user: userProfile,
    company: session.company,
    role: session.role,
    skill: targetSkill,
    currentLevel,
    confidence: currentConfidence,
    evidence,
    history: session.history,
    targetDifficulty: difficulty,
  });
}

/**
 * Evaluates user's answer and updates skill level, confidence, false proficiency, and hidden skills.
 */
export function evaluateAnswer(
  question: GeneratedQuestion,
  userAnswer: string | number,
  userProfile: UserProfile,
  currentSkillItem?: SkillConfidenceItem
): AnswerEvaluationResult {
  const isCorrect = userAnswer === question.correctAnswer || String(userAnswer).trim() === String(question.correctAnswer).trim();
  const score = isCorrect ? 90 : 35;
  const correctness = isCorrect ? 1.0 : 0.2;

  const prevLevel = currentSkillItem?.level ?? 50;
  const prevConfidence = currentSkillItem?.confidence ?? 30;

  // Level delta: correct answers raise level, incorrect answers lower level
  const skillImpact = isCorrect ? Math.round(6 + (100 - prevLevel) * 0.15) : -Math.round(8 + prevLevel * 0.1);

  // Confidence increases on clear answers
  const confidenceImpact = Math.round(15 + (100 - prevConfidence) * 0.2);

  // False Proficiency Detection: Self-reported level is high (>= 75), but answer score is poor (< 50)
  const isSelfReportedHigh = userProfile.skillLevel === 'Advanced' || (userProfile.currentSkills && userProfile.currentSkills.includes(question.skill));
  const detectedFalseProficiency = !isCorrect && isSelfReportedHigh && prevLevel > 60;

  // Hidden Skill Detection: Self-reported level is low/unlisted, but user answered correctly with strong reasoning
  const isSelfReportedLow = userProfile.skillLevel === 'Beginner' || (!userProfile.currentSkills.includes(question.skill));
  const detectedHiddenSkill = isCorrect && isSelfReportedLow;

  let feedback = isCorrect
    ? `Correct! Demonstrated solid practical understanding of ${question.subSkill}. Confidence score increased by +${confidenceImpact}%.`
    : `Needs review. The response lacked full precision on ${question.subSkill}. Additional validation generated.`;

  if (detectedFalseProficiency) {
    feedback += ` Note: Detected potential False Proficiency in ${question.skill} (Self-reported proficiency exceeds current evidence).`;
  } else if (detectedHiddenSkill) {
    feedback += ` Note: Discovered Hidden Skill capability in ${question.skill} (Demonstrated ability exceeds self-reported profile).`;
  }

  return {
    score,
    correctness,
    skillImpact,
    confidenceImpact,
    needsFollowUp: !isCorrect,
    feedback,
    detectedFalseProficiency,
    detectedHiddenSkill,
    explanation: question.explanation,
  };
}

/**
 * Checks whether the assessment session should end dynamically.
 */
export function shouldStopAssessment(session: AdaptiveAssessmentSession): { stop: boolean; reason: string } {
  const count = session.questionsAnswered;

  // Minimum required questions
  if (count < 4) {
    return { stop: false, reason: 'Collecting initial evidence across role competencies.' };
  }

  // Maximum cap
  if (count >= 12) {
    return { stop: true, reason: 'Assessment completed because maximum question threshold (12) reached.' };
  }

  // Check average confidence across evaluated skills
  const skills = Object.values(session.evaluatedSkills);
  if (skills.length > 0) {
    const avgConfidence = skills.reduce((sum, s) => sum + s.confidence, 0) / skills.length;
    if (avgConfidence >= 78 && count >= 6) {
      return {
        stop: true,
        reason: `Assessment completed because sufficient high-confidence evidence (${Math.round(avgConfidence)}%) was collected.`,
      };
    }
  }

  return { stop: false, reason: 'Gathering additional validation for low-confidence skills.' };
}
