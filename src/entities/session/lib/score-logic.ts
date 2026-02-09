// src/entities/session/lib/score-logic.ts

/**
 * Checks if the selected answer is correct and updates the quiz session score.
 *
 * @param selectedAnswer The answer chosen by the user.
 * @param correctAnswer The correct answer for the question.
 * @returns True if the selected answer is correct, false otherwise.
 */
export const checkAnswer = (
  selectedAnswer: string,
  correctAnswer: string,
): boolean => {
  return selectedAnswer === correctAnswer;
};
