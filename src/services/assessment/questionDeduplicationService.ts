import { GeneratedQuestion, QuestionHistoryEntry } from '../../types';

export interface VectorEmbeddingProvider {
  getEmbedding(text: string): Promise<number[]>;
  cosineSimilarity(v1: number[], v2: number[]): number;
}

/**
 * Normalizes question text for fingerprinting.
 */
export function generateQuestionFingerprint(questionText: string, skill: string, difficulty: string): string {
  const cleanText = questionText
    .toLowerCase()
    .replace(/[^a-z0-9\s]/g, '')
    .split(/\s+/)
    .filter((w) => w.length > 3)
    .sort()
    .join('_');

  return `fp_${skill.toLowerCase().replace(/[^a-z0-9]/g, '')}_${difficulty.toLowerCase()}_${cleanText.slice(0, 40)}`;
}

/**
 * Calculates string similarity using Jaccard N-Gram coefficient.
 */
export function calculateJaccardSimilarity(str1: string, str2: string): number {
  const tokenize = (s: string) =>
    new Set(
      s
        .toLowerCase()
        .replace(/[^a-z0-9\s]/g, '')
        .split(/\s+/)
        .filter((w) => w.length > 2)
    );

  const set1 = tokenize(str1);
  const set2 = tokenize(str2);

  if (set1.size === 0 || set2.size === 0) return 0;

  let intersection = 0;
  set1.forEach((token) => {
    if (set2.has(token)) intersection++;
  });

  const union = set1.size + set2.size - intersection;
  return union > 0 ? intersection / union : 0;
}

/**
 * Semantic Similarity Abstraction.
 * Uses Jaccard N-gram similarity by default, with hook for optional Vector Embeddings.
 */
export function calculateSemanticSimilarity(
  text1: string,
  text2: string,
  vectorProvider?: VectorEmbeddingProvider
): number {
  // Default to n-gram jaccard similarity
  return calculateJaccardSimilarity(text1, text2);
}

/**
 * Checks if a proposed question is a duplicate or semantically too similar to any previously asked question.
 */
export function isQuestionDuplicate(
  candidateQuestion: GeneratedQuestion,
  questionHistory: QuestionHistoryEntry[],
  similarityThreshold: number = 0.70
): boolean {
  if (!questionHistory || questionHistory.length === 0) return false;

  const candidateFp = candidateQuestion.fingerprint || generateQuestionFingerprint(candidateQuestion.question, candidateQuestion.skill, candidateQuestion.difficulty);

  for (const entry of questionHistory) {
    // 1. Exact Fingerprint match
    if (entry.questionFingerprint === candidateFp) {
      return true;
    }

    // 2. Exact Question ID match
    if (entry.questionId === candidateQuestion.questionId) {
      return true;
    }

    // 3. Same skill & semantic similarity check
    if (entry.skill.toLowerCase() === candidateQuestion.skill.toLowerCase()) {
      const similarity = calculateSemanticSimilarity(candidateQuestion.question, entry.questionFingerprint);
      if (similarity >= similarityThreshold) {
        return true;
      }
    }
  }

  return false;
}
